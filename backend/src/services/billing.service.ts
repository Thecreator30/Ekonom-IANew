import Stripe from 'stripe';
import { prisma } from '@/infrastructure/db';

export class BillingService {
    private static stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-01-27.acacia', // Use latest API version available
    });

    static async createCheckoutSession(merchantId: string, plan: 'PRO' | 'ENTERPRISE') {
        // 1. Get Merchant
        const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
        if (!merchant) throw new Error("Merchant not found");

        // 2. Define Price IDs (Should be in Env or Config)
        const priceId = plan === 'PRO'
            ? process.env.STRIPE_PRICE_ID_PRO
            : process.env.STRIPE_PRICE_ID_ENTERPRISE;

        if (!priceId) throw new Error("Price ID not configured");

        // 3. Create Session
        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            customer_email: merchant.email,
            client_reference_id: merchantId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
            metadata: {
                merchantId: merchantId,
                plan: plan
            }
        });

        return session.url;
    }

    static async handleWebhook(signature: string, payload: Buffer) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) throw new Error("Webhook secret not configured");

        let event;

        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (err: any) {
            throw new Error(`Webhook Error: ${err.message}`);
        }

        // Handle Events
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;
                await this.fulfillOrder(session);
                break;
            case 'invoice.payment_succeeded':
                // Extend subscription if needed
                break;
            case 'customer.subscription.deleted':
                // Downgrade to FREE
                await this.downgradeMerchant(event.data.object as Stripe.Subscription);
                break;
        }
    }

    private static async fulfillOrder(session: Stripe.Checkout.Session) {
        const merchantId = session.metadata?.merchantId || session.client_reference_id;
        const plan = session.metadata?.plan || "PRO";

        if (merchantId) {
            await prisma.merchant.update({
                where: { id: merchantId },
                data: {
                    subscription_plan: plan,
                    stripe_customer_id: session.customer as string
                }
            });
        }
    }

    private static async downgradeMerchant(subscription: Stripe.Subscription) {
        // Check which merchant owns this subscription
        const merchant = await prisma.merchant.findFirst({
            where: { stripe_customer_id: subscription.customer as string }
        });

        if (merchant) {
            await prisma.merchant.update({
                where: { id: merchant.id },
                data: { subscription_plan: "FREE" }
            });
        }
    }
}

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. MERCHANTS (Tenants)
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    business_name TEXT NOT NULL,
    api_key_hash TEXT, -- For external integrations if needed
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEVICES (Anti-fraud)
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_hash TEXT UNIQUE NOT NULL, -- SHA256(ip + ua + secret)
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    risk_score INTEGER DEFAULT 0
);

-- 3. PROMOTIONS
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    ai_generated BOOLEAN DEFAULT false,
    compliance_status TEXT CHECK (compliance_status IN ('ok', 'needs_review')) DEFAULT 'ok',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ -- Soft delete
);

-- 4. WELCOME OFFERS
CREATE TABLE welcome_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    discount_value INTEGER NOT NULL,
    discount_type TEXT CHECK (discount_type IN ('percent', 'fixed')) DEFAULT 'percent',
    is_active BOOLEAN DEFAULT false,
    scans_count INTEGER DEFAULT 0,
    coupons_generated INTEGER DEFAULT 0,
    coupons_redeemed INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUBSCRIBERS (CRM)
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    email TEXT,
    phone TEXT,
    device_id UUID REFERENCES devices(id),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(merchant_id, email),
    UNIQUE(merchant_id, device_id) -- One sub per device per merchant
);

-- 6. COUPONS (Redemption)
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    promotion_id UUID REFERENCES promotions(id), -- Nullable for Welcome Offers
    subscriber_id UUID REFERENCES subscribers(id),
    code TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'redeemed', 'expired')) DEFAULT 'active',
    redeemed_at TIMESTAMPTZ,
    redeemed_by_device UUID REFERENCES devices(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REFRESH TOKENS (Auth Rotation)
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    revoked BOOLEAN DEFAULT false
);

-- 8. IDEMPOTENCY KEYS (Reliability)
CREATE TABLE idempotency_keys (
    key TEXT PRIMARY KEY,
    merchant_id UUID REFERENCES merchants(id),
    path TEXT NOT NULL,
    params JSONB,
    response_code INTEGER,
    response_body JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AUDIT LOGS (Security)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    action TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('info', 'warning', 'critical')) DEFAULT 'info',
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PUSH JOBS (Async Processing)
CREATE TABLE push_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    promotion_id UUID REFERENCES promotions(id),
    status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    recipient_count INTEGER DEFAULT 0,
    scheduled_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXING
CREATE INDEX idx_promotions_merchant ON promotions(merchant_id);
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_audit_merchant ON audit_logs(merchant_id);
CREATE INDEX idx_subscribers_device ON subscribers(device_id);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE welcome_offers ENABLE ROW LEVEL SECURITY;

-- RLS POLICY: Strict isolation based on session variable
-- The app must set `app.current_merchant_id` before query
CREATE POLICY promotion_isolation ON promotions
    USING (merchant_id = current_setting('app.current_merchant_id')::uuid);

CREATE POLICY subscriber_isolation ON subscribers
    USING (merchant_id = current_setting('app.current_merchant_id')::uuid);

CREATE POLICY coupon_isolation ON coupons
    USING (merchant_id = current_setting('app.current_merchant_id')::uuid);
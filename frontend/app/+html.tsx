
import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every page.
 * The <head> handler must be defined in an exported component.
 *
 * Be quite strict with CSP in production, but relaxed in dev.
 */
export default function Root({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                {/* Permissive CSP for development to allow 'eval' (required by Metro/Webpack HMR) */}
                {/* Permissive CSP for development to allow 'eval' (required by Metro/Webpack HMR) */}
                <meta httpEquiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src-elem * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline'; worker-src * 'unsafe-inline' 'unsafe-eval' data: blob:; font-src * data: blob: 'unsafe-inline';" />

                <ScrollViewStyleReset />
            </head>
            <body>{children}</body>
        </html>
    );
}

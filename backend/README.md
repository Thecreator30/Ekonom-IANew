# Ekonom-IA Backend (Enterprise Edition)

Layered Architecture:
- `src/api`: Route Handlers (Next.js App Router)
- `src/services`: Pure Business Logic
- `src/domain`: Core Types & Rules
- `src/infrastructure`: DB Access & External Services
- `src/utils`: Helpers (HMAC, Hash, etc.)
- `src/workers`: Background Jobs

## Setup
1. `npm install`
2. `npx prisma generate`
3. `npm run dev`

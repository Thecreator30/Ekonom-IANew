module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/infrastructure/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "prisma",
    ()=>prisma
]);
(()=>{
    const e = new Error("Cannot find module '@prisma/client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new PrismaClient();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
const __TURBOPACK__default__export__ = prisma;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/utils/hash.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
const hashPassword = async (password)=>{
    const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(10);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, salt);
};
const verifyPassword = async (password, hash)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
};
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/utils/token.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signAccessToken",
    ()=>signAccessToken,
    "verifyJwt",
    ()=>verifyJwt,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const signAccessToken = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, SECRET, {
        expiresIn: '15m'
    });
};
const verifyToken = (token)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, SECRET);
};
const verifyJwt = verifyToken;
}),
"[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/services/auth.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthService",
    ()=>AuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$infrastructure$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/infrastructure/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$utils$2f$hash$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/utils/hash.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$utils$2f$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/utils/token.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
class AuthService {
    static async register(data) {
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$infrastructure$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].merchant.findUnique({
            where: {
                email: data.email
            }
        });
        if (existing) throw new Error('Email already registered');
        const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$utils$2f$hash$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(data.password);
        const merchant = await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$infrastructure$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].merchant.create({
            data: {
                email: data.email,
                password_hash: hashedPassword,
                company_name: data.company_name
            }
        });
        return this.generateTokens(merchant);
    }
    static async login(data) {
        const merchant = await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$infrastructure$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].merchant.findUnique({
            where: {
                email: data.email
            }
        });
        if (!merchant) throw new Error('Invalid credentials');
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$utils$2f$hash$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(data.password, merchant.password_hash);
        if (!isValid) throw new Error('Invalid credentials');
        return this.generateTokens(merchant);
    }
    static async generateTokens(merchant) {
        const user = {
            id: merchant.id,
            email: merchant.email,
            role: 'MERCHANT',
            merchant_id: merchant.id
        };
        const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$utils$2f$token$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signAccessToken"])({
            ...user,
            sub: merchant.id
        });
        // Refresh Token (Rotation)
        const refreshTokenString = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
        await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$infrastructure$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].refreshToken.create({
            data: {
                token_hash: refreshTokenString,
                merchant_id: merchant.id,
                expires_at: expiresAt,
                revoked: false
            }
        });
        return {
            user,
            accessToken,
            refreshToken: refreshTokenString
        };
    }
}
}),
"[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Ekonom-IA (App)/Ekonom-IANew/backend/src/services/auth.service.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$src$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthService"].login(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Ekonom$2d$IA__$28$App$292f$Ekonom$2d$IANew$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 401
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7cfda534._.js.map
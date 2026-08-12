"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const port = process.env.PORT || 3001;
    try {
        await app.listen(port);
        console.log(`✅ Serveur Backend NestJS ITexal démarré sur http://localhost:${port}/api`);
    }
    catch (err) {
        if (err.code === 'EADDRINUSE') {
            const altPort = 3002;
            console.warn(`⚠️ Port ${port} occupé. Tentative sur le port alternatif ${altPort}...`);
            await app.listen(altPort);
            console.log(`✅ Serveur Backend NestJS ITexal démarré sur http://localhost:${altPort}/api`);
        }
        else {
            throw err;
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
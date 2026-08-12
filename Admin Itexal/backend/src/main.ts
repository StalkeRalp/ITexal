import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Redirection HTTP / En-têtes de sécurité HSTS
  app.use((req: any, res: any, next: any) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Validation serveur & Assainissement des données
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    })
  );

  app.setGlobalPrefix('api');

  // CORS sécurisé
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  try {
    await app.listen(port);
    console.log(`✅ Serveur Backend NestJS ITexal démarré sur http://localhost:${port}/api`);
  } catch (err: any) {
    if (err.code === 'EADDRINUSE') {
      const altPort = 3002;
      console.warn(`⚠️ Port ${port} occupé. Tentative sur le port alternatif ${altPort}...`);
      await app.listen(altPort);
      console.log(`✅ Serveur Backend NestJS ITexal démarré sur http://localhost:${altPort}/api`);
    } else {
      throw err;
    }
  }
}

bootstrap();

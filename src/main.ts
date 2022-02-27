import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bot } from './bot';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await bot.launch();

  await app.listen(process.env.PORT || 5000);
}

bootstrap();

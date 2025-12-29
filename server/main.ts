import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Fix: use correctly named AppModule import to match the class name from './app.module'
  const app = await NestFactory.create(AppModule);

  // 重要：设置全局前缀以区分前端路由和 API 路由
  app.setGlobalPrefix('api');

  // 全局验证与转换
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('高校篮球信息管理系统 API')
    .setDescription('包含球员管理、赛事安排及AI分析的核心后台接口')
    .setVersion('1.0')
    .addTag('Players', '球员信息管理')
    .addTag('Games', '赛事与比分管理')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  // Swagger 路径也会加上 api 前缀：/api/docs
  SwaggerModule.setup('api/docs', app, document);

  // 启用 CORS 以便本地开发调试
  app.enableCors();

  await app.listen(3000);
  console.log('--- 全栈管理系统已启动 ---');
  console.log('前端访问地址: http://localhost:3000');
  console.log('API 文档地址: http://localhost:3000/api/docs');
}

// 启动服务
bootstrap();

import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PlayersModule } from './players.module';
import { GamesModule } from './games.module';
import { AiController } from './ai.controller';

// Allow skipping DB connection during development by setting SKIP_DB=true in .env
// const mongooseImports = process.env.SKIP_DB === 'true'
  // ? []
  // : [MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/hoopsmanager')];

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // 托管静态前端页面
    // 当在生产环境（NODE_ENV=production）时，优先从前端构建输出 `dist/client` 提供文件；
    // 开发时保留项目根目录以方便直接访问 `index.html` 或 Vite 输出。
    ServeStaticModule.forRoot({
      rootPath: process.env.NODE_ENV === 'production' ? join(__dirname, '..', 'dist', 'client') : join(__dirname, '..'),
      // Exclude API routes from static handling. Use the simple wildcard pattern accepted by the serve-static util.
      exclude: ['/api*'], // 排除 API 路径
    }),
    
    // 配置 MongoDB 连接（可通过 SKIP_DB=true 跳过连接，用于本地开发）
    //...mongooseImports,

    PlayersModule,
    GamesModule,
  ],
  controllers: [AiController],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayersModule } from './players.module';
import { GamesModule } from './games.module';

@Module({
  imports: [
    // 托管静态前端页面
    // 假设构建后的前端文件在项目根目录或指定目录
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'), // 指向 index.html 所在的根目录
      exclude: ['/api*'], // 排除 API 路径，交给控制器处理
    }),
    
    // 配置 MongoDB 连接
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/hoopsmanager'
    ),
    
    PlayersModule,
    GamesModule,
  ],
})
export class AppModule {}

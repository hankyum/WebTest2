
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesController } from './games.controller';
import { Game, GameSchema } from './schemas';

@Module({
  imports: [
    // 将 Game 模型注册到当前模块
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GamesController],
})
export class GamesModule {}

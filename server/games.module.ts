
import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { GamesController } from './games.controller';
import { Game, GameSchema } from './schemas';
import { GamesService } from './games.service';

const gamesImports = process.env.SKIP_DB === 'true'
  ? []
  : [
      // 将 Game 模型注册到当前模块
      MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    ];

const gamesProviders = process.env.SKIP_DB === 'true'
  ? [{ provide: getModelToken(Game.name), useValue: {} }]
  : [];

@Module({
  imports: [...gamesImports],
  controllers: [GamesController],
  providers: [GamesService, ...gamesProviders],
  exports: [GamesService],
})
export class GamesModule {}

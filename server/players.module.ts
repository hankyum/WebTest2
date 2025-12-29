
import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { PlayersController } from './players.controller';
import { Player, PlayerSchema } from './schemas';
import { PlayersService } from './players.service';

const playersImports = process.env.SKIP_DB === 'true'
  ? []
  : [
      // 将 Player 模型注册到当前模块
      MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    ];

const playersProviders = process.env.SKIP_DB === 'true'
  ? [{ provide: getModelToken(Player.name), useValue: {} }]
  : [];

@Module({
  imports: [...playersImports],
  controllers: [PlayersController],
  providers: [PlayersService, ...playersProviders],
  exports: [PlayersService],
})
export class PlayersModule {}

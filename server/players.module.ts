
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './players.controller';
import { Player, PlayerSchema } from './schemas';

@Module({
  imports: [
    // 将 Player 模型注册到当前模块
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [PlayersController],
  // 如果需要 Service，可以在这里添加 providers
  providers: [],
})
export class PlayersModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas';
import { CreateGameDto } from './dtos/create-game.dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(dto: CreateGameDto) {
    const created = new this.gameModel(dto);
    return created.save();
  }

  async findAll() {
    return this.gameModel.find().sort({ date: 1 }).exec();
  }

  async updateScore(id: string, homeScore: number, awayScore: number) {
    const updated = await this.gameModel.findByIdAndUpdate(
      id,
      { homeScore, awayScore, status: 'COMPLETED' },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException('Game not found');
    return updated;
  }
}

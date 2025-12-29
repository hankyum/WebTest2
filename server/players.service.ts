import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schemas';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const created = new this.playerModel(createPlayerDto);
    return created.save();
  }

  async findAll() {
    return this.playerModel.find().exec();
  }

  async findOne(id: string) {
    const player = await this.playerModel.findById(id).exec();
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async update(id: string, updateDto: UpdatePlayerDto) {
    const updated = await this.playerModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Player not found');
    return updated;
  }

  async remove(id: string) {
    const removed = await this.playerModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('Player not found');
    return removed;
  }
}

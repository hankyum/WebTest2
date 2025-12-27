
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>
  ) {}

  @Get()
  @ApiOperation({ summary: '获取完整赛程' })
  async findAll() {
    return this.gameModel.find().sort({ date: 1 }).exec();
  }

  @Post()
  @ApiOperation({ summary: '安排新赛事' })
  async create(@Body() gameDto: any) {
    const newGame = new this.gameModel(gameDto);
    return newGame.save();
  }

  @Patch(':id/score')
  @ApiOperation({ summary: '更新比赛比分' })
  async updateScore(
    @Param('id') id: string,
    @Body() scoreDto: { homeScore: number; awayScore: number }
  ) {
    return this.gameModel.findByIdAndUpdate(
      id,
      { 
        homeScore: scoreDto.homeScore, 
        awayScore: scoreDto.awayScore,
        status: 'COMPLETED' 
      },
      { new: true }
    ).exec();
  }
}

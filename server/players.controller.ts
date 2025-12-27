
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schemas';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<Player>
  ) {}

  @Get()
  @ApiOperation({ summary: '获取所有球员列表' })
  @ApiResponse({ status: 200, description: '返回球员数据数组' })
  async findAll() {
    return this.playerModel.find().exec();
  }

  @Post()
  @ApiOperation({ summary: '新增球员信息' })
  async create(@Body() playerDto: any) {
    const createdPlayer = new this.playerModel(playerDto);
    return createdPlayer.save();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个球员详情' })
  async findOne(@Param('id') id: string) {
    return this.playerModel.findById(id).exec();
  }

  @Put(':id')
  @ApiOperation({ summary: '更新球员数据' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.playerModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除球员记录' })
  async remove(@Param('id') id: string) {
    return this.playerModel.findByIdAndDelete(id).exec();
  }
}

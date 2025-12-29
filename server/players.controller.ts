
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiOperation({ summary: '获取所有球员列表' })
  @ApiResponse({ status: 200, description: '返回球员数据数组' })
  async findAll() {
    return this.playersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '新增球员信息' })
  @ApiCreatedResponse({ description: '球员已创建' })
  async create(@Body() playerDto: CreatePlayerDto) {
    return this.playersService.create(playerDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个球员详情' })
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新球员数据' })
  async update(@Param('id') id: string, @Body() updateDto: UpdatePlayerDto) {
    return this.playersService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除球员记录' })
  async remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}

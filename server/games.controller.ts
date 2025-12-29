
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateScoreDto } from './dtos/update-score.dto';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: '获取完整赛程' })
  async findAll() {
    return this.gamesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '安排新赛事' })
  @ApiCreatedResponse({ description: '赛事已创建' })
  async create(@Body() gameDto: CreateGameDto) {
    return this.gamesService.create(gameDto);
  }

  @Patch(':id/score')
  @ApiOperation({ summary: '更新比赛比分' })
  async updateScore(
    @Param('id') id: string,
    @Body() scoreDto: UpdateScoreDto
  ) {
    return this.gamesService.updateScore(id, scoreDto.homeScore, scoreDto.awayScore);
  }
}

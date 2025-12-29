import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateScoreDto {
  @ApiProperty({ description: '主队分数' })
  @IsNumber()
  @Min(0)
  homeScore: number;

  @ApiProperty({ description: '客队分数' })
  @IsNumber()
  @Min(0)
  awayScore: number;
}

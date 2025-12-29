import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ description: '对手名称' })
  @IsString()
  opponent: string;

  @ApiProperty({ description: '比赛日期 (ISO 日期字符串)' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: '比赛地点', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}

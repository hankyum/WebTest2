import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsIn, Min, Max } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ description: '球员姓名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '球衣号码' })
  @IsNumber()
  number: number;

  @ApiProperty({ description: '场上位置', enum: ['PG', 'SG', 'SF', 'PF', 'C'] })
  @IsString()
  @IsIn(['PG', 'SG', 'SF', 'PF', 'C'])
  position: string;

  @ApiProperty({ description: '身高 (cm)', required: false })
  @IsOptional()
  @IsString()
  height?: string;

  @ApiProperty({ description: '体重 (kg)', required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: '年级', required: false })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ description: '场均得分', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  ppg?: number;

  @ApiProperty({ description: '场均篮板', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rpg?: number;

  @ApiProperty({ description: '场均助攻', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  apg?: number;
}

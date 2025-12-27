
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Player extends Document {
  @ApiProperty({ description: '球员姓名' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: '球衣号码' })
  @Prop({ required: true })
  number: number;

  @ApiProperty({ description: '场上位置', enum: ['PG', 'SG', 'SF', 'PF', 'C'] })
  @Prop({ required: true })
  position: string;

  @ApiProperty({ description: '身高 (cm)' })
  @Prop()
  height: string;

  @ApiProperty({ description: '体重 (kg)' })
  @Prop()
  weight: number;

  @ApiProperty({ description: '年级' })
  @Prop()
  year: string;

  @ApiProperty({ description: '场均得分' })
  @Prop({ default: 0 })
  ppg: number;

  @ApiProperty({ description: '场均篮板' })
  @Prop({ default: 0 })
  rpg: number;

  @ApiProperty({ description: '场均助攻' })
  @Prop({ default: 0 })
  apg: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class Game extends Document {
  @ApiProperty({ description: '对手名称' })
  @Prop({ required: true })
  opponent: string;

  @ApiProperty({ description: '比赛日期' })
  @Prop({ required: true })
  date: string;

  @ApiProperty({ description: '比赛地点' })
  @Prop()
  location: string;

  @ApiProperty({ description: '比赛状态', enum: ['UPCOMING', 'LIVE', 'COMPLETED'] })
  @Prop({ default: 'UPCOMING' })
  status: string;

  @ApiProperty({ description: '主队分数' })
  @Prop({ default: 0 })
  homeScore: number;

  @ApiProperty({ description: '客队分数' })
  @Prop({ default: 0 })
  awayScore: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);


export enum PlayerPosition {
  PG = '控球后卫',
  SG = '得分后卫',
  SF = '小前锋',
  PF = '大前锋',
  C = '中锋'
}

export enum GameStatus {
  UPCOMING = '即将开始',
  LIVE = '进行中',
  COMPLETED = '已结束'
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  height: string;
  weight: number;
  year: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    spg: number;
    bpg: number;
  };
  photo: string;
}

export interface Game {
  id: string;
  opponent: string;
  date: string;
  location: string;
  status: GameStatus;
  score?: {
    home: number;
    away: number;
  };
}

export interface ScoutingReport {
  id: string;
  playerId: string;
  date: string;
  content: string;
  aiInsights: string[];
}

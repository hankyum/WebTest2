
import { Player, PlayerPosition, Game, GameStatus } from '../types';

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: '杰克逊·里弗斯',
    number: 12,
    position: PlayerPosition.PG,
    height: "188cm",
    weight: 84,
    year: '大四',
    stats: { ppg: 18.5, rpg: 4.2, apg: 8.1, spg: 2.1, bpg: 0.3 },
    photo: 'https://picsum.photos/seed/jackson/200/200'
  },
  {
    id: '2',
    name: '马库斯·索恩',
    number: 34,
    position: PlayerPosition.C,
    height: "211cm",
    weight: 111,
    year: '大三',
    stats: { ppg: 14.2, rpg: 11.5, apg: 1.2, spg: 0.8, bpg: 2.5 },
    photo: 'https://picsum.photos/seed/marcus/200/200'
  },
  {
    id: '3',
    name: '里奥·圣地亚哥',
    number: 5,
    position: PlayerPosition.SF,
    height: "201cm",
    weight: 95,
    year: '大二',
    stats: { ppg: 22.1, rpg: 6.8, apg: 3.4, spg: 1.5, bpg: 1.1 },
    photo: 'https://picsum.photos/seed/leo/200/200'
  },
  {
    id: '4',
    name: '大卫·威尔逊',
    number: 23,
    position: PlayerPosition.SG,
    height: "193cm",
    weight: 88,
    year: '大一',
    stats: { ppg: 12.8, rpg: 3.1, apg: 2.5, spg: 0.9, bpg: 0.2 },
    photo: 'https://picsum.photos/seed/david/200/200'
  }
];

export const mockGames: Game[] = [
  {
    id: 'g1',
    opponent: '州立大学',
    date: '2024-11-20',
    location: '主场 - 校队球馆',
    status: GameStatus.COMPLETED,
    score: { home: 84, away: 72 }
  },
  {
    id: 'g2',
    opponent: '城市科技狮队',
    date: '2024-12-01',
    location: '客场 - 科技穹顶',
    status: GameStatus.UPCOMING
  },
  {
    id: 'g3',
    opponent: '海岸学院',
    date: '2024-12-05',
    location: '主场 - 校队球馆',
    status: GameStatus.UPCOMING
  }
];

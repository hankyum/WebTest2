
import React from 'react';
import { Calendar, MapPin, Trophy, ChevronRight, Clock } from 'lucide-react';
import { mockGames } from '../store/mockData';
import { GameStatus } from '../types';

const Tournaments: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">赛季赛程</h2>
          <p className="text-slate-400 mt-1">近期比赛安排与历史赛事表现。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="text-orange-500" size={20} />
            近期对阵
          </h3>
          <div className="space-y-4">
            {mockGames.filter(g => g.status === GameStatus.UPCOMING).map(game => (
              <div key={game.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-orange-500/30 transition-all flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex flex-col items-center justify-center border border-slate-800">
                  <span className="text-orange-500 font-bold text-lg">{game.date.split('-')[2]}</span>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">12月</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">分区赛</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                       <MapPin size={12} /> {game.location}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white">对阵 {game.opponent}</h4>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-1.5 text-orange-500 text-sm font-semibold">
                      <Clock size={16} /> 下午 7:00
                   </div>
                   <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                      查看详情
                   </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold flex items-center gap-2 pt-6">
            <Trophy className="text-blue-500" size={20} />
            历史战绩
          </h3>
          <div className="space-y-4">
            {mockGames.filter(g => g.status === GameStatus.COMPLETED).map(game => (
              <div key={game.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                <div>
                   <p className="text-xs text-slate-500 font-medium mb-1">{game.date}</p>
                   <h4 className="text-lg font-bold text-white">对阵 {game.opponent}</h4>
                </div>
                <div className="flex items-center gap-8">
                   <div className="flex items-center gap-4">
                      <div className="text-center">
                         <p className="text-xs text-slate-500 font-bold mb-1">主场</p>
                         <p className={`text-2xl font-black ${game.score!.home > game.score!.away ? 'text-green-500' : 'text-white'}`}>{game.score?.home}</p>
                      </div>
                      <div className="text-slate-700 font-bold text-xl">-</div>
                      <div className="text-center">
                         <p className="text-xs text-slate-500 font-bold mb-1">客场</p>
                         <p className={`text-2xl font-black ${game.score!.away > game.score!.home ? 'text-green-500' : 'text-white'}`}>{game.score?.away}</p>
                      </div>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                     game.score!.home > game.score!.away ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                   }`}>
                      {game.score!.home > game.score!.away ? '获胜' : '战败'}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-2xl shadow-xl shadow-orange-950/40">
              <h3 className="text-white font-bold text-lg mb-2">下次客场行程</h3>
              <p className="text-orange-100/80 text-sm mb-6">即将到来的芝加哥客场比赛周，航班和酒店已确认。</p>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-orange-200">出发时间</span>
                    <span className="text-xs font-bold text-white">12月12日, 09:30 AM</span>
                 </div>
                 <div className="h-px bg-white/10 mb-3"></div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-orange-200">航班号</span>
                    <span className="text-xs font-bold text-white">UA 2432 (登机口 B12)</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4">赛季积分榜</h3>
              <div className="space-y-4">
                 {[
                   { team: '飞鹰队 (本队)', w: 12, l: 3, pos: 1 },
                   { team: '州立大学', w: 10, l: 5, pos: 2 },
                   { team: '海岸学院', w: 9, l: 6, pos: 3 },
                   { team: '城市科技狮队', w: 7, l: 8, pos: 4 },
                 ].map((row, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 w-4">{row.pos}.</span>
                      <div className="flex-1 flex justify-between items-center">
                         <span className={`text-sm ${row.pos === 1 ? 'text-orange-500 font-bold' : 'text-slate-300'}`}>{row.team}</span>
                         <span className="text-xs font-mono text-slate-500">{row.w}胜-{row.l}负</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;

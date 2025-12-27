
import React, { useState } from 'react';
import { MoreHorizontal, Filter, ArrowUpDown, ChevronRight, UserPlus } from 'lucide-react';
import { mockPlayers } from '../store/mockData';
import { Player } from '../types';

const Players: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = mockPlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">现役名单</h2>
          <p className="text-slate-400 mt-1">管理并监控球员信息及赛季统计数据。</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            <Filter size={16} /> 筛选
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
            <UserPlus size={16} /> 添加球员
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                <th className="px-6 py-4">球员</th>
                <th className="px-6 py-4">场上位置</th>
                <th className="px-6 py-4">年级</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                    场均得分 <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4">篮板</th>
                <th className="px-6 py-4">助攻</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden relative">
                        <img src={player.photo} alt={player.name} className="object-cover w-full h-full" />
                        <div className="absolute top-0 right-0 bg-orange-600 text-[8px] font-bold px-1 rounded-bl">#{player.number}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{player.name}</div>
                        <div className="text-xs text-slate-500">{player.height} • {Math.round(player.weight * 0.453592)} kg</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{player.year}</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">{player.stats.ppg}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{player.stats.rpg}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{player.stats.apg}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-slate-400">可用</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Players;

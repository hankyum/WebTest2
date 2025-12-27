
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';
import { mockPlayers } from '../store/mockData';

const Dashboard: React.FC = () => {
  const statCards = [
    { label: '球员总数', value: '15', change: '+2', icon: <Users className="text-blue-500" /> },
    { label: '场均得分', value: '78.4', change: '+5.2', icon: <Activity className="text-orange-500" /> },
    { label: '投篮命中率', value: '46.2%', change: '+1.4%', icon: <Target className="text-green-500" /> },
    { label: '赛季胜场', value: '12', change: '80% 胜率', icon: <TrendingUp className="text-purple-500" /> },
  ];

  const chartData = mockPlayers.map(p => ({
    name: p.name.split(' ')[0],
    ppg: p.stats.ppg,
    rpg: p.stats.rpg
  }));

  const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">球队概览</h2>
          <p className="text-slate-400 mt-1">赛季进度与表现分析</p>
        </div>
        <div className="text-sm font-medium bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-slate-400">
          最后更新: 今天, 09:42 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                card.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{card.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">球员表现分析</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="ppg" fill="#f97316" radius={[4, 4, 0, 0]} name="场均得分" />
                <Bar dataKey="rpg" fill="#3b82f6" radius={[4, 4, 0, 0]} name="场均篮板" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">场上位置分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '后卫', value: 6 },
                    { name: '前锋', value: 5 },
                    { name: '中锋', value: 4 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-500"></div> 后卫</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> 前锋</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> 中锋</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

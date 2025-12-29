import React, { useState } from 'react';
// Fix: Consolidate icon imports from lucide-react and remove incorrect lucide-material reference
import { 
  BrainCircuit as BrainIcon, 
  Sparkles as SparkleIcon, 
  Loader2 as LoaderIcon, 
  Download as DownloadIcon, 
  UserCheck as UserIcon 
} from 'lucide-react';
import { mockPlayers } from '../store/mockData';
import { Player } from '../types';

const AIScout: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!selectedPlayer) return;
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: selectedPlayer }),
      });
      const data = await res.json();
      if (data?.report) setReport(data.report);
      else setReport('未能生成报告：服务返回错误');
    } catch (error) {
      console.error(error);
      setReport('请求 AI 服务时出错，请检查服务器日志。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <BrainIcon className="text-orange-500" />
            AI 球探分析
          </h2>
          <p className="text-slate-400 mt-1">生成智能球探报告和球员发展计划。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Selection Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl h-fit">
            <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">选择球员</h3>
            <div className="space-y-2">
              {mockPlayers.map(player => (
                <button
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                    selectedPlayer?.id === player.id 
                      ? 'bg-orange-600/10 border-orange-600/40 text-white' 
                      : 'border-transparent text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <img src={player.photo} className="w-8 h-8 rounded-lg object-cover" alt="" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{player.name}</p>
                    <p className="text-xs opacity-60">#{player.number} • {player.position}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleGenerateReport}
            disabled={!selectedPlayer || loading}
            className="w-full py-4 bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-orange-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20"
          >
            {loading ? <LoaderIcon className="animate-spin" /> : <SparkleIcon size={20} />}
            生成球探报告
          </button>
        </div>

        {/* Report Area */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl h-full min-h-[500px] flex flex-col">
            {!selectedPlayer && !report && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                  <UserIcon size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">准备进行分析</h3>
                <p className="max-w-sm">从名单中选择一名球员，开始生成 AI 驱动的球探报告。</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                   <div className="w-24 h-24 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin"></div>
                   <BrainIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">正在分析数据点...</p>
                  <p className="text-slate-500 text-sm">正在处理比赛日志、统计数据和身体素质档案。</p>
                </div>
              </div>
            )}

            {report && !loading && (
              <div className="p-8 space-y-6 overflow-y-auto">
                <div className="flex justify-between items-start border-b border-slate-800 pb-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedPlayer?.photo} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedPlayer?.name}</h3>
                      <p className="text-orange-500 font-medium">{selectedPlayer?.position} • 球探报告</p>
                    </div>
                  </div>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">
                    <DownloadIcon size={20} />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-300 font-sans">
                  {report}
                </div>

                <div className="bg-orange-600/5 border border-orange-600/20 rounded-xl p-6">
                  <h4 className="flex items-center gap-2 text-orange-500 font-bold mb-3">
                    <SparkleIcon size={18} />
                    AI 建议行动
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></div>
                      <span>增加底角三分投篮训练量以提高效率。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></div>
                      <span>专注于横向移动敏捷性训练，以改善外线防守。</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIScout;
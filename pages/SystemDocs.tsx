
import React, { useState, useEffect } from 'react';
import { 
  Terminal, Database, ShieldCheck, Code2, Server, 
  Play, Cpu, Globe, Layout, Layers, Box, CheckCircle2, 
  Zap, ArrowUpCircle 
} from 'lucide-react';

const SystemDocs: React.FC = () => {
  const [buildProgress, setBuildProgress] = useState(100);
  const [isCompiling, setIsCompiling] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/api/players', desc: '检索所有球员基础信息及赛季汇总统计' },
    { method: 'POST', path: '/api/players', desc: '录入新球员，支持 Mongoose 数据校验' },
    { method: 'GET', path: '/api/games', desc: '获取赛季完整赛程与实时比分情况' },
    { method: 'PATCH', path: '/api/games/:id/score', desc: '更新单场比赛最终比分并关闭赛事' },
    { method: 'POST', path: '/api/ai/analyze', desc: '调用 Gemini 模型生成深度球探分析报告' },
  ];

  const scripts = [
    { cmd: 'npm run build:clean', desc: '彻底清理并重构 NestJS 后端产物', color: 'text-orange-400' },
    { cmd: 'npm run build:prod', desc: '生产环境优化构建（开启混淆与压缩）', color: 'text-blue-400' },
    { cmd: 'npm run type-check', desc: '全量 TypeScript 类型安全性静态检查', color: 'text-indigo-400' },
    { cmd: 'npm run start:prod', desc: '启动生产集群模式', color: 'text-green-400' },
  ];

  const handleSimulateBuild = () => {
    setIsCompiling(true);
    setBuildProgress(0);
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompiling(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Code2 className="text-blue-500" />
            全栈系统架构控制台
          </h2>
          <p className="text-slate-400 mt-1">集成了前端托管、RESTful API 及 Mongoose 数据层的全栈管理方案。</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-900 px-4 py-2 border border-slate-800 rounded-xl flex items-center gap-3 shadow-lg shadow-green-500/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-bold text-slate-300">All-in-One Server: Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Compilation Pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Layers className="text-indigo-500" size={20} />
                <h3 className="font-bold text-white">构建流水线 (Pipeline)</h3>
              </div>
              <button 
                onClick={handleSimulateBuild}
                disabled={isCompiling}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 rounded-lg text-xs font-bold transition-all"
              >
                {isCompiling ? '构建中...' : <><Zap size={14} /> 立即编译</>}
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${buildProgress > 20 ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <Box size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">TS 源码编译</span>
                    <span className="text-xs font-mono text-slate-500">{Math.min(buildProgress, 30) * 3.3}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${Math.min(buildProgress, 30) * 3.3}%` }}></div>
                  </div>
                </div>
                {buildProgress >= 30 && <CheckCircle2 className="text-green-500 absolute -right-1" size={16} />}
              </div>

              <div className="flex items-center gap-4 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${buildProgress > 70 ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <Layout size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">前端资产打包</span>
                    <span className="text-xs font-mono text-slate-500">{buildProgress < 30 ? 0 : Math.min(buildProgress - 30, 40) * 2.5}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${buildProgress < 30 ? 0 : Math.min(buildProgress - 30, 40) * 2.5}%` }}></div>
                  </div>
                </div>
                {buildProgress >= 70 && <CheckCircle2 className="text-green-500 absolute -right-1" size={16} />}
              </div>

              <div className="flex items-center gap-4 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${buildProgress === 100 ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <ArrowUpCircle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">生产环境分发</span>
                    <span className="text-xs font-mono text-slate-500">{buildProgress < 70 ? 0 : (buildProgress - 70) * 3.3}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${buildProgress < 70 ? 0 : (buildProgress - 70) * 3.3}%` }}></div>
                  </div>
                </div>
                {buildProgress === 100 && <CheckCircle2 className="text-green-500 absolute -right-1" size={16} />}
              </div>
            </div>
          </div>

          {/* Running Scripts Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-sm font-bold tracking-tight">高级编译与部署指令</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">CLI VERSION 11.0.0</span>
            </div>
            <div className="p-6 bg-black/40 font-mono">
              <div className="space-y-3">
                {scripts.map((s, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-xl border border-slate-800/50 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <Play size={14} className={s.color} />
                      <span className={`text-sm font-bold ${s.color}`}>{s.cmd}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
              <span className="text-sm font-bold flex items-center gap-2">
                <Server size={16} className="text-blue-400" />
                RESTful 服务网关
              </span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">v1.0.4-stable</span>
            </div>
            <div className="divide-y divide-slate-800">
              {endpoints.map((api, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors">
                  <span className={`w-16 text-center text-[10px] font-black py-1 rounded ${
                    api.method === 'GET' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                    api.method === 'POST' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                    'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                  }`}>
                    {api.method}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-slate-200">{api.path}</p>
                    <p className="text-xs text-slate-500">{api.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
             <div className="flex items-center gap-2 mb-6 text-slate-400">
                <Cpu size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">构建节点性能</h3>
             </div>
             <div className="space-y-4">
                {[
                  { label: '平均构建耗时', val: '42.5s', pct: '65%' },
                  { label: '产物包大小 (Gzip)', val: '1.2MB', pct: '40%' },
                  { label: '依赖树层级', val: '8', pct: '20%' },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">{m.label}</span>
                      <span className="text-white font-mono">{m.val}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: m.pct }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
              <Database className="text-green-500" size={16} />
              数据映射状态 (ODM)
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Player Schema</span>
                  <span className="text-[10px] text-green-500 font-bold">Synced</span>
                </div>
                <div className="w-full bg-slate-800 h-0.5 mt-2 overflow-hidden">
                  <div className="bg-green-500 h-full w-full"></div>
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Game Schema</span>
                  <span className="text-[10px] text-green-500 font-bold">Synced</span>
                </div>
                <div className="w-full bg-slate-800 h-0.5 mt-2 overflow-hidden">
                  <div className="bg-green-500 h-full w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-xl shadow-indigo-950/20 relative overflow-hidden group border border-white/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
              <ShieldCheck size={80} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2 relative z-10 flex items-center gap-2">
              <ShieldCheck size={20} />
              安全加固
            </h3>
            <p className="text-indigo-100/70 text-sm mb-4 relative z-10">
              在编译阶段自动进行源码审计、依赖漏洞扫描以及 CSRF 注入防护加固。
            </p>
            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-bold py-2.5 rounded-lg border border-white/20 transition-all active:scale-95">
              下载完整构建日志
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDocs;

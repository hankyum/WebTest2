
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  BrainCircuit, 
  Menu, 
  X,
  Search,
  Bell,
  ChevronRight,
  Settings,
  Terminal
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Tournaments from './pages/Tournaments';
import AIScout from './pages/AIScout';
import SystemDocs from './pages/SystemDocs';

type View = 'dashboard' | 'players' | 'tournaments' | 'scout' | 'system';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: '仪表盘', icon: <LayoutDashboard size={20} /> },
    { id: 'players', label: '球员名单', icon: <Users size={20} /> },
    { id: 'tournaments', label: '赛事管理', icon: <Trophy size={20} /> },
    { id: 'scout', label: 'AI 球探', icon: <BrainCircuit size={20} /> },
    { id: 'system', label: '系统接口', icon: <Terminal size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 border-r border-slate-800 bg-slate-900 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
            <div className="bg-orange-600 p-2 rounded-lg">
              <Trophy className="text-white" size={24} />
            </div>
            <h1 className="font-bold text-xl tracking-tight">HoopsManager</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/coach/32/32" className="rounded-full border border-slate-700" alt="Coach" />
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold">卡特教练</p>
                <p className="text-xs text-slate-500">主教练</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="搜索接口、球员、比赛数据..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">API 在线</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-200 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              管理后台
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'players' && <Players />}
          {activeView === 'tournaments' && <Tournaments />}
          {activeView === 'scout' && <AIScout />}
          {activeView === 'system' && <SystemDocs />}
        </div>
      </main>
    </div>
  );
};

export default App;

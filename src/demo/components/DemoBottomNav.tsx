import React from 'react';
import { LayoutGrid, ListChecks, MessagesSquare, TrendingUp } from 'lucide-react';
import { Language, ScreenType } from '../../types';
import { translations } from '../../i18n/translations';

interface DemoBottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: Language;
  unreadChat?: boolean;
}

export const DemoBottomNav: React.FC<DemoBottomNavProps> = ({
  currentScreen,
  onNavigate,
  language,
  unreadChat = false,
}) => {
  const t = translations[language].demo;

  const tabs: { id: ScreenType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: t.homeTab, icon: LayoutGrid },
    { id: 'tasks', label: t.tasksTab, icon: ListChecks },
    { id: 'chat', label: t.chatTab, icon: MessagesSquare },
    { id: 'performance', label: t.performanceTab, icon: TrendingUp },
  ];

  return (
    <nav
      aria-label="App"
      className="flex items-stretch justify-around border-t border-slate-100 bg-white px-2 pb-1.5 pt-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] z-30 shrink-0 select-none"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentScreen === tab.id ||
          (tab.id === 'tasks' &&
            (currentScreen === 'new-task' ||
              currentScreen === 'task-details' ||
              currentScreen === 'my-task'));

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-[11px] transition-colors cursor-pointer ${
              isActive
                ? 'font-bold text-[#0b6b5e]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="relative">
              <Icon
                className={`size-5 transition-transform ${
                  isActive ? 'stroke-[2.4] text-[#0b6b5e]' : 'stroke-[1.8]'
                }`}
              />
              {tab.id === 'chat' && unreadChat && (
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[#12b5a6] ring-2 ring-white" />
              )}
            </div>
            <span className="leading-tight text-[11px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

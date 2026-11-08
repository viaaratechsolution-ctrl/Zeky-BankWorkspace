import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface DemoNavbarProps {
  language: Language;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  avatarUrl?: string;
  unreadCount?: number;
  rightAction?: React.ReactNode;
}

export const DemoNavbar: React.FC<DemoNavbarProps> = ({
  language,
  title,
  subtitle,
  onBack,
  showBack = true,
  avatarUrl = '/demo/ahmed-hassan.png',
  unreadCount = 1,
  rightAction,
}) => {
  const t = translations[language].demo;

  return (
    <header className="px-4 pt-2 pb-2.5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
      {/* Left section: Back arrow + Title & Subtitle */}
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-[15px] font-bold text-slate-900 leading-tight truncate">
            {title || t.bankName}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right section: Notification bell & Avatar or custom right action */}
      <div className="flex items-center gap-2 shrink-0">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              type="button"
              className="relative w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#12b5a6] rounded-full ring-2 ring-white" />
              )}
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

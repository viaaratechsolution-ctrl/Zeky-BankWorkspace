import React from 'react';
import { RefreshCw, Zap, Clock, Edit3, Landmark } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { DemoNavbar } from '../components/DemoNavbar';

interface HomeScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onSelectTask,
}) => {
  const isRtl = language === 'ar';

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending' || t.status === 'overdue').length;
  const totalCount = 24;
  const completedNumber = 12 + (completedCount > 1 ? completedCount - 1 : 0);
  const completionPercentage = Math.round((completedNumber / totalCount) * 100);

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'بنك FNT' : 'FNT Bank'}
          subtitle={isRtl ? 'الصفحة الرئيسية' : 'Cairo Main Branch'}
          showBack={true}
          onBack={() => onNavigate('tasks')}
        />
      </div>

      {/* Independently Scrollable Application Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-3.5 pb-6 space-y-4">
        {/* Branch Team Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dde4fa] text-[#46507a] text-[11px] font-medium">
            <Landmark className="w-3.5 h-3.5 text-[#46507a]" />
            <span>{isRtl ? 'القاهرة الرئيسية · فريق العمليات' : 'Cairo Main · Operations Team'}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#12b5a6]" />
        </div>

        {/* Greeting Header */}
        <div>
          <h2 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight">
            {isRtl ? 'صباح الخير يا أحمد' : 'Good morning, Ahmed'}
          </h2>
          <p className="text-[12px] text-[#64748b] mt-1 leading-normal">
            {isRtl
              ? 'إليكم ما يحتاج إلى اهتمامكم اليوم في جميع أنحاء الفرع.'
              : 'Here is what needs your attention today across the branch.'}
          </p>
        </div>

        {/* Workspace Progress Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-3.5">
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#e3f3ef] text-[#0b6b5e] flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5" />
              </span>
              <h3 className="text-[14px] font-bold text-[#111827]">
                {isRtl ? 'تقدم مساحة العمل' : 'Workspace Progress'}
              </h3>
            </div>
            <span className="text-[10.5px] font-medium px-2.5 py-0.5 bg-[#f1f5f9] text-[#64748b] rounded-full">
              {isRtl ? 'مزامنة منتصف النهار' : 'Midday Sync'}
            </span>
          </div>

          {/* Numbers & Gauge */}
          <div className="flex items-center justify-between pt-0.5">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-extrabold text-[#111827] tabular-nums leading-none">
                  {completionPercentage}%
                </span>
                <span className="text-[12px] font-bold text-[#0b6b5e]">
                  {isRtl ? 'على المسار الصحيح' : 'On Track'}
                </span>
              </div>
              <p className="text-[12px] text-[#64748b] mt-1.5 font-medium">
                {isRtl
                  ? `تم إنجاز ${completedNumber} مهمة من أصل ${totalCount} مهمة`
                  : `${completedNumber} of ${totalCount} tasks completed`}
              </p>
            </div>

            {/* Circular Gauge Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="text-[#e2e8f0]"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="text-[#12b5a6] transition-all duration-700 ease-out"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <div className="absolute text-[8px] font-bold text-[#64748b] uppercase tracking-tighter text-center leading-tight">
                {isRtl ? 'على المسار' : 'ON TRACK'}
              </div>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#12b5a6] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* 3 Status Metric Boxes */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-[#e3f3ef] hover:opacity-90 transition-opacity p-2.5 rounded-xl text-center cursor-pointer"
            >
              <div className="text-[18px] font-extrabold text-[#0b6b5e] tabular-nums leading-none">
                {completedNumber}
              </div>
              <div className="text-[11px] text-[#0b6b5e] font-semibold mt-1">
                {isRtl ? 'مكتمل' : 'Completed'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-[#dde4fa] hover:opacity-90 transition-opacity p-2.5 rounded-xl text-center cursor-pointer"
            >
              <div className="text-[18px] font-extrabold text-[#46507a] tabular-nums leading-none">
                {8 + inProgressCount - 1}
              </div>
              <div className="text-[11px] text-[#46507a] font-semibold mt-1">
                {isRtl ? 'في تَقَدُم' : 'In Progress'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-[#fde3e3] hover:opacity-90 transition-opacity p-2.5 rounded-xl text-center cursor-pointer"
            >
              <div className="text-[18px] font-extrabold text-[#b42318] tabular-nums leading-none">
                {Math.max(1, 4 + pendingCount - 1)}
              </div>
              <div className="text-[11px] text-[#b42318] font-semibold mt-1">
                {isRtl ? 'قيد الانتظار' : 'Pending'}
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming Tasks Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[14px] font-bold text-[#111827]">
                {isRtl ? 'المهام القادمة' : 'Upcoming Tasks'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#e2e8f0] text-[#64748b] text-[11px] font-bold">
                2
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-[12px] font-bold text-[#0b6b5e] hover:underline cursor-pointer"
            >
              {isRtl ? 'عرض الأولوية' : 'View Priority'}
            </button>
          </div>

          <div className="space-y-2">
            {/* Task Item 1 */}
            <div
              onClick={() => {
                onSelectTask('task-1');
                onNavigate('task-details');
              }}
              className="bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 hover:border-[#12b5a6]/40 transition-all cursor-pointer flex items-center justify-between active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <img
                    src="/demo/mohamed-ali.png"
                    alt="Mohamed Ali"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#12b5a6] text-white flex items-center justify-center text-[9px] shadow-sm">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-[#111827] truncate">
                    {isRtl ? 'تقرير العمليات اليومية للفرع' : 'Daily Branch Operations Report'}
                  </h4>
                  <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                    {isRtl
                      ? 'محمد على • اليوم · الساعة 3:00 مساءً'
                      : 'Mohamed Ali • Today · 3:00 PM'}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#dde4fa] text-[#46507a]">
                  {isRtl ? 'مراجعة' : 'Review'}
                </span>
              </div>
            </div>

            {/* Task Item 2 */}
            <div
              onClick={() => {
                onSelectTask('task-2');
                onNavigate('task-details');
              }}
              className="bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 hover:border-[#12b5a6]/40 transition-all cursor-pointer flex items-center justify-between active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <img
                    src="/demo/sara-mohamed.png"
                    alt="Sara Mohamed"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#12b5a6] text-white flex items-center justify-center text-[9px] shadow-sm">
                    <Clock className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-[#111827] truncate">
                    {isRtl ? 'مراجعة وثائق العميل' : 'Customer Documentation Review'}
                  </h4>
                  <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                    {isRtl
                      ? 'سارة محمد • اليوم · الساعة 4:00 مساءً'
                      : 'Sara Mohamed • Today · 4:00 PM'}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318]">
                  {isRtl ? 'عالي' : 'High'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#111827]">
              {isRtl ? 'النشاط الأخير' : 'Recent Activity'}
            </h3>
            <span className="text-[11px] text-[#64748b] font-medium">
              {isRtl ? 'بث مباشر' : 'Real-time Feed'}
            </span>
          </div>

          <div
            onClick={() => {
              onSelectTask('task-1');
              onNavigate('task-details');
            }}
            className="bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 flex items-center justify-between cursor-pointer hover:border-[#12b5a6]/40 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img
                  src="/demo/mohamed-ali.png"
                  alt="Mohamed Ali"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0b6b5e] text-white flex items-center justify-center text-[9px] shadow-sm">
                  <Edit3 className="w-2.5 h-2.5" />
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#111827] truncate">
                  {isRtl ? 'قام محمد على بتحديث مهمة' : 'Mohamed Ali updated a task'}
                </h4>
                <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                  {isRtl
                    ? 'مرفق جدول بيانات التدقيق المعدل'
                    : 'Attached revised audit spreadsheet'}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#0b6b5e] shrink-0">
              {isRtl ? 'الآن' : 'Just now'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

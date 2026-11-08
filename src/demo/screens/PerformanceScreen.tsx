import React, { useState } from 'react';
import {
  ShieldCheck,
  BellRing,
  Check,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface PerformanceScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onRemindEmployee: (empName: string) => void;
  onSelectTask: (taskId: string) => void;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onRemindEmployee,
  onSelectTask,
}) => {
  const isRtl = language === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalCount = 24;
  const baseCompleted = 13 + (completedCount > 1 ? completedCount - 1 : 0);
  const progressPercent = Math.min(100, Math.round((baseCompleted / totalCount) * 100));

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'الأداء' : 'Performance'}
          subtitle={isRtl ? undefined : '• CAIRO MAIN BRANCH · OPERATIONS'}
          showBack={true}
          onBack={() => onNavigate('home')}
        />
      </div>

      {/* Independently Scrollable Application Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-3.5 pb-6 space-y-4">
        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#e2e8f0]/60 rounded-2xl">
          {isRtl ? (
            <>
              <button
                type="button"
                onClick={() => setPeriod('today')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'today'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                اليوم
              </button>
              <button
                type="button"
                onClick={() => setPeriod('week')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'week'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                هذا الاسبوع
              </button>
              <button
                type="button"
                onClick={() => setPeriod('month')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'month'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                هذا الشهر
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setPeriod('today')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'today'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setPeriod('week')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'week'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                This Week
              </button>
              <button
                type="button"
                onClick={() => setPeriod('month')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  period === 'month'
                    ? 'bg-[#12b5a6] text-white shadow-sm'
                    : 'text-[#64748b] hover:text-[#111827]'
                }`}
              >
                This Month
              </button>
            </>
          )}
        </div>

        {/* Progress Index Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-2">
          <div className="flex items-center gap-1.5 text-[#111827] text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#12b5a6]" />
            <span>{isRtl ? 'مؤشر التقدم' : 'PROGRESS INDEX'}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-[34px] font-extrabold text-[#111827] tabular-nums leading-none">
                {isRtl ? `%${progressPercent}` : `${progressPercent}%`}
              </div>
              <h3 className="text-[14px] font-bold text-[#111827] mt-1">
                {isRtl ? 'مساحة العمل الإنجاز' : 'Workspace Completion'}
              </h3>
              <p className="text-[12px] text-[#12b5a6] font-semibold mt-1">
                {isRtl
                  ? `تم إنجاز ${baseCompleted} مهمة من أصل ${totalCount} مهمة`
                  : `${baseCompleted} of ${totalCount} tasks completed`}
              </p>
            </div>

            {/* Circular Gauge Ring */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
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
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <div className="absolute text-[8px] font-bold text-[#64748b] uppercase tracking-tighter text-center leading-tight">
                {isRtl ? 'على المسار الصحيح' : 'ON TRACK'}
              </div>
            </div>
          </div>
        </div>

        {/* Needs Attention Card */}
        <div className="bg-[#fff1f2] rounded-2xl p-3.5 border border-[#fde3e3] shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-[#b42318] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#b42318]" />
            <span>{isRtl ? 'يحتاج إلى اهتمام' : 'Needs Attention'}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#111827]">
                {isRtl ? 'تقرير متابعة العملاء' : 'Customer Follow-up Report'}
              </h4>
              <p className="text-[11.5px] text-[#b42318] font-semibold mt-0.5">
                {isRtl ? 'متأخر · يوم واحد' : 'Overdue · 1 day'}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318]">
              {isRtl ? 'أولوية عالية' : 'High Priority'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-[#fde3e3]">
                <img
                  src="/demo/sara-mohamed.png"
                  alt="Nour Ahmed"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-[#111827]">
                {isRtl ? 'نور أحمد' : 'Nour Ahmed'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onRemindEmployee(isRtl ? 'نور أحمد' : 'Nour Ahmed')}
              className="py-1.5 px-3 bg-white hover:bg-rose-50 active:scale-95 text-[#b42318] text-[11px] font-bold rounded-xl border border-[#fde3e3] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5 text-[#b42318]" />
              <span>{isRtl ? 'تذكير الموظف' : 'Remind Employee'}</span>
            </button>
          </div>
        </div>

        {/* Task Overview Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[13px] font-bold text-[#111827]">
                {isRtl ? 'نظرة عامة على المهمة' : 'Task Overview'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#e2e8f0] text-[#64748b] text-[10px] font-bold">
                {isRtl ? '4 مهام' : '4 Tasks'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-[12px] font-bold text-[#12b5a6] hover:underline cursor-pointer"
            >
              {isRtl ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'task-1',
                titleEn: 'Daily Branch Operations Report',
                titleAr: 'تقرير العمليات اليومية للفرع',
                assigneeEn: 'Mohamed Ali · Today 3:00 PM',
                assigneeAr: 'محمد على · اليوم الساعة 3:00 مساءً',
                status: 'completed',
                statusLabelEn: 'Completed',
                statusLabelAr: 'مكتمل',
              },
              {
                id: 'task-2',
                titleEn: 'Customer Documentation Review',
                titleAr: 'مراجعة وثائق العميل',
                assigneeEn: 'Sara Mohamed · Today 4:00 PM',
                assigneeAr: 'سارة محمد · اليوم الساعة 4:00 مساءً',
                status: 'in-progress',
                statusLabelEn: 'In Progress',
                statusLabelAr: 'في تَقَدُم',
              },
              {
                id: 'task-3',
                titleEn: 'Daily Transaction Review',
                titleAr: 'مراجعة المعاملات اليومية',
                assigneeEn: 'Omar Khaled · Tomorrow 12:00 PM',
                assigneeAr: 'عمر خالد · غداً الساعة 12:00 ظهراً',
                status: 'completed',
                statusLabelEn: 'Completed',
                statusLabelAr: 'مكتمل',
              },
              {
                id: 'task-4',
                titleEn: 'Customer Follow-up Report',
                titleAr: 'تقرير متابعة العملاء',
                assigneeEn: 'Nour Ahmed · Yesterday 4:00 PM',
                assigneeAr: 'نور أحمد · أمس الساعة 4:00 مساءً',
                status: 'overdue',
                statusLabelEn: 'Overdue',
                statusLabelAr: 'متأخر',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectTask(item.id);
                  onNavigate('task-details');
                }}
                className="bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 flex items-center justify-between hover:border-[#12b5a6]/40 transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-[#e3f3ef] text-[#0b6b5e]'
                        : item.status === 'in-progress'
                        ? 'bg-[#dde4fa] text-[#46507a]'
                        : 'bg-[#fde3e3] text-[#b42318]'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : item.status === 'in-progress' ? (
                      <span className="w-2 h-2 rounded-full bg-[#46507a]" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#12b5a6] transition-colors truncate">
                      {isRtl ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-[10.5px] text-[#64748b] mt-0.5 truncate font-medium">
                      {isRtl ? item.assigneeAr : item.assigneeEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'completed'
                        ? 'bg-[#e3f3ef] text-[#0b6b5e]'
                        : item.status === 'in-progress'
                        ? 'bg-[#dde4fa] text-[#46507a]'
                        : 'bg-[#fde3e3] text-[#b42318]'
                    }`}
                  >
                    {isRtl ? item.statusLabelAr : item.statusLabelEn}
                  </span>
                  <ChevronIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#111827]">
              {isRtl ? 'تقدم الفريق' : 'Team Progress'}
            </h3>
            <span className="text-[11px] text-[#64748b] font-medium">
              {isRtl ? '4 أعضاء نشطين' : '4 members active'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-3">
            {[
              {
                emp: INITIAL_EMPLOYEES[0],
                completed: 6,
                total: 6,
                rate: 100,
              },
              {
                emp: INITIAL_EMPLOYEES[1],
                completed: 4,
                total: 5,
                rate: 80,
              },
              {
                emp: INITIAL_EMPLOYEES[2],
                completed: 3,
                total: 4,
                rate: 75,
              },
              {
                emp: INITIAL_EMPLOYEES[3],
                completed: 3,
                total: 5,
                rate: 60,
              },
            ].map(({ emp, completed, total, rate }) => (
              <div key={emp.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
                      <img
                        src={emp.avatar}
                        alt={emp.nameEn}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#111827] truncate">
                        {isRtl ? emp.nameAr : emp.nameEn}
                      </div>
                      <div className="text-[10px] text-[#64748b] font-medium truncate">
                        {isRtl
                          ? `تم إنجاز ${completed} من أصل ${total} مهام`
                          : `${completed} / ${total} tasks completed`}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#0b6b5e] bg-[#e3f3ef] px-2 py-0.5 rounded-full tabular-nums shrink-0">
                    {rate}%
                  </span>
                </div>

                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#12b5a6] h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

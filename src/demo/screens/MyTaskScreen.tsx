import React from 'react';
import { Landmark, MoreVertical, CheckCircle2 } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { DemoNavbar } from '../components/DemoNavbar';

interface MyTaskScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  task: Task;
  onCompleteTask: (taskId: string) => void;
}

export const MyTaskScreen: React.FC<MyTaskScreenProps> = ({
  language,
  onNavigate,
  task,
  onCompleteTask,
}) => {
  const isRtl = language === 'ar';
  const isCompleted = task.status === 'completed';

  const handleMarkComplete = () => {
    onCompleteTask(task.id);
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'مهمتى' : 'My Task'}
          showBack={true}
          onBack={() => onNavigate('tasks')}
          avatarUrl="/demo/mohamed-ali.png"
        />
      </div>

      {/* Independently Scrollable Application Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-3.5 pb-6 space-y-3.5">
        {/* Branch Team Badge */}
        <div className="flex items-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dde4fa] text-[#46507a] text-[11px] font-medium">
            <Landmark className="w-3.5 h-3.5 text-[#46507a]" />
            <span>{isRtl ? 'القاهرة الرئيسية · فريق العمليات' : 'Cairo Main · Operations Team'}</span>
          </div>
        </div>

        {/* Task Header Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-2.5">
          <div className="flex items-start justify-between">
            <h2 className="text-[16px] font-bold text-[#111827] tracking-tight leading-snug">
              {isRtl ? 'العمليات اليومية للفرع تقرير' : 'Daily Branch Operations Report'}
            </h2>
            <button
              type="button"
              className="p-1 -mr-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[12px] text-[#64748b] leading-relaxed">
            {isRtl
              ? 'قم بإعداد وتقديم ملخص العمليات اليومية للفرع.'
              : 'Prepare and submit the daily branch operations summary.'}
          </p>

          {/* Nested Meta Information Box */}
          <div className="bg-[#f8fafc] rounded-xl p-3 space-y-2 border border-[#e2e8f0]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748b] font-medium">
                {isRtl ? 'مُعيّن من قِبل' : 'Assigned by'}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-[#111827]">
                <span className="w-5 h-5 rounded-full bg-[#dde4fa] text-[#46507a] text-[10px] flex items-center justify-center font-bold">
                  {isRtl ? 'أح' : 'AH'}
                </span>
                <span>{isRtl ? 'أحمد حسن' : 'Ahmed Hassan'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748b] font-medium">
                {isRtl ? 'موعد التسليم' : 'Deadline'}
              </span>
              <span className="font-bold text-[#111827]">
                {isRtl ? 'اليوم · الساعة 3:00 مساءً' : 'Today · 3:00 PM'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748b] font-medium">
                {isRtl ? 'أولوية' : 'Priority'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b42318]" />
                <span>{isRtl ? 'أولوية عالية' : 'High Priority'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
              {isRtl ? 'الوضع الحالي' : 'CURRENT STATUS'}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-[#e3f3ef] text-[#0b6b5e]'
                  : 'bg-[#dde4fa] text-[#46507a]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? 'bg-[#0b6b5e]' : 'bg-[#46507a]'
                }`}
              />
              <span>
                {isCompleted
                  ? isRtl
                    ? 'مكتمل'
                    : 'Completed'
                  : isRtl
                  ? 'في تَقَدُم'
                  : 'In Progress'}
              </span>
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-[32px] font-extrabold text-[#111827] tabular-nums leading-none">
              {isCompleted ? '100%' : '75 %'}
            </span>
            <span className="text-[11.5px] text-[#64748b] font-medium">
              {isCompleted
                ? isRtl
                  ? 'تم الاعتماد بنجاح · مكتمل'
                  : 'Audit verified · Completed'
                : isRtl
                ? 'شبه مكتمل · المراجعة النهائية قيد الانتظار'
                : 'Almost complete · Final review pending'}
            </span>
          </div>

          <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#12b5a6] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: isCompleted ? '100%' : '75%' }}
            />
          </div>
        </div>

        {/* Activity Live Feed Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#111827]">
              {isRtl ? 'نشاط' : 'Activity'}
            </h3>
            <span className="text-[11px] text-[#64748b] font-medium">
              {isRtl ? 'مزامنة حالية' : 'Live feed'}
            </span>
          </div>

          <div
            className={`relative space-y-3.5 ${
              isRtl
                ? 'pr-5 before:absolute before:right-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]'
                : 'pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]'
            }`}
          >
            {/* Timeline item 1 */}
            <div className="relative text-xs">
              <span
                className={`absolute top-1 w-2.5 h-2.5 rounded-full bg-[#12b5a6] ring-2 ring-white ${
                  isRtl ? '-right-5' : '-left-5'
                }`}
              />
              <div className="font-bold text-[#111827]">
                {isRtl ? 'المهمة الموكلة' : 'Task assigned'}
              </div>
              <div className="text-[11px] text-[#64748b] mt-0.5">
                {isRtl ? 'محمد علي · الآن' : 'Mohamed Ali · Just now'}
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="relative text-xs">
              <span
                className={`absolute top-1 w-2.5 h-2.5 rounded-full bg-[#cbd5e1] ring-2 ring-white ${
                  isRtl ? '-right-5' : '-left-5'
                }`}
              />
              <div className="font-bold text-[#111827]">
                {isRtl ? 'في تَقَدُم' : 'In Progress'}
              </div>
              <div className="text-[11px] text-[#64748b] mt-0.5">
                {isRtl ? 'محمد علي · الآن' : 'Mohamed Ali · Just now'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Mark as Completed */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isCompleted}
            onClick={handleMarkComplete}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-[14px] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-[#e3f3ef] text-[#0b6b5e] cursor-default shadow-none'
                : 'bg-[#12b5a6] hover:bg-[#0da594] active:scale-[0.99] text-white shadow-[#12b5a6]/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isCompleted
                ? isRtl
                  ? 'تم وضع علامة مكتمل'
                  : 'Task Completed'
                : isRtl
                ? 'ضع علامة مكتمل'
                : 'Mark as Completed'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

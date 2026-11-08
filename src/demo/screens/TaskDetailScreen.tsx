import React from 'react';
import { Landmark, Share2, Clock, Flag, MessageSquare, UserCheck } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface TaskDetailScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onShareTask?: (task: Task) => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  language,
  onNavigate,
  task,
  onShareTask,
}) => {
  const isRtl = language === 'ar';

  const assignee =
    INITIAL_EMPLOYEES.find((e) => e.id === task.assigneeId) || INITIAL_EMPLOYEES[0];
  const isCompleted = task.status === 'completed';

  const handleShare = () => {
    if (onShareTask) {
      onShareTask(task);
    } else {
      onNavigate('chat');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'تفاصيل المهمة' : 'Task Detail'}
          showBack={true}
          onBack={() => onNavigate('tasks')}
          rightAction={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 text-slate-700 hover:text-[#12b5a6] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title={isRtl ? 'مشاركة في المحادثة' : 'Share to chat'}
                aria-label={isRtl ? 'مشاركة في المحادثة' : 'Share to chat'}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                <img
                  src="/demo/ahmed-hassan.png"
                  alt="Ahmed"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          }
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

        {/* Title & Description Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-1.5">
          <h2 className="text-[16px] font-bold text-[#111827] tracking-tight leading-snug">
            {isRtl ? task.titleAr : task.titleEn}
          </h2>
          <p className="text-[12.5px] text-[#64748b] leading-relaxed">
            {isRtl ? task.descriptionAr : task.descriptionEn}
          </p>
        </div>

        {/* Assignee Card */}
        <div className="bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
              <img
                src={assignee.avatar}
                alt={assignee.nameEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-[#111827]">
                {isRtl ? assignee.nameAr : assignee.nameEn}
              </h3>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                {isRtl ? assignee.roleAr : assignee.roleEn}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-[#64748b] mt-1">
                <UserCheck className="w-3 h-3 text-[#12b5a6]" />
                <span>{isRtl ? 'تم تكليفه من قبل أحمد حسن' : 'Assigned by Ahmed Hassan'}</span>
              </div>
            </div>
          </div>

          <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#dde4fa] text-[#46507a] shrink-0">
            {isRtl ? 'المُحال إليه' : 'Assignee'}
          </span>
        </div>

        {/* Deadline, Priority, Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-3.5">
          {/* 2 Mini Stat Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]/60">
              <div className="flex items-center justify-between text-[#64748b] text-[11px] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#12b5a6]" />
                  <span>{isRtl ? 'موعد التسليم' : 'Deadline'}</span>
                </span>
                {task.hasReminder && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e3f3ef] text-[#0b6b5e]">
                    {isRtl ? 'تذكير' : 'Reminder'}
                  </span>
                )}
              </div>
              <p className="text-[12px] font-bold text-[#111827] mt-1">
                {isRtl ? task.deadlineAr : task.deadlineEn}
              </p>
            </div>

            <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]/60">
              <div className="flex items-center gap-1.5 text-[#64748b] text-[11px] font-semibold">
                <Flag className="w-3.5 h-3.5 text-[#b42318]" />
                <span>{isRtl ? 'أولوية' : 'Priority'}</span>
              </div>
              <div className="mt-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318]">
                  {isRtl ? 'أولوية عالية' : 'High Priority'}
                </span>
              </div>
            </div>
          </div>

          {/* Status & Completion row */}
          <div className="pt-1 space-y-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#64748b] font-medium">
                {isRtl ? 'الحالة' : 'Status'}
              </span>
              <span className="font-semibold text-[#46507a] px-2.5 py-0.5 rounded-full bg-[#dde4fa] flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#46507a]" />
                <span>
                  {isCompleted
                    ? isRtl
                      ? 'مكتمل'
                      : 'Completed'
                    : isRtl
                    ? 'قيد الانتظار'
                    : 'Pending'}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#64748b] font-medium">
                {isRtl ? 'انتهاء' : 'Completion'}
              </span>
              <span className="font-bold text-[#111827] tabular-nums">
                {isCompleted ? '100% Complete' : '0% Complete'}
              </span>
            </div>

            <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#12b5a6] h-full rounded-full transition-all duration-500"
                style={{ width: isCompleted ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Activity Feed Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#111827]">
              {isRtl ? 'نشاط' : 'Activity'}
            </h3>
            <span className="text-[11px] text-[#64748b] font-medium">
              {isRtl ? 'مزامنة حالية' : 'Live feed'}
            </span>
          </div>

          {/* Activity items with vertical line */}
          <div
            className={`relative space-y-3.5 ${
              isRtl
                ? 'pr-5 before:absolute before:right-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]'
                : 'pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]'
            }`}
          >
            {/* Item 1 */}
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

            {/* Item 2 */}
            <div className="relative text-xs">
              <span
                className={`absolute top-1 w-2.5 h-2.5 rounded-full bg-[#cbd5e1] ring-2 ring-white ${
                  isRtl ? '-right-5' : '-left-5'
                }`}
              />
              <div className="font-bold text-[#111827]">
                {isRtl ? 'تم إنشاء المهمة' : 'Task created'}
              </div>
              <div className="text-[11px] text-[#64748b] mt-0.5">
                {isRtl ? 'أحمد حسن · الآن' : 'Ahmed Hassan · Just now'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-full py-3.5 px-4 bg-[#12b5a6] hover:bg-[#0da594] active:scale-[0.99] text-white font-bold text-[14px] rounded-2xl shadow-md shadow-[#12b5a6]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isRtl ? 'رسالة إلى الموظف' : 'Message Employee'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

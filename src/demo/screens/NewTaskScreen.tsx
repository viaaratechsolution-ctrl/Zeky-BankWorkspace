import React, { useState } from 'react';
import { Landmark, ChevronDown, Calendar, Bell, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Language, ScreenType, Task, Priority } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface NewTaskScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onAddTask: (task: Partial<Task>) => void;
}

export const NewTaskScreen: React.FC<NewTaskScreenProps> = ({
  language,
  onNavigate,
  onAddTask,
}) => {
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [title, setTitle] = useState(
    isRtl ? 'تقرير العمليات اليومية للفرع' : 'Daily Branch Operations Report'
  );
  const [description, setDescription] = useState(
    isRtl
      ? 'قم بإعداد وتقديم ملخص العمليات اليومية للفرع.'
      : 'Prepare and submit the daily branch operations summary.'
  );
  const [selectedEmpId, setSelectedEmpId] = useState('emp-1');
  const [deadline, setDeadline] = useState(
    isRtl ? 'اليوم · الساعة 3:00 مساءً' : 'Today · 3:00 PM'
  );
  const [priority, setPriority] = useState<Priority>('high');
  const [reminder, setReminder] = useState(true);
  const [reminderTiming, setReminderTiming] = useState<'15m' | '30m' | '1h' | '2h' | '1d'>('30m');
  const [showEmpDropdown, setShowEmpDropdown] = useState(false);
  const [showDeadlineDropdown, setShowDeadlineDropdown] = useState(false);

  const selectedEmployee =
    INITIAL_EMPLOYEES.find((e) => e.id === selectedEmpId) || INITIAL_EMPLOYEES[0];

  const reminderLabels = {
    '15m': {
      en: 'Notify assignee 15 mins before deadline',
      ar: 'أبلغ الشخص المُسند إليه المهمة قبل الموعد بـ 15 دقيقة',
      shortEn: '15m before',
      shortAr: 'قبل 15 دقيقة',
    },
    '30m': {
      en: 'Notify assignee 30 mins before deadline',
      ar: 'أبلغ الشخص المُسند إليه المهمة قبل الموعد بـ 30 دقيقة',
      shortEn: '30m before',
      shortAr: 'قبل 30 دقيقة',
    },
    '1h': {
      en: 'Notify assignee 1 hour before deadline',
      ar: 'أبلغ الشخص المُسند إليه المهمة قبل الموعد بساعة',
      shortEn: '1h before',
      shortAr: 'قبل ساعة',
    },
    '2h': {
      en: 'Notify assignee 2 hours before deadline',
      ar: 'أبلغ الشخص المُسند إليه المهمة قبل الموعد بساعتين',
      shortEn: '2h before',
      shortAr: 'قبل ساعتين',
    },
    '1d': {
      en: 'Notify assignee 1 day before deadline',
      ar: 'أبلغ الشخص المُسند إليه المهمة قبل الموعد بيوم واحد',
      shortEn: '1d before',
      shortAr: 'قبل يوم',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      titleEn: title,
      titleAr: title,
      descriptionEn: description,
      descriptionAr: description,
      assigneeId: selectedEmpId,
      deadlineEn: deadline,
      deadlineAr: deadline,
      deadlineNoteEn: reminder ? `Reminder (${reminderLabels[reminderTiming].shortEn})` : 'End of Banking Hours',
      deadlineNoteAr: reminder ? `تذكير (${reminderLabels[reminderTiming].shortAr})` : 'نهاية ساعات العمل المصرفية',
      priority,
      status: 'pending',
      progress: 0,
      hasReminder: reminder,
      reminderTiming: reminder ? reminderTiming : undefined,
    });
    onNavigate('tasks');
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'مهمة جديدة' : 'New Task'}
          showBack={true}
          onBack={() => onNavigate('tasks')}
        />
      </div>

      {/* Independently Scrollable Application Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-3.5 pb-8 space-y-4"
      >
        {/* Branch Team Badge */}
        <div className="flex items-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dde4fa] text-[#46507a] text-[11px] font-medium">
            <Landmark className="w-3.5 h-3.5 text-[#46507a]" />
            <span>{isRtl ? 'القاهرة الرئيسية · فريق العمليات' : 'Cairo Main · Operations Team'}</span>
          </div>
        </div>

        {/* Task Title Input Card */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
            {isRtl ? 'عنوان المهمة' : 'TASK TITLE'}
          </label>
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isRtl ? 'تقرير العمليات اليومية للفرع' : 'Daily Branch Operations Report'}
              className="w-full text-[14px] font-bold text-[#111827] bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Description Textarea Card */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
            {isRtl ? 'وصف' : 'DESCRIPTION'}
          </label>
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60">
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isRtl
                  ? 'قم بإعداد وتقديم ملخص العمليات اليومية للفرع.'
                  : 'Prepare and submit the daily branch operations summary.'
              }
              className="w-full text-[12.5px] text-[#111827] leading-relaxed bg-transparent focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Assign To Dropdown Selector */}
        <div className="space-y-1 relative">
          <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
            {isRtl ? 'تكليف بـ' : 'ASSIGN TO'}
          </label>
          <button
            type="button"
            onClick={() => setShowEmpDropdown(!showEmpDropdown)}
            className="w-full bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 flex items-center justify-between hover:border-[#12b5a6]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.nameEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#111827]">
                  {isRtl ? selectedEmployee.nameAr : selectedEmployee.nameEn}
                </h4>
                <p className="text-[11px] text-[#64748b]">
                  {isRtl ? selectedEmployee.roleAr : selectedEmployee.roleEn}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {showEmpDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30">
              {INITIAL_EMPLOYEES.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => {
                    setSelectedEmpId(emp.id);
                    setShowEmpDropdown(false);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer text-start"
                >
                  <img
                    src={emp.avatar}
                    alt={emp.nameEn}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#111827]">
                      {isRtl ? emp.nameAr : emp.nameEn}
                    </div>
                    <div className="text-[10px] text-[#64748b]">
                      {isRtl ? emp.roleAr : emp.roleEn}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deadline Dropdown Selector */}
        <div className="space-y-1 relative">
          <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
            {isRtl ? 'موعد التسليم' : 'DEADLINE'}
          </label>
          <button
            type="button"
            onClick={() => setShowDeadlineDropdown(!showDeadlineDropdown)}
            className="w-full bg-white rounded-2xl p-3 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 flex items-center justify-between hover:border-[#12b5a6]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#e3f3ef] flex items-center justify-center text-[#0b6b5e] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#111827]">{deadline}</h4>
                <p className="text-[11px] text-[#64748b]">
                  {isRtl ? 'نهاية ساعات العمل المصرفية' : 'End of Banking Hours'}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {showDeadlineDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30">
              {[
                { labelEn: 'Today · 3:00 PM', labelAr: 'اليوم · الساعة 3:00 مساءً' },
                { labelEn: 'Today · 5:00 PM', labelAr: 'اليوم · الساعة 5:00 مساءً' },
                { labelEn: 'Tomorrow · 12:00 PM', labelAr: 'غداً · الساعة 12:00 ظهراً' },
                { labelEn: 'End of Week · 4:00 PM', labelAr: 'نهاية الأسبوع · الساعة 4:00 مساءً' },
              ].map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDeadline(isRtl ? d.labelAr : d.labelEn);
                    setShowDeadlineDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer text-start"
                >
                  {isRtl ? d.labelAr : d.labelEn}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Priority Segmented Control */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
            {isRtl ? 'أولوية' : 'PRIORITY'}
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-[#e2e8f0]/60 p-1 rounded-2xl">
            {isRtl ? (
              <>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'high'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  عالي
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'medium'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  متوسط
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'low'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  عادي
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'low'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'medium'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`py-2 text-[12px] font-bold rounded-xl transition-all cursor-pointer ${
                    priority === 'high'
                      ? 'bg-[#12b5a6] text-white shadow-sm'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  High
                </button>
              </>
            )}
          </div>
        </div>

        {/* Set Reminder Card with Authentic Figma Design & Interactive Configuration */}
        <div
          className={`bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border transition-all ${
            reminder ? 'border-[#12b5a6]/30' : 'border-[#e2e8f0]/60'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  reminder ? 'bg-[#e3f3ef] text-[#0b6b5e]' : 'bg-[#f1f5f9] text-[#94a3b8]'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-bold text-[#111827] truncate">
                  {isRtl ? 'ضبط تذكير' : 'Set Reminder'}
                </h4>
                <p className="text-[11px] text-[#64748b] leading-tight mt-0.5">
                  {reminder
                    ? reminderLabels[reminderTiming][isRtl ? 'ar' : 'en']
                    : isRtl
                    ? 'التذكير معطل (انقر للتفعيل)'
                    : 'Reminder disabled (tap to enable)'}
                </p>
              </div>
            </div>

            {/* Authentic Figma iOS Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={reminder}
              onClick={() => {
                setReminder(!reminder);
              }}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative cursor-pointer shrink-0 ${
                reminder ? 'bg-[#12b5a6]' : 'bg-[#cbd5e1]'
              }`}
              aria-label={isRtl ? 'تبديل التذكير' : 'Toggle reminder'}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  isRtl
                    ? reminder
                      ? 'translate-x-0'
                      : 'translate-x-[20px]'
                    : reminder
                    ? 'translate-x-[20px]'
                    : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Interactive Reminder Configuration Options when enabled */}
          {reminder && (
            <div className="mt-3 pt-3 border-t border-[#e2e8f0]/70 animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#64748b] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#12b5a6]" />
                  <span>{isRtl ? 'توقيت الإشعار المسبق:' : 'Notification timing:'}</span>
                </span>
                <span className="font-bold text-[#0b6b5e]">
                  {reminderLabels[reminderTiming][isRtl ? 'shortAr' : 'shortEn']}
                </span>
              </div>

              {/* Timing Selection Chips */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {(['15m', '30m', '1h', '2h', '1d'] as const).map((key) => {
                  const isSelected = reminderTiming === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setReminderTiming(key)}
                      className={`py-1.5 px-1 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#12b5a6] text-white shadow-xs scale-[1.02]'
                          : 'bg-[#f1f5f9] text-[#64748b] hover:bg-slate-200/80 hover:text-[#111827]'
                      }`}
                    >
                      {reminderLabels[key][isRtl ? 'shortAr' : 'shortEn']}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Assign Task Main Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#12b5a6] hover:bg-[#0da594] active:scale-[0.99] text-white font-bold text-[14px] rounded-2xl shadow-md shadow-[#12b5a6]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{isRtl ? 'تكليف بالمهمة' : 'Assign Task'}</span>
            <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
};

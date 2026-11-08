import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronRight, ChevronLeft, Check, X, Bell } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { DemoNavbar } from '../components/DemoNavbar';

interface TasksScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onSelectTask,
}) => {
  const isRtl = language === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'in-progress' && task.status !== 'in-progress') return false;
    if (filter === 'completed' && task.status !== 'completed') return false;
    if (filter === 'pending' && task.status !== 'pending' && task.status !== 'overdue') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = task.titleEn.toLowerCase().includes(q) || task.descriptionEn.toLowerCase().includes(q);
      const matchAr = task.titleAr.includes(q) || task.descriptionAr.includes(q);
      return matchEn || matchAr;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] relative overflow-hidden">
      {/* Fixed Application Navbar at Top */}
      <div className="shrink-0 z-20 shadow-xs">
        <DemoNavbar
          language={language}
          title={isRtl ? 'بنك FNT' : 'FNT Bank'}
          subtitle={isRtl ? undefined : 'Cairo Main Branch'}
          showBack={true}
          onBack={() => onNavigate('home')}
        />
      </div>

      {/* Independently Scrollable Application Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-4 pb-20">
        {/* Section Header: Title & Action Icons */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight">
              {isRtl ? 'المهام' : 'Tasks'}
            </h2>
            <p className="text-[12.5px] text-[#64748b] mt-0.5">
              {isRtl ? 'إدارة عمل فريقك' : "Manage your team's work"}
            </p>
          </div>

          <div className="flex items-center gap-1 text-[#64748b]">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>
            <button
              type="button"
              onClick={() => {
                const next =
                  filter === 'all'
                    ? 'in-progress'
                    : filter === 'in-progress'
                    ? 'completed'
                    : filter === 'completed'
                    ? 'pending'
                    : 'all';
                setFilter(next);
              }}
              className="p-2 rounded-full hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Real-time Search input */}
        {showSearch && (
          <div className="mt-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'البحث في مهام الفرع...' : 'Search branch tasks...'}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#12b5a6]/30 focus:border-[#12b5a6]"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute top-2.5 text-slate-400 hover:text-slate-600 ${
                  isRtl ? 'left-3' : 'right-3'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Filter Pills matching Figma */}
        <div className="flex items-center gap-2 mt-3.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#0b6b5e] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-50'
            }`}
          >
            {isRtl ? 'الجميع' : 'All'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'in-progress'
                ? 'bg-[#0b6b5e] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-50'
            }`}
          >
            {isRtl ? 'في تَقَدُم' : 'In Progress'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'completed'
                ? 'bg-[#0b6b5e] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-50'
            }`}
          >
            {isRtl ? 'مكتمل' : 'Completed'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'pending'
                ? 'bg-[#0b6b5e] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-50'
            }`}
          >
            {isRtl ? 'قيد الانتظار' : 'Pending'}
          </button>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3 mt-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[#e2e8f0]">
              <p className="text-xs text-[#64748b] font-medium">
                {isRtl ? 'لا توجد مهام تطابق هذا التصنيف' : 'No tasks found for this filter'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => {
              const isCompleted = task.status === 'completed';
              const isInProgress = task.status === 'in-progress';
              const isHigh = task.priority === 'high' || index === 0;

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task.id);
                    onNavigate('task-details');
                  }}
                  className="bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_-4px_rgba(17,24,39,0.08)] border border-[#e2e8f0]/60 hover:border-[#12b5a6]/40 transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
                      <img
                        src={
                          task.assigneeId === 'emp-1'
                            ? '/demo/mohamed-ali.png'
                            : task.assigneeId === 'emp-2'
                            ? '/demo/sara-mohamed.png'
                            : '/demo/ahmed-hassan.png'
                        }
                        alt="Assignee"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[13px] font-bold text-[#111827] group-hover:text-[#0b6b5e] transition-colors truncate">
                        {isRtl ? task.titleAr : task.titleEn}
                      </h4>
                      <p className="text-[11.5px] text-[#64748b] mt-0.5 truncate font-medium">
                        {isRtl
                          ? task.assigneeId === 'emp-1'
                            ? 'محمد على · اليوم، الساعة 3:00 مساءً'
                            : task.assigneeId === 'emp-2'
                            ? 'سارة محمد · اليوم، الساعة 4:00 مساءً'
                            : task.assigneeId === 'emp-4'
                            ? 'نور أحمد · أمس، الساعة 4:00 مساءً'
                            : 'عمر خالد · غداً، الساعة 12:00 ظهراً'
                          : task.assigneeId === 'emp-1'
                          ? 'Mohamed Ali · Today, 3:00 PM'
                          : task.assigneeId === 'emp-2'
                          ? 'Sara Mohamed · Today, 4:00 PM'
                          : task.assigneeId === 'emp-4'
                          ? 'Nour Ahmed · Yesterday, 4:00 PM'
                          : 'Omar Khaled · Tomorrow, 12:00 PM'}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        {/* Priority Badge */}
                        {isHigh ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318]">
                            {isRtl ? 'عالي' : 'High'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
                            {isRtl ? 'متوسط' : 'Medium'}
                          </span>
                        )}

                        {/* Status Badge */}
                        {isCompleted && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e3f3ef] text-[#0b6b5e] flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            <span>{isRtl ? 'مكتمل' : 'Completed'}</span>
                          </span>
                        )}

                        {isInProgress && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#dde4fa] text-[#46507a]">
                            {isRtl ? 'في تَقَدُم' : 'In Progress'}
                          </span>
                        )}

                        {!isCompleted && !isInProgress && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#dde4fa] text-[#46507a]">
                            {isRtl ? 'قيد الانتظار' : 'Pending'}
                          </span>
                        )}

                        {/* Reminder Badge */}
                        {task.hasReminder && (
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#e3f3ef] text-[#0b6b5e] flex items-center gap-1"
                            title={isRtl ? 'تم ضبط تذكير' : 'Reminder active'}
                          >
                            <Bell className="w-2.5 h-2.5" />
                            <span className="text-[9px] font-bold">
                              {isRtl ? 'تذكير' : 'Alert'}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                    <ChevronIcon className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) - Fixed position */}
      <button
        type="button"
        onClick={() => onNavigate('new-task')}
        className={`absolute bottom-4 ${
          isRtl ? 'left-4' : 'right-4'
        } size-12 rounded-full bg-[#12b5a6] hover:bg-[#0da594] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#12b5a6]/35 transition-all z-20 cursor-pointer`}
        aria-label="Add New Task"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};

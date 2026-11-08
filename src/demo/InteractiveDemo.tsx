import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  RotateCcw,
} from 'lucide-react';
import { Language, ScreenType, Task, ChatMessage } from '../types';
import { translations } from '../i18n/translations';
import { INITIAL_TASKS, INITIAL_MESSAGES } from '../data/mockData';
import { DeviceFrame } from './DeviceFrame';
import { DemoBottomNav } from './components/DemoBottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { TasksScreen } from './screens/TasksScreen';
import { NewTaskScreen } from './screens/NewTaskScreen';
import { TaskDetailScreen } from './screens/TaskDetailScreen';
import { ChatScreen } from './screens/ChatScreen';
import { MyTaskScreen } from './screens/MyTaskScreen';
import { PerformanceScreen } from './screens/PerformanceScreen';

interface InteractiveDemoProps {
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  language: parentLanguage,
}) => {
  // Sync demo language with page
  const [demoLanguage, setDemoLanguage] = useState<Language>(parentLanguage);
  useEffect(() => {
    setDemoLanguage(parentLanguage);
  }, [parentLanguage]);

  const t = translations[demoLanguage].demoSection;
  const tDemo = translations[demoLanguage].demo;

  // Ordered list of screens matching reference
  const SCREENS_ORDER: ScreenType[] = [
    'home',
    'tasks',
    'new-task',
    'task-details',
    'chat',
    'my-task',
    'performance',
  ];

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-1');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentIndex = SCREENS_ORDER.indexOf(currentScreen);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handlePrevScreen = () => {
    const nextIdx = (currentIndex - 1 + SCREENS_ORDER.length) % SCREENS_ORDER.length;
    setCurrentScreen(SCREENS_ORDER[nextIdx]);
  };

  const handleNextScreen = () => {
    const nextIdx = (currentIndex + 1) % SCREENS_ORDER.length;
    setCurrentScreen(SCREENS_ORDER[nextIdx]);
  };

  const handleResetDemo = () => {
    setTasks(INITIAL_TASKS);
    setMessages(INITIAL_MESSAGES);
    setSelectedTaskId('task-1');
    setCurrentScreen('home');
    showToast(
      demoLanguage === 'ar'
        ? 'تمت إعادة ضبط النموذج الأولي'
        : 'Demo prototype state restored'
    );
  };

  const handleAddTask = (newTaskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      titleEn: newTaskData.titleEn || 'New Operations Task',
      titleAr: newTaskData.titleAr || 'مهمة عمليات جديدة',
      descriptionEn: newTaskData.descriptionEn || '',
      descriptionAr: newTaskData.descriptionAr || '',
      assigneeId: newTaskData.assigneeId || 'emp-1',
      deadlineEn: newTaskData.deadlineEn || 'Today · 5:00 PM',
      deadlineAr: newTaskData.deadlineAr || 'اليوم · الساعة 5:00 مساءً',
      deadlineNoteEn: newTaskData.deadlineNoteEn || 'End of Banking Hours',
      deadlineNoteAr: newTaskData.deadlineNoteAr || 'نهاية ساعات العمل المصرفية',
      priority: newTaskData.priority || 'high',
      status: 'pending',
      progress: 0,
      hasReminder: newTaskData.hasReminder ?? true,
      reminderTiming: newTaskData.reminderTiming,
      activities: newTaskData.activities || [
        {
          id: `act-${Date.now()}`,
          actionEn: 'Task created and dispatched',
          actionAr: 'تم إنشاء المهمة وتكليفها',
          actorEn: 'Ahmed Hassan',
          actorAr: 'أحمد حسن',
          timeEn: 'Just now',
          timeAr: 'الآن',
          type: 'created',
        },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast(tDemo.taskCreatedToast);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === taskId) {
          return {
            ...item,
            status: 'completed',
            progress: 100,
            activities: [
              {
                id: `act-${Date.now()}`,
                actionEn: 'Task completed & approved',
                actionAr: 'تم اكتمال المهمة واعتمادها',
                actorEn: 'Mohamed Ali',
                actorAr: 'محمد علي',
                timeEn: 'Just now',
                timeAr: 'الآن',
                type: 'completed',
              },
              ...item.activities,
            ],
          };
        }
        return item;
      })
    );
    showToast(tDemo.taskCompletedToast);
  };

  // Listen for automated employee replies
  useEffect(() => {
    const handleEmpReply = (e: Event) => {
      const customEvent = e as CustomEvent<ChatMessage>;
      if (customEvent.detail) {
        setMessages((prev) => [...prev, customEvent.detail]);
      }
    };
    window.addEventListener('demo-emp-reply', handleEmpReply);
    return () => window.removeEventListener('demo-emp-reply', handleEmpReply);
  }, []);

  const handleSendMessage = (text: string, attachmentName?: string, isAudio?: boolean) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'mgr-1',
      senderNameEn: 'Ahmed Hassan',
      senderNameAr: 'أحمد حسن',
      senderRoleEn: 'Lead',
      senderRoleAr: 'مدير',
      senderAvatar: '/demo/ahmed-hassan.png',
      textEn: text,
      textAr: text,
      timeEn: 'Just now',
      timeAr: 'الآن',
      isLead: true,
      attachmentName,
      isAudio,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleShareTask = (taskToShare: Task) => {
    const isRtl = demoLanguage === 'ar';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'mgr-1',
      senderNameEn: 'Ahmed Hassan',
      senderNameAr: 'أحمد حسن',
      senderRoleEn: 'Lead',
      senderRoleAr: 'مدير',
      senderAvatar: '/demo/ahmed-hassan.png',
      textEn: `I've shared the task "${taskToShare.titleEn}" with the branch team.`,
      textAr: `لقد قمت بمشاركة المهمة "${taskToShare.titleAr}" مع فريق العمليات.`,
      timeEn: 'Just now',
      timeAr: 'الآن',
      isLead: true,
      attachedTaskId: taskToShare.id,
      attachedTask: taskToShare,
    };
    setMessages((prev) => [...prev, newMsg]);
    setCurrentScreen('chat');
    showToast(
      isRtl
        ? `تمت مشاركة "${taskToShare.titleAr}" في المحادثة`
        : `Shared "${taskToShare.titleEn}" to chat`
    );
  };

  const handleRemindEmployee = (empName: string) => {
    showToast(
      demoLanguage === 'ar'
        ? `تم إرسال تذكير عاجل إلى ${empName}`
        : `Urgent escalation reminder sent to ${empName}`
    );
  };

  const selectedTask = tasks.find((item) => item.id === selectedTaskId) || tasks[0];

  const leftScreens = t.screens.slice(0, 4);
  const rightScreens = t.screens.slice(4);

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative scroll-mt-20 overflow-hidden bg-card/25"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t.kicker}
          </p>
          <h2
            id="demo-heading"
            className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            {t.titlePrefix}{' '}
            <span className="text-gradient-brand">{t.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Column Layout: Left (01-04), Center (Phone), Right (05-07) */}
        <div className="mt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
            {/* Left Column: Screens 01 to 04 */}
            <ol className="order-2 flex flex-col gap-2 lg:order-1" aria-label="App screens">
              {leftScreens.map((screen) => {
                const isActive = currentScreen === screen.id;
                return (
                  <li key={screen.id}>
                    <button
                      type="button"
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => setCurrentScreen(screen.id as ScreenType)}
                      className={`flex w-full gap-4 rounded-2xl border p-4 text-start transition cursor-pointer ${
                        isActive
                          ? 'border-primary/40 bg-primary/10 shadow-sm'
                          : 'border-border bg-card/50 hover:border-primary/25 hover:bg-card'
                      }`}
                    >
                      <span
                        className={`font-display text-sm font-semibold tabular-nums shrink-0 ${
                          isActive ? 'text-gradient-brand' : 'text-muted-foreground'
                        }`}
                      >
                        {screen.num}
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-foreground">
                          {screen.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {screen.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Center Column: Interactive Smartphone Device */}
            <div className="order-1 flex flex-col items-center gap-6 lg:order-2 w-[360px] shrink-0 mx-auto">
              <DeviceFrame
                language={demoLanguage}
                onSwipeLeft={handleNextScreen}
                onSwipeRight={handlePrevScreen}
                bottomNav={
                  currentScreen !== 'chat' ? (
                    <DemoBottomNav
                      currentScreen={currentScreen}
                      onNavigate={setCurrentScreen}
                      language={demoLanguage}
                    />
                  ) : null
                }
              >
                {/* Screen 01: Manager Home */}
                {currentScreen === 'home' && (
                  <HomeScreen
                    language={demoLanguage}
                    onNavigate={setCurrentScreen}
                    tasks={tasks}
                    onSelectTask={(id) => {
                      setSelectedTaskId(id);
                      setCurrentScreen('task-details');
                    }}
                  />
                )}

                {/* Screen 02: Tasks */}
                {currentScreen === 'tasks' && (
                  <TasksScreen
                    language={demoLanguage}
                    onNavigate={setCurrentScreen}
                    tasks={tasks}
                    onSelectTask={(id) => {
                      setSelectedTaskId(id);
                      setCurrentScreen('task-details');
                    }}
                  />
                )}

                {/* Screen 03: Create New Task */}
                {currentScreen === 'new-task' && (
                  <NewTaskScreen
                    language={demoLanguage}
                    onNavigate={setCurrentScreen}
                    onAddTask={handleAddTask}
                  />
                )}

                {/* Screen 04: Task Details */}
                {currentScreen === 'task-details' && (
                  <TaskDetailScreen
                    language={demoLanguage}
                    task={selectedTask}
                    onNavigate={setCurrentScreen}
                    onCompleteTask={handleCompleteTask}
                    onShareTask={handleShareTask}
                  />
                )}

                {/* Screen 05: Team Group Chat */}
                {currentScreen === 'chat' && (
                  <ChatScreen
                    language={demoLanguage}
                    tasks={tasks}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onNavigate={setCurrentScreen}
                    onSelectTask={(id) => {
                      setSelectedTaskId(id);
                      setCurrentScreen('task-details');
                    }}
                  />
                )}

                {/* Screen 06: Employee Task Completion */}
                {currentScreen === 'my-task' && (
                  <MyTaskScreen
                    language={demoLanguage}
                    task={selectedTask}
                    onNavigate={setCurrentScreen}
                    onCompleteTask={handleCompleteTask}
                  />
                )}

                {/* Screen 07: Performance */}
                {currentScreen === 'performance' && (
                  <PerformanceScreen
                    language={demoLanguage}
                    tasks={tasks}
                    onNavigate={setCurrentScreen}
                    onSelectTask={(id) => {
                      setSelectedTaskId(id);
                      setCurrentScreen('task-details');
                    }}
                    onRemindEmployee={handleRemindEmployee}
                  />
                )}
              </DeviceFrame>

              {/* Navigation Controls: Chevron Left, 7 Dots, Chevron Right */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrevScreen}
                  aria-label="Previous screen"
                  className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary cursor-pointer"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex gap-1.5" role="tablist" aria-label="Screen indicator">
                  {SCREENS_ORDER.map((screenId, idx) => {
                    const isSelected = currentScreen === screenId;
                    return (
                      <button
                        key={screenId}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={t.screens[idx]?.title || `Screen ${idx + 1}`}
                        onClick={() => setCurrentScreen(screenId)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'w-6 bg-gradient-brand'
                            : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextScreen}
                  aria-label="Next screen"
                  className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary cursor-pointer"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Helper instruction */}
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hand className="size-3.5" />
                <span>{t.hint}</span>
              </p>

              {/* Demo reset quick action */}
              <div className="flex items-center justify-center mt-1">
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/80 bg-card/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>{demoLanguage === 'ar' ? 'إعادة ضبط البيانات' : 'Reset demo state'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Screens 05 to 07 */}
            <ol className="order-3 flex flex-col gap-2" aria-label="More app screens" start={5}>
              {rightScreens.map((screen) => {
                const isActive = currentScreen === screen.id;
                return (
                  <li key={screen.id}>
                    <button
                      type="button"
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => setCurrentScreen(screen.id as ScreenType)}
                      className={`flex w-full gap-4 rounded-2xl border p-4 text-start transition cursor-pointer ${
                        isActive
                          ? 'border-primary/40 bg-primary/10 shadow-sm'
                          : 'border-border bg-card/50 hover:border-primary/25 hover:bg-card'
                      }`}
                    >
                      <span
                        className={`font-display text-sm font-semibold tabular-nums shrink-0 ${
                          isActive ? 'text-gradient-brand' : 'text-muted-foreground'
                        }`}
                      >
                        {screen.num}
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-foreground">
                          {screen.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {screen.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Global Toast Alert inside interactive demo */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-primary/40 text-foreground text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <span className="font-semibold text-primary">● </span>
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
};

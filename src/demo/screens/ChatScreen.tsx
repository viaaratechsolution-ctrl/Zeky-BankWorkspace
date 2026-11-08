import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  CheckCheck,
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  Camera,
  Paperclip,
  Smile,
  Mic,
  Send,
  Calendar,
  Clock,
  X,
  FileText,
  Square,
  Play,
  Sparkles,
} from 'lucide-react';
import { Language, ScreenType, ChatMessage, Task } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/mockData';

interface ChatScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  messages: ChatMessage[];
  onSendMessage: (text: string, attachmentName?: string, isAudio?: boolean) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  language,
  onNavigate,
  messages,
  onSendMessage,
  tasks = [],
  onSelectTask,
}) => {
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [inputText, setInputText] = useState('');
  const [isTypingEmployee, setIsTypingEmployee] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordIntervalRef = useRef<any>(null);

  // Auto-scroll on new messages or typing state change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingEmployee]);

  // Handle voice recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordSeconds(0);
      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    }
    return () => {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    };
  }, [isRecording]);

  const handleSend = () => {
    const textToSend = inputText.trim();
    if (!textToSend && !attachment && !isRecording) return;

    if (isRecording) {
      // Send audio note
      const durationStr = `0:${recordSeconds < 10 ? '0' : ''}${recordSeconds || 1}`;
      onSendMessage(
        isRtl ? `تسجيل صوتي (${durationStr})` : `Voice note (${durationStr})`,
        undefined,
        true
      );
      setIsRecording(false);
      setRecordSeconds(0);
    } else {
      // Send text message with optional attachment
      onSendMessage(textToSend || (isRtl ? 'مرفق مستند' : 'Document attached'), attachment || undefined);
      setInputText('');
      setAttachment(null);
      setShowEmojiPicker(false);
    }

    // Trigger realistic automated employee reply after short simulated delay
    setTimeout(() => {
      setIsTypingEmployee(true);
    }, 900);

    setTimeout(() => {
      setIsTypingEmployee(false);
      // Sara Mohamed automated reply
      const empReply = isRtl
        ? 'شكرًا لرسالتك! أراجع تقرير الفرع الآن وسأقوم بتحديث المهمة في أقرب وقت.'
        : "Thanks for your message! I'm reviewing the branch report now and will update the task shortly.";

      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: 'emp-2',
        senderNameEn: 'Sara Mohamed',
        senderNameAr: 'سارة محمد',
        senderRoleEn: 'Docs Specialist',
        senderRoleAr: 'أخصائي مستندات',
        senderAvatar: '/demo/sara-mohamed.png',
        textEn: empReply,
        textAr: empReply,
        timeEn: 'Just now',
        timeAr: 'الآن',
        isLead: false,
      };

      // Add to messages via onSendMessage dispatch or window event
      window.dispatchEvent(new CustomEvent('demo-emp-reply', { detail: newMsg }));
    }, 2400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleToggleAttachment = () => {
    if (attachment) {
      setAttachment(null);
    } else {
      setAttachment(isRtl ? 'تقرير_التدقيق_اليومي.pdf' : 'branch_audit_report.pdf');
    }
  };

  const QUICK_EMOJIS = ['👍', '👏', '✅', '💼', '🚀', '💬', '⏳', '🤝', '❤️', '📊', '🏦', '📋'];

  return (
    <div className="flex flex-col h-full bg-[#f5f7f9] text-[#111827] overflow-hidden relative">
      {/* 1. FIXED CHAT HEADER - Notice NO standard application navbar here as requested */}
      <header className="shrink-0 z-20 px-3.5 py-2.5 bg-white border-b border-[#e2e8f0]/80 flex items-center justify-between shadow-xs select-none">
        {/* Back Arrow & Group Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="w-7 h-7 flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 rounded-full cursor-pointer shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 text-slate-800" />
          </button>

          <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200">
            <img
              src="/demo/ahmed-hassan.png"
              alt="Cairo Main Branch"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#12b5a6] ring-2 ring-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h2 className="text-[13px] font-bold text-[#111827] truncate">
                {isRtl ? 'الفرع الرئيسي فى القاهرة' : 'Cairo Main Branch'}
              </h2>
              <span className="w-3.5 h-3.5 rounded-full bg-[#12b5a6] text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                ✓
              </span>
            </div>
            <p className="text-[10.5px] text-[#64748b] font-medium truncate">
              {isRtl ? 'فريق العمليات · 6 أعضاء' : 'Operations Team · 6 members'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 cursor-pointer shrink-0"
          aria-label="Menu"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </header>

      {/* 2. INDEPENDENTLY SCROLLABLE CONVERSATION AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-3.5 py-3.5 space-y-3.5">
        {/* Date separator pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#e2e8f0]/80 text-[#64748b] text-[10px] font-bold uppercase tracking-wider">
            <Calendar className="w-3 h-3" />
            <span>{isRtl ? 'اليوم' : 'TODAY'}</span>
          </span>
        </div>

        {/* Message Stream */}
        {messages.map((msg) => {
          const isAhmed = msg.senderId === 'mgr-1';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isRtl
                  ? isAhmed
                    ? 'items-start'
                    : 'items-end'
                  : isAhmed
                  ? 'items-end'
                  : 'items-start'
              } space-y-1 animate-in fade-in slide-in-from-bottom-1 duration-200`}
            >
              {/* Sender Name & Role */}
              <div className="flex items-center gap-1.5 px-1">
                <span className="text-[11px] font-bold text-[#111827]">
                  {isRtl ? msg.senderNameAr : msg.senderNameEn}
                </span>
                {msg.isLead ? (
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#dde4fa] text-[#46507a]">
                    {isRtl ? 'مدير' : 'Lead'}
                  </span>
                ) : (
                  <span className="text-[10px] text-[#64748b]">
                    {isRtl ? msg.senderRoleAr : msg.senderRoleEn}
                  </span>
                )}
              </div>

              {/* Message Bubble + Avatar Container */}
              <div
                className={`flex items-end gap-2 max-w-[88%] ${
                  isRtl
                    ? isAhmed
                      ? 'flex-row'
                      : 'flex-row-reverse'
                    : isAhmed
                    ? 'flex-row-reverse'
                    : 'flex-row'
                }`}
              >
                {!isAhmed && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1 ring-1 ring-slate-100">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderNameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  {/* Text bubble */}
                  {msg.textEn && (
                    <div
                      className={`p-3 rounded-2xl text-[12px] leading-relaxed shadow-xs ${
                        isAhmed
                          ? 'bg-[#e3f3ef] text-[#111827] rounded-tr-none border border-[#12b5a6]/20'
                          : 'bg-white text-[#111827] rounded-tl-none border border-[#e2e8f0]/80'
                      }`}
                    >
                      <p>{isRtl ? msg.textAr || msg.textEn : msg.textEn}</p>

                      {/* Display attachment chip if present */}
                      {msg.attachmentName && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 text-[11px] font-semibold">
                          <FileText className="w-3.5 h-3.5 text-[#0b6b5e]" />
                          <span>{msg.attachmentName}</span>
                        </div>
                      )}

                      {/* Display voice indicator if present */}
                      {msg.isAudio && (
                        <div className="mt-1 flex items-center gap-2 pt-1 text-[#0b6b5e]">
                          <Play className="w-3 h-3 fill-current" />
                          <div className="flex items-center gap-0.5">
                            <span className="w-1 h-3 bg-[#0b6b5e] rounded-full animate-pulse" />
                            <span className="w-1 h-5 bg-[#0b6b5e] rounded-full animate-pulse [animation-delay:0.1s]" />
                            <span className="w-1 h-2 bg-[#0b6b5e] rounded-full animate-pulse [animation-delay:0.2s]" />
                            <span className="w-1 h-4 bg-[#0b6b5e] rounded-full animate-pulse [animation-delay:0.3s]" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-[#64748b]">
                        <span>{isRtl ? msg.timeAr : msg.timeEn}</span>
                        {isAhmed && <CheckCheck className="w-3 h-3 text-[#12b5a6]" />}
                      </div>
                    </div>
                  )}

                  {/* Attached Task Card */}
                  {msg.attachedTaskId && (() => {
                    const attachedTask =
                      msg.attachedTask ||
                      tasks.find((t) => t.id === msg.attachedTaskId) ||
                      tasks[0];
                    const assignee =
                      INITIAL_EMPLOYEES.find((e) => e.id === attachedTask.assigneeId) ||
                      INITIAL_EMPLOYEES[0];
                    const assigneeName = isRtl ? assignee.nameAr : assignee.nameEn;
                    const isCompleted = attachedTask.status === 'completed';
                    const isInProgress = attachedTask.status === 'in-progress';
                    const isHigh = attachedTask.priority === 'high';

                    return (
                      <div className="bg-white rounded-2xl p-3 border border-[#e2e8f0] shadow-sm space-y-2 min-w-[220px]">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="flex items-center gap-1 font-bold text-[#64748b] uppercase">
                            <span className="w-5 h-5 rounded-md bg-[#e3f3ef] text-[#0b6b5e] flex items-center justify-center">
                              <ClipboardList className="w-3 h-3" />
                            </span>
                            <span>{isRtl ? 'المهمة المرفقة' : 'TASK ATTACHED'}</span>
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                              isCompleted
                                ? 'bg-[#e3f3ef] text-[#0b6b5e]'
                                : isInProgress
                                ? 'bg-[#dde4fa] text-[#46507a]'
                                : 'bg-[#dde4fa] text-[#46507a]'
                            }`}
                          >
                            {isCompleted
                              ? isRtl ? '• مكتمل' : '• Completed'
                              : isInProgress
                              ? isRtl ? '• في تَقَدُم' : '• In Progress'
                              : isRtl ? '• قيد الانتظار' : '• Pending'}
                          </span>
                        </div>

                        <h4 className="text-[13px] font-bold text-[#111827] leading-snug">
                          {isRtl ? attachedTask.titleAr : attachedTask.titleEn}
                        </h4>

                        <div className="bg-[#f8fafc] px-2.5 py-1.5 rounded-lg text-[10.5px] text-[#64748b] flex items-center justify-between font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#12b5a6]" />
                            <span>
                              {isRtl ? attachedTask.deadlineAr : attachedTask.deadlineEn}
                            </span>
                          </span>
                          <span className="truncate max-w-[85px]">{assigneeName}</span>
                        </div>

                        {/* Priority and Task Tag details */}
                        <div className="flex items-center gap-1.5 text-[10px]">
                          {isHigh ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#fde3e3] text-[#b42318] font-bold">
                              {isRtl ? 'أولوية عالية' : 'High Priority'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b] font-semibold">
                              {isRtl ? 'أولوية عادية' : 'Normal Priority'}
                            </span>
                          )}
                          {attachedTask.hasReminder && (
                            <span className="px-2 py-0.5 rounded-full bg-[#e3f3ef] text-[#0b6b5e] font-semibold">
                              {isRtl ? 'تذكير مفعّل' : 'Reminder active'}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectTask(attachedTask.id);
                            onNavigate('task-details');
                          }}
                          className="w-full py-2 px-3 bg-[#12b5a6] hover:bg-[#0da594] active:scale-[0.99] text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          <span>{isRtl ? 'عرض المهمة' : 'View Task'}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}

        {/* Dynamic Typing Indicator */}
        {isTypingEmployee && (
          <div
            className={`flex items-center gap-2 pt-1 animate-in fade-in duration-200 ${
              isRtl ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="px-3 py-1.5 rounded-full bg-[#e2e8f0]/80 text-[#111827] text-[11px] font-medium flex items-center gap-1.5 shadow-xs">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12b5a6] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#12b5a6] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#12b5a6] animate-bounce [animation-delay:0.4s]" />
              </span>
              <span>{isRtl ? 'سارة تكتب...' : 'Sara is typing...'}</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3. FIXED COMPOSER AT BOTTOM - Stays anchored permanently */}
      <div className="shrink-0 z-20 bg-white border-t border-[#e2e8f0] shadow-[0_-2px_8px_rgba(0,0,0,0.03)] select-none">
        {/* Attachment Pill if active */}
        {attachment && (
          <div className="px-3 pt-2 pb-1 flex items-center justify-between text-xs bg-[#f8fafc] border-b border-[#e2e8f0]/60">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0b6b5e]">
              <FileText className="w-3.5 h-3.5" />
              <span>{attachment}</span>
            </span>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Emoji Popover if active */}
        {showEmojiPicker && (
          <div className="px-3 py-2 bg-white border-b border-[#e2e8f0] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-150">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleAddEmoji(emoji)}
                className="w-7 h-7 flex items-center justify-center text-sm hover:scale-125 transition-transform cursor-pointer shrink-0"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Recording Bar Mode */}
        {isRecording ? (
          <div className="px-3 py-2.5 flex items-center justify-between bg-rose-50/70 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-xs font-bold text-rose-700">
                {isRtl ? `جارٍ التسجيل... 0:0${recordSeconds}` : `Recording... 0:0${recordSeconds}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecording(false)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>{isRtl ? 'إرسال' : 'Send'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Composer Row */
          <div className="px-2.5 py-2 flex items-center gap-1.5">
            {/* Camera / Photo Button */}
            <button
              type="button"
              onClick={handleToggleAttachment}
              className={`p-1.5 rounded-full hover:bg-slate-100 cursor-pointer shrink-0 transition-colors ${
                attachment ? 'text-[#12b5a6]' : 'text-slate-500 hover:text-slate-700'
              }`}
              title={isRtl ? 'إرفاق صورة أو مستند' : 'Attach photo or document'}
              aria-label="Camera"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Paperclip Attachment Button */}
            <button
              type="button"
              onClick={handleToggleAttachment}
              className={`p-1.5 rounded-full hover:bg-slate-100 cursor-pointer shrink-0 transition-colors ${
                attachment ? 'text-[#12b5a6]' : 'text-slate-500 hover:text-slate-700'
              }`}
              title={isRtl ? 'إرفاق ملف' : 'Attach file'}
              aria-label="Attachment"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Input field with Smile toggle inside */}
            <div className="flex-1 min-w-0 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRtl ? 'أرسل رسالة إلى الفريق...' : 'Message the team...'}
                className="w-full text-xs py-2 px-3.5 pr-8 rounded-full bg-[#f1f5f9] border border-transparent focus:outline-none focus:bg-white focus:border-[#12b5a6] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`absolute ${
                  isRtl ? 'left-2.5' : 'right-2.5'
                } text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer`}
                title="Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Send / Mic Action Button */}
            {inputText.trim() || attachment ? (
              <button
                type="button"
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-[#12b5a6] hover:bg-[#0da594] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsRecording(true)}
                className="w-9 h-9 rounded-full bg-[#12b5a6] hover:bg-[#0da594] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
                title={isRtl ? 'تسجيل صوتي' : 'Voice recording'}
                aria-label="Voice Record"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

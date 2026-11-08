export type Language = 'en' | 'ar';

export type ScreenType =
  | 'home'
  | 'tasks'
  | 'new-task'
  | 'task-details'
  | 'chat'
  | 'my-task'
  | 'performance';

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

export interface Employee {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  avatar: string;
  totalTasks: number;
  completedTasks: number;
}

export interface TaskActivity {
  id: string;
  actionEn: string;
  actionAr: string;
  actorEn: string;
  actorAr: string;
  timeEn: string;
  timeAr: string;
  type: 'assigned' | 'created' | 'updated' | 'completed' | 'progress';
}

export interface Task {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  assigneeId: string;
  deadlineEn: string;
  deadlineAr: string;
  deadlineNoteEn?: string;
  deadlineNoteAr?: string;
  priority: Priority;
  status: TaskStatus;
  progress: number;
  hasReminder: boolean;
  reminderTiming?: '15m' | '30m' | '1h' | '2h' | '1d';
  activities: TaskActivity[];
  tagEn?: string;
  tagAr?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderNameEn: string;
  senderNameAr: string;
  senderRoleEn: string;
  senderRoleAr: string;
  senderAvatar: string;
  textEn?: string;
  textAr?: string;
  timeEn: string;
  timeAr: string;
  isLead?: boolean;
  attachedTaskId?: string;
  attachedTask?: Task;
  attachmentName?: string;
  isAudio?: boolean;
}

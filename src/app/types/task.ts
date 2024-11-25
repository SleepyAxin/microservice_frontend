// types/task.ts

/**
 * 任务接口定义
 * @interface Task
 * @property { number } [id] - 任务的唯一标识符（可选）
 * @property { number } userId - 关联的用户ID
 * @property { string } title - 任务标题
 * @property { string } description - 任务描述
 * @property { string } dueDate - 任务截止日期
 * @property { boolean } completed - 任务完成状态
 */
export interface Task 
{
  id?: number
  userId: number
  title: string
  description: string
  dueDate: string
  completed: boolean
}

/**
 * 任务操作接口定义
 * @interface TaskOperation
 * @property { 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' } operation - 操作类型
 * @property { Task } [task] - 操作的任务对象（可选）
 * @property { number } [userId] - 操作的用户ID（可选）
 * @property { number } [taskId] - 操作的任务ID（可选）
 */
export interface TaskOperation 
{
  operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
  task?: Task
  userId?: number
  taskId?: number
}
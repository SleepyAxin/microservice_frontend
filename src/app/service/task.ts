// services/task.ts
import { Task, TaskOperation } from '@/app/types/task'

export class TaskService 
{
  private static readonly API_BASE = 'http://localhost:9002/tasks'

  static async createTask(task: Task): Promise<Task> 
  {
    const response = await fetch
    (
      this.API_BASE, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'CREATE', task } as TaskOperation),
      }
    )

    if (!response.ok) throw new Error('Failed to create task')

    return response.json()
  }

  static async getTasks(userId: number): Promise<Task[]> 
  {
    const response = await fetch
    (
      this.API_BASE, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'READ', userId } as TaskOperation),
      }
    )

    if (!response.ok) throw new Error('Failed to fetch tasks')
    
    return response.json()
  }

  static async updateTask(task: Task): Promise<Task> 
  {
    const response = await fetch
    (
      this.API_BASE, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'UPDATE', task } as TaskOperation),
      }
    )

    if (!response.ok) throw new Error('Failed to update task')

    return response.json()
  }

  static async deleteTask(taskId: number): Promise<void> 
  {
    const response = await fetch
    (
      this.API_BASE, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'DELETE', taskId } as TaskOperation),
      }
    )

    if (!response.ok) throw new Error('Failed to delete task')
  }
}
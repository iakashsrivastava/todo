export enum TodoStatusEnum {
  Overdue = 2,
  Active = 1,
  Completed = 0
}

export interface TodoType {
    description: string,
    dueDate: Date,
    id: number,
    isComplete: boolean,
    status: TodoStatusEnum
  }

export interface ITasksResponse {
  meta: Meta;
  data: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description: null | string;
  is_completed: boolean;
  created_at: Date;
}

export interface Meta {
  pages: number;
  next: null;
  previous: null;
}

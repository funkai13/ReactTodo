export interface TasksResponse {
  meta: Meta;
  data: Task[];
}

export interface Task {
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

export interface CreateTaskResponse {
  data: {
    message: string;
    id: number;
  };
}

export interface GetTaskResponse {
  data: {
    task: Task;
  };
}

import TaskList from '@/features/task/components/tasksList.tsx';
import EditTaskModal from '@/features/task/components/editTaskModal.tsx';
import CreateTaskButton from '@/features/task/components/createTaskButton.tsx';

export const TaskPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Mis Tareas</h1>
        <CreateTaskButton />
      </div>

      <div className="">
        <TaskList />
      </div>

      <EditTaskModal />
    </div>
  );
};

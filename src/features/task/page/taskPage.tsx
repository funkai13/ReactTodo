import TaskList from '@/features/task/components/tasksList.tsx';
import EditTaskModal from '@/features/task/components/editTaskModal.tsx';
import CreateTaskButton from '@/features/task/components/createTaskButton.tsx';
import LogoutButton from '@/features/auth/components/logoutButton.tsx';

export const TaskPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
          Mis Tareas
        </h1>
        <div className="flex gap-4">
          <CreateTaskButton />
          <LogoutButton />
        </div>
      </div>

      <TaskList />

      <EditTaskModal />
    </div>
  );
};

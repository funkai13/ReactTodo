'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { toast } from 'sonner';
import { useEditTaskStore } from '@/features/task/store/edit-tastk.store.ts';
import { useTaskStore } from '@/features/task/store/task.store';
import { Task } from '@/features/task/interfaces/Task.interface.ts';
import { CheckCircle, Pencil, XCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import DeleteConfirmation from '@/features/task/components/deleteConfirmation.tsx';

export default function TaskList() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { openModal } = useEditTaskStore();
  const {
    tasks,
    loading,
    currentPage,
    totalPages,
    loadTasks,
    setCurrentPage,
    updateTask,
    deleteTask,
  } = useTaskStore();

  useEffect(() => {
    loadTasks(currentPage);
  }, [currentPage, loadTasks]);

  const handleStatusChange = async (id: number, isCompleted: boolean) => {
    try {
      await updateTask(id, { is_completed: isCompleted });
      toast.success('Estado actualizado', {
        description: `Tarea marcada como ${isCompleted ? 'completada' : 'pendiente'}`,
      });
    } catch (error) {
      toast.error(`Error al actualiza ${error}`, {
        description: 'No se pudo actualizar el estado de la tarea',
      });
    }
  };

  const handleEdit = (task: Task) => {
    openModal(task);
  };

  const handleDeleteConfirm = async (id: number) => {
    try {
      setDeletingId(id);
      deleteTask(id);
      toast.success('Tarea eliminada', {
        description: 'La tarea se eliminó correctamente',
      });
    } catch (error) {
      toast.error(`Error al eliminar ${error}`, {
        description: 'No se pudo eliminar la tarea',
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={`skeleton-${i}`} // Key única para skeletons
              className="h-20 w-full max-w-3xl bg-muted rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground text-center">
            No hay tareas disponibles
          </p>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Crea una nueva tarea para comenzar
          </p>
        </CardContent>
      </Card>
    );
  }

  const uniqueTasks = tasks.filter(
    (task, index, self) => self.findIndex((t) => t.id === task.id) === index
  );

  return (
    <div className="space-y-4">
      {uniqueTasks.map((task) => (
        <Card
          key={`task-${task.id}-${task.created_at}`}
          className="border shadow-sm rounded-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                className="cursor-pointer"
                checked={task.is_completed}
                onCheckedChange={(checked) =>
                  handleStatusChange(task.id, checked === true)
                }
              />
              <CardTitle
                className={`${task.is_completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
              >
                {task.title}
              </CardTitle>
            </div>
            {task.is_completed ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <CardDescription className="text-left">
              {task.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              📅 {new Date(task.created_at).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(task)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <DeleteConfirmation
                onConfirm={() => handleDeleteConfirm(task.id)}
                isDeleting={deletingId === task.id}
              />
            </div>
          </CardFooter>
        </Card>
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={`page-${i}`}>
              {' '}
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

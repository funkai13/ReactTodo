'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Task } from '@/features/task/interfaces/Task.interface.ts';
import { taskService } from '@/features/task/services/task.service.ts';
import { toast } from 'sonner';
import { useEditTaskStore } from '@/features/task/store/edit-tastk.store.ts';

export default function TaskList() {
  const { openModal } = useEditTaskStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTasks(currentPage);
        setTasks(response.data);
        setTotalPages(response.meta.pages);
      } catch (error) {
        toast({});
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage]);

  const handleStatusChange = async (id: number, isCompleted: boolean) => {
    console.log(id);
    try {
      await taskService.updateTask(id, { is_completed: isCompleted });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, is_completed: isCompleted } : task
        )
      );
      toast({});
    } catch (error) {
      toast({});
    }
  };

  const handleEdit = (task: Task) => {
    console.log(task);
    openModal(task);
  };

  const handleDelete = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast({});
    } catch (error) {
      toast({});
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
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

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={task.is_completed}
                onCheckedChange={(checked) =>
                  handleStatusChange(task.id, checked === true)
                }
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-medium ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </h3>
                  <Badge variant={task.is_completed ? 'outline' : 'default'}>
                    {task.is_completed ? 'Completado' : 'Pendiente'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(task)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
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
            <PaginationItem key={i}>
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

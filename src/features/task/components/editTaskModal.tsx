'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useEditTaskStore } from '@/features/task/store/edit-tastk.store.ts';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';

// ... otros imports

function Dialog(props: {
  open: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}) {
  return null;
}

function AlertDialogAction(props: {
  onClick: () => Promise<void>;
  className: string;
  children: React.ReactNode;
}) {
  return null;
}

function AlertDialog(props: { children: React.ReactNode }) {
  return null;
}

export default function EditTaskModal() {
  const { isOpen, selectedTask, closeModal, handleSave, handleDelete } =
    useEditTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || '');
      setIsCompleted(selectedTask.is_completed);
    }
  }, [selectedTask]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !title.trim()) return;

    setIsSubmitting(true);
    try {
      const updatedTask = {
        ...selectedTask,
        title,
        description: description || null,
        is_completed: isCompleted,
      };

      await handleSave(updatedTask);
      closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedTask) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* ... mismos campos del formulario */}

          <DialogFooter>
            <AlertDialog>
              {/* Botón de eliminar que usa handleDelete del store */}
              <AlertDialogAction
                onClick={() => handleDelete(selectedTask.id)}
                className="bg-destructive"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialog>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

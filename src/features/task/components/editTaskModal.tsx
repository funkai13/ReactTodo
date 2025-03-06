'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { useEditTaskStore } from '@/features/task/store/edit-tastk.store.ts';
import DeleteConfirmation from '@/features/task/components/deleteConfirmation.tsx';
import { useTaskStore } from '@/features/task/store/task.store.ts';

export default function EditTaskModal() {
  const { isOpen, selectedTask, closeModal } = useEditTaskStore();
  const { updateTask, deleteTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_completed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description || '',
        is_completed: selectedTask.is_completed,
      });
      setIsModified(false);
    }
  }, [selectedTask]);

  const handleFormChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      const updatedForm = { ...prev, [field]: value };
      setIsModified(
        updatedForm.title !== selectedTask?.title ||
          updatedForm.description !== selectedTask?.description ||
          updatedForm.is_completed !== selectedTask?.is_completed
      );
      return updatedForm;
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await updateTask(selectedTask.id, formData);
      toast.success('Tarea actualizada correctamente');
      closeModal();
    } catch (error) {
      toast.error('Error al actualizar', {
        description:
          error instanceof Error ? error.message : 'Intenta nuevamente',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await deleteTask(selectedTask.id);
      toast.success('Tarea eliminada');
      closeModal();
    } catch (error) {
      toast.error('Error al eliminar', {
        description:
          error instanceof Error ? error.message : 'No se pudo eliminar',
      });
    }
  };

  if (!selectedTask) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Tarea #{selectedTask.id}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              required
              disabled={isSubmitting}
              className="focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              rows={3}
              disabled={isSubmitting}
              className="resize-none focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              className="cursor-pointer"
              id="completed"
              checked={formData.is_completed}
              onCheckedChange={(checked) =>
                handleFormChange('is_completed', checked)
              }
              disabled={isSubmitting}
            />
            <Label htmlFor="completed" className="text-sm font-medium">
              Estado: {formData.is_completed ? 'Completada' : 'Pendiente'}
            </Label>
          </div>

          <DialogFooter className="flex justify-between mt-4">
            {/* Botón de cancelar a la izquierda */}
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancelar
            </Button>

            <div className="flex gap-2">
              {/* Botón de eliminar */}
              <DeleteConfirmation
                onConfirm={handleDelete}
                isDeleting={isSubmitting}
              />

              {/* Botón de guardar cambios */}
              <Button
                type="submit"
                disabled={isSubmitting || !isModified}
                className="bg-primary hover:bg-primary/90 cursor-pointer"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

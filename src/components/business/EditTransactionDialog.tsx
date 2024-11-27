import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import * as z from "zod"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




function EditTransactionDialog({ transaction, onUpdate, onClose }) {
    const form = useForm({
      defaultValues: {
        date: transaction.date, // Asegúrate de que `transaction.date` sea compatible con el formato esperado
        description: transaction.description,
        category: transaction.category,
        value: transaction.value,
      },
      resolver: zodResolver(
        z.object({
          date: z.string().nonempty("La fecha es obligatoria."),
          description: z.string().nonempty("La descripción es obligatoria."),
          category: z.string().nonempty("La categoría es obligatoria."),
          value: z
            .number({ invalid_type_error: "Debe ser un número." })
            .min(1, "El valor debe ser mayor a 0."),
        })
      ),
    });
  
    async function onSubmit(data) {
        const dataToUpdate = {...transaction, ...data}
        await onUpdate(dataToUpdate);
    }
  
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              {/* Campo Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input
                  type="date"
                  {...form.register("date")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                {form.formState.errors.date?.message && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.date.message.toString()}
                  </span>
                )}
              </div>
  
              {/* Campo Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <input
                  type="text"
                  {...form.register("description")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                {form.formState.errors.date?.message && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.date.message.toString()}
                  </span>
                )}
              </div>
  
              {/* Campo Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  {...form.register("category")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="venta">Venta</option>
                  <option value="compra">Compra</option>
                  <option value="gasto">Gasto</option>
                  <option value="ingres">Ingreso</option>
                  {/* Agrega más categorías según las necesidades */}
                </select>
                {form.formState.errors.date?.message && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.date.message.toString()}
                  </span>
                )}
              </div>
  
              {/* Campo Valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valor
                </label>
                <input
                  type="number"
                  {...form.register("value", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                {form.formState.errors.date?.message && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.date.message.toString()}
                  </span>
                )}
              </div>
            </div>
  
            <DialogFooter>
              <Button type="submit">Actualizar</Button>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  export default EditTransactionDialog
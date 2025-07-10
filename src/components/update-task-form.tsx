import { useTasksContext } from "@/contexts/tasks-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { images } from "@/utils/images";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import type { UpdateTaskFormProps, UpdatedTask } from "@/interface/interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateTask } from "@/routes/update-task";

export function UpdateTaskForm({task, onClose} : UpdateTaskFormProps ) {

    const {refetchTaskData} = useTasksContext();

    const formSchema = z.object({
        id: z.string(),
        title: z.string().min(3, { message: "O título da tarefa deve conter pelo menos 3 caracteres." }),
        description: z.string().min(10, { message: "a descrição da tarefa deve conter pelo menos 10 caracteres" }),
        images: z.array(z.string().url()).min(1, { message: "Associe no mínimo uma imagem a essa tarefa." })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: task.id,
            title: task.title,
            description: task.description,
            images: task.images
        }
    });

    const { mutate: updateTaskRequest, isPending, isError, error } = useMutation({
      mutationFn: updateTask,
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
        resetForm();
        onClose();
        refetchTaskData?.();
      },
      onError: () => {
        console.error(error);
      }
    })

    const handleSubmit = (formData : UpdatedTask) => {
        updateTaskRequest({updatedTask: formData});
    }

    const resetForm = () => {
        form.reset();
    };

    return (
        <div className="w-full">
            <Form {...form}>
              <form className="space-y-4 ">
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="task-title">Título</FormLabel>
                          <FormControl>
                            <Input 
                              id="task-title"
                              type="text"
                              placeholder="Título da tarefa..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="task-description">Descrição</FormLabel>
                          <FormControl>
                            <Input 
                              id="task-description"
                              type="text"
                              placeholder="Descrição da tarefa..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField 
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Imagens Associadas</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 gap-4">
                              {images.map((image, index) => {
                                const isSelected = (field.value as String[])?.includes(image);
                                return (
                                    <div key={image}
                                       className={cn(
                                        'relative cursor-pointer rouded-md overflow-hidden border-2 transition-colors',
                                        isSelected ? 'border-primary border-4' : 'border-gray-300 hover:border-gray-400'
                                       )}
                                       onClick={() => {
                                        if (isSelected) {
                                            field.onChange(
                                                field.value.filter(img => img !== image)
                                            )
                                        } else {
                                            field.onChange([...(field.value || []), image])
                                        }
                                       }}   
                                    >
                                     <img 
                                        src={image}
                                        alt={`Imagem ${index + 1}`} 
                                        className="w-ful h-24 object-cover"
                                      />
                                    </div>
                                )
                              })}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="w-full flex justify-end gap-3">
                    <Button type="button" className="uppercase" variant="secondary" onClick={resetForm}>
                        Limpar
                    </Button>

                    <Button type="submit" className="uppercase font-semibold w-[170px]" disabled={isPending} 
                    onClick={form.handleSubmit(handleSubmit)}>
                        { isPending ? <Loader className="animate-spinl"/> : "Salvar alterações" }
                    </Button>
                </div>
                {isError && (
                  <p className="text-[0.8rem] font-medium text-red-500">Erro ao atualizar nova tarefa</p>
                )}
              </form>
            </Form>
        </div>
    );
}
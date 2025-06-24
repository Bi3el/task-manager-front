import type { TaskCardProps } from "@/interface/interface";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "./ui/button";
import { CheckCircle, Circle, Edit, Trash } from "lucide-react";
import { Toggle } from "./ui/toggle";

export function TaskCard({ task } : TaskCardProps) {
    return (
        <Card 
        className={`w-full max-w-[400px] ${task.completed ? 'border-primary' : 'border'}`}
        >
      <div className="absolute right-2 top-2 flex items-center gap-3">
         <Dialog>
            <DialogTrigger asChild>
                <Button size='icon' variant='ghost'>
                  <Edit />
                </Button>
           </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
              <DialogTitle>Editar</DialogTitle>
              <DialogDescription>
                  Edite as informações da sua tarefa.
              </DialogDescription>
            </DialogHeader>

            <div>Aqui será o formulário</div>
          </DialogContent>
        </Dialog>

       <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button size='icon' variant='ghost'>
                  <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja deletar essa tarefa?</AlertDialogTitle>
                <AlertDialogDescription>
                    Essa ação não poderá ser desfeita futuramente.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </div>
        <CardHeader className="mt-2">
          <CardTitle>
            <p className="leading-tight max-w-[80%]">{task.title}</p>
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
        <Carousel className="w-full">
            <CarouselContent>
              {task.images.map(image => (
               <CarouselItem key={image}>
                <div className="relative">
                  <img 
                    src={image} 
                   alt={`Imagem associada à tarefa: ${task.title}`}
                   className="w-full h-[150px]"
                  />
              </div>
            <CarouselPrevious className="absolute left-4 top-1/2" />
            <CarouselNext className="absolute right-0 top-1/2"/>
            </CarouselItem>
           ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Toggle pressed={task.completed}>
            {task.completed ? <CheckCircle/> : <Circle />}
            {task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          </Toggle>
        </CardFooter>
      </Card>
    );
}
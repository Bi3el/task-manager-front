import { Plus } from 'lucide-react';
import logo from '../assets/logo-task-manager.png';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger
  } from "@/components/ui/tooltip"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CreateTaskForm } from './create-task-form';

export function Haeader() {
    return (
        <header className="w-full flex justify-center items-center h-16">
            <div className="w-full h-full max-w-screen-lg flex items-center justify-between">
                <div className='flex items-center'>
                    <img className='w-16 h-16' src={logo} alt="Logotipo Task Manager" />
                    <h1 className='font-semibold text-2xl'>Task Manager</h1>
                </div>

            <TooltipProvider>
              <Tooltip>
              <Dialog>
                <DialogTrigger>
                 <TooltipTrigger>
                    <Button size="icon" className='rounded-full'> 
                        <Plus className='text-white'/>
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Criar</DialogTitle>
                    <DialogDescription>
                       Criar nova tarefa.
                    </DialogDescription>
                    </DialogHeader>

                    <div className='grid gap-3 py-4'>
                        <div className='flex flex-col gap-2'>
                            <CreateTaskForm />
                        </div>
                    </div>
                </DialogContent>
                </Dialog>
             <TooltipContent className='text-white'>
                 <p>Add to library</p>
             </TooltipContent>
           </Tooltip>
          </TooltipProvider>
               
                <ModeToggle />
            </div>
        </header>
    );
}
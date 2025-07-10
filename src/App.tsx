import { useState } from "react";
import { Haeader } from "./components/header";
import { PageContainer } from "./components/page-container";
import { PageContent } from "./components/page-content";
import { TaskCard } from "./components/task-card";
import { useTasksContext } from "./contexts/tasks-context";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { X } from "lucide-react";
import { Separator } from "./components/ui/separator";

export function App() {
  const { data } = useTasksContext();
  const [search, setSearch] = useState<string>('');
  
  if (!data) {
    return;
  }

  const filteredTasks = search ?
    data.tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())
    ) 
    : data.tasks;

  const tasksCompleted = filteredTasks.filter(task => task.completed);
  const tasksPending = filteredTasks.filter(task => !task.completed);
  

  return (
    <PageContainer>
      <PageContent>
        <Haeader />
         
         {data.tasks.length > 0 && (
          <div className="w-full flex items-center gap-3 my-5">
            <Label htmlFor="search-input">Pesquisar</Label>
            <Input 
              id="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-[400px]"
            />

          {search && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <X className="cursor-pointer opacity-[0.5]" onClick={() => setSearch('')}/>
                </TooltipTrigger>
                  <TooltipContent>
                    <p>Limpar</p>
                 </TooltipContent>
             </Tooltip>
           </TooltipProvider>
         )}
       </div>
      )}

       {data.tasks.length < 1 && (
        <h2 className="text-lg font-semibold text-center mt-20">
          Você ainda não criou nenhuma tarefa.
          Aproveite para criar a primeira agora mesmo!!!
        </h2>
       )}

       {data.tasks.length > 0 && filteredTasks.length < 1 && (
        <h2 className="text-md font-semibold text-left">
          Nenhuma tarefa encontrada para essa pesquisa.
        </h2>
       )}

       {tasksPending.length > 0 && (
        <div className="flex items-center gap-2">
          <h2>Pendentes</h2>
           <Separator />
        </div>
       )}

       <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasksPending.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
       </div>

       {tasksCompleted.length > 0 && (
        <div className="flex items-center gap-2 my-2">
          <h2>Concluídas</h2>
           <Separator />
        </div>
       )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasksCompleted.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
       </div>

      </PageContent>
    </PageContainer>
  )
}

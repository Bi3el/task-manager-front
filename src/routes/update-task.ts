import { api } from "@/api/api";
import type { UpdateTaskProps } from "@/interface/interface";

export async function updateTask({updatedTask} : UpdateTaskProps ) {
    const response = await api.put(`/tasks/${updatedTask.id}`, {
        ...updatedTask
    })

    return response.data;
}
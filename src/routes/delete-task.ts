import { api } from "@/api/api";
import type { DeleteTaskProps } from "@/interface/interface";

export async function deleteTask({taskId} : DeleteTaskProps ) {
    const response = await api.delete(`/tasks/${taskId}`)

    return response.data;
}
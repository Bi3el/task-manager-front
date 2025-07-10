import { api } from "@/api/api";
import type { ChangeTaskCompletionProps } from "@/interface/interface";

export async function changeTaskCompletion({taskId} : ChangeTaskCompletionProps ) {
    const response = await api.put(`/tasks/change-task-completion/${taskId}`);

    return response.data;
}
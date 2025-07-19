// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\tasks\hooks\useTasks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api'; // Corrected path based on new structure

const fetchTasks = async () => {
    const { data } = await api.get('/tasks');
    return data;
};

const addTask = async (newTask) => {
    const { data } = await api.post('/tasks', newTask);
    return data;
};

const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
};

const updateTaskCompletion = async ({ id, completed }) => {
    const { data } = await api.patch(`/tasks/${id}`, { completed });
    return data;
};

export const useTasks = () => {
    const queryClient = useQueryClient();

    // Query to fetch tasks
    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    // Mutation to add a task
    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']); // Invalidate and refetch tasks after adding
        },
    });

    // Mutation to delete a task
    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']); // Invalidate and refetch tasks after deleting
        },
    });

    // Mutation to update task completion status
    const updateTaskCompletionMutation = useMutation({
        mutationFn: updateTaskCompletion,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']); // Invalidate and refetch tasks after updating
        },
    });

    return {
        tasks,
        isLoading,
        isError,
        error,
        addTask: addTaskMutation.mutate,
        addTaskStatus: addTaskMutation.status, // Expose status for UI feedback (loading, error)
        deleteTask: deleteTaskMutation.mutate,
        deleteTaskStatus: deleteTaskMutation.status,
        updateTaskCompletion: updateTaskCompletionMutation.mutate,
        updateTaskCompletionStatus: updateTaskCompletionMutation.status,
    };
};
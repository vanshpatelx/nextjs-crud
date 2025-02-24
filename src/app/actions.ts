"use server";

import prisma from "@/lib/prisma";


// Fetch all tasks
export async function getTasks() {
    return await prisma.task.findMany();
}

// Create a task
export async function createTask(title: string, description: string) {
    await prisma.task.create({ data: { title, description } });
}

// Delete a task
export async function deleteTask(id: number) {
    await prisma.task.delete({ where: { id } });
}


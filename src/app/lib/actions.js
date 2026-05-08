import { revalidatePath } from "next/cache";

export const deleteUser = async (userId) => {
    'use server'

    const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log('after delete', data);

    // MongoDB deleteOne() returns { deletedCount: number, ... }
    // But be defensive in case backend response changes.
    if (data?.deletedCount > 0 || data?.acknowledged) {
        revalidatePath('/users');
    }

    return data;
}
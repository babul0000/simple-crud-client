import { revalidatePath } from "next/cache";


export const createUser = async(formData) => {
'use server'
const newUser = Object.fromEntries(formData.entries())
console.log(newUser, 'newuser');

const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(newUser)
});
const data = await res.json();
if(data.insertedId){
    revalidatePath('/users')
}

return data;
}

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
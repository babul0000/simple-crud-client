import { updateUser } from "@/app/lib/actions";
import { getUserById } from "@/app/lib/data";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import React from "react";

const EditPage = async ({ params }) => {
    const { userId } = await params;
    const user = await getUserById(userId);
    console.log(user, "editing user");

    const updateUserWrapper = async(formData) => {
        'use server'
        return updateUser(userId, formData)
    }

    return (
        <div>
            <h2>edit users: {user.name}</h2>
            <div className="w-4/12 mx-auto mt-10">
                <form action={updateUserWrapper} className="flex flex-col gap-4">
                    <TextField className="w-full" name="name" defaultValue={user?.name} type="text">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                    </TextField>
                    <TextField className="w-full" name="email" defaultValue={user?.email}type="email">
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                    </TextField>
                    <TextField className="w-full" name="text" defaultValue={user?.jobRole} type="text">
                        <Label>role</Label>
                        <Input placeholder="Enter your role" />
                    </TextField>

                    
                        <div>
                            <Button slot="close" variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" slot="close">
                            update user
                        </Button>
                        </div>
                    
                </form>
            </div>
        </div>
    );
};

export default EditPage;

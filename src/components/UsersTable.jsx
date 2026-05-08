'use client'

import { AlertDialog, Button } from "@heroui/react";
import Link from "next/link";

const UsersTable = ({ users, deleteUserAction }) => {
    if (!users || users.length === 0) return <p className="text-center p-5">No users found.</p>;

    const handleDelete = async(userId) => {
    await deleteUserAction(userId)
    }

    return (
        <div className="w-full border rounded-lg overflow-hidden border-gray-200 shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-100 font-bold p-3 border-b border-gray-200 text-sm uppercase tracking-wider">
                <div>Name</div>
                <div>Email</div>
                <div>Job Role</div>
                <div className="text-center">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {users.map((user) => (
                    <div key={user._id} className="grid grid-cols-4 p-3 items-center hover:bg-gray-50 transition-colors">
                        <div className="text-sm font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-600 truncate">{user.email}</div>
                        <div className="text-sm text-gray-600">{user.jobRole}</div>
                        <div className="flex gap-2 justify-center">
                            <Link href={`/users/${user._id}`}>
                                <Button size="sm" variant="flat" className="min-w-[70px]">Details</Button>
                            </Link>
                            <Link href={`/users/${user._id}`}>
                                <Button size="sm" color="primary" variant="flat" className="min-w-[70px]">Edit</Button>
                            </Link>

    <AlertDialog>
                                <Button variant="danger">Delete Project</Button>
                                <AlertDialog.Backdrop>
                                    <AlertDialog.Container>
                                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                                            <AlertDialog.CloseTrigger />
                                            <AlertDialog.Header>
                                                <AlertDialog.Icon status="danger" />
                                                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                                <p>
                                                    This will permanently delete <strong>{user.name}</strong> and all of its
                                                    data. This action cannot be undone.
                                                </p>
                                            </AlertDialog.Body>
                                            <AlertDialog.Footer>
                                                <Button slot="close" variant="tertiary">
                                                    Cancel
                                                </Button>
                                                <Button
                                                onClick={() => handleDelete(user._id)}
                                                slot="close" variant="danger">
                                                    Delete Project
                                                </Button>
                                            </AlertDialog.Footer>
                                        </AlertDialog.Dialog>
                                    </AlertDialog.Container>
                                </AlertDialog.Backdrop>
    </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersTable;
import UsersTable from "@/components/UsersTable";
import { getUsers } from "../lib/data";
import { createUser, deleteUser } from "../lib/actions";
import AddUserModal from "@/components/AddUserModal";


const UserPage = async() => {
    const users = await getUsers();
    console.log(users);
    
    return (
        <div>
            <h1>users management: {users.length}</h1>

            <div className="flex justify-center my-5">
                <AddUserModal createUserAction={createUser}></AddUserModal>
            </div>
            <div>
                <UsersTable users={users} deleteUserAction={deleteUser}></UsersTable>
            </div>
        </div>
    );
};

export default UserPage;
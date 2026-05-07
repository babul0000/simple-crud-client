import UsersTable from "@/components/UsersTable";
import { getUsers } from "../lib/data";


const UserPage = async() => {
    const users = await getUsers();
    console.log(users);
    
    return (
        <div>
            <h1>users management: {users.length}</h1>
            <div>
                <UsersTable users={users}></UsersTable>
            </div>
        </div>
    );
};

export default UserPage;
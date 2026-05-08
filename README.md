# Next.js CRUD Project (Full Summary with Code)

এই প্রজেক্টটি তৈরি করা হয়েছে :contentReference[oaicite:0]{index=0} ব্যবহার করে এবং backend API (`http://localhost:5000/users`) এর সাথে connect করে সম্পূর্ণ CRUD operation করার জন্য।

---

# 1. Server Actions (Main Logic)

📁 `src/app/lib/actions.js`

```js
const BASE_URL = "http://localhost:5000/users";

// Get all users
export async function getUsers() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// Get single user
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

// Create user
export async function createUser(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update user
export async function updateUser(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete user
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
কেন Server Actions ব্যবহার করা হয়েছে?
API call centralize করার জন্য
UI থেকে logic আলাদা রাখার জন্য
Code reusable করার জন্য
Clean architecture maintain করার জন্য
2. Users Table Component

📁 src/components/UsersTable.jsx

"use client";

import { deleteUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function UsersTable({ users }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteUser(id);
    router.refresh(); // UI update
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
কেন UsersTable ব্যবহার করা হয়েছে?
Users list দেখানোর জন্য
Delete action handle করার জন্য
UI representation তৈরি করার জন্য
3. Add User Modal

📁 src/components/AddUserModal.jsx

"use client";

import { useState } from "react";
import { createUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function AddUserModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser({ name, email });

    setName("");
    setEmail("");

    router.refresh(); // UI update
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Add User</button>
    </form>
  );
}
কেন AddUserModal ব্যবহার করা হয়েছে?
নতুন user add করার জন্য form UI তৈরি করা
User input collect করার জন্য
Backend এ POST request পাঠানোর জন্য
4. Backend API Connection
http://localhost:5000/users
কেন backend API ব্যবহার করা হয়েছে?
Real data store করার জন্য
CRUD operation handle করার জন্য
Frontend কে dynamic data দেওয়ার জন্য
5. CRUD Flow Diagram
Next.js UI
   ↓
Server Actions (actions.js)
   ↓
Fetch API
   ↓
Backend (Express + MongoDB)
   ↓
Database
Summary

এই প্রজেক্টে:

Next.js App Router ব্যবহার করা হয়েছে
Server Actions দিয়ে API call করা হয়েছে
Users Table দিয়ে data display করা হয়েছে
Modal form দিয়ে data create করা হয়েছে
Full CRUD system implement করা হয়েছে
Clean separation of frontend & backend logic রাখা হয়েছে
```

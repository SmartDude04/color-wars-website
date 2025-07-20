"use client";

import { useState } from "react";

interface Props {
    user: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    },
    changeUserRole(userId: string, role: string): void,
    deleteUser(userId: string): void,
    isLastRow: boolean,
    isCurrentUser: boolean,
}

export default function UserRow({ user, changeUserRole, deleteUser, isLastRow, isCurrentUser }: Props) {
    const [role, setRole] = useState(user.role);

    return (
        <div className={`bg-white dark:bg-[#151515] border-gray-300 dark:border-[#333333] flex flex-row items-center ${isLastRow ? "rounded-b-xl" : "border-b-1"}`}>
            <h1 className="p-1 pl-4 md:p-4 w-[40%]">{user.username}</h1>
            <div className="p-1 pl-0! md:p-4 w-[30%]">
                <select value={role} onChange={(event) => {
                    setRole(event.target.value);
                    changeUserRole(user.id, event.target.value);
                }} disabled={isCurrentUser} className="disabled:text-gray-300 dark:disabled:text-gray-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-full">
                    <option value="user">User</option>
                    <option value="specialist">Specialist</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <h1 className="p-1 pl-0! md:p-4 w-[30%]">
                <button onClick={() => deleteUser(user.id)} disabled={isCurrentUser} className="bg-red-200 dark:bg-red-900 pt-1 pb-1 pl-2 pr-2 md:pl-6 md:pr-6 rounded-md md:rounded-3xl hover:bg-red-300 dark:hover:bg-red-800 cursor-pointer duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-800">Delete</button>
            </h1>
        </div>
    );
}
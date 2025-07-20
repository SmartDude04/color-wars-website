"use client";

import UserRow from "@/components/users/UserRow";

interface Props {
    users: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    }[],
    changeUserRole(userId: string, role: string): void,
    deleteUser(userId: string): void,
    curUserId: string
}

export default function UsersTable({ users, changeUserRole, deleteUser, curUserId }: Props) {
    return (
        <div className="w-[95%] md:w-[70%] mt-6 border-1 border-gray-300 dark:border-[#333333] rounded-xl duration-200 text-lg mb-8 flex flex-col">
            <div className={`bg-gray-200 dark:bg-[#202020] border-0 flex flex-row rounded-t-xl ${users.length === 0 ? "rounded-b-xl" : ""}`}>
                <h1 className="w-[40%] text-left p-4">Username</h1>
                <h1 className="w-[30%] text-left p-4 pl-0">Role</h1>
                <h1 className="w-[30%] text-left p-4 pl-0">Delete</h1>
            </div>
            { users.map((user, index) => (
                <UserRow user={user} changeUserRole={changeUserRole} deleteUser={deleteUser} isLastRow={index === users.length - 1} key={user.id} isCurrentUser={user.id === curUserId}/>
            )) }
        </div>
    );
}
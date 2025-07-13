"use client";

import UserRow from "@/components/users/UserRow";
import LoadingRow from "@/components/users/LoadingRow";

interface Props {
    users: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    }[],
    changeUserRole(userId: string, role: string): void,
    deleteUser(userId: string): void,
    curUserId: string,
    loading: boolean
}

export default function UsersTable({ users, changeUserRole, deleteUser, curUserId, loading }: Props) {
    return (
        <table className="w-[95%] md:w-[70%] border-separate border-spacing-0 mt-6 border-1 border-gray-300 dark:border-[#333333] bg-white rounded-xl duration-200 text-lg mb-8">
            <thead className="bg-gray-200 dark:bg-[#202020] border-0">
            <tr>
                <th className={`text-left p-4 rounded-tl-xl ${users.length === 0 && !loading ? "rounded-bl-xl" : ""}`}>Username</th>
                <th className="text-left p-4">Role</th>
                <th className={`text-left p-4 rounded-tr-xl ${users.length === 0 && !loading ? "rounded-br-xl" : ""}`}>Delete</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#151515]">
                {loading ? (
                    <LoadingRow colSpan={3} />
                ) : (users.map((user, index) => (
                    <UserRow user={user} changeUserRole={changeUserRole} deleteUser={deleteUser} isLastRow={index === users.length - 1} key={user.id} isCurrentUser={user.id === curUserId}/>
                ))) }
            </tbody>
        </table>
    );
}
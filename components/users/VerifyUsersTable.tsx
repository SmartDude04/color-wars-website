"use client";

import VerifyUserRow from "./VerifyUserRow";
import LoadingRow from "@/components/users/LoadingRow";

interface Props {
    unverifiedUsers: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    }[],
    verifyUser(userId: string): void,
    deleteUser(userId: string): void
}

export default function VerifyUsersTable({ unverifiedUsers, verifyUser, deleteUser }: Props) {
    return (
        <table className="w-[95%] md:w-[70%] border-separate border-spacing-0 mt-6 border-1 border-gray-300 dark:border-[#333333] bg-white rounded-xl duration-200 text-lg">
            <thead className="bg-gray-200 dark:bg-[#202020] border-0">
                <tr>
                    <th className={`text-left p-4 rounded-tl-xl ${unverifiedUsers.length === 0 ? "rounded-bl-xl" : ""}`}>Username</th>
                    <th className={`text-left p-4 rounded-tr-xl ${unverifiedUsers.length === 0  ? "rounded-br-xl" : ""}`}>Action</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#151515]">
                { unverifiedUsers.map((user, index) => (
                    <VerifyUserRow key={user.id} user={user} verifyUser={verifyUser} deleteUser={deleteUser} isLastRow={index === unverifiedUsers.length - 1} />
                )) }
            </tbody>
        </table>
    );
}
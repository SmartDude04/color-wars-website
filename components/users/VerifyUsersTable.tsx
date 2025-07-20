"use client";

import VerifyUserRow from "./VerifyUserRow";

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
        <div className="w-[95%] md:w-[70%] mt-6 border-1 border-gray-300 dark:border-[#333333] rounded-xl duration-200 text-lg mb-8 flex flex-col">
            <div className={`bg-gray-200 dark:bg-[#202020] border-0 flex flex-row rounded-t-xl ${unverifiedUsers.length === 0 ? "rounded-b-xl" : ""}`}>
                <h1 className="w-[40%] text-left p-4">Username</h1>
                <h1 className="w-[60%] text-left p-4 pl-0">Action</h1>
            </div>
            { unverifiedUsers.map((user, index) => (
                <VerifyUserRow key={user.id} user={user} verifyUser={verifyUser} deleteUser={deleteUser} isLastRow={index === unverifiedUsers.length - 1} />
            )) }
        </div>
    );
}
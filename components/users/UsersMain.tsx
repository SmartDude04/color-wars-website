"use client";

import { useEffect, useState } from "react";
import { getUsersData, verifyUserData, updateUserRole, deleteUserData } from "@/app/(default)/users/actions";
import { useSession } from "next-auth/react";
import VerifyUsersTable from "@/components/users/VerifyUsersTable";
import UsersTable from "@/components/users/UsersTable";

interface UserDataType {
    verifiedUsers: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    }[],
    unverifiedUsers: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    }[]
}

interface Props {
    role: string
}

export default function UsersMain({ role }: Props ) {
    const [userData, setUserData] = useState<UserDataType>({ verifiedUsers: [], unverifiedUsers: [] });
    const [loading, setLoading] = useState(true);
    const curUserId = useSession().data?.user?.id;

    const fetchUserData = async () => {
        // Fetch and set the data
        const fetchedUserData = await getUsersData();
        setUserData(fetchedUserData);

        setLoading(false);
    }

    useEffect(() => {
        fetchUserData().then();
    }, []);

    const verifyUser = async (userId: string) => {
        // Set the state optimistically
        const user = userData.unverifiedUsers.find(user => user.id === userId);
        setUserData({ unverifiedUsers: userData.unverifiedUsers.filter(user => user.id !== userId), verifiedUsers: [ ...userData.verifiedUsers, user! ].sort((a, b) => a.username.localeCompare(b.username)) });

        await verifyUserData(userId);

        await new Promise(resolve => setTimeout(resolve, 5000));
        // Re-fetch the data to confirm optimistic update
        await fetchUserData();
    }

    const changeUserRole = async (userId: string, role: string) => {
        await updateUserRole(userId, role);

        // Re-fetch the data to confirm optimistic update
        await fetchUserData();
    }

    const deleteUser = async (userId: string) => {
        // Show the user a confirmation to delete the user
        const confirmed = window.confirm("Are you sure you want to delete this user? If they are verified, this will also delete all points they have added.");
        if (!confirmed) return;

        // Optimistically update the page
        setUserData({ unverifiedUsers: userData.unverifiedUsers.filter(user => user.id !== userId), verifiedUsers: userData.verifiedUsers.filter(user => user.id !== userId) })

        await deleteUserData(userId);

        // Re-fetch the data to confirm optimistic update
        await fetchUserData();
    }

    return (
        <div className="w-full flex flex-col items-center">
            <VerifyUsersTable unverifiedUsers={userData.unverifiedUsers} verifyUser={verifyUser} deleteUser={deleteUser} loading={loading} />
            { role === "admin" ? (
                <UsersTable users={userData.verifiedUsers} changeUserRole={changeUserRole} deleteUser={deleteUser} curUserId={curUserId!} loading={loading} />
            ) : <></>}
        </div>
    );
}
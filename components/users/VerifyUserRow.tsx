interface UserRowProps {
    user: {
        id: string,
        username: string,
        verified: boolean,
        role: string,
    },
    verifyUser: (userId: string) => void,
    deleteUser: (userId: string) => void,
    isLastRow: boolean,
}

export default function VerifyUserRow({ user, verifyUser, deleteUser, isLastRow }: UserRowProps) {
    return (
        <div className={`bg-white dark:bg-[#151515] border-gray-300 dark:border-[#333333] flex flex-row items-center ${isLastRow ? "rounded-b-xl" : "border-b-1"}`}>
            <h1 className="p-1 pl-4 md:p-4 w-[40%]">{user.username}</h1>
            <div className="p-1 pl-0! md:p-4 w-[60%]">
                <button onClick={() => deleteUser(user.id)} className="bg-red-200 dark:bg-red-900 pt-2 lg:pt-1 pb-1 pl-2 pr-2 md:pl-6 md:pr-6 rounded-md md:rounded-3xl hover:bg-red-300 dark:hover:bg-red-800 cursor-pointer duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-800 mr-2">Delete</button>
                <button onClick={() => verifyUser(user.id)} className="bg-green-200 dark:bg-green-900 pt-2 lg:pt-1 pb-1 pl-2 pr-2 md:pl-6 md:pr-6 rounded-md md:rounded-3xl hover:bg-green-300 dark:hover:bg-green-800 cursor-pointer duration-150">Verify</button>
            </div>
        </div>
    );
}
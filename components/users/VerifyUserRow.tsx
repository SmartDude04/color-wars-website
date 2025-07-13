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
        <tr>
            <td className={`p-1 pl-4 md:p-4 border-b border-gray-300 dark:border-[#333333] ${isLastRow ? "rounded-bl-xl" : ""}`}>{user.username}</td>
            <td className={`p-1 md:p-4 border-b border-gray-300 dark:border-[#333333] ${isLastRow ? "rounded-br-xl" : ""}`}>
                <button onClick={() => deleteUser(user.id)} className="bg-red-200 dark:bg-red-900 pt-2 lg:pt-1 pb-1 pl-2 pr-2 md:pl-6 md:pr-6 rounded-md md:rounded-3xl hover:bg-red-300 dark:hover:bg-red-800 cursor-pointer duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-800 mr-2">Delete</button>
                <button onClick={() => verifyUser(user.id)} className="bg-green-200 dark:bg-green-900 pt-2 lg:pt-1 pb-1 pl-2 pr-2 md:pl-6 md:pr-6 rounded-md md:rounded-3xl hover:bg-green-300 dark:hover:bg-green-800 cursor-pointer duration-150">Verify</button>
            </td>
        </tr>
    );
}
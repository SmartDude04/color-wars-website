"use client";

import { useState } from "react";
import { addGroup, deleteGroup, getGroups, updateGroup } from "@/app/(default)/groups/actions";
import { Plus } from "lucide-react";
import NewGroupCard from "@/components/groups/NewGroupCard";
import GroupCard from "@/components/groups/GroupCard";

type GroupDataType = {
    id: string,
    name: string,
    colorId: string
}[];

type ColorDataType = {
    id: string,
    name: string,
    hexColor: string
}[];


interface Props {
    initialGroups: GroupDataType,
    initialColors: ColorDataType
}


export default function GroupsMain({ initialGroups, initialColors }: Props) {
    const [groups, setGroups] = useState<GroupDataType>(initialGroups);
    const [addGroupModal, setAddGroupModal] = useState(false);

    const fetchGroups = async () => {
        const fetchedGroups = await getGroups();
        setGroups(fetchedGroups);
    }

    const addGroupHandler = async (name: string, colorId: string) => {
        setAddGroupModal(false);
        setGroups([ ...groups, {id: "", name, colorId}].sort((a, b) => a.name.localeCompare(b.name)));

        await addGroup(name, colorId);
        await fetchGroups();
    }

    const updateGroupHandler = async (id: string, name: string, colorId: string) => {
        await updateGroup(id, name, colorId);
        await fetchGroups();
    }

    const deleteGroupHandler = async (id: string) => {
        setGroups(groups.filter(group => group.id !== id));

        await deleteGroup(id);
        await fetchGroups();
    }

    return (
        <>
            <div className="w-full pl-4 pt-6 sm:pl-6">
                <button onClick={() => setAddGroupModal(true)} className="flex flex-row items-center bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 pt-1 pb-1 pl-4 pr-4 rounded-4xl duration-200 cursor-pointer">
                    <Plus width={48} height={48} strokeWidth={3}/>
                    <h1 className="text-4xl pt-3 lg:pt-0">Add Group</h1>
                </button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 p-4 sm:p-6">
                { addGroupModal ? (
                    <NewGroupCard addGroup={addGroupHandler} cancelAddGroup={() => setAddGroupModal(false)} colors={initialColors} />
                ) : <></> }
                { groups.map(group => (
                    <GroupCard key={group.id} id={group.id} name={group.name} colorId={group.colorId} colors={initialColors} updateGroup={updateGroupHandler} deleteGroup={deleteGroupHandler} />
                ))}
            </div>
        </>
    );
}
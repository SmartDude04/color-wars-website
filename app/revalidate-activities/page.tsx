"use client";

import { revalidateActivities } from "@/app/revalidate-activities/actions";
import { useEffect } from "react";

export default function Page() {

    useEffect(() => {
        revalidateActivities().then();
    }, []);

    return <div>Revalidated activities</div>;
}
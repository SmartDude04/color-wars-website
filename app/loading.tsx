import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[calc(100dvh-72px)] flex items-center justify-center">
            <LoaderCircle className="animate-spin" width={64} height={64}/>
        </div>
    )
}
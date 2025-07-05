import loadingSVG from "@/public/loading.svg";
import Image from "next/image";

export default function PointsCardDisplayLoading() {
    return (
        <div className="w-full flex justify-center">
            <Image src={loadingSVG} alt="Loading..." width={96} height={96} />
        </div>
    );
}
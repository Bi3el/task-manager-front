import { PageContainerProps } from "@/interface/interface";

export function PageContainer({children} : PageContainerProps) {
    return (
        <div className="w-full min-h-screen flex justify-center">
            { children }
        </div>
    );
}
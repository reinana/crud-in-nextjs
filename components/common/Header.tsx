import { cn } from "@/lib/util";

interface HeaderProps {
    title: string;
    center?: boolean;
    lg?: boolean;
}
const Header = ({ title, center, lg }: HeaderProps) => {
    return (
        <div className={center ? 'text-center' : 'text-left'}>
            {lg && <h1 className={cn("font-bold text-4xl my-2")}>{title}</h1>}
            {!lg && <h3 className={cn("font-bold text-2xl my-2")}>{title}</h3>}
        </div>
    );
}

export default Header;
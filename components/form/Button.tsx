import { cn } from "@/lib/util";
import React from "react";
import { IconType } from "react-icons";
interface ButtonProps {
    // props
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    className?: string;
    icon?: IconType;
    type?: "submit" | "button" | "reset" | undefined
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    className,
    icon: Icon,
    type,
    onClick
}: ButtonProps) => {
    return (<button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn("disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-auto border-slate-300 flex items-center justify-center gap-2 px-5 py-3 bg-slate-700 text-white my-2",
            outline && "bg-transparent text-slate-700",
            small && "text-sm py-1 px-2 border-[1px]",
            className && className
        )}
    >{Icon && <Icon size={20} />}{label}</button>);
}

export default Button;
import { LogIn } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const Navigation = () => {
  return (
    <div className="right-0 top-0 z-10 flex w-full items-center justify-end p-3 sm:fixed">
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          size: "sm",
        })}
      >
        Войти
        <LogIn />
      </Link>
    </div>
  );
};

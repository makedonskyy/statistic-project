"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const LOGOUT_QUERY = gql`
  query LogoutUser {
    logoutUser
  }
`;

type NavigationProps = {
  onLogout: () => void;
};

export const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const router = useRouter();

  const [logoutUser, { loading, error }] = useLazyQuery(LOGOUT_QUERY, {
    onCompleted: () => {
      onLogout();
    },
    onError: (err) => {
      console.error("Ошибка выхода:", err);
    },
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Выход выполнен успешно");
    } catch (err) {
      console.error("Ошибка во время выхода:", err);
    }
  };

  return (
    <div className="right-0 top-0 z-10 flex w-full items-center justify-end p-3 sm:fixed">
      <button
        onClick={handleLogout}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
        })}
      >
        Выйти
        <LogIn />
      </button>
    </div>
  );
};

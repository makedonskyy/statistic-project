"use client";

import { buttonVariants } from "./ui/button";
import { gql, useLazyQuery } from "@apollo/client";
import useStore from "@/store";
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
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;
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
      router.push("/");
    } catch (err) {
      console.error("Ошибка во время выхода:", err);
    }
  };

  return (
    <div className="right-0 top-0 z-10 flex w-full items-center justify-end p-3 sm:fixed">
      {!user ? (
        <button
        onClick={() => {
          router.push("/dashboard");
        }}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
        })}
      >
        Войти
      </button>
       
      ) : (
        <button
        onClick={handleLogout}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
        })}
      >
        Выйти
      </button>
      )}
    </div>
  );
};

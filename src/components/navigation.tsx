"use client";

import { buttonVariants } from "./ui/button";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const LOGOUT_QUERY = gql`
  query LogoutUser {
    logoutUser
  }
`;

type NavigationProps = {
  onLogout: () => void;
  onLogin: boolean;
};

export const Navigation: React.FC<NavigationProps> = ({
  onLogout,
  onLogin,
}) => {
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
      router.push("/");
    } catch (err) {
      console.error("Ошибка во время выхода:", err);
    }
  };

  return (
    <>
      <div className="left-0 top-0 z-10 flex items-center p-3 sm:fixed">
        <button
          onClick={() => {
            router.push("/");
          }}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
        >
          SP
        </button>
      </div>
      <div className="right-0 top-0 z-10 flex items-center justify-end p-3 sm:fixed">
        {!onLogin ? (
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
    </>
  );
};

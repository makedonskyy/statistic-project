import client from "@/lib/apolloClient";
import { FC, PropsWithChildren } from "react";
import { Navigation } from "../navigation";
import { ApolloProvider } from "@apollo/client";

type MainLayoutProps = PropsWithChildren & {
  onLogout: () => void;
};

export const MainLayout: FC<MainLayoutProps> = ({ children, onLogout }) => {
  return (
    <ApolloProvider client={client}>
      <div className="flex h-full flex-col items-center justify-center">
        <Navigation onLogout={onLogout}/>
        <div className="w-full flex-1 overflow-auto px-4">
          <div className="py-8">{children}</div>
        </div>
      </div>
    </ApolloProvider>
  );
};

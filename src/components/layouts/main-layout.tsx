import client from "@/lib/apolloClient";
import { FC, PropsWithChildren } from "react";
import { Navigation } from "../navigation";
import { ApolloProvider } from "@apollo/client";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <div className="flex h-full flex-col items-center justify-center">
        <Navigation />
        <div className="w-full flex-1 overflow-auto px-4">
          <div className="py-8">{children}</div>
        </div>
      </div>
    </ApolloProvider>
  );
};

import { FC, PropsWithChildren } from "react";
import { Navigation } from "../navigation";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Navigation />
      <div className="w-full flex-1 overflow-auto px-4">
        <div className="py-8">{children}</div>
      </div>
    </div>
  );
};

import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface INoSSRWrapper {
  children: ReactNode;
}

const NoSSRWrapper = ({ children }: INoSSRWrapper) => <>{children}</>;
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});

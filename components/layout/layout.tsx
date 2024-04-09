import MainNavigation from "./main-navigation";
import { LayoutProps } from "../../types/types";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

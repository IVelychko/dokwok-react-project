import { useContext } from "react";
import { RootContext, RootContextState } from "../components/RootLayout";

export default function useRootContext() {
  return useContext<RootContextState>(RootContext);
}

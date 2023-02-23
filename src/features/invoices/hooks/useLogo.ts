import { useWatchInvoice } from "./useWatchInvoice";

export function useLogo() {
  const logo = useWatchInvoice("logo");
  return logo?.item(0);
}

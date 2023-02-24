import { useWatchInvoice } from "./useWatchInvoice";

export function useLogo() {
  const { logo } = useWatchInvoice();
  return logo?.item(0);
}

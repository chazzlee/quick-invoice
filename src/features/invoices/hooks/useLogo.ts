import { useWatch } from "react-hook-form";
import { InvoiceFormData } from "../types";

export function useLogo() {
  const logo = useWatch<InvoiceFormData, "logo">({ name: "logo" });
  return logo?.[0];
}

import { useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";

export function useBalance() {
  const subtotal = useWatch<InvoiceFormData, "subtotal">({ name: "subtotal" });
  const total = useWatch<InvoiceFormData, "total">({ name: "total" });
  const balanceDue = useWatch<InvoiceFormData, "balanceDue">({
    name: "balanceDue",
  });

  return {
    subtotal,
    total,
    balanceDue,
  };
}

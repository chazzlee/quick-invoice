import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";

type LineTaxCheckboxProps = {
  index: number;
  isTaxable: boolean;
  onCheck: () => void;
};

export function LineTaxCheckbox({
  index,
  isTaxable,
  onCheck,
}: LineTaxCheckboxProps) {
  const { register } = useInvoiceFormContext();

  return (
    <div className="w-1/12 mt-3">
      <input
        type="checkbox"
        className="checkbox"
        {...register(`lineItems.${index}.taxable`, {
          onChange() {
            onCheck();
          },
        })}
        defaultChecked={isTaxable}
      />
    </div>
  );
}

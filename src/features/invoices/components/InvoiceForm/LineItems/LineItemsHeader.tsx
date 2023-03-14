import { useTax } from "@/features/invoices/hooks/useTax";

type LineItemsHeaderProps = Readonly<{
  onClear(): void;
}>;

export function LineItemsHeader({ onClear }: LineItemsHeaderProps) {
  const { isTaxable } = useTax();

  return (
    <div className="flex items-center gap-4 py-2 border-t border-b border-gray-400">
      <button type="button" className="btn btn-square btn-sm" onClick={onClear}>
        C
      </button>
      <label
        className={`${isTaxable ? "w-5/12" : "w-6/12"}`}
        htmlFor="description"
      >
        Description
      </label>
      <label className="w-2/12" htmlFor="rate">
        Rate
      </label>
      <label className="w-2/12" htmlFor="quantity">
        Qty
      </label>
      <label className="w-2/12" htmlFor="amount">
        Amount
      </label>
      {isTaxable ? (
        <label className="w-1/12" htmlFor="tax">
          Tax
        </label>
      ) : null}
    </div>
  );
}

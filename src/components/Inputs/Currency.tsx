import { NumericFormat } from "react-number-format";
import { valueInDollars } from "@/utils/formats";

type CurrencyProps = Readonly<{
  amount: number;
  className?: string;
  type?: "text" | "input";
}>;

export function Currency({
  amount,
  className = "",
  type = "text",
}: CurrencyProps) {
  return (
    <NumericFormat
      className={className}
      displayType={type}
      value={valueInDollars(amount)}
      prefix={"$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

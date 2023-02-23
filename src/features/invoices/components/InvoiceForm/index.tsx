import { InvoiceTitle } from "./InvoiceTitle";
import { CompanyLogo } from "./CompanyLogo";
import { GeneralDetails } from "./GeneralDetails";
import { AddressDetails } from "./AddressDetails";
import { InvoiceDetails } from "./InvoiceDetails";
import { LineItems } from "./LineItems";
import { BalanceDetails } from "./BalanceDetails";
import { ExtraNotes } from "./ExtraNotes";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

const FROM = "from";
const TO = "to";

export function InvoiceForm() {
  const { handleSubmit } = useInvoiceFormContext();

  return (
    <form className="px-8" onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="grid grid-cols-2 gap-8">
        <>
          <InvoiceTitle />
          <CompanyLogo />
        </>
        <>
          <GeneralDetails title={FROM} />
          <GeneralDetails title={TO} />
        </>
        <>
          <AddressDetails id={FROM} />
          <AddressDetails id={TO} />
        </>
      </div>

      <div className="divider" />

      <div className="grid grid-cols-2 gap-8">
        <InvoiceDetails />
      </div>

      <LineItems />
      <BalanceDetails />
      <ExtraNotes />

      <div className="py-8">
        <button type="submit" className="btn">
          Preview PDF
        </button>
      </div>
    </form>
  );
}

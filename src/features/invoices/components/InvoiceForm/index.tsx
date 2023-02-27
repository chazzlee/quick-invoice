import Link from "next/link";
import { InvoiceTitle } from "./InvoiceTitle";
import { CompanyLogo } from "./CompanyLogo";
import { GeneralDetails } from "./GeneralDetails";
import { AddressDetails } from "./AddressDetails";
import { InvoiceDetails } from "./InvoiceDetails";
import { LineItems } from "./LineItems";
import { BalanceDetails } from "./BalanceDetails";
import { ExtraNotes } from "./ExtraNotes";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useRouter } from "next/router";

const FROM = "from";
const TO = "to";

export function InvoiceForm() {
  const { handleSubmit } = useInvoiceFormContext();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        window?.sessionStorage.setItem("invoice", JSON.stringify(data));
        router.push("/preview");
      })}
    >
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

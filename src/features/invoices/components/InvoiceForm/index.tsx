import { FormProvider, useForm } from "react-hook-form";
import { defaultInvoice } from "@/features/invoices/defaults";
import type { InvoiceFormData } from "@/features/invoices/types";
import { InvoiceTitle } from "./InvoiceTitle";
import { CompanyLogo } from "./CompanyLogo";
import { GeneralDetails } from "./GeneralDetails";
import { AddressDetails } from "./AddressDetails";
import { InvoiceDetails } from "./InvoiceDetails";
import { LineItems } from "./LineItems";
import { BalanceDetails } from "./BalanceDetails";

const FROM = "from";
const TO = "to";

export function InvoiceForm() {
  const methods = useForm<InvoiceFormData>({ defaultValues: defaultInvoice });

  return (
    <FormProvider {...methods}>
      <form className="px-8">
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
      </form>
    </FormProvider>
  );
}

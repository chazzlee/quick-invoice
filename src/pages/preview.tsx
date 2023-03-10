import Head from "next/head";
import Link from "next/link";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

function Header({
  companyName,
  title,
  logo,
}: {
  companyName: string;
  title: string;
  logo: any;
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {logo ? (
          <Image
            src={URL.createObjectURL(logo.item(0))}
            alt="company logo"
            height={50}
            width={50}
            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
          />
        ) : (
          <div style={{ width: 50, height: 50, backgroundColor: "darkblue" }} />
        )}
        <h2 className="text-3xl">{companyName}</h2>
      </div>
      <div>
        <h1 className="text-3xl font-semibold uppercase">{title}</h1>
      </div>
    </header>
  );
}

function From({
  address,
  phone,
  email,
  invoiceDetails,
}: {
  address: { street: string; city: string; state: string; zipCode: string }; //TODO:
  phone: string;
  email: string;
  invoiceDetails: { date: string; number: string; dueDate: string }; //TODO:
}) {
  return (
    <div className="flex justify-between">
      <div>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="text-end">
          <div>Date:</div>
          <div>Invoice #:</div>
          <div>Due Date:</div>
        </div>
        <div className="text-end">
          <div>{invoiceDetails.date}</div>
          <div>{invoiceDetails.number}</div>
          <div>{invoiceDetails.dueDate}</div>
        </div>
      </div>
    </div>
  );
}

function To({
  name,
  address,
  phone,
  email,
}: {
  name: string;
  address: { street: string; city: string; state: string; zipCode: string }; //TODO:
  phone: string;
  email: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-20">
      <div>
        <h3 className="pl-2 text-white bg-blue-900">Bill to</h3>
        <p>{name}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <div>
        <h3 className="pl-2 text-white bg-blue-900">Ship to</h3>
        <p>{name}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

function LineItemsTable({ lineItems }: { lineItems: any[] }) {
  return (
    <table className="table w-full table-fixed table-compact table-zebra ">
      <thead>
        <tr>
          <th className="w-7/12">Description</th>
          <th className="w-2/12">Unit Price</th>
          <th className="w-1/12">Qty</th>
          <th className="w-2/12">Amount</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 14 }).map((_item, index) => (
          <tr key={index} className="h-9">
            <td className="border-r">
              <p>{lineItems[index]?.description}</p>
              <p className="pt-2 pl-8 text-xs">{lineItems[index]?.details}</p>
            </td>
            <td className="border-r">{lineItems[index]?.rate}</td>
            <td className="border-r">{lineItems[index]?.quantity}</td>
            <td>{lineItems[index]?.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ExtraNotes({ notes }: { notes: string }) {
  return (
    <div className="w-7/12 pb-8 border">
      <h3 className="pl-2 text-white bg-blue-900">Comments</h3>
      <div className="px-2 text-sm">
        <p>{notes}</p>
        <p>1. payment due in 30 days</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, ipsum
          provident molestiae accusamus dolorem tempora!
        </p>
      </div>
    </div>
  );
}

function Balance({ balance }: { balance: any }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="text-end">
        <div>Subtotal:</div>
        <div>Discount:</div>
        <div>Tax:</div>
        <div>Total:</div>
        <div>Balance Due:</div>
      </div>
      <div className="text-end">
        <div>{formatCurrency(balance.subtotal)}</div>
        <div>-{formatCurrency(balance.totalDiscount)}</div>
        <div>{formatCurrency(balance.totalTax)}</div>
        <div>{formatCurrency(balance.total)}</div>
        <div>{formatCurrency(balance.balanceDue)}</div>
      </div>
    </div>
  );
}

export default function Preview() {
  const { getValues } = useInvoiceFormContext();
  const values = getValues();

  return (
    <>
      <Head>
        <title>Invoice Preview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-16 pt-8 mx-auto">
        <div className="mb-4">
          <Link className="btn" href="/">
            Go back
          </Link>
        </div>
        <section className="grid grid-cols-[3fr_1fr] gap-8 pb-4">
          <article className="px-8 pt-12 pb-32 mb-20 bg-white border-t-4 border-b-4 border-gray-600">
            <div className="pb-4">
              <Header
                title={values.title}
                companyName={values.from.name}
                logo={values.logo}
              />
            </div>
            <div className="pb-12">
              <From
                address={values.from.address}
                phone={values.from.phone}
                email={values.from.email}
                invoiceDetails={{
                  date: values.invoice.date,
                  number: values.invoice.number,
                  dueDate: values.invoice.terms.dueDate,
                }}
              />
            </div>
            <div className="pb-12">
              <To
                name={values.to.name}
                address={values.to.address}
                phone={values.to.phone}
                email={values.to.email}
              />
            </div>

            <div className="pb-4">
              <LineItemsTable lineItems={values.lineItems} />
            </div>

            <div className="flex gap-4">
              <ExtraNotes notes={values.invoice.notes} />

              <Balance balance={values.balance} />
            </div>
          </article>
          <aside>
            <button className="btn">Generate PDF</button>
          </aside>
        </section>
      </main>
    </>
  );
}

import { useFieldArray, useForm } from "react-hook-form";
import { FormControl } from "@/components/FormControl";
import { Address, GeneralDetails } from "@/components/GeneralDetails";
type Nullable<T> = T | null;

function isKey<T extends {}>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

type InvoiceDetails = {
  number: string;
  date: Nullable<Date>;
  terms: string;
};
type GeneralDetails = {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};
type LineItem = {
  description: string;
  details: string;
  rate: string;
  quantity: number;
  amount: string;
};

type InvoiceFormData = {
  title: string;
  logo: Nullable<FileList>;
  from: GeneralDetails;
  to: GeneralDetails;
  invoice: InvoiceDetails;
  lineItems: LineItem[];
  notes: string;
};

const defaultGeneralDetails: GeneralDetails = {
  name: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

const defaultLineItem = {
  description: "",
  details: "",
  rate: "",
  quantity: 0,
  amount: "",
};

export default function Form() {
  const { register, control, handleSubmit } = useForm<InvoiceFormData>({
    defaultValues: {
      title: "Invoice",
      logo: null,
      from: defaultGeneralDetails,
      to: defaultGeneralDetails,
      invoice: {
        number: "INV0001",
        date: null,
        terms: "on_receipt",
      },
      lineItems: [
        { description: "", details: "", rate: "", quantity: 0, amount: "" },
      ],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-[3fr_1fr] pt-16 gap-8">
        <article className="pt-8 mb-20 bg-white border-t-4 border-b-4 border-gray-600">
          <form
            className="px-8"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="from">
                <FormControl
                  id="title"
                  label="Invoice title"
                  inputSize="md"
                  {...register("title")}
                />
                <GeneralDetails title="From">
                  {Object.keys(defaultGeneralDetails).map((detail) => {
                    if (
                      isKey(defaultGeneralDetails, detail) &&
                      detail !== "address"
                    ) {
                      return (
                        <FormControl
                          key={`from-${detail}`}
                          id={detail}
                          label={detail}
                          {...register(`from.${detail}`)}
                        />
                      );
                    }
                    return null;
                  })}
                </GeneralDetails>
                <Address>
                  <FormControl
                    id="from-street"
                    label="Street"
                    {...register("from.address.street")}
                  />
                  <FormControl
                    id="from-city"
                    label="City"
                    {...register("from.address.city")}
                  />
                  <div className="flex">
                    <FormControl id="from-state" label="State" name="">
                      <select
                        className="w-1/2 select select-bordered select-md"
                        {...register("from.address.state")}
                      >
                        <option disabled>Choose state</option>
                        <option value="NJ">NJ</option>
                        <option value="NY">NY</option>
                      </select>
                    </FormControl>
                    <FormControl
                      id="from-zipCode"
                      label="Zip code"
                      classes={["w-1/2"]}
                      {...register("from.address.zipCode")}
                    />
                  </div>
                </Address>
              </div>

              <div className="to">
                <div className="pt-8">
                  <input
                    id="logo"
                    type="file"
                    className={"file-input file-input-bordered"}
                    {...register("logo")}
                  />
                </div>
                <GeneralDetails title="To">
                  {Object.keys(defaultGeneralDetails).map((detail) => {
                    if (
                      isKey(defaultGeneralDetails, detail) &&
                      detail !== "address"
                    ) {
                      return (
                        <FormControl
                          key={`to-${detail}`}
                          id={detail}
                          label={detail}
                          {...register(`to.${detail}`)}
                        />
                      );
                    }
                    return null;
                  })}
                </GeneralDetails>
                <Address>
                  <FormControl
                    id="to-street"
                    label="Street"
                    {...register("to.address.street")}
                  />
                  <FormControl
                    id="to-city"
                    label="City"
                    {...register("to.address.city")}
                  />
                  <div className="flex">
                    <FormControl id="to-state" label="State" name="">
                      <select
                        className="w-1/2 select select-bordered select-md"
                        {...register("to.address.state")}
                      >
                        <option disabled>Choose state</option>
                        <option value="NJ">NJ</option>
                        <option value="NY">NY</option>
                      </select>
                    </FormControl>
                    <FormControl
                      id="to-zipCode"
                      label="Zip code"
                      classes={["w-1/2"]}
                      {...register("to.address.zipCode")}
                    />
                  </div>
                </Address>
              </div>
            </div>

            <div className="invoice-details">
              <div className="divider" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <FormControl
                    id="invoice-number"
                    label="Number"
                    {...register("invoice.number")}
                  />
                  <FormControl
                    id="invoice-date"
                    type="date"
                    label="Date"
                    {...register("invoice.date")}
                  />

                  <div className="form-control">
                    <label htmlFor="invoice-terms" className="label">
                      <span className="capitalize label-text-alt">Terms</span>
                    </label>
                    <select
                      className="w-full max-w-xs select select-bordered select-md"
                      {...register("invoice.terms")}
                    >
                      <option disabled>Choose terms</option>
                      <option value="on_receipt">On Receipt</option>
                      <option value="30_days">30 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 line-items-container">
              <div className="flex gap-4 py-2 pl-8 border-t border-b border-gray">
                <label className="w-6/12 pl-4" htmlFor="description">
                  Description
                </label>
                <label className="w-2/12 pl-2" htmlFor="rate">
                  Rate
                </label>
                <label className="w-2/12 pl-2" htmlFor="quantity">
                  Qty
                </label>
                <label className="w-2/12" htmlFor="amount">
                  Amount
                </label>
              </div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative flex gap-4 py-2 pl-8 border-b border-gray-300"
                >
                  <div className="absolute left-0">
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        if (fields.length === 1) return;
                        remove(index);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="w-6/12 ml-4">
                    <input
                      id="description"
                      className="w-full input input-sm input-bordered"
                      placeholder="Item description"
                      {...register(`lineItems.${index}.description`)}
                    />
                    <textarea
                      className="w-full h-24 px-3 mt-2 resize-none textarea textarea-bordered"
                      placeholder="Additional details"
                    />
                  </div>
                  <input
                    className="w-2/12 input input-sm input-bordered"
                    {...register(`lineItems.${index}.rate`)}
                  />
                  <input
                    className="w-2/12 input input-sm input-bordered"
                    {...register(`lineItems.${index}.quantity`)}
                  />
                  <input
                    className="w-2/12 pl-0 input input-sm"
                    {...register(`lineItems.${index}.amount`)}
                  />
                </div>
              ))}
            </div>
            <div className="pb-4 border-b border-gray-300">
              <button
                className="text-white bg-black btn btn-sm btn-square"
                onClick={() => append(defaultLineItem)}
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div />
              <div>
                <div className="flex justify-between w-1/2 text-right">
                  <p>Subtotal</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between w-1/2 text-right">
                  <p>Total</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between w-1/2">
                  <p>Balance Due</p>
                  <p>$0.00</p>
                </div>
              </div>
            </div>

            <div className="py-8">
              <button type="submit" className="btn">
                Generate PDF
              </button>
            </div>
          </form>
        </article>
        <aside>
          <div>
            <h3>Color</h3>
          </div>
          <div>
            <h3>Tax</h3>
          </div>
        </aside>
      </section>
    </main>
  );
}

import {
  type Control,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import Money, { type Dinero } from "dinero.js";

import {
  FormControl,
  FileInput,
  SelectInput,
  TextInput,
  Textarea,
} from "@/components/Inputs";
import { Address, GeneralDetails } from "@/components/GeneralDetails";
import { isKeyOf } from "@/utils/isKey";
import type { Nullable } from "@/utils/types";
import { useEffect, useMemo } from "react";
import { states } from "@/utils/states";
import { SelectOption } from "@/components/Inputs/SelectInput";

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
  rate: number;
  quantity: number;
  amount: Dinero;
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
  rate: Money({ amount: 0, precision: 2 }).toUnit(),
  quantity: 1,
  amount: Money({ amount: 0, precision: 2 }),
};

//rate .toFormat("0,0.00")
//amount .toFormat("$0,0.00")

export default function Form() {
  const { register, control, setValue, handleSubmit } =
    useForm<InvoiceFormData>({
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
        lineItems: [defaultLineItem],
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
                <FormControl id="title" label="Invoice title">
                  <TextInput {...register("title")} />
                </FormControl>
                <GeneralDetails title="From">
                  {Object.keys(defaultGeneralDetails).map((detail) => {
                    if (
                      isKeyOf(defaultGeneralDetails, detail) &&
                      detail !== "address"
                    ) {
                      return (
                        <FormControl
                          key={`from-${detail}`}
                          id={`from-${detail}`}
                          label={detail}
                        >
                          <TextInput
                            {...register(`from.${detail}`)}
                            type={detail === "email" ? "email" : "text"}
                          />
                        </FormControl>
                      );
                    }
                    return null;
                  })}
                </GeneralDetails>
                <Address>
                  <FormControl id="from-street" label="Street">
                    <TextInput {...register("from.address.street")} />
                  </FormControl>
                  <FormControl id="from-city" label="City">
                    <TextInput {...register("from.address.city")} />
                  </FormControl>
                  <div className="flex">
                    <FormControl id="from-state" label="State">
                      <SelectInput
                        selectOptions={states}
                        defaultLabel="Choose state"
                        {...register("from.address.state")}
                      />
                    </FormControl>
                    <FormControl id="from-zipCode" label="Zip code">
                      <TextInput
                        width="w-1/2"
                        {...register("from.address.zipCode")}
                      />
                    </FormControl>
                  </div>
                </Address>
              </div>

              <div className="to">
                <FormControl id="logo" label="Company logo">
                  <FileInput {...register("logo")} />
                </FormControl>
                <GeneralDetails title="To">
                  {Object.keys(defaultGeneralDetails).map((detail) => {
                    if (
                      isKeyOf(defaultGeneralDetails, detail) &&
                      detail !== "address"
                    ) {
                      return (
                        <FormControl
                          key={`to-${detail}`}
                          id={`to-${detail}`}
                          label={detail}
                        >
                          <TextInput
                            {...register(`to.${detail}`)}
                            type={detail === "email" ? "email" : "text"}
                          />
                        </FormControl>
                      );
                    }
                    return null;
                  })}
                </GeneralDetails>
                <Address>
                  <FormControl id="to-street" label="Street">
                    <TextInput {...register("to.address.street")} />
                  </FormControl>
                  <FormControl id="to-city" label="City">
                    <TextInput {...register("to.address.city")} />
                  </FormControl>
                  <div className="flex">
                    <FormControl id="to-state" label="State">
                      <SelectInput
                        defaultLabel="Choose state"
                        selectOptions={states}
                        {...register("to.address.state")}
                      />
                    </FormControl>
                    <FormControl id="to-zipCode" label="Zip code">
                      <TextInput
                        width="w-1/2"
                        {...register("to.address.zipCode")}
                      />
                    </FormControl>
                  </div>
                </Address>
              </div>
            </div>

            <div className="invoice-details">
              <div className="divider" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <FormControl id="invoice-number" label="Number">
                    <TextInput width="w-1/2" {...register("invoice.number")} />
                  </FormControl>
                  <FormControl id="invoice-date" label="Date">
                    <TextInput
                      type="date"
                      width="w-1/2"
                      {...register("invoice.date")}
                    />
                  </FormControl>
                  <FormControl id="invoice-terms" label="Terms">
                    <SelectInput
                      defaultLabel="Choose terms"
                      selectOptions={[
                        { value: "on_receipt", label: "On receipt" },
                        { value: "30_days", label: "30 days" },
                        { value: "60_days", label: "60 days" },
                      ]}
                      {...register("invoice.terms")}
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="my-4 line-items-container">
              <div className="flex gap-4 py-2 pl-8 border-t border-b border-gray-400">
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
                      type="button"
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
                    <TextInput
                      id={`description-${index}`}
                      placeholder="Item description"
                      inputSize="sm"
                      {...register(`lineItems.${index}.description`)}
                    />
                    <Textarea
                      id={`details-${index}`}
                      placeholder="Additional details"
                      {...register(`lineItems.${index}.details`)}
                    />
                  </div>
                  <TextInput
                    id={`rate-${index}`}
                    inputSize="sm"
                    width="w-2/12"
                    type="number"
                    {...register(`lineItems.${index}.rate`)}
                  />
                  <TextInput
                    id={`quantity-${index}`}
                    inputSize="sm"
                    width="w-2/12"
                    {...register(`lineItems.${index}.quantity`)}
                  />
                  <Amount control={control} index={index} />
                  {/* <TextInput
                    id={`amount-${index}`}
                    inputSize="sm"
                    width="w-2/12"
                    {...register(`lineItems.${index}.amount`)}
                  /> */}
                </div>
              ))}
            </div>
            <div className="pb-4 border-b border-gray-300">
              <button
                type="button"
                className="text-white bg-black btn btn-sm btn-square"
                onClick={() => append(defaultLineItem)}
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="col-start-2">
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

            <div className="notes-container">
              <FormControl id="notes" label="Notes">
                <Textarea
                  placeholder="Notes - additional terms and conditions"
                  {...register("notes")}
                />
              </FormControl>
            </div>

            <div className="py-8">
              <button type="submit" className="btn">
                Preview PDF
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

function Amount({
  control,
  index,
}: {
  control: Control<InvoiceFormData, any>;
  index: number;
}) {
  const lineItems = useWatch({ control, name: "lineItems" });

  // TODO:ERROR
  const calculateAmount = useMemo(() => {
    const lineItem = lineItems[index];
    const quantity = lineItem.quantity;
    const rate =
      typeof lineItem.rate === "string"
        ? parseInt(lineItem.rate, 10)
        : lineItem.rate;
    const parsedRate = Money({ amount: rate, precision: 2 });

    return parsedRate.multiply(quantity).toFormat("$0,0.00");
  }, [index, lineItems]);

  return <p>{calculateAmount}</p>;
}

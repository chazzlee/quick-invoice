import Image from "next/image";
import {
  type Control,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
// import Money, { type Dinero } from "dinero.js";

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
import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { states } from "@/utils/states";
import { formatCurrency } from "@/utils/formatCurrency";

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
  amount: number;
  taxable: boolean;
};

type InvoiceFormData = {
  title: string;
  logo: Nullable<FileList>;
  from: GeneralDetails;
  to: GeneralDetails;
  invoice: InvoiceDetails;
  lineItems: LineItem[];
  notes: string;
  subtotal: number;
  totalTax: number;
  total: number;
  tax: {
    type: "on_total" | "none" | "deducted" | "per_item";
    rate: number;
  };
  balanceDue: number;
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

const defaultLineItem: LineItem = {
  description: "",
  details: "",
  rate: 0,
  quantity: 1,
  amount: 0,
  taxable: false,
};

//rate .toFormat("0,0.00")
//amount .toFormat("$0,0.00")

const SAMPLE_TAX_RATE = 0.07;
export default function Form() {
  const { register, control, watch, getValues, setValue, handleSubmit } =
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
        subtotal: 0,
        total: 0,
        totalTax: 0,
        tax: { type: "none", rate: 0 },
        balanceDue: 0,
      },
    });

  const companyLogo = watch("logo");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const SAMPLE_PAID = 0;

  // TODO:
  const taxRate = watch("tax.rate");
  const isTaxable = watch("tax.type") !== "none";
  const setTaxable = useCallback(
    (index: number) => {
      if (!isTaxable) {
        setValue(`lineItems.${index}.taxable`, false);
      } else {
        setValue(`lineItems.${index}.taxable`, true);
      }
    },
    [setValue, isTaxable]
  );

  const updateTotals = useCallback(() => {
    const lineItems = getValues("lineItems");
    const subtotal = lineItems.reduce((acc, prev) => acc + prev.amount, 0);
    const totalTax = subtotal * (taxRate / 100); //TODO:
    const total = totalTax + subtotal;
    const balanceDue = total - SAMPLE_PAID; //TODO:

    setValue("subtotal", subtotal);
    setValue("totalTax", totalTax);
    setValue("total", total);
    setValue("balanceDue", balanceDue);
  }, [getValues, setValue, taxRate]);

  const setAmount = useCallback(
    (index: number, amount: number) => {
      setValue(`lineItems.${index}.amount`, amount);
      updateTotals();
    },
    [setValue, updateTotals]
  );

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

              <div className="relative to">
                <FormControl id="logo" label="Company logo">
                  <FileInput {...register("logo")} />
                </FormControl>
                <div className="absolute w-1/2 mt-6 border h-28 logo-preview">
                  {companyLogo?.[0] && (
                    <Image
                      src={URL.createObjectURL(companyLogo?.[0])}
                      alt="Company logo"
                      className="object-contain w-full h-full"
                      width={80}
                      height={80}
                      onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                    />
                  )}
                </div>
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
                <label
                  className={`${isTaxable ? "w-5/12" : "w-6/12"} pl-4`}
                  htmlFor="description"
                >
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
                {isTaxable ? (
                  <label className="w-1/12" htmlFor="tax">
                    Tax
                  </label>
                ) : null}
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
                  <div className={`${isTaxable ? "w-5/12" : "w-6/12"} ml-4`}>
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
                    type="number"
                    min={0}
                    inputSize="sm"
                    width="w-2/12"
                    {...register(`lineItems.${index}.rate`, {
                      valueAsNumber: true,
                    })}
                  />
                  <TextInput
                    id={`quantity-${index}`}
                    type="number"
                    min={0}
                    inputSize="sm"
                    width="w-2/12"
                    {...register(`lineItems.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                  <Amount
                    control={control}
                    index={index}
                    setAmount={setAmount}
                    amount={watch(`lineItems.${index}.amount`)}
                  />

                  {isTaxable ? (
                    <div className="w-1/12">
                      <Taxable
                        setTaxable={setTaxable}
                        index={index}
                        {...register(`lineItems.${index}.taxable`)}
                      />
                    </div>
                  ) : null}
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
                <div className="flex justify-between w-1/2">
                  <p>Subtotal</p>
                  <p>{formatCurrency(getValues("subtotal"))}</p>
                </div>
                {watch("tax.type") !== "none" ? (
                  <div className="flex justify-between w-1/2">
                    <p>Tax ({taxRate}%)</p>
                    <p>{formatCurrency(getValues("totalTax"))}</p>
                  </div>
                ) : null}
                <div className="flex justify-between w-1/2">
                  <p>Total</p>
                  <p>{formatCurrency(getValues("total"))}</p>
                </div>
                <div className="flex justify-between w-1/2">
                  <p className="font-semibold">Balance Due</p>
                  <p>{formatCurrency(getValues("balanceDue"))}</p>
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

          <div className="tax-container">
            <h3 className="font-semibold">Tax</h3>
            <FormControl id="tax-type" label="Type">
              <SelectInput
                selectOptions={[
                  { label: "On total", value: "on_total" },
                  { label: "Deducted", value: "deducted" },
                  { label: "Per item", value: "per_item" },
                  { label: "None", value: "none" },
                ]}
                {...register("tax.type")}
              />
            </FormControl>
            {isTaxable ? (
              <FormControl id="tax-rate" label="Rate">
                <TextInput
                  type="number"
                  {...register("tax.rate", { valueAsNumber: true })}
                />
              </FormControl>
            ) : null}
          </div>
        </aside>
      </section>
    </main>
  );
}

function Amount({
  control,
  index,
  setAmount,
  amount,
}: {
  control: Control<InvoiceFormData, any>;
  index: number;
  amount: number;
  setAmount(index: number, amount: number): void;
}) {
  const quantity = useWatch({
    control,
    name: `lineItems.${index}.quantity`,
    defaultValue: 1,
  });

  const rate = useWatch({
    control,
    name: `lineItems.${index}.rate`,
    defaultValue: 0,
  });

  useEffect(() => {
    setAmount(index, quantity * rate);
  }, [index, quantity, rate, setAmount]);

  //TODO: styles
  return <p className="w-2/12">{formatCurrency(amount)}</p>;
}

type TaxableProps = ComponentPropsWithRef<"input"> & {
  index: number;
  setTaxable(index: number): void;
};

// TODO: BUG: when tax type === 'none', line item taxable should be false. still true
//FIXME:!!!!
// eslint-disable-next-line react/display-name
const Taxable = forwardRef<HTMLInputElement, TaxableProps>(
  ({ index, setTaxable, ...rest }, ref) => {
    useEffect(() => {
      setTaxable(index);
    }, [setTaxable, index]);

    return <input ref={ref} type="checkbox" className="checkbox" {...rest} />;
  }
);

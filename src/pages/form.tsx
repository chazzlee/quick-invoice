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
import { ChangeEvent, useCallback, useEffect } from "react";
import { states } from "@/utils/states";
import { formatCurrency } from "@/utils/formatCurrency";

type InvoiceDetails = {
  number: string;
  date: Nullable<Date>;
  terms: {
    type: "on_receipt" | "30_days" | "60_days";
    dueDate: Nullable<Date>;
  };
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
  totalDiscount: number;
  tax: {
    type: "on_total" | "no_tax" | "deducted" | "per_item";
    rate: number;
  };
  balanceDue: number;
  discount: {
    type: "no_discount" | "percent" | "flat_amount";
    value: number;
  };
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

export default function Form() {
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    resetField,
  } = useForm<InvoiceFormData>({
    defaultValues: {
      title: "Invoice",
      logo: null,
      from: structuredClone(defaultGeneralDetails),
      to: structuredClone(defaultGeneralDetails),
      invoice: {
        number: "INV0001",
        date: null,
        terms: {
          type: "on_receipt",
          dueDate: null,
        },
      },
      tax: { type: "no_tax", rate: 0 },
      discount: {
        type: "no_discount",
        value: 0,
      },
      lineItems: [{ ...defaultLineItem }],
      notes: "",
      subtotal: 0,
      total: 0,
      totalTax: 0,
      totalDiscount: 0,
      balanceDue: 0,
    },
  });

  const companyLogo = watch("logo");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "lineItems",
  });

  const lineItems = watch("lineItems");
  const taxRate = watch("tax.rate");
  const taxType = watch("tax.type");
  const subtotal = watch("subtotal");
  const totalTax = watch("totalTax");
  const total = watch("total");
  const balanceDue = watch("balanceDue");
  const isTaxable = taxType !== "no_tax";

  console.log({ totalTax });

  const termsType = watch("invoice.terms.type");
  const hasDueDate = termsType !== "on_receipt";

  const discountType = watch("discount.type");
  const discountValue = watch("discount.value");
  const hasDiscount = discountType !== "no_discount";
  const isFlatDiscount = discountType === "flat_amount";
  const isPercentageDiscount = discountType === "percent";
  const totalDiscount = watch("totalDiscount");
  // TODO: update total discount, clear discount if discount === 'no_discount"

  const updateSubtotal = useCallback(() => {
    const subtotal = lineItems.reduce((acc, prev) => acc + prev.amount, 0);
    setValue("subtotal", subtotal);
  }, [setValue, lineItems]);

  const updateTotalTax = useCallback(() => {
    const taxableItems = lineItems.filter((lineItem) => lineItem.taxable);
    const totalTax = taxableItems.reduce(
      (acc, prev) => acc + prev.amount * (taxRate / 100),
      0
    );
    switch (taxType) {
      case "on_total": {
        setValue("totalTax", totalTax);
        break;
      }
      case "deducted": {
        setValue("totalTax", totalTax * -1);
        break;
      }
      case "per_item": {
        throw new Error("Not yet implemented");
        break;
      }
      case "no_tax": {
        setValue("totalTax", 0);
        break;
      }
      default:
        throw new Error("Invalid tax type");
    }
  }, [lineItems, taxType, setValue, taxRate]);

  const updateTotal = useCallback(() => {
    const total = subtotal + totalDiscount + totalTax;
    setValue("total", total);
  }, [setValue, subtotal, totalTax, totalDiscount]);

  const updateBalanceDue = useCallback(() => {
    // TODO; discounts etc
    setValue("balanceDue", total);
  }, [total, setValue]);

  const updateTotalDiscount = useCallback(() => {
    switch (discountType) {
      case "flat_amount": {
        const totalDiscount = discountValue * -1;
        setValue("totalDiscount", totalDiscount);
        break;
      }
      case "percent": {
        const discountAsPercentage = discountValue / 100;
        const totalDiscount = subtotal * discountAsPercentage * -1;
        setValue("totalDiscount", totalDiscount);
        break;
      }
      case "no_discount": {
        setValue("totalDiscount", 0);
        break;
      }
      default:
        throw new Error("Invalid discount type");
    }
  }, [discountType, discountValue, setValue, subtotal]);

  const updateAmount = useCallback(
    (index: number, amount: number) => {
      setValue(`lineItems.${index}.amount`, amount);
      updateSubtotal();
      updateTotalDiscount();
      updateTotalTax();
      updateTotal();
      updateBalanceDue();
    },
    [
      setValue,
      updateSubtotal,
      updateTotalDiscount,
      updateTotalTax,
      updateTotal,
      updateBalanceDue,
    ]
  );

  const onSelectTaxChange = (taxType: InvoiceFormData["tax"]["type"]) => {
    setValue("tax.type", taxType);
    if (taxType === "no_tax") {
      setValue(
        "lineItems",
        getValues("lineItems").map((lineItem) => ({
          ...lineItem,
          taxable: false,
        }))
      );
      resetField("tax.rate");
    }
    updateTotalTax();
  };

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
                <div className="invoice-details-container">
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
                      {...register("invoice.terms.type")}
                    />
                  </FormControl>
                  {hasDueDate ? (
                    <FormControl id="due-date" label="Due date">
                      <TextInput
                        type="date"
                        width="w-1/2"
                        {...register("invoice.terms.dueDate")}
                      />
                    </FormControl>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="my-4 line-items-container">
              <div className="flex items-center gap-4 py-2 border-t border-b border-gray-400">
                <button
                  type="button"
                  className="btn btn-square btn-sm"
                  onClick={() => replace([{ ...defaultLineItem }])}
                >
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
                        if (fields.length === 1) {
                          replace([{ ...defaultLineItem }]);
                        } else {
                          remove(index);
                        }
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
                    updateAmount={updateAmount}
                    amount={watch(`lineItems.${index}.amount`)}
                  />

                  {isTaxable ? (
                    <div className="w-1/12 mt-3">
                      <input
                        type="checkbox"
                        className="checkbox"
                        {...register(`lineItems.${index}.taxable`, {
                          onChange() {
                            updateTotalTax();
                          },
                        })}
                        defaultChecked={isTaxable}
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
                  <p>{formatCurrency(subtotal)}</p>
                </div>
                {hasDiscount ? (
                  <div className="flex justify-between w-1/2">
                    <p>
                      Discount {isPercentageDiscount && `(${discountValue}%)`}
                    </p>
                    <p>{formatCurrency(totalDiscount)}</p>
                  </div>
                ) : null}
                {isTaxable ? (
                  <div className="flex justify-between w-1/2">
                    <p>Tax ({taxRate}%)</p>
                    <p>{formatCurrency(totalTax)}</p>
                  </div>
                ) : null}
                <div className="flex justify-between w-1/2">
                  <p>Total</p>
                  <p>{formatCurrency(total)}</p>
                </div>
                <div className="flex justify-between w-1/2">
                  <p className="font-semibold">Balance Due</p>
                  <p className="font-semibold">{formatCurrency(balanceDue)}</p>
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

        {/* TODO: ASIDE */}
        <aside>
          <div className="color-container">
            <h3>Color</h3>
            <p>choose your color</p>
          </div>

          <div className="pt-8 tax-container">
            <h3 className="font-semibold">Tax</h3>
            <FormControl id="tax-type" label="Type">
              <SelectInput
                selectOptions={[
                  { label: "On total", value: "on_total" },
                  { label: "Deducted", value: "deducted" },
                  { label: "Per item", value: "per_item" },
                  { label: "None", value: "no_tax" },
                ]}
                {...register("tax.type", {
                  onChange(event: ChangeEvent<HTMLSelectElement>) {
                    onSelectTaxChange(
                      event.target.value as InvoiceFormData["tax"]["type"]
                    );
                  },
                })}
              />
            </FormControl>
            {isTaxable ? (
              <FormControl id="tax-rate" label="Rate">
                <TextInput
                  type="number"
                  min={0}
                  width="w-1/2"
                  {...register("tax.rate", { valueAsNumber: true })}
                />
              </FormControl>
            ) : null}
          </div>

          <div className="pt-8 discount-container">
            <h3 className="font-semibold">Discount</h3>
            <FormControl id="discount" label="Type">
              <SelectInput
                selectOptions={[
                  { label: "None", value: "no_discount" },
                  { label: "Percent", value: "percent" },
                  { label: "Flat amount", value: "flat_amount" },
                ]}
                {...register("discount.type")}
              />
            </FormControl>
            {isPercentageDiscount && (
              <FormControl id="percent" label="Percent">
                <TextInput
                  width="w-1/2"
                  type="number"
                  {...register("discount.value")}
                />
              </FormControl>
            )}
            {isFlatDiscount && (
              <FormControl id="flat-amount" label="Amount">
                <TextInput
                  width="w-1/2"
                  type="number"
                  {...register("discount.value", {
                    valueAsNumber: true,
                    onChange() {
                      updateTotalDiscount();
                    },
                  })}
                />
              </FormControl>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}

//TODO:
function Amount({
  control,
  index,
  updateAmount,
  amount,
}: {
  control: Control<InvoiceFormData, any>;
  index: number;
  amount: number;
  updateAmount(index: number, amount: number): void;
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
    updateAmount(index, quantity * rate);
  }, [index, quantity, rate, updateAmount]);

  //TODO: styles
  return <p className="w-2/12 mt-3">{formatCurrency(amount)}</p>;
}

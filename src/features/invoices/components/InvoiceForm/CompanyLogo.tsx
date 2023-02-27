import Image from "next/image";
import { FileInput, FormControl } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceFormValues";
import { ChangeEvent, useEffect, useRef } from "react";

export function CompanyLogo() {
  const { register, setValue } = useInvoiceFormContext();

  //TODO: just store image/file, not FileList
  //TODO: perserve image after preview and back
  const companyLogo = useInvoiceWatchOne("logo");

  return (
    <div className="image-preview">
      <FormControl id="logo" label="Company logo">
        <FileInput
          {...register("logo", {
            onChange(event: ChangeEvent<HTMLInputElement>) {},
          })}
          accept="image/*"
        />
      </FormControl>
      <div className="w-1/2 mt-8 bg-white border h-28 logo-preview">
        {companyLogo?.item?.(0) ? (
          <Image
            src={URL.createObjectURL(companyLogo?.item?.(0)!)}
            alt="Company logo"
            className="object-contain w-full h-full"
            width={80}
            height={80}
            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
          />
        ) : null}
      </div>
    </div>
  );
}

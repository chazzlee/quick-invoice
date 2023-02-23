import Image from "next/image";
import { FileInput, FormControl } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

export function CompanyLogo() {
  const { register, watch } = useInvoiceFormContext();
  const companyLogo = watch("logo");

  return (
    <div className="image-preview">
      <FormControl id="logo" label="Company logo">
        <FileInput {...register("logo")} />
      </FormControl>
      <div className="w-1/2 mt-8 bg-white border h-28 logo-preview">
        {companyLogo?.[0] ? (
          <Image
            src={URL.createObjectURL(companyLogo?.[0])}
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

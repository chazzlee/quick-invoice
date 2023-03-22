import Image from "next/image";
import { FileInput, FormControl } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceWatchOne";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";

function ImageDropzone({ hasImage }: { hasImage: boolean }) {
  const { control, setValue, resetField } = useInvoiceFormContext();

  return (
    <Controller
      control={control}
      name="logo"
      render={({ field: { name, onChange, onBlur }, fieldState }) => (
        <Dropzone
          noClick={true}
          accept={{ "image/*": [] }}
          onDrop={(acceptedFiles: File[]) => {
            console.log(acceptedFiles[0]);
            setValue(name, acceptedFiles[0]);
          }}
        >
          {({
            getRootProps,
            getInputProps,
            open,
            isDragActive,
            acceptedFiles,
          }) => (
            <div {...getRootProps()}>
              <input
                {...getInputProps({
                  id: name,
                  onChange,
                  onBlur,
                })}
              />
              <>
                <button type="button" className="btn btn-sm" onClick={open}>
                  {hasImage ? "Replace image" : "Choose a file"}
                </button>
                {hasImage ? (
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => resetField("logo")}
                  >
                    Reset
                  </button>
                ) : null}
              </>
            </div>
          )}
        </Dropzone>
      )}
    />
  );
}

export function CompanyLogo() {
  const { register, setValue, watch } = useInvoiceFormContext();

  const companyLogo = useInvoiceWatchOne("logo");

  return (
    <div className="w-1/2 mt-8 bg-white border h-28">
      {companyLogo && companyLogo instanceof File ? (
        <>
          <Image
            src={URL.createObjectURL(companyLogo)}
            alt="Company logo"
            className="object-contain w-full h-full"
            width={80}
            height={80}
            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
          />
          <ImageDropzone hasImage={!!companyLogo} />
        </>
      ) : (
        <ImageDropzone hasImage={!!companyLogo} />
      )}
      {/* <FormControl id="logo" label="Company logo">
        <FileInput {...register("logo")} accept="image/*" />
      </FormControl> */}
      {/* <div className="w-1/2 mt-8 bg-white border h-28 logo-preview">
        {companyLogo && companyLogo instanceof File ? (
          <Image
            src={URL.createObjectURL(companyLogo)}
            alt="Company logo"
            className="object-contain w-full h-full"
            width={80}
            height={80}
            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
          />
        ) : null}
      </div> */}
    </div>
  );
}

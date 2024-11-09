"use client";

import Image from "next/image";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldTypes } from "./forms/patient-form";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { fieldType, iconAlt, iconSrc, placeholder } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

      break;

    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="KE"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value }
            onChange={(value) => field.onChange(value)}

            className="input-phone"
          />
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField: React.FC<CustomFormFieldProps> = (
  props: CustomFormFieldProps
) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    timeFormat,
    children,
    renderSkeleton,
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        // <FormItem className="flex-1">
        //   {fieldType === FormFieldTypes.CHECKBOX && label && (
        //     <FormLabel>{label}</FormLabel>
        //   )}

        //   <RenderField field={field} props={props} />

        //   <FormMessage className="shad-error" />
        // </FormItem>
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

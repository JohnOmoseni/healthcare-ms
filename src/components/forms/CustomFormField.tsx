/* eslint-disable no-unused-vars */
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormikErrors, FormikTouched } from "formik";
import { FocusEventHandler, KeyboardEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  name: string;
  field?: {
    value: any;
    type?: string;
    placeholder?: string;
  };
  fieldType: FormFieldType;
  label?: string;
  iconSrc?: string;
  dir?: "left" | "right";
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  renderSkeleton?: (field: any) => React.ReactNode;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: any;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const RenderInput = ({ props }: { props: CustomProps }) => {
  const { field, fieldType, iconSrc, disabled, label, name, onBlur, onChange } =
    props;
  const placeholder = field?.placeholder ?? "";

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt=""
              className="ml-2"
            />
          )}
          <Input
            placeholder={placeholder}
            name={name}
            {...field}
            value={field?.value as string}
            onChange={onChange}
            onBlur={onBlur}
            className="i-reset shad-input"
          />
        </>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          name={name}
          {...field}
          value={field?.value as string}
          onChange={onChange}
          onBlur={onBlur}
          className=""
          disabled={disabled}
        />
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          name="phone"
          id="phone"
          placeholder={placeholder}
          international
          withCountryCallingCode
          defaultCountry="NG"
          value={field?.value}
          onChange={onChange}
          className="input-phone"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="row-flex-start gap-2.5">
          <Checkbox
            id={name}
            name={name}
            checked={field?.value}
            onCheckedChange={onChange}
          />
          <Label
            htmlFor={name}
            className="mt-0.5 cursor-pointer leading-5 text-grey"
          >
            {label}
          </Label>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-input">
          <Image
            src="/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <ReactDatePicker
            showTimeSelect={props.showTimeSelect ?? false}
            name={name}
            selected={field?.value}
            onChange={(date: Date | null) => onChange(date)}
            timeInputLabel="Time:"
            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
            wrapperClassName="date-picker"
          />
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <div>
          <Select
            onValueChange={onChange}
            defaultValue={field?.value as string}
          >
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { name, label, fieldType, errors, touched } = props;

  const result = [FormFieldType.INPUT, FormFieldType.TEXTAREA].includes(
    fieldType,
  ) ? (
    <div
      className={cn(
        "row-flex-start relative w-full gap-0.5 overflow-hidden rounded-md border border-border bg-input shadow-sm",
        errors?.[name] && touched?.[name] && "!border-red-400",
      )}
    >
      <RenderInput props={props} />
    </div>
  ) : (
    <>
      <RenderInput props={props} />
    </>
  );

  return (
    <div
      className={cn(
        "group w-full",
        errors?.[name] || (errors?.[name] && touched?.[name]) ? "is-error" : "",
      )}
    >
      {fieldType !== FormFieldType.CHECKBOX && label && (
        <Label className="mb-2 inline-flex text-base">{label}</Label>
      )}

      {result}
      <p className="invisible ml-[1px] mt-1.5 block text-sm font-medium text-red-400 transition-sm group-[.is-error]:visible group-[.is-error]:animate-in">
        {errors?.[name] as string}
      </p>
    </div>
  );
};

export default CustomFormField;

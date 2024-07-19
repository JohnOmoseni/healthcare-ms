"use client";

import { handleApiError, toastNotify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "../ui/use-toast";
import { InferType } from "yup";
import { getAppointmentSchema, UserFormValidation } from "@/schema";

import FormWrapper from "./FormWrapper";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { createUser } from "@/server/actions/patient.actions";
import "react-phone-number-input/style.css";
import { Value } from "react-phone-number-input";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const initialValues = { name: "", email: "", phone: "" };

  const onSubmit = async (
    values: InferType<typeof UserFormValidation>,
    actions: any,
  ) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      toastNotify(toast, "Error creating patient");
      handleApiError(error);
    } finally {
      actions.resetForm();
      setIsLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: UserFormValidation,
    onSubmit,
  });

  return (
    <FormWrapper
      title="Hi there 👋"
      subtitle="Get started with appointments."
      buttonLabel="Get Started"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        field={{ value: values.name, placeholder: "John Doe" }}
        iconSrc="/icons/user.svg"
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email"
        field={{
          value: values.email,
          placeholder: "johndoe@gmail.com",
          type: "email",
        }}
        iconSrc="/icons/email.svg"
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone number"
        field={{ value: values.phone, placeholder: "(555) 123-4567" }}
        onChange={(value: Value) => {
          setFieldValue("phone", value);
        }}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
    </FormWrapper>
  );
};

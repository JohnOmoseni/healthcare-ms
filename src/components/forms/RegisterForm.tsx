"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { useFormik } from "formik";
import { InferType } from "yup";
import { PatientFormValidation } from "@/schema";
import { Label } from "../ui/label";
import { FileUploader } from "@/app/patients/_sections/FileUploader";
import { registerPatient } from "@/server/actions/patient.actions";
import { Gender, RegisterUserParams, User } from "@/types";
import { useToast } from "../ui/use-toast";
import { Value } from "react-phone-number-input";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toastNotify } from "@/lib/utils";
import { useUploadThing } from "@/utils/uploadthing";

import { v4 as uuid } from "uuid";
import FormWrapper from "./FormWrapper";
import CustomFormField, { FormFieldType } from "./CustomFormField";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (values: InferType<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let fileUrl;
    const file = values.identificationDocument;

    console.log(values);

    // upload image to uploadthing
    if (file) {
      const uploadedFile = await startUpload([file] as File[]);
      if (!uploadedFile) return;

      console.log(uploadedFile);

      fileUrl = uploadedFile?.[0].url;
    }

    try {
      const patient = {
        ...values,
        identificationDocument: "",
        userid: user.$id,
        birthDate: new Date(values.birthDate as Date),
        gender: values.gender as Gender,
        identificationDocumentId: fileUrl ? uuid() : "",
        identificationDocumentUrl: fileUrl?.toString(),
      };

      console.log(patient);

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
      toastNotify(toast, "Error registering user", "");
    }

    setIsLoading(false);
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
    initialValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    validationSchema: PatientFormValidation,
    onSubmit,
  });

  return (
    <FormWrapper
      title="Welcome 👋"
      subtitle="Let us know more about yourself."
      buttonLabel="Get Started"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
      <div className="mb-6">
        <h3 className="sub-header">Personal Information</h3>
      </div>

      {/* NAME */}
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        field={{ value: values.name, placeholder: "John Doe" }}
        iconSrc="/icons/user.svg"
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched}
        errors={errors}
      />

      {/* EMAIL & PHONE */}
      <div className="flex-column lg:row-flex w-full gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email Address"
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
      </div>

      {/* BirthDate & Gender */}
      <div className="flex-column lg:row-flex w-full gap-6">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          name="birthDate"
          label="Date of birth"
          field={{ value: values.birthDate?.toString() }}
          onChange={(date: Date) => {
            setFieldValue("birthDate", date);
          }}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="gender"
          label="Gender"
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
          renderSkeleton={() => (
            <div>
              <RadioGroup
                className="xl:row-flex-btwn flex h-11 gap-6"
                onValueChange={handleChange}
                defaultValue={values.gender}
              >
                {GenderOptions.map((option, i) => (
                  <div key={option + i} className="radio-group">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        />
      </div>

      {/* Address & Occupation */}
      <div className="flex-column lg:row-flex w-full gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          field={{
            value: values?.address,
            placeholder: "14 street, New york, NY - 5101",
          }}
          onChange={handleChange}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="occupation"
          label="Occupation"
          field={{ value: values.occupation, placeholder: "Software Engineer" }}
          onChange={handleChange}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />
      </div>

      {/* Emergency Contact Name & Emergency Contact Number */}
      <div className="flex-column lg:row-flex w-full gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="emergencyContactName"
          label="Emergency contact name"
          field={{
            value: values.emergencyContactName,
            placeholder: "Guardian's name",
          }}
          onChange={handleChange}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name="emergencyContactNumber"
          label="Emergency contact number"
          field={{
            value: values.emergencyContactNumber,
            placeholder: "(555) 123-4567",
          }}
          onChange={(value: Value) =>
            setFieldValue("emergencyContactNumber", value)
          }
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />
      </div>

      <section className="w-full space-y-8">
        <div className="mb-8 space-y-1">
          <h3 className="">Medical Information</h3>
        </div>

        {/* PRIMARY CARE PHYSICIAN */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary care physician"
          field={{
            value: values.primaryPhysician,
            placeholder: "Select a physician",
          }}
          onChange={(value: string) => {
            setFieldValue("primaryPhysician", value);
          }}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="row-flex-start cursor-pointer gap-2.5">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="!rounded-full border border-border object-cover"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* INSURANCE & POLICY NUMBER */}
        <div className="flex-column lg:row-flex w-full gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance provider"
            field={{
              value: values.insuranceProvider,
              placeholder: "BlueCross BlueShield",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            field={{
              value: values.insurancePolicyNumber,
              placeholder: "ABC123456789",
            }}
            onChange={handleChange}
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
          />
        </div>

        {/* ALLERGY & CURRENT MEDICATIONS */}
        <div className="flex-column lg:row-flex w-full gap-6">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            field={{
              value: values.allergies,
              placeholder: "Peanuts, Penicillin, Pollen",
            }}
            onChange={handleChange}
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current medications"
            field={{
              value: values.currentMedication,
              placeholder: "Ibuprofen 200mg, Levothyroxine 50mcg",
            }}
            onChange={handleChange}
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
          />
        </div>

        {/* FAMILY MEDICATION & PAST MEDICATIONS */}
        <div className="flex-column lg:row-flex w-full gap-6">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label=" Family medical history (if relevant)"
            field={{
              value: values.familyMedicalHistory,
              placeholder: "Mother had brain cancer, Father has hypertension",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past medical history"
            field={{
              value: values.pastMedicalHistory,
              placeholder:
                "Appendectomy in 2015, Asthma diagnosis in childhood",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </div>
      </section>

      <section className="w-full space-y-8">
        <div className="mb-9 space-y-1">
          <h3 className="">Identification and Verfication</h3>
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          field={{
            value: values.identificationType,
            placeholder: "Select identification type",
          }}
          onChange={(value: string) =>
            setFieldValue("identificationType", value)
          }
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        >
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={type + i} value={type} className="pl-8">
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          field={{
            value: values.identificationNumber,
            placeholder: "123456789",
          }}
          onChange={handleChange}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
          renderSkeleton={() => (
            <FileUploader
              file={values.identificationDocument as File}
              onChange={(file) => {
                setFieldValue("identificationDocument", file);
              }}
            />
          )}
        />
      </section>

      <section className="w-full space-y-6">
        <div className="mb-9 space-y-1">
          <h3 className="">Consent and Privacy</h3>
        </div>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
          field={{
            value: values.treatmentConsent,
          }}
          onChange={(value: any) => {
            setFieldValue("treatmentConsent", value);
          }}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health
            information for treatment purposes."
          field={{
            value: values.disclosureConsent,
          }}
          onChange={(value: CheckedState) => {
            setFieldValue("disclosureConsent", value);
          }}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          field={{
            value: values.privacyConsent,
          }}
          onChange={(value: CheckedState) => {
            setFieldValue("privacyConsent", value);
          }}
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
        />
      </section>
    </FormWrapper>
  );
};

export default RegisterForm;

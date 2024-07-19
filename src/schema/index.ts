import * as yup from "yup";

export const UserFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Field is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Field is required"),
  phone: yup
    .string()
    .matches(/^\+\d{10,15}$/, "Invalid phone number")
    .required("Field is required"),
});

export const PatientFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Field is required"),
  phone: yup
    .string()
    .matches(/^\+\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  birthDate: yup
    .date()
    .default(() => new Date())
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return new Date(originalValue);
      }
      return value;
    })
    .typeError("Invalid date"),
  gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender"),
  address: yup.string().max(500, "Address must be at most 500 characters"),
  occupation: yup
    .string()
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: yup
    .string()
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: yup
    .string()
    .matches(/^\+\d{10,15}$/, "Invalid phone number"),
  primaryPhysician: yup
    .string()
    .min(2, "Select at least one doctor")
    .required("Primary physician is required"),
  insuranceProvider: yup
    .string()
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: yup
    .string()
    .max(50, "Policy number must be at most 50 characters"),
  allergies: yup.string().optional(),
  currentMedication: yup.string().optional(),
  familyMedicalHistory: yup.string().optional(),
  pastMedicalHistory: yup.string().optional(),
  identificationType: yup.string().optional(),
  identificationNumber: yup.string().optional(),
  identificationDocument: yup.string().optional(),
  treatmentConsent: yup
    .boolean()
    .oneOf([true], "You must consent to treatment in order to proceed")
    .required("Treatment consent is required"),
  disclosureConsent: yup
    .boolean()
    .oneOf([true], "You must consent to disclosure in order to proceed")
    .required("Disclosure consent is required"),
  privacyConsent: yup
    .boolean()
    .oneOf([true], "You must consent to privacy in order to proceed")
    .required("Privacy consent is required"),
});

export const CreateAppointmentSchema = yup.object({
  primaryPhysician: yup
    .string()
    .min(2, "Select at least one doctor")
    .required("Primary physician is required"),
  schedule: yup
    .date()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return new Date(originalValue);
      }
      return value;
    })
    .typeError("Invalid date"),
  reason: yup
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters")
    .required("Field is required"),
  note: yup.string().optional(),
  cancellationReason: yup.string().optional(),
});

export const ScheduleAppointmentSchema = yup.object({
  primaryPhysician: yup
    .string()
    .min(2, "Select at least one doctor")
    .required("Primary physician is required"),
  schedule: yup
    .date()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return new Date(originalValue);
      }
      return value;
    })
    .typeError("Invalid date"),
  reason: yup.string().optional(),
  note: yup.string().optional(),
  cancellationReason: yup.string().optional(),
});

export const CancelAppointmentSchema = yup.object({
  primaryPhysician: yup
    .string()
    .min(2, "Select at least one doctor")
    .required("Primary physician is required"),
  schedule: yup
    .date()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return new Date(originalValue);
      }
      return value;
    })
    .typeError("Invalid date"),
  reason: yup.string().optional(),
  note: yup.string().optional(),
  cancellationReason: yup
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters")
    .required("Field is required"),
});

export function getAppointmentSchema(type: "create" | "cancel" | "schedule") {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

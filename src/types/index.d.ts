import { CreateAppointmentSchema, PatientFormValidation } from "@/schema";
import { InferType } from "yup";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams
  extends InferType<typeof PatientFormValidation>,
    CreateUserParams {
  userid: string;
  identificationDocumentId: string | undefined;
  identificationDocumentUrl: string | undefined;
}

declare interface CreateAppointmentParams
  extends InferType<typeof CreateAppointmentSchema> {
  userId: string;
  patient: string;
  status: Status;
}

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

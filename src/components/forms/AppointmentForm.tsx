"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { Appointment } from "@/types/appwrite.types";
import { getAppointmentSchema } from "@/schema";
import { useFormik } from "formik";
import { InferType } from "yup";
import { Status } from "@/types";
import { cn, handleApiError, toastNotify } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import {
  createAppointment,
  updateAppointment,
} from "@/server/actions/appointment.actions";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import FormWrapper from "./FormWrapper";

import "react-datepicker/dist/react-datepicker.css";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const onSubmit = async (
    values: InferType<typeof AppointmentFormValidation>,
    actions: any,
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule!),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          actions.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment?.$id}`,
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule!),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          actions.reset();
        }
      }
    } catch (error) {
      toastNotify(toast, "Something went wrong");
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
    validationSchema: AppointmentFormValidation,
    onSubmit,
  });

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <FormWrapper
      title="New Appointment"
      subtitle="Request a new appointment in 10 seconds."
      showHeading={type === "create"}
      buttonLabel={buttonLabel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {type !== "cancel" && (
        <>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Doctor"
            field={{
              value: values.primaryPhysician,
              placeholder: "Select a doctor",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="row-flex-start cursor-pointer gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-border"
                  />
                  <p className="">{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            name="schedule"
            label="Expected appointment date"
            showTimeSelect
            field={{
              value: values.schedule,
            }}
            onChange={(date: Date) => {
              handleChange({
                target: "schedule",
                value: date,
              });
            }}
            dateFormat="MM/dd/yyyy - h:mm aa"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />

          <div
            className={cn(
              "flex w-full flex-col gap-6",
              type === "create" && "lg:row-flex",
            )}
          >
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="reason"
              label="Appointment reason"
              field={{
                value: values.reason,
                placeholder: "Annual montly check-up",
              }}
              disabled={type === "schedule"}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="note"
              label="Comments/notes"
              field={{
                value: values.note,
                placeholder: "Prefer afternoon appointments, if possible",
              }}
              disabled={type === "schedule"}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </div>
        </>
      )}

      {type === "cancel" && (
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="cancellationReason"
          label="Reason for cancellation"
          field={{
            value: values.cancellationReason,
            placeholder: "Urgent meeting came up",
          }}
          onChange={handleChange}
        />
      )}
    </FormWrapper>
  );
};

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "./page";
import { AppointmentModal } from "../AppointmentModal";

export const testColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="row-flex gap-1">
          <AppointmentModal
            patientId={appointment?.patient?.$id}
            userId={appointment?.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment?.patient?.$id}
            userId={appointment?.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];

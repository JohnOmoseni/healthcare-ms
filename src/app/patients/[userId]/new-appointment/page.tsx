import Image from "next/image";

import { SearchParamProps } from "@/types";
import { getPatient } from "@/server/actions/patient.actions";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  // const patient = await getPatient(userId);
  const patient = { $id: "" };

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] justify-between">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-10 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright">© 2024 CarePluse</p>
        </div>
      </section>

      <div className="side-img max-w-[390px]">
        <Image
          src="/images/appointment-img.png"
          fill
          alt="appointment"
          className="bg-bottom object-cover"
        />
      </div>
    </div>
  );
};

export default Appointment;

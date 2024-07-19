import Image from "next/image";
import Link from "next/link";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { getAppointment } from "@/server/actions/appointment.actions";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician,
  );

  return (
    <div className="flex min-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center gap-10 pb-4 pt-8 sm:pb-6">
        <Link href="/">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex-column !items-center">
          <Image
            src="/gifs/success.gif"
            height={300}
            width={280}
            unoptimized
            alt="success"
            className="object-contain object-center"
          />
          <h2 className="mb-5 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="flex-column md:row-flex w-full !items-center gap-x-8 gap-y-6 border-y-2 border-border px-2 py-6 sm:py-8 md:w-fit">
          <p>Requested appointment details: </p>
          <div className="row-flex gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment?.schedule)?.dateTime}</p>
          </div>
        </section>

        <Link href={`/patients/${userId}/new-appointment`} className="">
          New Appointment
        </Link>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;

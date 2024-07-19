import Image from "next/image";
import Link from "next/link";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { StatCard } from "@/components/StatCard";
import { getRecentAppointmentList } from "@/server/actions/appointment.actions";
import { testColumns } from "@/components/table/test-columns";
import { payments } from "@/components/table/page";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  console.log(appointments);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col space-y-14">
      <header className="row-flex-btwn sticky top-3 z-20 mx-2 gap-3 rounded-2xl bg-background-200 px-[5%] py-4 shadow-md lg:px-6">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="font-medium leading-5 max-sm:text-end sm:text-xl">
          Admin Dashboard
        </p>
      </header>

      <main className="flex-column !items-center space-y-6 px-[5%] pb-12 lg:space-y-12 lg:px-10">
        <section className="w-full space-y-4">
          <h1 className="max-md:center">Welcome 👋</h1>
          <p className="p-subtitle">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="flex w-full flex-col items-stretch justify-between gap-5 sm:flex-row lg:gap-10">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Scheduled appointments"
            icon={"/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount}
            label="Pending appointments"
            icon={"/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Cancelled appointments"
            icon={"/icons/cancelled.svg"}
          />
        </section>

        {/* <DataTable columns={columns} data={appointments.documents} /> */}
        <DataTable columns={testColumns} data={payments} />
      </main>
    </div>
  );
};

export default AdminPage;

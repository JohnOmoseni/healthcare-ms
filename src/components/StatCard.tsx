import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "flex-column min-w-[250px] flex-1 gap-6 overflow-hidden rounded-2xl bg-[#00000033] bg-cover p-6 bg-blend-exclusion shadow-lg",
        {
          "bg-appointments": type === "appointments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        },
      )}
    >
      <div className="row-flex-start gap-3">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="flex-1 text-white">{count}</h2>
      </div>

      <p className="leading-6 sm:max-w-[16ch]">{label}</p>
    </div>
  );
};

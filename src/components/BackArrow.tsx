"use client";

import { ArrowBack } from "@/constants/icons";
import { useRouter } from "next/navigation";

function BackArrow({
  onHandleGoBack,
}: {
  onHandleGoBack?: (() => void) | undefined;
}) {
  const router = useRouter();

  return (
    <div
      className="row-flex mt-6 cursor-pointer gap-1.5"
      onClick={() => (onHandleGoBack ? onHandleGoBack() : router.back())}
    >
      <ArrowBack size={22} className="icon icon-bg" />
      <p className="mt-0.5 text-base capitalize transition-sm hover:underline">
        Back
      </p>
    </div>
  );
}

export default BackArrow;

"use client";
import { CSSProperties, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  // borderColor: "orange",
};

type LoaderProps = {
  loading?: boolean;
  label?: string;
  spinner?: ReactNode;
  render?: () => React.ReactNode;
  containerStyles?: string;
};

const FallbackLoader = ({
  loading = true,
  label,
  spinner,
  render,
  containerStyles,
}: LoaderProps) => {
  if (!loading) return null;

  return (
    <div
      className={twMerge(
        "pointer-events-auto absolute inset-0 grid w-full select-none place-items-center",
        containerStyles,
      )}
      style={{ zIndex: 999 }}
    >
      {render ? (
        render()
      ) : (
        <div className="row-flex-start gap-2">
          {spinner ? (
            spinner
          ) : (
            <ClipLoader
              color={"#24ae7c"}
              loading={loading}
              cssOverride={override}
              size={30}
              aria-label="Loading"
              data-testid="loader"
            />
          )}
          <h3 className="animate-pulse transition-sm">
            {label ?? "Loading..."}
          </h3>
        </div>
      )}
    </div>
  );
};

export default FallbackLoader;

import { ReactNode } from "react";
import { Button } from "@/components/Button";
import BackArrow from "@/components/BackArrow";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  children: ReactNode;
  type?: "create" | "schedule" | "cancel";
  showHeading?: boolean;
  title?: string;
  subtitle?: string;
  buttonLabel: string;
  showBackArrow?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

function FormWrapper({
  children,
  type,
  showHeading,
  title,
  subtitle,
  buttonLabel,
  isSubmitting,
  showBackArrow,
  onSubmit,
}: FormWrapperProps) {
  return (
    <>
      {showBackArrow && (
        <div className="max-w-max">
          <BackArrow />
        </div>
      )}

      <div className="mx-auto mt-10 w-full">
        {showHeading && (
          <section className="mb-12 space-y-2">
            <h2 className="text-xl max-sm:text-center">{title}</h2>
            <p className="p-subtitle">{subtitle}</p>
          </section>
        )}

        <div className="my-6 w-full">
          <form
            onSubmit={onSubmit}
            className="flex-column flex-1 gap-4 space-y-4"
          >
            {children}

            <Button
              type="submit"
              title={isSubmitting ? "Submitting..." : buttonLabel}
              className={cn(
                "mx-auto !mt-12 px-12",
                type === "cancel" ? "shad-danger-btn" : "shad-primary-btn",
              )}
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default FormWrapper;

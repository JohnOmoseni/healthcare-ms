import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <>
      {isAdmin && <PasskeyModal />}

      <div className="flex min-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[496px]">
            <Image
              src="/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-6 h-10 w-fit md:mb-8"
            />

            <PatientForm />

            <div className="mt-auto">
              <div className="row-flex-btwn mt-7 sm:mt-12">
                <p className="justify-items-end xl:text-left">
                  © 2024 CarePluse
                </p>
                <Link href="/?admin=true" className="text-green-500">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="side-img max-w-[50%]">
          <Image
            src="/images/onboarding-img.png"
            fill
            alt="patient"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Home;

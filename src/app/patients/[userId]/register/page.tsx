import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/server/actions/patient.actions";
import { SearchParamProps } from "@/types";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // const patient = await getPatient(userId);

  // if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col pt-10">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-8 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <div className="mt-auto">
            <p className="copyright pb-4 pt-12">© 2024 CarePluse</p>
          </div>
        </div>
      </section>

      <div className="side-img max-w-[390px]">
        <Image
          src="/images/register-img.png"
          fill
          alt="appointment"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Register;

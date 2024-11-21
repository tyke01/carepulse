import RegisterForm from "@/components/forms/register-form";
import { getUser } from "@/lib/actions/patient.action";
import { SearchParamProps } from "@/types";



import Image from "next/image";
import Link from "next/link";

const Register = async ({params : {userId}}: SearchParamProps) => {
    const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="logo"
          height={1000}
          width={1000}
          className="mb-12 h-10 w-fit"
        />
        {/* <PatientForm /> */}
        <RegisterForm user={user}/>


          <p className="copyright py-12">
            &copy; 2024 CarePulse
          </p>
        
      </div>
    </section>
    <Image
      src="/assets/images/register-img.png"
      alt="patient"
      height={1000}
      width={1000}
      className="side-img max-w-[390px]"
    />
  </div>
  );
};

export default Register;

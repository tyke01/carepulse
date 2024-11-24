import AppointmentForm from "@/components/forms/appointment-form";
import { getPatient } from "@/lib/actions/patient.action";
import { SearchParamProps } from "@/types";

import Image from "next/image";


export default async function NewAppointment({params : {userId}}: SearchParamProps) {
  const patient = await getPatient(userId)
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP VERIFICATION */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          {/* <PatientForm /> */}
          <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient?.$id}
          />

            <p className="copyright mt-10 my-12">
              &copy; 2024 CarePulse
            </p>
         
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointmen"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

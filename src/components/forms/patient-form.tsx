"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";


import CustomFormField from "@/components/custom-formField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.action";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const [isloading, setisloading] = useState(false);
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisloading(true);

    try {
      // TODO: Implement your API call to create user here.
      const userData = {
        name,
        email,
        phone,
      };

      const user = await createUser(userData)

      if(user) {
        router.push(`/patients/${user.$id}/register`)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="email"
          label="email"
          placeholder="JohnDoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          label="phone number"
          placeholder="(+254 723 456 789)"
        />

        <SubmitButton isLoading={isloading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

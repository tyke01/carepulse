"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/appointment-form";

const AppointmentModal = ({ type }: { type: "schedule" | "cancel" }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} appointment</DialogTitle>
          <DialogDescription>
           Please fill in the following details to {type} the appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
        
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;

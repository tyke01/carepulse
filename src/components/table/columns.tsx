"use client"

import { ColumnDef,  } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/status-badge"
import { Appointment } from "@/types/appwrite.types"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import AppointmentModal from "../appointment-modal"



export const columns: ColumnDef<Appointment>[] = [
 
  {
    header: 'ID',
    cell: ({row}) => <p className="text-14-medium">{row.index+1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({row}) =>  <p className="text-14-medium">{row.original.patient.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    )
  },

  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({row}) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },

  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return (
        <div className="flex gap-3 items-center">
            <Image src={doctor?.image} alt={doctor?.name} height={100} width={100} className="size-8"/>
            <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      )
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal />
        </div>
      )
      
    },
  },
]

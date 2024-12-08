import { cn } from "@/lib/utils";
import Image from "next/image";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={cn("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-cancelled": type === "cancelled",
        "bg-pending": type === "pending",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt="label"
          className="size-8 w-fit"
          height={32}
          width={32}
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;

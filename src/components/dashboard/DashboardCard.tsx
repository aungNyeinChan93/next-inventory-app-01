import React from "react";
import { LucideProps } from "lucide-react";

interface Props {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  value: number;
  color?: string;
}

const DashboardCard = ({ title, icon: Icon, value, color }: Props) => {
  return (
    <React.Fragment>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="text-gray-600 font-medium">{title}</h4>
        <p
          className={`text-3xl font-bold ${
            color ?? "text-blue-600"
          } mt-2 flex justify-between items-center`}
        >
          <span>
            <Icon
              size={30}
              className={`${color ?? "text-blue-500"} w-5 h-5 `}
            />
          </span>
          {value.toFixed(0)}
        </p>
      </div>
    </React.Fragment>
  );
};

export default DashboardCard;

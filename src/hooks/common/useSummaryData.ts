import { useMemo } from "react";
import { AdminSummaryItem } from "@/types/admin/layout";
import { IconType } from "@/types/icon";

interface SummaryConfig {
  icon: IconType;
  bgColor: string;
  label: string;
  getValue: () => string | number;
}

export function useSummaryData(configs: SummaryConfig[]): AdminSummaryItem[] {
  const currentValues = configs.map((config) => config.getValue());

  return useMemo(() => {
    return configs.map((config) => ({
      title: config.label,
      value: config.getValue(),
      icon: config.icon,
      bgColor: config.bgColor,
    }));
  }, [JSON.stringify(currentValues)]);
}

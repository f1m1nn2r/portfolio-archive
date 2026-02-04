export function formatPeriod(start: string, end: string | null): string {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : "현재";

  return `${startFormatted} - ${endFormatted}`;
}

export function calculateDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}개월`;
  } else if (remainingMonths === 0) {
    return `${years}년`;
  } else {
    return `${years}년 ${remainingMonths}개월`;
  }
}

export function calculateTotalExperience(
  experiences: Array<{ start_date: string; end_date: string | null }>,
): string {
  if (experiences.length === 0) return "0개월";

  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.start_date);
    const end = exp.end_date ? new Date(exp.end_date) : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months}개월`;
  } else if (months === 0) {
    return `${years}년`;
  } else {
    return `${years}년 ${months}개월`;
  }
}

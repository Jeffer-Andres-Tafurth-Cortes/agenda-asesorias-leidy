export function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0 = domingo
}

export function formatMonth(year: number, month: number) {
  return new Date(year, month).toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  });
}

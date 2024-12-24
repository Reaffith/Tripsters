export const DateToString = (date: Date) => {
  return date.toLocaleDateString('en-GB').replace(/\//g, '.');
};

export function stringToDate(isoString: string): Date {
  return new Date(isoString);
}

export function formatDateToISO(date: Date, hours: number = 0, minutes: number = 0, seconds: number = 0): string {
  // Встановлюємо години, хвилини та секунди
  date.setHours(hours, minutes, seconds);

  // Форматуємо дату у формат ISO, відрізаємо мілісекунди
  return date.toISOString().slice(0, 19);
}
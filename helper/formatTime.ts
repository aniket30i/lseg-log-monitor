export const formatTime = (date: Date): string =>
  date.toTimeString().split(" ")[0];

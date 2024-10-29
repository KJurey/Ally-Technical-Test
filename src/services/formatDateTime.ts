export function formatDateTime(datetimeString: string) {
  const dateParts = datetimeString.split("T")[0].split("-");
  const timeParts = datetimeString.split("T")[1].split("+")[0].split(":");

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const hours = timeParts[0];
  const minutes = timeParts[1];
  const seconds = timeParts[2].split(".")[0]; // No miliseconds

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate}, ${formattedTime}`;
}

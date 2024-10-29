import { userData } from "@/types/DashboardPage/dashboardTypes";

const jsonToCsv = async (jsonData: userData[]): Promise<string> => {
  if (jsonData.length === 0) {
    return "";
  }

  let csv = "";

  const headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  jsonData.forEach((obj) => {
    const values = headers.map((header) => {
      const value = obj[header as keyof userData];
      if (typeof value === "object") {
        return JSON.stringify(value).replace(/,/g, ";");
      }
      return value;
    });
    csv += values.join(",") + "\n";
  });

  return csv;
};

export const generateAndDownloadCSV = async (jsonData: userData[]) => {
  const csvData = await jsonToCsv(jsonData);

  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Zone } from "@/types/DashboardPage/dashboardTypes";

interface AvailableTimezonesCardProps {
  timezones: Zone[];
  onSelect: (timezone: string) => (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AvailableTimezonesCard: React.FC<AvailableTimezonesCardProps> = ({
  timezones,
  onSelect,
}) => {
  return (
    <Card className="h-2/4 mb-6 overflow-scroll overflow-x-hidden scrollbar">
      <CardHeader
        title="Available Timezones"
        className="bg-blue-500 text-white"
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 700,
          },
        }}
      ></CardHeader>
      <CardContent>
        {timezones.length > 0 ? (
          timezones.map((zone, index) => (
            <div key={index} className="h-10">
              <Typography
                className="text-xl text-blue-500 font-semibold cursor-pointer hover:text-blue-700"
                onClick={onSelect(zone.zoneName)}
              >
                {zone.zoneName}
              </Typography>
            </div>
          ))
        ) : (
          <Typography>No timezones available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableTimezonesCard;

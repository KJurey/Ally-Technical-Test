import { formatDateTime } from "@/services/formatDateTime";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { currentTimezone } from "@/types/DashboardPage/dashboardTypes";

interface DateCardProps {
  timezone?: currentTimezone;
}

const DateTimeCard: React.FC<DateCardProps> = ({ timezone }) => {
  return (
    <Card className="h-1/4">
      <CardHeader
        title="Time"
        className="bg-blue-500 text-white"
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 700,
          },
        }}
      />
      <CardContent>
        {timezone ? (
          <div>
            <div>
              <Typography className="text-xl">
                {formatDateTime(timezone.datetime)}
              </Typography>
              <Typography className="text-xl">{timezone.timezone}</Typography>
            </div>
            <div></div>
          </div>
        ) : (
          <Typography>No timezone available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DateTimeCard;

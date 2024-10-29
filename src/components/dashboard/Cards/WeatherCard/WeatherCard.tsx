import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { Weather } from "@/types/DashboardPage/dashboardTypes";

interface WeatherCardProps {
  weather?: Weather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Card className="mb-6 h-1/4">
      <CardHeader
        title="Weather"
        className="bg-blue-500 text-white"
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 700,
          },
        }}
      ></CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            {weather && (
              <Image
                src={`https://${weather.current.condition.icon.replace(
                  /^\/\//,
                  ""
                )}`}
                alt=""
                width={50}
                height={50}
              />
            )}
            <Typography className="text-3xl">
              {weather?.current.temp_c}°C - {weather?.current.condition.text}
            </Typography>
          </div>
          <div>
            <Typography>
              Feels Like {weather?.current.feelslike_c}° C
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

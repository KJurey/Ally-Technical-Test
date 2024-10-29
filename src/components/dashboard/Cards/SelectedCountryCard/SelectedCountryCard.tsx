import { Card, CardHeader, CardContent, Typography } from "@mui/material";

interface CountryCardProps {
  country: string | null;
  capital: string | null;
  region: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  capital,
  region,
  latitude,
  longitude,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader
        title="Selected Country"
        className="bg-blue-500 text-white"
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 700,
          },
        }}
      ></CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {country ? (
            <>
              <Typography className="font-[800]">{country}</Typography>
              <Typography>Capital: {capital}</Typography>
              <Typography>Region: {region}</Typography>
              <Typography>
                latitude: {latitude} longitude: {longitude}
              </Typography>
            </>
          ) : (
            <Typography>No country data available</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;

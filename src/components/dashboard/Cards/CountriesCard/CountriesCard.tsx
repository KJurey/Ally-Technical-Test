import { CardHeader, CardContent, Card, Typography } from "@mui/material";
import Image from "next/image";
import { Countries } from "@/types/DashboardPage/dashboardTypes";

interface CountryCardProps {
  countries?: Countries[];
  onSelect: (
    country: string,
    code: string,
    capital: string
  ) => (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CountriesCard: React.FC<CountryCardProps> = ({ countries, onSelect }) => {
  return (
    <>
      <Card>
        <CardHeader
          title="Available Countries"
          className="bg-blue-500 text-white"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
            },
          }}
        />
        <CardContent>
          {countries?.map((c) => (
            <div
              key={c.id}
              className="flex items-center cursor-pointer hover:text-blue-500"
              onClick={onSelect(c.name, c.code, c.capital)}
            >
              <Image
                src={`https://flagsapi.com/${c.code}/flat/64.png`}
                alt={`${c.name} Flag Icon`}
                width={80}
                height={80}
              />
              <Typography className="text-xl">
                {c.name}, {c.capital}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CountriesCard;

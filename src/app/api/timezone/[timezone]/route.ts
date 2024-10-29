// import { NextRequest, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { currentTimezone } from "@/types/DashboardPage/dashboardTypes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ timezone: string }> }
) {
  try {
    const { timezone } = await params;
    const decodedTimezone = decodeURIComponent(timezone);

    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${decodedTimezone}`
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch timezone data" },
        { status: response.status }
      );
    }

    const data: currentTimezone = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error in timezone API route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

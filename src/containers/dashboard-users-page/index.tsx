"use client";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useEffect, useState } from "react";
import { userData } from "@/types/DashboardPage/dashboardTypes";
import { formatDateTime } from "@/services/formatDateTime";
import { generateAndDownloadCSV } from "@/services/JSONtoCSV";
import { SortType } from "@/types/DashboardPage/dashboardTypes";

export default function DashboardUsersPage() {
  const [userList, setUserList] = useState<userData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [sortSelector, setSortSelector] = useState<SortType>(SortType.Name);
  const [sort, setSort] = useState<boolean>(true);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allUserIds = userList?.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCsvSelect =
    (selectedUsers: string[]) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const selectedCsvCards = userList.filter((user) =>
        selectedUsers.includes(user.id)
      );
      generateAndDownloadCSV(selectedCsvCards);
      setSnackbarOpen(true);
    };

  const handleSort =
    (sortFilter: SortType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setSortSelector(sortFilter);
      setSort(!sort);
    };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserList(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <main className="h-screen w-screen pl-[20%] flex">
      <section className="flex flex-col h-full w-full px-4 py-4">
        <Card className="h-full">
          <CardHeader
            title="Users"
            className="bg-blue-500 text-white"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: 700,
              },
            }}
          />
          <CardContent>
            <div className="h-12 bg-zinc-800">
              <IconButton
                onClick={handleCsvSelect(selectedUsers)}
                disabled={selectedUsers.length === 0}
              >
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    selectedUsers.length === 0
                      ? "w-8 fill-slate-300"
                      : "w-8 fill-green-500"
                  }
                >
                  <path d="M13.5 3.5h.5v-.207l-.146-.147zm-3-3 .354-.354L10.707 0H10.5zm-4 6V6H6v.5zm0 2H6V9h.5zm2 0H9V8h-.5zm0 2v.5H9v-.5zm2-1H10v.207l.146.147zm1 1-.354.354.354.353.354-.353zm1-1 .354.354.146-.147V9.5zm-10-3V6H2v.5zm0 4H2v.5h.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146 3 3 .708-.708-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5zM9 6H6.5v1H9zm-3 .5v2h1v-2zM6.5 9h2V8h-2zM8 8.5v2h1v-2zm.5 1.5H6v1h2.5zM10 6v3.5h1V6zm.146 3.854 1 1 .708-.708-1-1zm1.708 1 1-1-.708-.708-1 1zM13 9.5V6h-1v3.5zM5 6H2.5v1H5zm-3 .5v4h1v-4zm.5 4.5H5v-1H2.5z" />
                </svg>
              </IconButton>
            </div>
            <div className="flex">
              <div className="w-1/4 flex items-center border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 h-10">
                <div className="w-[20%]">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    inputProps={{ "aria-label": "select all users" }}
                  />
                </div>
                <div className="w-[65%]">
                  <Typography className="font-[700] ">Name</Typography>
                </div>
                <IconButton
                  className="w-[15%]"
                  onClick={handleSort(SortType.Name)}
                >
                  <SwapVertIcon />
                </IconButton>
              </div>
              <div className="flex items-center justify-between w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 pl-2 h-10">
                <Typography className="font-[700]">Email</Typography>
                <IconButton onClick={handleSort(SortType.Email)}>
                  <SwapVertIcon />
                </IconButton>
              </div>
              <div className="flex items-center justify-between w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 pl-2 h-10">
                <Typography className="font-[700]">Created At</Typography>
                <IconButton onClick={handleSort(SortType.CreatedAt)}>
                  <SwapVertIcon />
                </IconButton>
              </div>
              <div className="flex items-center justify-between w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 pl-2 h-10">
                <Typography className="font-[700]">Last Login</Typography>
                <IconButton onClick={handleSort(SortType.LastLogin)}>
                  <SwapVertIcon />
                </IconButton>
              </div>
            </div>
            {userList
              ?.sort((a, b) => {
                if (sortSelector === "Name") {
                  return sort
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
                } else if (sortSelector === "Email") {
                  return sort
                    ? a.email.localeCompare(b.email)
                    : b.email.localeCompare(a.email);
                } else if (sortSelector === "LastLogin") {
                  return sort
                    ? a.lastLogin.localeCompare(b.lastLogin)
                    : b.lastLogin.localeCompare(a.lastLogin);
                } else if (sortSelector === "CreatedAt") {
                  return sort
                    ? a.createdAt.localeCompare(b.createdAt)
                    : b.createdAt.localeCompare(a.createdAt);
                }
                return 0;
              })
              .map((user) => (
                <div key={user.id} className="flex">
                  <div className="w-1/4 flex items-center justify-between border-solid border-r-2 border-l-0 border-y-0 border-zinc-300 h-10">
                    <div className="w-[20%]">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        inputProps={{
                          "aria-label": `select user ${user.name}`,
                        }}
                      />
                    </div>
                    <div className="w-[80%]">
                      <Typography className="truncate">{user.name}</Typography>
                    </div>
                  </div>
                  <div className="w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 h-10">
                    <div className="w-[90%] ml-2">
                      <Typography className="truncate">{user.email}</Typography>
                    </div>
                  </div>
                  <div className="w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 h-10">
                    <div className="w-[90%] ml-2">
                      {formatDateTime(user.createdAt)}
                    </div>
                  </div>
                  <div className="w-1/4 border-solid border-r-2 border-l-0 border-y-0  border-zinc-300 h-10">
                    <div className="w-[90%] ml-2">
                      {formatDateTime(user.lastLogin)}
                    </div>
                  </div>
                </div>
              ))}
            <div className="h-14 flex items-center">
              Showing {userList.length} users in total
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message="Creating new CSV file with selected users"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </section>
    </main>
  );
}

import NavBar from "@/components/dashboard/NavBar/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-full w-screen ">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}

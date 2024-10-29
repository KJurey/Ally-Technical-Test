import LoginCard from "@/components/login/LoginCard/loginCard";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex">
      <div className="h-screen w-[55%]">
        <Image
          src="/login-background.webp"
          alt="login background"
          fill
          className="w-[55%]"
        />
      </div>
      <LoginCard />
    </div>
  );
}

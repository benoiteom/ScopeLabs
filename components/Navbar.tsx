"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { clearUserName, getUserName } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar({ hideLogin }: { hideLogin?: boolean }) {
  const router = useRouter();

  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    setUserName(getUserName());
  });

  const handleLogout = async () => {
    try {
      clearUserName();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between border-b-2 border-b-black px-10 h-20">
      <div className="w-full h-full flex items-center gap-10">
        <Link href="/">
          <Image src="/title.png" alt="Learnwell Logo" width={180} height={50} />
        </Link>
      </div>
      {!hideLogin && (
        !userName ? (
          <Link className={buttonVariants({ variant: "outline" })} href="/login">
            <LogIn size={20} />
            <span className="font-bold ml-2">Login</span>
          </Link>
        ) : (
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={20} />
            <span className="font-bold ml-2">Logout</span>
          </Button>
        )
      )}
    </nav>
  );
}

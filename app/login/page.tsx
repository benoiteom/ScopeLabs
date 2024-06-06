"use client";

import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { getUserName, setUserName } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (getUserName()) {
      router.push("/");
    }
  });

  const signIn = async (data: { username: string }) => {
    try {
      setUserName(data.username);
      router.push("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar hideLogin />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-3xl px-3">
        <main className="w-full flex-1 flex flex-col gap-6">
          <h3 className="font-semibold text-3xl mb-8">Login to Learnwell</h3>
          <LoginForm submit={signIn} />
        </main>
      </div>
      <Footer />
    </>
  );
}

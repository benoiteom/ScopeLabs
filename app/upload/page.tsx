"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import { getUserName } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Upload() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!getUserName()) {
      router.push("/");
    }
  });

  const handleUpload = async (data: {
    title: string;
    description: string;
    url: string;
  }) => {
    try {
      const res = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            video_url: data.url,
            user_id: getUserName(),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitted(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-3xl px-3">
        <main className="w-full flex-1 flex flex-col gap-6">
          <h3 className="font-semibold text-3xl mb-4">Upload</h3>
          <p>
            Fill out the details below to add a new video, we'll add it to our
            database of videos for users to view!
          </p>

          {submitted ? (
            <>
              <p className="text-green-500">Video submitted successfully!</p>
              <Button variant="outline" className="max-w-40" onClick={() => setSubmitted(false)}>
                Upload Another
              </Button>
            </>
          ) : (
            <UploadForm submit={handleUpload} />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

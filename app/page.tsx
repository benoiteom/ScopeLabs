"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

type Video = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
};

export default function Index() {
  const router = useRouter();

  const [videos, setVideos] = useState<Record<string, Video[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      // Using hardcoded user ids
      const [response1, response2, response3] = await Promise.all([
        fetch(
          "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=asdf"
        ),
        fetch(
          "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=benoit_ortalo-magne"
        ),
        fetch(
          "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=jake_peralta"
        ),
      ]);

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      setVideos({
        asdf: data1.videos,
        "benoit_ortalo-magne": data2.videos,
        jake_peralta: data3.videos,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatVideoUrlForEmbed = (url: string) => {
    // Assumes url is of format https://www.youtube.com/watch?v=VIDEO_ID
    const videoId = url.split("=")[1];
    return `https://www.youtube.com/embed/${videoId}?showInfo=0&controls=0`;
  };

  const handleClick = (video: Video) => {
    router.push("/video/" + video.id);
  };

  return (
    <>
      <Navbar />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 w-full max-w-5xl px-3">
        {loading ? (
          <>
            <p>Loading content</p>
            <div className="relative">
              <div className="spinner spinner-dark" />
            </div>
          </>
        ) : (
          <main className="animate-in w-full flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-3xl mb-4">
                What will you learn today?
              </h3>
              <Button variant="outline" onClick={() => router.push("/upload")}>
                <Upload className="w-4 h-4 mr-2" />
                <p>Upload</p>
              </Button>
            </div>
            <p className="mb-8">
              Take your pick from our top notch teachers! The possibilites are
              endless.
            </p>
            {Object.keys(videos).map((key) => (
              <>
                <p className="font-bold text-xl">
                  {key.replace("_", " ").toUpperCase()}
                </p>
                <div className="flex gap-8 w-full max-w-full overflow-x-auto pb-3">
                  {videos[key].map((video) => (
                    <Card
                      key={video.id}
                      className="hover:bg-zinc-200 cursor-pointer transition-all duration-300"
                      onClick={() => handleClick(video)}
                    >
                      <CardHeader>
                        <CardTitle>{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg overflow-hidden pointer-events-none">
                          <iframe
                            src={formatVideoUrlForEmbed(video.video_url)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ))}
          </main>
        )}
      </div>
      <Footer />
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getUserName } from "@/lib/utils";

type Video = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  num_comments: number;
};

type Comment = {
  video_id: string;
  content: string;
  user_id: string;
};

export default function Video() {
  const router = useRouter();
  const { id } = useParams();
  if (!id) {
    router.push("/");
  }

  const [video, setVideo] = useState<Video | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    setUserName(getUserName() || "");
    getVideoData();
    getCommentData();
  }, [id]);

  const getVideoData = async () => {
    try {
      const videoRes = await fetch(
          "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/single?video_id=" +
            id
        )
      if (!videoRes.ok) {
        console.error("Network response was not ok");
      }

      setVideo((await videoRes.json()).video);
    } catch (error: any) {
      console.error(error);
    }
  };

  const getCommentData = async () => {
    try {
      const commentRes = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=" +
          id
      )
      if (!commentRes.ok) {
        console.error("Network response was not ok");
      }

      setComments((await commentRes.json()).comments);
    } catch (error: any) {
      console.error(error);
    }
  };

  const formatVideoUrlForEmbed = (url: string) => {
    const videoId = url.split("=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleAddComment = async () => {
    const userName = getUserName();
    if (!userName) {
      router.refresh();
      return;
    }

    try {
      const res = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_id: id,
            content: newComment,
            user_id: userName,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      setNewComment("");
      getCommentData();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 w-full max-w-3xl px-3">
        <main className="w-full flex-1 flex flex-col gap-2">
          {video && (
            <>
              <h3 className="font-semibold text-3xl mb-4">{video.title}</h3>
              <p className="mb-4">{video.description}</p>

              <iframe
                src={formatVideoUrlForEmbed(video.video_url)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full max-w-3xl aspect-video rounded-lg"
              ></iframe>

              <Textarea
                placeholder="Add a comment"
                className="w-full mt-4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              <div className="flex items-end justify-between mb-8">
                <p className="text-sm text-gray-400 text-end">
                  Number of comments: {video.num_comments}
                </p>
                <Button
                  disabled={!newComment}
                  className="max-w-40 w-full"
                  onClick={handleAddComment}
                >
                  {userName ? "Submit" : "Sign In to Submit"}
                </Button>
              </div>

              {comments.map((comment) => (
                <div className="border-b border-gray-300 mb-2" key={comment.content}>
                  <p>{comment.content}</p>
                </div>
              ))}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  url: z.string().url({ message: "Invalid URL" }),
});

export default function UploadForm({
  submit,
}: {
  submit: (data: z.infer<typeof FormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="w-full flex flex-col gap-6"
      >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="New Video"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the content of the video"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://www...."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <div className="w-full flex justify-end">
          <Button type="submit" className="w-full max-w-40">
            {form.formState.isSubmitting ? (
              <div className="relative">
                <div className="spinner" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getUserName = () => {
  if (!localStorage) return null;
  const user = localStorage.getItem("username");
  return user ? JSON.parse(user) : null;
};

export const setUserName = (username: string) => {
  localStorage.setItem("username", JSON.stringify(username));
};

export const clearUserName = () => {
  localStorage.removeItem("username");
};

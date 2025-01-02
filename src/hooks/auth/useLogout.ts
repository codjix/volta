"use client";
import Cookies from "universal-cookie";

export const useLogout = () => {
  const cookie = new Cookies(null, { path: "/" });
  return () => {
    cookie.remove("token");
    location.reload();
  };
};

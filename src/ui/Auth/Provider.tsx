"use client";
import { createContext } from "react";
import { users } from "@db/schema";

export type $Session = typeof users.$inferSelect | undefined;
export const AuthCtx = createContext<$Session>(null!);

type $AuthProvider = {
  children: React.ReactNode;
  session: $Session;
};

export const AuthProvider = ({ session, children }: $AuthProvider) => {
  return <AuthCtx value={session}>{children}</AuthCtx>;
};

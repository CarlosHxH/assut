"use client"
import { FormProvider } from "@/context";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}
"use client"
import AppBar from "@/components/Appbar";
import Footer from "@/components/footer";
import { FormProvider } from "@/context";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider storageKey="AssutKey" autoSave={true}>
      <AppBar />
      {children}
      <Footer />
    </FormProvider>
  )
}
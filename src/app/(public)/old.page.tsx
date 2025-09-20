import Appbar from "@/components/Appbar";
import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Appbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
        <div className="absolute inset-0 size-full">
          <div className="relative h-full w-full select-none">
            <Image className="absolute right-0 min-w-dvh dark:hidden" alt="Pattern Light" src="/pattern-light.svg" width="803" height="774" />
            <Image className="absolute right-0 hidden min-w-dvh dark:block" alt="Pattern Dark" src="/pattern-dark.svg" width="803" height="775" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <DarkThemeToggle />
        </div>

        <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">

        </div>
      </main>
    </>
  );
}

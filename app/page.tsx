"use client";
import LandingPage from "@/components/LandingPage";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
export default function Home() {
  return (
    <main className="!h-full !w-full !m-0 !p-0">
        <div className="w-full h-full relative">
          <RecoilRoot>
            <Toaster />
            <LandingPage />
          </RecoilRoot>
        </div>
    </main>
  );
}

"use client";
import PaperBackground from "@/components/Pergamino";
import CardPrePage from "@/prepages/CardPrePage";
import { Suspense } from "react";

export default function cardpage() {
  const handleGoBack = () => {
    console.log("go back");
    window.history.back();
  };

  return (
    <Suspense>
      <PaperBackground>
        <CardPrePage />
      </PaperBackground>
    </Suspense>
  );
}

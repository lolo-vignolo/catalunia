"use client";
import PaperBackground from "@/components/Pergamino";
import Pergamino2 from "@/components/Pergamino/Pergamino2";
import CardPrePage from "@/prepages/CardPrePage";
import { Suspense } from "react";

export default function cardpage() {
  return (
    <Suspense>
      {/* <PaperBackground>
        <CardPrePage />
      </PaperBackground> */}
      <Pergamino2 />
    </Suspense>
  );
}

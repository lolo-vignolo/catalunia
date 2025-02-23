import PaperBackground from "@/components/Perfamino";
import CardPrePage from "@/prepages/CardPrePage";
import { Suspense } from "react";

export default function cardpage() {
  return (
    <Suspense>
      <PaperBackground>
        <CardPrePage />
      </PaperBackground>
    </Suspense>
  );
}

import DelayedCard from "@/src/components/DelayedCard";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="items-center justify-center min-h-screen flex text-centers">
      <div>

        {/* O Suspense protege o resto da página de travar */}
        <Suspense fallback={<h1>Carregando...</h1>}>
          <DelayedCard/>
        </Suspense>
      </div>
    </div>
  );
}


import { Suspense } from "react";
import CardSkeleton from "./_features/CardSkeleton";
import ItemsList from "./_features/ItemsList";

export default async function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white sm:items-start">
        <h1 className="font-bold text-2xl mb-6">Dashboard (PPR)</h1>

        <Suspense fallback={<CardSkeleton />}>
          <ItemsList />
        </Suspense>
      </main>
    </div>
  );
}

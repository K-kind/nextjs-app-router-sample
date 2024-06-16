import { Suspense } from "react";

import { CoffeeList } from "@/app/coffees/CoffeeList";

export default function CoffeeListPage() {
  return (
    <>
      <h1 className="text-2xl mb-4">Hot Coffees</h1>
      <CoffeeList type="hot" isTop />

      <hr className="my-8" />

      <h1 className="text-2xl mb-4">Iced Coffees</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CoffeeList type="iced" />
      </Suspense>
    </>
  );
}

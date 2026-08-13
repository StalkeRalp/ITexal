import { Suspense } from "react";
import { Collection } from "@/composants/Collection";

export const metadata = { title: "Parfums" };
export default function Page() { return <Suspense><Collection fixedCategory="Parfums" /></Suspense>; }

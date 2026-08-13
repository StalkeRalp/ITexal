import { Suspense } from "react";
import { Collection } from "@/composants/Collection";

export const metadata = { title: "Maquillage" };
export default function Page() { return <Suspense><Collection fixedCategory="Maquillage" /></Suspense>; }

import { Suspense } from "react";
import { Collection } from "@/composants/Collection";

export const metadata = { title: "Soins" };
export default function Page() { return <Suspense><Collection fixedCategory="Soins" /></Suspense>; }

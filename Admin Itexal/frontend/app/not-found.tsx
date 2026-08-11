import Link from "next/link";

export default function NonTrouve() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-rose-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page non trouvée</h2>
      <p className="text-slate-400 mb-6 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/admin"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
      >
        Retour au Dashboard Admin
      </Link>
    </div>
  );
}

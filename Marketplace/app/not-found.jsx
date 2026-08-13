import Link from "next/link";

export default function NotFound() {
  return <main className="section container"><div className="empty-state"><h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée.</p><Link className="btn btn-dark" href="/">Retour à l’accueil</Link></div></main>;
}

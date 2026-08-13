"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { AccountShell } from "@/composants/AccountShell";
import { Check, Save, ShieldCheck, Upload, Camera } from "lucide-react";

const AVATAR_PRESETS = [
  "/Images/pexels-alesiakozik-7795760.jpg",
  "/Images/pexels-karola-g-4202326.jpg",
  "/Images/pexels-chidy-31141638.jpg",
  "/Images/pexels-valeriiamiller-3680203.jpg"
];

export default function ProfilPage() {
  const { user, updateUserProfile } = useStore();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
    skinType: "Mixte",
    hairType: "Crépus",
    favoriteBrand: "Christian Dior Prestige",
    notificationsEmail: true,
    notificationsWhatsapp: true,
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        firstName: user.firstName || (user.name ? user.name.split(" ")[0] : ""),
        lastName: user.lastName || (user.name ? user.name.split(" ").slice(1).join(" ") : ""),
        email: user.email || "",
        phone: user.phone || "+237 600 000 000",
        avatar: user.avatar || AVATAR_PRESETS[0],
        skinType: user.skinType || "Mixte",
        hairType: user.hairType || "Crépus",
        favoriteBrand: user.favoriteBrand || "Christian Dior Prestige"
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAvatarSelect = (url) => {
    setForm(prev => ({ ...prev, avatar: url }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setForm(prev => ({ ...prev, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`.trim();
    updateUserProfile({
      name,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar,
      skinType: form.skinType,
      hairType: form.hairType,
      favoriteBrand: form.favoriteBrand,
      notificationsEmail: form.notificationsEmail,
      notificationsWhatsapp: form.notificationsWhatsapp
    });
  };

  return (
    <AccountShell
      title="Mon Profil & Paramètres"
      description="Modifiez vos informations personnelles, votre diagnostic beauté ITEXAL et vos préférences de confidentialité."
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "70px" }}>
        
        {/* Hidden File Input for Avatar Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />

        {/* CARD 1: Informations Personnelles & Photo de Profil */}
        <article className="order-card-luxury" style={{ background: "#ffffff", border: "1px solid #e3dcd5", padding: "30px 35px" }}>
          <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #efe8e1" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", color: "#8738ce", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
              ESPACE IDENTITÉ
            </span>
            <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "22px", margin: 0, color: "#1a1412", fontWeight: "400" }}>
              Informations Personnelles & Photo de Profil
            </h3>
          </div>

          {/* Avatar Selector Gallery & Image Upload */}
          <div style={{ marginBottom: "28px", background: "#faf6f1", border: "1px solid #e8dfd8", padding: "20px 24px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div
              style={{ position: "relative", width: "86px", height: "86px", flexShrink: 0, cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
              title="Cliquer pour importer une photo"
            >
              {form.avatar ? (
                <img src={form.avatar} alt="Photo de profil" style={{ width: "86px", height: "86px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              ) : (
                <div style={{ width: "86px", height: "86px", borderRadius: "50%", background: "#1a1412", color: "#fff", fontSize: "32px", fontWeight: "700", display: "grid", placeItems: "center" }}>
                  {(form.firstName || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <span
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  background: "#8738ce",
                  color: "#fff",
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                }}
              >
                <Camera width={14} height={14} />
              </span>
            </div>
            
            <div style={{ flex: 1, minWidth: "220px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a524a", margin: 0 }}>
                  PORTRAIT BEAUTÉ OU FICHIER PERSONNEL :
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="dior-btn-outline"
                  style={{ fontSize: "11px", height: "36px", padding: "0 14px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Upload width={14} height={14} /> Importer depuis l'appareil
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                {AVATAR_PRESETS.map((imgUrl, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleAvatarSelect(imgUrl)}
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: form.avatar === imgUrl ? "2px solid #8738ce" : "2px solid #dcd3ca",
                      padding: 0,
                      background: "none",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "all 0.2s ease",
                      transform: form.avatar === imgUrl ? "scale(1.08)" : "none"
                    }}
                  >
                    <img src={imgUrl} alt={`Avatar preset ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    {form.avatar === imgUrl && (
                      <span style={{ position: "absolute", inset: 0, background: "rgba(135, 56, 206, 0.55)", color: "#fff", display: "grid", placeItems: "center" }}>
                        <Check width={16} height={16} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group-item">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ex: Lelica"
                required
              />
            </div>

            <div className="form-group-item">
              <label htmlFor="lastName">Nom de famille</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Ex: Ange"
                required
              />
            </div>

            <div className="form-group-item">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre.email@domaine.com"
                required
              />
            </div>

            <div className="form-group-item">
              <label htmlFor="phone">Numéro de Téléphone (Cameroun)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+237 6XX XX XX XX"
              />
            </div>
          </div>
        </article>

        {/* CARD 2: Routine & Diagnostic Beauté */}
        <article className="order-card-luxury" style={{ background: "#ffffff", border: "1px solid #e3dcd5", padding: "30px 35px" }}>
          <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #efe8e1" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", color: "#8738ce", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
              EXPERTISE BEAUTÉ
            </span>
            <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "22px", margin: 0, color: "#1a1412", fontWeight: "400" }}>
              Profil & Diagnostic Beauté ITEXAL
            </h3>
          </div>

          <div className="form-grid-3col">
            <div className="form-group-item">
              <label htmlFor="skinType">Type de Peau</label>
              <select id="skinType" name="skinType" value={form.skinType} onChange={handleChange}>
                <option value="Sèche">Sèche</option>
                <option value="Mixte">Mixte</option>
                <option value="Grasse">Grasse</option>
                <option value="Sensible">Sensible</option>
                <option value="Normale">Normale</option>
              </select>
            </div>

            <div className="form-group-item">
              <label htmlFor="hairType">Routine Capillaire</label>
              <select id="hairType" name="hairType" value={form.hairType} onChange={handleChange}>
                <option value="Crépus">Crépus (Type 4)</option>
                <option value="Frisés">Frisés / Bouclés</option>
                <option value="Défrisés">Défrisés / Lisses</option>
                <option value="Locks">Locks / Nattes</option>
              </select>
            </div>

            <div className="form-group-item">
              <label htmlFor="favoriteBrand">Maison de Beauté Favorite</label>
              <select id="favoriteBrand" name="favoriteBrand" value={form.favoriteBrand} onChange={handleChange}>
                <option value="Christian Dior Prestige">Christian Dior Prestige</option>
                <option value="Gucci Beauty">Gucci Beauty</option>
                <option value="Fenty Beauty">Fenty Beauty by Rihanna</option>
                <option value="Guerlain">Guerlain Paris</option>
                <option value="La Roche-Posay">La Roche-Posay</option>
              </select>
            </div>
          </div>
        </article>

        {/* CARD 3: Sécurité & Mot de Passe */}
        <article className="order-card-luxury" style={{ background: "#ffffff", border: "1px solid #e3dcd5", padding: "30px 35px" }}>
          <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #efe8e1" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", color: "#8738ce", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
              SÉCURITÉ DU COMPTE
            </span>
            <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "22px", margin: 0, color: "#1a1412", fontWeight: "400" }}>
              Modification du Mot de Passe
            </h3>
          </div>

          <div className="form-grid-2col">
            <div className="form-group-item">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
              />
            </div>

            <div className="form-group-item">
              <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
              />
            </div>
          </div>
        </article>

        {/* CARD 4: Préférences & Notifications */}
        <article className="order-card-luxury" style={{ background: "#ffffff", border: "1px solid #e3dcd5", padding: "30px 35px" }}>
          <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #efe8e1" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", color: "#8738ce", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
              COMMUNICATION
            </span>
            <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "22px", margin: 0, color: "#1a1412", fontWeight: "400" }}>
              Préférences de Notification & Suivi Colis
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", fontSize: "14px", color: "#4a3e50" }}>
              <input
                type="checkbox"
                name="notificationsEmail"
                checked={form.notificationsEmail}
                onChange={handleChange}
                style={{ width: "18px", height: "18px", accentColor: "#8738ce" }}
              />
              <span>Recevoir les invitations ventes privées et conseils beauté par e-mail</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", fontSize: "14px", color: "#4a3e50" }}>
              <input
                type="checkbox"
                name="notificationsWhatsapp"
                checked={form.notificationsWhatsapp}
                onChange={handleChange}
                style={{ width: "18px", height: "18px", accentColor: "#8738ce" }}
              />
              <span>Recevoir le suivi en direct de vos colis à Douala / Yaoundé sur WhatsApp</span>
            </label>
          </div>
        </article>

        {/* Submit Action Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <button type="submit" className="dior-btn-primary" style={{ height: "48px", padding: "0 36px" }}>
            <Save width={16} height={16} /> SAUVEGARDER LES MODIFICATIONS
          </button>
        </div>

      </form>
    </AccountShell>
  );
}

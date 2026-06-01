import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PRODUCTS = [
  // ── AI TOOLS ──
  {
    id: 7,
    title: "CapCut Pro Template Pack",
    category: "AI Tools",
    price: 49000,
    originalPrice: 129000,
    rating: 4.9,
    sales: 8700,
    image: "🎬",
    badge: "BESTSELLER",
    description: "500+ template CapCut viral: Reels, TikTok, YouTube Shorts. Tinggal ganti teks & export!",
    tags: ["CapCut", "Video", "TikTok"],
    seller: "Lucky.Store",
  },
  {
    id: 8,
    title: "ChatGPT Prompt Masterpack",
    category: "AI Tools",
    price: 89000,
    originalPrice: 249000,
    rating: 4.9,
    sales: 5400,
    image: "🤖",
    badge: "HOT",
    description: "1000+ prompt ChatGPT/GPT-4 untuk bisnis, copywriting, coding, dan konten viral.",
    tags: ["ChatGPT", "GPT-4", "Prompt"],
    seller: "Lucky.Store",
  },
  {
    id: 9,
    title: "Gemini AI Workflow Kit",
    category: "AI Tools",
    price: 79000,
    originalPrice: 199000,
    rating: 4.8,
    sales: 2300,
    image: "💎",
    badge: "NEW",
    description: "Panduan & template lengkap pakai Google Gemini untuk produktivitas, riset, dan bisnis.",
    tags: ["Gemini", "Google AI", "Workflow"],
    seller: "Lucky.Store",
  },
  {
    id: 10,
    title: "Claude AI Prompt Bible",
    category: "AI Tools",
    price: 99000,
    originalPrice: 279000,
    rating: 5.0,
    sales: 1800,
    image: "🧠",
    badge: "HOT",
    description: "200+ prompt Claude terbaik untuk analisis, penulisan, coding, dan otomasi bisnis profesional.",
    tags: ["Claude", "Anthropic", "Prompt"],
    seller: "Lucky.Store",
  },
  {
    id: 11,
    title: "AI Tools Bundle — Semua Dalam 1",
    category: "AI Tools",
    price: 199000,
    originalPrice: 699000,
    rating: 5.0,
    sales: 3200,
    image: "🚀",
    badge: "BESTSELLER",
    description: "Paket lengkap: CapCut + GPT + Gemini + Claude. Hemat 71%! Cocok untuk kreator & pebisnis.",
    tags: ["Bundle", "AI", "All-in-One"],
    seller: "Lucky.Store",
  },
  {
    id: 12,
    title: "CapCut Efek Cinematic Pack",
    category: "AI Tools",
    price: 39000,
    originalPrice: 99000,
    rating: 4.7,
    sales: 6100,
    image: "🎥",
    badge: null,
    description: "100+ efek cinematic & transisi premium CapCut. Buat video terlihat seperti film Hollywood.",
    tags: ["CapCut", "Cinematic", "Efek"],
    seller: "Lucky.Store",
  },
  // ── ORIGINAL ──
  {
    id: 1,
    title: "UI Kit Pro 2025",
    category: "Design",
    price: 149000,
    originalPrice: 299000,
    rating: 4.9,
    sales: 1240,
    image: "🎨",
    badge: null,
    description: "500+ komponen Figma siap pakai untuk web & mobile modern.",
    tags: ["Figma", "UI", "Components"],
    seller: "Lucky.Store",
  },
  {
    id: 2,
    title: "SEO Masterclass Course",
    category: "Course",
    price: 199000,
    originalPrice: 499000,
    rating: 4.8,
    sales: 876,
    image: "📈",
    badge: null,
    description: "Kuasai SEO dari nol hingga rank #1 Google dalam 30 hari.",
    tags: ["SEO", "Marketing", "Google"],
    seller: "Lucky.Store",
  },
  {
    id: 3,
    title: "Next.js SaaS Boilerplate",
    category: "Template",
    price: 349000,
    originalPrice: 699000,
    rating: 5.0,
    sales: 432,
    image: "⚡",
    badge: null,
    description: "Starter kit lengkap: auth, payment, dashboard, dan API.",
    tags: ["Next.js", "SaaS", "React"],
    seller: "Lucky.Store",
  },
  {
    id: 4,
    title: "Social Media Pack",
    category: "Design",
    price: 79000,
    originalPrice: 149000,
    rating: 4.7,
    sales: 2100,
    image: "✨",
    badge: null,
    description: "1000+ template Instagram, TikTok & LinkedIn siap edit.",
    tags: ["Instagram", "TikTok", "Canva"],
    seller: "Lucky.Store",
  },
  {
    id: 5,
    title: "Python Automation Scripts",
    category: "Script",
    price: 129000,
    originalPrice: 249000,
    rating: 4.6,
    sales: 654,
    image: "🤖",
    badge: null,
    description: "50+ script otomasi bisnis: scraping, email, spreadsheet.",
    tags: ["Python", "Automation", "Script"],
    seller: "Lucky.Store",
  },
  {
    id: 6,
    title: "Notion Business OS",
    category: "Template",
    price: 89000,
    originalPrice: 179000,
    rating: 4.9,
    sales: 3400,
    image: "📋",
    badge: null,
    description: "Sistem manajemen bisnis lengkap di Notion untuk startup.",
    tags: ["Notion", "Productivity", "Business"],
    seller: "Lucky.Store",
  },
];

const CATEGORIES = ["Semua", "AI Tools", "Design", "Course", "Template", "Script"];

// ─── UTILS ──────────────────────────────────────────────────────────────────
const formatPrice = (n) =>
  "Rp " + n.toLocaleString("id-ID");

const discount = (orig, curr) =>
  Math.round(((orig - curr) / orig) * 100);

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: "12px", letterSpacing: "1px" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#64748b", marginLeft: 4, fontFamily: "monospace" }}>
        {rating}
      </span>
    </span>
  );
}

function Badge({ text }) {
  const colors = {
    BESTSELLER: { bg: "#fef3c7", color: "#92400e", border: "#fbbf24" },
    HOT: { bg: "#fee2e2", color: "#991b1b", border: "#f87171" },
    NEW: { bg: "#d1fae5", color: "#065f46", border: "#34d399" },
  };
  const c = colors[text] || { bg: "#e0e7ff", color: "#3730a3", border: "#818cf8" };
  return (
    <span style={{
      background: c.bg, color: c.color,
      border: `1px solid ${c.border}`,
      borderRadius: 4, padding: "2px 8px",
      fontSize: 10, fontWeight: 700, letterSpacing: 1,
    }}>
      {text}
    </span>
  );
}

function ProductCard({ product, onBuy, onCart }) {
  const [hover, setHover] = useState(false);
  const disc = discount(product.originalPrice, product.price);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#0f172a" : "#1e293b",
        border: `1px solid ${hover ? "#6366f1" : "#334155"}`,
        borderRadius: 16,
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 20px 40px rgba(99,102,241,0.2)" : "none",
        display: "flex", flexDirection: "column", gap: 12,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Glow accent */}
      {hover && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
        }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          fontSize: 40, lineHeight: 1,
          background: "#0f172a", borderRadius: 12,
          padding: "12px 16px",
        }}>
          {product.image}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          {product.badge && <Badge text={product.badge} />}
          <span style={{
            background: "#312e81", color: "#a5b4fc",
            borderRadius: 6, padding: "2px 8px",
            fontSize: 11, fontWeight: 600,
          }}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          margin: 0, color: "#f1f5f9", fontSize: 16, fontWeight: 700,
          fontFamily: "'Playfair Display', Georgia, serif",
          lineHeight: 1.3,
        }}>
          {product.title}
        </h3>
        <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>
          {product.description}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {product.tags.map(t => (
          <span key={t} style={{
            background: "#0f172a", color: "#64748b",
            border: "1px solid #334155",
            borderRadius: 4, padding: "2px 8px", fontSize: 11,
          }}>
            #{t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <StarRating rating={product.rating} />
        <span style={{ color: "#64748b", fontSize: 12 }}>
          {product.sales.toLocaleString("id-ID")} terjual
        </span>
      </div>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
        <span style={{ color: "#6366f1", fontSize: 20, fontWeight: 800 }}>
          {formatPrice(product.price)}
        </span>
        <span style={{
          color: "#475569", fontSize: 13, textDecoration: "line-through",
        }}>
          {formatPrice(product.originalPrice)}
        </span>
        <span style={{
          background: "#4ade80", color: "#052e16",
          borderRadius: 4, padding: "1px 6px", fontSize: 11, fontWeight: 700,
        }}>
          -{disc}%
        </span>
      </div>

      {/* Seller */}
      <div style={{ color: "#64748b", fontSize: 12 }}>
        by <span style={{ color: "#94a3b8" }}>{product.seller}</span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button
          onClick={() => onBuy(product)}
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", border: "none",
            borderRadius: 10, padding: "10px 0",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.target.style.opacity = 0.85}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          Beli Sekarang
        </button>
        <button
          onClick={() => onCart(product)}
          style={{
            width: 44,
            background: "#1e293b", color: "#94a3b8",
            border: "1px solid #334155",
            borderRadius: 10, fontSize: 18, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#6366f1"; e.target.style.color = "#6366f1"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#334155"; e.target.style.color = "#94a3b8"; }}
          title="Tambah ke keranjang"
        >
          🛒
        </button>
      </div>
    </div>
  );
}

// QRIS Payment Modal
function QRISModal({ total, onClose, onConfirm }) {
  const [step, setStep] = useState("qris"); // qris | confirm | success
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("62813***1785");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === "success") {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 1100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
      }}>
        <div style={{
          background: "#0f172a", borderRadius: 20,
          border: "1px solid #22c55e",
          padding: "48px 40px", textAlign: "center",
          maxWidth: 360, width: "90%",
          animation: "fadeUp 0.3s ease",
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#f1f5f9", fontSize: 22, marginBottom: 8,
          }}>Pembayaran Dikonfirmasi!</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>
            Terima kasih! Sekarang hubungi Lucky via WhatsApp untuk mendapatkan produkmu. 👇
          </p>
          <a
            href="https://wa.me/6281393517851?text=Halo%20Lucky!%20Saya%20sudah%20bayar%20di%20Lucky.Store.%20Mohon%20kirimkan%20produknya%20ya%20🙏"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", width: "100%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff", borderRadius: 12,
              padding: "14px 0", fontWeight: 800,
              fontSize: 15, textDecoration: "none",
              textAlign: "center", marginBottom: 10,
            }}
          >
            💬 Chat WhatsApp Lucky Sekarang
          </a>
          <button onClick={onConfirm} style={{
            background: "transparent",
            color: "#64748b", border: "1px solid #334155", borderRadius: 12,
            padding: "10px 32px", fontWeight: 600, fontSize: 13,
            cursor: "pointer", width: "100%",
          }}>
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.75)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20,
        padding: "32px 28px", width: "90%", maxWidth: 360,
        textAlign: "center", color: "#0f172a",
        animation: "fadeUp 0.3s ease",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "#f1f5f9", border: "none",
          borderRadius: 8, width: 32, height: 32,
          cursor: "pointer", fontSize: 16, color: "#64748b",
        }}>✕</button>

        {/* Header QRIS */}
        <div style={{
          background: "#e0e7ff", borderRadius: 12,
          padding: "8px 16px", marginBottom: 16,
          display: "inline-block",
        }}>
          <span style={{ fontWeight: 800, fontSize: 13, color: "#3730a3", letterSpacing: 2 }}>
            QR PROFIL
          </span>
        </div>

        {/* Nama penerima */}
        <div style={{
          fontWeight: 800, fontSize: 18, color: "#1e293b", marginBottom: 4,
          fontFamily: "'Playfair Display', serif",
        }}>
          LUCKY
        </div>
        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
          62-813***1785
        </div>

        {/* DANA Payment Box */}
        <div style={{
          background: "#f0f7ff", border: "2px solid #118EEA",
          borderRadius: 16, padding: 20, marginBottom: 16,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        }}>
          <div style={{
            background: "#118EEA", borderRadius: 12,
            padding: "6px 20px",
            color: "#fff", fontWeight: 900,
            fontSize: 20, letterSpacing: 2,
          }}>
            DANA
          </div>
          <div style={{ fontSize: 13, color: "#1e293b", fontWeight: 600, textAlign: "center" }}>
            Klik tombol di bawah untuk bayar langsung via DANA
          </div>
          <a
            href="https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012012025102319430135"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", width: "100%",
              background: "linear-gradient(135deg, #118EEA, #0070CC)",
              color: "#fff", borderRadius: 12,
              padding: "14px 0", fontWeight: 800,
              fontSize: 15, textDecoration: "none",
              textAlign: "center",
            }}
          >
            💙 Bayar via DANA Sekarang
          </a>
          <div style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>
            Akan membuka aplikasi DANA / browser<br/>
            Penerima: <strong>LUCKY • 0813-9351-785</strong>
          </div>
          <div style={{
            background: "#1e40af", borderRadius: 8,
            padding: "3px 14px",
            color: "#fff", fontWeight: 800,
            fontSize: 11, letterSpacing: 2,
          }}>
            QRIS
          </div>
        </div>

        {/* Total */}
        <div style={{
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: 10, padding: "10px 16px",
          marginBottom: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: "#15803d", fontSize: 13, fontWeight: 600 }}>Total Bayar</span>
          <span style={{ color: "#15803d", fontWeight: 800, fontSize: 16 }}>
            {formatPrice(total)}
          </span>
        </div>

        <p style={{ color: "#64748b", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
          Scan QR di atas menggunakan aplikasi e-wallet atau mobile banking kamu.
          Setelah transfer, klik tombol di bawah.
        </p>

        <button
          onClick={() => setStep("success")}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff", border: "none", borderRadius: 12,
            padding: "14px 0", fontWeight: 700, fontSize: 15,
            cursor: "pointer",
          }}
        >
          ✅ Saya Sudah Bayar
        </button>

        <p style={{ marginTop: 12, fontSize: 11, color: "#94a3b8" }}>
          Butuh bantuan? WhatsApp: <strong>0813-9351-785</strong>
        </p>
      </div>
    </div>
  );
}

function CartPanel({ cart, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [showQRIS, setShowQRIS] = useState(false);

  return (
    <>
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0,
      width: 360, background: "#0f172a",
      borderLeft: "1px solid #334155",
      zIndex: 1000, padding: 24,
      display: "flex", flexDirection: "column", gap: 16,
      overflowY: "auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, color: "#f1f5f9", fontFamily: "'Playfair Display', serif" }}>
          Keranjang 🛒
        </h2>
        <button onClick={onClose} style={{
          background: "#1e293b", border: "1px solid #334155",
          color: "#94a3b8", borderRadius: 8, width: 36, height: 36,
          fontSize: 18, cursor: "pointer",
        }}>✕</button>
      </div>

      {cart.length === 0 ? (
        <div style={{ color: "#64748b", textAlign: "center", marginTop: 40, fontSize: 14 }}>
          Keranjang kosong
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{
              background: "#1e293b", borderRadius: 12,
              padding: 16, border: "1px solid #334155",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 28 }}>{item.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600 }}>{item.title}</div>
                  <div style={{ color: "#6366f1", fontSize: 13, fontWeight: 700 }}>
                    {formatPrice(item.price)}
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} style={{
                  background: "none", border: "none", color: "#ef4444",
                  cursor: "pointer", fontSize: 16,
                }}>🗑</button>
              </div>
            </div>
          ))}

          <div style={{
            borderTop: "1px solid #334155", paddingTop: 16,
            marginTop: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#94a3b8" }}>Total</span>
              <span style={{ color: "#6366f1", fontWeight: 800, fontSize: 18 }}>
                {formatPrice(total)}
              </span>
            </div>

            {/* Payment methods */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>Metode Pembayaran:</div>
              <div style={{
                background: "#1e3a5f", border: "2px solid #2563eb",
                borderRadius: 10, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 10,
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 20 }}>📱</span>
                <div>
                  <div style={{ color: "#93c5fd", fontWeight: 700, fontSize: 13 }}>QRIS</div>
                  <div style={{ color: "#64748b", fontSize: 11 }}>Semua e-wallet & m-banking</div>
                </div>
                <div style={{
                  marginLeft: "auto",
                  background: "#2563eb", borderRadius: 6,
                  padding: "2px 8px", fontSize: 11, color: "#fff", fontWeight: 700,
                }}>✓</div>
              </div>
            </div>

            <button onClick={() => setShowQRIS(true)} style={{
              width: "100%",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff", border: "none", borderRadius: 12,
              padding: "14px 0", fontWeight: 700, fontSize: 15,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <span>📱</span> Bayar via QRIS →
            </button>
          </div>
        </>
      )}
    </div>

    {showQRIS && (
      <QRISModal
        total={total}
        onClose={() => setShowQRIS(false)}
        onConfirm={() => { setShowQRIS(false); onCheckout(); }}
      />
    )}
    </>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: "translateX(-50%)",
      background: "#1e293b", border: "1px solid #6366f1",
      color: "#f1f5f9", borderRadius: 12,
      padding: "12px 24px", fontSize: 14, fontWeight: 600,
      zIndex: 2000, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "fadeUp 0.3s ease",
    }}>
      {message}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("popular");

  const showToast = (msg) => setToast(msg);

  const filtered = PRODUCTS
    .filter(p =>
      (category === "Semua" || p.category === category) &&
      (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) ||
       p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.sales - a.sales;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ ${product.title} ditambahkan ke keranjang`);
  };

  const handleBuy = (product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    showToast("🎉 Pesanan berhasil! Cek email untuk download link.");
    setCart([]);
    setCartOpen(false);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#f1f5f9",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(34,197,94,0.4); transform: scale(1); }
          50% { box-shadow: 0 8px 48px rgba(34,197,94,0.7); transform: scale(1.08); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        padding: "0 32px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 900,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            DigiMarket
          </span>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "#64748b", fontSize: 13 }}>
            {PRODUCTS.length} produk tersedia
          </span>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: cart.length > 0
                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                : "#1e293b",
              border: "1px solid #334155",
              color: "#fff", borderRadius: 10,
              padding: "8px 16px", cursor: "pointer",
              fontWeight: 700, fontSize: 14,
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
          >
            🛒 {cartCount > 0 && (
              <span style={{
                background: "#ef4444", color: "#fff",
                borderRadius: 10, padding: "1px 7px",
                fontSize: 12, fontWeight: 700,
              }}>{cartCount}</span>
            )}
            Keranjang
          </button>
          <button style={{
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#94a3b8", borderRadius: 10,
            padding: "8px 16px", cursor: "pointer",
            fontSize: 14,
          }}>
            Jual Produk +
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1040 50%, #0f172a 100%)",
        padding: "60px 32px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 20, padding: "4px 16px",
            fontSize: 13, color: "#a5b4fc", marginBottom: 16,
          }}>
            🔥 Flash Sale — Hemat hingga 70%!
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, lineHeight: 1.15,
            background: "linear-gradient(135deg, #f1f5f9 30%, #a5b4fc 70%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}>
            Produk Digital Terbaik<br />untuk Bisnismu
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Template, kursus, skrip, dan aset digital premium.<br />
            Download instan setelah pembayaran.
          </p>
          {/* Search */}
          <div style={{
            display: "flex", maxWidth: 480, margin: "0 auto",
            background: "#1e293b", border: "1px solid #334155",
            borderRadius: 14, overflow: "hidden",
          }}>
            <span style={{ padding: "0 16px", color: "#64748b", fontSize: 18, display: "flex", alignItems: "center" }}>🔍</span>
            <input
              type="text"
              placeholder="Cari template, kursus, skrip..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, background: "none", border: "none",
                color: "#f1f5f9", padding: "14px 0",
                fontSize: 14, outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{
        padding: "20px 32px",
        background: "#0a0f1a",
        borderBottom: "1px solid #1e293b",
        display: "flex", gap: 12, alignItems: "center",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: 8, flex: 1, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                background: category === cat
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "#1e293b",
                color: category === cat ? "#fff" : "#94a3b8",
                border: `1px solid ${category === cat ? "transparent" : "#334155"}`,
                borderRadius: 8, padding: "6px 16px",
                fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            background: "#1e293b", color: "#94a3b8",
            border: "1px solid #334155", borderRadius: 8,
            padding: "6px 12px", fontSize: 13, cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="popular">Terpopuler</option>
          <option value="rating">Rating Tertinggi</option>
          <option value="price-asc">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
        </select>
      </div>

      {/* STATS BAR */}
      <div style={{
        padding: "16px 32px",
        display: "flex", gap: 32,
        background: "#0a0f1a",
        borderBottom: "1px solid #1e293b",
      }}>
        {[
          { label: "Total Produk", value: "50+", icon: "📦" },
          { label: "Pembeli Aktif", value: "12.400+", icon: "👥" },
          { label: "Produk Terjual", value: "28.600+", icon: "💰" },
          { label: "Rating Rata-rata", value: "4.8★", icon: "⭐" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span>{s.icon}</span>
            <div>
              <div style={{ color: "#6366f1", fontWeight: 800, fontSize: 16 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 20, color: "#64748b", fontSize: 14 }}>
          Menampilkan <strong style={{ color: "#94a3b8" }}>{filtered.length}</strong> produk
          {search && <> untuk "<strong style={{ color: "#a5b4fc" }}>{search}</strong>"</>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#475569" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div>Produk tidak ditemukan</div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
                onCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* SELL CTA */}
      <div style={{
        margin: "0 32px 48px",
        maxWidth: 1136, marginLeft: "auto", marginRight: "auto",
        background: "linear-gradient(135deg, #1e1040, #0f172a)",
        border: "1px solid #334155",
        borderRadius: 20, padding: "40px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 24,
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, color: "#f1f5f9", marginBottom: 8,
          }}>
            Punya produk digital? Jual di sini 🚀
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>
            Raih passive income. Komisi hanya 5%, pembayaran otomatis setiap minggu.
          </p>
        </div>
        <button style={{
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          color: "#fff", border: "none",
          borderRadius: 12, padding: "14px 32px",
          fontWeight: 700, fontSize: 16, cursor: "pointer",
          whiteSpace: "nowrap",
        }}>
          Mulai Jual Sekarang →
        </button>
      </div>

      {/* CART PANEL */}
      {cartOpen && (
        <>
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />
          <CartPanel
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        </>
      )}

      {/* TOAST */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* FLOATING WA BUTTON */}
      <a
        href="https://wa.me/6281393517851?text=Halo%20Lucky!%20Saya%20mau%20tanya%20tentang%20produk%20di%20Lucky.Store%20🙏"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28,
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          color: "#fff", borderRadius: 50,
          width: 60, height: 60,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, textDecoration: "none",
          boxShadow: "0 8px 32px rgba(34,197,94,0.4)",
          zIndex: 500,
          animation: "waPulse 2s infinite",
        }}
        title="Chat WhatsApp Lucky"
      >
        💬
      </a>
    </div>
  );
}

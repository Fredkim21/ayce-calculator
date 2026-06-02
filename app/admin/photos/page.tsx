"use client";
import { useState, useRef } from "react";
import rawData from "@/data/ayce-data.json";

type Item = {
  id: string;
  name: string;
  koreanName?: string;
  japaneseName?: string;
  image: string;
  photoLock: number;
  photoUrl?: string;
  tier: string;
};

type Row = {
  section: string;
  catName: string;
  catEmoji: string;
  item: Item;
};

function getAllRows(): Row[] {
  const rows: Row[] = [];
  for (const [section, val] of Object.entries(rawData) as any[]) {
    for (const cat of val.categories) {
      for (const item of cat.items) {
        rows.push({ section, catName: cat.name, catEmoji: cat.emoji, item });
      }
    }
  }
  return rows;
}

const ALL_ROWS = getAllRows();

function flickrUrl(image: string, lock: number) {
  return `https://loremflickr.com/400/300/${encodeURIComponent(image)}/all?lock=${lock}`;
}

async function savePhoto(itemId: string, payload: { photoLock?: number; photoUrl?: string | null; keywords?: string }) {
  await fetch("/api/save-photo-lock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, ...payload }),
  });
}

function PhotoCard({ row }: { row: Row }) {
  const [lock, setLock] = useState(row.item.photoLock ?? 1);
  const [keywords, setKeywords] = useState(row.item.image);
  const [customUrl, setCustomUrl] = useState(row.item.photoUrl ?? "");
  const [previewUrl, setPreviewUrl] = useState(
    row.item.photoUrl || flickrUrl(row.item.image, row.item.photoLock ?? 1)
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [imgError, setImgError] = useState(false);
  const [mode, setMode] = useState<"search" | "url">(row.item.photoUrl ? "url" : "search");

  const isCustom = mode === "url" && !!customUrl.trim();

  function search() {
    const kw = keywords.trim();
    if (!kw) return;
    setLock(0);
    setPreviewUrl(flickrUrl(kw, 0) + `&t=${Date.now()}`);
    setImgError(false);
    setStatus("idle");
  }

  function cycleFlickr(delta: number) {
    const next = ((lock + delta) % 9973 + 9973) % 9973;
    setLock(next);
    setPreviewUrl(flickrUrl(keywords, next) + `&t=${Date.now()}`);
    setImgError(false);
    setStatus("idle");
  }

  function applyUrl() {
    const url = customUrl.trim();
    if (!url) return;
    setPreviewUrl(url);
    setImgError(false);
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    if (isCustom) {
      await savePhoto(row.item.id, { photoUrl: customUrl.trim(), keywords });
    } else {
      await savePhoto(row.item.id, { photoLock: lock, photoUrl: null, keywords });
    }
    setStatus("saved");
  }

  const subtitle = row.item.koreanName ?? row.item.japaneseName;

  return (
    <div className={`rounded-xl overflow-hidden border flex flex-col bg-[#242424] ${status === "saved" ? "border-emerald-500/70" : "border-[#333]"}`}>

      {/* Preview */}
      <div className="relative bg-[#111]" style={{ height: 150 }}>
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#555] text-xs gap-1 px-2 text-center">
            <span className="text-2xl">🚫</span>
            <span>No results — try different keywords</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={row.item.name} onError={() => setImgError(true)} className="w-full h-full object-cover" />
        )}
        {isCustom && <span className="absolute top-1 left-1 bg-[#e85d04] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">URL</span>}
        {status === "saved" && <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">✓</span>}
        {!isCustom && <span className="absolute bottom-1 right-1 bg-black/60 text-[9px] text-[#888] px-1.5 py-0.5 rounded">#{lock}</span>}
      </div>

      <div className="p-2.5 flex flex-col gap-2 flex-1">
        {/* Item name */}
        <div>
          <div className="text-xs font-semibold text-[#f5f0eb] leading-tight truncate">{row.item.name}</div>
          {subtitle && <div className="text-[10px] text-[#666]">{subtitle}</div>}
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-lg overflow-hidden border border-[#333] text-[10px] font-semibold">
          <button onClick={() => setMode("search")} className={`flex-1 py-1 transition-colors ${mode === "search" ? "bg-[#333] text-white" : "text-[#555] hover:text-[#888]"}`}>
            🔍 Search
          </button>
          <button onClick={() => setMode("url")} className={`flex-1 py-1 transition-colors ${mode === "url" ? "bg-[#333] text-white" : "text-[#555] hover:text-[#888]"}`}>
            🔗 Paste URL
          </button>
        </div>

        {mode === "search" ? (
          <>
            {/* Keyword editor */}
            <div className="flex gap-1">
              <input
                value={keywords}
                onChange={(e) => { setKeywords(e.target.value); setStatus("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="e.g. kbbq,sliced,a5,wagyu,raw"
                className="flex-1 min-w-0 bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2 py-1 text-[11px] text-white placeholder-[#444] focus:outline-none focus:border-[#e85d04]"
              />
              <button onClick={search} className="px-2 py-1 rounded bg-[#333] text-white text-xs hover:bg-[#444]" title="Search">↵</button>
            </div>
            <p className="text-[10px] text-[#555] -mt-1">Comma-separated Flickr tags. Press Enter or ↵ to search.</p>

            {/* Cycle through results */}
            <div className="flex gap-1 items-center">
              <button onClick={() => cycleFlickr(-1)} className="w-7 h-7 rounded bg-[#333] text-white hover:bg-[#444] text-base leading-none">‹</button>
              <span className="text-[10px] text-[#555] flex-1 text-center">cycle results</span>
              <button onClick={() => cycleFlickr(1)}  className="w-7 h-7 rounded bg-[#333] text-white hover:bg-[#444] text-base leading-none">›</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-1">
              <input
                value={customUrl}
                onChange={(e) => { setCustomUrl(e.target.value); setStatus("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && applyUrl()}
                placeholder="Paste direct image URL…"
                className="flex-1 min-w-0 bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2 py-1 text-[11px] text-white placeholder-[#444] focus:outline-none focus:border-[#e85d04]"
              />
              {customUrl && <button onClick={applyUrl} className="px-2 py-1 rounded bg-[#333] text-white text-xs hover:bg-[#444]">↵</button>}
            </div>
            <p className="text-[10px] text-[#555] -mt-1">Right-click any online image → "Copy image address"</p>
          </>
        )}

        {/* Save */}
        <button
          onClick={save}
          disabled={status === "saving"}
          className={`w-full py-1.5 rounded text-xs font-semibold transition-colors mt-auto ${
            status === "saved" ? "bg-emerald-700/50 text-emerald-300" : "bg-[#e85d04] text-white hover:bg-[#f48c06]"
          }`}
        >
          {status === "saving" ? "Saving…" : status === "saved" ? "✓ Saved" : "Save Photo"}
        </button>
      </div>
    </div>
  );
}

const SECTIONS = ["all", "kbbq", "hotpot", "sushi"] as const;

export default function AdminPhotosPage() {
  const [activeSection, setActiveSection] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_ROWS.filter((r) => {
    if (activeSection !== "all" && r.section !== activeSection) return false;
    if (search && !r.item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const groups: { label: string; rows: Row[] }[] = [];
  for (const row of filtered) {
    const label = `${row.section} · ${row.catEmoji} ${row.catName}`;
    const last = groups[groups.length - 1];
    if (last?.label === label) last.rows.push(row);
    else groups.push({ label, rows: [row] });
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#1e1e1e] border-b border-[#2d2d2d] px-5 py-3 flex flex-wrap items-center gap-3">
        <span className="font-bold text-[#f48c06]">Photo Picker</span>

        <div className="flex gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${activeSection === s ? "bg-[#e85d04] text-white" : "bg-[#2d2d2d] text-[#888] hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="ml-auto bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg px-3 py-1 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#e85d04] w-40"
        />

        <span className="text-xs text-[#555]">{filtered.length} items</span>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-5 pt-4 pb-1">
        <div className="bg-[#242424] border border-[#333] rounded-xl px-4 py-3 text-sm text-[#888] flex flex-wrap gap-x-6 gap-y-1">
          <span>🔍 <strong className="text-[#aaa]">Search mode</strong> — edit keywords (e.g. <code className="text-[#f48c06]">kbbq,sliced,a5,wagyu,raw</code>), hit Enter, then ‹ › to cycle Flickr results</span>
          <span>🔗 <strong className="text-[#aaa]">URL mode</strong> — right-click any image online → "Copy image address", paste it in</span>
          <span>💾 <strong className="text-[#aaa]">Save</strong> writes keywords + chosen photo to the data file</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 py-5 space-y-8 max-w-7xl mx-auto">
        {groups.map((g) => (
          <div key={g.label}>
            <h2 className="text-xs font-semibold text-[#666] uppercase tracking-widest mb-3">{g.label}</h2>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))" }}>
              {g.rows.map((row) => (
                <PhotoCard key={row.item.id} row={row} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

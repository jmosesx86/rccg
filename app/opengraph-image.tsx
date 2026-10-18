import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { church, services } from "@/lib/church";
import { formatServiceTime } from "@/lib/schedule";

export const alt = `${church.name} Nashville — ${church.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded share card used when the site is posted on social media. */
export default async function OpengraphImage() {
  const [photo, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/img01.jpg")),
    readFile(join(process.cwd(), "public/logo.png")),
  ]);
  const src = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: "#050e1f" }}>
        <img src={src(photo, "image/jpeg")} alt="" width={1200} height={630} style={{ position: "absolute", objectFit: "cover", opacity: 0.35 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(5,14,31,0.98) 0%, rgba(5,14,31,0.75) 60%, rgba(191,10,48,0.45) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", position: "relative", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={src(logo, "image/png")} alt="" width={84} height={84} style={{ borderRadius: 84, background: "white" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 700 }}>{church.name}</span>
              <span style={{ fontSize: 20, letterSpacing: 6, color: "#e4c77d" }}>NASHVILLE, TENNESSEE</span>
            </div>
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, marginTop: 50, lineHeight: 1.05 }}>A house of love.</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, color: "#e4c77d" }}>A people of purpose.</div>
          <div style={{ fontSize: 28, marginTop: 36, color: "rgba(255,255,255,0.8)" }}>
            {`Sundays ${formatServiceTime(services[0])} · ${church.address.full}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}

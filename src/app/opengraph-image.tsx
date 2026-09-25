import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fraunces = await readFile(join(process.cwd(), "src/app/og-assets/fraunces-og.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#faf9f6",
          backgroundImage: "radial-gradient(circle at 1px 1px, #cfcbc1 1.5px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 34,
            fontWeight: 600,
            color: "#0a626a",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              border: "3px solid #0a626a",
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            {"</>"}
          </div>
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 60,
            lineHeight: 1.15,
            fontFamily: "Fraunces",
            fontWeight: 500,
            color: "#14181f",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 500 }] },
  );
}

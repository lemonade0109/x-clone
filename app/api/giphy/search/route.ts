import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey =
    process.env.GIPHY_API_KEY || process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limit = req.nextUrl.searchParams.get("limit") ?? "20";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GIPHY_API_KEY" },
      { status: 500 },
    );
  }

  if (!q) {
    return NextResponse.json({ data: [] });
  }

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(
    apiKey,
  )}&q=${encodeURIComponent(q)}&limit=${encodeURIComponent(limit)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: `Giphy error ${res.status}`, raw: text },
        { status: 502 },
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to reach Giphy" },
      { status: 502 },
    );
  }
}

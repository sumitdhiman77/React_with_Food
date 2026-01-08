export default async function handler(req, res) {
  const ALLOWED_ORIGIN =
    process.env.NODE_ENV === "production"
      ? "https://react-with-food.vercel.app"
      : "*";

  // CORS
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { path, ...query } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Missing path param" });
    }

    const queryString = new URLSearchParams(query).toString();

    // ✅ FIX: do NOT add /dapi again
    const swiggyURL =
      `https://www.swiggy.com/${path}` +
      (queryString ? `?${queryString}` : "");

    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.swiggy.com/",
      },
    });

    const text = await response.text();

    // 🔥 Prevent JSON crash if Swiggy blocks
    if (text.startsWith("<")) {
      throw new Error("Swiggy blocked request (HTML response)");
    }

    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );

    res.status(200).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({
      error: "Proxy failed",
      message: err.message,
    });
  }
}


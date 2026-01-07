export default async function handler(req, res) {
  const ALLOWED_ORIGIN =
    process.env.NODE_ENV === "production"
      ? "https://react-with-food.vercel.app"
      : "*";

  // CORS headers
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

    const swiggyURL =
      `https://www.swiggy.com/dapi/${path}` +
      (queryString ? `?${queryString}` : "");

    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.swiggy.com/",
      },
    });

    const data = await response.json();

    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Proxy failed",
      message: err.message,
    });
  }
}

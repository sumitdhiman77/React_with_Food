export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
      `https://www.swiggy.com/${path}` + (queryString ? `?${queryString}` : "");

    const response = await fetch(swiggyURL, {
      headers: {
        // 1. Critical headers found in the official request
        __fetch_req__: "true",
        platform: "dweb",

        // 2. Matching your actual browser exactly
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",

        // 3. Standard headers
        Accept: "application/json, text/plain, */*",
        Referer: "https://www.swiggy.com",
        Origin: "https://www.swiggy.com",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",

        // 4. The "Last Resort" (Manually copy your aws-waf-token if the above fails)
        // "Cookie": "aws-waf-token=PASTE_YOUR_TOKEN_HERE; _device_id=21586c2f-..."
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Swiggy Original Status:", response.status);
      return res.status(response.status).json({
        error: "Swiggy API request failed",
        status: response.status,
        isHtml: errorText.trim().startsWith("<!DOCTYPE"), // Check if it's a block page
        bodyPreview: errorText.slice(0, 500),
      });
    }
    const text = await response.text();

    let jsonData;
    try {
      jsonData = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "Invalid JSON from Swiggy",
        bodyPreview: text.slice(0, 200),
      });
    }

    const isBlocked = jsonData?.data?.cards?.some(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.seo.widgets.v1.SwiggyNotPresent",
    );

    res.status(200).json({
      blocked: isBlocked,
      data: jsonData,
    });
  } catch (err) {
    res.status(500).json({
      error: "Proxy failed",
      message: err.message,
    });
  }
}

// export default async function handler(req, res) {
//   const ALLOWED_ORIGIN =
//     process.env.NODE_ENV === "production"
//       ? "https://react-with-food.vercel.app"
//       : "*";

//   // CORS
//   res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     const { path, ...query } = req.query;

//     if (!path) {
//       return res.status(400).json({ error: "Missing path param" });
//     }

//     const queryString = new URLSearchParams(query).toString();

//     const swiggyURL =
//       `https://www.swiggy.com/${path}` + (queryString ? `?${queryString}` : "");

//     const response = await fetch(swiggyURL, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
//         Accept: "application/json",
//         Referer: "https://www.swiggy.com/",
//         Origin: "https://www.swiggy.com",
//       },
//     });

//     const jsonData = await response.json();

//     // Detect Swiggy blocking
//     const isBlocked = jsonData?.data?.cards?.some(
//       (c) =>
//         c?.card?.card?.["@type"] ===
//         "type.googleapis.com/swiggy.seo.widgets.v1.SwiggyNotPresent",
//     );

//     res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

//     res.status(200).json({
//       blocked: isBlocked,
//       data: jsonData,
//     });
//   } catch (err) {
//     console.error("Proxy error:", err);
//     res.status(500).json({
//       error: "Proxy failed",
//       message: err.message,
//     });
//   }
// }

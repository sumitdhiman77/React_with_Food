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

    const swiggyURL =
      `https://www.swiggy.com/${path}` + (queryString ? `?${queryString}` : "");

    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "application/json",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });

    // --- CRITICAL FIX START ---
    // Check if the response was successful before attempting to parse as JSON
    if (!response.ok) {
      const errorBody = await response.text(); // Read non-JSON body as text for debugging
      console.error(
        "Swiggy API returned non-OK status:",
        response.status,
        errorBody,
      );
      return res.status(response.status).json({
        error: "Swiggy API request failed",
        status: response.status,
        details: errorBody,
      });
    }
    // --- CRITICAL FIX END ---

    const jsonData = await response.json(); // This line now runs only on successful responses

    // Detect Swiggy blocking
    const isBlocked = jsonData?.data?.cards?.some(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.seo.widgets.v1.SwiggyNotPresent",
    );

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    res.status(200).json({
      blocked: isBlocked,
      data: jsonData,
    });
  } catch (err) {
    console.error("Proxy error:", err);
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

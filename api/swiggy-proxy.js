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
        cookie:
          "__SW=01ByxBgWWiJkxPkV8qFDMS_Ubc3hd5hD; _device_id=21586c2f-0280-981d-9ddf-e8842937269e; fontsLoaded=1; _gcl_au=1.1.1977291906.1769598828; userLocation={%22lat%22:32.2182266%2C%22lng%22:76.3172673%2C%22address%22:%226898+8MV%2C%20Sudher%2C%20Dharamshala%2C%20Himachal%20Pradesh%20176215%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _guest_tid=576ab4d0-6698-4239-b9d6-3682ba83ddc8; _sid=ph16a6fe-c723-4a07-b051-2c0cf74a68fc; _gid=GA1.2.2088096975.1770019393; _gat_0=1; _ga=GA1.1.1397054701.1769598830; _ga_34JYJ0BCRN=GS2.1.s1770019397$o12$g1$t1770027307$j60$l0$h0; _ga_YE38MFJRBZ=GS2.1.s1770019398$o12$g1$t1770027308$j60$l0$h0; aws-waf-token=b57e8fd0-58f3-4404-9790-07751a60c0a8:BQoAs9ZGTsJaAAAA:pFXAwwX1I44LAxRLSUikYVWyAqlgCfmDIInT0neyT0CC8avHSJBOc+Fdgo9NsiltrTFkywUS0zoGgetw8t49jt7BK0eU99MlTE30ZO9IcsSK84e0UVknIwaVDjlc+CHS5drnGT+tqwPov2Xk+Kj41zaiJJxgwfCR5GOpv6SA0xFiWaGOQGw+XyaHFLx8l4OdNlANiQrDWvj0L7jbjBhDvTcHTr9t5jW+66yzEy+XxqLVN4FlOI3dkVDf6Qw=",

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

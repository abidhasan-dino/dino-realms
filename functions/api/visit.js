```javascript
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const username = String(body.username || "").trim();

    if (!username) {
      return Response.json(
        { success: false, error: "Username is required" },
        { status: 400 }
      );
    }

    await env.DB.prepare(
      "INSERT INTO visits (username) VALUES (?)"
    ).bind(username).run();

    const result = await env.DB.prepare(
      "SELECT COUNT(*) AS visits FROM visits"
    ).first();

    return Response.json({
      success: true,
      totalVisits: result?.visits ?? 0
    });
  } catch {
    return Response.json(
      { success: false, error: "Could not record visit" },
      { status: 500 }
    );
  }
}
```

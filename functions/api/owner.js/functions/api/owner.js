```javascript
export async function onRequestGet({ request, env }) {
  const username = new URL(request.url).searchParams.get("username");

  if (!username) {
    return Response.json(
      { success: false, owner: false, error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const account = await env.DB.prepare(
      "SELECT username FROM owner_accounts WHERE username = ? LIMIT 1"
    ).bind(username).first();

    return Response.json({
      success: true,
      owner: Boolean(account)
    });
  } catch {
    return Response.json(
      { success: false, owner: false, error: "Database unavailable" },
      { status: 500 }
    );
  }
}
```

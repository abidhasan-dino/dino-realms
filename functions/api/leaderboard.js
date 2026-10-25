```javascript
export async function onRequestGet({ env }) {
  try {
    const result = await env.DB.prepare(
      "SELECT player_name, MAX(score) AS score FROM scores GROUP BY player_name ORDER BY score DESC LIMIT 100"
    ).all();

    return new Response(JSON.stringify({
      success: true,
      leaderboard: result.results || []
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Leaderboard is unavailable. Check the DB binding and table schema."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
```

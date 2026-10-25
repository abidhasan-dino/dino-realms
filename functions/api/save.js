
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const username = String(body.username || "").trim();
    const saveData = body.saveData;

    if (!username || saveData === undefined) {
      return Response.json(
        {
          success: false,
          error: "Username and saveData are required"
        },
        { status: 400 }
      );
    }

    const serializedData = JSON.stringify(saveData);

    if (serializedData.length > 50000) {
      return Response.json(
        {
          success: false,
          error: "Save data is too large"
        },
        { status: 413 }
      );
    }

    await env.DB.prepare(
      "INSERT INTO player_saves (username, save_data) VALUES (?, ?) ON CONFLICT(username) DO UPDATE SET save_data = excluded.save_data"
    )
      .bind(username, serializedData)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Could not save game data"
      },
      { status: 500 }
    );
  }
}

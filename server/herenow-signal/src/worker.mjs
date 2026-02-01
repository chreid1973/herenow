import { HereNowRoom } from "./room_do.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // WebSocket endpoint: /signal/<room_id>
    const match = url.pathname.match(/^\/signal\/([A-Za-z0-9]{6,64})$/);
    if (!match) return new Response("Not found", { status: 404 });

    // Require WebSocket upgrade
    const upgrade = request.headers.get("Upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const roomId = match[1];
    const id = env.ROOMS.idFromName(roomId);
    const stub = env.ROOMS.get(id);

    // Forward the upgrade request to the Durable Object for this room
    return stub.fetch(request);
  }
};

export { HereNowRoom };

export class HereNowRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.clients = new Set();
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    server.accept();
    this.clients.add(server);

    server.addEventListener("message", (evt) => {
      const data = evt.data;

      // Relay to everyone else in the room (signaling only; no persistence)
      for (const ws of this.clients) {
        if (ws !== server) {
          try { ws.send(data); } catch {}
        }
      }
    });

    const cleanup = () => {
      this.clients.delete(server);
      try { server.close(); } catch {}
    };

    server.addEventListener("close", cleanup);
    server.addEventListener("error", cleanup);

    return new Response(null, { status: 101, webSocket: client });
  }
}

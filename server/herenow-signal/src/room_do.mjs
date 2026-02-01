export class HereNowRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    // DO-managed acceptance (DO will now dispatch to webSocketMessage/Close/Error)
    this.state.acceptWebSocket(server);

    return new Response(null, { status: 101, webSocket: client });
  }

  // Called automatically for DO-managed websockets
  webSocketMessage(sender, message) {
    // Relay to everyone else in the room (signaling only; no persistence)
    const sockets = this.state.getWebSockets();
    for (const ws of sockets) {
      if (ws !== sender) {
        try { ws.send(message); } catch {}
      }
    }
  }

  webSocketClose(ws, code, reason, wasClean) {
    // Nothing to persist; socket is gone.
    try { ws.close(code, reason); } catch {}
  }

  webSocketError(ws, error) {
    // Best-effort cleanup
    try { ws.close(1011, "ws error"); } catch {}
  }
}

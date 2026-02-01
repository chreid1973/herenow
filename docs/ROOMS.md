# HereNow — Rooms (R2: Client-Generated)

This document defines how rooms exist, are identified, joined, and destroyed in HereNow.

Rooms are intentionally ephemeral, non-discoverable, and minimal.

---

## Definition

A **room** is a temporary shared space where participants communicate during an active session.

A room:
- Is identified by a client-generated `room_id`
- Has no owner
- Has no history
- Has no global visibility
- Exists only while participants are connected

If no participants are present, the room does not exist.

---

## Room Identity

### `room_id`

- Generated locally by the client
- Generated **only after** the user explicitly opts in  
  (“Enable chat for this session?”)
- Never requested from a server
- Never stored, reused, or remembered

The room ID has **no semantic meaning**.

### Format Constraints

Recommended characteristics:
- Length: 12–16 characters
- Alphabet: URL-safe base62 (`A–Z a–z 0–9`)
- Entropy: sufficient to prevent guessing during the room’s lifetime

Example: `F9aK2Qm7XcP4`

---

## Room Creation

A room is created **implicitly** when:
- A client generates a `room_id`, AND
- At least one participant connects using that `room_id`

There is no explicit “create room” action.

If only one participant ever joins, the room simply expires when they leave.

---

## Joining a Room

A participant joins a room by:
1. Opening the chat page
2. Explicitly consenting to participate
3. Connecting using the `room_id`
4. Emitting a `join` event

If the room does not yet exist, it is created implicitly.

---

## Invitations

An invitation is **only** the room link.

Recommended formats:

- `https://example.com/chat#F9aK2Qm7XcP4`
- `https://example.com/chat?room=F9aK2Qm7XcP4`

Notes:
- Hash (`#`) is preferred to minimize server logging
- There is no invite list
- There is no access control beyond possession of the link
- Sharing the link is the only way to invite someone

---

## Room Lifetime

A room exists **only while at least one participant is connected**.

- First participant joins → room exists
- Last participant leaves → room is destroyed immediately
- No grace period
- No persistence
- No recovery

If an old room link is opened later:
- A **new, unrelated room** is created using the same `room_id`
- No continuity is implied

---

## Presence Model

Presence is defined as:
- “Participants currently connected to this room”

Presence is:
- Transient
- Derived only from live connections
- Best-effort

There is no:
- Room history
- Participant history
- “Last active”
- Metadata about past rooms

---

## Capacity & Safety Limits

Recommended soft limits:
- Maximum participants per room: 20

Rationale:
- WebRTC mesh complexity
- UX clarity
- Reduced abuse surface

These limits are implementation guidance, not user-facing guarantees.

---

## Security & Abuse Considerations

Rooms are intentionally simple:
- Room IDs are unguessable within their short lifetime
- There is no discovery surface
- There is no persistence to exploit

Abuse is mitigated through:
- Explicit opt-in
- Intentional friction
- Ephemerality
- Small room size
- Lack of memory

---

## Lifecycle Alignment

Room behavior must align with the global lifecycle:

- **Idle**: no room exists
- **Consent**: room ID may be generated, but no join occurs
- **Active**: room exists while connections exist
- **Closed**: room is destroyed when the last session ends

Any feature that alters this behavior violates project intent.

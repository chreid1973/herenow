# Project Intent: Consent-First Ephemeral Chat

## Summary

This project is a **small, consent-first, ephemeral communication tool**.

It is intentionally minimal.  
It is not ambient.  
It is not persistent.  

Participation is always explicit, temporary, and user-initiated.

---

## Core Principle

**Nothing happens unless the user clearly asks for it.**

The extension remains idle until the user opens a dedicated chat page and explicitly opts in for that session.

There are no surprises at any step.

---

## Page Architecture

### Page 1: Extension Landing Page

#### Purpose
- Project description
- Updates / changelog
- FAQ
- Privacy explanation
- Link to the chat page

#### Behavior
- Extension stays idle
- Zero network activity
- Zero prompts
- Zero state changes

This page is **inert by design**.  
It exists to be read, not to act.

---

### Page 2: Chat Page

#### Purpose
- Chat only
- Presence
- Invitations
- Messaging

No documentation.  
No marketing.  
No secondary flows.

#### Behavior
- Extension wakes
- Establishes connection
- Prompts once:  
  **“Enable chat for this session?”**
- Joins a room only after explicit confirmation

Closing the chat tab immediately ends participation.

**Close tab = chat off. Always.**

---

## Consent Gradient

The user journey follows a strict, intentional sequence:

**Install → Learn → Opt in → Participate**

- Installing does nothing
- Reading does nothing
- Opening the chat page does nothing
- Explicit consent enables participation

There are no hidden states and no remembered intent.

---

## UX Copy Philosophy

UX copy is intentionally plain and honest.

No persuasion.  
No cleverness.  
No dark patterns.

**Landing page copy:**
> “Chat is optional. Open the chat page to participate.”

**Chat page prompt:**
> “Enable chat for this session?”

That is sufficient.

---

## Explicit Non-Goals

This project is **not**:
- A social network
- A community platform
- A discovery surface
- A moderation system
- A background service
- Tied to any other product or ecosystem

---

## Abuse Prevention Philosophy

Low abuse does not come from moderation tools.

It comes from **friction placed before participation**, not after harm.

By separating reading from participating, this design:
- Filters drive-by users
- Eliminates accidental joins
- Reduces abuse reports
- Reduces support burden
- Reduces Terms of Service risk
- Reduces future product regret

---

## Blunt Product Rule

If a user never opens the chat page, they should never even see the word **“chat”** inside the extension UI.

This prevents expectation drift and public argument about intent.

---

## Final Constraints (Non-Negotiable)

- Landing page = information only
- Chat page = explicit opt-in
- Extension wakes only on the chat page
- Consent is per-session, not remembered
- Closing the tab immediately ends the session

These constraints define the product.

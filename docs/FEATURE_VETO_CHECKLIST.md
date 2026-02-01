
**Invariant rules:**
- Landing page never transitions state
- Consent is required every session
- Active state exists only while the chat tab is open
- Closed always returns to Idle

If the lifecycle diagram needs another box, the feature does not belong.

---

```md
## Feature Veto Checklist

Every new idea must pass **all** of the following checks.

If any answer is “no,” the feature is rejected.

---

### 1. Activation Integrity

- Does this feature remain completely inactive unless the chat page is open?
- Does it avoid background listeners, polling, or timers?
- Does it avoid activating on landing or info pages?

If it wakes the extension early, it fails.

---

### 2. Explicit Consent

- Is user participation explicit and per-session?
- Does the user clearly understand when they are joining?
- Is there a visible moment of opt-in?

If consent is implied, remembered, or automatic, it fails.

---

### 3. Ephemerality

- Does this feature disappear when the chat tab closes?
- Does it avoid persistence, replay, or session restoration?
- Does it avoid stored identity, history, or reputation?

If it survives tab closure, it fails.

---

### 4. Surprise Audit

- Could this feature surprise a cautious or non-technical user?
- Would it require additional UX copy to “explain itself”?
- Would a user ever say, “Wait, why is this happening?”

If explanation is needed, it fails.

---

### 5. Abuse Surface Area

- Does this feature increase visibility, discovery, or reach?
- Does it create incentives to linger, perform, or escalate?
- Does it require moderation logic to feel safe?

If it increases abuse surface, it fails.

---

### 6. Argument Potential

- Could this feature become something users argue about publicly?
- Does it introduce expectations or entitlement?
- Does it blur the line between tool and platform?

If it invites debate, it fails.

---

### 7. Diagram Test (Final Gate)

Can this feature be represented **without adding a new box**
to the lifecycle diagram?

If not, it fails.

---

## Design Bias (Intentional)

This project favors:
- Inertia over engagement
- Friction over growth
- Clarity over cleverness
- Boring correctness over viral potential

Any feature that pushes against these biases is suspect by default.

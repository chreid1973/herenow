## One-Screen Lifecycle Diagram

The entire product lifecycle fits on one screen.

There are no hidden states.  
There is no background mode.  
There is no persistence beyond a single tab.



[ IDLE ]
|
| (User opens landing page)
| — no activation —
v
[ IDLE ]
|
| (User opens chat page)
v
[ CONSENT ]
|
| Prompt:
| “Enable chat for this session?”
|
| If NO → return to IDLE
| If YES →
v
[ ACTIVE ]
|
| (Presence, messaging, invitations)
|
| User closes chat tab
v
[ CLOSED ]
|
| Connection terminated
| Presence removed
| No memory retained
v
[ IDLE ]
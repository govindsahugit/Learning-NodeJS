# FedCM vs GSI — Short & Simple

## What they are

- **FedCM:** A browser standard that lets sites sign users in via any IdP while the browser mediates for privacy
- **GSI:** Google's sign-in SDK (One Tap, OAuth) for signing users in with Google accounts

## Main differences

### Scope

- **FedCM** = multi‑IdP, standard
- **GSI** = Google only, vendor SDK

### Privacy

- **FedCM** = browser‑mediated, more privacy
- **GSI** = Google‑managed, less focus on limiting provider visibility

### UX & maturity

- **FedCM** = browser prompt, newer
- **GSI** = polished UI (One Tap), widely used today

### Integration

- **FedCM** = needs IdP support + browser support
- **GSI** = include Google script and follow docs

## When to use

- Use **FedCM** for privacy and multiple IdPs
- Use **GSI** for best Google user experience and quick integration

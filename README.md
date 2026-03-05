# 📱 userAgents.js

A realistic, randomized User-Agent generator for mobile and desktop — built for web scraping that blends in.

> **8,500+ real Android device names** · **iOS 15–18** · **Windows / Mac / Linux desktop** · **ESM module**

---

## Why this exists

Most UA generators produce strings that are obviously fake:
- Android `13.7` or `15.6` — versions that don't exist
- Chrome `80.0` on a 2023 Samsung — impossible combination
- `(KHTML,like Gecko)` without a space — no real browser does this
- `Gecko/20210101` — the real value is always `20100101`, frozen

This library generates UAs that follow the same rules real browsers do.

---

## Installation

Just copy `userAgents.js` into your project. It's a single ESM file with zero dependencies.

```js
import userAgents from './userAgents.js'
```

---

## Usage

```js
import userAgents from './userAgents.js'

// Mobile
userAgents.mobile.android()   // Android Chrome / Samsung / Firefox / etc
userAgents.mobile.ios()       // iPhone Safari / CriOS / FxiOS / GSA
userAgents.mobile.random()    // 50/50 Android or iOS

// Desktop
userAgents.desktop.windows()  // Chrome / Edge / Firefox / Opera / Brave
userAgents.desktop.mac()      // Safari / Chrome / Firefox / Edge
userAgents.desktop.linux()    // Chrome / Firefox / Brave
userAgents.desktop.random()   // weighted: 55% Windows, 30% Mac, 15% Linux
```

### Example output

```
# Android (80% K-pattern, 20% named device)
Mozilla/5.0 (Linux; Android 13; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36
Mozilla/5.0 (Linux; Android 12; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/22.0.5.4 Chrome/120.0.6242.78 Mobile Safari/537.36
Mozilla/5.0 (Android 14; Mobile; rv:136.0) Gecko/136.0 Firefox/136.0
Mozilla/5.0 (Linux; Android 13; SM-A546B; Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.80 Mobile Safari/537.36

# iOS
Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1
Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/134.0.6998.99 Mobile/15E148 Safari/604.1
Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/361.0.714601005 Mobile/15E148 Safari/604.1

# Desktop
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15
Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:141.0) Gecko/20100101 Firefox/141.0
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36
```

---

## How it works

### Android — 80/20 strategy

**80% simple (K-pattern)** — mirrors what real Chrome on Android actually sends since Chrome 110+. The device name is hidden by the browser for privacy.

```
Mozilla/5.0 (Linux; Android {ver}; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{ver} Mobile Safari/537.36
```

Android version distribution matches real-world traffic (2025 data):

| Android | Share |
|---------|-------|
| 10 | 30% |
| 11 | 20% |
| 12 | 18% |
| 13 | 17% |
| 14 | 12% |
| 15 | 3%  |

**20% complex** — named device + optional build number, locale, wv flag. Device is always matched to a plausible Android version (a 2023 Samsung won't get Android 8).

### iOS

iOS version weighted toward recent releases:

| iOS | Share |
|-----|-------|
| 18 | 50% |
| 17 | 30% |
| 16 | 15% |
| 15 | 5%  |

Browser mix: Safari · CriOS · FxiOS · GSA (Google Search App)

`Mobile/15E148` is always used — this is the frozen build token all modern iPhones share.

### Desktop

Follows the privacy-reduction rules real browsers apply:

- Chrome / Edge / Firefox on Windows → always `Windows NT 10.0; Win64; x64`
- Chrome on Mac → always `Intel Mac OS X 10_15_7` (frozen by Chrome)
- Firefox on Mac → `Intel Mac OS X 10.15` (dot, not underscore)
- `Gecko/20100101` → always this exact value, never randomized
- Chrome desktop version → always `x.0.0.0` format (no patch number)

---

## Device coverage

8,500+ unique Android device names across 18+ brands:

| Brand | Devices |
|-------|---------|
| Samsung | ~1,195 |
| vivo / iQOO | ~1,152 |
| Realme | ~773 |
| Xiaomi / Redmi / POCO | ~754 |
| Motorola | ~719 |
| OPPO | ~662 |
| Huawei | ~486 |
| itel | ~410 |
| Infinix | ~362 |
| ZTE / nubia | ~310 |
| HONOR | ~298 |
| TECNO | ~283 |
| Nokia | ~240 |
| TCL | ~117 |
| OnePlus | ~101 |
| Sony | ~57 |
| ASUS ROG | ~53 |
| Google Pixel | ~17 |

---

## Validity rules enforced

| Rule | Detail |
|------|--------|
| Android version | Only `10`, `11`, `12`, `13`, `14`, `15` — no `13.7` or `15.6` |
| Device ↔ Android | Budget devices get Android 10–12, flagship 2023+ get 13–15 |
| Chrome mobile | Min version 110, patch number realistic |
| Chrome desktop | Always `x.0.0.0`, no patch number |
| Firefox | `Gecko/20100101` frozen, never randomized |
| Firefox version | Min 120 (mobile), 128/135–147 (desktop) |
| WebKit mobile | Always `537.36` for Chrome, `605.1.15` for iOS Safari |
| Samsung Browser | Version matched to Android generation |
| Edge | Major version always equals Chrome major version |
| iOS build | Always `15E148`, consistent across all modern iPhones |
| Spacing around `;` | Only `; ` or `;` — no space before semicolon |

---

## License

MIT

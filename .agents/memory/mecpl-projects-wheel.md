---
name: MECPL Projects wheel carousel
description: How the orbital wheel carousel is implemented for the projects section
---

# MECPL Projects Wheel Carousel

## Pattern
- `projectsRef` (section) is the GSAP pin trigger — `position: relative; overflow: hidden; height: 100vh`
- Wheel origin div: `position: absolute; top: calc(100% + 80px); left: 50%` — placed **80px below** the section's bottom edge
- This means only the top arc of the wheel is visible (overflow:hidden clips the rest); 3 cards visible at a time
- Cards: `position: absolute; width: 268px; height: 178px; marginLeft: -134px; marginTop: -89px` centered on origin
- `radius = 520` px
- GSAP proxy: `{ rotation: 0 }` → `rotation: 360` over `+=3000` scroll distance, `scrub: 1`
- `updateWheel()`: for each card, `angleDeg = step * i + proxy.rotation`, then `x = sin * radius`, `y = -cos * radius`, `scale = 0.72 + 0.28 * max(0, cos)`, `opacity = 0.35 + 0.65 * max(0, cos)`
- Cards stay upright (no rotation applied to them — pure x/y translation)
- Spotlight dot: `top: calc(100% - 440px)` = section_height - (radius - 80) ≈ 280px from top

## Why
User wanted images "not too big" vs prior 100vh horizontal scroll cards. This approach shows cards at 178px height, clearly readable.

## How to apply
If radius or card height changes, recalculate spotlight dot: `top: calc(100% - ${radius - 80}px)` where 80px is the below-section offset.

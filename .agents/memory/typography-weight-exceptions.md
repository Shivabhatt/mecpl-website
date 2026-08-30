---
name: Typography weight exceptions
description: How to make intentionally light or heavy component typography render correctly alongside shared site-wide title rules.
---

When a component intentionally uses a font weight outside the shared title treatment, load that exact weight and make the component rule more specific than the shared typography utilities.

**Why:** Declaring a light weight is not enough if the font import omits it or a shared `!important` rule wins the cascade. Important declarations reverse CSS layer priority, so an earlier layered rule can beat a more specific unlayered exception.

**How to apply:** Verify the weight exists in the font source, inspect competing shared rules and their cascade layers, and place the exception in the winning layer when needed. Confirm the rendered result visually rather than relying only on declarations.
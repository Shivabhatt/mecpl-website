---
name: MECPL GSAP ScrollTrigger patterns
description: Correct GSAP+React patterns for the MECPL site; critical containerAnimation bug fix
---

## containerAnimation must be the tween, not the ScrollTrigger instance

`ScrollTrigger.getById("id")` returns a **ScrollTrigger** object, which has no `.time` method.  
`containerAnimation` in a nested ScrollTrigger needs the **tween** (gsap.core.Tween/Timeline).

**Wrong (causes `.time.bind()` TypeError, crashes the whole page):**
```ts
containerAnimation: ScrollTrigger.getById("proj-scroll") as gsap.core.Tween,
```

**Correct:**
```ts
const projTween = gsap.to(track, { x: getAmt, scrollTrigger: { ... } });
// then:
containerAnimation: projTween,
```

**Why:** Line 1216 of the bundled ScrollTrigger: `self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;` — passing a ScrollTrigger instance makes `.time` undefined, throwing a TypeError that crashes the React component.

---

## Correct GSAP + React Strict Mode pattern

Nest `mm.add()` INSIDE `gsap.context()` — never the reverse.

```tsx
useEffect(() => {
  const sec = ref.current;
  if (!sec) return;
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // direct gsap calls — NO nested gsap.context() here
      const splits: SplitText[] = [];
      // ...
      return () => splits.forEach(s => s.revert()); // non-GSAP cleanup only
    });
  }, sec); // second arg scopes selectors to sec
  return () => ctx.revert(); // handles both ctx and mm cleanup
}, []);
```

**Why:** `gsap.context()` handles React Strict Mode double-invocation cleanup. Nesting `gsap.context()` inside `mm.add()` double-scopes animations and breaks ScrollTrigger init. The outer context's revert also cleans up any matchMedia instances created inside it.

---

## SplitText + React state: always use dangerouslySetInnerHTML

If any React component that uses SplitText also has `useState`, state changes trigger re-renders. React reconciles the component's VDOM (which has text fiber children) against the real DOM (which now has SplitText `<span>` children). React calls `removeChild` on the text fiber → `NotFoundError: The node to be removed is not a child of this node` → full crash.

**Fix:** Add `dangerouslySetInnerHTML={{ __html: "text content" }}` to every element SplitText will operate on. React then owns only the outer element, not its children — SplitText can freely replace them with spans without conflict.

**Also avoid `key={stateVar}` on GSAP-animated elements.** Using a state-driven `key` causes React to unmount/remount the element on each state change, removing the DOM node GSAP is currently animating → `removeChild` on a detached node.

**Why:** React's text fiber reconciliation expects the DOM to match the VDOM at the text-node level. SplitText breaks this invariant. `dangerouslySetInnerHTML` tells React "I own this innerHTML; don't touch children."

**How to apply:** Any `hero-line`, `testi-quote`, or other SplitText target that lives in a component with state must use `dangerouslySetInnerHTML`. For elements with mixed JSX children (e.g. `<br/>` + nested `<span>`), skip SplitText and use a whole-element `gsap.from(el, {y, opacity})` instead.

# SolidStart

#### Todos

- [x] make scroll track
- [ ] slider component
  - [ ] should be an animation primitive and not a straight directive
    - [ ] onReady | onIndex | onConfig (sets enabled/disabled and snapmode) | ...
- [ ] webgl(s)
  - [ ] ogl
  - [ ] three

---

## Features

```bash
# ...
```

### Animation

### Primitives

#### Page Transition Events

Use the `onPageLeave` inteface, takes a callback.
Can be `async`. If async , will be triggered with all the other functions at the same time and executed in parallel. If not, will not contribute to the transition out page animation timing.

```js
onPageLeave(async () => {
  // ... animate out function
});
```

#### Viewport Intersection

Triggers based on an intersection observer. Takes 2 callbacks and some optional params. Threshold is `IntersectionObserver` standard property (default is .2).

```js

onIntersect(self, {
  onEnter?: () => {},
  onLeave?: () => {},
  threshold: 0.2,
  // once: true, (WIP)
});

```

#### Scroll Event

Scroll based.
Deal with it, probably should not be a primitive.
Scroll is the Y pixel value, velocity is the delta, direction is either 1 or 0

```js
onScroll(({ scroll, velocity, direction }) => {
  // your function
});
```

#### Track Event

Scroll based.
Uses a 0 to 1 value based on how much the track is in the viewport.

```js

onTrack(track, {
  top?: "bottom",
  bottom?: "top",
  lerp?: number | false;
  },
  (value) => {}
  );

```

#### Arbitrary Event (WIP)

When a store mutates.

```js
onStore(store, (value) => {
  // animate based on store
  // you're the one that does the if part
});
```

---

### Controller

```bash
# ...
```

---

### Ideas

- [ ] make scroll, viewport/resize, raf part of the app

    - single controller
    - single initt

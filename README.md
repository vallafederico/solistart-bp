# SolidStart

#### Todos

- [ ] make scroll track

---

## Features

```bash
# ...
```

### Animation

```js
// animateExit()
// animateView()
// animateScroll()
// animateTrack()

// animated when transitioning out | can be async

// onOut(() => {});
// onExit(() => {});
// onPageExit(() => {});
// onPageLeave(() => {});
onLeave(() => {});

// animates based on viewport visibility

onView(self, {
  onIn: () => {},
  onOut: () => {},
});

onIntersect(self, {
  onIn: () => {},
  onOut: () => {},
});

onIntersect(self, {
  onIn: () => {},
  onOut: () => {},
});

// animates on scroll
// passes {y, direction, speed}

onScroll(() => {});

// animates when track scrolls through viewport
// passes a 0-1 value based on percentage
// passes {y, direction, speed}

onTrack(track, { top: "", bottom: "", range: [0, 1] }, (value) => {});
// onTrack({ track, top: "", bottom: "", range: [0, 1] }, (value) => {});
```

### Controller

```bash
# ...
```

---

### Ideas

- [ ] make scroll, viewport/resize, raf part of the app

    - single controller
    - single initt

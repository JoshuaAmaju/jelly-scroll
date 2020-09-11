function useScroll({ onScroll, onScrollEnd, onScrollStart }) {
  let raf;
  let started = false;

  const context = {};
  const event = { t: 0, y: 0, dt: 0, dy: 0, v: 0, ly: 0, lt: 0 };

  const watch = () => {
    if (event.ly === window.scrollY) {
      started = false;
      cancelAnimationFrame(raf);
      onScrollEnd && onScrollEnd(event, context);
      return;
    }

    event.lt = Date.now();
    event.ly = window.scrollY;
    raf = requestAnimationFrame(watch);
  };

  document.addEventListener("scroll", () => {
    if (!started) {
      started = true;
      raf = requestAnimationFrame(watch);
      onScrollStart && onScrollStart(event, context);
    }

    const now = Date.now();
    const y = window.scrollY;

    const dy = y - event.y;
    const dt = now - event.t;

    event.y = y;
    event.t = now;
    event.dt = dt;
    event.dy = dy;
    event.v = dy / dt;

    onScroll && onScroll(event, context);
  });
}

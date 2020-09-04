function useScroll({ onScroll, onScrollEnd, onScrollStart }) {
  let started = false;

  const context = {};

  const stop = () => {
    started && onScrollEnd && onScrollEnd(context);
    started = false;
  };

  document.addEventListener("pointerup", stop, { passive: true });
  document.addEventListener("pointerout", stop, { passive: true });
  document.addEventListener("pointerleave", stop, { passive: true });
  document.addEventListener("pointercancel", stop, { passive: true });

  document.addEventListener("scroll", () => {
    if (!started) {
      started = true;
      onScrollStart && onScrollStart(context);
    }

    onScroll && onScroll(context);
  });
}

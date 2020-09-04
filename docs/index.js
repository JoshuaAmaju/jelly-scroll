const { value, styler, spring } = popmotion;

let animation;
const count = 100;
let isAnimating = false;
const container = document.querySelector(".container");

const containerStyler = styler(container);

const valueY = value(0, (v) => {
  containerStyler.set({ transform: `skewY(${v}rad)` });
});

const lerp = interpolate([-5, 0, 5], [-Math.PI / 9, 0, Math.PI / 9]);

for (let i = 0; i < count; i++) {
  const item = document.createElement("div");
  item.className = "container-item";
  container.appendChild(item);
}

const scroll = useScroll({
  onScroll: (ctx) => {
    const now = Date.now();
    const y = window.scrollY;

    const dy = y - (ctx.y ?? 0);
    const dt = now - (ctx.time ?? 0);

    const v = dy / dt;

    spring({
      to: lerp(v),
      from: valueY.get(),
      velocity: valueY.getVelocity(),
    }).start(valueY);

    ctx.y = y;
    ctx.time = now;
  },
  onScrollEnd() {
    spring({
      to: 0,
      from: valueY.get(),
      velocity: valueY.getVelocity(),
    }).start(valueY);
  },
});
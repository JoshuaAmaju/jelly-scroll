const { value, styler, spring, physics } = popmotion;

const count = 100;
let activePhysics;
const container = document.querySelector(".container");

const containerStyler = styler(container);

const valueY = value(0, (v) => {
  containerStyler.set({ transform: `skewY(${v}rad)` });
});

const lerp = interpolate([-5, 0, 5], [-Math.PI / 6, 0, Math.PI / 6]);

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

    activePhysics = physics({
      to: lerp(v),
      friction: 0.6,
      restSpeed: false,
      from: valueY.get(),
      springStrength: 100,
      velocity: valueY.getVelocity(),
    }).start(valueY);

    ctx.y = y;
    ctx.time = now;
  },
  onScrollEnd() {
    activePhysics.setSpringTarget(0);
  },
});

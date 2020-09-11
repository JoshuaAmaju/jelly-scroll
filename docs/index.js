const { value, styler, spring, physics } = popmotion;

const count = 100;
const container = document.querySelector(".container");

const containerStyler = styler(container);

const valueY = value(0, (v) => {
  containerStyler.set({ transform: `skewY(${v}rad)` });
});

const lerp = interpolate([-5, 0, 5], [-Math.PI / 7, 0, Math.PI / 7]);

for (let i = 0; i < count; i++) {
  const item = document.createElement("div");
  item.className = "container-item";
  container.appendChild(item);
}

const scroll = useScroll({
  onScroll: ({ v }) => {
    physics({
      to: lerp(v),
      friction: 0.6,
      restSpeed: false,
      from: valueY.get(),
      springStrength: 100,
      velocity: valueY.getVelocity(),
    }).start(valueY);
  },
});

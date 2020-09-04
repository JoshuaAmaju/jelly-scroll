function lerp(start, end, fraction) {
  return start * (1 - fraction) + end * fraction;
}

function inverseLerp(a, b, v) {
  return clamp((v - a) / (b - a));
}

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function interpolate(input, output, easing = (v) => v) {
  const rangeLength = input.length;
  const finalIndex = rangeLength - 1;

  return (v) => {
    let i = 1;

    // Find index of range start
    for (; i < rangeLength; i += 1) {
      if (input[i] > v || i === finalIndex) break;
    }

    const range = inverseLerp(input[i - 1], input[i], v);
    let result = lerp(output[i - 1], output[i], easing(range));

    return result;
  };
}

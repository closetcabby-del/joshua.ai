type CardBounds = { left: number; top: number; width: number; height: number };
/** Keep the perspective restrained and light coordinates inside the surface. */
export function getCardTilt(
  clientX: number,
  clientY: number,
  bounds: CardBounds,
) {
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const x =
    bounds.width > 0 ? clamp((clientX - bounds.left) / bounds.width) : 0.5;
  const y =
    bounds.height > 0 ? clamp((clientY - bounds.top) / bounds.height) : 0.5;
  return {
    x: (0.5 - y) * 5,
    y: (x - 0.5) * 5,
    lightX: x * 100,
    lightY: y * 100,
  };
}

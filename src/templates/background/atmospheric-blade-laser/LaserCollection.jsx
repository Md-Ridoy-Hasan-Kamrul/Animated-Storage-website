import { Suspense, lazy } from 'react';
import { ATMOSPHERIC_BLADE_DEFAULT_PROPS, VARIANT_ID } from './constants';

export const LASER_COLLECTION_DEFAULTS = { ...ATMOSPHERIC_BLADE_DEFAULT_PROPS };

const LaserVariants = lazy(() =>
  import('./LaserVariants').then((module) => ({ default: module.LaserVariants })),
);

const FALLBACK = <div className="threeui-background laser-variant" />;

function resolveVariant(variant) {
  return variant === VARIANT_ID ? VARIANT_ID : VARIANT_ID;
}

/**
 * LaserCollection host for Atmospheric Blade.
 * Mirrors registered LaserCollection.tsx: non-matrix variants → LaserVariants.
 */
export function LaserCollection({
  variant = LASER_COLLECTION_DEFAULTS.variant,
  speed = LASER_COLLECTION_DEFAULTS.speed,
  size = LASER_COLLECTION_DEFAULTS.size,
  length = LASER_COLLECTION_DEFAULTS.length,
  density = LASER_COLLECTION_DEFAULTS.density,
  opacity = LASER_COLLECTION_DEFAULTS.opacity,
  hue = LASER_COLLECTION_DEFAULTS.hue,
  saturation = LASER_COLLECTION_DEFAULTS.saturation,
  brightness = LASER_COLLECTION_DEFAULTS.brightness,
  className = '',
  style,
}) {
  const safeVariant = resolveVariant(variant);

  return (
    <Suspense fallback={FALLBACK}>
      <LaserVariants
        variant={safeVariant}
        speed={speed}
        size={size}
        length={length}
        density={density}
        opacity={opacity}
        hue={hue}
        saturation={saturation}
        brightness={brightness}
        className={className}
        style={style}
      />
    </Suspense>
  );
}

export default LaserCollection;

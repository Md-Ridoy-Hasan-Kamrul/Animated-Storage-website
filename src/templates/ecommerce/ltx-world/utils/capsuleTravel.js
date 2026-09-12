export const MOBILE_CONTROLLER_MQ = '(max-width: 700px)';
export const MOBILE_CAPSULE_TOP_DVH = 4;

export function isMobileController(matchMediaFn = window.matchMedia) {
  return Boolean(matchMediaFn(MOBILE_CONTROLLER_MQ).matches);
}

export function getCapsuleTravel(
  cell,
  controller,
  { mobile, viewportHeight } = {},
) {
  const isMobile =
    typeof mobile === 'boolean' ? mobile : isMobileController();
  const height = viewportHeight ?? window.innerHeight;
  const cellCx = cell.offsetLeft + cell.offsetWidth / 2;
  const cellCy = cell.offsetTop + cell.offsetHeight / 2;
  const targetX = controller.clientWidth / 2;
  const targetY = isMobile
    ? (MOBILE_CAPSULE_TOP_DVH * height) / 100
    : controller.clientHeight / 2;

  return {
    dx: targetX - cellCx,
    dy: targetY - cellCy,
  };
}

export function applyCapsuleTravel(cell, controller, options) {
  const { dx, dy } = getCapsuleTravel(cell, controller, options);
  cell.style.transform = `translate(${dx}px, ${dy}px)`;
}

export function clearCapsuleTravel(cell) {
  if (cell) cell.style.transform = '';
}

export function shouldPinActiveLabel(controllerMode) {
  return controllerMode === 'collapsed' || controllerMode === 'selected';
}

export function shouldShowReset(controllerMode, isActive) {
  return isActive && (controllerMode === 'selected' || controllerMode === 'reversing');
}

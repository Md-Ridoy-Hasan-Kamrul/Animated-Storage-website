export const baseExterior = '/media/exterior-polished.png';

export const appearanceOptions = {
  paint: [
    { id: 'silver', label: 'Studio Silver', color: '#c9cfd2', image: baseExterior },
    { id: 'electric', label: 'Electric Green', color: '#edff39', image: '/media/config/electric-green.png' },
    { id: 'lime', label: 'Lime Green', color: '#9fdc32', image: '/media/config/lime-green.png' },
    { id: 'sky', label: 'Sky Blue', color: '#708fa2', image: '/media/config/sky-blue.png' },
    { id: 'graphite', label: 'Graphite', color: '#30363c', image: '/media/config/graphite.png' },
  ],
  wheels: [
    { id: 'original', label: 'Multi-spoke', image: baseExterior },
    { id: 'aero', label: 'Aero Disc', image: '/media/config/wheels-aero.png' },
    { id: 'forged', label: 'Sport Forged', image: '/media/config/wheels-forged.png' },
  ],
};

export function canUseHotspot(active, id, closing) {
  return !closing && (!active || active === id);
}

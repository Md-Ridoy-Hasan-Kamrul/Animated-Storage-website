/** Portfolio Cosmic — static content & media (verified Unsplash URLs). */

const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS = [
  {
    id: 'automotive',
    title: 'Automotive Motion',
    image: img('photo-1492144534655-ae79c964c9d7'),
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'urban',
    title: 'Urban Architecture',
    image: img('photo-1486406146926-c627a92ad1ab'),
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'human',
    title: 'Human Perspective',
    image: img('photo-1534528741775-53994a69daeb'),
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    image: img('photo-1561070791-2526d30994b5'),
    aspect: 'aspect-[4/3]',
  },
];

export const JOURNAL_ENTRIES = [
  {
    id: 'j1',
    title: 'Designing systems that feel alive',
    image: img('photo-1618005182384-a83a8bd57fbe', 400),
    readTime: '4 min',
    date: 'Mar 12, 2026',
  },
  {
    id: 'j2',
    title: 'Motion as a product language',
    image: img('photo-1558591710-4b4a1ae0f04d', 400),
    readTime: '6 min',
    date: 'Feb 28, 2026',
  },
  {
    id: 'j3',
    title: 'Chicago nights & creative rituals',
    image: img('photo-1514565131-fce0801e5785', 400),
    readTime: '3 min',
    date: 'Feb 10, 2026',
  },
  {
    id: 'j4',
    title: 'From concept sketches to launch',
    image: img('photo-1586717791821-3f44a563fa4c', 400),
    readTime: '5 min',
    date: 'Jan 22, 2026',
  },
];

export const EXPLORATION_ITEMS = [
  { id: 'e1', image: img('photo-1618005198919-d3d4b5a92ead', 800), rotation: -6 },
  { id: 'e2', image: img('photo-1541701494587-cb58502866ab', 800), rotation: 4 },
  { id: 'e3', image: img('photo-1620641788421-7a1c342ea42e', 800), rotation: -3 },
  { id: 'e4', image: img('photo-1579546929518-9e396f3cc809', 800), rotation: 7 },
  { id: 'e5', image: img('photo-1557672172-298e090bd0f1', 800), rotation: -5 },
  { id: 'e6', image: img('photo-1550684848-fac1c5b4e853', 800), rotation: 3 },
];

export const STATS = [
  { id: 'years', value: '20+', label: 'Years Experience' },
  { id: 'projects', value: '95+', label: 'Projects Done' },
  { id: 'clients', value: '200%', label: 'Satisfied Clients' },
];

/** TemplateDetail fallback cards */
export const MARQUEE_GIFS = PROJECTS.map((p) => p.image);
export const ABOUT_DECOR = {
  moon: JOURNAL_ENTRIES[0].image,
  group: EXPLORATION_ITEMS[0].image,
};
export const PORTRAIT_URL = PROJECTS[2].image;
export const SERVICES = [];

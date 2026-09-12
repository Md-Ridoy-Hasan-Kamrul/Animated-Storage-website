import { DETAIL_CARD_IMAGE_COUNT } from './constants';

const asset = (fileName) =>
  encodeURI(`/images/Assets Neo Museum/${fileName}`);

export const HERO_VIDEO = asset('magnific_use-img-2-as-the-exact-ba_Piu3X0W42C.mp4');

export const PTERODACTYL_IMAGE = asset(
  'ChatGPT Image May 23, 2026, 12_24_44 PM 1.png',
);

export const CHAPTERS = [
  { name: 'Age of Dinosaurs', image: asset('01.png') },
  { name: 'Fossils of Ancient Life', image: asset('02.png') },
  { name: 'Reptiles of the Mesozoic', image: asset('03.png') },
  { name: 'Marine Fossil Gallery', image: asset('04.png') },
  { name: 'Prehistoric Giants', image: asset('05.png') },
];

const CHAPTER_IMAGES = CHAPTERS.map((c) => c.image);
export const MARQUEE_GIFS = Array.from(
  { length: DETAIL_CARD_IMAGE_COUNT },
  (_, i) => CHAPTER_IMAGES[i % CHAPTER_IMAGES.length],
);
export const ABOUT_DECOR = {
  moon: PTERODACTYL_IMAGE,
  group: CHAPTERS[2].image,
};
export const PORTRAIT_URL = CHAPTERS[2].image;
export const SERVICES = [];

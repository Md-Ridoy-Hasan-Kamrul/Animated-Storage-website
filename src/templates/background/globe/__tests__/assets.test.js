import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  ENERGY_ORB_COMPONENT_SHA256,
  ENERGY_ORB_SHADERS_SHA256,
  GLOBE_COLLECTION_SHA256,
  NETWORK_GLOBE_SHA256,
  TANGLED_CONSTELLATIONS_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Globe packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified GlobeCollection, EnergyOrb, shaders, and HTML provenance', () => {
    const collection = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/GlobeCollection.tsx.txt'),
      'utf8',
    );
    const energyOrb = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/EnergyOrb.tsx.txt'),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/energyOrbShaders.ts.txt'),
      'utf8',
    );
    const tangled = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/tangled-constellations.html'),
      'utf8',
    );
    const network = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/network-globe.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(collection).digest('hex')).toBe(GLOBE_COLLECTION_SHA256);
    expect(crypto.createHash('sha256').update(energyOrb).digest('hex')).toBe(
      ENERGY_ORB_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(ENERGY_ORB_SHADERS_SHA256);
    expect(crypto.createHash('sha256').update(tangled).digest('hex')).toBe(
      TANGLED_CONSTELLATIONS_SHA256,
    );
    expect(crypto.createHash('sha256').update(network).digest('hex')).toBe(NETWORK_GLOBE_SHA256);

    expect(collection).toContain('export function GlobeCollection');
    expect(collection).toContain('energy-orb');
    expect(energyOrb).toContain('export function EnergyOrb');
    expect(energyOrb).toContain('ENERGY_ORB_DEFAULTS');
    expect(shaders).toContain('NXA_ENERGY_ORB_CONFIGURABLE_FRAGMENT_SHADER');
  });

  it('keeps the runtime shader module identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/energyOrbShaders.ts.txt'),
      'utf8',
    );
    const runtime = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/energyOrbShaders.js'),
      'utf8',
    );
    expect(runtime).toBe(provenance);
  });

  it('keeps runtime HTML sources identical to provenance files', () => {
    const tangled = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/tangled-constellations.html'),
      'utf8',
    );
    const network = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/globe/sources/network-globe.html'),
      'utf8',
    );
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const {
      tangledConstellationsSource,
      networkGlobeSource,
    } = require('../globeHtmlSources');
    expect(tangledConstellationsSource).toBe(tangled);
    expect(networkGlobeSource).toBe(network);
  });
});

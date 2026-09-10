import { buildLayout } from '../utils/buildLayout';

describe('buildLayout', () => {
  it('returns empty rows when count is 0', () => {
    expect(buildLayout(0, 4)).toEqual([]);
  });

  it('places primary image at a = (r*2 + r%2) % cols', () => {
    const rows = buildLayout(1, 4);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual([0, -1, -1, -1]);
  });

  it('on every 3rd row places a second image at (a+2)%cols', () => {
    // row 0: a=0, second at b=2 → [0, -1, 1, -1]
    const rows = buildLayout(2, 4);
    expect(rows[0][0]).toBe(0);
    expect(rows[0][2]).toBe(1);
    expect(rows[0][1]).toBe(-1);
    expect(rows[0][3]).toBe(-1);
  });

  it('uses (a+1)%cols when b === a', () => {
    // cols=2, row 0: a=(0+0)%2=0, b=(0+2)%2=0 → collide → (0+1)%2=1
    const rows = buildLayout(2, 2);
    expect(rows[0]).toEqual([0, 1]);
  });

  it('continues across rows until count images are placed', () => {
    const rows = buildLayout(10, 4);
    const flat = rows.flat().filter((v) => v !== -1);
    expect(flat).toHaveLength(10);
    expect([...flat].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('fills empty cells with -1', () => {
    const rows = buildLayout(3, 4);
    rows.forEach((row) => {
      expect(row).toHaveLength(4);
      row.forEach((cell) => {
        expect(typeof cell).toBe('number');
      });
    });
    const empties = rows.flat().filter((v) => v === -1);
    expect(empties.length).toBeGreaterThan(0);
  });

  it('computes row 1 primary column correctly for 4 cols', () => {
    // row 1: a = (2 + 1) % 4 = 3 — only one image on non-multiple-of-3 rows
    const rows = buildLayout(3, 4);
    // row0 places 0 and 1; row1 places 2 at col 3
    expect(rows[1][3]).toBe(2);
    expect(rows[1].filter((v) => v !== -1)).toHaveLength(1);
  });
});

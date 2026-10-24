// Structural checks on the aarti texts.
import assert from 'node:assert/strict';
import { aartis } from '../data/aartis.js';

const slugs = new Set();
for (const a of aartis) {
  assert.ok(!slugs.has(a.slug), `duplicate slug ${a.slug}`); slugs.add(a.slug);
  assert.match(a.slug, /^[a-z0-9-]+$/, `bad slug ${a.slug}`);
  assert.ok(a.title?.hi && a.title?.en && a.deity?.en && a.author && a.when, `${a.slug}: missing fields`);
  for (const b of a.blocks) for (const l of b.lines) assert.ok(/[॥।]\s*$|॥/.test(l), `${a.slug}: line without danda: ${l}`);
}
const chalisa = aartis.find((a) => a.slug === 'hanuman-chalisa');
assert.equal(chalisa.blocks.find((b) => b.numbered).lines.length, 40, 'Hanuman Chalisa has 40 chaupais');
console.log(`Aarti tests passed (${aartis.length} texts)`);

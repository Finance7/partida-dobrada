import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const files = [
  ['index.html', 30],
  ['css/app.css', 80],
  ['js/main.js', 20],
  ['js/legacy.js', 950]
];

let failed = false;

for (const [file, maxKb] of files) {
  const bytes = (await stat(join(ROOT, file))).size;
  const kb = bytes / 1024;
  const status = kb <= maxKb ? 'OK' : 'ACIMA DO LIMITE';
  console.log(`${status.padEnd(15)} ${file.padEnd(18)} ${kb.toFixed(1)} KB / ${maxKb} KB`);
  if (kb > maxKb) failed = true;
}

if (failed) {
  process.exitCode = 1;
}

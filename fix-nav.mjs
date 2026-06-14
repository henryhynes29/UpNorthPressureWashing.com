/**
 * Navigation maintenance — runs unified nav + sitewide + learning center patches.
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));

for (const script of ['build-unified-nav.mjs', 'patch-sitewide-nav.mjs', 'patch-learning-center-nav.mjs']) {
  const result = spawnSync(process.execPath, [script], { cwd: dir, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

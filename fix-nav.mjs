/**
 * Navigation maintenance — unified nav, safe enhancements, learning center.
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));

for (const script of ['build-unified-nav.mjs', 'patch-nav-enhancements.mjs', 'patch-learning-center-nav.mjs', 'patch-hub-cleanup.mjs']) {
  const result = spawnSync(process.execPath, [script], { cwd: dir, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

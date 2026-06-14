/**
 * Navigation maintenance — runs the unified nav builder.
 * For full nav replacement + polish, use: node build-unified-nav.mjs
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const result = spawnSync(process.execPath, ['build-unified-nav.mjs'], {
  cwd: dir,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);

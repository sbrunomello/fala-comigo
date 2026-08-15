import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isWindows = process.platform === 'win32';
const npx = isWindows ? 'npx.cmd' : 'npx';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...options
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, ['scripts/build.mjs']);

const androidDir = path.join(root, 'android');
if (!existsSync(androidDir)) {
  run(npx, ['cap', 'add', 'android']);
} else {
  run(npx, ['cap', 'sync', 'android']);
}

const gradle = isWindows ? 'gradlew.bat' : './gradlew';
run(gradle, ['assembleDebug'], { cwd: androidDir, shell: isWindows });

console.log('\nAPK gerado em android/app/build/outputs/apk/debug/app-debug.apk');

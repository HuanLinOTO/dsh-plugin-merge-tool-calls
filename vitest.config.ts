import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Point the dsh primitives package at a local test double so specs never need
// the (private, host-provided) package installed. Types still come from the
// dsh source checkout through the node_modules junctions; every other
// `@deepseek-ai/*` import in the client half is type-only (erased at runtime).
const stub = (name: string) => fileURLToPath(new URL(`./tests/stubs/${name}`, import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@deepseek-ai/dsh-client-ui-primitives': stub('primitives.tsx'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
  },
})

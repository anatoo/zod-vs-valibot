# Zod vs Valibot: bundle size comparison

This is a simple script to compare the bundle size of [Zod](https://github.com/colinhacks/zod) and [Valibot](https://github.com/fabian-hiller/valibot).
It compares the bundle size with tree-shaking enabled [rollup](https://rollupjs.org) bundler.

## Result

| case | format | minified | gzipped |
| --- | --- | --- | --- |
| [zod_string.js](./cases/zod_string.js) | cjs | 54404B | 12374B |
| [valibot_string.js](./cases/valibot_string.js) | cjs | 1344B | 714B |
| [zod_object.js](./cases/zod_object.js) | cjs | 54487B | 12414B |
| [valibot_object.js](./cases/valibot_object.js) | cjs | 3035B | 1171B |

## How to run

```bash
bun install
```

To run:

```bash
bun run index.ts
```

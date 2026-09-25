# Website browser tests

Run the mobile-sized milestone carousel check from the repository root:

```sh
pnpm --filter @workspace/mecpl-website test:milestones
```

The command starts the Vite development server on port `4173` when one is not
already running. Playwright uses `/repl/tools/bin/chromium` when available.
Elsewhere, install its Chromium browser once with:

```sh
pnpm --filter @workspace/mecpl-website exec playwright install chromium
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use a different installed Chromium
binary.
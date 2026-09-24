---
name: MECPL GitHub sync fallback
description: Safe fallback for publishing the MECPL repository when Git HTTPS credentials are rejected.
---

If normal Git HTTPS authentication fails, use the authorized GitHub connector’s Git Data API: upload deduplicated blobs, create a compact delta tree with `base_tree` set to the current remote tree, verify it exactly matches the local HEAD tree, create a commit on the current remote head, and update `main` with force disabled. Do not send the entire flat repository tree through the connector; large tree requests can fail at the proxy.

**Why:** The connector can have valid repository write access even when every stored HTTPS token is rejected. When local-only parent commits are no longer present in GitHub’s object database, the remote commit ID cannot match the local merge commit, but their complete tree contents can still match exactly.

GitHub's REST blob endpoint can reject large blobs even below GitHub's normal per-file Git limit. Upload connector blobs sequentially with rate-limit backoff and a resumable SHA journal. If the rejected file is an unused source archive outside the product, untrack only that archive and keep it locally; never drop a required live asset to make publication succeed.

**How to apply:** Pull and resolve first, validate the app, recheck that the remote head has not moved, compare the created tree hash with local HEAD, and refuse the ref update on any mismatch. Confirm the published branch by fetching it back and comparing tree hashes. After the deployment workflow succeeds, verify the custom domain serves the new hashed bundle and expected release strings.

In this workspace, `listConnections("github")` returns a raw connection ID without the `connection:` prefix, and the connection exposes an Octokit client through `getClient()`.

**Why:** Comparing the inventory ID directly to the `listConnections()` ID with its prefix fails to find the already-authorized connection; the typed client also avoids assuming `proxyFetch` is the only API path.

**How to apply:** Match on the raw ID returned by `listConnections()`. Prefer `getClient()` and `client.rest.git` when `hasClient` is true; otherwise use `proxyFetch()`.

## GitHub Actions status polling

In this workspace, `client.rest.actions.listWorkflowRuns()` returned 404 while `conn.proxyFetch("/repos/{owner}/{repo}/actions/runs?per_page=10")` returned the workflow run. Git Data methods on the same client worked.

**Why:** The connection was authorized—the Git Data API succeeded and the proxy returned Actions data—so this 404 was not evidence that reauthorization was needed.

**How to apply:** For GitHub Pages verification, query runs with `proxyFetch` and then confirm that `gh-pages` moved to a new ref.
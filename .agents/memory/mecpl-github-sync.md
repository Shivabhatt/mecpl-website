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

## Direct GitHub Pages branch publishing

When the user explicitly requests a `gh-pages` deploy from a diverged source branch, publish the built static tree to the current `gh-pages` head instead of implicitly syncing the entire source history to `main`. Preserve `CNAME` and `.nojekyll`, use a compact Git Data delta, verify the resulting tree SHA, and update the ref with force disabled.

**Why:** Updating `main` can publish unrelated source changes; moving the Pages ref also does not guarantee the CDN has refreshed yet.

**How to apply:** Verify the Pages build succeeded and the public route serves the newly referenced hashed assets before reporting deployment complete.

## Delta generation on a diverged branch

When the local branch is both ahead of and behind `origin/main`, build the publication delta with `git diff origin/main HEAD` (two-dot), not `git diff origin/main...HEAD` (three-dot). The three-dot form starts at the merge base and can include many blobs already in remote `main`. Still require the created tree SHA to match local `HEAD^{tree}` before updating the ref.

**Why:** A three-dot diff included many already-published files and caused unnecessary blob uploads; the direct base-to-HEAD delta was smaller and produced the same exact local tree.

**How to apply:** Recheck the remote `main` SHA and tree, compare directly against that base, upload only missing blobs, then verify the resulting tree hash before committing.

## Resumable CodeExecution batches

For multi-batch GitHub uploads, define and invoke any helper containing a `"use impure"` function in the same CodeExecution block. A helper reused from a prior block may fail with `executeJs is not defined`; keep the resumable progress in the journal instead of relying on a persisted helper closure.

**Why:** The durable runtime retained the helper name but not its impure dispatcher across blocks, while inline batch execution worked reliably.

**How to apply:** Keep each upload batch self-contained and record every successful blob SHA in the journal so a later block can safely resume.

## Preserve Git blob bytes across shell callbacks

When uploading files through GitHub's Git Data API, read large files as bytes inside the same `use impure` block that calls `createBlob`, then send `bytes.toString("base64")` with `encoding: "base64"`. Avoid routing large base64 through `shellExec`; its callback can truncate a payload even when a larger output limit was requested. Text intermediates can also normalize line endings.

**Why:** A 677KB bundle sent through shell-produced base64 became a 61KB remote blob, while direct filesystem reading in the integration call preserved all bytes. Earlier text transfers also changed blob hashes through newline normalization.

**How to apply:** Hash each local byte buffer as a Git blob before upload, compare that SHA with `createBlob`'s response, upload sequentially, and verify the complete tree SHA before updating a ref.
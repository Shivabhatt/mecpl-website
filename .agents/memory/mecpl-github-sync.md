---
name: MECPL GitHub sync fallback
description: Safe fallback for publishing the MECPL repository when Git HTTPS credentials are rejected.
---

If normal Git HTTPS authentication fails, use the authorized GitHub connector’s Git Data API: upload deduplicated blobs, create a tree from the current remote tree, verify it exactly matches the local HEAD tree, create a commit on the current remote head, and update `main` with force disabled.

**Why:** The connector can have valid repository write access even when every stored HTTPS token is rejected. When local-only parent commits are no longer present in GitHub’s object database, the remote commit ID cannot match the local merge commit, but their complete tree contents can still match exactly.

**How to apply:** Pull and resolve first, validate the app, recheck that the remote head has not moved, compare the created tree hash with local HEAD, and refuse the ref update on any mismatch. Confirm the published branch by fetching it back and comparing tree hashes.
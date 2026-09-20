# All Cats Must Die — playable build goes here

The **"All Cats (Play)"** desktop icon opens a window that embeds this game via an iframe
pointing at `games/allcats/index.html`.

## How to add the playable build

1. Open the project in **Construct 3**.
2. Go to **Menu → Project → Export → Web (HTML5)**.
3. Unzip the exported files directly into this folder (`games/allcats/`) so that
   **`games/allcats/index.html`** exists (alongside its `scripts/`, `images/`, etc.).
4. Commit and push. The game will then auto-load in the "All Cats (Play)" window.

Until `index.html` is present here, the window shows a friendly "coming soon" placeholder.

No code changes are needed — the path is already wired up in `index.html`
(`<iframe data-src="games/allcats/index.html">`).

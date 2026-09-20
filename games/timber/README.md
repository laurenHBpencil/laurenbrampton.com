# Custom Timber (SFML / C++) — WebAssembly build goes here

The **"Timber (Play)"** desktop icon opens a window that embeds this game via an iframe
pointing at `games/timber/index.html`.

## How to add the playable build

SFML/C++ games run in the browser after being compiled to **WebAssembly** with
[Emscripten](https://emscripten.org/).

1. Install the Emscripten SDK (`emsdk`) and an SFML build targeting web
   (e.g. SFML built with Emscripten, or use the SFML `emscripten` examples as a template).
2. Compile the project so Emscripten emits: `index.html`, a `.js`, a `.wasm`,
   and (if you bundle assets) a `.data` file.
3. Drop all of those into this folder (`games/timber/`) so that
   **`games/timber/index.html`** exists.
4. Commit and push. The game will then auto-load in the "Timber (Play)" window.

Until `index.html` is present here, the window shows a friendly "coming soon" placeholder.
The path is already wired up in `index.html` (`<iframe data-src="games/timber/index.html">`).

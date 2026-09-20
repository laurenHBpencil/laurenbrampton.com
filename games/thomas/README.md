# Thomas Was Late (SFML / C++) — WebAssembly build goes here

The **"Thomas Was Late (Play)"** desktop icon opens a window that embeds this game via an
iframe pointing at `games/thomas/index.html`.

## How to add the playable build

SFML/C++ games run in the browser after being compiled to **WebAssembly** with
[Emscripten](https://emscripten.org/).

1. Install the Emscripten SDK (`emsdk`) and an SFML build targeting web.
2. Compile the project so Emscripten emits: `index.html`, a `.js`, a `.wasm`,
   and (if you bundle assets) a `.data` file.
3. Drop all of those into this folder (`games/thomas/`) so that
   **`games/thomas/index.html`** exists.
4. Commit and push. The game will then auto-load in the "Thomas Was Late (Play)" window.

Until `index.html` is present here, the window shows a friendly "coming soon" placeholder.
The path is already wired up in `index.html` (`<iframe data-src="games/thomas/index.html">`).

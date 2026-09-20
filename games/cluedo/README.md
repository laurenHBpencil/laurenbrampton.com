# Cluedo (Java Swing) — runnable JAR goes here

The **"Cluedo (Play)"** desktop icon opens a window that runs the Java Swing app
**in the browser** using [CheerpJ](https://cheerpj.com/) (no plugins, no server).

## How to add the playable build

1. Build a **runnable** JAR of the Cluedo project (a `.jar` with a `Main-Class`
   manifest entry so it launches with `java -jar`).
2. Place it here as **`games/cluedo/CluedoTopcat.jar`**.
3. Commit and push. Open the "Cluedo (Play)" window and click **▶ Launch Cluedo**.

CheerpJ mounts the site root at `/app/`, so the app is loaded from
`/app/games/cluedo/CluedoTopcat.jar`.

### Using a different jar name?
Update the path in `launchCluedo()` inside `script.js`:
```
cheerpjRunJar('/app/games/cluedo/CluedoTopcat.jar');
```

Notes:
- CheerpJ is loaded on demand only when the visitor clicks **Launch** (keeps the site fast).
- Swing UIs run well in CheerpJ; very heavy graphics/threads may run slower than native.

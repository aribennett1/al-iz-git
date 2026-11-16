# Al iz git

A Git terminal with a little more neshama. Ten phonetic Yiddish puns become ten original animated experiences. Static HTML, CSS, and JavaScript modules; no build step, runtime dependencies, backend, or real Git execution.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://localhost:4173. Use an HTTP server because JavaScript modules do not reliably load from `file://` URLs.

## Try it

Click a sidebar command or type it and press Enter. For a quick demo, try `git filter fish`, `git shmak`, then `git morgen`. Each scene returns to the terminal automatically. On phones, swipe the horizontal command strip.

| Command | Meaning | Experience |
| --- | --- | --- |
| `git shabbos` | Gut Shabbos | Warm light and flickering candles |
| `git shmak` | Geschmak | Canvas fireworks and animated celebration |
| `git valt` | Gevalt | Terminal panic, shake, and recovery |
| `git filter fish` | Gefilte fish | Original fish illustration and a deadpan punchline |
| `git morgen` | Gut morgen | Sunrise interrupted by RABOISAI! AH!!! |
| `git nacht` | Gut nacht | Moonrise and twinkling stars |
| `git voch` | Gut voch | Candle burns down; falling wax drops pool into GIT VOCH! |
| `git yomtov` | Gut Yom Tov | Festive lights and a holiday greeting |
| `git gezunt` | Zei gezunt | ECG, scan, and neshama diagnostics |
| `git-zuntight` | Gesundheit | A person sneezing into a tissue, with a real sneeze |

`help` lists commands; `clear` clears output. ↑/↓ browse session history and preserve your unfinished draft. Tab completes a command or lists matches. Esc, Ctrl+C, and Skip stop animations. Commands ignore case and repeated whitespace. Unknown input is displayed safely as text, with matching suggestions when available.

Use “Copy command link” to share a scene (`#git-filter-fish`, for example; older links still work). Sound plays when you click a command or press Enter, with a mute toggle and volume slider. Shared links open silently until you interact. Command sounds start immediately, except the sneeze, which plays after 1.1 seconds with the animated achoo. Switching commands or interrupting stops current and pending sound. Fish bubbles stop before the punchline. Reduced-motion users receive still scenes without canvas fireworks, shake, or motion. Audio is optional.

## Bubby's kitchen

Developers type real Git commands, so real Git commands get answered too. When input is not one of the ten commandments, Bubby takes it. Each is a full scene, and none of the ten changed.

| Command | Bubby | Experience |
| --- | --- | --- |
| `git log` | Her call log | 47 missed calls, voicemails escalating, and a call you cannot decline |
| `git diff` | Her kugel | Recipe diff (+schmaltz), then her kugel next to yours. "Yours is also nice." |
| `git push` | Her table | Fourteen plates stack into a swaying tower. "Who's pushing?" |
| `git push --force` | The airplane | A spoon flies loop-the-loops and dives at a closed mouth. Rejected. Retrying. |
| `git merge` | The shadchan | Two branches, a mothers' merge conflict, a chuppah, a broken glass, MAZEL TOV |
| `git blame` | Nobody is blaming | The family points at each other faster and faster, then everyone points at you |
| `git bisect` | The investigation | Eight relatives bisected to find who took the rugelach. The author is not who you think. |
| `git cherry-pick` | The fruit stand | She rejects cherries (bruised, attitude, too soft) and picks the one perfect one |
| `git reset --hard` | Her soup | Your work cracks and falls away. Then soup. "Life is hard. Eat." |

Arguments are fine: `git push origin main`, `git push -f`, `git reset --hard HEAD~1` and `git bisect start` all route to their scene. Bubby's scenes live in `js/bubby.js` (registry), `js/bubby-scenes.js` (character and scenes), `js/bubby-sounds.js` (sounds) and `css/bubby.css`, and follow the same rules as the ten: every timer through `later`, every sound through `Sound.stop()`, no user input rendered. All Bubby audio is synthesized at runtime, so there are no recordings or licenses to track.

## Deploy to GitHub Pages

This repository includes a Pages Actions workflow that uploads only `index.html`, `css`, `js`, `data`, and `media`. All asset references are relative and work under `/al-iz-git/`.

1. Push the repository to GitHub, on the `main` branch.
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Run the “Deploy to GitHub Pages” workflow, or push a change to `main`.
4. Open the deployment URL returned by the workflow. The expected project URL is `https://aribennett1.github.io/al-iz-git/` once enabled and deployed.

Alternatively select “Deploy from a branch”, `main`, `/ (root)` in Pages settings; no build is required. `.nojekyll` is included. Hosting has not been activated or deployment verified by this implementation.

## Architecture and adding a command

- `js/commands.js`: central registry, labels, pun meanings, durations, normalization.
- `js/app.js`: terminal history, keyboard handling, routing, selection, cancellable lifecycle.
- `js/animations.js`: original scene illustrations, animations, fireworks.
- `js/media.js`: local recordings, CC0 effects, Web Audio fallback tones, caching, volume, and cancellable sound playback.
- `css/main.css`: responsive interface, scene styling, reduced-motion overrides.
- `data/media-manifest.json`: structured media research and unresolved rights.

Review a new command’s phonetic validity first: “git” must contribute to the word or expression. Add its registry entry, animation case, CSS, completion text, and manifest record. Use the supplied `later` callback for **every animation timer** so switching commands cancels pending work. Any new sound or media must stop through `Sound.stop()`. Keep user input in `textContent`. Never execute input, invoke Git, or use `eval`.

## Media and licensing

All included art is original CSS/SVG/canvas. `media/shabbos.mp3`, `media/mdy.mp3`, and `media/git voch.mp3` were supplied by the user and wired for playback on request. The Voch file contains audio only; `media/voch.mp3` is a lossless audio extraction for browser compatibility. The supplied clips’ original sources and reuse licenses have not been independently verified and are not covered by this repository’s MIT license.

Bubbles and the real sneeze are bundled **CC0** sound effects from Freesound. Original fallback tones are synthesized. Full source URLs, creators, licenses, and transformations appear in [media sources](docs/MEDIA_SOURCES.md), [media credits](media/CREDITS.md), and the [manifest](data/media-manifest.json). Other cultural recordings remain documented research candidates. The source code and original visual/audio effects are under the [MIT License](LICENSE); third-party recordings retain their own licenses.

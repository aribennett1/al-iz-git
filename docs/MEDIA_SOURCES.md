# Media research

Research date: November 13, 2026. Searches and source-page descriptions were inspected. Recordings were **not auditioned**, so no excerpt is claimed to be audibly verified. The initial cultural-media research did not obtain permissions or copy recordings. The implementation was subsequently updated at the user’s request with their supplied clips and downloaded CC0 effects, as described below. `permission_pending` means permission is still required, not that outreach occurred.

The machine-readable [manifest](../data/media-manifest.json) records one candidate per command, source, intended use, timing uncertainties, status, asset paths, and fallback. The manifest now identifies bundled CC0 effects and user-supplied clips separately from research candidates. Official availability, free download buttons, and archive access do not establish redistribution rights.

| Command | Research finding | Current use / remaining work |
| --- | --- | --- |
| `git shabbos` | [TYH: Good Shabbos](https://tyh.org/song/good-shabbos/) credits Mendy Worch (2023) and links its official [YouTube player](https://www.youtube.com/watch?v=t2IcU3z8q1g). | Silent candles. Audition greeting, check embedding availability or request excerpt rights. Download links alone do not authorize redistribution. |
| `git shmak` | [Geshmak to Be a Yid](https://www.youtube.com/watch?v=zGen2ELGn-s), Yossi Rodal feat. Joey Newcomb, is linked as the official Chabad on Campus video in [release coverage](https://collive.com/geshmak-to-be-a-yid-music-video-debuts-at-pegisha-havdallah/). | Original fireworks and tones. Candidate is a song, not yet a verified standalone enthusiastic exclamation. Audition and review permissions. |
| `git valt` | [Forvo pronunciation entry](https://forvo.com/word/oy_gevalt/) found. | Original alarm and red terminal scene. Contributor, timing, reuse terms, and dramatic suitability remain unverified. No copied pronunciation. |
| `git filter fish` | Artist page: [Felix Shinder — Gefilte Fish](https://felixshinder.bandcamp.com/track/gefilte-fish), released July 24, 2016. | Original SVG and bubbles. Music intentionally omitted to protect the requested deadpan delivery; free download is not a reuse license. |
| `git morgen` | [MDY’s own site](https://www.supportmdy.com/) identifies R’ Eli Stefansky and twice-daily shiurim. [Reporting](https://www.jewishpress.com/sections/features/nothing-like-hearing-good-morning-raboisai-ahh-on-a-saturday-night/2024/12/25/) corroborates the signature opening. | Silent original sunrise-to-typography sequence with MDY link. **Specific clip and timestamp unresolved.** Locate an official episode, audition its opening, note exact in/out times, obtain permission or use its allowed player. No AI voice imitation. |
| `git nacht` | [Yiddish Book Center: Learning Music as a Child](https://www.yiddishbookcenter.org/collections/oral-histories/excerpts/woh-ex-0004268/learning-music-child) identifies Shirley Schachter Katz singing a Yiddish lullaby. | Silent night scene. Audition lullaby segment and request applicable rights. |
| `git voch` | [Spotify: Big Avoidas](https://open.spotify.com/album/3moAWbawu9U7U5d568ZD2A) lists Joey Newcomb’s A Gutte Voch. The PRD supplies 2022 and approximate chorus entry 00:35. | Silent braided candle, greeting, and Spotify album link. **00:35 is supplied, not independently verified**; end time unresolved. Use permitted official player or obtain recording/composition excerpt rights before local playback. No substitute song. |
| `git yomtov` | [Penn’s Freedman catalogue](https://digital.library.upenn.edu/webbin/freedman/lookupartist?hr=&what=10193), Gut Yom Tov, track ID 5822, Workmen’s Circle Chorus / Zalmen Mlotek. [FAU archive](https://rsa.fau.edu/album/41496) also lists Gut Yom Tov and warns of copyright-restricted previews. | Original holiday scene and tones. Audition suitable track and obtain rights; never circumvent archive preview limits. |
| `git gezunt` | [Yiddish Book Center: Mother’s blessing](https://www.yiddishbookcenter.org/collections/oral-histories/excerpts/woh-ex-0001570/gezunt-zay-gezunt-un-kum-gezunt-mother-s-yiddish-blessing-safe-travel) identifies Ghita Wolpowitz recalling “zay gezunt.” | Original monitor and diagnostics. Verify phrase timing and permission before copying an excerpt. |

## Integrated recordings and effects

The user added `media/shabbos.mp3` (4.992 s), `media/mdy.mp3` (7.008 s), and `media/git voch.mp3` (10.512 s), and explicitly requested playback on command click. The Voch container contains an MP3 audio track without video; `media/voch.mp3` extracts that track losslessly for reliable browser decoding. These supplied clips are integrated; their original-source licenses have not been independently established. Earlier table entries remain research context, not the current playback state for these commands.

- **Bubbles.wav — joeboarder14**: [source and CC0 declaration](https://freesound.org/people/joeboarder14/sounds/412619/). Public preview downloaded, first 3.05 s retained with fades and MP3 re-encoding. Plays during the fish entrance and stops before “I think that’s borer.”
- **Young_adult_male_sneezing — _javier_rodas**: [source and CC0 declaration](https://freesound.org/people/_javier_rodas/sounds/848893/). Entire approximately 0.996 s public MP3 preview bundled unmodified. Plays with the illustrated sneeze 1.1 seconds after `git-zuntight` executes.

Both sources explicitly display [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), allowing reuse and modification. Only publicly accessible preview URLs declared in the pages were used; login-protected originals were not accessed. Credits are also in `media/CREDITS.md`.

## Audio implementation

Commands play sound when clicked or submitted with Enter, unless the user has muted sound. Shared-link animations stay silent until interaction. The AudioContext resumes in the click/keyboard handler before asynchronous file loading, which supports browser gesture requirements. Audio files are loaded and decoded on demand, then cached for repeat runs. No third-party player is loaded.

Command sounds, including MDY, Voch, and diagnostics, start immediately. The sneeze alone plays after 1.1 seconds, synchronized with the animated achoo. Scene durations leave time for both supplied clips to finish. A shared gain node controls volume for recordings and original effects. Muting, switching, skipping, clearing, Esc, Ctrl+C, and page departure stop active sources and invalidate pending decode callbacks so late audio cannot leak into a new scene. Missing files retain a visual fallback; non-vocal synthesized tones are available for the original commands. The sneeze has a silent visual fallback rather than an imitation.

For future media integration, document the license evidence and timestamp range first. Respect official-player terms and retain attribution. Route playback, mute/volume and teardown through `js/media.js`. Update the manifest honestly; do not label a link `official_embed` until embedding is actually integrated and verified.

## Link updates — November 15, 2026

The morning scene links to [MDY Daf](https://mdydaf.com/). Shabbos includes an outbound [Spotify link to Joey Newcomb’s How Aw Ya Reb Yid!](https://open.spotify.com/track/24nzik8ZBcQltLkJAO0hBd), verified against Spotify’s track page. This adds a listening link; the supplied local recording is unchanged.

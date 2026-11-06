# Portfolio verification

## Competition submission

The submission passed the production build, its TypeScript check, lint, and 13 Playwright checks. The new checks cover authentic image decoding and certificate inspection by touch and keyboard, including Escape and focus return. A browser pass opened all three certificates and decoded their images at desktop and mobile widths. The portrait and archive screenshots are in `test-results/submission/`.

The original images and their optimized copies are listed in the [asset manifest](ASSETS.md). The Lighthouse results below are from Phase 1.

## Phase 1 production checks

The workspace passed `npm run lint`, `npm run typecheck`, and `npm run build` on Windows with Node.js 24 and Next.js 16.4.3. Playwright Chromium passed all 10 tests against the production build.

- Chapter navigation and all three project pages
- The verified GitHub link, robots route, and social image route
- Mouse and keyboard completion, replay, and restart for Catch the Spark
- Mobile navigation, Escape focus return, and touch collection
- No horizontal overflow at 360, 390, 768, 1440, and 2560 pixels
- Four stills with reduced motion and a live render with WebGL
- Automatic restoration of the still after WebGL context loss
- No axe violations on the home page or the Chainshield AI detail page for the scanned WCAG 2.0 and 2.1 A/AA rules

Chromium is the tested browser. Touch was emulated, and WebGL was exercised with SwiftShader. Field INP data and physical-device results are unavailable.

## Lighthouse

Lighthouse 13.6.0 audited the local production server in headless Chromium with simulated mobile throttling and the desktop preset. These are lab results.

| Profile | Performance | Accessibility | Best practices | SEO | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 81 | 100 | 100 | 100 | 2.41 s | 0 | 664 ms |
| Desktop | 99 | 100 | 100 | 100 | 0.71 s | 0 | 96 ms |

Deferring GSAP until desktop scroll, removing the secondary font download, and prioritizing the hero still raised mobile performance from 67 to 81 and desktop from 90 to 99 in these runs. Mobile met the LCP target and fell short of the 90 performance goal. The final mobile trace still attributes its largest long task to a Next.js startup script.

## Visual review

Reviewed the 1440px and 390px hero layouts and rendered views of every desktop chapter. The second pass relaxed display tracking, improved the introduction’s line break, reframed the project plates, and added individual artwork notes to the project files.

| Judge criterion | Score | Observed evidence |
| --- | --- | --- |
| First impression | 8/10 | The opening fits the name, thesis, work link, and sculpture into one desktop viewport. Mobile gives the sculpture its own plate beneath the introduction. |
| Originality | 8/10 | The four forms share a custom folded mesh and use different openings and orientations. The three project plates explore terrain, interlocking forms, and waveforms. |
| Art direction | 9/10 | Ivory, cobalt, silver, drafting grids, and plate numbering recur across the hero, work, game, and ending. |
| Beauty | 8/10 | The wide AgriQueue plate, staggered secondary projects, and cobalt closing produce three distinct compositions. |
| Interaction | 8/10 | The sculpture responds to pointer and scroll. The game turns eight input events into a visible constellation and supports replay by keyboard, mouse, and touch. |
| Storytelling | 7/10 | The first-year arc connects building, competing, and learning. A real portrait and first-hand project material would give the story more specificity. |
| Authenticity | 9/10 | Project art is labeled, participation is described as participation, and the only social link is the verified GitHub profile. |
| Craftsmanship | 8/10 | Production, layout, accessibility, and context-loss tests passed. The tested browser and device scope is documented above. |
| Memorability | 8/10 | The folded form returns in the final composition, and the visitor can leave a completed constellation in the Playground. |


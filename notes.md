### Notes

The code you’re seeing is a vanilla Next.js app, with single catch-all route defined `[slug].tsx` which matches the example routes we saw previously.

The content is loaded in via .html files, one has videos, the other is purely text with paragraph tags.
s

- **Review VideoPlayer component**
  - Multiple possibilities with 3 options and default export
- **Review pages/[slug].tsx import structure**
  - Normal import from VideoPlayer, component is used where we find the videoPlayer div tag in the .html content, however this current setup will include videoPlayer all both pages.
  - Review Bundle Analyzer `file:///Users/chriseagle10up/Sites/playground/dynamicimports/bundle-analyzer/standard.html`
    [Article Without Video Player &rarr;](http://localhost:3000/article-without-video-player)
- **Dynamically Import VideoPlayer in [slug].tsx**
  - Review Bundle Analyzer `file:///Users/chriseagle10up/Sites/playground/dynamicimports/bundle-analyzer/dynamic.html`
    - Check network in dev tools for chunk
    - Note differences between article with and article without
      [Article Without Video Player &rarr;](http://localhost:3000/article-without-video-player)
      [Article With Video Player &rarr;](http://localhost:3000/article-with-video-player)
- **Server Side Rendering**
  - next/dynamic and LoadableComponent both support ability to control SSR
  - by default dynamically imported components will be rendered on the server first
  - if component is not critical for SEO, we can safely defer and disable SSR and client render
  - Rebuild project with ssr disabled and loading state
  - Disable JS in browser
  - VideoPlayer deferred and rendered on client only
- **On Interactivity**
  - Possible to go even further and defer loading until the user interacts to defer the loading and rendering
  - VideoPlayerIntersection
    - Disable JS In browser, loading state is used
    - On Scroll, component is rendered
    - Successfully deferred loading all that third party youtube code until we need it
  - [Article With Video Player Intersection &rarr;](http://localhost:3000/article-with-video-player-intersection)

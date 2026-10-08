import Document, { Html, Head, Main, NextScript } from 'next/document'

// Keeps the page hidden, on the right theme's own background, until _app has
// mounted and applied the saved theme and accent. Without it the server
// render (light) shows for a moment before switching to the dark theme.
// _app removes data-theme-pending once the theme is resolved; the animation
// reveals the page anyway after 2s in case JS never runs. Transitions are off
// while pending, otherwise colors would still be animating from the server
// render's light theme when the page shows.
const themeScript = `
(function(){
  var theme = 'light';
  try {
    var saved = window.localStorage.getItem('theme');
    var dark = saved === 'dark' || saved === 'purple' ||
      (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) theme = 'dark';
  } catch (e) {}
  var background = theme === 'dark' ? '#0f0d23' : '#fff';
  document.documentElement.style.background = background;
  document.body.style.background = background;
  document.documentElement.setAttribute('data-theme-pending', theme);
})()`

const themePendingStyle = `
html[data-theme-pending] *,
html[data-theme-switching] * {
  transition: none !important;
}
html[data-theme-pending] body {
  visibility: hidden;
  animation: bolio-theme-reveal 0s linear 2s forwards;
}
@keyframes bolio-theme-reveal {
  to { visibility: visible; }
}`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: themePendingStyle }} />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

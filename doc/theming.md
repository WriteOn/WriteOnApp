WriteOn Theming Guide
=======================

In **WriteOn**, a theme is pretty much a [LESS][1] file that overrides the default look and feel.

### Create a special theme very quickly by following these steps

 1. In `res/themes`, create a LESS file, just like the other themes.

	> You can put images in `res/img`.

 2. Add an entry in `THEME_LIST` at the end of `public/res/constants.js` with the filename as a key and the name of the theme as a value.

	> **Example:** `"beard": "The beardiest theme ever"`

 5. Run the application using the `?debug` flag. Basically:
 
        https://codio-url:9500/?debug
 
 6. Go to `Settings -> Editor -> Theme` and select the theme. Check that everything is fine.

 7. Commit, push, create a pull request and wait for publishing.


> Written with [WriteOn](http://writeon.io).


  [1]: http://lesscss.org/
  [2]: https://github.com/BeardandFedora/WriteOn
  [3]: https://github.com/BeardandFedora/WriteOnApp/blob/master/doc/developer-guide.md#getting-started
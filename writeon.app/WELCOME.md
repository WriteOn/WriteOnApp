Welcome to WriteOn!
===================


Hey! I'm your first story in **WriteOn**[^writeon]. Don't delete me, I'm very helpful! I can be recovered anyway in the **Utils** tab of the <i class="icon-cog"></i> **Settings** dialog.

----------


Stories
-------------

WriteOn stores your stories in your browser, which means all your stories are automatically saved locally, until you delete them. You could even access the Pad editor offline in the <a href="/off">offline editor</a> <sup class="text-danger">βeta</sup>, allowing you to write without an internet connection.

> **Note:**

> - In the writing <a href="/pad">Pad</a>, everything you type is saved locally, but you must login to use the app
> - The <a href="/off">offline editor</a> <sup class="text-danger">βeta</sup> is accessible offline after the application has been loaded for the first time.
> - Your local stories are not shared between different browsers or computers unless synced.
> - Clearing your browser's data or cookies may **delete all your local stories**.  To avoid this, make sure your stories are synchronized with **WriteOn** - or **Google Drive** or **Dropbox**. Check out the [<i class="icon-refresh"></i> Synchronization](#synchronization) section for more info.

#### <i class="icon-file"></i> Create a story

The story panel is accessible using the <img src="writeon/img/archive-icon-md.png" class="story-icon" style="display:inline-table;"> 			button in the navigation bar. You can create a new story by clicking <i class="icon-plus"></i> **New story** in the Stories panel.

#### <img src="writeon/img/archive-icon-md.png" class="story-icon" style="display:inline-table"> Switch to another story

All your local stories are listed in the story panel. You can switch from one to another by clicking a story in the list or you can toggle stories using <kbd>Ctrl+[</kbd> and <kbd>Ctrl+]</kbd>.

#### <i class="icon-pencil"></i> Rename a story

You can rename the current story by clicking the story title in the navigation bar.

#### <i class="icon-trash"></i> Delete a story

You can delete the current story by clicking <i class="icon-trash"></i> **Delete story** in the Stories panel.

#### <i class="icon-hdd"></i> Export a story

You can save the current story to a file by clicking <i class="icon-download"></i> **Download** from the menu panel and choosing your format.

> **Tip:** Check out the [<i class="icon-share"></i> Publish](#publish-a-document) section for a description of the different output formats.


----------


Synchronization
-------------------

WriteOn can be combined with our <i class="icon-provider-mywriteon"></i> **built-in cloud**, <i class="icon-provider-gdrive"></i> **Google Drive** and <i class="icon-provider-dropbox"></i> **Dropbox** to have your stories saved in the *Cloud*. The synchronization mechanism takes care of uploading your modifications or downloading the latest version of your stories.

> **Note:**

> - Full access to **Google Drive** or **Dropbox** is required to be able to import any story in WriteOn. Permission restrictions can be configured in the settings.
> - Imported stories are downloaded in your browser and are not transmitted to a server.
> - If you experience problems saving your stories on Google Drive, check and optionally disable browser extensions, such as Disconnect.

#### <i class="icon-docs"></i> Import a story

You can import a story from <i class="icon-provider-gdrive"></i> **Google Drive** or <i class="icon-provider-dropbox"></i> **Dropbox** by opening the  **Stories** panel and then <i class="icon-docs"></i> **Import** sub-menu and by selecting an option. Once opened, any modification in your story will be automatically synchronized with the file in your **Google Drive** / **Dropbox** account. You can also import from local files or a URL.

#### <i class="icon-upload-cloud"></i> Save a story to the cloud

You can save any story that is saved in the cloud by opening the <i class="icon-upload-cloud"></i> **Synchronize** sub-menu and by clicking your preferred cloud account. Even if your story is already synchronized with **WriteOn**, **Google Drive** or **Dropbox**, you can export it to a another location. WriteOn can synchronize one story with multiple locations and cloud accounts.

#### <i class="icon-refresh"></i> Synchronize a story

Once your story is linked to a <i class="icon-provider-mywriteon"></i> **WriteOn Cloud** , <i class="icon-provider-gdrive"></i> **Google Drive** or <i class="icon-provider-dropbox"></i> **Dropbox** account, WriteOn will periodically (every 2 minutes or less) synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be detected.

If you just have modified your story and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the <i class="icon-upload-cloud"></i> **Sync** menu.

> **Note:** The <i class="icon-refresh"></i> button is disabled when you have no story to synchronize.

#### <i class="icon-edit"></i> Manage story synchronizations

Since one story can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-edit"></i> **Manage synchronization** in the <i class="icon-upload-cloud"></i> **Synchronize** menu. This will let you remove synchronization locations that are associated to your story.

> **Note:** If you delete the file from **WriteOn**, **Google Drive** or from **Dropbox**, the story will no longer be synchronized with that location.

----------


Publication
-------------

Once you are happy with your story, you can publish it on different platforms directly from WriteOn. As for now, WriteOn can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any **SSH server**. More are on the way, such as Ghost.

#### <i class="icon-share"></i> Publish a story

You can publish your story by opening the <i class="icon-share"></i> **Publish** menu and by choosing a platform. In the dialog box, you can choose the publication format:

- Markdown, to publish the Markdown text on a website that can interpret it (**Tumblr**, **Wordpress**, and **GitHub** for instance),
- HTML, to publish the story converted into HTML (on a blog for example)
- Template, to have a full control of the output using the built-in template.

> **Note:** The default template is a simple webpage wrapping your story in HTML format. You can customize it in the <i class="icon-list-alt"></i> **Templates** tab of the <i class="icon-cog"></i> **Settings & Preferences** dialog.

#### <i class="icon-refresh"></i> Update a publication

After publishing, WriteOn will keep your story linked to that publication which makes it easy for you to update it. Once you have modified your story and you want to update your publication, click on the <i class="icon-refresh"></i> option in the **Sync** menu.

> **Note:** The <i class="icon-refresh"></i> button is disabled when your story has not been published yet.

#### <i class="icon-edit"></i> Manage story publication

Since one story can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-edit"></i> **Manage publication** in the <i class="icon-provider-writeon"></i> menu panel. This will let you remove publication locations that are associated to your story.

> **Note:** If the file has been removed from the website or the blog, the story will no longer be published on that location. However, removing the published location from WriteOn will not remove the published story from the platform you published it on.

----------


Markdown Extra
--------------------

WriteOn supports **Markdown Extra**, which extends **Markdown** syntax with some nice features.

> **Tip:** You can disable any **Markdown Extra** feature in the **Extensions** tab of the <i class="icon-cog"></i> **Settings** dialog.

> **Note:** You can find more information about **Markdown** syntax [here][2] and **Markdown Extra** extension [here][3].


### Tables

**Markdown Extra** has a special syntax for tables:

Item     | Value
-------- | ---
Computer | $1600
Phone    | $12
Pipe     | $1

You can specify column alignment with one or two colons:

| Item     | Value | Qty   |
| :------- | ----: | :---: |
| Computer | $1600 |  5    |
| Phone    | $12   |  12   |
| Pipe     | $1    |  234  |


### Definition Lists

**Markdown Extra** has a special syntax for definition lists too:

Term 1
Term 2
:   Definition A
:   Definition B

Term 3

:   Definition C

:   Definition D

	> part of definition D


### Fenced code blocks

GitHub's fenced code blocks are also supported with **Highlight.js** syntax highlighting:

```
// Foo
var bar = 0;
```

> **Tip:** To use **Prettify** instead of **Highlight.js**, just configure the **Markdown Extra** extension in the <i class="icon-cog"></i> **Settings** dialog.

> **Note:** You can find more information:

> - about **Prettify** syntax highlighting [here][5],
> - about **Highlight.js** syntax highlighting [here][6].


### Footnotes

You can create footnotes like this[^footnote].

  [^footnote]: Here is the *text* of the **footnote**.


### SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                  | ASCII                        | HTML              |
 ----------------- | ---------------------------- | ------------------
| Single backticks | `'Isn't this fun?'`            | 'Isn't this fun?' |
| Quotes           | `"Isn't this fun?"`            | "Isn't this fun?" |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash |


### Table of contents

You can insert a table of contents using the marker `[TOC]`:

[TOC]


### UML diagrams

You can render sequence diagrams like this:

```sequence
Beard->Fedora: Hello Beard, how are you?
Note right of Beard: Beard thinks
Beard-->Fedora: I am good thanks!
```

And flow charts like this:

```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```

> **Note:** You can find more information:

> - about **Sequence diagrams** syntax [here][7],
> - about **Flow charts** syntax [here][8].


  [^writeon]: [WriteOn](https://writeon.io/) let's you write without distraction, and publish without effort. WriteOn is an in-browser story editor which is fast, easy and unique. The refined text editor of WriteOn helps you focus on your writing, while visualizing the shape of it in real time.


  [1]: http://math.stackexchange.com/
  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"
  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"
  [5]: https://code.google.com/p/google-code-prettify/
  [6]: http://highlightjs.org/
  [7]: http://bramp.github.io/js-sequence-diagrams/
  [8]: http://adrai.github.io/flowchart.js/

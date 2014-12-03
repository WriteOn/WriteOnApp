Welcome to WriteOn!
===================


Hey! I'm your first story in **WriteOn**[^writeon]. Don't delete me, I'm very helpful! I can be recovered anyway in the **Utils** tab of the <i class="icon-cog"></i> **Settings** dialog.

----------


Stories
-------------

WriteOn stores your stories in your browser, which means all your stories are automatically saved locally and are accessible **offline!**

> **Note:**

> - WriteOn is accessible offline after the application has been loaded for the first time.
> - Your local stories are not shared between different browsers or computers.
> - Clearing your browser's data may **delete all your local stories!** Make sure your stories are synchronized with **Google Drive** or **Dropbox** (check out the [<i class="icon-refresh"></i> Synchronization](#synchronization) section).

#### <i class="icon-file"></i> Create a story

The story panel is accessible using the <i class="icon-folder-open"></i> button in the navigation bar. You can create a new story by clicking <i class="icon-file"></i> **New story** in the story panel.

#### <i class="icon-folder-open"></i> Switch to another story

All your local stories are listed in the story panel. You can switch from one to another by clicking a story in the list or you can toggle stories using <kbd>Ctrl+[</kbd> and <kbd>Ctrl+]</kbd>.

#### <i class="icon-pencil"></i> Rename a story

You can rename the current story by clicking the story title in the navigation bar.

#### <i class="icon-trash"></i> Delete a story

You can delete the current story by clicking <i class="icon-trash"></i> **Delete story** in the story panel.

#### <i class="icon-hdd"></i> Export a story

You can save the current story to a file by clicking <i class="icon-hdd"></i> **Export to disk** from the <i class="icon-provider-writeon"></i> menu panel.

> **Tip:** Check out the [<i class="icon-upload"></i> Publish a story](#publish-a-document) section for a description of the different output formats.


----------


Synchronization
-------------------

WriteOn can be combined with <i class="icon-provider-gdrive"></i> **Google Drive** and <i class="icon-provider-dropbox"></i> **Dropbox** to have your stories saved in the *Cloud*. The synchronization mechanism takes care of uploading your modifications or downloading the latest version of your stories.

> **Note:**

> - Full access to **Google Drive** or **Dropbox** is required to be able to import any story in WriteOn. Permission restrictions can be configured in the settings.
> - Imported stories are downloaded in your browser and are not transmitted to a server.
> - If you experience problems saving your stories on Google Drive, check and optionally disable browser extensions, such as Disconnect.

#### <i class="icon-refresh"></i> Open a story

You can open a story from <i class="icon-provider-gdrive"></i> **Google Drive** or the <i class="icon-provider-dropbox"></i> **Dropbox** by opening the <i class="icon-refresh"></i> **Synchronize** sub-menu and by clicking **Open from...**. Once opened, any modification in your story will be automatically synchronized with the file in your **Google Drive** / **Dropbox** account.

#### <i class="icon-refresh"></i> Save a story

You can save any story by opening the <i class="icon-refresh"></i> **Synchronize** sub-menu and by clicking **Save on...**. Even if your story is already synchronized with **Google Drive** or **Dropbox**, you can export it to a another location. WriteOn can synchronize one story with multiple locations and accounts.

#### <i class="icon-refresh"></i> Synchronize a story

Once your story is linked to a <i class="icon-provider-gdrive"></i> **Google Drive** or a <i class="icon-provider-dropbox"></i> **Dropbox** file, WriteOn will periodically (every 3 minutes) synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be detected.

If you just have modified your story and you want to force the synchronization, click the <i class="icon-refresh"></i> button in the navigation bar.

> **Note:** The <i class="icon-refresh"></i> button is disabled when you have no story to synchronize.

#### <i class="icon-refresh"></i> Manage story synchronization

Since one story can be synchronized with multiple locations, you can list and manage synchronized locations by clicking <i class="icon-refresh"></i> **Manage synchronization** in the <i class="icon-refresh"></i> **Synchronize** sub-menu. This will let you remove synchronization locations that are associated to your story.

> **Note:** If you delete the file from **Google Drive** or from **Dropbox**, the story will no longer be synchronized with that location.

----------


Publication
-------------

Once you are happy with your story, you can publish it on different websites directly from WriteOn. As for now, WriteOn can publish on **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **Tumblr**, **WordPress** and on any SSH server.

#### <i class="icon-upload"></i> Publish a story

You can publish your story by opening the <i class="icon-upload"></i> **Publish** sub-menu and by choosing a website. In the dialog box, you can choose the publication format:

- Markdown, to publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML, to publish the story converted into HTML (on a blog for example),
- Template, to have a full control of the output.

> **Note:** The default template is a simple webpage wrapping your story in HTML format. You can customize it in the **Advanced** tab of the <i class="icon-cog"></i> **Settings** dialog.

#### <i class="icon-upload"></i> Update a publication

After publishing, WriteOn will keep your story linked to that publication which makes it easy for you to update it. Once you have modified your story and you want to update your publication, click on the <i class="icon-upload"></i> button in the navigation bar.

> **Note:** The <i class="icon-upload"></i> button is disabled when your story has not been published yet.

#### <i class="icon-upload"></i> Manage story publication

Since one story can be published on multiple locations, you can list and manage publish locations by clicking <i class="icon-upload"></i> **Manage publication** in the <i class="icon-provider-writeon"></i> menu panel. This will let you remove publication 


----------


locations that are associated to your story.

> **Note:** If the file has been removed from the website or the blog, the story will no longer be published on that location.

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

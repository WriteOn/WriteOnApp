WriteOn Language Guide
===================



## Summary

[TOC]

---

## Introduction

WriteOn uses a unique text formatting syntax based on Markdown, and is inspired by the typewriter. It is extremely simple, memorizable and visually lightweight on artifacts so as not to hinder writing -- characteristics that go hand in hand with the essence of **WriteOn**.

In the next sections you'll be guided through some of the features that will make **WriteOn** your new favorite writing machine. 

---

## Syntax Reference

If you're unfamiliar with language syntax, please spare a couple of minutes going through this [Wikipedia Markup Language Guide][link-syntax]. 

[link-syntax]: https://en.wikipedia.org/wiki/Markup_language "Wikipedia Markup Language Guide"

--- 

## Editing WriteOn documents 

This section is dedicated to introduce you to the differences between editing plain/rich text documents and WriteOn documents.

### Creating new documents

To create a WriteOn document, head to the File menu and select "New story" or simply press the shortcut â‡§âŒ˜N.

> **NOTE**  
> You can convert a plain text document to a WriteOn document by going to the "Format" menu and pressing âŒ¥ to reveal WriteOn conversion option or pressing the combination âŒ¥â‡§âŒ˜T.
>.

### Opening documents

WriteOn documents are opened like any other document, but **WriteOn** will only recognize and activate Markdown features if the file is bearing a well-known extension.

The recognized extensions are `.md`, `.markdown`, `.mdown` and `.markdn`.

If the document does not have one of these well-known extensions, you can always enable WriteOn features by converting the file (âŒ¥â‡§âŒ˜T).

> **NOTE**  
> WriteOn uses Markdown standards and syntax, and while Markdown does not have an official extension, we recommend the usage of `.md`, as it's the most widely adopted one.

### Handy shortcuts

Even though WriteOn's formatting syntax is light, there are a couple of commonly used style artifacts that force your hands out of their natural stance when typing -- **bold** and *italic*.

**WriteOn** preserves the hotkeys widely used for these effects. If you're about to write a word in bold or italic, just type âŒ˜B or âŒ˜I and it will place the corresponding formatting elements in place and advance the cursor. You can also select a word and apply the style or, conversely, select a word wrapped by these styles and **WriteOn** will remove them for you.

### Images

If you drag images into the text, they will automatically be replaced by a WriteOn reference to the file.

Due to **WriteOn**'s MultiMarkdown support you can even add custom attributes to your images, altering the way they're displayed. Please refer to [Custom attributes][section-mmd-attributes] section on the WriteOn highlights chapter for more details.

> **NOTE**  
> Keep in mind that when dragging images to the text, **WriteOn** will introduce a reference to that file's location on your disk (noticeable by the `file:` prefix).
> When publishing online, make sure you update this reference, otherwise you'll run into broken links.

---

## Preview mode 

WriteOn is often used as tool to generate stories for a more commonly used publishing format like HTML. The fact that it's an extremely simple, plain text based formatting syntax pretty much turns WriteOn into a super-hero publishing editor.

**WriteOn** expands the concept of a text editor by giving you the option to preview your text. At the distance of a shortcut, you can get a feel of how your writings will look like.

![WriteOn in preview mode][img-preview]

[img-preview]: img/preview.png "WriteOn in preview mode" class="shadow"

The preview mode will render the text using your current style settings. To dismiss this mode and go back to editing, just hit the Escape key.

---

## Exporting documents

In the vast majority of times, you will be using WriteOn for its *raison d'Ãªtre* -- as a source format to generate HTML. **WriteOn** let's you export the HTML output in two ways:

![Exporting options][img-export]

[img-export]: img/export.png "Export options"

* Copy the HTML output directly to your clipboard -- so you can conveniently paste it into your favorite HTML editor[^fn-export];
* Export to a file.

[^fn-export]: When copying to clipboard, **WriteOn** will only place the equivalent of the `body` tag contents. On the other hand, when exporting to a file, a complete HTML file will be generated.

We know how much you love **WriteOn**'s aesthetics so we even added a little bonus to the option of exporting to a file.

![Exporting with WriteOn's current theme][img-export_theme]

[img-export_theme]: img/export_theme.png "Exporting with WriteOn's current theme"

Including **WriteOn**'s theme in the exported file will give you an exact copy of what you see in the preview mode. With this option enabled, font type, size and text width will be preserved when the output file is generated.

---

## WriteOn highlights

As useful as WriteOn is on its own, WriteOn helps to extend your syntax library with many additional features. This section will briefly introduce you to the most interesting of them.

> **NOTE**  
> For a comprehensive reference, please refer to Fletcher T. Penney's [MultiMarkdown user guide][link-mmd_userguide].

[link-mmd_userguide]: https://github.com/fletcher/MultiMarkdown/blob/master/Documentation/MultiMarkdown%20User%27s%20Guide.md "Fletcher T. Penney's MultiMarkdown user guide"


### Cross-references 

Cross-references will become your new best friend when writing long documents. They will highly improve the navigability of the generated documents by giving the reader links to jump across sections with a single click.

#### Example 

    Clicking [here][section-preview] will lead you to the **WriteOn** website.

#### Result 

Clicking [here][section-preview] will lead you do the **WriteOn** website.

[section-preview]: http://writeon.io

### Footnotes

Footnotes are a simple, yet effective way of conveying non-crucial information to the reader.

Rather than parenthesizing a side note or place it between em-dashes -- as unimportant as it is, the reader will go through it, just like you did now -- you can defer its reading and expand on your thoughts there.

#### Example

    Clicking this number[^fn-sample_footnote] will lead you to a footnote.
    
    [^fn-sample_footnote]: Handy! Now click the return link to go back.

#### Result [section-mmd-footnotes-result]

Clicking this number[^fn-sample_footnote] will lead you to a footnote.

[^fn-sample_footnote]: Handy! Now click the return link to go back.


### Custom attributes

WriteOn introduces an unobtrusive way of adding custom attributes to images and links, allowing you to change they way they are displayed.

> **NOTE**  
> This is not available for inline links or images.

#### Example 

    The original image is 128x128 and contains no shadow.
    ![Original icon][img-icon_original]
    
    It will be displayed as 96x96 with a subtle shadow.
    ![Styled icon][img-icon_styled]
    
    [img-icon_original]: img/icon128.png "B"
    [img-icon_styled]: img/icon128.png "B" width="96px" height="96px"
    class="shadow"

#### Result

The original image is 128x128 and contains no shadow.

![Original icon][img-icon_original]

It will be displayed as 96x96 with a subtle shadow.

![Styled icon][img-icon_styled]

[img-icon_original]: img/icon128.png "A"
[img-icon_styled]: img/icon128.png "B" width="96px" height="96px"
class="shadow"


### Meta information

With WriteOn, you can also embed metadata on your documents.

Metadata must be placed at the top of the document -- there can be no white-spaces before -- and it ends with the first empty line. Each entry is composed of key and values, separated by a colon (`:`).

There are plenty of keys supported, some of the most common being `Title`, `Author`, `Date`, `Copyright`, `Keywords` and `Email`. Be sure to check [Fletcher's guide][link-mmd_userguide] for a full reference.

> **TIP**  
> When adding metadata information to your documents, make sure you always leave two spaces at the end of each metadata line. This will ensure that exporting to plain Markdown will result in a properly formatted piece of text -- as opposed to a single run-on paragraph.

#### Example [section-mmd-meta]

    Title:	Document title  
    Author:	John Doe  
    		Jane Doe  
    Date:	January 1st, 2012  


### Tables [section-mmd-tables]

Tables are perfect to display structured data in rows and columns. WriteOn supports the generation of tables by using a couple of simple rules alongside the use of the pipe character -- `|`.

#### Example [section-mmd-tables-example]

    | First Header  | Second Header | Third Header         |
    | :------------ | :-----------: | -------------------: |
    | First row     | Data          | Very long data entry |
    | Second row    | **Cell**      | *Cell*               |
    | Third row     | Cell that spans across two columns  ||
    [Table caption, works as a reference][section-mmd-tables-table1] 

#### Result [section-mmd-tables-result]

| First Header  | Second Header | Third Header         |
| :------------ | :-----------: | -------------------: |
| First row     | Data          | Very long data entry |
| Second row    | **Cell**      | *Cell*               |
| Third row     | Cell that spans across two columns  ||
[Table caption, works as a reference][section-mmd-tables-table1] 

#### Structure [section-mmd-tables-structure]

If you are familiar with HTML tables, you'll instantly recognize the structure of the table syntax. All tables must begin with one or more **rows** of **headers**, and each **row** may have one or more **columns**.

These are the most important rules you'll be dealing with:

* There must be at least one `|` per line;
* After the header rows, there must be a line containing only `|`, `-`, `:`, `.`, or spaces;
* Cell content must be on one line only;
* Columns are separated by `|`.

#### Alignment [section-mmd-tables-alignment]

To align the data cells on the table, you need to introduce a special row right after the headers, that will determine how the following rows -- the data rows -- will be aligned.

    | Header One | Header Two | Header Three | Header Four |
    | ---------- | :--------- | :----------: | ----------: |
    | Default    | Left       | Center       | Right       |

| Header One | Header Two | Header Three | Header Four |
| ---------- | :--------- | :----------: | ----------: |
| Default    | Left       | Center       | Right       |

The placing of the colon (`:`) is optional and determines the alignment of columns in the data rows. This line is mandatory and must be placed between the headers and the data rows.

Also, the usage of the `|` at the beginning or end of the rows is optional -- as long as at least one `|` is present in each row.

#### Column spanning [section-mmd-tables-colspanning]

To make a cell span across multiple columns, instead of using a single pipe (`|`) character to delimit that cell, use the number of pipes corresponding to the columns you wish to span.

    | Column 1 | Column 2 | Column 3 | Column 4 |
    | -------- | :------: | -------- | -------- |
    | No span  | Span across three columns    |||

| Column 1 | Column 2 | Column 3 | Column 4 |
| -------- | :------: | -------- | -------- |
| No span  | Span across three columns    |||

> **NOTE**  
> This is only an introduction to WriteOn's tables. For the full reference, please refer to the "Tables" section on the [MultiMarkdown user guide][link-mmd_userguide].

---

[link-source]: guide.md "User guide MultiMarkdown source"

If you have any doubts don't hesitate to contact us via email at **team@writeon.io** or via Twitter at [@writeon][link-twitter_writeon] or [@beardandfedora][link-twitter_beardandfedora].

[link-twitter_writeon]: http://twitter.com/WriteOn "WriteOn on Twitter"
[link-twitter_beardandfedora]: http://twitter.com/BeardandFedora "Beard & Fedora on Twitter"

Enjoy,  
The WriteOn team.



> Written with [WriteOn](https://writeon.io/).
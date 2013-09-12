## meta-marked
#### The [marked](http://github.com/chjj/marked) markdown processor for Node.js with a simple metadata system added on.

Just a quick extension I needed for processing markdown in Node. Props to Christopher Jeffrey for his excellent markdown processor 'marked'.

The `meta-marked` function behaves exactly the same as [`marked`](http://github.com/chjj/marked#usage), except for the following:

- Instead of returning a parsed string, `meta-marked` returns an object with two properties: `meta`, which contains the metadata object, and `html`, which contains the parsed HTML.
- `metaMarked.noMeta` is a reference to the `marked` function, so it can be used to avoid parsing metadata.

The metadata system used here is based on [MultiMarkdown](http://github.com/fletcher/MultiMarkdown/wiki/MultiMarkdown-Syntax-Guide#metadata). It consists of key: value pairs at the top of the document, followed by a blank line. For example, running `metaMarked(...)` on this text:

```
Title:   My awesome markdown file
Author:  Me
Scripts: js/doStuff.js
         js/doMoreStuff.js

##Header
Regular text and stuff goes here.
```

will result in the following output:

```
{
	"meta": {
		"Title": "My awesome markdown file",
		"Author": "Me",
		"Scripts": [
			"js/doStuff.js",
			"js/doMoreStuff.js"
		]
	},
	"html": "<h2>Header</h2>\n<p>Regular text and stuff goes here.</p>\n"
}
```

Note that only string-\>string and non-nested string-\>array pairs are supported. Any whitespace before and after the colon and at the beginning or end of the line is ignored. If you need a colon in the key or value, escape it with a backslash.

---

Licensed under [the MIT License](http://opensource.org/licenses/MIT). © 2013 j201

var marked = require('marked');

function isMeta(str) {
	// Tests if a string is metadata
	var firstLine = str.split('\n')[0];
	return /^\s*[^:\s]+\s*:\s*[^\s]/.test(firstLine); // Look for key : value
}

var metaMarked = function(src, opt, callback) {
	if (Object.prototype.toString.call(src) !== '[object String]')
		throw new TypeError('meta-marked: First parameter must be a string.');

	var metadata = src.slice(0, src.search(/\r?\n\s*?\r?\n/)); // Paragraph at the top of the text
	var parsedMeta = {};

	if (isMeta(metadata)) {
		src = src.slice(metadata.length);
		var items = metadata.split('\n');
		var lastKey;
		items.forEach(function(item) {
			if (/^\s/.test(item)) { // If starts with whitespace, treat as a list item
				if (parsedMeta[lastKey] !== undefined) {
					if (Array.isArray(parsedMeta[lastKey]))
						parsedMeta[lastKey].push(item.trim());
					else
						parsedMeta[lastKey] = [parsedMeta[lastKey], item.trim()];
				}
			} else {
				var colonLoc = item.search(/:/); // Split only on first colon
				if (colonLoc) {
					var key = item.slice(0, colonLoc).trim();
					var value = item.slice(colonLoc + 1).trim();
					parsedMeta[key] = value;
					lastKey = key;
				}
			}
		});
	}

	return {
		meta : parsedMeta,
		html : marked(src, opt, callback)
	};
};

metaMarked.__proto__ = marked; // Yeah, it's non-standard, but it's better than copying everything over

metaMarked.noMeta = marked;

module.exports = metaMarked;

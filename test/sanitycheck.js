// Just stupid little tests to make sure I haven't broken anything
// I plan to replace this with something fancy like mocha soon

var metaMarked = require('../lib/meta-marked');

var testStrings = ['---\nfoo: bar\n...\ncontent\n...\nmore content', '---\nfoo: bar\n---\ncontent\n---\nmore content'];

testStrings.forEach(function(str) {
	console.log(metaMarked(str));
});

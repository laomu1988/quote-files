var fs = require('fs');
var path = require('path');


var quoteRule = {
    'html': [
        {name: 'href', reg: /\W(href|src)\s*=\s*[\"\'](.*?)[\"\']/g, index: 2} // href,src
    ],
    'js': [
        {name: 'require', reg: /\Wrequire\s*\(['"]\s*([\w\.\/]*?)['"]/g, index: 1, autoExt: true} // require
    ],
    'css': [
        {
            name: 'img', reg: /\Wurl\s*\(['"]?\s*([\w\.\/]*?)['"\)]/g, index: 1
        }, {
            name: 'import', reg: /@import\s+['"]?\s*([\w\.\/]*?)['"\n;]/g, index: 1, autoExt: true
        }]
};

module.exports = function (config) {
    if (typeof config === 'string') {
        config = {file: config}
    }
    if (typeof config !== 'object') {
        return false;
    }
    try {
        if (!fs.existsSync(config.file)) {
            console.log(config.file + ' Do NOT exist!   ');
            return false;
        }
        var ext = path.extname(config.file);
        switch (ext) {
            case '.htm':
            case '.html':
            case '.js':
            case '.jsx':
            case '.vue':
            case '.tag':
            case '.txt':
            case '.json':
            case '.css':
            case '.less':
            case '.sass':
            case '.scss':
                var list = [];
                var content = fs.readFileSync(config.file, 'utf8');
                for (var attr in quoteRule) {
                    for (var i in quoteRule[attr]) {
                        var rule = quoteRule[attr][i];
                        content.replace(rule.reg, function () {
                            var file = arguments[rule.index];
                            if (file) {
                                // console.log(file);
                                list.push(file);
                            }
                        });
                    }
                }
                return list;
            default:
                console.log(config.file + ' Can not be anlysis!');
                return false;
        }
    } catch (e) {
        console.log('quote-files err:', e);
        return false;
    }
};
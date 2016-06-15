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


function getAttr(filepath, refFile) {
    refFile = (refFile + '').trim();
    var absolutePath = refFile, isLocal = true, isExist;
    if (refFile.indexOf('http:') == 0 || refFile.indexOf('https:') == 0 || refFile.indexOf('//') == 0) {
        isLocal = false;
    } else {
        absolutePath = path.resolve(filepath, refFile);
        isExist = fs.existsSync(absolutePath);
    }
    return {path: refFile, absolute: absolutePath, isLocal: isLocal, isExist: isExist};
}


module.exports = function (filepath) {
    if (!filepath) {
        throw new Error('filepath must has values');
        return;
    }
    filepath = filepath + '';
    try {
        if (!fs.existsSync(filepath)) {
            console.log(filepath + ' Do NOT exist!   ');
            return false;
        }
        var ext = path.extname(filepath);
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
                var content = fs.readFileSync(filepath, 'utf8');
                for (var attr in quoteRule) {
                    for (var i in quoteRule[attr]) {
                        var rule = quoteRule[attr][i];
                        content.replace(rule.reg, function () {
                            var file = arguments[rule.index];
                            if (file) {
                                // console.log(file);
                                list.push(getAttr(filepath, file));
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
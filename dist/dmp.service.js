import * as diff_match_patch from 'google-diff-match-patch/diff_match_patch_uncompressed';
var DiffMatchPachService = (function () {
    function DiffMatchPachService() {
    }
    DiffMatchPachService.prototype.diffClass = function (op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'ins';
            case diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                return 'match';
        }
    };
    DiffMatchPachService.prototype.diffSymbol = function (op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return '+';
            case diff_match_patch.DIFF_DELETE:
                return '-';
            default:
                return ' ';
        }
    };
    DiffMatchPachService.prototype.diffTag = function (op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'ins';
            case diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                return 'span';
        }
    };
    DiffMatchPachService.prototype.diffAttrName = function (op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'insert';
            case diff_match_patch.DIFF_DELETE:
                return 'delete';
            default:
                return 'equal';
        }
    };
    DiffMatchPachService.prototype.isEmptyObject = function (o) {
        return Object.getOwnPropertyNames(o).length === 0;
    };
    DiffMatchPachService.prototype.isDefined = function (o) {
        return o != undefined;
    };
    DiffMatchPachService.prototype.getTagAttrs = function (options, op, attrs) {
        var attributes = attrs || {};
        var tagOptions = {};
        var attribute;
        var tagOption;
        var retVal = [];
        if (options != undefined && options.attrs != undefined) {
            tagOptions = Object.assign(options.attrs[this.diffAttrName(op)] || {});
        }
        if (this.isEmptyObject(tagOptions) && this.isEmptyObject(attributes)) {
            return '';
        }
        for (attribute in attributes) {
            if (this.isDefined(tagOptions[attribute])) {
                tagOptions[attribute] = attributes[attribute] + ' ' + tagOptions[attribute];
            }
            else {
                tagOptions[attribute] = attributes[attribute];
            }
        }
        for (tagOption in tagOptions) {
            retVal.push(tagOption + '="' + tagOptions[tagOption] + '"');
        }
        return ' ' + retVal.join(' ');
    };
    DiffMatchPachService.prototype.getHtmlPrefix = function (op, display, options) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '<div class="' + this.diffClass(op) + '"><span' + this.getTagAttrs(options, op, { class: 'noselect' }) + '>' + this.diffSymbol(op) + '</span>';
            default:
                return '<' + this.diffTag(op) + this.getTagAttrs(options, op) + '>';
        }
    };
    DiffMatchPachService.prototype.getHtmlSuffix = function (op, display) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '</div>';
            default:
                return '</' + this.diffTag(op) + '>';
        }
    };
    DiffMatchPachService.prototype.createHtmlLines = function (text, op, options) {
        var lines = text.split('\n');
        var y;
        for (y = 0; y < lines.length; y++) {
            if (lines[y].length === 0) {
                continue;
            }
            lines[y] = this.getHtmlPrefix(op, DiffMatchPachService.displayType.LINEDIFF, options) + lines[y] + this.getHtmlSuffix(op, DiffMatchPachService.displayType.LINEDIFF);
        }
        return lines.join('');
    };
    DiffMatchPachService.prototype.createHtmlFromDiffs = function (diffs, display, options) {
        var patternAmp = /&/g;
        var patternLt = /</g;
        var patternGt = />/g;
        var x;
        var html = [];
        var y;
        var data;
        var op;
        var text;
        var diffData = diffs;
        for (x = 0; x < diffData.length; x++) {
            data = diffData[x][1];
            diffData[x][1] = data.replace(patternAmp, '&amp;')
                .replace(patternLt, '&lt;')
                .replace(patternGt, '&gt;');
        }
        for (y = 0; y < diffData.length; y++) {
            op = diffData[y][0];
            text = diffData[y][1];
            if (display === DiffMatchPachService.displayType.LINEDIFF) {
                html[y] = this.createHtmlLines(text, op, options);
            }
            else {
                html[y] = this.getHtmlPrefix(op, display, options) + text + this.getHtmlSuffix(op, display);
            }
        }
        return html.join('');
    };
    DiffMatchPachService.prototype.isString = function (myVar) {
        return (typeof myVar === 'string' || myVar instanceof String);
    };
    DiffMatchPachService.prototype.assertArgumentsIsStrings = function (left, right) {
        return this.isString(left) && this.isString(right);
    };
    DiffMatchPachService.prototype.createDiffHtml = function (left, right, options) {
        var dmp;
        var diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new diff_match_patch.diff_match_patch();
            diffs = dmp.diff_main(left, right);
            return this.createHtmlFromDiffs(diffs, DiffMatchPachService.displayType.INSDEL, options);
        }
        return '';
    };
    DiffMatchPachService.prototype.createLineDiffHtml = function (left, right, options) {
        var dmp;
        var chars;
        var diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new diff_match_patch.diff_match_patch();
            chars = dmp.diff_linesToChars_(left, right);
            diffs = dmp.diff_main(chars.chars1, chars.chars2, false);
            dmp.diff_charsToLines_(diffs, chars.lineArray);
            return this.createHtmlFromDiffs(diffs, DiffMatchPachService.displayType.LINEDIFF, options);
        }
        return '';
    };
    DiffMatchPachService.displayType = {
        INSDEL: 0,
        LINEDIFF: 1
    };
    return DiffMatchPachService;
}());
export { DiffMatchPachService };
//# sourceMappingURL=dmp.service.js.map
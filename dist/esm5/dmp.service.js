/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DiffMatchPachService = /** @class */ (function () {
    function DiffMatchPachService() {
    }
    /**
     * @param {?} op
     * @return {?}
     */
    DiffMatchPachService.prototype.diffClass = /**
     * @param {?} op
     * @return {?}
     */
    function (op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'ins';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                // case DIFF_EQUAL:
                return 'match';
        }
    };
    /**
     * @param {?} op
     * @return {?}
     */
    DiffMatchPachService.prototype.diffSymbol = /**
     * @param {?} op
     * @return {?}
     */
    function (op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return '+';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return '-';
            default:
                // case DIFF_EQUAL:
                return ' ';
        }
    };
    /**
     * @param {?} op
     * @return {?}
     */
    DiffMatchPachService.prototype.diffTag = /**
     * @param {?} op
     * @return {?}
     */
    function (op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'ins';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                // case DIFF_EQUAL:
                return 'span';
        }
    };
    /**
     * @param {?} op
     * @return {?}
     */
    DiffMatchPachService.prototype.diffAttrName = /**
     * @param {?} op
     * @return {?}
     */
    function (op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'insert';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'delete';
            default:
                // case DIFF_EQUAL:
                return 'equal';
        }
    };
    /**
     * @param {?} o
     * @return {?}
     */
    DiffMatchPachService.prototype.isEmptyObject = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return Object.getOwnPropertyNames(o).length === 0;
    };
    /**
     * @param {?} o
     * @return {?}
     */
    DiffMatchPachService.prototype.isDefined = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return o != undefined;
    };
    /**
     * @param {?} options
     * @param {?} op
     * @param {?=} attrs
     * @return {?}
     */
    DiffMatchPachService.prototype.getTagAttrs = /**
     * @param {?} options
     * @param {?} op
     * @param {?=} attrs
     * @return {?}
     */
    function (options, op, attrs) {
        var /** @type {?} */ attributes = attrs || {};
        var /** @type {?} */ tagOptions = {};
        var /** @type {?} */ attribute;
        var /** @type {?} */ tagOption;
        var /** @type {?} */ retVal = [];
        if (options != undefined && options.attrs != undefined) {
            tagOptions = Object.assign(options.attrs[this.diffAttrName(op)] || {});
        }
        if (this.isEmptyObject(tagOptions) && this.isEmptyObject(attributes)) {
            return '';
        }
        for (attribute in attributes) {
            if (this.isDefined(tagOptions[attribute])) {
                // The attribute defined in attributes should be first
                tagOptions[attribute] = attributes[attribute] + ' ' + tagOptions[attribute];
            }
            else {
                tagOptions[attribute] = attributes[attribute];
            }
        }
        /* eslint guard-for-in: "off" */
        for (tagOption in tagOptions) {
            retVal.push(tagOption + '="' + tagOptions[tagOption] + '"');
        }
        return ' ' + retVal.join(' ');
    };
    /**
     * @param {?} op
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    DiffMatchPachService.prototype.getHtmlPrefix = /**
     * @param {?} op
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    function (op, display, options) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '<div class="' + this.diffClass(op) + '"><span' + this.getTagAttrs(options, op, { class: 'noselect' }) + '>' + this.diffSymbol(op) + '</span>';
            default:
                // case displayType.INSDEL:
                return '<' + this.diffTag(op) + this.getTagAttrs(options, op) + '>';
        }
    };
    /**
     * @param {?} op
     * @param {?} display
     * @return {?}
     */
    DiffMatchPachService.prototype.getHtmlSuffix = /**
     * @param {?} op
     * @param {?} display
     * @return {?}
     */
    function (op, display) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '</div>';
            default:
                // case displayType.INSDEL:
                return '</' + this.diffTag(op) + '>';
        }
    };
    /**
     * @param {?} text
     * @param {?} op
     * @param {?} options
     * @return {?}
     */
    DiffMatchPachService.prototype.createHtmlLines = /**
     * @param {?} text
     * @param {?} op
     * @param {?} options
     * @return {?}
     */
    function (text, op, options) {
        var /** @type {?} */ lines = text.split('\n');
        var /** @type {?} */ y;
        for (y = 0; y < lines.length; y++) {
            if (lines[y].length === 0) {
                continue;
            }
            lines[y] = this.getHtmlPrefix(op, DiffMatchPachService.displayType.LINEDIFF, options) + lines[y] + this.getHtmlSuffix(op, DiffMatchPachService.displayType.LINEDIFF);
        }
        return lines.join('');
    };
    /**
     * @param {?} diffs
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    DiffMatchPachService.prototype.createHtmlFromDiffs = /**
     * @param {?} diffs
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    function (diffs, display, options) {
        var /** @type {?} */ patternAmp = /&/g;
        var /** @type {?} */ patternLt = /</g;
        var /** @type {?} */ patternGt = />/g;
        var /** @type {?} */ x;
        var /** @type {?} */ html = [];
        var /** @type {?} */ y;
        var /** @type {?} */ data;
        var /** @type {?} */ op;
        var /** @type {?} */ text;
        var /** @type {?} */ diffData = diffs;
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
    /**
     * @param {?} myVar
     * @return {?}
     */
    DiffMatchPachService.prototype.isString = /**
     * @param {?} myVar
     * @return {?}
     */
    function (myVar) {
        return (typeof myVar === 'string' || myVar instanceof String);
    };
    /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    DiffMatchPachService.prototype.assertArgumentsIsStrings = /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    function (left, right) {
        return this.isString(left) && this.isString(right);
    };
    /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    DiffMatchPachService.prototype.createDiffHtml = /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    function (left, right, options) {
        var /** @type {?} */ dmp;
        var /** @type {?} */ diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new (/** @type {?} */ (window)).diff_match_patch.diff_match_patch();
            diffs = dmp.diff_main(left, right);
            return this.createHtmlFromDiffs(diffs, DiffMatchPachService.displayType.INSDEL, options);
        }
        return '';
    };
    /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    DiffMatchPachService.prototype.createLineDiffHtml = /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    function (left, right, options) {
        var /** @type {?} */ dmp;
        var /** @type {?} */ chars;
        var /** @type {?} */ diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new (/** @type {?} */ (window)).diff_match_patch.diff_match_patch();
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
function DiffMatchPachService_tsickle_Closure_declarations() {
    /** @type {?} */
    DiffMatchPachService.displayType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG1wLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoLyIsInNvdXJjZXMiOlsiZG1wLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFNWSx3Q0FBUzs7OztjQUFDLEVBQUU7UUFDaEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNULEtBQUssbUJBQU0sTUFBTSxFQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixLQUFLLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakI7O2dCQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDdEI7Ozs7OztJQUdHLHlDQUFVOzs7O2NBQUMsRUFBRTtRQUNqQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1QsS0FBSyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2YsS0FBSyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2Y7O2dCQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDbEI7Ozs7OztJQUdHLHNDQUFPOzs7O2NBQUMsRUFBRTtRQUNkLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVCxLQUFLLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsS0FBSyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCOztnQkFDSSxNQUFNLENB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cml2YXRlIHN0YXRpYyBkaXNwbGF5VHlwZTphbnkgPSB7XG4gICAgICAgIElOU0RFTDogMCxcbiAgICAgICAgTElORURJRkY6IDFcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkaWZmQ2xhc3Mob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnMnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWwnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbWF0Y2gnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmU3ltYm9sKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnKyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJy0nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZUYWcob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnMnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWwnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3Bhbic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZBdHRyTmFtZShvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2luc2VydCc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbGV0ZSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcXVhbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRW1wdHlPYmplY3Qobykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEZWZpbmVkKG8pIHtcbiAgICAgICAgcmV0dXJuIG8gIT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGFnQXR0cnMob3B0aW9ucywgb3AsIGF0dHJzPykge1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGF0dHJzIHx8IHt9O1xuICAgICAgICB2YXIgdGFnT3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgYXR0cmlidXRlO1xuICAgICAgICB2YXIgdGFnT3B0aW9uO1xuICAgICAgICB2YXIgcmV0VmFsID0gW107XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgIT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuYXR0cnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YWdPcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLmF0dHJzW3RoaXMuZGlmZkF0dHJOYW1lKG9wKV0gfHwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eU9iamVjdCh0YWdPcHRpb25zKSAmJiB0aGlzLmlzRW1wdHlPYmplY3QoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGVmaW5lZCh0YWdPcHRpb25zW2F0dHJpYnV0ZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGF0dHJpYnV0ZSBkZWZpbmVkIGluIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGZpcnN0XG4gICAgICAgICAgICAgICAgdGFnT3B0aW9uc1thdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdICsgJyAnICsgdGFnT3B0aW9uc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBcIm9mZlwiICovXG4gICAgICAgIGZvciAodGFnT3B0aW9uIGluIHRhZ09wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldFZhbC5wdXNoKHRhZ09wdGlvbiArICc9XCInICsgdGFnT3B0aW9uc1t0YWdPcHRpb25dICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcgJyArIHJldFZhbC5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSB7XG4gICAgICAgIHN3aXRjaCAoZGlzcGxheSkge1xuICAgICAgICAgICAgY2FzZSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgdGhpcy5kaWZmQ2xhc3Mob3ApICsgJ1wiPjxzcGFuJyArIHRoaXMuZ2V0VGFnQXR0cnMob3B0aW9ucywgb3AsIHtjbGFzczogJ25vc2VsZWN0J30pICsgJz4nICsgdGhpcy5kaWZmU3ltYm9sKG9wKSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgZGlzcGxheVR5cGUuSU5TREVMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPCcgKyB0aGlzLmRpZmZUYWcob3ApICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCkgKyAnPic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPC9kaXY+JztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgZGlzcGxheVR5cGUuSU5TREVMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPC8nICsgdGhpcy5kaWZmVGFnKG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSHRtbExpbmVzKHRleHQsIG9wLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IGxpbmVzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBpZiAobGluZXNbeV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lc1t5XSA9IHRoaXMuZ2V0SHRtbFByZWZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpICsgbGluZXNbeV0gKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZXMuam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuQW1wID0gLyYvZztcbiAgICAgICAgdmFyIHBhdHRlcm5MdCA9IC88L2c7XG4gICAgICAgIHZhciBwYXR0ZXJuR3QgPSAvPi9nO1xuICAgICAgICB2YXIgeDtcbiAgICAgICAgdmFyIGh0bWwgPSBbXTtcbiAgICAgICAgdmFyIHk7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICB2YXIgb3A7XG4gICAgICAgIHZhciB0ZXh0O1xuICAgICAgICB2YXIgZGlmZkRhdGEgPSBkaWZmcztcblxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgZGlmZkRhdGEubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIGRhdGEgPSBkaWZmRGF0YVt4XVsxXTtcbiAgICAgICAgICAgIGRpZmZEYXRhW3hdWzFdID0gZGF0YS5yZXBsYWNlKHBhdHRlcm5BbXAsICcmYW1wOycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UocGF0dGVybkx0LCAnJmx0OycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UocGF0dGVybkd0LCAnJmd0OycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IGRpZmZEYXRhLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBvcCA9IGRpZmZEYXRhW3ldWzBdO1xuICAgICAgICAgICAgdGV4dCA9IGRpZmZEYXRhW3ldWzFdO1xuICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGKSB7XG4gICAgICAgICAgICAgICAgaHRtbFt5XSA9IHRoaXMuY3JlYXRlSHRtbExpbmVzKHRleHQsIG9wLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbFt5XSA9IHRoaXMuZ2V0SHRtbFByZWZpeChvcCwgZGlzcGxheSwgb3B0aW9ucykgKyB0ZXh0ICsgdGhpcy5nZXRIdG1sU3VmZml4KG9wLCBkaXNwbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU3RyaW5nKG15VmFyKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIG15VmFyID09PSAnc3RyaW5nJyB8fCBteVZhciBpbnN0YW5jZW9mIFN0cmluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpbmcobGVmdCkgJiYgdGhpcy5pc1N0cmluZyhyaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZURpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkbXA7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4vLyAgICBjcmVhdGVQcm9jZXNzaW5nRGlmZkh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuLy8gICAgdmFyIGRtcDtcbi8vICAgIHZhciBkaWZmcztcbi8vICAgIGlmIChhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4vLyAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaCgpO1xuLy8gICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4vL1xuLy8gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLmVkaXRDb3N0KSAmJiBpc0Zpbml0ZShvcHRpb25zLmVkaXRDb3N0KSkge1xuLy8gICAgICAgICAgICBkbXAuRGlmZl9FZGl0Q29zdCA9IG9wdGlvbnMuZWRpdENvc3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4vLyAgICAgICAgfVxuLy9cbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwRWZmaWNpZW5jeShkaWZmcyk7XG4vLyAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gJyc7XG4vL30sXG4vL1xuLy8gICAgY3JlYXRlU2VtYW50aWNEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlU2VtYW50aWNEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuLy8gICAgdmFyIGRtcDtcbi8vICAgIHZhciBkaWZmcztcbi8vICAgIGlmIChhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4vLyAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaCgpO1xuLy8gICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4vLyAgICAgICAgZG1wLmRpZmZfY2xlYW51cFNlbWFudGljKGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcblxuICAgIHB1YmxpYyBjcmVhdGVMaW5lRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGNoYXJzO1xuICAgICAgICB2YXIgZGlmZnM7XG4gICAgICAgIGlmICh0aGlzLmFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbiAgICAgICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgICAgICAgY2hhcnMgPSBkbXAuZGlmZl9saW5lc1RvQ2hhcnNfKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihjaGFycy5jaGFyczEsIGNoYXJzLmNoYXJzMiwgZmFsc2UpO1xuICAgICAgICAgICAgZG1wLmRpZmZfY2hhcnNUb0xpbmVzXyhkaWZmcywgY2hhcnMubGluZUFycmF5KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIl19
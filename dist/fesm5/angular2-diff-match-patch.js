import { Directive, Input, ElementRef, NgModule } from '@angular/core';

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LineDiffComponent = /** @class */ (function () {
    function LineDiffComponent(el, dmp) {
        this.el = el;
        this.dmp = dmp;
        this.options = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LineDiffComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    };
    /**
     * @return {?}
     */
    LineDiffComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    };
    LineDiffComponent.decorators = [
        { type: Directive, args: [{
                    selector: '[line-diff]',
                    providers: [
                        DiffMatchPachService
                    ]
                },] },
    ];
    /** @nocollapse */
    LineDiffComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DiffMatchPachService }
    ]; };
    LineDiffComponent.propDecorators = {
        left: [{ type: Input }],
        right: [{ type: Input }],
        options: [{ type: Input }]
    };
    return LineDiffComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Ng2DiffModule = /** @class */ (function () {
    function Ng2DiffModule() {
    }
    Ng2DiffModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        LineDiffComponent
                    ],
                    declarations: [
                        LineDiffComponent
                    ],
                    imports: []
                },] },
    ];
    return Ng2DiffModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Ng2DiffModule, LineDiffComponent, DiffMatchPachService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9kbXAuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9saW5lLWRpZmYuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoL25nMi1kaWZmLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGlmZk1hdGNoUGFjaFNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGRpc3BsYXlUeXBlOmFueSA9IHtcbiAgICAgICAgSU5TREVMOiAwLFxuICAgICAgICBMSU5FRElGRjogMVxuICAgIH07XG5cbiAgICBwcml2YXRlIGRpZmZDbGFzcyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtYXRjaCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZTeW1ib2wob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcrJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnLSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlRhZyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzcGFuJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZkF0dHJOYW1lKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zZXJ0JztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsZXRlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VxdWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbXB0eU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0RlZmluZWQobykge1xuICAgICAgICByZXR1cm4gbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUYWdBdHRycyhvcHRpb25zLCBvcCwgYXR0cnM/KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciB0YWdPcHRpb25zID0ge307XG4gICAgICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgICAgIHZhciB0YWdPcHRpb247XG4gICAgICAgIHZhciByZXRWYWwgPSBbXTtcblxuICAgICAgICBpZiAob3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdHRycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhZ09wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMuYXR0cnNbdGhpcy5kaWZmQXR0ck5hbWUob3ApXSB8fCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5T2JqZWN0KHRhZ09wdGlvbnMpICYmIHRoaXMuaXNFbXB0eU9iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKHRhZ09wdGlvbnNbYXR0cmlidXRlXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYXR0cmlidXRlIGRlZmluZWQgaW4gYXR0cmlidXRlcyBzaG91bGQgYmUgZmlyc3RcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gKyAnICcgKyB0YWdPcHRpb25zW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGVzbGludCBndWFyZC1mb3ItaW46IFwib2ZmXCIgKi9cbiAgICAgICAgZm9yICh0YWdPcHRpb24gaW4gdGFnT3B0aW9ucykge1xuICAgICAgICAgICAgcmV0VmFsLnB1c2godGFnT3B0aW9uICsgJz1cIicgKyB0YWdPcHRpb25zW3RhZ09wdGlvbl0gKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyAnICsgcmV0VmFsLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyB0aGlzLmRpZmZDbGFzcyhvcCkgKyAnXCI+PHNwYW4nICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCwge2NsYXNzOiAnbm9zZWxlY3QnfSkgKyAnPicgKyB0aGlzLmRpZmZTeW1ib2wob3ApICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuZGlmZlRhZyhvcCkgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSkge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8LycgKyB0aGlzLmRpZmZUYWcob3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciB5O1xuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgbGluZXMubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1t5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVzW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucykgKyBsaW5lc1t5XSArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW5lcy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5BbXAgPSAvJi9nO1xuICAgICAgICB2YXIgcGF0dGVybkx0ID0gLzwvZztcbiAgICAgICAgdmFyIHBhdHRlcm5HdCA9IC8+L2c7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgaHRtbCA9IFtdO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBvcDtcbiAgICAgICAgdmFyIHRleHQ7XG4gICAgICAgIHZhciBkaWZmRGF0YSA9IGRpZmZzO1xuXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCBkaWZmRGF0YS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgZGF0YSA9IGRpZmZEYXRhW3hdWzFdO1xuICAgICAgICAgICAgZGlmZkRhdGFbeF1bMV0gPSBkYXRhLnJlcGxhY2UocGF0dGVybkFtcCwgJyZhbXA7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuTHQsICcmbHQ7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuR3QsICcmZ3Q7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgZGlmZkRhdGEubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIG9wID0gZGlmZkRhdGFbeV1bMF07XG4gICAgICAgICAgICB0ZXh0ID0gZGlmZkRhdGFbeV1bMV07XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5jcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSArIHRleHQgKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpbmcobXlWYXIpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgbXlWYXIgPT09ICdzdHJpbmcnIHx8IG15VmFyIGluc3RhbmNlb2YgU3RyaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmluZyhsZWZ0KSAmJiB0aGlzLmlzU3RyaW5nKHJpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbi8vICAgIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vXG4vLyAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMuZWRpdENvc3QpICYmIGlzRmluaXRlKG9wdGlvbnMuZWRpdENvc3QpKSB7XG4vLyAgICAgICAgICAgIGRtcC5EaWZmX0VkaXRDb3N0ID0gb3B0aW9ucy5lZGl0Q29zdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2Vcbi8vICAgICAgICB9XG4vL1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBFZmZpY2llbmN5KGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcbi8vXG4vLyAgICBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuXG4gICAgcHVibGljIGNyZWF0ZUxpbmVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgY2hhcnM7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBjaGFycyA9IGRtcC5kaWZmX2xpbmVzVG9DaGFyc18obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGNoYXJzLmNoYXJzMSwgY2hhcnMuY2hhcnMyLCBmYWxzZSk7XG4gICAgICAgICAgICBkbXAuZGlmZl9jaGFyc1RvTGluZXNfKGRpZmZzLCBjaGFycy5saW5lQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RpZmZNYXRjaFBhY2hTZXJ2aWNlfSBmcm9tICcuL2RtcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbGluZS1kaWZmXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpZmZNYXRjaFBhY2hTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRGlmZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBsZWZ0OnN0cmluZztcbiAgICBASW5wdXQoKSByaWdodDpzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczp7fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmLCBwcml2YXRlIGRtcDpEaWZmTWF0Y2hQYWNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtMaW5lRGlmZkNvbXBvbmVudH0gZnJvbSAnLi9saW5lLWRpZmYuY29tcG9uZW50JztcblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpbmVEaWZmQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEaWZmTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBTVksd0NBQVM7Ozs7Y0FBQyxFQUFFO1FBQ2hCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCOztnQkFDSSxPQUFPLE9BQU8sQ0FBQztTQUN0Qjs7Ozs7O0lBR0cseUNBQVU7Ozs7Y0FBQyxFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxtQkFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0MsT0FBTyxH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
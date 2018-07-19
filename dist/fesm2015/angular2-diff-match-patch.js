import { Directive, Input, ElementRef, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DiffMatchPachService {
    /**
     * @param {?} op
     * @return {?}
     */
    diffClass(op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'ins';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                // case DIFF_EQUAL:
                return 'match';
        }
    }
    /**
     * @param {?} op
     * @return {?}
     */
    diffSymbol(op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return '+';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return '-';
            default:
                // case DIFF_EQUAL:
                return ' ';
        }
    }
    /**
     * @param {?} op
     * @return {?}
     */
    diffTag(op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'ins';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'del';
            default:
                // case DIFF_EQUAL:
                return 'span';
        }
    }
    /**
     * @param {?} op
     * @return {?}
     */
    diffAttrName(op) {
        switch (op) {
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_INSERT:
                return 'insert';
            case (/** @type {?} */ (window)).diff_match_patch.DIFF_DELETE:
                return 'delete';
            default:
                // case DIFF_EQUAL:
                return 'equal';
        }
    }
    /**
     * @param {?} o
     * @return {?}
     */
    isEmptyObject(o) {
        return Object.getOwnPropertyNames(o).length === 0;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    isDefined(o) {
        return o != undefined;
    }
    /**
     * @param {?} options
     * @param {?} op
     * @param {?=} attrs
     * @return {?}
     */
    getTagAttrs(options, op, attrs) {
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
    }
    /**
     * @param {?} op
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    getHtmlPrefix(op, display, options) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '<div class="' + this.diffClass(op) + '"><span' + this.getTagAttrs(options, op, { class: 'noselect' }) + '>' + this.diffSymbol(op) + '</span>';
            default:
                // case displayType.INSDEL:
                return '<' + this.diffTag(op) + this.getTagAttrs(options, op) + '>';
        }
    }
    /**
     * @param {?} op
     * @param {?} display
     * @return {?}
     */
    getHtmlSuffix(op, display) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '</div>';
            default:
                // case displayType.INSDEL:
                return '</' + this.diffTag(op) + '>';
        }
    }
    /**
     * @param {?} text
     * @param {?} op
     * @param {?} options
     * @return {?}
     */
    createHtmlLines(text, op, options) {
        var /** @type {?} */ lines = text.split('\n');
        var /** @type {?} */ y;
        for (y = 0; y < lines.length; y++) {
            if (lines[y].length === 0) {
                continue;
            }
            lines[y] = this.getHtmlPrefix(op, DiffMatchPachService.displayType.LINEDIFF, options) + lines[y] + this.getHtmlSuffix(op, DiffMatchPachService.displayType.LINEDIFF);
        }
        return lines.join('');
    }
    /**
     * @param {?} diffs
     * @param {?} display
     * @param {?} options
     * @return {?}
     */
    createHtmlFromDiffs(diffs, display, options) {
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
    }
    /**
     * @param {?} myVar
     * @return {?}
     */
    isString(myVar) {
        return (typeof myVar === 'string' || myVar instanceof String);
    }
    /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    assertArgumentsIsStrings(left, right) {
        return this.isString(left) && this.isString(right);
    }
    /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    createDiffHtml(left, right, options) {
        var /** @type {?} */ dmp;
        var /** @type {?} */ diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new (/** @type {?} */ (window)).diff_match_patch.diff_match_patch();
            diffs = dmp.diff_main(left, right);
            return this.createHtmlFromDiffs(diffs, DiffMatchPachService.displayType.INSDEL, options);
        }
        return '';
    }
    /**
     * @param {?} left
     * @param {?} right
     * @param {?} options
     * @return {?}
     */
    createLineDiffHtml(left, right, options) {
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
    }
}
DiffMatchPachService.displayType = {
    INSDEL: 0,
    LINEDIFF: 1
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LineDiffComponent {
    /**
     * @param {?} el
     * @param {?} dmp
     */
    constructor(el, dmp) {
        this.el = el;
        this.dmp = dmp;
        this.options = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }
}
LineDiffComponent.decorators = [
    { type: Directive, args: [{
                selector: '[line-diff]',
                providers: [
                    DiffMatchPachService
                ]
            },] },
];
/** @nocollapse */
LineDiffComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DiffMatchPachService }
];
LineDiffComponent.propDecorators = {
    left: [{ type: Input }],
    right: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2DiffModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Ng2DiffModule, LineDiffComponent, DiffMatchPachService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9kbXAuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9saW5lLWRpZmYuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoL25nMi1kaWZmLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGlmZk1hdGNoUGFjaFNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGRpc3BsYXlUeXBlOmFueSA9IHtcbiAgICAgICAgSU5TREVMOiAwLFxuICAgICAgICBMSU5FRElGRjogMVxuICAgIH07XG5cbiAgICBwcml2YXRlIGRpZmZDbGFzcyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtYXRjaCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZTeW1ib2wob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcrJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnLSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlRhZyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzcGFuJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZkF0dHJOYW1lKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zZXJ0JztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsZXRlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VxdWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbXB0eU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0RlZmluZWQobykge1xuICAgICAgICByZXR1cm4gbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUYWdBdHRycyhvcHRpb25zLCBvcCwgYXR0cnM/KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciB0YWdPcHRpb25zID0ge307XG4gICAgICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgICAgIHZhciB0YWdPcHRpb247XG4gICAgICAgIHZhciByZXRWYWwgPSBbXTtcblxuICAgICAgICBpZiAob3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdHRycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhZ09wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMuYXR0cnNbdGhpcy5kaWZmQXR0ck5hbWUob3ApXSB8fCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5T2JqZWN0KHRhZ09wdGlvbnMpICYmIHRoaXMuaXNFbXB0eU9iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKHRhZ09wdGlvbnNbYXR0cmlidXRlXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYXR0cmlidXRlIGRlZmluZWQgaW4gYXR0cmlidXRlcyBzaG91bGQgYmUgZmlyc3RcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gKyAnICcgKyB0YWdPcHRpb25zW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGVzbGludCBndWFyZC1mb3ItaW46IFwib2ZmXCIgKi9cbiAgICAgICAgZm9yICh0YWdPcHRpb24gaW4gdGFnT3B0aW9ucykge1xuICAgICAgICAgICAgcmV0VmFsLnB1c2godGFnT3B0aW9uICsgJz1cIicgKyB0YWdPcHRpb25zW3RhZ09wdGlvbl0gKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyAnICsgcmV0VmFsLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyB0aGlzLmRpZmZDbGFzcyhvcCkgKyAnXCI+PHNwYW4nICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCwge2NsYXNzOiAnbm9zZWxlY3QnfSkgKyAnPicgKyB0aGlzLmRpZmZTeW1ib2wob3ApICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuZGlmZlRhZyhvcCkgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSkge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8LycgKyB0aGlzLmRpZmZUYWcob3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciB5O1xuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgbGluZXMubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1t5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVzW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucykgKyBsaW5lc1t5XSArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW5lcy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5BbXAgPSAvJi9nO1xuICAgICAgICB2YXIgcGF0dGVybkx0ID0gLzwvZztcbiAgICAgICAgdmFyIHBhdHRlcm5HdCA9IC8+L2c7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgaHRtbCA9IFtdO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBvcDtcbiAgICAgICAgdmFyIHRleHQ7XG4gICAgICAgIHZhciBkaWZmRGF0YSA9IGRpZmZzO1xuXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCBkaWZmRGF0YS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgZGF0YSA9IGRpZmZEYXRhW3hdWzFdO1xuICAgICAgICAgICAgZGlmZkRhdGFbeF1bMV0gPSBkYXRhLnJlcGxhY2UocGF0dGVybkFtcCwgJyZhbXA7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuTHQsICcmbHQ7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuR3QsICcmZ3Q7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgZGlmZkRhdGEubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIG9wID0gZGlmZkRhdGFbeV1bMF07XG4gICAgICAgICAgICB0ZXh0ID0gZGlmZkRhdGFbeV1bMV07XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5jcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSArIHRleHQgKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpbmcobXlWYXIpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgbXlWYXIgPT09ICdzdHJpbmcnIHx8IG15VmFyIGluc3RhbmNlb2YgU3RyaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmluZyhsZWZ0KSAmJiB0aGlzLmlzU3RyaW5nKHJpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbi8vICAgIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vXG4vLyAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMuZWRpdENvc3QpICYmIGlzRmluaXRlKG9wdGlvbnMuZWRpdENvc3QpKSB7XG4vLyAgICAgICAgICAgIGRtcC5EaWZmX0VkaXRDb3N0ID0gb3B0aW9ucy5lZGl0Q29zdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2Vcbi8vICAgICAgICB9XG4vL1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBFZmZpY2llbmN5KGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcbi8vXG4vLyAgICBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuXG4gICAgcHVibGljIGNyZWF0ZUxpbmVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgY2hhcnM7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBjaGFycyA9IGRtcC5kaWZmX2xpbmVzVG9DaGFyc18obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGNoYXJzLmNoYXJzMSwgY2hhcnMuY2hhcnMyLCBmYWxzZSk7XG4gICAgICAgICAgICBkbXAuZGlmZl9jaGFyc1RvTGluZXNfKGRpZmZzLCBjaGFycy5saW5lQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RpZmZNYXRjaFBhY2hTZXJ2aWNlfSBmcm9tICcuL2RtcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbGluZS1kaWZmXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpZmZNYXRjaFBhY2hTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRGlmZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBsZWZ0OnN0cmluZztcbiAgICBASW5wdXQoKSByaWdodDpzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczp7fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmLCBwcml2YXRlIGRtcDpEaWZmTWF0Y2hQYWNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtMaW5lRGlmZkNvbXBvbmVudH0gZnJvbSAnLi9saW5lLWRpZmYuY29tcG9uZW50JztcblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpbmVEaWZmQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEaWZmTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7SUFNWSxTQUFTLENBQUMsRUFBRTtRQUNoQixRQUFRLEVBQUU7WUFDTixLQUFLLG1CQUFNLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxPQUFPLEtBQUssQ0FBQztZQUNqQixLQUFLLG1CQUFNLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxPQUFPLEtBQUssQ0FBQztZQUNqQjs7Z0JBQ0ksT0FBTyxPQUFPLENBQUM7U0FDdEI7Ozs7OztJQUdHLFVBQVUsQ0FBQyxFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxtQkFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0MsT0FBTyxHQUFHLENB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
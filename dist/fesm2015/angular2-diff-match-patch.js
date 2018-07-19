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

export { Ng2DiffModule, DiffMatchPachService as ɵb, LineDiffComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9zcmMvZG1wLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvc3JjL2xpbmUtZGlmZi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvbmcyLWRpZmYubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEaWZmTWF0Y2hQYWNoU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgZGlzcGxheVR5cGU6YW55ID0ge1xuICAgICAgICBJTlNERUw6IDAsXG4gICAgICAgIExJTkVESUZGOiAxXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGlmZkNsYXNzKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ21hdGNoJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlN5bWJvbChvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJysnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICctJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmVGFnKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NwYW4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmQXR0ck5hbWUob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnNlcnQnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWxldGUnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXF1YWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VtcHR5T2JqZWN0KG8pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRGVmaW5lZChvKSB7XG4gICAgICAgIHJldHVybiBvICE9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wLCBhdHRycz8pIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBhdHRycyB8fCB7fTtcbiAgICAgICAgdmFyIHRhZ09wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZTtcbiAgICAgICAgdmFyIHRhZ09wdGlvbjtcbiAgICAgICAgdmFyIHJldFZhbCA9IFtdO1xuXG4gICAgICAgIGlmIChvcHRpb25zICE9IHVuZGVmaW5lZCAmJiBvcHRpb25zLmF0dHJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFnT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5hdHRyc1t0aGlzLmRpZmZBdHRyTmFtZShvcCldIHx8IHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHlPYmplY3QodGFnT3B0aW9ucykgJiYgdGhpcy5pc0VtcHR5T2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RlZmluZWQodGFnT3B0aW9uc1thdHRyaWJ1dGVdKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBhdHRyaWJ1dGUgZGVmaW5lZCBpbiBhdHRyaWJ1dGVzIHNob3VsZCBiZSBmaXJzdFxuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSArICcgJyArIHRhZ09wdGlvbnNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFnT3B0aW9uc1thdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogZXNsaW50IGd1YXJkLWZvci1pbjogXCJvZmZcIiAqL1xuICAgICAgICBmb3IgKHRhZ09wdGlvbiBpbiB0YWdPcHRpb25zKSB7XG4gICAgICAgICAgICByZXRWYWwucHVzaCh0YWdPcHRpb24gKyAnPVwiJyArIHRhZ09wdGlvbnNbdGFnT3B0aW9uXSArICdcIicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnICcgKyByZXRWYWwuam9pbignICcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFByZWZpeChvcCwgZGlzcGxheSwgb3B0aW9ucykge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIHRoaXMuZGlmZkNsYXNzKG9wKSArICdcIj48c3BhbicgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wLCB7Y2xhc3M6ICdub3NlbGVjdCd9KSArICc+JyArIHRoaXMuZGlmZlN5bWJvbChvcCkgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIGRpc3BsYXlUeXBlLklOU0RFTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwnICsgdGhpcy5kaWZmVGFnKG9wKSArIHRoaXMuZ2V0VGFnQXR0cnMob3B0aW9ucywgb3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdG1sU3VmZml4KG9wLCBkaXNwbGF5KSB7XG4gICAgICAgIHN3aXRjaCAoZGlzcGxheSkge1xuICAgICAgICAgICAgY2FzZSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvZGl2Pic7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIGRpc3BsYXlUeXBlLklOU0RFTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvJyArIHRoaXMuZGlmZlRhZyhvcCkgKyAnPic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxMaW5lcyh0ZXh0LCBvcCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgdmFyIHk7XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBsaW5lcy5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVzW3ldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZXNbeV0gPSB0aGlzLmdldEh0bWxQcmVmaXgob3AsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGLCBvcHRpb25zKSArIGxpbmVzW3ldICsgdGhpcy5nZXRIdG1sU3VmZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVzLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgcGF0dGVybkFtcCA9IC8mL2c7XG4gICAgICAgIHZhciBwYXR0ZXJuTHQgPSAvPC9nO1xuICAgICAgICB2YXIgcGF0dGVybkd0ID0gLz4vZztcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgIHZhciB5O1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIG9wO1xuICAgICAgICB2YXIgdGV4dDtcbiAgICAgICAgdmFyIGRpZmZEYXRhID0gZGlmZnM7XG5cbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IGRpZmZEYXRhLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBkYXRhID0gZGlmZkRhdGFbeF1bMV07XG4gICAgICAgICAgICBkaWZmRGF0YVt4XVsxXSA9IGRhdGEucmVwbGFjZShwYXR0ZXJuQW1wLCAnJmFtcDsnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHBhdHRlcm5MdCwgJyZsdDsnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHBhdHRlcm5HdCwgJyZndDsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBkaWZmRGF0YS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgb3AgPSBkaWZmRGF0YVt5XVswXTtcbiAgICAgICAgICAgIHRleHQgPSBkaWZmRGF0YVt5XVsxXTtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5ID09PSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRikge1xuICAgICAgICAgICAgICAgIGh0bWxbeV0gPSB0aGlzLmNyZWF0ZUh0bWxMaW5lcyh0ZXh0LCBvcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWxbeV0gPSB0aGlzLmdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpICsgdGV4dCArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWwuam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1N0cmluZyhteVZhcikge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBteVZhciA9PT0gJ3N0cmluZycgfHwgbXlWYXIgaW5zdGFuY2VvZiBTdHJpbmcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU3RyaW5nKGxlZnQpICYmIHRoaXMuaXNTdHJpbmcocmlnaHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgZGlmZnM7XG4gICAgICAgIGlmICh0aGlzLmFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbiAgICAgICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuLy8gICAgY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVQcm9jZXNzaW5nRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbi8vICAgIHZhciBkbXA7XG4vLyAgICB2YXIgZGlmZnM7XG4vLyAgICBpZiAoYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuLy8gICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbi8vICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuLy9cbi8vICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucykgJiYgYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5lZGl0Q29zdCkgJiYgaXNGaW5pdGUob3B0aW9ucy5lZGl0Q29zdCkpIHtcbi8vICAgICAgICAgICAgZG1wLkRpZmZfRWRpdENvc3QgPSBvcHRpb25zLmVkaXRDb3N0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuLy8gICAgICAgIH1cbi8vXG4vLyAgICAgICAgZG1wLmRpZmZfY2xlYW51cEVmZmljaWVuY3koZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuLy9cbi8vICAgIGNyZWF0ZVNlbWFudGljRGlmZkh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVNlbWFudGljRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbi8vICAgIHZhciBkbXA7XG4vLyAgICB2YXIgZGlmZnM7XG4vLyAgICBpZiAoYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuLy8gICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbi8vICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBTZW1hbnRpYyhkaWZmcyk7XG4vLyAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gJyc7XG4vL30sXG5cbiAgICBwdWJsaWMgY3JlYXRlTGluZURpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkbXA7XG4gICAgICAgIHZhciBjaGFycztcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGNoYXJzID0gZG1wLmRpZmZfbGluZXNUb0NoYXJzXyhsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4oY2hhcnMuY2hhcnMxLCBjaGFycy5jaGFyczIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRtcC5kaWZmX2NoYXJzVG9MaW5lc18oZGlmZnMsIGNoYXJzLmxpbmVBcnJheSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXN9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RGlmZk1hdGNoUGFjaFNlcnZpY2V9IGZyb20gJy4vZG1wLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tsaW5lLWRpZmZdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRGlmZk1hdGNoUGFjaFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVEaWZmQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGxlZnQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIHJpZ2h0OnN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOnt9ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOkVsZW1lbnRSZWYsIHByaXZhdGUgZG1wOkRpZmZNYXRjaFBhY2hTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0xpbmVEaWZmQ29tcG9uZW50fSBmcm9tICcuL3NyYy9saW5lLWRpZmYuY29tcG9uZW50JztcblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpbmVEaWZmQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEaWZmTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7SUFNWSxTQUFTLENBQUMsRUFBRTtRQUNoQixRQUFRLEVBQUU7WUFDTixLQUFLLG1CQUFNLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxPQUFPLEtBQUssQ0FBQztZQUNqQixLQUFLLG1CQUFNLE1BQU0sR0FBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxPQUFPLEtBQUssQ0FBQztZQUNqQjs7Z0JBQ0ksT0FBTyxPQUFPLENBQUM7U0FDdEI7Ozs7OztJQUdHLFVBQVUsQ0FBQyxFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxtQkFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0Ms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
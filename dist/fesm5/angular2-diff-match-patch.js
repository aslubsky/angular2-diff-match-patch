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

export { Ng2DiffModule, DiffMatchPachService as ɵb, LineDiffComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9zcmMvZG1wLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvc3JjL2xpbmUtZGlmZi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvbmcyLWRpZmYubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEaWZmTWF0Y2hQYWNoU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgZGlzcGxheVR5cGU6YW55ID0ge1xuICAgICAgICBJTlNERUw6IDAsXG4gICAgICAgIExJTkVESUZGOiAxXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGlmZkNsYXNzKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ21hdGNoJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlN5bWJvbChvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJysnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICctJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmVGFnKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NwYW4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmQXR0ck5hbWUob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnNlcnQnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWxldGUnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXF1YWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VtcHR5T2JqZWN0KG8pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRGVmaW5lZChvKSB7XG4gICAgICAgIHJldHVybiBvICE9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wLCBhdHRycz8pIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBhdHRycyB8fCB7fTtcbiAgICAgICAgdmFyIHRhZ09wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZTtcbiAgICAgICAgdmFyIHRhZ09wdGlvbjtcbiAgICAgICAgdmFyIHJldFZhbCA9IFtdO1xuXG4gICAgICAgIGlmIChvcHRpb25zICE9IHVuZGVmaW5lZCAmJiBvcHRpb25zLmF0dHJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFnT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5hdHRyc1t0aGlzLmRpZmZBdHRyTmFtZShvcCldIHx8IHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHlPYmplY3QodGFnT3B0aW9ucykgJiYgdGhpcy5pc0VtcHR5T2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RlZmluZWQodGFnT3B0aW9uc1thdHRyaWJ1dGVdKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBhdHRyaWJ1dGUgZGVmaW5lZCBpbiBhdHRyaWJ1dGVzIHNob3VsZCBiZSBmaXJzdFxuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSArICcgJyArIHRhZ09wdGlvbnNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFnT3B0aW9uc1thdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogZXNsaW50IGd1YXJkLWZvci1pbjogXCJvZmZcIiAqL1xuICAgICAgICBmb3IgKHRhZ09wdGlvbiBpbiB0YWdPcHRpb25zKSB7XG4gICAgICAgICAgICByZXRWYWwucHVzaCh0YWdPcHRpb24gKyAnPVwiJyArIHRhZ09wdGlvbnNbdGFnT3B0aW9uXSArICdcIicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnICcgKyByZXRWYWwuam9pbignICcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFByZWZpeChvcCwgZGlzcGxheSwgb3B0aW9ucykge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiJyArIHRoaXMuZGlmZkNsYXNzKG9wKSArICdcIj48c3BhbicgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wLCB7Y2xhc3M6ICdub3NlbGVjdCd9KSArICc+JyArIHRoaXMuZGlmZlN5bWJvbChvcCkgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIGRpc3BsYXlUeXBlLklOU0RFTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwnICsgdGhpcy5kaWZmVGFnKG9wKSArIHRoaXMuZ2V0VGFnQXR0cnMob3B0aW9ucywgb3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdG1sU3VmZml4KG9wLCBkaXNwbGF5KSB7XG4gICAgICAgIHN3aXRjaCAoZGlzcGxheSkge1xuICAgICAgICAgICAgY2FzZSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvZGl2Pic7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIGRpc3BsYXlUeXBlLklOU0RFTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvJyArIHRoaXMuZGlmZlRhZyhvcCkgKyAnPic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxMaW5lcyh0ZXh0LCBvcCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgdmFyIHk7XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBsaW5lcy5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVzW3ldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZXNbeV0gPSB0aGlzLmdldEh0bWxQcmVmaXgob3AsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGLCBvcHRpb25zKSArIGxpbmVzW3ldICsgdGhpcy5nZXRIdG1sU3VmZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVzLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgcGF0dGVybkFtcCA9IC8mL2c7XG4gICAgICAgIHZhciBwYXR0ZXJuTHQgPSAvPC9nO1xuICAgICAgICB2YXIgcGF0dGVybkd0ID0gLz4vZztcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgIHZhciB5O1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIG9wO1xuICAgICAgICB2YXIgdGV4dDtcbiAgICAgICAgdmFyIGRpZmZEYXRhID0gZGlmZnM7XG5cbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IGRpZmZEYXRhLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBkYXRhID0gZGlmZkRhdGFbeF1bMV07XG4gICAgICAgICAgICBkaWZmRGF0YVt4XVsxXSA9IGRhdGEucmVwbGFjZShwYXR0ZXJuQW1wLCAnJmFtcDsnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHBhdHRlcm5MdCwgJyZsdDsnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHBhdHRlcm5HdCwgJyZndDsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBkaWZmRGF0YS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgb3AgPSBkaWZmRGF0YVt5XVswXTtcbiAgICAgICAgICAgIHRleHQgPSBkaWZmRGF0YVt5XVsxXTtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5ID09PSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRikge1xuICAgICAgICAgICAgICAgIGh0bWxbeV0gPSB0aGlzLmNyZWF0ZUh0bWxMaW5lcyh0ZXh0LCBvcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWxbeV0gPSB0aGlzLmdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpICsgdGV4dCArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWwuam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1N0cmluZyhteVZhcikge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBteVZhciA9PT0gJ3N0cmluZycgfHwgbXlWYXIgaW5zdGFuY2VvZiBTdHJpbmcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU3RyaW5nKGxlZnQpICYmIHRoaXMuaXNTdHJpbmcocmlnaHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgZGlmZnM7XG4gICAgICAgIGlmICh0aGlzLmFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbiAgICAgICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuLy8gICAgY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVQcm9jZXNzaW5nRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbi8vICAgIHZhciBkbXA7XG4vLyAgICB2YXIgZGlmZnM7XG4vLyAgICBpZiAoYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuLy8gICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbi8vICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuLy9cbi8vICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucykgJiYgYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5lZGl0Q29zdCkgJiYgaXNGaW5pdGUob3B0aW9ucy5lZGl0Q29zdCkpIHtcbi8vICAgICAgICAgICAgZG1wLkRpZmZfRWRpdENvc3QgPSBvcHRpb25zLmVkaXRDb3N0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuLy8gICAgICAgIH1cbi8vXG4vLyAgICAgICAgZG1wLmRpZmZfY2xlYW51cEVmZmljaWVuY3koZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuLy9cbi8vICAgIGNyZWF0ZVNlbWFudGljRGlmZkh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVNlbWFudGljRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbi8vICAgIHZhciBkbXA7XG4vLyAgICB2YXIgZGlmZnM7XG4vLyAgICBpZiAoYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuLy8gICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbi8vICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBTZW1hbnRpYyhkaWZmcyk7XG4vLyAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gJyc7XG4vL30sXG5cbiAgICBwdWJsaWMgY3JlYXRlTGluZURpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkbXA7XG4gICAgICAgIHZhciBjaGFycztcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGNoYXJzID0gZG1wLmRpZmZfbGluZXNUb0NoYXJzXyhsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4oY2hhcnMuY2hhcnMxLCBjaGFycy5jaGFyczIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRtcC5kaWZmX2NoYXJzVG9MaW5lc18oZGlmZnMsIGNoYXJzLmxpbmVBcnJheSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXN9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RGlmZk1hdGNoUGFjaFNlcnZpY2V9IGZyb20gJy4vZG1wLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tsaW5lLWRpZmZdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRGlmZk1hdGNoUGFjaFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVEaWZmQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGxlZnQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIHJpZ2h0OnN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOnt9ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOkVsZW1lbnRSZWYsIHByaXZhdGUgZG1wOkRpZmZNYXRjaFBhY2hTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0xpbmVEaWZmQ29tcG9uZW50fSBmcm9tICcuL3NyYy9saW5lLWRpZmYuY29tcG9uZW50JztcblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpbmVEaWZmQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEaWZmTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBTVksd0NBQVM7Ozs7Y0FBQyxFQUFFO1FBQ2hCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCOztnQkFDSSxPQUFPLE9BQU8sQ0FBQztTQUN0Qjs7Ozs7O0lBR0cseUNBQVU7Ozs7Y0FBQyxFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNOLEtBQUssbUJBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxtQkFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVztn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
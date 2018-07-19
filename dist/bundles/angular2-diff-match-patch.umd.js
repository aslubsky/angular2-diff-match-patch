(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('angular2-diff-match-patch', ['exports', '@angular/core'], factory) :
    (factory((global['angular2-diff-match-patch'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DiffMatchPachService = (function () {
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
                    case ((window)).diff_match_patch.DIFF_INSERT:
                        return 'ins';
                    case ((window)).diff_match_patch.DIFF_DELETE:
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
                    case ((window)).diff_match_patch.DIFF_INSERT:
                        return '+';
                    case ((window)).diff_match_patch.DIFF_DELETE:
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
                    case ((window)).diff_match_patch.DIFF_INSERT:
                        return 'ins';
                    case ((window)).diff_match_patch.DIFF_DELETE:
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
                    case ((window)).diff_match_patch.DIFF_INSERT:
                        return 'insert';
                    case ((window)).diff_match_patch.DIFF_DELETE:
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
                    dmp = new ((window)).diff_match_patch.diff_match_patch();
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
                    dmp = new ((window)).diff_match_patch.diff_match_patch();
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
    var LineDiffComponent = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[line-diff]',
                        providers: [
                            DiffMatchPachService
                        ]
                    },] },
        ];
        /** @nocollapse */
        LineDiffComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DiffMatchPachService }
            ];
        };
        LineDiffComponent.propDecorators = {
            left: [{ type: core.Input }],
            right: [{ type: core.Input }],
            options: [{ type: core.Input }]
        };
        return LineDiffComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2DiffModule = (function () {
        function Ng2DiffModule() {
        }
        Ng2DiffModule.decorators = [
            { type: core.NgModule, args: [{
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

    exports.Ng2DiffModule = Ng2DiffModule;
    exports.LineDiffComponent = LineDiffComponent;
    exports.DiffMatchPachService = DiffMatchPachService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvZG1wLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvbGluZS1kaWZmLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC9uZzItZGlmZi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERpZmZNYXRjaFBhY2hTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBkaXNwbGF5VHlwZTphbnkgPSB7XG4gICAgICAgIElOU0RFTDogMCxcbiAgICAgICAgTElORURJRkY6IDFcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkaWZmQ2xhc3Mob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnMnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWwnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbWF0Y2gnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaWZmU3ltYm9sKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnKyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJy0nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZUYWcob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnMnO1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9ERUxFVEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWwnO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3Bhbic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZBdHRyTmFtZShvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2luc2VydCc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbGV0ZSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcXVhbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRW1wdHlPYmplY3Qobykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEZWZpbmVkKG8pIHtcbiAgICAgICAgcmV0dXJuIG8gIT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGFnQXR0cnMob3B0aW9ucywgb3AsIGF0dHJzPykge1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGF0dHJzIHx8IHt9O1xuICAgICAgICB2YXIgdGFnT3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgYXR0cmlidXRlO1xuICAgICAgICB2YXIgdGFnT3B0aW9uO1xuICAgICAgICB2YXIgcmV0VmFsID0gW107XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgIT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuYXR0cnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YWdPcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLmF0dHJzW3RoaXMuZGlmZkF0dHJOYW1lKG9wKV0gfHwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eU9iamVjdCh0YWdPcHRpb25zKSAmJiB0aGlzLmlzRW1wdHlPYmplY3QoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGVmaW5lZCh0YWdPcHRpb25zW2F0dHJpYnV0ZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGF0dHJpYnV0ZSBkZWZpbmVkIGluIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGZpcnN0XG4gICAgICAgICAgICAgICAgdGFnT3B0aW9uc1thdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdICsgJyAnICsgdGFnT3B0aW9uc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBcIm9mZlwiICovXG4gICAgICAgIGZvciAodGFnT3B0aW9uIGluIHRhZ09wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldFZhbC5wdXNoKHRhZ09wdGlvbiArICc9XCInICsgdGFnT3B0aW9uc1t0YWdPcHRpb25dICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcgJyArIHJldFZhbC5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSB7XG4gICAgICAgIHN3aXRjaCAoZGlzcGxheSkge1xuICAgICAgICAgICAgY2FzZSBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgdGhpcy5kaWZmQ2xhc3Mob3ApICsgJ1wiPjxzcGFuJyArIHRoaXMuZ2V0VGFnQXR0cnMob3B0aW9ucywgb3AsIHtjbGFzczogJ25vc2VsZWN0J30pICsgJz4nICsgdGhpcy5kaWZmU3ltYm9sKG9wKSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgZGlzcGxheVR5cGUuSU5TREVMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPCcgKyB0aGlzLmRpZmZUYWcob3ApICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCkgKyAnPic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPC9kaXY+JztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgZGlzcGxheVR5cGUuSU5TREVMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPC8nICsgdGhpcy5kaWZmVGFnKG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSHRtbExpbmVzKHRleHQsIG9wLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IGxpbmVzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBpZiAobGluZXNbeV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lc1t5XSA9IHRoaXMuZ2V0SHRtbFByZWZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpICsgbGluZXNbeV0gKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZXMuam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuQW1wID0gLyYvZztcbiAgICAgICAgdmFyIHBhdHRlcm5MdCA9IC88L2c7XG4gICAgICAgIHZhciBwYXR0ZXJuR3QgPSAvPi9nO1xuICAgICAgICB2YXIgeDtcbiAgICAgICAgdmFyIGh0bWwgPSBbXTtcbiAgICAgICAgdmFyIHk7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICB2YXIgb3A7XG4gICAgICAgIHZhciB0ZXh0O1xuICAgICAgICB2YXIgZGlmZkRhdGEgPSBkaWZmcztcblxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgZGlmZkRhdGEubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIGRhdGEgPSBkaWZmRGF0YVt4XVsxXTtcbiAgICAgICAgICAgIGRpZmZEYXRhW3hdWzFdID0gZGF0YS5yZXBsYWNlKHBhdHRlcm5BbXAsICcmYW1wOycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UocGF0dGVybkx0LCAnJmx0OycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UocGF0dGVybkd0LCAnJmd0OycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IGRpZmZEYXRhLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBvcCA9IGRpZmZEYXRhW3ldWzBdO1xuICAgICAgICAgICAgdGV4dCA9IGRpZmZEYXRhW3ldWzFdO1xuICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGKSB7XG4gICAgICAgICAgICAgICAgaHRtbFt5XSA9IHRoaXMuY3JlYXRlSHRtbExpbmVzKHRleHQsIG9wLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbFt5XSA9IHRoaXMuZ2V0SHRtbFByZWZpeChvcCwgZGlzcGxheSwgb3B0aW9ucykgKyB0ZXh0ICsgdGhpcy5nZXRIdG1sU3VmZml4KG9wLCBkaXNwbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU3RyaW5nKG15VmFyKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIG15VmFyID09PSAnc3RyaW5nJyB8fCBteVZhciBpbnN0YW5jZW9mIFN0cmluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpbmcobGVmdCkgJiYgdGhpcy5pc1N0cmluZyhyaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZURpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkbXA7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBkaWZmcyA9IGRtcC5kaWZmX21haW4obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4vLyAgICBjcmVhdGVQcm9jZXNzaW5nRGlmZkh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuLy8gICAgdmFyIGRtcDtcbi8vICAgIHZhciBkaWZmcztcbi8vICAgIGlmIChhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4vLyAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaCgpO1xuLy8gICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4vL1xuLy8gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLmVkaXRDb3N0KSAmJiBpc0Zpbml0ZShvcHRpb25zLmVkaXRDb3N0KSkge1xuLy8gICAgICAgICAgICBkbXAuRGlmZl9FZGl0Q29zdCA9IG9wdGlvbnMuZWRpdENvc3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4vLyAgICAgICAgfVxuLy9cbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwRWZmaWNpZW5jeShkaWZmcyk7XG4vLyAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXlUeXBlLklOU0RFTCwgb3B0aW9ucyk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gJyc7XG4vL30sXG4vL1xuLy8gICAgY3JlYXRlU2VtYW50aWNEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlU2VtYW50aWNEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuLy8gICAgdmFyIGRtcDtcbi8vICAgIHZhciBkaWZmcztcbi8vICAgIGlmIChhc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4vLyAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaCgpO1xuLy8gICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4vLyAgICAgICAgZG1wLmRpZmZfY2xlYW51cFNlbWFudGljKGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcblxuICAgIHB1YmxpYyBjcmVhdGVMaW5lRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGNoYXJzO1xuICAgICAgICB2YXIgZGlmZnM7XG4gICAgICAgIGlmICh0aGlzLmFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbiAgICAgICAgICAgIGRtcCA9IG5ldyAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgICAgICAgY2hhcnMgPSBkbXAuZGlmZl9saW5lc1RvQ2hhcnNfKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihjaGFycy5jaGFyczEsIGNoYXJzLmNoYXJzMiwgZmFsc2UpO1xuICAgICAgICAgICAgZG1wLmRpZmZfY2hhcnNUb0xpbmVzXyhkaWZmcywgY2hhcnMubGluZUFycmF5KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlc30gICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtEaWZmTWF0Y2hQYWNoU2VydmljZX0gZnJvbSAnLi9kbXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2xpbmUtZGlmZl0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEaWZmTWF0Y2hQYWNoU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTGluZURpZmZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgbGVmdDpzdHJpbmc7XG4gICAgQElucHV0KCkgcmlnaHQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6e30gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6RWxlbWVudFJlZiwgcHJpdmF0ZSBkbXA6RGlmZk1hdGNoUGFjaFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7TGluZURpZmZDb21wb25lbnR9IGZyb20gJy4vbGluZS1kaWZmLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTGluZURpZmZDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgTmcyRGlmZk1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIklucHV0IiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBTVksd0NBQVM7Ozs7c0JBQUMsRUFBRTtnQkFDaEIsUUFBUSxFQUFFO29CQUNOLEtBQUssRUFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVzt3QkFDM0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLEtBQUssRUFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVzt3QkFDM0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCOzt3QkFDSSxPQUFPLE9BQU8sQ0FBQztpQkFDdEI7Ozs7OztRQUdHLHlDQUFVOzs7O3NCQUFDLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRTtvQkFDTixLQUFLLEVBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7d0JBQzNDLE9BQU8sR0FBRyxDQUFD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
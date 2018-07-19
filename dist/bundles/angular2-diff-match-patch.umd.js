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

    exports.Ng2DiffModule = Ng2DiffModule;
    exports.ɵb = DiffMatchPachService;
    exports.ɵa = LineDiffComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZGlmZi1tYXRjaC1wYXRjaC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvc3JjL2RtcC5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoL3NyYy9saW5lLWRpZmYuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoL25nMi1kaWZmLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGlmZk1hdGNoUGFjaFNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGRpc3BsYXlUeXBlOmFueSA9IHtcbiAgICAgICAgSU5TREVMOiAwLFxuICAgICAgICBMSU5FRElGRjogMVxuICAgIH07XG5cbiAgICBwcml2YXRlIGRpZmZDbGFzcyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtYXRjaCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZTeW1ib2wob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcrJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnLSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlRhZyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzcGFuJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZkF0dHJOYW1lKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zZXJ0JztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsZXRlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VxdWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbXB0eU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0RlZmluZWQobykge1xuICAgICAgICByZXR1cm4gbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUYWdBdHRycyhvcHRpb25zLCBvcCwgYXR0cnM/KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciB0YWdPcHRpb25zID0ge307XG4gICAgICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgICAgIHZhciB0YWdPcHRpb247XG4gICAgICAgIHZhciByZXRWYWwgPSBbXTtcblxuICAgICAgICBpZiAob3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdHRycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhZ09wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMuYXR0cnNbdGhpcy5kaWZmQXR0ck5hbWUob3ApXSB8fCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5T2JqZWN0KHRhZ09wdGlvbnMpICYmIHRoaXMuaXNFbXB0eU9iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKHRhZ09wdGlvbnNbYXR0cmlidXRlXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYXR0cmlidXRlIGRlZmluZWQgaW4gYXR0cmlidXRlcyBzaG91bGQgYmUgZmlyc3RcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gKyAnICcgKyB0YWdPcHRpb25zW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGVzbGludCBndWFyZC1mb3ItaW46IFwib2ZmXCIgKi9cbiAgICAgICAgZm9yICh0YWdPcHRpb24gaW4gdGFnT3B0aW9ucykge1xuICAgICAgICAgICAgcmV0VmFsLnB1c2godGFnT3B0aW9uICsgJz1cIicgKyB0YWdPcHRpb25zW3RhZ09wdGlvbl0gKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyAnICsgcmV0VmFsLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyB0aGlzLmRpZmZDbGFzcyhvcCkgKyAnXCI+PHNwYW4nICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCwge2NsYXNzOiAnbm9zZWxlY3QnfSkgKyAnPicgKyB0aGlzLmRpZmZTeW1ib2wob3ApICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuZGlmZlRhZyhvcCkgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSkge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8LycgKyB0aGlzLmRpZmZUYWcob3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciB5O1xuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgbGluZXMubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1t5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVzW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucykgKyBsaW5lc1t5XSArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW5lcy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5BbXAgPSAvJi9nO1xuICAgICAgICB2YXIgcGF0dGVybkx0ID0gLzwvZztcbiAgICAgICAgdmFyIHBhdHRlcm5HdCA9IC8+L2c7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgaHRtbCA9IFtdO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBvcDtcbiAgICAgICAgdmFyIHRleHQ7XG4gICAgICAgIHZhciBkaWZmRGF0YSA9IGRpZmZzO1xuXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCBkaWZmRGF0YS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgZGF0YSA9IGRpZmZEYXRhW3hdWzFdO1xuICAgICAgICAgICAgZGlmZkRhdGFbeF1bMV0gPSBkYXRhLnJlcGxhY2UocGF0dGVybkFtcCwgJyZhbXA7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuTHQsICcmbHQ7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuR3QsICcmZ3Q7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgZGlmZkRhdGEubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIG9wID0gZGlmZkRhdGFbeV1bMF07XG4gICAgICAgICAgICB0ZXh0ID0gZGlmZkRhdGFbeV1bMV07XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5jcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSArIHRleHQgKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpbmcobXlWYXIpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgbXlWYXIgPT09ICdzdHJpbmcnIHx8IG15VmFyIGluc3RhbmNlb2YgU3RyaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmluZyhsZWZ0KSAmJiB0aGlzLmlzU3RyaW5nKHJpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbi8vICAgIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vXG4vLyAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMuZWRpdENvc3QpICYmIGlzRmluaXRlKG9wdGlvbnMuZWRpdENvc3QpKSB7XG4vLyAgICAgICAgICAgIGRtcC5EaWZmX0VkaXRDb3N0ID0gb3B0aW9ucy5lZGl0Q29zdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2Vcbi8vICAgICAgICB9XG4vL1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBFZmZpY2llbmN5KGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcbi8vXG4vLyAgICBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuXG4gICAgcHVibGljIGNyZWF0ZUxpbmVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgY2hhcnM7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBjaGFycyA9IGRtcC5kaWZmX2xpbmVzVG9DaGFyc18obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGNoYXJzLmNoYXJzMSwgY2hhcnMuY2hhcnMyLCBmYWxzZSk7XG4gICAgICAgICAgICBkbXAuZGlmZl9jaGFyc1RvTGluZXNfKGRpZmZzLCBjaGFycy5saW5lQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RpZmZNYXRjaFBhY2hTZXJ2aWNlfSBmcm9tICcuL2RtcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbGluZS1kaWZmXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpZmZNYXRjaFBhY2hTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRGlmZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBsZWZ0OnN0cmluZztcbiAgICBASW5wdXQoKSByaWdodDpzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczp7fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmLCBwcml2YXRlIGRtcDpEaWZmTWF0Y2hQYWNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtMaW5lRGlmZkNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbGluZS1kaWZmLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTGluZURpZmZDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMaW5lRGlmZkNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgTmcyRGlmZk1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIklucHV0IiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBTVksd0NBQVM7Ozs7c0JBQUMsRUFBRTtnQkFDaEIsUUFBUSxFQUFFO29CQUNOLEtBQUssRUFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVzt3QkFDM0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLEtBQUssRUFBTSxNQUFNLEdBQUUsZ0JBQWdCLENBQUMsV0FBVzt3QkFDM0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCOzt3QkFDSSxPQUFPLE9BQU8sQ0FBQztpQkFDdEI7Ozs7OztRQUdHLHlDQUFVOzs7O3NCQUFDLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRTtvQkFDTixLQUFLLEVBQU0sTUFBTSxHQUFFLGdCQUFnQixDQUFDLFdBQVc7d0JBQzNDLE9B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
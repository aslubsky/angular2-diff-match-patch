(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('google-diff-match-patch/diff_match_patch_uncompressed')) :
    typeof define === 'function' && define.amd ? define('angular2-diff-match-patch', ['exports', '@angular/core', 'google-diff-match-patch/diff_match_patch_uncompressed'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['angular2-diff-match-patch'] = {}, global.ng.core, global.diff_match_patch));
}(this, (function (exports, i0, diff_match_patch) { 'use strict';

    var DiffMatchPachService = /** @class */ (function () {
        function DiffMatchPachService() {
        }
        DiffMatchPachService.prototype.diffClass = function (op) {
            switch (op) {
                case diff_match_patch.DIFF_INSERT:
                    return 'ins';
                case diff_match_patch.DIFF_DELETE:
                    return 'del';
                default: // case DIFF_EQUAL:
                    return 'match';
            }
        };
        DiffMatchPachService.prototype.diffSymbol = function (op) {
            switch (op) {
                case diff_match_patch.DIFF_INSERT:
                    return '+';
                case diff_match_patch.DIFF_DELETE:
                    return '-';
                default: // case DIFF_EQUAL:
                    return ' ';
            }
        };
        DiffMatchPachService.prototype.diffTag = function (op) {
            switch (op) {
                case diff_match_patch.DIFF_INSERT:
                    return 'ins';
                case diff_match_patch.DIFF_DELETE:
                    return 'del';
                default: // case DIFF_EQUAL:
                    return 'span';
            }
        };
        DiffMatchPachService.prototype.diffAttrName = function (op) {
            switch (op) {
                case diff_match_patch.DIFF_INSERT:
                    return 'insert';
                case diff_match_patch.DIFF_DELETE:
                    return 'delete';
                default: // case DIFF_EQUAL:
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
        DiffMatchPachService.prototype.getHtmlPrefix = function (op, display, options) {
            switch (display) {
                case DiffMatchPachService.displayType.LINEDIFF:
                    return '<div class="' + this.diffClass(op) + '"><span' + this.getTagAttrs(options, op, { class: 'noselect' }) + '>' + this.diffSymbol(op) + '</span>';
                default: // case displayType.INSDEL:
                    return '<' + this.diffTag(op) + this.getTagAttrs(options, op) + '>';
            }
        };
        DiffMatchPachService.prototype.getHtmlSuffix = function (op, display) {
            switch (display) {
                case DiffMatchPachService.displayType.LINEDIFF:
                    return '</div>';
                default: // case displayType.INSDEL:
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
        //    createProcessingDiffHtml: function createProcessingDiffHtml(left, right, options) {
        //    var dmp;
        //    var diffs;
        //    if (assertArgumentsIsStrings(left, right)) {
        //        dmp = new diff_match_patch();
        //        diffs = dmp.diff_main(left, right);
        //
        //        if (angular.isDefined(options) && angular.isDefined(options.editCost) && isFinite(options.editCost)) {
        //            dmp.Diff_EditCost = options.editCost; // eslint-disable-line camelcase
        //        }
        //
        //        dmp.diff_cleanupEfficiency(diffs);
        //        return createHtmlFromDiffs(diffs, displayType.INSDEL, options);
        //    }
        //    return '';
        //},
        //
        //    createSemanticDiffHtml: function createSemanticDiffHtml(left, right, options) {
        //    var dmp;
        //    var diffs;
        //    if (assertArgumentsIsStrings(left, right)) {
        //        dmp = new diff_match_patch();
        //        diffs = dmp.diff_main(left, right);
        //        dmp.diff_cleanupSemantic(diffs);
        //        return createHtmlFromDiffs(diffs, displayType.INSDEL, options);
        //    }
        //    return '';
        //},
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
        return DiffMatchPachService;
    }());
    DiffMatchPachService.displayType = {
        INSDEL: 0,
        LINEDIFF: 1
    };

    var LineDiffComponent = /** @class */ (function () {
        function LineDiffComponent(el, dmp) {
            this.el = el;
            this.dmp = dmp;
            this.options = {};
        }
        LineDiffComponent.prototype.ngOnChanges = function (changes) {
            this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
        };
        LineDiffComponent.prototype.ngOnInit = function () {
            this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
        };
        return LineDiffComponent;
    }());
    LineDiffComponent.ɵfac = function LineDiffComponent_Factory(t) { return new (t || LineDiffComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(DiffMatchPachService)); };
    LineDiffComponent.ɵdir = i0.ɵɵdefineDirective({ type: LineDiffComponent, selectors: [["", "line-diff", ""]], inputs: { left: "left", right: "right", options: "options" }, features: [i0.ɵɵProvidersFeature([
                DiffMatchPachService
            ]), i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LineDiffComponent, [{
                type: i0.Directive,
                args: [{
                        selector: '[line-diff]',
                        providers: [
                            DiffMatchPachService
                        ]
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: DiffMatchPachService }]; }, { left: [{
                    type: i0.Input
                }], right: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }] });
    })();

    var Ng2DiffModule = /** @class */ (function () {
        function Ng2DiffModule() {
        }
        return Ng2DiffModule;
    }());
    Ng2DiffModule.ɵmod = i0.ɵɵdefineNgModule({ type: Ng2DiffModule });
    Ng2DiffModule.ɵinj = i0.ɵɵdefineInjector({ factory: function Ng2DiffModule_Factory(t) { return new (t || Ng2DiffModule)(); }, imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Ng2DiffModule, { declarations: [LineDiffComponent], exports: [LineDiffComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Ng2DiffModule, [{
                type: i0.NgModule,
                args: [{
                        exports: [
                            LineDiffComponent
                        ],
                        declarations: [
                            LineDiffComponent
                        ],
                        imports: []
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DiffMatchPachService = DiffMatchPachService;
    exports.LineDiffComponent = LineDiffComponent;
    exports.Ng2DiffModule = Ng2DiffModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-diff-match-patch.umd.js.map

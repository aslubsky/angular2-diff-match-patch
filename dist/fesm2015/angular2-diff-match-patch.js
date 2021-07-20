import * as i0 from '@angular/core';
import { Directive, Input, NgModule } from '@angular/core';
import * as diff_match_patch from 'google-diff-match-patch/diff_match_patch_uncompressed';

class DiffMatchPachService {
    diffClass(op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'ins';
            case diff_match_patch.DIFF_DELETE:
                return 'del';
            default: // case DIFF_EQUAL:
                return 'match';
        }
    }
    diffSymbol(op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return '+';
            case diff_match_patch.DIFF_DELETE:
                return '-';
            default: // case DIFF_EQUAL:
                return ' ';
        }
    }
    diffTag(op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'ins';
            case diff_match_patch.DIFF_DELETE:
                return 'del';
            default: // case DIFF_EQUAL:
                return 'span';
        }
    }
    diffAttrName(op) {
        switch (op) {
            case diff_match_patch.DIFF_INSERT:
                return 'insert';
            case diff_match_patch.DIFF_DELETE:
                return 'delete';
            default: // case DIFF_EQUAL:
                return 'equal';
        }
    }
    isEmptyObject(o) {
        return Object.getOwnPropertyNames(o).length === 0;
    }
    isDefined(o) {
        return o != undefined;
    }
    getTagAttrs(options, op, attrs) {
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
    }
    getHtmlPrefix(op, display, options) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '<div class="' + this.diffClass(op) + '"><span' + this.getTagAttrs(options, op, { class: 'noselect' }) + '>' + this.diffSymbol(op) + '</span>';
            default: // case displayType.INSDEL:
                return '<' + this.diffTag(op) + this.getTagAttrs(options, op) + '>';
        }
    }
    getHtmlSuffix(op, display) {
        switch (display) {
            case DiffMatchPachService.displayType.LINEDIFF:
                return '</div>';
            default: // case displayType.INSDEL:
                return '</' + this.diffTag(op) + '>';
        }
    }
    createHtmlLines(text, op, options) {
        var lines = text.split('\n');
        var y;
        for (y = 0; y < lines.length; y++) {
            if (lines[y].length === 0) {
                continue;
            }
            lines[y] = this.getHtmlPrefix(op, DiffMatchPachService.displayType.LINEDIFF, options) + lines[y] + this.getHtmlSuffix(op, DiffMatchPachService.displayType.LINEDIFF);
        }
        return lines.join('');
    }
    createHtmlFromDiffs(diffs, display, options) {
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
    }
    isString(myVar) {
        return (typeof myVar === 'string' || myVar instanceof String);
    }
    assertArgumentsIsStrings(left, right) {
        return this.isString(left) && this.isString(right);
    }
    createDiffHtml(left, right, options) {
        var dmp;
        var diffs;
        if (this.assertArgumentsIsStrings(left, right)) {
            dmp = new diff_match_patch.diff_match_patch();
            diffs = dmp.diff_main(left, right);
            return this.createHtmlFromDiffs(diffs, DiffMatchPachService.displayType.INSDEL, options);
        }
        return '';
    }
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
    createLineDiffHtml(left, right, options) {
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
    }
}
DiffMatchPachService.displayType = {
    INSDEL: 0,
    LINEDIFF: 1
};

class LineDiffComponent {
    constructor(el, dmp) {
        this.el = el;
        this.dmp = dmp;
        this.options = {};
    }
    ngOnChanges(changes) {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }
    ngOnInit() {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }
}
LineDiffComponent.ɵfac = function LineDiffComponent_Factory(t) { return new (t || LineDiffComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(DiffMatchPachService)); };
LineDiffComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: LineDiffComponent, selectors: [["", "line-diff", ""]], inputs: { left: "left", right: "right", options: "options" }, features: [i0.ɵɵProvidersFeature([
            DiffMatchPachService
        ]), i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LineDiffComponent, [{
        type: Directive,
        args: [{
                selector: '[line-diff]',
                providers: [
                    DiffMatchPachService
                ]
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: DiffMatchPachService }]; }, { left: [{
            type: Input
        }], right: [{
            type: Input
        }], options: [{
            type: Input
        }] }); })();

class Ng2DiffModule {
}
Ng2DiffModule.ɵfac = function Ng2DiffModule_Factory(t) { return new (t || Ng2DiffModule)(); };
Ng2DiffModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Ng2DiffModule });
Ng2DiffModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Ng2DiffModule, [{
        type: NgModule,
        args: [{
                exports: [
                    LineDiffComponent
                ],
                declarations: [
                    LineDiffComponent
                ],
                imports: []
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Ng2DiffModule, { declarations: [LineDiffComponent], exports: [LineDiffComponent] }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { DiffMatchPachService, LineDiffComponent, Ng2DiffModule };
//# sourceMappingURL=angular2-diff-match-patch.js.map

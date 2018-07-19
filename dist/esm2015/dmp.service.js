/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class DiffMatchPachService {
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
function DiffMatchPachService_tsickle_Closure_declarations() {
    /** @type {?} */
    DiffMatchPachService.displayType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG1wLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoLyIsInNvdXJjZXMiOlsiZG1wLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU07Ozs7O0lBTU0sU0FBUyxDQUFDLEVBQUU7UUFDaEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNULEtBQUssbUJBQU0sTUFBTSxFQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixLQUFLLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakI7O2dCQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDdEI7Ozs7OztJQUdHLFVBQVUsQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVCxLQUFLLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixLQUFLLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7Z0JBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZjs7Z0JBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNsQjs7Ozs7O0lBR0csT0FBTyxDQUFDLEVBQUU7UUFDZCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1QsS0FBSyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEtBQUssbUJBQU0sTUFBTSxFQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVztnQkFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQjs7Z0JBQ0ksTUFBTSxDQUFDLE1B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QixDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFnQ1Asa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPO1FBQzFDLHFCQUFJLEdBQUcsQ0FBQztRQUNSLHFCQUFJLEtBQUssQ0FBQztRQUNWLHFCQUFJLEtBQUssQ0FBQztRQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEdBQUcsR0FBRyxJQUFJLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUY7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDOzs7bUNBaE5tQjtJQUM3QixNQUFNLEVBQUUsQ0FBQztJQUNULFFBQVEsRUFBRSxDQUFDO0NBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGlmZk1hdGNoUGFjaFNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGRpc3BsYXlUeXBlOmFueSA9IHtcbiAgICAgICAgSU5TREVMOiAwLFxuICAgICAgICBMSU5FRElGRjogMVxuICAgIH07XG5cbiAgICBwcml2YXRlIGRpZmZDbGFzcyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtYXRjaCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpZmZTeW1ib2wob3ApIHtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAoPGFueT53aW5kb3cpLmRpZmZfbWF0Y2hfcGF0Y2guRElGRl9JTlNFUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcrJztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnLSc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZlRhZyhvcCkge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0lOU0VSVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lucyc7XG4gICAgICAgICAgICBjYXNlICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5ESUZGX0RFTEVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlbCc7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzcGFuJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlmZkF0dHJOYW1lKG9wKSB7XG4gICAgICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfSU5TRVJUOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5zZXJ0JztcbiAgICAgICAgICAgIGNhc2UgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLkRJRkZfREVMRVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVsZXRlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VxdWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbXB0eU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0RlZmluZWQobykge1xuICAgICAgICByZXR1cm4gbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUYWdBdHRycyhvcHRpb25zLCBvcCwgYXR0cnM/KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciB0YWdPcHRpb25zID0ge307XG4gICAgICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgICAgIHZhciB0YWdPcHRpb247XG4gICAgICAgIHZhciByZXRWYWwgPSBbXTtcblxuICAgICAgICBpZiAob3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5hdHRycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhZ09wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMuYXR0cnNbdGhpcy5kaWZmQXR0ck5hbWUob3ApXSB8fCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5T2JqZWN0KHRhZ09wdGlvbnMpICYmIHRoaXMuaXNFbXB0eU9iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKHRhZ09wdGlvbnNbYXR0cmlidXRlXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYXR0cmlidXRlIGRlZmluZWQgaW4gYXR0cmlidXRlcyBzaG91bGQgYmUgZmlyc3RcbiAgICAgICAgICAgICAgICB0YWdPcHRpb25zW2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gKyAnICcgKyB0YWdPcHRpb25zW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhZ09wdGlvbnNbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGVzbGludCBndWFyZC1mb3ItaW46IFwib2ZmXCIgKi9cbiAgICAgICAgZm9yICh0YWdPcHRpb24gaW4gdGFnT3B0aW9ucykge1xuICAgICAgICAgICAgcmV0VmFsLnB1c2godGFnT3B0aW9uICsgJz1cIicgKyB0YWdPcHRpb25zW3RhZ09wdGlvbl0gKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyAnICsgcmV0VmFsLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0bWxQcmVmaXgob3AsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBjYXNlIERpZmZNYXRjaFBhY2hTZXJ2aWNlLmRpc3BsYXlUeXBlLkxJTkVESUZGOlxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyB0aGlzLmRpZmZDbGFzcyhvcCkgKyAnXCI+PHNwYW4nICsgdGhpcy5nZXRUYWdBdHRycyhvcHRpb25zLCBvcCwge2NsYXNzOiAnbm9zZWxlY3QnfSkgKyAnPicgKyB0aGlzLmRpZmZTeW1ib2wob3ApICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuZGlmZlRhZyhvcCkgKyB0aGlzLmdldFRhZ0F0dHJzKG9wdGlvbnMsIG9wKSArICc+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHRtbFN1ZmZpeChvcCwgZGlzcGxheSkge1xuICAgICAgICBzd2l0Y2ggKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGNhc2UgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj4nO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gY2FzZSBkaXNwbGF5VHlwZS5JTlNERUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8LycgKyB0aGlzLmRpZmZUYWcob3ApICsgJz4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciB5O1xuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgbGluZXMubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1t5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVzW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5MSU5FRElGRiwgb3B0aW9ucykgKyBsaW5lc1t5XSArIHRoaXMuZ2V0SHRtbFN1ZmZpeChvcCwgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW5lcy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUh0bWxGcm9tRGlmZnMoZGlmZnMsIGRpc3BsYXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5BbXAgPSAvJi9nO1xuICAgICAgICB2YXIgcGF0dGVybkx0ID0gLzwvZztcbiAgICAgICAgdmFyIHBhdHRlcm5HdCA9IC8+L2c7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgaHRtbCA9IFtdO1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBvcDtcbiAgICAgICAgdmFyIHRleHQ7XG4gICAgICAgIHZhciBkaWZmRGF0YSA9IGRpZmZzO1xuXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCBkaWZmRGF0YS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgZGF0YSA9IGRpZmZEYXRhW3hdWzFdO1xuICAgICAgICAgICAgZGlmZkRhdGFbeF1bMV0gPSBkYXRhLnJlcGxhY2UocGF0dGVybkFtcCwgJyZhbXA7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuTHQsICcmbHQ7JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShwYXR0ZXJuR3QsICcmZ3Q7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgZGlmZkRhdGEubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIG9wID0gZGlmZkRhdGFbeV1bMF07XG4gICAgICAgICAgICB0ZXh0ID0gZGlmZkRhdGFbeV1bMV07XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYpIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5jcmVhdGVIdG1sTGluZXModGV4dCwgb3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sW3ldID0gdGhpcy5nZXRIdG1sUHJlZml4KG9wLCBkaXNwbGF5LCBvcHRpb25zKSArIHRleHQgKyB0aGlzLmdldEh0bWxTdWZmaXgob3AsIGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpbmcobXlWYXIpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgbXlWYXIgPT09ICdzdHJpbmcnIHx8IG15VmFyIGluc3RhbmNlb2YgU3RyaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmluZyhsZWZ0KSAmJiB0aGlzLmlzU3RyaW5nKHJpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGlmZkh0bWwobGVmdCwgcmlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRtcDtcbiAgICAgICAgdmFyIGRpZmZzO1xuICAgICAgICBpZiAodGhpcy5hc3NlcnRBcmd1bWVudHNJc1N0cmluZ3MobGVmdCwgcmlnaHQpKSB7XG4gICAgICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIGRpZmZzID0gZG1wLmRpZmZfbWFpbihsZWZ0LCByaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBEaWZmTWF0Y2hQYWNoU2VydmljZS5kaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbi8vICAgIGNyZWF0ZVByb2Nlc3NpbmdEaWZmSHRtbDogZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc2luZ0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vXG4vLyAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMuZWRpdENvc3QpICYmIGlzRmluaXRlKG9wdGlvbnMuZWRpdENvc3QpKSB7XG4vLyAgICAgICAgICAgIGRtcC5EaWZmX0VkaXRDb3N0ID0gb3B0aW9ucy5lZGl0Q29zdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2Vcbi8vICAgICAgICB9XG4vL1xuLy8gICAgICAgIGRtcC5kaWZmX2NsZWFudXBFZmZpY2llbmN5KGRpZmZzKTtcbi8vICAgICAgICByZXR1cm4gY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgZGlzcGxheVR5cGUuSU5TREVMLCBvcHRpb25zKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiAnJztcbi8vfSxcbi8vXG4vLyAgICBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sOiBmdW5jdGlvbiBjcmVhdGVTZW1hbnRpY0RpZmZIdG1sKGxlZnQsIHJpZ2h0LCBvcHRpb25zKSB7XG4vLyAgICB2YXIgZG1wO1xuLy8gICAgdmFyIGRpZmZzO1xuLy8gICAgaWYgKGFzc2VydEFyZ3VtZW50c0lzU3RyaW5ncyhsZWZ0LCByaWdodCkpIHtcbi8vICAgICAgICBkbXAgPSBuZXcgKDxhbnk+d2luZG93KS5kaWZmX21hdGNoX3BhdGNoKCk7XG4vLyAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGxlZnQsIHJpZ2h0KTtcbi8vICAgICAgICBkbXAuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuLy8gICAgICAgIHJldHVybiBjcmVhdGVIdG1sRnJvbURpZmZzKGRpZmZzLCBkaXNwbGF5VHlwZS5JTlNERUwsIG9wdGlvbnMpO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuICcnO1xuLy99LFxuXG4gICAgcHVibGljIGNyZWF0ZUxpbmVEaWZmSHRtbChsZWZ0LCByaWdodCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgZG1wO1xuICAgICAgICB2YXIgY2hhcnM7XG4gICAgICAgIHZhciBkaWZmcztcbiAgICAgICAgaWYgKHRoaXMuYXNzZXJ0QXJndW1lbnRzSXNTdHJpbmdzKGxlZnQsIHJpZ2h0KSkge1xuICAgICAgICAgICAgZG1wID0gbmV3ICg8YW55PndpbmRvdykuZGlmZl9tYXRjaF9wYXRjaC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICAgICAgICBjaGFycyA9IGRtcC5kaWZmX2xpbmVzVG9DaGFyc18obGVmdCwgcmlnaHQpO1xuICAgICAgICAgICAgZGlmZnMgPSBkbXAuZGlmZl9tYWluKGNoYXJzLmNoYXJzMSwgY2hhcnMuY2hhcnMyLCBmYWxzZSk7XG4gICAgICAgICAgICBkbXAuZGlmZl9jaGFyc1RvTGluZXNfKGRpZmZzLCBjaGFycy5saW5lQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSHRtbEZyb21EaWZmcyhkaWZmcywgRGlmZk1hdGNoUGFjaFNlcnZpY2UuZGlzcGxheVR5cGUuTElORURJRkYsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iXX0=
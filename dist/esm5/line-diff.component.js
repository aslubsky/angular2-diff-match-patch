/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
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
export { LineDiffComponent };
function LineDiffComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    LineDiffComponent.prototype.left;
    /** @type {?} */
    LineDiffComponent.prototype.right;
    /** @type {?} */
    LineDiffComponent.prototype.options;
    /** @type {?} */
    LineDiffComponent.prototype.el;
    /** @type {?} */
    LineDiffComponent.prototype.dmp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1kaWZmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvIiwic291cmNlcyI6WyJsaW5lLWRpZmYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFvQixNQUFjLGVBQWUsQ0FBQztBQUVyRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBYS9DLDJCQUFvQixFQUFhLEVBQVUsR0FBd0I7UUFBL0MsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQXFCO3VCQUY3QyxFQUFFO0tBR3ZCOzs7OztJQUVNLHVDQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFHaEcsb0NBQVE7Ozs7UUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Z0JBbkIxRyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDUCxvQkFBb0I7cUJBQ3ZCO2lCQUNKOzs7O2dCQVR3QyxVQUFVO2dCQUUzQyxvQkFBb0I7Ozt1QkFTdkIsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7OzRCQWJWOztTQVVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXN9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RGlmZk1hdGNoUGFjaFNlcnZpY2V9IGZyb20gJy4vZG1wLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tsaW5lLWRpZmZdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRGlmZk1hdGNoUGFjaFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVEaWZmQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGxlZnQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIHJpZ2h0OnN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOnt9ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOkVsZW1lbnRSZWYsIHByaXZhdGUgZG1wOkRpZmZNYXRjaFBhY2hTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iXX0=
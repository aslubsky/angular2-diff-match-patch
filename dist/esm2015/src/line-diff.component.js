/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
export class LineDiffComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1kaWZmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvIiwic291cmNlcyI6WyJzcmMvbGluZS1kaWZmLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWlCLFVBQVUsRUFBb0IsTUFBYyxlQUFlLENBQUM7QUFFckcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBUW5ELE1BQU07Ozs7O0lBS0YsWUFBb0IsRUFBYSxFQUFVLEdBQXdCO1FBQS9DLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFxQjt1QkFGN0MsRUFBRTtLQUd2Qjs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFHaEcsUUFBUTtRQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7WUFuQjFHLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFO29CQUNQLG9CQUFvQjtpQkFDdkI7YUFDSjs7OztZQVR3QyxVQUFVO1lBRTNDLG9CQUFvQjs7O21CQVN2QixLQUFLO29CQUNMLEtBQUs7c0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXN9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RGlmZk1hdGNoUGFjaFNlcnZpY2V9IGZyb20gJy4vZG1wLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tsaW5lLWRpZmZdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRGlmZk1hdGNoUGFjaFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVEaWZmQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGxlZnQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIHJpZ2h0OnN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOnt9ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOkVsZW1lbnRSZWYsIHByaXZhdGUgZG1wOkRpZmZNYXRjaFBhY2hTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iXX0=
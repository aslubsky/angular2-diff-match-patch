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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1kaWZmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvIiwic291cmNlcyI6WyJsaW5lLWRpZmYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFvQixNQUFjLGVBQWUsQ0FBQztBQUVyRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRbkQsTUFBTTs7Ozs7SUFLRixZQUFvQixFQUFhLEVBQVUsR0FBd0I7UUFBL0MsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQXFCO3VCQUY3QyxFQUFFO0tBR3ZCOzs7OztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUdoRyxRQUFRO1FBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztZQW5CMUcsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUU7b0JBQ1Asb0JBQW9CO2lCQUN2QjthQUNKOzs7O1lBVHdDLFVBQVU7WUFFM0Msb0JBQW9COzs7bUJBU3ZCLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlc30gICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtEaWZmTWF0Y2hQYWNoU2VydmljZX0gZnJvbSAnLi9kbXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2xpbmUtZGlmZl0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEaWZmTWF0Y2hQYWNoU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTGluZURpZmZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgbGVmdDpzdHJpbmc7XG4gICAgQElucHV0KCkgcmlnaHQ6c3RyaW5nO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6e30gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6RWxlbWVudFJlZiwgcHJpdmF0ZSBkbXA6RGlmZk1hdGNoUGFjaFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kbXAuY3JlYXRlTGluZURpZmZIdG1sKHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==
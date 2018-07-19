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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1kaWZmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWRpZmYtbWF0Y2gtcGF0Y2gvIiwic291cmNlcyI6WyJzcmMvbGluZS1kaWZmLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWlCLFVBQVUsRUFBb0IsTUFBYyxlQUFlLENBQUM7QUFFckcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZUFBZSxDQUFDOztJQWEvQywyQkFBb0IsRUFBYSxFQUFVLEdBQXdCO1FBQS9DLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFxQjt1QkFGN0MsRUFBRTtLQUd2Qjs7Ozs7SUFFTSx1Q0FBVzs7OztjQUFDLE9BQXNCO1FBQ3JDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0lBR2hHLG9DQUFROzs7O1FBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O2dCQW5CMUcsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Asb0JBQW9CO3FCQUN2QjtpQkFDSjs7OztnQkFUd0MsVUFBVTtnQkFFM0Msb0JBQW9COzs7dUJBU3ZCLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLOzs0QkFiVjs7U0FVYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RpZmZNYXRjaFBhY2hTZXJ2aWNlfSBmcm9tICcuL2RtcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbGluZS1kaWZmXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpZmZNYXRjaFBhY2hTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRGlmZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBsZWZ0OnN0cmluZztcbiAgICBASW5wdXQoKSByaWdodDpzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczp7fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmLCBwcml2YXRlIGRtcDpEaWZmTWF0Y2hQYWNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19
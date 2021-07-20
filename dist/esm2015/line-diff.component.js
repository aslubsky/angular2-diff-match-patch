import { Directive, Input } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
import * as i0 from "@angular/core";
import * as i1 from "./dmp.service";
export class LineDiffComponent {
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
LineDiffComponent.ɵfac = function LineDiffComponent_Factory(t) { return new (t || LineDiffComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DiffMatchPachService)); };
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
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DiffMatchPachService }]; }, { left: [{
            type: Input
        }], right: [{
            type: Input
        }], options: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1kaWZmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hc2x1YnNreS93b3JrL2NvbGxhYm9yYXRvci9hbmd1bGFyMi1kaWZmLW1hdGNoLXBhdGNoL3NyYy8iLCJzb3VyY2VzIjpbImxpbmUtZGlmZi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQWMsZUFBZSxDQUFDO0FBRXJHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7O0FBUW5ELE1BQU0sT0FBTyxpQkFBaUI7SUFLMUIsWUFBb0IsRUFBYSxFQUFVLEdBQXdCO1FBQS9DLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUYxRCxZQUFPLEdBQU0sRUFBRSxDQUFDO0lBR3pCLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkcsQ0FBQzs7a0ZBZFEsaUJBQWlCO29FQUFqQixpQkFBaUIscUlBSmY7WUFDUCxvQkFBb0I7U0FDdkI7dUZBRVEsaUJBQWlCO2NBTjdCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFO29CQUNQLG9CQUFvQjtpQkFDdkI7YUFDSjtnR0FFWSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RpZmZNYXRjaFBhY2hTZXJ2aWNlfSBmcm9tICcuL2RtcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbGluZS1kaWZmXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERpZmZNYXRjaFBhY2hTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRGlmZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBsZWZ0OnN0cmluZztcbiAgICBASW5wdXQoKSByaWdodDpzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczp7fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmLCBwcml2YXRlIGRtcDpEaWZmTWF0Y2hQYWNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRtcC5jcmVhdGVMaW5lRGlmZkh0bWwodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZG1wLmNyZWF0ZUxpbmVEaWZmSHRtbCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19
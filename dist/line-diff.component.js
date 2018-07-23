import { Directive, Input, ElementRef } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
var LineDiffComponent = (function () {
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
    LineDiffComponent.decorators = [
        { type: Directive, args: [{
                    selector: '[line-diff]',
                    providers: [
                        DiffMatchPachService
                    ]
                },] },
    ];
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
//# sourceMappingURL=line-diff.component.js.map
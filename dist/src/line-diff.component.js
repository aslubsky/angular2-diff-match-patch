"use strict";
var core_1 = require('@angular/core');
var dmp_service_1 = require('./dmp.service');
var LineDiffComponent = (function () {
    function LineDiffComponent(el, dmp) {
        this.el = el;
        this.dmp = dmp;
        this.options = {};
    }
    LineDiffComponent.prototype.ngOnChanges = function () {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    };
    LineDiffComponent.prototype.ngOnInit = function () {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    };
    LineDiffComponent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[line-diff]',
                    providers: [
                        dmp_service_1.DiffMatchPachService
                    ]
                },] },
    ];
    /** @nocollapse */
    LineDiffComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: dmp_service_1.DiffMatchPachService, },
    ]; };
    LineDiffComponent.propDecorators = {
        'left': [{ type: core_1.Input },],
        'right': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input },],
    };
    return LineDiffComponent;
}());
exports.LineDiffComponent = LineDiffComponent;
//# sourceMappingURL=line-diff.component.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineDiffComponent.prototype, "left", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineDiffComponent.prototype, "right", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineDiffComponent.prototype, "options", void 0);
    LineDiffComponent = __decorate([
        Directive({
            selector: '[line-diff]',
            providers: [
                DiffMatchPachService
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, DiffMatchPachService])
    ], LineDiffComponent);
    return LineDiffComponent;
}());
export { LineDiffComponent };
//# sourceMappingURL=line-diff.component.js.map
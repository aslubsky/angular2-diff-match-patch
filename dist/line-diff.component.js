System.register(['@angular/core', './dmp.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, dmp_service_1;
    var LineDiffComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dmp_service_1_1) {
                dmp_service_1 = dmp_service_1_1;
            }],
        execute: function() {
            LineDiffComponent = (function () {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LineDiffComponent.prototype, "left", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LineDiffComponent.prototype, "right", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LineDiffComponent.prototype, "options", void 0);
                LineDiffComponent = __decorate([
                    core_1.Directive({
                        selector: '[line-diff]',
                        providers: [
                            dmp_service_1.DiffMatchPachService
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, dmp_service_1.DiffMatchPachService])
                ], LineDiffComponent);
                return LineDiffComponent;
            }());
            exports_1("LineDiffComponent", LineDiffComponent);
        }
    }
});
//# sourceMappingURL=line-diff.component.js.map
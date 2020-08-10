var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LineDiffComponent } from './line-diff.component';
import { NgModule } from '@angular/core';
var Ng2DiffModule = (function () {
    function Ng2DiffModule() {
    }
    Ng2DiffModule = __decorate([
        NgModule({
            exports: [
                LineDiffComponent
            ],
            declarations: [
                LineDiffComponent
            ],
            imports: []
        })
    ], Ng2DiffModule);
    return Ng2DiffModule;
}());
export { Ng2DiffModule };
//# sourceMappingURL=ng2-diff.module.js.map
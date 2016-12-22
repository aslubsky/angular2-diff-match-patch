"use strict";
var line_diff_component_1 = require('./src/line-diff.component');
var core_1 = require('@angular/core');
var Ng2DiffModule = (function () {
    function Ng2DiffModule() {
    }
    Ng2DiffModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        line_diff_component_1.LineDiffComponent
                    ],
                    declarations: [
                        line_diff_component_1.LineDiffComponent
                    ],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    Ng2DiffModule.ctorParameters = function () { return []; };
    return Ng2DiffModule;
}());
exports.Ng2DiffModule = Ng2DiffModule;
//# sourceMappingURL=ng2-diff.module.js.map
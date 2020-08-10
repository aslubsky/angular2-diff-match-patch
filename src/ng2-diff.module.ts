import {LineDiffComponent} from './line-diff.component';

// (<any>window).diff_match_patch = require('google-diff-match-patch/diff_match_patch_uncompressed');

import {NgModule} from '@angular/core';

@NgModule({
    exports: [
        LineDiffComponent
    ],
    declarations: [
        LineDiffComponent
    ],
    imports: []
})
export class Ng2DiffModule {
}

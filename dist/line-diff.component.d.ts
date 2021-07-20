import { SimpleChanges, ElementRef, OnInit, OnChanges } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
import * as i0 from "@angular/core";
export declare class LineDiffComponent implements OnInit, OnChanges {
    private el;
    private dmp;
    left: string;
    right: string;
    options: {};
    constructor(el: ElementRef, dmp: DiffMatchPachService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LineDiffComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LineDiffComponent, "[line-diff]", never, { "left": "left"; "right": "right"; "options": "options"; }, {}, never>;
}

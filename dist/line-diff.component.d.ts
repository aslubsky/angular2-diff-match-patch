import { SimpleChanges, ElementRef, OnInit, OnChanges } from '@angular/core';
import { DiffMatchPachService } from './dmp.service';
export declare class LineDiffComponent implements OnInit, OnChanges {
    private el;
    private dmp;
    left: string;
    right: string;
    options: {};
    constructor(el: ElementRef, dmp: DiffMatchPachService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}

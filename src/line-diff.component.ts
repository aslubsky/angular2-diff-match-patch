import {Directive, Input, EventEmitter, ElementRef, OnInit, OnChanges}         from 'angular2/core';

import {DiffMatchPachService} from './dmp.service';

@Directive({
    selector: 'line-diff',
    providers: [
        DiffMatchPachService
    ]
})
export class LineDiffComponent implements OnInit, OnChanges {
    @Input() left:string;
    @Input() right:string;
    @Input() options:{} = {};

    constructor(private el:ElementRef, private dmp:DiffMatchPachService) {
    }

    public ngOnChanges() {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }

    public ngOnInit() {
        this.el.nativeElement.innerHTML = this.dmp.createLineDiffHtml(this.left, this.right, this.options);
    }
}

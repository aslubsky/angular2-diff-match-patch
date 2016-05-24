export declare class DiffMatchPachService {
    private static displayType;
    private diffClass(op);
    private diffSymbol(op);
    private diffTag(op);
    private diffAttrName(op);
    private isEmptyObject(o);
    private isDefined(o);
    private getTagAttrs(options, op, attrs?);
    private getHtmlPrefix(op, display, options);
    private getHtmlSuffix(op, display);
    private createHtmlLines(text, op, options);
    private createHtmlFromDiffs(diffs, display, options);
    private isString(myVar);
    private assertArgumentsIsStrings(left, right);
    createDiffHtml(left: any, right: any, options: any): string;
    createLineDiffHtml(left: any, right: any, options: any): string;
}

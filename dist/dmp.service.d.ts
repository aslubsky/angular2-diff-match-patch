export declare class DiffMatchPachService {
    private static displayType;
    private diffClass;
    private diffSymbol;
    private diffTag;
    private diffAttrName;
    private isEmptyObject;
    private isDefined;
    private getTagAttrs;
    private getHtmlPrefix;
    private getHtmlSuffix;
    private createHtmlLines;
    private createHtmlFromDiffs;
    private isString;
    private assertArgumentsIsStrings;
    createDiffHtml(left: any, right: any, options: any): string;
    createLineDiffHtml(left: any, right: any, options: any): string;
}

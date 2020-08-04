export default class UrlTemplate {
    constructor(template: string);
    expand(context: Record<string, string[] | string>): string;
}

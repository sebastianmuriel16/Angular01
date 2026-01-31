import { UrlMatchResult, UrlSegment } from "@angular/router";

export function heroIdMatcher(urlSegments: UrlSegment[]): UrlMatchResult | null {
    if (!urlSegments[1].path.match(/^\d+$/gm)) {
        return null;
    }
    return {
        consumed: urlSegments,
        posParams: {
            id: new UrlSegment(urlSegments[1].path, {})
        }
    }
}
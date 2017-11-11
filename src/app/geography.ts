export interface Geography {
    name: string;
    geoLevelId: string;
    geoLevelDisplay: string;
    requires: string[];
    wildcard: string[];
    optionalWithWCFor: string;
}

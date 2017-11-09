export interface Variable {
    label: string;
    name: string;
    concept: string;
    predicateType: string;
    group: string;
    limit: number;
    required: string;
    predicateOnly: boolean;
    validValues: any[];
    requiredClass: string;
}

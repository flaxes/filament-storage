declare interface FilamentTypeEntity {
    name: string;
}

declare interface FilamentMaterialEntity {
    name: string;
}

declare interface BrandEntity {
    name: string;
}

declare interface FilamentSettingsEntity {
    name: string;
    filamentId: number;

    initialNozzleTemp: number;
    initialBedTemp: number;
    nozzleTemp: number;
    bedTemp: number;

    flowRatio?: number;
    kFactor?: number;

    comment?: string;
}

declare interface PrintHistoryEntity {
    name: string;

    filamentSettingIds: number[];
}

declare interface FilamentEntity {
    name?: string;

    quantity: number;

    brand: string;
    color: string;
    colorName: string;
    material: string;
    type?: string;

    settings?: FilamentSettings[];
    prints?: PrintHistory[];
}

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
    filamentSettingIds: number[];
    photoUploadsIds: number[];
    projectUploadsIds: number[];
    weight: number;
    cost: number;
}

declare interface PrintEntity {
    name: string;

    printedTimes: number;

    projectLink?: string;
    originLink?: string;
    history: PrintHistoryEntity[];
}

declare interface UploadEntity {
    name: string;
    filePath: string;
    extension: string;
    size: number;
    isPhoto?: boolean;
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

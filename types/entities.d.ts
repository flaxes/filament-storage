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

declare interface PrintEntity {
    name: string;

    status: "new" | "printed" | "bad" | "waiting";

    originLink?: string;

    photoUrls?: string[];

    previewFile?: string;
    projectUploadFile?: string;

    weightGramms?: number;
    cost?: number;
}

declare interface UploadEntity {
    name?: string;
    fileName: string;
    mimetype: string;
    sizeMb: number;
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
    comment?: string;

    qr?: string;
}

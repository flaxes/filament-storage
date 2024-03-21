declare interface FilamentTypeEntity {
    name: string;
}

declare interface FilamentMaterialEntity {
    name: string;
}

declare interface BrandEntity {
    name: string;
}

declare interface SessionEntity {
    token: string;
    fileToken: string;
    /** timestamp */
    expireAt: number;
    ip: string;
}

declare interface UserEntity {
    username: string;
    hash: string;
    salt: string;
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
    gdriveId?: string;
    fileName: string;
    mimetype: string;
    sizeMb: number;
    isPhoto?: boolean;
}

declare interface FilamentEntity {
    quantity?: number;
    weightGramms?: number;

    brand: string;
    color: string;
    colorName: string;
    material: string;
    price?: number;
    priceUsd?: number;

    isNoExport?: boolean;
    type?: string;
    comment?: string;

    qr?: string;
}

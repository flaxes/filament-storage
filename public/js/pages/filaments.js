// @ts-check

new TableHtml(
    "/api/filaments",
    {
        id: "number",
        material: { type: "select", from: "/api/filament-materials", remoteName: "filamentMaterials" },
        brand: { type: "select", from: "/api/brands", remoteName: "brands" },
        color: "color",
        type: "string",
        colorName: "string",
        quantity: "number",
        name: "string",
        createdAt: "date",
        updatedAt: "date",
    },
    main,
    true
);

// @ts-check
new TableHtml(
    "/api/filaments",
    {
        id: "number",
        material: "string",
        brand: "string",
        color: "color",
        type: "string",
        colorName: "string",
        quantity: "number",
        name: "string",
        createdAt: "date",
        updatedAt: "date",
    },
    document.body
);

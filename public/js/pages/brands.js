// @ts-check
new TableHtml(
    "/api/brands",
    {
        id: "number",
        name: "string",
        createdAt: "date",
        updatedAt: "date",
    },
    document.body
);

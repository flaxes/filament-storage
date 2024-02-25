// @ts-check
new TableHtml(
    "/api/brands",
    {
        id: "number",
        name: "string",
        isBanned: 'boolean',
        createdAt: "date",
        updatedAt: "date",
    },
    main
);

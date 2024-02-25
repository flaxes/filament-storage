// @ts-check

(() => {
    const filamentCard = new CardHtml(
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
        "filament"
    );

    filamentCard.onLinkButton = () => {
        const link = `${window.location.origin}/f${window.location.search}`;

        copyToClipboard(link);
    };

    const photoUploadForm = filamentCard.createUploadForm(lang.labelPhotos, [], (files, response) => {
        
    });

    filamentCard.createContainer("photos").append(photoUploadForm.form);
    photoUploadForm.afterAppend();
})();

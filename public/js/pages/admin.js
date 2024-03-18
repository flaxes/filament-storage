(async () => {
    /*     const input = document.createElement("input");
    input.onpaste = (e) => {
        console.log(e);
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        let blob = null;

        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                blob = item.getAsFile();
            }
        }

        // load image if there is a pasted image
        if (blob !== null) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                console.log(evt.target.result); // data url!
                this.imgRenderer.nativeElement.src = evt.target.result;
            };
            reader.readAsDataURL(blob);
        }
    };
    document.body.append(input); */

    const wrap = document.createElement("div");
    wrap.className = "wrap-static";
    document.body.append(wrap);

    const version = await request("/api/admin/version", {}, "GET");

    const updateDom = wrapTag("div", "", { class: "admin-update" }, [
        wrapTag("h2", lang.labelVersion),
        wrapTag("div", `${lang.current}: ${version.current}`),
        wrapTag("div", `${lang.last}: ${version.last}`),
        wrapTag("button", lang.actionUpdate, { id: "admin-update-button" }),
    ]);

    wrap.insertAdjacentHTML("beforeend", updateDom);
    qStrict("#admin-update-button").onclick = async () => {
        await request("/api/admin/version-update", {}, "POST");

        setTimeout(() => {
            window.location.reload();
        }, 3e3);
    };
})();

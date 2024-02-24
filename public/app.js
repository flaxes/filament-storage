const lang = {};

async function app() {
    const PAGES = {
        "/": {
            key: "_filaments_page",
            scripts: ["./js/pages/filaments.js"],
        },
    };
    const langs = await request("/lang", null, "GET");
    const headTitle = document.querySelector("head > title");
    const pageName = document.location.pathname;

    Object.assign(lang, langs);

    const PAGE = PAGES[pageName];
    if (!PAGE) {
        const d = document.createElement("div");

        d.innerText("PAGE UNKNOWN");
        headTitle.innerText = "PAGE UNKNOWN";

        document.body.append(d);
    }

    headTitle.innerText = lang[PAGE.key].h1;

    for (const script of PAGE.scripts) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = script;
        document.body.append(s);
    }

    app = null;
}

app();

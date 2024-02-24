// @ts-check
/** @type {import('../langs/en.json')} */ // @ts-ignore
const lang = {};

const render = {
    header: () => {
        const links = [
            {
                name: lang._header.filaments,
                link: "/",
            },
            {
                name: lang._header.brands,
                link: "/brands",
            },
            {
                name: lang._header.printHistory,
                link: "/print-history",
            },
            {
                name: lang._header.logout,
                link: "/logout",
            },
        ];

        const d = document.createElement("header");
        d.className = "header";

        for (const link of links) {
            d.innerHTML += wrapTag("div", '', {}, [
                wrapTag("a", link.name, { class: "header-link", href: link.link }),
            ]);

            // d.innerHTML += wrapTag("a", link.name, { class: "header-link", href: link.link });
        }

        document.body.append(d);
    },
};

async function app() {
    const PAGES = {
        "/": {
            key: "_filamentsPage",
            scripts: ["./js/pages/filaments.js"],
        },

        "/brands": {
            key: "_brandsPage",
            scripts: ["./js/pages/brands.js"],
        },
    };

    // Setup lang
    Object.assign(lang, await request("/lang", null, "GET"));

    render.header();

    const headTitle = document.querySelector("head > title");
    const pageName = document.location.pathname;

    const PAGE = PAGES[pageName];
    if (!PAGE) {
        const d = document.createElement("div");

        d.innerText = "PAGE UNKNOWN";
        // @ts-ignore
        headTitle.innerText = "PAGE UNKNOWN";

        document.body.append(d);

        return;
    }

    // @ts-ignore
    headTitle.innerText = lang[PAGE.key].h1;

    for (const script of PAGE.scripts) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = script;
        document.body.append(s);
    }

    // @ts-ignore
    app = null;
}

app();

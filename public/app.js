// @ts-check
/** @type {import('../langs/en.json')} */ // @ts-ignore
const lang = {};
const main = document.querySelector("main") || never("NO MAIN");

const render = {
    header: () => {
        const links = [
            {
                name: lang._header.index,
                link: "/",
            },
            {
                name: lang._header.filaments,
                link: "/filaments",
            },
            {
                name: lang._header.brands,
                link: "/brands",
            },
            {
                name: lang._header.filamentMaterials,
                link: "/filament-materials",
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
            d.innerHTML += wrapTag("div", "", {}, [wrapTag("a", link.name, { class: "header-link", href: link.link })]);

            // d.innerHTML += wrapTag("a", link.name, { class: "header-link", href: link.link });
        }

        document.body.prepend(d);
    },
};

async function app() {
    const PAGES = {
        "/": {
            key: "_homePage",
            scripts: ["/js/pages/home.js"],
        },

        "/filaments": {
            key: "_filamentsPage",
            scripts: ["/js/pages/filaments.js"],
        },

        "/filaments/card": {
            key: "_filamentsPage",
            scripts: ["/js/pages/filaments.card.js"],
        },

        "/login": {
            key: "_loginPage",
            scripts: ["/js/pages/login.js"],
        },

        "/brands": {
            key: "_brandsPage",
            scripts: ["/js/pages/brands.js"],
        },

        "/filament-materials": {
            key: "_filamentMaterialsPage",
            scripts: ["/js/pages/filament-materials.js"],
        },

        "/filament-card": {
            key: "_filamentCardPage",
            scripts: ["/js/pages/filament-card.js"],
        },

        "/f": {
            redirect: "/filaments/card",
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

        d.innerText = `PAGE UNKNOWN "${pageName}"`;
        // @ts-ignore
        headTitle.innerText = "PAGE UNKNOWN";

        main.append(d);

        return;
    }

    if (PAGE.redirect) {
        document.location.href = `${PAGE.redirect}${document.location.search}`;
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

"use strict";

const tabsEl = document.getElementById("tabs");
const newTabButton = document.getElementById("new-tab");
const addressForm = document.getElementById("address-form");
const topAddress = document.getElementById("top-address");
const homeForm = document.getElementById("home-form");
const homeAddress = document.getElementById("sj-address");
const subtitle = document.querySelector(".subtitle");
const searchEngine = document.getElementById("sj-search-engine");
const homeView = document.getElementById("home-view");
const frameStage = document.getElementById("frame-stage");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");
const reloadButton = document.getElementById("reload-button");
const bookmarkButton = document.getElementById("bookmark-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const menuButton = document.getElementById("menu-button");
const browserMenu = document.getElementById("browser-menu");
const bookmarkList = document.getElementById("bookmark-list");
const historyList = document.getElementById("history-list");
const bookmarksBar = document.getElementById("bookmarks-bar");
const viewport = document.querySelector(".viewport");
const clearHistoryButton = document.getElementById("clear-history");
const proxyLoader = document.getElementById("proxy-loader");
const loadingBar = document.getElementById("loading-bar");
const loaderTarget = document.getElementById("loader-target");
const FIXED_DOCUMENT_TITLE = "Calculus Courses For High School & Above";
const BLANK_FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
const DEFAULT_WISP_URL = "wss://wisp.frostcatcher.com/wisp/";
const OLD_ALGEBRA_WISP_URL = "wss://algebramasters.online/wisp";
const SECONDARY_WISP_URL = "wss://chempioneers.online/wisp/";
const TERTIARY_WISP_URL = "wss://sci.enceislife.bostoncareercounselor.com/wisp/";
const WISP_FALLBACKS = [
	{ mode: "default", label: "Wisp 1", url: DEFAULT_WISP_URL },
	{ mode: "secondary", label: "secondary Wisp", url: SECONDARY_WISP_URL },
	{ mode: "tertiary", label: "third Wisp", url: TERTIARY_WISP_URL },
];
const SESSION_TABS_KEY = "lunarisOpenTabs";

const internalPages = {
	"lunaris://home": { title: "Lunaris", path: null, icon: "orbit", documentTitle: "Lunaris" },
	"lunaris://games": { title: "Games", path: "games.html", icon: "gamepad-2", documentTitle: "Lunaris: Games" },
	"lunaris://ai": { title: "Lunaris AI", path: "ai.html", icon: "bot", documentTitle: "Lunaris: AI" },
	"lunaris://apps": { title: "Apps", path: "apps.html", icon: "layout-grid", documentTitle: "Lunaris: Apps" },
	"lunaris://tools": { title: "Tools", path: "tools.html", icon: "wrench", documentTitle: "Lunaris: Tools" },
	"lunaris://settings": { title: "Settings", path: "settings.html", icon: "settings", documentTitle: "Lunaris: Settings" },
	"lunaris://history": { title: "History", path: "history.html", icon: "history", documentTitle: "Lunaris: History" },
	"lunaris://credits": { title: "Credits", path: "credits.html", icon: "ellipsis-vertical", documentTitle: "Lunaris: Credits" },
	"lunaris://privacy": { title: "Privacy", path: "privacy.html", icon: "shield", documentTitle: "Lunaris: Privacy" },
	"lunaris://terms": { title: "Terms", path: "terms.html", icon: "scroll-text", documentTitle: "Lunaris: Terms" },
	"lunaris://partners": { title: "Partners", path: "partners.html", icon: "users", documentTitle: "Lunaris: Partners" },
	"lunaris://e2e": { title: "E2E", path: "tools/e2ev2.html", icon: "workflow", documentTitle: "Lunaris: E2E" },
	"lunaris://webretro": { title: "WebRetro", path: "tools/webretro.html", icon: "gamepad", documentTitle: "Lunaris: WebRetro" },
	"lunaris://wificracker": { title: "WiFi Tools", path: "tools/wifi-password-extractor.html", icon: "wifi", documentTitle: "Lunaris: WiFi Tools" },
};

const quotes = [
	"skidding is fun",
];

const cloakPresets = {
	none: { title: "", icon: "", url: "https://www.google.com" },
	classroom: { title: "Home", icon: "https://ssl.gstatic.com/classroom/favicon.png", url: "https://classroom.google.com" },
	iready: { title: "i-Ready", icon: "https://login.i-ready.com/favicon.ico", url: "https://login.i-ready.com" },
	quizlet: { title: "Quizlet", icon: "https://assets.quizlet.com/a/j/dist/app/i/favicon.9366d03b028710b.ico", url: "https://quizlet.com" },
	docs: { title: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico", url: "https://docs.google.com" },
	gmail: { title: "Gmail", icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico", url: "https://mail.google.com" },
	drive: { title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png", url: "https://drive.google.com" },
	canvas: { title: "Canvas", icon: "https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico", url: "https://canvas.instructure.com" },
	schoology: { title: "Home | Schoology", icon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico", url: "https://www.schoology.com" },
	clever: { title: "Clever | Portal", icon: "https://assets.clever.com/favicons/favicon-32x32.png", url: "https://clever.com" },
	powerschool: { title: "PowerSchool", icon: "https://www.powerschool.com/favicon.ico", url: "https://www.powerschool.com" },
	zoom: { title: "Zoom", icon: "https://st1.zoom.us/zoom.ico", url: "https://zoom.us" },
	google: { title: "Google", icon: "https://www.google.com/favicon.ico", url: "https://www.google.com" },
	wikipedia: { title: "Wikipedia", icon: "https://en.wikipedia.org/favicon.ico", url: "https://wikipedia.org" },
};

let scramjet;
let connection;
let activeTabId = null;
let nextTabId = 1;
let loaderTimer = null;
let loaderStartedAt = 0;
let aboutBlankWindow = null;
const tabs = [];

function boot() {
	const savedWispUrl = localStorage.getItem("wispUrl");
	if (!savedWispUrl || savedWispUrl === OLD_ALGEBRA_WISP_URL) {
		localStorage.setItem("wispUrl", DEFAULT_WISP_URL);
		localStorage.setItem("lunarisWispMode", "default");
	}

	const transport = localStorage.getItem("transport");
	if (transport !== "libcurl" && transport !== "epoxy") {
		localStorage.setItem("transport", "libcurl");
	} else if (transport === "epoxy" && localStorage.getItem("lunarisTransportDefaulted") !== "false") {
		localStorage.setItem("transport", "libcurl");
	}
	if (!localStorage.getItem("lunarisTransportDefaulted")) {
		localStorage.setItem("lunarisTransportDefaulted", "true");
	}

	const savedSearchEngine = localStorage.getItem("lunarisSearchEngine");
	if (savedSearchEngine) {
		searchEngine.value = savedSearchEngine;
	}

	const controller = $scramjetLoadController();
	scramjet = new controller.ScramjetController({
		files: {
			wasm: "/scram/scramjet.wasm.wasm",
			all: "/scram/scramjet.all.js",
			sync: "/scram/scramjet.sync.js",
		},
	});
	scramjet.init();
	connection = new BareMux.BareMuxConnection("/baremux/worker.js");

	subtitle.onclick = setRandomQuote;

	applyCloak();
	applyTheme();
	applyMobileSizer();
	setRandomQuote();
	wireEvents();
	renderBookmarksBar();

	if (sessionStorage.getItem("lunarisImportSuccess") === "true") {
		alert("Data successfully imported!");
		sessionStorage.removeItem("lunarisImportSuccess");
	}

	launchAboutBlankIfNeeded();
	if (!restoreTabs()) addTab("lunaris://home");
	refreshIcons();
}

function setRandomQuote() {
	if (!subtitle) return;
	const quote = quotes[Math.floor(Math.random() * quotes.length)];
	subtitle.textContent = quote;
}

function wireEvents() {
	newTabButton.addEventListener("click", () => addTab("lunaris://home"));
	addressForm.addEventListener("submit", (event) => {
		event.preventDefault();
		navigateActive(topAddress.value);
	});
	topAddress.addEventListener("keydown", (event) => {
		if (event.key !== "Enter") return;
		event.preventDefault();
		navigateActive(topAddress.value);
	});
	homeForm.addEventListener("submit", (event) => {
		event.preventDefault();
		topAddress.value = homeAddress.value;
		navigateActive(homeAddress.value);
	});
	homeAddress.addEventListener("keydown", (event) => {
		if (event.key !== "Enter") return;
		event.preventDefault();
		topAddress.value = homeAddress.value;
		navigateActive(homeAddress.value);
	});
	
	topAddress.addEventListener("input", () => {
		const topSuggestions = document.getElementById("top-suggestions");
		updateSearchSuggestions(topAddress, topSuggestions);
	});
	homeAddress.addEventListener("input", () => {
		const homeSuggestions = document.getElementById("home-suggestions");
		updateSearchSuggestions(homeAddress, homeSuggestions);
	});

	[topAddress, homeAddress].forEach(input => {
		input.addEventListener("keydown", (e) => {
			const suggestions = input === topAddress ? document.getElementById("top-suggestions") : document.getElementById("home-suggestions");
			if (!suggestions) return;
			const items = suggestions.querySelectorAll(".search-suggestion-item");
			
			if (suggestions.style.display === "block") {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					const active = suggestions.querySelector(".search-suggestion-item.active");
					let next = items[0];
					if (active) {
						active.classList.remove("active");
						next = active.nextElementSibling || items[0];
					}
					if (next) next.classList.add("active");
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					const active = suggestions.querySelector(".search-suggestion-item.active");
					let prev = items[items.length - 1];
					if (active) {
						active.classList.remove("active");
						prev = active.previousElementSibling || items[items.length - 1];
					}
					if (prev) prev.classList.add("active");
				} else if (e.key === "Enter") {
					const active = suggestions.querySelector(".search-suggestion-item.active");
					if (active) {
						e.preventDefault();
						active.click();
					}
				} else if (e.key === "Escape") {
					suggestions.style.display = "none";
				}
			}
		});
	});

	document.addEventListener("click", (e) => {
		const topSuggestions = document.getElementById("top-suggestions");
		const homeSuggestions = document.getElementById("home-suggestions");
		if (!e.target.closest(".address-wrapper") && !e.target.closest(".home-search-wrapper")) {
			if (topSuggestions) topSuggestions.style.display = "none";
			if (homeSuggestions) homeSuggestions.style.display = "none";
		}
	});

	backButton.addEventListener("click", () => moveHistory(-1));
	forwardButton.addEventListener("click", () => moveHistory(1));
	reloadButton.addEventListener("click", reloadActive);
	bookmarkButton.addEventListener("click", toggleBookmark);
	fullscreenButton.addEventListener("click", fullscreenActiveFrame);
	menuButton.addEventListener("click", toggleMenu);
	browserMenu.addEventListener("click", handleMenuClick);
	clearHistoryButton.addEventListener("click", clearSearchHistory);
	window.addEventListener("beforeunload", saveOpenTabs);

	document.querySelectorAll("[data-prefix]").forEach((button) => {
		button.addEventListener("click", () => navigateActive(button.dataset.prefix));
	});

	document.addEventListener("click", (event) => {
		if (browserMenu.hidden) return;
		if (browserMenu.contains(event.target) || menuButton.contains(event.target)) return;
		closeMenu();
	});

	window.addEventListener("message", (event) => {
		if (event.origin !== window.location.origin) return;

		if (event.data?.type === "lunaris:navigate") {
			navigateActive(event.data.address);
		}

		if (event.data?.type === "lunaris:data-updated") {
			applyCloak();
			applyTheme();
			applyMobileSizer();
			renderMenu();
			setActiveView();
		}

		if (event.data?.type === "lunaris:launch-aboutblank") {
			launchAboutBlankIfNeeded(true);
		}

		if (event.data?.type === "lunaris:wisp-updated") {
			handleWispUpdated();
		}
	});
}

function addTab(address) {
    const tab = {
        id: nextTabId++,
        title: "Lunaris",
        address: "lunaris://home",
        icon: "orbit",
        type: "home",
        history: [],
        historyIndex: -1,
        frame: null,
        scramFrame: null,
        loaded: false,
        entering: true,
    };

    tabs.push(tab);
    activeTabId = tab.id;
    setRandomQuote();
    navigate(tab, address, true);
    renderTabs();
    setActiveView();
    return tab;
}

function closeTab(id) {
    const index = tabs.findIndex((tab) => tab.id === id);
    if (index === -1) return;

    const tab = tabs[index];
    if (tab.closing) return;
    tab.closing = true;

    const tabButton = tabsEl.querySelector(`button[data-tab-id="${id}"]`);
    if (tabButton) {
        tabButton.classList.add("closing");
        tabButton.disabled = true;
        tabButton.addEventListener("animationend", () => commitCloseTab(id), { once: true });
        return;
    }

    commitCloseTab(id);
}

function commitCloseTab(id) {
    const index = tabs.findIndex((tab) => tab.id === id);
    if (index === -1) return;

    const [tab] = tabs.splice(index, 1);
    if (tab.frame) tab.frame.remove();
    if (tab.scramFrame) tab.scramFrame.frame.remove();

    if (!tabs.length) {
        addTab("lunaris://home");
        return;
    }

    if (activeTabId === id) {
        activeTabId = tabs[Math.max(0, index - 1)].id;
    }

    renderTabs();
    setActiveView();
    saveOpenTabs();
}

function getActiveTab() {
	return tabs.find((tab) => tab.id === activeTabId);
}

function navigateActive(input) {
	const tab = getActiveTab();
	if (tab) navigate(tab, input, true);
}

async function navigate(tab, rawInput, pushHistory) {
	const input = (rawInput || "").trim();
	if (!input) return;

	clearError();
	const prefix = normalizeInternalPrefix(input);

	if (prefix) {
		hideProxyLoader();
		if (prefix === "lunaris://home") setRandomQuote();
		openInternal(tab, prefix);
	} else {
		await openWeb(tab, input);
	}

	tab.loaded = true;

	if (pushHistory) {
		tab.history = tab.history.slice(0, tab.historyIndex + 1);
		tab.history.push(tab.address);
		tab.historyIndex = tab.history.length - 1;
		saveSearchHistory(tab);
	}

	renderTabs();
	setActiveView();
	saveOpenTabs();
}

function normalizeInternalPrefix(input) {
	const lower = input.toLowerCase();
	if (internalPages[lower]) return lower;
	if (lower.startsWith("lunaris://")) return null;
	return null;
}

function openInternal(tab, prefix) {
	const page = internalPages[prefix];
	tab.type = page.path ? "internal" : "home";
	tab.address = prefix;
	tab.title = page.title;
	tab.icon = page.icon;
	document.title = currentDocumentTitle();
	topAddress.value = prefix;

	if (!page.path) return;

	if (!tab.frame) {
		tab.frame = document.createElement("iframe");
		tab.frame.className = "content-frame";
		tab.frame.title = page.title;
		tab.frame.allow = "fullscreen";
		frameStage.appendChild(tab.frame);
	}

	tab.frame.src = page.path;
	tab.frame.title = page.title;
}

async function openWeb(tab, input) {
	const url = search(input, searchEngine.value);
	const isNewAddress = tab.address !== url;
	tab.type = "web";
	tab.address = url;
	tab.title = titleFromInput(url);
	tab.icon = "globe";
	if (isNewAddress) tab.proxyRetryUsed = false;
	document.title = currentDocumentTitle();
	topAddress.value = url;
	showProxyLoader(tab.title);

	try {
		await ensureTransport();
	} catch (err) {
		error.textContent = "Failed to prepare the proxy.";
		errorCode.textContent = err.toString();
		throw err;
	}

	if (!tab.scramFrame) {
		tab.scramFrame = scramjet.createFrame();
		tab.scramFrame.frame.id = `sj-frame-${tab.id}`;
		tab.scramFrame.frame.className = "content-frame";
		tab.scramFrame.frame.allow = "fullscreen";
		tab.scramFrame.frame.addEventListener("load", () => {
			queueProxyLoaderHide();
			if (retryWithNextWispIfNeeded(tab)) return;
			try {
				const frameDocument = tab.scramFrame.frame.contentDocument;
				if (frameDocument && frameDocument.title && frameDocument.title !== "Lunaris") {
					tab.title = frameDocument.title;
					renderTabs();
					saveSearchHistory(tab);
				}
			} catch (err) {
				// Cross-origin fallback
			}
		});
		frameStage.appendChild(tab.scramFrame.frame);
		if (tab.id === activeTabId) {
			tab.scramFrame.frame.classList.add("active");
		}
	}

	tab.scramFrame.go(url);
}

function retryWithNextWispIfNeeded(tab) {
	try {
		const frameDocument = tab.scramFrame?.frame.contentDocument;
		const trace = frameDocument?.getElementById("errorTrace")?.value || "";
		const activeWisp = localStorage.getItem("wispUrl");
		const mode = localStorage.getItem("lunarisWispMode") || "default";
		const isWispFailure = isWispFailureTrace(trace);
		const nextWisp = getNextBuiltInWisp(mode, activeWisp);
		if (!isWispFailure || !nextWisp) return false;

		localStorage.setItem("wispUrl", nextWisp.url);
		localStorage.setItem("lunarisWispMode", nextWisp.mode);
		localStorage.removeItem("lunarisLastWisp");
		error.textContent = `Wisp did not open. Trying ${nextWisp.label}...`;
		ensureTransport()
			.then(() => {
				tab.scramFrame?.frame.remove();
				tab.scramFrame = null;
				return openWeb(tab, tab.address).then(() => setActiveView());
			})
			.catch((err) => {
				error.textContent = "Failed to switch to Wisp 2.";
				errorCode.textContent = err.toString();
			});
		return true;
	} catch (err) {
		return false;
	}
}

async function ensureTransport() {
	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	let wispUrl = localStorage.getItem("wispUrl");
	let transportType = localStorage.getItem("transport");
	wispUrl = await resolveWispUrl(wispUrl);

	if (transportType !== "libcurl" && transportType !== "epoxy") {
		transportType = "libcurl";
		localStorage.setItem("transport", transportType);
	}

	const transportPath = transportType === "epoxy" ? "/epoxy/index.mjs" : "/libcurl/index.mjs";
	const transportConfig = [{ wisp: wispUrl }];

	if ((await connection.getTransport()) !== transportPath || localStorage.getItem("lunarisLastWisp") !== wispUrl) {
		await connection.setTransport(transportPath, transportConfig);
		localStorage.setItem("lunarisLastWisp", wispUrl);
	}
}

async function resolveWispUrl(wispUrl) {
	const mode = localStorage.getItem("lunarisWispMode") || "default";
	
	if (mode === "custom") {
		if (!wispUrl) return DEFAULT_WISP_URL;
		const works = await canOpenWisp(wispUrl);
		if (works) return wispUrl;
		error.textContent = "Your custom Wisp failed to connect. Falling back to built-in servers...";
	}

	const startIndex = Math.max(0, WISP_FALLBACKS.findIndex((wisp) => wisp.mode === mode || wisp.url === wispUrl));
	for (let index = startIndex; index < WISP_FALLBACKS.length; index += 1) {
		const candidate = WISP_FALLBACKS[index];
		if (index > startIndex) {
			error.textContent = `Wisp did not open. Trying ${candidate.label}...`;
		}
		const works = await canOpenWisp(candidate.url);
		if (works) {
			localStorage.setItem("wispUrl", candidate.url);
			localStorage.setItem("lunarisWispMode", candidate.mode);
			return candidate.url;
		}
		sessionStorage.setItem(`lunarisWispFailed:${candidate.url}`, "true");
	}

	localStorage.removeItem("lunarisLastWisp");
	error.textContent = "All built-in Wisps failed to open. Try a different custom Wisp in Settings.";
	return DEFAULT_WISP_URL;
}

function handleWispUpdated() {
	sessionStorage.removeItem("lunarisDefaultWispFailed");
	localStorage.removeItem("lunarisLastWisp");
	tabs.forEach((tab) => {
		if (!tab.scramFrame) return;
		tab.scramFrame.frame.remove();
		tab.scramFrame = null;
		tab.proxyRetryUsed = false;
		tab.loaded = false;
	});
	const tab = getActiveTab();
	if (tab?.type === "web" && tab.address) {
		navigate(tab, tab.address, false);
	}
}

function applyMobileSizer() {
	const enabled = localStorage.getItem("lunarisMobileSizer") === "true";
	const size = localStorage.getItem("lunarisMobileSize") || "390x844";
	const [width, height] = size.split("x").map((value) => Number.parseInt(value, 10));
	frameStage.classList.toggle("mobile-sized", enabled);
	frameStage.style.setProperty("--mobile-frame-width", `${Number.isFinite(width) ? width : 390}px`);
	frameStage.style.setProperty("--mobile-frame-height", `${Number.isFinite(height) ? height : 844}px`);
}

function canOpenWisp(url) {
	return new Promise((resolve) => {
		let settled = false;
		const finish = (ok) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			try {
				socket.close();
			} catch (err) {
				// The socket may already be closed.
			}
			resolve(ok);
		};
		const timer = setTimeout(() => finish(false), 3000);
		let socket;
		try {
			socket = new WebSocket(url);
			socket.addEventListener("open", () => finish(true), { once: true });
			socket.addEventListener("error", () => finish(false), { once: true });
			socket.addEventListener("close", () => finish(false), { once: true });
		} catch (err) {
			finish(false);
		}
	});
}

function isWispFailureTrace(trace) {
	return [
		"Wisp WebSocket failed to connect",
		"websocket did not open",
		"tls handshake eof",
		"failed to lookup address information",
		"NetworkError",
		"UnexpectedEof",
	].some((message) => trace.includes(message));
}

function getNextBuiltInWisp(mode, activeWisp) {
	const index = WISP_FALLBACKS.findIndex((wisp) => wisp.mode === mode || wisp.url === activeWisp);
	if (index === -1) return null;
	return WISP_FALLBACKS[index + 1] || null;
}

function moveHistory(direction) {
	const tab = getActiveTab();
	if (!tab) return;

	const nextIndex = tab.historyIndex + direction;
	if (nextIndex < 0 || nextIndex >= tab.history.length) return;

	tab.historyIndex = nextIndex;
	navigate(tab, tab.history[nextIndex], false);
}

function reloadActive() {
	const tab = getActiveTab();
	if (!tab) return;

	if (tab.type === "internal" && tab.frame) {
		tab.frame.contentWindow.location.reload();
		return;
	}

	if (tab.type === "web" && tab.address) {
		navigate(tab, tab.address, false);
	}
}

function renderTabs() {
    tabsEl.innerHTML = "";

    tabs.forEach((tab) => {
        const tabButton = document.createElement("button");
        tabButton.type = "button";
        tabButton.className = `tab${tab.id === activeTabId ? " active" : ""}${tab.closing ? " closing" : ""}`;
        tabButton.dataset.tabId = tab.id;
        tabButton.title = tab.address;
        tabButton.innerHTML = `
            <i data-lucide="${tab.icon}"></i>
            <span class="tab-title">${escapeHtml(tab.title)}</span>
            <span class="tab-close" aria-label="Close tab" title="Close tab"><i data-lucide="x"></i></span>
        `;

        if (tab.entering) {
            requestAnimationFrame(() => {
                tabButton.classList.add("pop-in");
            });
            tabButton.addEventListener("animationend", () => {
                tab.entering = false;
                tabButton.classList.remove("pop-in");
            }, { once: true });
        }

        tabButton.addEventListener("click", (event) => {
            if (event.target.closest(".tab-close")) {
                event.stopPropagation();
                closeTab(tab.id);
                return;
            }

            activeTabId = tab.id;
            renderTabs();
            setActiveView();
        });

        tabsEl.appendChild(tabButton);
    });

    refreshIcons();
    updateBookmarkButton();
}

function setActiveView() {
	const tab = getActiveTab();
	if (!tab) return;

	if (!tab.loaded && tab.address) {
		navigate(tab, tab.address, false);
		return;
	}

	if (document.activeElement !== topAddress) {
		topAddress.value = tab.address;
	}
	homeAddress.value = "";
	homeView.classList.toggle("hidden", tab.type !== "home");
	frameStage.classList.toggle("active", tab.type !== "home");

	document.querySelectorAll(".content-frame").forEach((frame) => {
		frame.classList.remove("active");
	});

	if (tab.type === "internal" && tab.frame) {
		tab.frame.classList.add("active");
	}

	if (tab.type === "web" && tab.scramFrame) {
		tab.scramFrame.frame.classList.add("active");
	}

	backButton.disabled = tab.historyIndex <= 0;
	forwardButton.disabled = tab.historyIndex >= tab.history.length - 1;
	fullscreenButton.disabled = tab.type === "home";
	updateBookmarkButton();
	const page = internalPages[tab.address];
	document.title = currentDocumentTitle();
}

function saveOpenTabs() {
	if (!tabs.length) return;

	const payload = {
		activeTabId,
		nextTabId,
		tabs: tabs.map((tab) => ({
			id: tab.id,
			title: tab.title,
			address: tab.address,
			icon: tab.icon,
			type: tab.type,
			history: tab.history,
			historyIndex: tab.historyIndex,
		})),
	};
	localStorage.setItem(SESSION_TABS_KEY, JSON.stringify(payload));
}

function restoreTabs() {
	const payload = readJson(SESSION_TABS_KEY, null);
	if (!payload || !Array.isArray(payload.tabs) || !payload.tabs.length) return false;

	tabs.length = 0;
	nextTabId = Number(payload.nextTabId) || 1;

	payload.tabs.slice(0, 12).forEach((savedTab) => {
		const address = String(savedTab.address || "lunaris://home");
		const page = internalPages[address];
		const type = address === "lunaris://home" ? "home" : page ? "internal" : "web";
		const id = Number(savedTab.id) || nextTabId++;
		nextTabId = Math.max(nextTabId, id + 1);
		tabs.push({
			id,
			title: String(savedTab.title || page?.title || "Lunaris"),
			address,
			icon: String(savedTab.icon || page?.icon || "globe"),
			type,
			history: Array.isArray(savedTab.history) ? savedTab.history : [address],
			historyIndex: Number.isInteger(savedTab.historyIndex) ? savedTab.historyIndex : 0,
			frame: null,
			scramFrame: null,
			loaded: false,
		});
	});

	if (!tabs.length) return false;
	const savedActiveId = Number(payload.activeTabId);
	activeTabId = tabs.some((tab) => tab.id === savedActiveId) ? savedActiveId : tabs[0].id;
	renderTabs();
	setActiveView();
	return true;
}

function toggleBookmark() {
	const tab = getActiveTab();
	if (!tab || tab.type === "home") return;

	const bookmarks = readJson("lunarisBookmarks", []);
	const index = bookmarks.findIndex((bookmark) => bookmark.address === tab.address);

	if (index >= 0) {
		bookmarks.splice(index, 1);
	} else {
		bookmarks.unshift({
			address: tab.address,
			title: tab.title,
			icon: tab.icon,
			createdAt: new Date().toISOString(),
		});
	}

	localStorage.setItem("lunarisBookmarks", JSON.stringify(bookmarks.slice(0, 100)));
	updateBookmarkButton();
	renderMenu();
	renderBookmarksBar();
}

function updateBookmarkButton() {
	const tab = getActiveTab();
	const bookmarks = readJson("lunarisBookmarks", []);
	const isBookmarked = Boolean(tab && bookmarks.some((bookmark) => bookmark.address === tab.address));
	bookmarkButton.classList.toggle("active", isBookmarked);
	bookmarkButton.disabled = !tab || tab.type === "home";
	bookmarkButton.title = isBookmarked ? "Remove bookmark" : "Bookmark this page";
}

function renderBookmarksBar() {
	if (!bookmarksBar) return;
	const bookmarks = readJson("lunarisBookmarks", []);
	bookmarksBar.innerHTML = "";

	if (!bookmarks.length) {
		bookmarksBar.hidden = true;
		viewport.classList.remove("with-bookmarks");
		return;
	}

	bookmarksBar.hidden = false;
	viewport.classList.add("with-bookmarks");

	bookmarks.slice(0, 15).forEach((bookmark) => {
		const pill = document.createElement("button");
		pill.type = "button";
		pill.className = "bookmark-pill";
		pill.title = bookmark.address;
		
		let iconHtml = `<i data-lucide="${bookmark.icon || "globe"}"></i>`;
		if (bookmark.address.startsWith("http")) {
			try {
				const url = new URL(bookmark.address);
				iconHtml = `<img src="https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" style="width:16px;height:16px;border-radius:2px;margin-right:2px;"><i data-lucide="${bookmark.icon || "globe"}" style="display:none;"></i>`;
			} catch (err) {}
		}
		
		pill.innerHTML = `${iconHtml}<span>${escapeHtml(bookmark.title || bookmark.address)}</span>`;
		pill.onclick = () => navigateActive(bookmark.address);
		bookmarksBar.appendChild(pill);
	});

	refreshIcons();
}

function saveSearchHistory(tab) {
	if (!tab || tab.address === "lunaris://home") return;

	const history = readJson("lunarisSearchHistory", []);
	const item = {
		address: tab.address,
		title: tab.title,
		icon: tab.icon,
		visitedAt: new Date().toISOString(),
	};
	const filtered = history.filter((entry) => entry.address !== item.address);
	localStorage.setItem("lunarisSearchHistory", JSON.stringify([item, ...filtered].slice(0, 500)));
}

function toggleMenu(event) {
	event.stopPropagation();
	browserMenu.hidden = !browserMenu.hidden;
	menuButton.setAttribute("aria-expanded", String(!browserMenu.hidden));
	if (!browserMenu.hidden) renderMenu();
}

function closeMenu() {
	browserMenu.hidden = true;
	menuButton.setAttribute("aria-expanded", "false");
}

function handleMenuClick(event) {
	const actionButton = event.target.closest("[data-menu-action]");
	const item = event.target.closest("[data-address]");

	if (actionButton?.dataset.menuAction === "settings") {
		closeMenu();
		navigateActive("lunaris://settings");
		return;
	}

	if (actionButton?.dataset.menuAction === "history") {
		closeMenu();
		navigateActive("lunaris://history");
		return;
	}

	if (actionButton?.dataset.menuAction === "tools") {
		closeMenu();
		navigateActive("lunaris://tools");
		return;
	}

	if (actionButton?.dataset.menuAction === "partners") {
		closeMenu();
		navigateActive("lunaris://partners");
		return;
	}

	if (actionButton?.dataset.menuAction === "eruda") {
		closeMenu();
		injectEruda();
		return;
	}

	if (item) {
		closeMenu();
		navigateActive(item.dataset.address);
	}
}

function renderMenu() {
	renderMenuList(bookmarkList, readJson("lunarisBookmarks", []), "No bookmarks yet");
	renderMenuList(historyList, readSearchHistory(), "No history yet");
	refreshIcons();
}

function readSearchHistory() {
	const history = readJson("lunarisSearchHistory", []);
	const filtered = history.filter((entry) => !String(entry.address || "").startsWith("lunaris://"));
	if (filtered.length !== history.length) {
		localStorage.setItem("lunarisSearchHistory", JSON.stringify(filtered));
	}
	return filtered;
}

function renderMenuList(container, items, emptyText) {
	container.innerHTML = "";

	if (!items.length) {
		const empty = document.createElement("div");
		empty.className = "menu-empty";
		empty.textContent = emptyText;
		container.appendChild(empty);
		return;
	}

	items.forEach((item) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "menu-item";
		button.dataset.address = item.address;
		button.title = item.address;
		button.innerHTML = `<i data-lucide="${item.icon || "globe"}"></i><span>${escapeHtml(item.title || item.address)}</span>`;
		container.appendChild(button);
	});
}

function clearSearchHistory(event) {
	event.stopPropagation();
	localStorage.removeItem("lunarisSearchHistory");
	renderMenu();
}

function fullscreenActiveFrame() {
	const tab = getActiveTab();
	const frame = tab?.type === "internal" ? tab.frame : tab?.scramFrame?.frame;
	if (!frame) return;

	if (document.fullscreenElement) {
		document.exitFullscreen();
		return;
	}

	frame.requestFullscreen?.();
}

function injectEruda() {
	const tab = getActiveTab();
	if (!tab?.scramFrame?.frame) {
		error.textContent = "Load a Scramjet website before opening Eruda DevTools.";
		return;
	}

	try {
		const frameDocument = tab.scramFrame.frame.contentDocument;
		if (!frameDocument) throw new Error("The active frame is not ready.");
		if (frameDocument.getElementById("lunaris-eruda")) {
			tab.scramFrame.frame.contentWindow.eruda?.show?.();
			return;
		}

		const script = frameDocument.createElement("script");
		script.id = "lunaris-eruda";
		script.src = "https://cdn.jsdelivr.net/npm/eruda";
		script.onload = () => tab.scramFrame.frame.contentWindow.eruda?.init?.();
		frameDocument.documentElement.appendChild(script);
	} catch (err) {
		error.textContent = "Eruda can only be injected after a Scramjet page is loaded.";
		errorCode.textContent = err.toString();
	}
}

function applyCloak() {
	const cloak = localStorage.getItem("lunarisCloak") || "none";
	let icon = BLANK_FAVICON;

	if (cloak === "custom") {
		icon = localStorage.getItem("lunarisCustomCloakIcon") || BLANK_FAVICON;
	} else {
		const preset = cloakPresets[cloak];
		icon = preset?.icon || BLANK_FAVICON;
	}

	const title = currentDocumentTitle();

	updateDocumentIdentity(document, title, icon);

	if (window.top !== window.self) {
		try {
			updateDocumentIdentity(window.top.document, title, icon);
		} catch (err) {
			// Cross-origin restriction fallback
		}
	}
}

function updateDocumentIdentity(doc, title, icon) {
	doc.title = title;
	const favicon = doc.querySelector("link[rel='shortcut icon']") || doc.createElement("link");
	favicon.rel = "shortcut icon";
	favicon.href = icon;
	if (!favicon.parentNode) doc.head.appendChild(favicon);
}

function applyTheme() {
	const theme = localStorage.getItem("lunarisTheme") || "default";
	document.body.dataset.theme = theme === "default" ? "" : theme;
}

function currentDocumentTitle() {
	const cloak = localStorage.getItem("lunarisCloak") || "none";

	if (cloak === "custom") {
		return localStorage.getItem("lunarisCustomCloakTitle") || FIXED_DOCUMENT_TITLE;
	}

	const preset = cloakPresets[cloak];
	if (preset && preset.title) {
		return preset.title;
	}

	return FIXED_DOCUMENT_TITLE;
}

function launchAboutBlankIfNeeded(force = false) {
	if (!force && localStorage.getItem("lunarisAutoAboutBlank") !== "true") return;
	if (window.top !== window.self) return;
	if (aboutBlankWindow && !aboutBlankWindow.closed) return;
	if (!force && sessionStorage.getItem("lunarisAboutBlankLaunched") === "true") return;

	aboutBlankWindow = window.open("about:blank", "_blank");
	if (!aboutBlankWindow) return;

	sessionStorage.setItem("lunarisAboutBlankLaunched", "true");

	const cloak = localStorage.getItem("lunarisCloak") || "none";
	const preset = cloakPresets[cloak];
	const title = currentDocumentTitle();
	let icon = BLANK_FAVICON;

	if (cloak === "custom") {
		icon = localStorage.getItem("lunarisCustomCloakIcon") || BLANK_FAVICON;
	} else {
		icon = preset?.icon || BLANK_FAVICON;
	}

	const escapedUrl = location.href.replace(/"/g, "&quot;");
	aboutBlankWindow.document.open();
	aboutBlankWindow.document.write(`
		<!doctype html>
		<html>
		<head>
			<title>${title}</title>
			<link rel="shortcut icon" href="${icon}" />
			<style>html,body,iframe{width:100%;height:100%;margin:0;border:0;overflow:hidden;background:#111}</style>
		</head>
		<body>
			<iframe src="${escapedUrl}"></iframe>
		</body>
		</html>
	`);
	aboutBlankWindow.document.close();

	if (!force) {
		const redirectUrl = preset?.url || "https://www.google.com";
		window.location.replace(redirectUrl);
	}
}

function readJson(key, fallback) {
	try {
		return JSON.parse(localStorage.getItem(key)) || fallback;
	} catch (err) {
		return fallback;
	}
}

function titleFromInput(input) {
	try {
		const url = new URL(input);
		const searchParams = url.searchParams;
		if (searchParams.has("q")) {
			return `Search: ${searchParams.get("q")}`;
		}
		return url.hostname.replace(/^www\./, "") || "Search";
	} catch (err) {
		return input.length > 18 ? `${input.slice(0, 18)}...` : input || "Search";
	}
}

function clearError() {
	error.textContent = "";
	errorCode.textContent = "";
}

function showProxyLoader(target) {
	loaderStartedAt = performance.now();
	if (loadingBar) {
		loadingBar.classList.add("active");
		loadingBar.style.width = "0%";
		setTimeout(() => {
			if (loadingBar.classList.contains("active")) {
				loadingBar.style.width = "30%";
			}
		}, 10);
		setTimeout(() => {
			if (loadingBar.classList.contains("active")) {
				loadingBar.style.width = "60%";
			}
		}, 400);
		setTimeout(() => {
			if (loadingBar.classList.contains("active")) {
				loadingBar.style.width = "85%";
			}
		}, 800);
	}

	loaderTarget.textContent = target ? "Lunaris is searching for your course.. (sorry for slop loading)" : "Preparing..";
	proxyLoader.hidden = false;
	clearTimeout(loaderTimer);
	loaderTimer = setTimeout(hideProxyLoader, 15000);
}

function queueProxyLoaderHide() {
	const elapsed = performance.now() - loaderStartedAt;
	const remaining = Math.max(1000 - elapsed, 0);
	clearTimeout(loaderTimer);
	loaderTimer = setTimeout(hideProxyLoader, remaining);
}

function hideProxyLoader() {
	clearTimeout(loaderTimer);
	if (loadingBar) {
		loadingBar.style.width = "100%";
		setTimeout(() => {
			loadingBar.classList.remove("active");
			setTimeout(() => {
				loadingBar.style.width = "0%";
			}, 300);
		}, 300);
	}
	proxyLoader.hidden = true;
}

async function updateSearchSuggestions(input, container) {
	if (!container) return;
	const query = input.value.trim();
	if (!query || query.length < 2) {
		container.style.display = "none";
		return;
	}

	try {
		const res = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`);
		const data = await res.json();
		const results = data[1] || [];

		if (results.length === 0) {
			container.style.display = "none";
			return;
		}

		container.innerHTML = results.slice(0, 6).map(text => `
			<div class="search-suggestion-item" style="padding: 12px 20px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: background 0.2s;">
				<i data-lucide="search" style="width: 16px; height: 16px; color: var(--accent);"></i>
				<span class="suggestion-text">${escapeHtml(text)}</span>
			</div>
		`).join("");

		container.style.display = "block";
		refreshIcons();

		Array.from(container.querySelectorAll(".search-suggestion-item")).forEach(item => {
			item.onmousedown = (e) => {
				e.preventDefault();
				const text = item.querySelector(".suggestion-text").textContent;
				input.value = text;
				container.style.display = "none";
				navigateActive(text);
			};
		});
	} catch (e) {
		console.error("Suggestions fetch error:", e);
		container.style.display = "none";
	}
}

function refreshIcons() {
	if (window.lucide) {
		window.lucide.createIcons();
	}
}

function escapeHtml(value) {
	return value.replace(/[&<>"']/g, (char) => {
		return {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		}[char];
	});
}

window.addEventListener("DOMContentLoaded", boot);

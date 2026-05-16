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
const SUS_WORDS = ["porn", "xvideos", "pornhub", "hentai", "rule34", "nhentai", "redtube", "brazzers", "xhamster", "sex", "xxx", "xxporn", "porntub", "sex", "mommy", "daddy", "cock", "slut", "cum","cumslut", "xx", "diddy", "diddy party" ];
const VERIFICATION_PHRASE = "I am a stupid little degenerate and I will remember this phrase for the rest of my life.";

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
	"Andrew Hu, I know you're trying to ragebait us with dates.",
	"Yo yo yo - drdonutt",
	"don't ever give up - a wise guy",
	"If you see a scammer scamming, go and scam the scammer with their own scammer technique",
	"Learning is a treasure that will follow its owner everywhere.",
	"coded by the skids, for the skids",
	"Classroom.lol but it's actually good",
	"This is what you call.. a vibecoded site.",
	"Teachers hate this one simple trick to get free games",
	"I type all ts on ARCH BTW",
	"trust me bro.. it's not a virus.💀",
	"diddy diddy",
	"ctrl+s your life bro",
	"this site runs on hopes and bad javascript",
	"99% of coding is googling",
	"Curiosity is the wick in the candle of learning.",
	"Knowledge speaks, but wisdom listens.",
	"Why Unenroll when you have this?",
	"Vibecoded by Claude",
	"This site is so good, even MOJANG is jealous",
	"The FBI is definitely not watching you use this, nope.",
	"Jeffrey Epstein definitely did not use this site, no way.",
	"Bro github copilot the quotes that u are making are so cringe [ROFL emoji]",
	"Finally beat soulmaster [pray emoji]",
	"Daddy hu!!",
	"fuck you, im not adding shell shockers [rofl emoji]",
	"nothing.",
	"Teachers hate this one simple trick to get free games and tools on school chromebooks",
	"The IRS CANNOT TOUCH ME!!",
	"67.world for more!",
	"Andewwww huuuu is . gay!!!",
	"teachers hate ts", 
	"what's Nasa-dude doing, idk prob hacking on mc",
	"Have you ever played blox fruits with your life on line? while having A BUNCH of mangoes in your mouth? heh... well… this is called DARK MANGO PSYCHOLOGY 💀. Now in dark mango psychology you realize.. they arent just normal mangoes, they are DARK!",
	"RHYMES WITH GRUG",
	"67",
	"get scammedddddd!!!",
	"If you paid money for this u got scammed, edulearn and all of its services are FREE!!",
	"UGS FILES VERY SOON!!",
	"ive run out of quote ideas",
	"loading the loading",
	"trust the process",
	"We can put anything here!",
	"MOTD: LOGI",
	"https://the-demonz.github.io (MOST VIBECODED SHIT EVER)",
	"UwU :333",
	"Nonchalanttttt :D",
	"pickle pickle pickle",
	"alvin the walnut",
	"Hello wsg mr mail",
	"Fastify it, act smooth, make a discord bot, and caddy!",
	"dont do frugs",
	"That's racially motivated..",
	"This is what you call.. Diddable material.",
	"ADS ARE NOT MY FAULT (F*CK YOU BREADBB)",
	"Shock my shells",
	"if you see this there was probably supposed to be a quote here. The developers ran out of ideas, which is why you see this",
	"How many have you counted so far?",
	"woahh, thats a lot of quotes!",
	"Imagine using this when you literally told everyone it SUCKS HAHAHAHA",
	"Dylanmc math vibes",
	"luminal LIGHTSPEED BYPASSES!!!",
	"SOAP PHIAAAA MY GOATTTT",
	"Redragon gaming mouse, kawaii pack :3",
	"thefakesydney is BACKKKKKKKKKKKKK!!! 676767",
	"When faces when hndrew au, take him out - sun tzu",
	"skid central PLZZZ partner",
	"I see chungus. I slime him out - wise guy",
	"Wsg therealfour",
	"https://femboy.world :3",
	"SLIME HIM OUT GUYSSS",
	"20% ai slop",
	"VIBE CODEEERR SUPREMEEEE",
	"Why do you vibecode? - A gong bell that I could ring",
	"ring me daddy",
	"This video is sponsored by Genshin Impact-",
	"Oh fuhh naww",
	"skibidi.men for more!",
	"Every 5 year old has a story behind them!",
	"unblocked and unlocked", 
	"running on pure caffeine", 
	"if you're reading this, do your homework",
	"Add a g**ning feature - nasa dude",
	"no admins allowed", 
	":333333333",
	"You are NEVER finding out what PROXIES are.. hahaha - Matthew guy whos black",
	"Why tf do u have so many apps on a cb - Conall Sadako",
	"It's.. soo.. cold - guy",
	"trust me bro.. it's not a virus.💀",
	"oh nah bro 💀💀💀💀💀💀 ",
	"Skull emoji virus 💀",
	"Oops i js closed a tab💀💀",
	"Montagem NO ONE CARES",
	"Control + Shift + T to reopen a tab",
	"Github copilot being suchhh a goooood boy..",
	"rrrreal cute and helpful for writing code :3",
	"mommy mommy please step on me - a random quote",
	"security through obscurity", 
	"ctrl + w to win instantly", 
	"made with <3 and spaghetti code", 
	"Set this up in alt tab to quickly escape",
	"If you don't use this, go-",
	"need more blahaj", 
	"originally just a webview kajig", 
	"frogiesarcade vibes", 
	"This is where the fun begins! - Obi Wan Kenobi",
	"vibecoded but it WORKS!", 
	"Monkey find computer. Monkey type.", 
	"goguardian is trash", 
	"lightsped sytems", 
	"This is a quote generator",
	"Algebra Algebra Algebra Masters, more like Algebra Disaster - a random quote",
	"No matter how much it feels like it, I'm not gay I swear! - A random", 
	"Wait.. I can have MULTIPLE TABS?!? HOLY SHI*", 
	"If you use this and I know you're a skid, screw you lmfao",
	"gaming freedom!", 
	"yall ready to play TS ALL DAY!?", 
	"Fun fact: This doesn't break your fast for Ramadan! :O",
	"The ogs know of classroom.lol", 
	"tyrone's stupid games", 
	"I have securly for breakfast, gogaurdian for lunch, and lightsped for dinner", 
	"educational.sbs", 
	"I'm jobless fr", 
	"Jobless for using AI? Really?",
	"THIS SITE IS NOT FOR DEGENERATES. GO AWAY!!", 
	"I should ring Alvin's gong - wise guy", 
	"If you want to humiliate your enemies, do it in a way that doesn't waste your own time. Use AI - Sun Zu",
	"albie was here", 
	"UNBLOCKED GAMES IN DA BIG 26!", 
	"If you made it this far, join the discord!", 
	"skids being skids", 
	"Dont slime me out..daddy",
	"toggle off particles for better performance", 
	"I'll steal your code hahaha - J20", 
	"Hella sick while typing this", 
	"diddler5000",
	"sphazelnut meow for me :33",
	"catface obsession",
	"Royalpear was here",
	"strange obsession with six seven and six nine",
	"wow these are so old messages",
	"There are some funny easter eggs!",
	"Look for some!",
	"I use arch btw",
	"Tf you mean it sucks?",
	"We beat bebby.w3spaces.com!!!",
	"last message so far.. consider yourself lucky.",
	"I bet you're here for the geo grind.",
	"Hollow knight in the big 2026?",
	"most recent update: Stuff to make Andrew Hu jealous 3/29/2026",
	"the wifi knows what you did last night",
	"this tab knows too much",
	"if this loads your wifi is valid",
	"404 motivation not found",
	"someone somewhere is procrastinating harder than you",
	"your teacher probably uses this site too",
	"this page is watching you scroll",
	"if you see this you owe me 5 dollars",
	"every refresh creates a new timeline",
	"your future self is judging this tab",
	"ctrl+s your life bro",
	"why tf this many quotes?",
	"this site runs on hopes and bad javascript",
	"another day another tab",
	"if it works don't touch it",
	"half the internet is duct tape and dreams",
	"99% of coding is googling",
	"the other 1% is suffering",
	"your ram is crying right now",
	"every bug has a developer somewhere crying",
	"the server hamster is tired",
	"please stop opening 400 tabs",
	"this site runs on a potato",
	"if this breaks pretend it didn't",
	"congratulations you found another quote",
	"somewhere someone is counting these",
	"how long have you been scrolling",
	"bro go drink water",
	"touch grass challenge: impossible",
	"achievement unlocked: reading random quotes",
	"this message will self destruct eventually",
	"the internet never forgets",
	"except when the cache clears",
	"history will remember this tab",
	"or maybe not",
	"loading existential crisis...",
	"life is just a series of loading screens",
	"even a watch can run ts twin peaks edition",
	"dev is probably asleep right now",
	"dev hopes you are doing your homework instead of reading these",
	"Just need to check this.. One more time...",
	"67 airlines is hiring, apply now!",
	"respawning in 3... 2... 1...",
	"main character energy",
	"side quest detected",
	"you have discovered a useless quote",
	"the dev definitely forgot this existed",
	"this line of text traveled thousands of miles to reach you",
	"meanwhile you are still procrastinating",
	"if you read this you are legally cool",
	"your cpu approves",
	"your gpu disagrees",
	"your battery fears you",
	"low battery anxiety moment",
	"the scroll never ends",
	"there are always more quotes",
	"infinite quotes glitch",
	"someone add a quote counter",
	"someone else will fix the bugs",
	"future me problem",
	"ship it and pray",
	"works on my machine",
	"the code compiles so it's fine",
	"do not question the code",
	"the code questions you",
	"if it breaks blame the intern",
	"there is no intern",
	"the intern is you",
	"congrats you're hired",
	"your salary is 0 dollars",
	"paid in experience",
	"experience not included",
	"this message was typed at 3am",
	"sleep is optional",
	"debugging is just detective work",
	"except the detective is stupid",
	"every line of code is a gamble",
	"we gambling with the production server",
	"please dont ddos the quote generator",
	"or do idk",
	"this is definitely production code",
	"totally not spaghetti",
	"100% professional engineering",
	"trust me bro it works",
	"never test in production",
	"unless you do",
	"this quote generator has lore",
	"someone write the lore",
	"the lore is lost",
	"the lore never existed",
	"the lore is just vibes",
	"vibes based development",
	"powered by vibes",
	"vibes > documentation",
	"documentation coming soon",
	"soon since 2022",
	"still soon",
	"maybe tomorrow",
	"definitely tomorrow",
	"ok maybe next update",
	"update coming soon™",
	"soon™",
	"tm symbol intensifies",
	"the scroll continues",
	"you are still reading",
	"why are you still reading",
	"go do homework bro",
	"seriously",
	"close the tab",
	"no actually close it",
	"ok one more quote",
	"just one more",
	"this is the last one",
	"just kidding",
	"there are more",
	"infinite scrolling technology",
	"this quote escaped containment",
	"if found return to developer",
	"developer missing since last commit",
	"last commit: 3am",
	"commit message: fixed stuff",
	"nothing was fixed",
	"the bug is now a feature",
	"feature not documented",
	"users discovered it anyway",
	"accidental innovation",
	"this is peak engineering",
	"this quote does nothing",
	"but it looks cool",
	"style over substance",
	"but mostly chaos",
	"chaos driven development",
	"we vibecoding today",
	"we vibecoding tomorrow",
	"we vibecoding forever",
	"vibecode never dies",
	"the vibe is strong",
	"the vibe is unstable",
	"vibes detected",
	"maximum vibes reached",
	"vibe overload",
	"too many vibes",
	"calm the vibes",
	"ok vibes restored",
	"system stable",
	"system unstable",
	"system vibing",
	"system confused",
	"system thinking",
	"system procrastinating",
	"system scrolling",
	"system reading quotes",
	"system still reading quotes",
	"bro seriously go do homework",
	"this message is a distraction",
	"and it worked",
	"congrats",
	"achievement unlocked: procrastination",
	"new speedrun category: quote reading",
	"wr pace",
	"someone submit this to speedrun.com",
	"quote percent any%",
	"quote percent 100%",
	"imagine reading all of these",
	"someone probably will",
	"that someone might be you",
	"this quote believes in you",
	"maybe",
	"probably not",
	"ok maybe a little",
	"never give up",
	"unless the wifi dies",
	"then it's over",
	"wifi down bad",
	"router crying",
	"packet lost",
	"lag detected",
	"ping 999",
	"skill issue",
	"massive skill issue",
	"internet skill issue",
	"coding skill issue",
	"quote writing skill issue",
	"ok that one was rude",
	"sorry about that",
	"anyways",
	"Last updated: 4/07/2026",
	"back to quotes",
	"the quotes never end",
	"this might be the last one",
	"or maybe not",
	"ok now it's the last one",
	"final quote maybe",
	"sad milk uses this!",
	"this time fr",
	"no more quotes after this",
	"unless someone adds more",
	"they probably will",
	"and the cycle continues",
	"Wa Wa Wa Wa",
	"The sky is not the limit, it's just the view.",
	"Advanced calculus for high school and above.",
	"Browse the web freely.",
	"Education is the most powerful weapon.",
	"Explore the cosmos of information.",
	"Your gateway to the unblocked web.",
	"Privacy is a human right.",
	"Stay curious, stay free.",
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
	if (isSus(input)) {
		showVerificationOverlay(() => {
			const tab = getActiveTab();
			if (tab) navigate(tab, input, true);
		});
		return;
	}
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

	// Update local document
	updateDocumentIdentity(document, title, icon);

	// Update top-level document if in an iframe (about:blank mode)
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
		// Use DuckDuckGo autocomplete API
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
				e.preventDefault(); // Prevent input blur before click
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

function isSus(input) {
	const lower = (input || "").toLowerCase();
	return SUS_WORDS.some((word) => lower.includes(word));
}

function showVerificationOverlay(onVerified) {
	const overlay = document.createElement("div");
	overlay.className = "verification-overlay";
	overlay.innerHTML = `
		<div class="verification-card">
			<h1>Access Restricted</h1>
			<p>Your search contains sensitive content. To proceed, please manually verify your intentions.</p>
			<div class="verification-phrase-box">${VERIFICATION_PHRASE}</div>
			<input type="text" id="verification-input" placeholder="Type the phrase above..." autocomplete="off" spellcheck="false" />
			<button id="verification-submit">I Understand, Proceed</button>
		</div>
	`;
	document.body.appendChild(overlay);

	const input = overlay.querySelector("#verification-input");
	const button = overlay.querySelector("#verification-submit");

	// Prevent copying and other bypasses
	const preventActions = (e) => {
		e.preventDefault();
		return false;
	};
	overlay.oncontextmenu = preventActions;
	overlay.oncopy = preventActions;
	overlay.onpaste = preventActions;
	overlay.oncut = preventActions;
	overlay.onselectstart = preventActions;

	const check = () => {
		if (input.value === VERIFICATION_PHRASE) {
			overlay.remove();
			onVerified();
		} else {
			input.style.borderColor = "#ff4f4f";
			input.value = "";
			input.placeholder = "Incorrect. Try again.";
		}
	};

	input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") check();
		// Disable ctrl+c, ctrl+v, etc.
		if (e.ctrlKey && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
			e.preventDefault();
		}
	});

	button.onclick = check;
	input.focus();
}

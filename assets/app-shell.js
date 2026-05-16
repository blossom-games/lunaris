"use strict";

document.body.innerHTML = `
	<header class="tab-strip" aria-label="Tabs">
		<div id="tabs" class="tabs"></div>
		<button id="new-tab" class="tab-action" type="button" title="New tab" aria-label="New tab">
			<i data-lucide="plus"></i>
		</button>
	</header>

	<header class="toolbar" aria-label="Browser controls">
		<div class="nav-controls">
			<button id="back-button" class="icon-button" type="button" title="Back" aria-label="Back">
				<i data-lucide="arrow-left"></i>
			</button>
			<button id="forward-button" class="icon-button" type="button" title="Forward" aria-label="Forward">
				<i data-lucide="arrow-right"></i>
			</button>
			<button id="reload-button" class="icon-button" type="button" title="Reload" aria-label="Reload">
				<i data-lucide="refresh-cw"></i>
			</button>
		</div>

		<form id="address-form" class="address-form">
			<div class="address-wrapper">
				<i data-lucide="search" class="address-search" aria-hidden="true"></i>
				<input
					id="top-address"
					type="text"
					placeholder="Search the web freely"
					autocomplete="off"
					spellcheck="false"
					aria-label="Address or search"
				/>
				<div id="top-suggestions"></div>
			</div>
			<button id="bookmark-button" class="address-action" type="button" title="Bookmark this page" aria-label="Bookmark this page">
				<i data-lucide="star"></i>
			</button>
			<input id="sj-search-engine" value="https://duckduckgo.com/?q=%s" type="hidden" />
		</form>

		<nav class="shortcut-icons" aria-label="Lunaris pages">
			<button class="icon-button shortcut" type="button" data-prefix="lunaris://games" title="Games" aria-label="Games">
				<i data-lucide="gamepad-2"></i>
			</button>
			<button class="icon-button shortcut" type="button" data-prefix="lunaris://ai" title="Edulearn AI" aria-label="Edulearn AI">
				<i data-lucide="bot"></i>
			</button>
			<button class="icon-button shortcut" type="button" data-prefix="lunaris://apps" title="Apps" aria-label="Apps">
				<i data-lucide="layout-grid"></i>
			</button>
			<button id="fullscreen-button" class="icon-button" type="button" title="Fullscreen frame" aria-label="Fullscreen frame">
				<i data-lucide="maximize"></i>
			</button>
			<button id="menu-button" class="icon-button" type="button" title="Menu" aria-label="Menu" aria-expanded="false">
				<i data-lucide="ellipsis-vertical"></i>
			</button>
		</nav>
	</header>

	<div id="bookmarks-bar" class="bookmarks-bar" hidden></div>

	<div id="loading-bar" class="loading-bar"></div>

	<div id="browser-menu" class="browser-menu" hidden>
		<button type="button" data-menu-action="settings">
			<i data-lucide="settings"></i>
			<span>Settings</span>
		</button>
		<button type="button" data-menu-action="history">
			<i data-lucide="history"></i>
			<span>History</span>
		</button>
		<button type="button" data-menu-action="eruda">
			<i data-lucide="bug"></i>
			<span>Eruda DevTools</span>
		</button>
		<button type="button" data-menu-action="tools">
			<i data-lucide="wrench"></i>
			<span>Tools</span>
		</button>
		<button type="button" data-menu-action="partners">
			<i data-lucide="users"></i>
			<span>Partners</span>
		</button>
		<div class="menu-section">
			<div class="menu-heading">Bookmarks</div>
			<div id="bookmark-list" class="menu-list"></div>
		</div>
		<div class="menu-section">
			<div class="menu-heading-row">
				<div class="menu-heading">Search History</div>
				<button id="clear-history" class="menu-clear" type="button">Clear</button>
			</div>
			<div id="history-list" class="menu-list"></div>
		</div>
	</div>

	<main id="viewport" class="viewport">
		<section id="home-view" class="home-view" aria-label="Lunaris homepage">
			<div class="home-center">
				<h1>Lunaris</h1>
				<p class="subtitle">Loading Incredible Wizdom...</p>
				<form id="home-form" class="home-search">
					<div class="home-search-wrapper" style="width: 100%; position: relative;">
						<input id="sj-address" type="text" placeholder="Search through the Course catalog for Calculus.." autocomplete="off" spellcheck="false" />
						<div id="home-suggestions" style="position: absolute; top: 100%; left: 0; right: 0; background: var(--bar-strong); border: 1px solid var(--line); border-radius: 0 0 14px 14px; display: none; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(16px);"></div>
					</div>
				</form>
				<div class="home-tabs" aria-label="Quick pages">
					<button type="button" data-prefix="https://play.geforcenow.com/">
						<img src="https://www.google.com/s2/favicons?domain=play.geforcenow.com&sz=64" alt="" />
						<span>GeForce Now</span>
					</button>
					<button type="button" data-prefix="https://www.tiktok.com/">
						<img src="https://www.google.com/s2/favicons?domain=tiktok.com&sz=64" alt="" />
						<span>TikTok</span>
					</button>
					<button type="button" data-prefix="https://cineby.gd/">
						<img src="https://www.google.com/s2/favicons?domain=cineby.gd&sz=64" alt="" />
						<span>Cineby</span>
					</button>
				</div>
				<div id="quick-play-container" style="margin-top: 32px; width: 100%; display: flex; justify-content: center;"></div>
			</div>
		</section>

		<div id="frame-stage" class="frame-stage" aria-live="polite"></div>
		<div id="proxy-loader" class="proxy-loader" hidden>
			<div class="loader-orbit" aria-hidden="true">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="loader-copy">
				<strong>Loading Course</strong>
				<span id="loader-target">Preparing..</span>
			</div>
		</div>

		<div class="desc">
			<p id="sj-error"></p>
			<pre id="sj-error-code"></pre>
		</div>
		<nav class="legal-links" aria-label="Legal links">
			<button type="button" data-prefix="lunaris://partners">Partners</button>
			<button type="button" data-prefix="lunaris://privacy">Privacy</button>
			<button type="button" data-prefix="lunaris://terms">Terms</button>
		</nav>
	</main>
`;

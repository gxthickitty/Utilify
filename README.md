# Utilify (Rewrite)

A modern, modular, and enhanced userscript designed for the KoGaMa platform.

***

## 🛑 Safety & Compliance Notice

Utilify is a third-party extension. Users are solely responsible for its use and should adhere strictly to the platform's rules.

### Official KoGaMa Developer Guidelines

The following message was provided by the KoGaMa lead web developer regarding extensions:

> "Hello. Tokeeto here. I'm the lead web developer at KoGaMa. I'm not entirely sure what a 'Vencord like extension' would entail, but you're very welcome to create any extension, as long as:
> 1. **It doesn't violate the privacy of other users.**
> 2. **You are responsible with your use of our APIs** (Do not spam-poll them, cache where sensible, etc.).
> 3. **It doesn't interfere with the game client at all.**
> Best of luck!"

### Feature Risk Assessment

The table below outlines features within the script that may violate the above guidelines, potentially leading to account consequences. **Use features marked as HIGH Risk with extreme caution.**

| Feature | Violation Type & Rationale | Risk Level |
| :--- | :--- | :--- |
| **Friend Activity Stalking** | **Unresponsible API Use (Spam-Polling)**. The script polls the `/friend/chat/` API endpoint every **5 seconds (5000ms)**. This aggressive, frequent polling is a violation of the "Do not spam-poll them" rule. | **HIGH** |
| **Appear Offline** | **Interference with the Game Client**. The feature actively intercepts and blocks network requests (pulse/status updates) intended by the official client, directly preventing it from communicating its intended status to the server. | **HIGH** |
| **Player Analytics** | **Unresponsible API Use (Efficiency)**. The module polls the entire game page HTML every 15 seconds to extract only two numbers. This inefficient resource usage (downloading and parsing large documents repeatedly) may violate the "cache where sensible" guideline. | **MEDIUM** |

***

## 🗒️ Update Log - December 2, 2025 (v2.0.7)

* **A) Configuration Menu Overhaul:** Create & Moved multiple options under ``Use At Own Risk`` Category.
* **B) Feature Added:** Implemented [LazyStreakKeeper](https://github.com/midweststatic/LazyStreakKeeper).
* **C) WebGL Fix:** SVG Button to add settings no longer displays and attaches to WebGL windows.
* **D) Proper Credits:** Decided to finally creater proper Credits, kinda.

> <img width="1735" height="1052" alt="{40022F24-8752-4BAD-A685-2B133E122A20}" src="https://github.com/user-attachments/assets/d242e11b-5fef-404c-a56a-aaf592823dba" />

***

## 📦 About Utilify (Rewrite)

This version is a **full rewrite** of the original Utilify userscript, focusing on improved performance, maintainability, and extensibility.

**Note:** This is an early alpha version. Expect missing features and placeholder modules as the rewrite progresses.

***

# **Categorized Feature Overview**

Below is a refined and structured overview of all features, grouped into coherent categories while retaining the `feat : def` form. The formatting is intentionally clean, readable, and not overly ornate.

---

## **Core Utility & Automation**

**Paste Always Enabled :** Forces all site text fields to allow pasting, overriding native restrictions.  
**Dot Obfuscation (Toggle) :** Replaces every `.` in newly typed or pasted URLs with `%2E` to bypass filters; includes a toggle button to enable/disable.  
**Copy Bio Button :** Adds a dedicated copy button to profile pages, including a subtle confirmation indicator.  
**Friend & Request Scraper UI :** Provides a draggable UI panel for fetching, listing, and searching through full friend and request lists.  
**Leaderboard URL Fix :** Intercepts outgoing leaderboard requests and removes redundant query parameters.  
**Marketplace Auto‑Buy Loop :** Automates mass-purchase cycles with loop counts, pause/resume state, ETA calculation, and a transaction log.

---

## **Profile & Avatar Enhancements**

**Enhanced Profile Timestamps :** Replaces default timestamps with detailed creation/last‑seen data and allows toggling between compact or verbose time formats.  
**Last Played Game Link :** Displays a direct link to the last game played by the user (owner‑view only).  
**Internet Archive Link :** Adds an on‑page shortcut to the Wayback Machine snapshot of the current profile.  
**Custom Profile Banner (Description‑Driven) :** Detects a custom markup tag in the profile description and displays a styled banner beneath the username.  
**Custom Profile Gradient (Description‑Driven) :** Applies a `linear-gradient()` extracted from the bio as the mobile root background.  
**Avatar Editor Tools :** Adds a marketplace search button and a thumbnail URL copier to each avatar tile in the editor.

---

## **Visual & UI Customization**

**Dynamic Background Effects :** Allows custom background images on game pages with optional Blur, Dark overlay, and client‑rendered Rain or Snow effects.  
**Custom Global Gradient :** Injects a global linear gradient across the interface with configurable angle and color stops.  
**Glassmorphism Panels :** Gives UI panels a soft blurred‑glass appearance with controllable radius, hue, and transparency.  
**Custom Fonts :** Enables selecting predefined fonts or loading an external font URL.  
**Custom CSS & Online Styles :** Provides fields to inject user CSS or import remote stylesheets.  
**UI Clean‑up :** Removes selected clutter elements such as redundant footers and navigation components.  
**Custom Logo/Branding :** Replaces the original logo with a custom image and routes it to the author's GitHub repository.

---

## **Privacy Features**

**Blur Sensitive Information :** Applies a blur filter to UI blocks containing personal or account‑related data.  
**Blur Comments :** Specifically blurs all comment threads on pages where comments appear.  
**Disable Friendslist :** Hides the entire friendslist component from rendering.  
**Invisible Avatars (Experimental) :** Attempts to hide all avatars by intercepting their load/render process.

---

## **Use At Your Own Risk (UAOR)**

**Appear Offline :** Blocks activity‑update network calls so the account appears offline to others.  
**Lazy Streak Keeper :** Sends periodic automated messages to a fixed target profile to maintain an activity streak.  
**Friend Activity :** Watches friend list changes and annotates pages with additional game/project info without active polling.  
**Player Type Display :** Shows a compact player‑type breakdown (Global/Members/Tourists) on game pages.

---


## 🛠️ Installation Guide

Utilify is a userscript and requires a userscript manager to run in your browser.

### Step 1: Install a Userscript Manager
You must first install a browser extension that can manage and run userscripts.

* **For Chrome, Firefox, Edge, and Opera:** Install **Tampermonkey**.
    * [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    * [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

### Step 2: Install Utilify
Once your userscript manager is installed, click the installation link below. Tampermonkey will automatically recognize the file and prompt you to install it.

1.  Click the installation link:
    👉 [Install Utilify (Rewrite)](https://raw.githubusercontent.com/7v6a/Utilify/refs/heads/main/Script/Rewrite/Utilify.user.js)
2.  Review the script's code/metadata in the Tampermonkey editor window.
3.  Click the **Install** button to finalize the installation.

### Step 3: Verify and Use
The script will activate the next time you load or refresh any KoGaMa page (`*://www.kogama.com/*`). Look for the custom configuration panel to access and manage the features.


(async function() {
    "use strict";
    const AVAILABLE_FILTERS = ["rain", "snow", "fireflies", "roses", "sparkles", "september"];

    const SNOWFLAKE_SVGS = [
        "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="white" d="M50,10 L55,45 L50,50 L45,45 Z M50,90 L55,55 L50,50 L45,55 Z M10,50 L45,55 L50,50 L45,45 Z M90,50 L55,55 L50,50 L55,45 Z M25,25 L45,45 L50,40 L40,30 Z M75,75 L55,55 L50,60 L60,70 Z M75,25 L55,45 L60,50 L70,40 Z M25,75 L45,55 L40,50 L30,60 Z"/><circle cx="50" cy="50" r="8" fill="white"/></svg>`),
        "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="white"><rect x="47" y="5" width="6" height="90" rx="2"/><rect x="5" y="47" width="90" height="6" rx="2"/><rect x="47" y="5" width="6" height="90" rx="2" transform="rotate(45 50 50)"/><rect x="47" y="5" width="6" height="90" rx="2" transform="rotate(-45 50 50)"/><circle cx="50" cy="50" r="10"/></g></svg>`)
    ];

    const ROSE_SVG = "data:image/svg+xml," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="roseGrad" cx="50%" cy="40%">
                    <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
                    <stop offset="60%" style="stop-color:#c9184a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#a4133c;stop-opacity:1" />
                </radialGradient>
            </defs>
            <path fill="url(#roseGrad)" d="M50 20c-4 0-7 3-9 6-2-3-5-6-9-6-6 0-11 5-11 11 0 8 9 16 20 26 11-10 20-18 20-26 0-6-5-11-11-11z"/>
            <ellipse cx="50" cy="30" rx="8" ry="10" fill="#ff8fa3" opacity="0.6"/>
            <path d="M45 35c0 3 2 5 5 5s5-2 5-5" stroke="#c9184a" stroke-width="1.5" fill="none"/>
            <path fill="#2d6a4f" d="M50 46l-2 8c-1 4 0 8 3 10l-1-18zm0 0l2 8c1 4 0 8-3 10l1-18z"/>
        </svg>
    `);

    const SPARKLE_SVG = "data:image/svg+xml," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="sparkleGrad">
                    <stop offset="0%" style="stop-color:#ffc0cb;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#ffb3c6;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#c8bed8;stop-opacity:0" />
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#sparkleGrad)"/>
            <path fill="#fff" d="M50 10l3 37 37 3-37 3-3 37-3-37-37-3 37-3z"/>
        </svg>
    `);

    const waitForElement = async (sel, timeout = 10000) => {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(sel);
            if (el) return el;
            await new Promise(r => requestAnimationFrame(r));
        }
        throw new Error(`Element ${sel} not found`);
    };
    let tooltip = null;

    function injectTooltipStyles() {
        if (document.getElementById('bg-effects-tooltip-style')) return;
        
        const css = `
            @keyframes tooltip-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
            }
            
            .bg-effects-tooltip {
                animation: tooltip-float 2s ease-in-out infinite;
            }
            
            .bg-effects-badge {
                display: inline-block;
                padding: 3px 8px;
                margin: 2px;
                background: linear-gradient(135deg, rgba(255, 192, 203, 0.2), rgba(200, 190, 220, 0.15));
                border: 1px solid rgba(255, 192, 203, 0.3);
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                color: #ffc0cb;
                letter-spacing: 0.3px;
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'bg-effects-tooltip-style';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function showTooltip(target) {
        if (tooltip) return;
        
        injectTooltipStyles();
        
        tooltip = document.createElement("div");
        tooltip.className = 'bg-effects-tooltip';
        Object.assign(tooltip.style, {
            position: "fixed",
            zIndex: "100000",
            background: "linear-gradient(135deg, rgba(26, 27, 30, 0.98), rgba(35, 36, 40, 0.98))",
            color: "#e8e8ee",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 192, 203, 0.3)",
            fontSize: "13px",
            boxShadow: "0 8px 32px rgba(255, 192, 203, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
            backdropFilter: "blur(12px)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            maxWidth: "320px"
        });
        
        const badges = AVAILABLE_FILTERS.map(f => 
            `<span class="bg-effects-badge">${f}</span>`
        ).join('');
        
        tooltip.innerHTML = `
            <div style="margin-bottom:8px; font-weight:600; color:#ffc0cb; letter-spacing:0.5px;">
                ✦ Available Effects
            </div>
            <div style="line-height:1.8;">
                ${badges}
            </div>
            <div style="margin-top:10px; font-size:11px; color:rgba(200, 190, 220, 0.6); font-style:italic;">
                Use: filter: effect1, effect2
            </div>
        `;
        
        document.body.appendChild(tooltip);
        updateTooltipPos(target);
    }

    function updateTooltipPos(target) {
        if (!tooltip) return;
        const r = target.getBoundingClientRect();
        const tooltipHeight = tooltip.offsetHeight;
        tooltip.style.left = Math.max(10, r.left) + "px";
        tooltip.style.top = Math.max(10, r.top - tooltipHeight - 10) + "px";
    }

    function removeTooltip() {
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                tooltip?.remove();
                tooltip = null;
            }, 200);
        }
    }
    class ParticleSystem {
        constructor(targetEl) {
            this.target = targetEl;
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d", { alpha: true });
            this.dpr = window.devicePixelRatio || 1;
            this.particles = [];
            this.container = document.createElement("div");
            
            Object.assign(this.container.style, {
                position: "absolute",
                pointerEvents: "none",
                zIndex: "9",
                overflow: "hidden"
            });
            
            this.canvas.style.width = "100%";
            this.canvas.style.height = "100%";
            this.container.appendChild(this.canvas);
            document.body.appendChild(this.container);
            
            this.observer = new ResizeObserver(() => this.resize());
            this.observer.observe(this.target);
            this.loop = this.loop.bind(this);
        }

        resize() {
            const r = this.target.getBoundingClientRect();
            this.container.style.top = r.top + scrollY + "px";
            this.container.style.left = r.left + scrollX + "px";
            this.container.style.width = r.width + "px";
            this.container.style.height = r.height + "px";
            this.w = r.width;
            this.h = r.height;
            this.canvas.width = this.w * this.dpr;
            this.canvas.height = this.h * this.dpr;
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        }

        start() {
            this.resize();
            this.initParticles();
            requestAnimationFrame(this.loop);
            
            const scrollHandler = () => this.resize();
            addEventListener("scroll", scrollHandler);
            this.cleanup = () => removeEventListener("scroll", scrollHandler);
        }

        loop() {
            if (!document.contains(this.container)) {
                this.cleanup?.();
                return;
            }
            this.ctx.clearRect(0, 0, this.w, this.h);
            this.updateAndDraw();
            requestAnimationFrame(this.loop);
        }

        destroy() {
            this.observer?.disconnect();
            this.container?.remove();
            this.cleanup?.();
        }
    }

    class RainSystem extends ParticleSystem {
        initParticles() {
            for (let i = 0; i < 60; i++) {
                this.particles.push(this.reset({}));
            }
        }
        
        reset(p) {
            p.x = Math.random() * this.w;
            p.y = Math.random() * -this.h;
            p.z = Math.random() * 0.6 + 0.4;
            p.len = Math.random() * 20 + 15;
            p.vy = (Math.random() * 8 + 12) * p.z;
            return p;
        }
        
        updateAndDraw() {
            this.ctx.lineWidth = 1.5;
            this.ctx.lineCap = "round";
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
            gradient.addColorStop(0, "rgba(200, 220, 255, 0.4)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
            this.ctx.strokeStyle = gradient;
            
            this.ctx.beginPath();
            for (const p of this.particles) {
                p.y += p.vy;
                if (p.y > this.h + p.len) this.reset(p);
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x, p.y + p.len * p.z);
            }
            this.ctx.stroke();
        }
    }
    class SnowSystem extends ParticleSystem {
        constructor(target) {
            super(target);
            this.imgs = SNOWFLAKE_SVGS.map(s => {
                const img = new Image();
                img.src = s;
                return img;
            });
            this.start();
        }
        
        initParticles() {
            for (let i = 0; i < 80; i++) {
                this.particles.push(this.reset({}));
            }
        }
        
        reset(p) {
            p.x = Math.random() * this.w;
            p.y = Math.random() * -this.h;
            p.z = Math.random() * 0.6 + 0.4;
            p.size = (Math.random() * 15 + 12) * p.z;
            p.vy = (Math.random() * 0.8 + 0.5) * p.z;
            p.sway = Math.random() * 0.08;
            p.swayOff = Math.random() * Math.PI * 2;
            p.rot = Math.random() * 360;
            p.rotSpeed = (Math.random() - 0.5) * 0.6;
            p.img = this.imgs[Math.floor(Math.random() * this.imgs.length)];
            p.alpha = 0.6 + Math.random() * 0.3;
            return p;
        }
        
        updateAndDraw() {
            for (const p of this.particles) {
                p.y += p.vy;
                p.swayOff += p.sway;
                p.x += Math.sin(p.swayOff) * 0.6;
                p.rot += p.rotSpeed;
                
                if (p.y > this.h + 30) this.reset(p);
                
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rot * Math.PI / 180);
                this.ctx.globalAlpha = p.alpha;
                
                if (p.img.complete) {
                    this.ctx.drawImage(p.img, -p.size/2, -p.size/2, p.size, p.size);
                }
                
                this.ctx.restore();
            }
        }
    }

    class FireflySystem extends ParticleSystem {
        constructor(target) {
            super(target);
            this.start();
        }
        
        initParticles() {
            for (let i = 0; i < 50; i++) {
                this.particles.push(this.reset({}));
            }
        }
        
        reset(p) {
            p.x = Math.random() * this.w;
            p.y = Math.random() * this.h;
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
            p.phase = Math.random() * Math.PI * 2;
            p.phaseSpeed = 0.04 + Math.random() * 0.04;
            p.size = Math.random() * 2 + 1.5;
            return p;
        }
        
        updateAndDraw() {
            for (const p of this.particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.phase += p.phaseSpeed;
                
                if (p.x < -10) p.x = this.w + 10;
                if (p.x > this.w + 10) p.x = -10;
                if (p.y < -10) p.y = this.h + 10;
                if (p.y > this.h + 10) p.y = -10;
                
                const glow = (Math.sin(p.phase) + 1) / 2;
                const alpha = 0.4 + glow * 0.6;
                
                this.ctx.shadowBlur = 20 * glow;
                this.ctx.shadowColor = "rgba(255, 250, 200, 1)";
                this.ctx.fillStyle = `rgba(255, 250, 200, ${alpha})`;
                
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size + glow * 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.shadowBlur = 0;
            }
        }
    }

    class RoseSystem extends ParticleSystem {
        constructor(target) {
            super(target);
            this.img = new Image();
            this.img.src = ROSE_SVG;
            this.start();
        }
        
        initParticles() {
            for (let i = 0; i < 35; i++) {
                this.particles.push(this.reset({}));
            }
        }
        
        reset(p) {
            p.x = Math.random() * this.w;
            p.y = Math.random() * -this.h - 50;
            p.vy = Math.random() * 0.7 + 0.5;
            p.vx = (Math.random() - 0.5) * 0.3;
            p.rot = Math.random() * 360;
            p.rotSpeed = (Math.random() - 0.5) * 0.8;
            p.size = Math.random() * 18 + 15;
            p.sway = Math.random() * 0.05;
            p.swayOff = Math.random() * Math.PI * 2;
            return p;
        }
        
        updateAndDraw() {
            for (const p of this.particles) {
                p.y += p.vy;
                p.swayOff += p.sway;
                p.x += p.vx + Math.sin(p.swayOff) * 0.4;
                p.rot += p.rotSpeed;
                
                if (p.y > this.h + 50) this.reset(p);
                
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rot * Math.PI / 180);
                this.ctx.globalAlpha = 0.9;
                
                if (this.img.complete) {
                    this.ctx.drawImage(this.img, -p.size/2, -p.size/2, p.size, p.size);
                }
                
                this.ctx.restore();
            }
        }
    }
    class SparkleSystem extends ParticleSystem {
        constructor(target) {
            super(target);
            this.img = new Image();
            this.img.src = SPARKLE_SVG;
            this.start();
        }
        
        initParticles() {
            for (let i = 0; i < 40; i++) {
                this.particles.push(this.reset({}));
            }
        }
        
        reset(p) {
            p.x = Math.random() * this.w;
            p.y = Math.random() * this.h;
            p.phase = Math.random() * Math.PI * 2;
            p.phaseSpeed = 0.03 + Math.random() * 0.03;
            p.size = Math.random() * 25 + 20;
            p.floatSpeed = (Math.random() - 0.5) * 0.3;
            p.lifetime = Math.random() * 200 + 150;
            p.age = 0;
            return p;
        }
        
        updateAndDraw() {
            for (const p of this.particles) {
                p.age++;
                p.phase += p.phaseSpeed;
                p.y += p.floatSpeed;
                
                if (p.age > p.lifetime) this.reset(p);
                
                const twinkle = (Math.sin(p.phase) + 1) / 2;
                const lifeFade = Math.min(p.age / 50, 1) * Math.min((p.lifetime - p.age) / 50, 1);
                const alpha = twinkle * 0.7 * lifeFade;
                
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.globalAlpha = alpha;
                
                if (this.img.complete) {
                    this.ctx.drawImage(this.img, -p.size/2, -p.size/2, p.size, p.size);
                }
                
                this.ctx.restore();
            }
        }
    }
    class SeptemberSystem {
        constructor(target) {
            this.rain = new RainSystem(target);
            this.sparkles = new SparkleSystem(target);
            this.rain.start();
        }
        
        destroy() {
            this.rain?.destroy();
            this.sparkles?.destroy();
        }
    }

    async function fetchGameImage(id) {
        try {
            const response = await fetch(`https://www.kogama.com/games/play/${id}/`);
            const html = await response.text();
            const match = html.match(/options\.bootstrap\s*=\s*({.*?});/s);
            if (!match) return "";
            
            const data = JSON.parse(match[1]);
            return data.object?.images?.large || 
                   Object.values(data.object?.images || {})[0] || "";
        } catch (err) {
            console.error('Failed to fetch game image:', err);
            return "";
        }
    }

    async function fetchImgurImage(id) {
        for (const ext of ["png", "jpg", "gif", "jpeg"]) {
            const url = `https://i.imgur.com/${id}.${ext}`;
            try {
                const response = await fetch(url, { method: "HEAD" });
                if (response.ok) return url;
            } catch {}
        }
        return "";
    }

    const activeSystems = [];

    async function applyEffects() {
        try {
            activeSystems.forEach(sys => sys.destroy?.());
            activeSystems.length = 0;
            
            const descElement = await waitForElement("div._1aUa_");
            const text = descElement.textContent || "";
            const match = /(?:\|\|)?Background:\s*(?:i-([a-zA-Z0-9]+)|(\d+))(?:,\s*filter:\s*([a-z, ]+))?/i.exec(text);
            
            if (!match) return;
            
            const imgurId = match[1];
            const gameId = match[2];
            const imageUrl = imgurId 
                ? await fetchImgurImage(imgurId) 
                : await fetchGameImage(gameId);
            
            if (!imageUrl) {
                console.warn('No image URL found');
                return;
            }
            
            const bgElement = document.querySelector("._33DXe");
            if (!bgElement) return;
            
            Object.assign(bgElement.style, {
                transition: "opacity 0.3s ease-in",
                opacity: "1",
                backgroundImage: `url("${imageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                filter: "blur(4px)",
                zIndex: "1"
            });
            
            // Apply filters if specified
            if (match[3]) {
                const filters = match[3].split(",").map(f => f.trim().toLowerCase());
                
                filters.forEach(filter => {
                    let system;
                    switch(filter) {
                        case "rain":
                            system = new RainSystem(bgElement);
                            system.start();
                            activeSystems.push(system);
                            break;
                        case "snow":
                            system = new SnowSystem(bgElement);
                            activeSystems.push(system);
                            break;
                        case "fireflies":
                            system = new FireflySystem(bgElement);
                            activeSystems.push(system);
                            break;
                        case "roses":
                            system = new RoseSystem(bgElement);
                            activeSystems.push(system);
                            break;
                        case "sparkles":
                            system = new SparkleSystem(bgElement);
                            activeSystems.push(system);
                            break;
                        case "september":
                            system = new SeptemberSystem(bgElement);
                            activeSystems.push(system);
                            break;
                    }
                });
            }
            
            console.log('Background effects applied successfully');
            
        } catch (err) {
            console.error('Failed to apply effects:', err);
        }
    }
    const inputObserver = new MutationObserver(() => {
        const textarea = document.querySelector("textarea#description");
        
        if (textarea && !textarea._bgEffectsMonitored) {
            textarea._bgEffectsMonitored = true;
            
            textarea.addEventListener("input", (e) => {
                const value = e.target.value.toLowerCase();
                if (value.includes("filter:")) {
                    showTooltip(e.target);
                } else {
                    removeTooltip();
                }
            });
            
            textarea.addEventListener("blur", removeTooltip);
            textarea.addEventListener("focus", (e) => {
                if (e.target.value.toLowerCase().includes("filter:")) {
                    showTooltip(e.target);
                }
            });
        }
    });

    inputObserver.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    if (document.readyState === "loading") {
        addEventListener("DOMContentLoaded", applyEffects);
    } else {
        applyEffects();
    }

})();

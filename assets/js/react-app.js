/**
 * Devesh Das — Interactive React 18 Developer Lab & Simulation Engine
 * Built with React 18 (Client-Side Reactive State, Zero Build Overhead)
 * 
 * Features:
 * 1. Pasha Palli Dice & Move Engine (Interactive Board Game State)
 * 2. Palworld Creature Matrix & Combat Power Calculator (ML Analytics Demo)
 * 3. Interactive Reactive Developer Terminal & CLI
 */

(function () {
  'use strict';

  // Wait until DOM and React are available
  function initReactApp() {
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.warn('React or ReactDOM not found. Retrying...');
      setTimeout(initReactApp, 100);
      return;
    }

    const container = document.getElementById('react-root');
    if (!container) return;

    const { createElement: h, useState, useEffect, useMemo, useRef, useCallback } = React;

    // Helper to safely trigger portfolio SFX and Toast
    const triggerAudio = (freq, type, dur) => {
      if (window.portfolioAudio && window.portfolioAudio.isEnabled()) {
        window.portfolioAudio.playTone(freq, type, dur);
      }
    };
    const triggerChime = () => {
      if (window.portfolioAudio && window.portfolioAudio.isEnabled()) {
        window.portfolioAudio.playChime();
      }
    };
    const triggerToast = (msg, icon) => {
      if (window.portfolioToast) {
        window.portfolioToast(msg, icon);
      }
    };

    // =========================================================================
    // TAB 1: PASHA PALLI LIVE WEBSITE SIMULATION
    // =========================================================================
    function PashaPalliSimulator() {
      const [iframeLoading, setIframeLoading] = useState(true);
      const [iframeKey, setIframeKey] = useState(0);
      const [isFullscreen, setIsFullscreen] = useState(false);
      const playerCardRef = useRef(null);

      const gameUrl = 'https://pashapallibyninjadev.netlify.app/';

      // Synchronize Fullscreen State
      useEffect(() => {
        const onFsChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
      }, []);

      const reloadGame = () => {
        setIframeLoading(true);
        setIframeKey((prev) => prev + 1);
        triggerAudio(620, 'sine', 0.08);
        triggerToast('Reloading Pasha Palli Game Engine...', '🔄');
      };

      const toggleFullscreen = () => {
        if (!isFullscreen) {
          if (playerCardRef.current && playerCardRef.current.requestFullscreen) {
            playerCardRef.current.requestFullscreen().catch(() => {
              setIsFullscreen(true);
            });
          } else {
            setIsFullscreen(true);
          }
          triggerAudio(720, 'sine', 0.08);
          triggerToast('Fullscreen Mode Activated (Press ESC to exit)', '⛶');
        } else {
          if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          }
          setIsFullscreen(false);
          triggerToast('Exited Fullscreen', '🗗');
        }
      };

      return h('div', { className: 'react-tab-pane' },
        h('div', {
          ref: playerCardRef,
          className: `pasha-game-card ${isFullscreen ? 'is-fullscreen' : ''}`
        },
          // 1. Browser Chrome Header Bar
          h('div', { className: 'pasha-browser-header' },
            h('div', { className: 'pasha-browser-dots' },
              h('span', { className: 'pasha-browser-dot dot-red' }),
              h('span', { className: 'pasha-browser-dot dot-yellow' }),
              h('span', { className: 'pasha-browser-dot dot-green' })
            ),
            h('div', { className: 'pasha-browser-url-bar' },
              h('span', { className: 'pasha-lock-icon' }, '🔒'),
              h('span', { className: 'pasha-url-text' }, gameUrl)
            ),
            h('div', { className: 'pasha-browser-actions' },
              h('button', {
                type: 'button',
                className: 'pasha-action-btn',
                onClick: reloadGame,
                title: 'Reload Live Game'
              }, '🔄 Reload'),
              h('button', {
                type: 'button',
                className: 'pasha-action-btn',
                onClick: toggleFullscreen,
                title: 'Toggle Fullscreen Mode'
              }, isFullscreen ? '🗗 Exit' : '⛶ Fullscreen'),
              h('a', {
                href: gameUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'pasha-action-btn',
                title: 'Open in new tab'
              }, '↗ Standalone')
            )
          ),

          // 2. Subnav Bar: Status & Mode Badges
          h('div', { className: 'pasha-subnav-bar' },
            h('div', { className: 'pasha-status-indicator' },
              h('span', { className: 'pasha-live-dot' }),
              h('span', null, 'Live PWA Engine Active • Netlify Edge CDN')
            ),
            h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
              h('span', { className: 'pasha-footer-pill' }, '👑 1H vs 3 AI'),
              h('span', { className: 'pasha-footer-pill' }, '⚔️ 1v1 Local Duel'),
              h('span', { className: 'pasha-footer-pill' }, '👥 4-Player Pass & Play'),
              h('span', { className: 'pasha-footer-pill' }, '🤖 AI Spectate')
            )
          ),

          // 3. Game Iframe Viewport
          h('div', { className: 'pasha-iframe-wrapper' },
            iframeLoading && h('div', { className: 'pasha-loading-overlay' },
              h('div', { className: 'pasha-spinner' }),
              h('div', { className: 'pasha-loading-title' }, 'Connecting to Pasha Palli Engine...'),
              h('div', { className: 'pasha-loading-desc' },
                'Loading ancient Indian cross-and-circle dice race from Netlify Edge CDN'
              )
            ),
            h('iframe', {
              key: iframeKey,
              src: gameUrl,
              title: 'Pasha Palli: Dice-Pit Cross Race — Live Game',
              className: 'pasha-live-iframe',
              allow: 'autoplay; fullscreen; accelerometer; gyroscope; clipboard-write; web-share',
              allowFullScreen: true,
              loading: 'lazy',
              onLoad: () => {
                setIframeLoading(false);
                triggerToast('Pasha Palli Live Engine Ready!', '🎮');
              }
            })
          ),

          // 4. Game Footer Bar
          h('div', { className: 'pasha-game-footer' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
              h('span', { style: { fontSize: '1.1rem' } }, '🎲'),
              h('span', null, 'Authentic Native & Indigenous Sports PWA')
            ),
            h('div', null, 'Built by Devesh Das • Centurion University')
          )
        )
      );
    }



    // =========================================================================
    // TAB 3: PALWORLD CREATURE STAT MATRIX & ML CALCULATOR
    // =========================================================================
    const PAL_DATABASE = [
      { id: 'jetragon', name: 'Jetragon', type: 'Dragon', rarity: 'Legendary', baseHp: 110, baseAtk: 140, baseDef: 110, speed: 1700, icon: '🐉' },
      { id: 'frostallion', name: 'Frostallion', type: 'Ice', rarity: 'Legendary', baseHp: 140, baseAtk: 100, baseDef: 120, speed: 1000, icon: '🦄' },
      { id: 'anubis', name: 'Anubis', type: 'Ground', rarity: 'Epic', baseHp: 120, baseAtk: 130, baseDef: 100, speed: 800, icon: '🐺' },
      { id: 'shadowbeak', name: 'Shadowbeak', type: 'Dark', rarity: 'Epic', baseHp: 120, baseAtk: 120, baseDef: 120, speed: 850, icon: '🦅' },
      { id: 'paladius', name: 'Paladius', type: 'Neutral', rarity: 'Legendary', baseHp: 130, baseAtk: 115, baseDef: 145, speed: 900, icon: '🛡️' },
      { id: 'relaxaurus', name: 'Relaxaurus', type: 'Dragon / Water', rarity: 'Rare', baseHp: 110, baseAtk: 90, baseDef: 75, speed: 700, icon: '🦕' },
      { id: 'chillet', name: 'Chillet', type: 'Ice / Dragon', rarity: 'Popular', baseHp: 90, baseAtk: 80, baseDef: 75, speed: 650, icon: '❄️' }
    ];

    function PalworldStatsMatrix() {
      const [selectedPalId, setSelectedPalId] = useState('jetragon');
      const [level, setLevel] = useState(40);
      const [soulBonus, setSoulBonus] = useState(15);
      const [filterType, setFilterType] = useState('all');

      const pal = useMemo(() => PAL_DATABASE.find(p => p.id === selectedPalId) || PAL_DATABASE[0], [selectedPalId]);

      const filteredPals = useMemo(() => {
        if (filterType === 'all') return PAL_DATABASE;
        return PAL_DATABASE.filter(p => p.type.toLowerCase().includes(filterType.toLowerCase()));
      }, [filterType]);

      // Computed dynamic level scaling formula
      const scaledStats = useMemo(() => {
        const lvlMultiplier = 1 + (level * 0.08);
        const soulMultiplier = 1 + (soulBonus / 100);

        const hp = Math.floor(pal.baseHp * lvlMultiplier * soulMultiplier * 18);
        const atk = Math.floor(pal.baseAtk * lvlMultiplier * soulMultiplier * 4.2);
        const def = Math.floor(pal.baseDef * lvlMultiplier * soulMultiplier * 3.8);
        const cpr = Math.floor((hp * 0.4) + (atk * 2.2) + (def * 1.8) + (pal.speed * 0.3));

        return { hp, atk, def, cpr };
      }, [pal, level, soulBonus]);

      return h('div', { className: 'react-tab-pane' },
        h('div', { className: 'react-grid-2col' },
          // Left: Creature Selector and Controls
          h('div', { className: 'react-card react-glass' },
            h('div', { className: 'react-card-header' },
              h('div', { className: 'react-badge-tag' }, 'Python & ML Data Analytics'),
              h('h4', null, '📊 Palworld Creature Stat Calculator')
            ),
            h('p', { className: 'react-card-desc' },
              'Interactive React interface to the statistical model developed in Devesh\'s Palworld Stats ML project. Computes non-linear level scalings and Combat Power Ratings (CPR).'
            ),

            // Element Filters
            h('div', { className: 'element-filter-bar' },
              ['all', 'Dragon', 'Ice', 'Ground', 'Dark'].map(t =>
                h('button', {
                  key: t,
                  className: `btn-select-chip ${filterType === t ? 'active' : ''}`,
                  onClick: () => {
                    setFilterType(t);
                    triggerAudio(400, 'sine', 0.04);
                  }
                }, t === 'all' ? 'All Types' : t)
              )
            ),

            // Creature Card Selector Grid
            h('div', { className: 'pal-selector-grid' },
              filteredPals.map(p =>
                h('button', {
                  key: p.id,
                  className: `pal-tile ${selectedPalId === p.id ? 'active' : ''}`,
                  onClick: () => {
                    setSelectedPalId(p.id);
                    triggerAudio(550, 'triangle', 0.06);
                  }
                },
                  h('span', { className: 'pal-tile-icon' }, p.icon),
                  h('div', { className: 'pal-tile-meta' },
                    h('span', { className: 'pal-tile-name' }, p.name),
                    h('span', { className: 'pal-tile-type' }, p.type)
                  )
                )
              )
            ),

            // Level & Soul Sliders
            h('div', { className: 'tuning-slider-group' },
              h('div', { className: 'slider-item' },
                h('div', { className: 'slider-label-row' },
                  h('span', null, 'Creature Level:'),
                  h('span', { className: 'slider-val' }, `LVL ${level}`)
                ),
                h('input', {
                  type: 'range',
                  min: 1,
                  max: 50,
                  step: 1,
                  value: level,
                  onChange: (e) => setLevel(Number(e.target.value)),
                  className: 'react-slider'
                })
              ),

              h('div', { className: 'slider-item' },
                h('div', { className: 'slider-label-row' },
                  h('span', null, 'Stat Statue Soul Infusion:'),
                  h('span', { className: 'slider-val' }, `+${soulBonus}%`)
                ),
                h('input', {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 5,
                  value: soulBonus,
                  onChange: (e) => setSoulBonus(Number(e.target.value)),
                  className: 'react-slider'
                })
              )
            )
          ),

          // Right: Scaled Output & Combat Power Radar
          h('div', { className: 'react-card react-glass' },
            h('div', { className: 'react-card-header' },
              h('div', { className: 'react-badge-tag' }, pal.rarity),
              h('h4', null, `${pal.icon} ${pal.name} Analytics`)
            ),

            h('div', { className: 'pal-hero-cpr-box' },
              h('div', { className: 'cpr-badge' }, 'COMBAT POWER RATING (CPR)'),
              h('div', { className: 'cpr-number gradient-text' }, scaledStats.cpr.toLocaleString()),
              h('div', { className: 'cpr-meta' }, `Element: ${pal.type} • Speed: ${pal.speed}`)
            ),

            h('div', { className: 'stat-bars-container mt-4' },
              h('div', { className: 'stat-meter-row' },
                h('div', { className: 'meter-info' },
                  h('span', null, '❤️ Health Points (HP)'),
                  h('span', { className: 'meter-val text-green' }, scaledStats.hp.toLocaleString())
                ),
                h('div', { className: 'meter-track' },
                  h('div', { className: 'meter-fill bg-green', style: { width: `${Math.min(100, (scaledStats.hp / 14000) * 100)}%` } })
                )
              ),

              h('div', { className: 'stat-meter-row' },
                h('div', { className: 'meter-info' },
                  h('span', null, '⚔️ Physical Attack (ATK)'),
                  h('span', { className: 'meter-val text-cyan' }, scaledStats.atk.toLocaleString())
                ),
                h('div', { className: 'meter-track' },
                  h('div', { className: 'meter-fill bg-cyan', style: { width: `${Math.min(100, (scaledStats.atk / 2800) * 100)}%` } })
                )
              ),

              h('div', { className: 'stat-meter-row' },
                h('div', { className: 'meter-info' },
                  h('span', null, '🛡️ Armor Defense (DEF)'),
                  h('span', { className: 'meter-val text-violet' }, scaledStats.def.toLocaleString())
                ),
                h('div', { className: 'meter-track' },
                  h('div', { className: 'meter-fill bg-violet', style: { width: `${Math.min(100, (scaledStats.def / 2600) * 100)}%` } })
                )
              ),

              h('div', { className: 'stat-meter-row' },
                h('div', { className: 'meter-info' },
                  h('span', null, '💨 Movement Sprint Speed'),
                  h('span', { className: 'meter-val text-amber' }, `${pal.speed} units`)
                ),
                h('div', { className: 'meter-track' },
                  h('div', { className: 'meter-fill bg-amber', style: { width: `${Math.min(100, (pal.speed / 1800) * 100)}%` } })
                )
              )
            )
          )
        )
      );
    }

    // =========================================================================
    // TAB 4: REACTIVE DEVELOPER TERMINAL / CLI
    // =========================================================================
    function DevTerminal() {
      const [history, setHistory] = useState([
        { type: 'system', text: '⚡ DEVESH DAS VIRTUAL CONSOLE v2.4 (React 18 Active)' },
        { type: 'system', text: 'Type "help" or click quick chips below to run commands.' }
      ]);
      const [inputVal, setInputVal] = useState('');
      const terminalEndRef = useRef(null);

      useEffect(() => {
        if (terminalEndRef.current) {
          terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [history]);

      const executeCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        triggerAudio(600, 'sine', 0.05);

        let output = [];
        switch (cleanCmd) {
          case 'help':
            output = [
              'Available Commands:',
              '  whoami    - Developer identity and profile',
              '  skills    - Core competencies & programming languages',
              '  react     - Architectural details of this React 18 layer',
              '  projects  - Highlights of featured projects',
              '  contact   - Direct channels (Email, Phone, Discord, LinkedIn, GitHub)',
              '  discord   - View & copy Discord username (ninjagaming2725)',
              '  roll      - Cast a random D20 dice',
              '  clear     - Wipe terminal screen'
            ];
            break;
          case 'whoami':
            output = [
              '👤 Name: Devesh Das',
              '🎮 Focus: Game Developer & Computer Science Engineer',
              '🎓 Education: B.Tech CSE @ Centurion University (2024–Present)',
              '📍 Location: Jamshedpur, Jharkhand, India'
            ];
            break;
          case 'skills':
            output = [
              '💻 Languages: C++, Python, C#, Java, JavaScript (ES6+)',
              '🎮 Game Dev: Unity 3D, Blender 3D, Physics Engines, Rigidbody',
              '⚛️ Frontend: React 18, HTML5, CSS3 Grid/Flexbox, Web Audio API',
              '📊 Data/ML: MySQL, Pandas, Plotly, Dash, Jupyter, Excel',
              '🔗 Web3: Solidity, Clarity (Stacks), Smart Contracts'
            ];
            break;
          case 'react':
            output = [
              '⚛️ React 18 Architecture:',
              '  • Zero Build Toolchain: Runs natively directly in any browser',
              '  • React Hooks: useState, useEffect, useMemo, useRef, useCallback',
              '  • State Engines: Monte Carlo dice simulation, ML matrix',
              '  • Audio Hooks: Interfaced with Web Audio synthesizer API'
            ];
            break;
          case 'projects':
            output = [
              '1. 🎲 Pasha Palli — Indian Cross-Race Board Game PWA & Bot AI',
              '2. 🏎️ Mini Car Simulation Game — Unity 3D Rigidbody & Wheel Colliders',
              '3. 📊 Palworld Pals Stats — Machine Learning Exploratory Data Analytics',
              '4. ⛓️ Teacher Payout — Stacks Clarity Smart Contract'
            ];
            break;
          case 'contact':
            output = [
              '📧 Email: deveshkumardas08@gmail.com',
              '📱 Phone: +91 8409941946',
              '💬 Discord: ninjagaming2725 (Tag copied)',
              '🐙 GitHub: https://github.com/ninja27dev',
              '💼 LinkedIn: https://www.linkedin.com/in/devesh-das-9100ab266/'
            ];
            break;
          case 'discord':
            if (navigator.clipboard) {
              navigator.clipboard.writeText('ninjagaming2725').catch(() => {});
            }
            triggerToast('Copied "ninjagaming2725" to clipboard!', '📋');
            output = [
              '💬 Discord Username: ninjagaming2725',
              '✨ Copied "ninjagaming2725" to clipboard for instant invite!'
            ];
            break;
          case 'roll':
            const d20 = Math.floor(Math.random() * 20) + 1;
            output = [`🎲 D20 Roll Result: ${d20} ${d20 === 20 ? '🔥 NATURAL 20 CRITICAL!' : (d20 === 1 ? '💀 CRITICAL MISS!' : '')}`];
            break;
          case 'clear':
            setHistory([]);
            setInputVal('');
            return;
          default:
            output = [`Unknown command "${cleanCmd}". Type "help" to view options.`];
            break;
        }

        setHistory(prev => [
          ...prev,
          { type: 'input', text: `$ ${cmd}` },
          ...output.map(line => ({ type: 'output', text: line }))
        ]);
        setInputVal('');
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        executeCommand(inputVal);
      };

      return h('div', { className: 'react-tab-pane' },
        h('div', { className: 'react-card react-glass terminal-card' },
          h('div', { className: 'terminal-header' },
            h('div', { className: 'terminal-dots' },
              h('span', { className: 'dot dot-red' }),
              h('span', { className: 'dot dot-yellow' }),
              h('span', { className: 'dot dot-green' })
            ),
            h('span', { className: 'terminal-title' }, 'devesh@game-engineer: ~/react-cli')
          ),

          // Terminal Output Window
          h('div', { className: 'terminal-screen' },
            history.map((item, idx) =>
              h('div', { key: idx, className: `terminal-line line-${item.type}` }, item.text)
            ),
            h('div', { ref: terminalEndRef })
          ),

          // Command Input Row
          h('form', { className: 'terminal-input-bar', onSubmit: handleSubmit },
            h('span', { className: 'terminal-prompt' }, '$'),
            h('input', {
              type: 'text',
              value: inputVal,
              onChange: (e) => setInputVal(e.target.value),
              placeholder: 'Type command here (e.g. "skills", "projects", "whoami")...',
              className: 'terminal-input'
            }),
            h('button', { type: 'submit', className: 'btn btn-primary btn-xs' }, 'Run ↵')
          ),

          // Quick Command Chips
          h('div', { className: 'terminal-quick-chips' },
            ['help', 'whoami', 'skills', 'react', 'projects', 'contact', 'discord', 'roll', 'clear'].map(cmd =>
              h('button', {
                key: cmd,
                type: 'button',
                className: 'quick-chip-btn',
                onClick: () => executeCommand(cmd)
              }, `$ ${cmd}`)
            )
          )
        )
      );
    }

    // =========================================================================
    // MAIN APP WRAPPER COMPONENT
    // =========================================================================
    function ReactLabApp() {
      const [activeTab, setActiveTab] = useState('pasha');

      const tabs = [
        { id: 'pasha', icon: '🎲', label: 'Pasha Palli Simulator' },
        { id: 'palworld', icon: '📊', label: 'Palworld ML Matrix' },
        { id: 'terminal', icon: '💻', label: 'Developer CLI Console' }
      ];

      return h('div', { className: 'react-lab-wrapper' },
        // Top Engine Header
        h('div', { className: 'react-engine-header' },
          h('div', { className: 'react-status-pill' },
            h('span', { className: 'react-atom-spin' }, '⚛️'),
            h('span', { className: 'react-status-text' }, 'React 18 Reactive Engine Active')
          ),
          h('div', { className: 'react-header-desc' },
            'Live client-side simulation modules demonstrating physics algorithms, probability modeling, and state-driven game mechanics.'
          )
        ),

        // Navigation Tabs
        h('div', { className: 'react-tabs-nav', role: 'tablist' },
          tabs.map(tab =>
            h('button', {
              key: tab.id,
              role: 'tab',
              'aria-selected': activeTab === tab.id,
              className: `react-tab-btn ${activeTab === tab.id ? 'active' : ''}`,
              onClick: () => {
                setActiveTab(tab.id);
                triggerAudio(500, 'triangle', 0.05);
              }
            },
              h('span', { className: 'tab-icon' }, tab.icon),
              h('span', { className: 'tab-label' }, tab.label)
            )
          )
        ),

        // Tab Content Panels
        h('div', { className: 'react-tab-body' },
          activeTab === 'pasha' && h(PashaPalliSimulator),
          activeTab === 'palworld' && h(PalworldStatsMatrix),
          activeTab === 'terminal' && h(DevTerminal)
        )
      );
    }

    // Mount Root
    const root = ReactDOM.createRoot(container);
    root.render(h(ReactLabApp));
  }

  // Ensure DOM is ready before mounting
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactApp);
  } else {
    initReactApp();
  }
})();

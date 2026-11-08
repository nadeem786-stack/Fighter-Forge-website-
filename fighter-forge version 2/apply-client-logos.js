#!/usr/bin/env node
/**
 * FIGHTER FORGE: add client logos to the home-page marquee + change the first stat.
 *
 * Run from the project root ("fighter-forge version 2"):
 *     node apply-client-logos.js
 *
 * Edits (a .bak copy of every changed file is saved next to it):
 *   public/index.html              <- the file the site actually serves (inline bundle)
 *   public/app.bundle.jsx          <- same bundle
 *   src/config/siteConfig.js       <- clients list (stats there already say 20+ Years)
 *   src/components/ClientLogosMarquee.jsx
 *
 * Safe to run twice. If something can't be found, that file is left untouched.
 * Logo images go in public/assets/clients/ (copy the 8 .webp files there first).
 */
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

// name, small caption (or null), image file name (without .webp)
const CLIENTS = [
  ['CRPF', 'Central Reserve Police Force', 'crpf'],
  ['SAI', 'Sports Authority of India', 'sai'],
  ['RBA', 'Rajasthan Boxing Association', 'rajasthan-boxing-association'],
  ['TRENZ', null, 'trenz'],
  ['SHIV-NARESH', 'A Quality Sports Wear', 'shiv-naresh'],
  ["AIBA WOMEN'S WORLD BOXING", 'Championships • New Delhi 2018', 'aiba-womens-world-championships-2018'],
  ['TRAIN HIGH GYM', null, 'train-high-gym'],
  ['WAKO INDIA', 'Kickboxing Federation', 'wako-india'],
];

const NEW_STAT =
  '{ label: "Years of Experience", value: 20, suffix: "+", description: "Heavy steel combat arena engineering & fabrication" }';

const clientsBlock = (prefix) =>
  'clients: [\n' +
  CLIENTS.map(([name, detail, file]) => {
    const d = detail ? ' detail: ' + JSON.stringify(detail) + ',' : '';
    return '    { name: ' + JSON.stringify(name) + ',' + d + ' logo: "' + prefix + '/' + file + '.webp" }';
  }).join(',\n') +
  '\n  ],';

const marqueeBody = `function ClientLogosMarquee() {
  // Each half of the track must be wider than the screen for the -50% loop to stay seamless,
  // so the client list is repeated before the track is doubled.
  const half = [...siteConfig.clients, ...siteConfig.clients];
  const clientList = [...half, ...half];

  // Entries can have a logo + caption (detail), or the older city/category text.
  const captionFor = (client) =>
    client.detail || [client.city, client.category].filter(Boolean).join(' • ');

  return (
    <div className="relative py-8 bg-[#0D0D0D] border-y border-zinc-800/80 overflow-hidden">
      {/* Label on left on desktop */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="diagonal-slash-pair">
            <span></span>
            <span></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            TRUSTED BY ELITE ARENAS, PRO FIGHT CAMPS & CHAMPIONSHIP PROMOTIONS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-[#E10B1F] font-bold tracking-widest">
          <span>FACTORY DIRECT BUILDS</span>
          <span>•</span>
          <span>NATIONWIDE DISPATCH</span>
        </div>
      </div>

      {/* Marquee Track Moving from Right to Left */}
      <div className="flex overflow-hidden select-none mask-gradient-x">
        <div
          className="animate-marquee-left flex items-center gap-6 py-2"
          style={{ animationDuration: '60s' }}
        >
          {clientList.map((client, idx) => (
            <div
              key={client.name + '-' + idx}
              className="flex items-center gap-3 bg-[#161616] hover:bg-[#1f1f1f] border border-zinc-800 hover:border-[#E10B1F]/40 pl-2.5 pr-5 py-2.5 transition-all duration-200 cursor-default shrink-0 group"
              style={{
                clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
              }}
            >
              {client.logo ? (
                /* White tile so logos with white backgrounds sit cleanly on the dark card */
                <div className="h-14 min-w-[3.5rem] px-1.5 rounded bg-white flex items-center justify-center shrink-0">
                  <img
                    src={client.logo}
                    alt={client.name + ' logo'}
                    className="h-11 w-auto max-w-[5.5rem] object-contain"
                    draggable="false"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded bg-black/60 border border-zinc-700 group-hover:border-[#E10B1F] flex items-center justify-center shrink-0 transition-colors">
                  <span className="text-[#E10B1F] font-display text-sm font-bold">FF</span>
                </div>
              )}

              <div>
                <div className="font-display text-sm tracking-wider text-white group-hover:text-[#E10B1F] transition-colors whitespace-nowrap">
                  {client.name}
                </div>
                {captionFor(client) && (
                  <div className="text-[11px] text-zinc-400 font-sans tracking-wide whitespace-nowrap">
                    {captionFor(client)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

const srcComponent =
  "import React from 'react';\nimport { siteConfig } from '../config/siteConfig.js';\n\nexport " + marqueeBody;

function patchFile(rel, steps) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return console.log('skipped (not found): ' + rel);
  let s = fs.readFileSync(p, 'utf8');
  const orig = s;
  const crlf = s.includes('\r\n');
  if (crlf) s = s.replace(/\r\n/g, '\n');
  const log = [];
  for (const st of steps) {
    if (st.done(s)) { log.push('  already done: ' + st.name); continue; }
    if (!st.re.test(s)) throw new Error(rel + ': could not find "' + st.name + '". File left unchanged.');
    s = s.replace(st.re, () => st.to);
    log.push('  updated: ' + st.name);
  }
  if (crlf) s = s.replace(/\n/g, '\r\n');
  if (s !== orig) {
    if (!fs.existsSync(p + '.bak')) fs.copyFileSync(p, p + '.bak');
    fs.writeFileSync(p, s, 'utf8');
  }
  console.log(rel + '\n' + log.join('\n'));
}

const stepsFor = (prefix, withMarquee) => {
  const steps = [
    {
      name: 'stat: 340+ Arenas Outfitted -> 20+ Years of Experience',
      done: (s) => s.includes('label: "Years of Experience"'),
      re: /\{ label: "Arenas Outfitted", value: 340, suffix: "\+", description: "[^"]*" \}/,
      to: NEW_STAT,
    },
    {
      name: 'clients list (logos)',
      done: (s) => s.includes('/assets/clients/'),
      re: /clients: \[\n[\s\S]*?\n  \],/,
      to: clientsBlock(prefix),
    },
  ];
  if (withMarquee) {
    steps.push({
      name: 'ClientLogosMarquee component',
      done: (s) => s.includes('captionFor'),
      re: /function ClientLogosMarquee\(\) \{[\s\S]*?\n\}\n(?=\s*\/\/ --- MODULE: SloganMarquee\.jsx ---)/,
      to: marqueeBody,
    });
  }
  return steps;
};

try {
  // The served bundles use ./assets/..., the modular src files use /assets/... (same as the rest of the project)
  patchFile('public/index.html', stepsFor('./assets/clients', true));
  patchFile('public/app.bundle.jsx', stepsFor('./assets/clients', true));
  patchFile('src/config/siteConfig.js', stepsFor('/assets/clients', false));

  const compRel = 'src/components/ClientLogosMarquee.jsx';
  const compPath = path.join(ROOT, compRel);
  if (fs.existsSync(path.dirname(compPath))) {
    if (fs.existsSync(compPath) && !fs.existsSync(compPath + '.bak')) fs.copyFileSync(compPath, compPath + '.bak');
    fs.writeFileSync(compPath, srcComponent, 'utf8');
    console.log(compRel + '\n  rewritten');
  }

  const dir = path.join(ROOT, 'public', 'assets', 'clients');
  const missing = CLIENTS.map((c) => c[2] + '.webp').filter((f) => !fs.existsSync(path.join(dir, f)));
  console.log(missing.length
    ? '\nWARNING: copy these into public/assets/clients/ : ' + missing.join(', ')
    : '\nAll 8 logo images found. Done.');
} catch (e) {
  console.error('\nERROR: ' + e.message);
  process.exit(1);
}
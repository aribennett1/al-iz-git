// Bubby's kitchen scenes. Same rules as animations.js: every timer goes through
// `later`, every sound through `sound`, and no user input is ever rendered here.
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!=null)node.textContent=text;return node;};

// ---------- Bubby herself: one original character, posed per scene ----------
const SKIN='#efc6a8',SLEEVE='url(#bubby-floral)';
const sleeve=d=>`<path d="${d}" fill="none" stroke="#7e64a8" stroke-width="19" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${SLEEVE}" stroke-width="16" stroke-linecap="round"/>`;
const hand=(x,y)=>`<circle cx="${x}" cy="${y}" r="8.5" fill="${SKIN}"/>`;
const finger=d=>`<path d="${d}" stroke="${SKIN}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
const LEFT=sleeve('M54 182Q42 214 86 214')+hand(90,213),RIGHT=sleeve('M146 182Q158 214 114 214')+hand(110,213);
const POSES={
 rest:LEFT+RIGHT,
 wag:LEFT+`<g class="bubby-wag">${sleeve('M146 182Q174 166 166 124')+hand(166,118)+finger('M166 110V95')}</g>`,
 dab:RIGHT+`<g class="bubby-dab">${sleeve('M54 182Q28 148 68 124')+hand(72,120)}<path d="M62 100l24-5 6 23-21 7z" fill="#f7f2fa" stroke="#d9cfe3"/></g>`,
 phone:RIGHT+sleeve('M54 182Q28 160 50 130')+`<path d="M54 92Q40 120 76 138" fill="none" stroke="#2b2832" stroke-width="9" stroke-linecap="round"/><ellipse cx="54" cy="92" rx="9" ry="6" fill="#2b2832" transform="rotate(-60 54 92)"/><ellipse cx="78" cy="138" rx="9" ry="6" fill="#2b2832" transform="rotate(20 78 138)"/><path d="M80 144c-8 4 8 8 0 12s8 8 0 12s8 8 0 12" fill="none" stroke="#2b2832" stroke-width="2"/>`+hand(52,124),
 point:LEFT+sleeve('M146 182Q178 178 204 160')+hand(207,158)+finger('M214 154l14-8'),
 offer:sleeve('M54 182Q48 208 80 206')+sleeve('M146 182Q152 208 120 206')+'%PROP%'+hand(82,205)+hand(118,205),
 shrug:sleeve('M54 182Q26 204 30 172')+hand(30,166)+sleeve('M146 182Q174 204 170 172')+hand(170,166),
 spoon:LEFT+sleeve('M146 182Q178 172 172 134')+`<path d="M172 128V102" stroke="#bfc4cf" stroke-width="4" stroke-linecap="round"/><ellipse cx="172" cy="94" rx="8" ry="11" fill="#d9dde6"/><ellipse cx="172" cy="91" rx="6" ry="5" fill="#f1e2b8"/>`+hand(172,128)
};
const BROWS={soft:'M68 75q12-6 24 0M108 75q12-6 24 0',stern:'M68 71l24 8M132 71l-24 8',up:'M68 69q12-9 24-3M108 66q12-6 24 3',tender:'M68 78l24-7M132 78l-24-7'};
const LIP='#b8445a';
const MOUTHS={smile:`<path d="M89 127q11 9 22 0" stroke="${LIP}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`,pursed:`<path d="M93 129q7-5 14 0" stroke="${LIP}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`,o:`<ellipse cx="100" cy="129" rx="4.5" ry="6" fill="#7a2c3e" stroke="${LIP}" stroke-width="2"/>`,grin:`<path d="M87 124q13 17 26 0z" fill="#7a2c3e" stroke="${LIP}" stroke-width="2.4" stroke-linejoin="round"/>`};
export function bubbySvg({pose='rest',brows='soft',mouth='smile',prop=''}={}){
 return `<svg viewBox="0 0 200 240" role="img" aria-label="Bubby" overflow="visible">
 <defs><pattern id="bubby-floral" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#a68ad0"/><g fill="#f4a9bf"><circle cx="6" cy="4.5" r="2.3"/><circle cx="9.5" cy="7" r="2.3"/><circle cx="6" cy="9.5" r="2.3"/><circle cx="2.5" cy="7" r="2.3"/></g><circle cx="6" cy="7" r="1.4" fill="#ffe08a"/><circle cx="16.5" cy="16.5" r="2" fill="#93c8ea"/><path d="M13 3q4 1 5 5" stroke="#86b97c" stroke-width="1.5" fill="none"/></pattern>
 <pattern id="bubby-scarf" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e417d"/><circle cx="4" cy="4" r="1.7" fill="#d6b77d"/><circle cx="11" cy="10.5" r="1.3" fill="#c9a3e6"/></pattern></defs>
 <path d="M12 240Q14 164 100 158Q186 164 188 240Z" fill="url(#bubby-floral)"/>
 <path d="M100 168V240" stroke="#8f74ba" stroke-width="2"/><g fill="#fbf6ef"><circle cx="100" cy="194" r="2.4"/><circle cx="100" cy="211" r="2.4"/><circle cx="100" cy="228" r="2.4"/></g>
 <path d="M128 206h26v18q-13 4-26 0z" fill="#9277c0"/><path d="M131 207q3-12 8-3q3-9 9-1q4-5 3 4z" fill="#fdfbfe" stroke="#e3dcea"/>
 <path d="M86 130h28v32H86z" fill="#e0b495"/>
 <path d="M74 160q12 22 26 24q-8-16-14-28zM126 160q-12 22-26 24q8-16 14-28z" fill="#f8f2ec" stroke="#e2d8ea"/>
 <ellipse cx="57" cy="102" rx="7" ry="10" fill="#e3b394"/><ellipse cx="143" cy="102" rx="7" ry="10" fill="#e3b394"/><circle cx="56" cy="115" r="3.4" fill="#f4efe6"/><circle cx="144" cy="115" r="3.4" fill="#f4efe6"/>
 <path d="M56 94Q56 50 100 50Q144 50 144 94Q146 130 124 142Q112 148 100 148Q88 148 76 142Q54 130 56 94Z" fill="${SKIN}"/>
 <path d="M84 145q16 9 32 0" stroke="#d6a587" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <g fill="#d9d4de"><circle cx="66" cy="68" r="7"/><circle cx="78" cy="62" r="7"/><circle cx="122" cy="62" r="7"/><circle cx="134" cy="68" r="7"/></g>
 <path d="M50 98Q44 34 100 32Q156 34 150 98Q146 66 124 60Q100 66 76 60Q54 66 50 98Z" fill="url(#bubby-scarf)"/>
 <path d="M51 94Q56 64 76 60Q100 66 124 60Q144 64 149 94" stroke="#46305e" stroke-width="3" fill="none"/>
 <path d="M146 64q18-6 22 8q-5 11-19 6z" fill="#4c3368"/><path d="M154 78q10 18 3 34q-11-13-9-32z" fill="url(#bubby-scarf)"/><path d="M161 76q15 10 15 28q-13-6-17-24z" fill="url(#bubby-scarf)"/>
 <path d="M88 70q12-4 24 0" stroke="#dba98b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
 <path d="${BROWS[brows]}" stroke="#aaa2b4" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g class="bubby-eyes"><circle cx="81" cy="96" r="7.5" fill="#fff"/><circle cx="119" cy="96" r="7.5" fill="#fff"/><g fill="#4a3240"><circle cx="82" cy="97" r="4.3"/><circle cx="118" cy="97" r="4.3"/></g><g fill="#fff"><circle cx="83.6" cy="95.4" r="1.4"/><circle cx="119.6" cy="95.4" r="1.4"/></g></g>
 <g fill="#ffffff1c" stroke="#7a5a8c" stroke-width="3.4"><circle cx="81" cy="96" r="15"/><circle cx="119" cy="96" r="15"/></g><path d="M96 94q4-4 8 0" stroke="#7a5a8c" stroke-width="3.4" fill="none"/><path d="M71 88q3-5 9-6M109 88q3-5 9-6" stroke="#fff" stroke-width="2" opacity=".55" fill="none" stroke-linecap="round"/>
 <path d="M66 100Q58 140 84 162" fill="none" stroke="#d6b77d" stroke-width="1.5" stroke-dasharray="2 2"/>
 <path d="M61 92l-5-2M61 99l-5 1M139 92l5-2M139 99l5 1" stroke="#d29c80" stroke-width="1.6" stroke-linecap="round"/>
 <path d="M100 103q-9 14 0 18q6 1 9-3" stroke="#c98f76" stroke-width="2.8" fill="none" stroke-linecap="round"/>
 <path d="M83 115q-7 9-2 18M117 115q7 9 2 18" stroke="#dba98b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
 <circle cx="68" cy="118" r="9" fill="#e8858c" opacity=".42"/><circle cx="132" cy="118" r="9" fill="#e8858c" opacity=".42"/>
 <g class="m-rest">${MOUTHS[mouth]}</g><ellipse class="m-talk" cx="100" cy="128" rx="7" ry="5.5" fill="#7a2c3e" stroke="${LIP}" stroke-width="2.2"/>
 ${POSES[pose].replace('%PROP%',prop)}
 </svg>`;
}
function mountBubby(stage,{later,sound},initial={}){
 const figure=el('div','bubby-figure'),bubble=el('div','bubby-says');bubble.hidden=true;
 let state={...initial};
 const draw=()=>{figure.innerHTML=bubbySvg(state);};draw();stage.append(bubble,figure);
 return {
  figure,bubble,
  set(next){state={...state,...next};draw();},
  say(text,next){
   if(next)this.set(next);
   bubble.textContent=text;bubble.hidden=false;bubble.classList.remove('pop');void bubble.offsetWidth;bubble.classList.add('pop');
   figure.classList.add('talking');sound('pop');later(()=>figure.classList.remove('talking'),Math.min(1700,350+text.length*45));
  },
  hush(){bubble.hidden=true;}
 };
}
const hex=seed=>{let x=Math.imul(seed+1,2654435761)>>>0,out='';for(let i=0;i<7;i++){x=(Math.imul(x,1103515245)+12345)>>>0;out+='0123456789abcdef'[(x>>>16)&15];}return out;};
const retrigger=(node,cls)=>{node.classList.remove(cls);void node.offsetWidth;node.classList.add(cls);};

// ---------- git log: 47 missed calls ----------
function log(stage,ctx){
 const {later,sound,stopSound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">47 missed calls</h2><span class="scene-label bubby-label">git log --author=bubby</span>`;
 const feed=el('div','call-log');feed.setAttribute('aria-hidden','true');
 const badge=el('div','missed-badge'),count=el('b','','0');badge.append(count,el('span','','missed calls'));stage.append(feed,badge);
 const voicemail={2:'Voicemail: "Hello? It\'s Bubby."',4:'Voicemail: "It\'s Bubby. Call me back. It\'s nothing important."',6:'Voicemail: "It\'s important."',9:'Voicemail: "Your cousin Yanky called me. Twice. I\'m just saying."',12:'Voicemail: "I\'m not upset."',20:'Voicemail: "OK, I\'m a little upset."',31:'Voicemail: "HELLO? Is this thing on?"',44:'Voicemail: "Never mind. I\'ll call your mother."',46:'Voicemail: "…Love, Bubby."'};
 const slow=new Set([2,4,6,9,12,44,46]);
 let at=150;
 for(let i=0;i<47;i++){
  const when=at,minute=2+i*2.4,stamp=`Sun ${9+Math.floor(minute/60)}:${String(Math.floor(minute%60)).padStart(2,'0')} AM`;
  later(()=>{
   const entry=el('div','call-entry');entry.append(el('span','hash',`commit ${hex(i+7)}`),el('span','',`Author: Bubby <bubby@landline>  ·  ${stamp}`),el('span','msg'+(voicemail[i]?' vm':''),'    '+(voicemail[i]||'Missed call')));
   feed.append(entry);while(feed.children.length>14)feed.firstElementChild.remove();
   count.textContent=String(i+1);retrigger(badge,'bump');if(i<14||i%5===0)sound('buzz');
  },when);
  at+=Math.max(38,360*Math.pow(.84,i))+(slow.has(i)?(i===44?650:430):0);
 }
 const card=el('div','call-card');card.innerHTML=`<div class="call-avatar">${bubbySvg({mouth:'pursed'})}</div><b>Bubby</b><span>landline · calling…</span><div class="call-buttons"><span class="decline">Decline</span><span class="accept">Accept</span></div>`;
 const decline=card.querySelector('.decline'),accept=card.querySelector('.accept');
 later(()=>{stage.classList.add('ringing');stage.append(card);sound('ring');},7100);
 later(()=>{decline.textContent='Decline?';decline.classList.add('dodge-1');accept.classList.add('grow-1');},7700);
 later(()=>{decline.textContent="Don't you dare";decline.classList.add('dodge-2');accept.classList.add('grow-2');sound('ring');},8300);
 later(()=>{decline.classList.add('dodge-3');accept.textContent='Accept ✓';accept.classList.add('grow-3');},8800);
 later(()=>{stopSound();stage.classList.remove('ringing');card.classList.add('answered');badge.classList.add('cleared');count.textContent='0';badge.lastElementChild.textContent='missed calls (finally)';const b=mountBubby(stage,ctx,{pose:'phone',brows:'stern',mouth:'pursed'});later(()=>b.say("A log you keep. A phone, you don't have?"),250);later(()=>b.say("So. You're eating?",{brows:'up',mouth:'smile'}),2300);},9300);
}

// ---------- git diff: her kugel vs. yours ----------
const KUGEL_YOURS=`<svg viewBox="0 0 160 110" aria-label="Your kugel: small and pale" role="img"><path d="M10 70h140l-10 32H20z" fill="#5d5868"/><path d="M6 66h148v8H6z" fill="#77718a" rx="3"/><rect x="22" y="56" width="116" height="12" rx="4" fill="#efe3c2"/><path d="M34 60q8-4 16 0t16 0M86 61q8-4 16 0t16 0" stroke="#d9c79c" stroke-width="2" fill="none"/><path class="sad-steam" d="M80 50q-6-8 0-16t0-16" stroke="#cfc8d8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
const KUGEL_HERS=`<svg viewBox="0 0 160 150" aria-label="Bubby's kugel: tall, golden and glowing" role="img"><defs><linearGradient id="kugel-gold" x2="0" y2="1"><stop stop-color="#b8662a"/><stop offset=".25" stop-color="#e8a54b"/><stop offset="1" stop-color="#f2cd7c"/></linearGradient></defs><g class="steam"><path d="M48 26q-7-9 0-18t0-18M80 20q-7-9 0-18t0-18M112 26q-7-9 0-18t0-18" stroke="#e8dff0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/></g><path d="M10 110h140l-10 32H20z" fill="#5d5868"/><path d="M6 106h148v8H6z" fill="#77718a"/><path d="M20 108V48q0-12 12-14h96q12 2 12 14v60z" fill="url(#kugel-gold)"/><path d="M22 44q10-14 22-6t22-6 22 6 22-6 22 6 18-4" stroke="#7e3f16" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M34 62q10-6 20 0t20 0M84 76q10-6 20 0t20 0M40 90q10-6 20 0t20 0" stroke="#c98535" stroke-width="3" fill="none"/><g fill="#5b2a19"><circle cx="64" cy="70" r="3"/><circle cx="112" cy="58" r="3"/><circle cx="98" cy="94" r="3"/><circle cx="44" cy="80" r="3"/></g></svg>`;
function diff(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Bubby's kugel diff</h2>`;
 const panel=el('div','diff-panel');panel.setAttribute('aria-hidden','true');stage.append(panel);
 const lines=[['meta','diff --git a/kugel b/kugel'],['meta','--- a/kugel   (yours)'],['meta',"+++ b/kugel   (Bubby's)"],['hunk','@@ -1,5 +1,7 @@'],['same','  1 bag wide noodles'],['del','- 3 eggs'],['add','+ 7 eggs'],['del','- 2 tbsp oil'],['add','+ schmaltz'],['add','+ schmaltz'],['add','+ a little more schmaltz'],['del','- ½ cup sugar'],['add',"+ sugar (don't ask)"],['del','- bake 45 minutes'],['add',"+ bake until it's right. You'll know."]];
 lines.forEach(([kind,text],i)=>later(()=>{panel.append(el('div','diff-line '+kind,text));sound('tick');},120+i*270));
 const yours=el('figure','kugel yours'),hers=el('figure','kugel hers');
 yours.innerHTML=`${KUGEL_YOURS}<figcaption><b>−</b> a/kugel (yours)</figcaption>`;hers.innerHTML=`${KUGEL_HERS}<figcaption><b>+</b> b/kugel (Bubby's)</figcaption><span class="sparkle s1">✦</span><span class="sparkle s2">✧</span><span class="sparkle s3">✦</span>`;
 later(()=>{panel.classList.add('tucked');stage.append(yours,hers);sound('ding');},4400);
 later(()=>{const b=mountBubby(stage,ctx,{pose:'offer',mouth:'smile',prop:'<path d="M74 196h52" stroke="#77718a" stroke-width="5" stroke-linecap="round"/>'});later(()=>{b.say('Yours is also nice.',{brows:'tender'});},500);later(()=>{yours.classList.add('fizzle');},1300);later(()=>{b.say('For a first try.',{brows:'soft',mouth:'pursed'});hers.classList.add('rise');sound('ding');},2700);},5300);
}

// ---------- git push: nobody is pushing ----------
const PLATE=food=>`<svg viewBox="0 0 120 40" aria-hidden="true"><ellipse cx="60" cy="31" rx="56" ry="7.5" fill="#ebe6f0"/><ellipse cx="60" cy="29.5" rx="40" ry="4.5" fill="#d6cfde"/><ellipse cx="60" cy="33.5" rx="56" ry="3" fill="#b8b0c4" opacity=".5"/>${food}</svg>`;
const FOODS=[
 ['kugel','<path d="M38 28V14h44v14z" fill="#e8b665"/><path d="M38 14h44" stroke="#9a5a22" stroke-width="3"/>'],
 ['gefilte fish','<ellipse cx="60" cy="22" rx="22" ry="8" fill="#e6d6ad"/><circle cx="60" cy="15" r="5" fill="#ef8f3d"/>'],
 ['challah','<path d="M32 28q-3-13 10-13 5-7 13-2 7-6 15 0 11-2 13 7 7 5 0 8z" fill="#c9823b"/><g fill="#f6e7c4"><circle cx="46" cy="19" r="1"/><circle cx="62" cy="16" r="1"/><circle cx="74" cy="20" r="1"/></g>'],
 ['brisket','<g fill="#8a4a2f"><rect x="34" y="14" width="13" height="14" rx="2"/><rect x="49" y="13" width="13" height="15" rx="2"/><rect x="64" y="14" width="13" height="14" rx="2"/></g><path d="M34 22h43" stroke="#5e2f1d" stroke-width="2"/>'],
 ['latkes','<ellipse cx="48" cy="24" rx="14" ry="5" fill="#b97a2e"/><ellipse cx="70" cy="20" rx="14" ry="5" fill="#cd8d38"/><ellipse cx="82" cy="17" rx="6" ry="3" fill="#f3e3c0"/>'],
 ['kishke','<g fill="#c4623a"><ellipse cx="44" cy="22" rx="8" ry="6"/><ellipse cx="60" cy="21" rx="8" ry="6"/><ellipse cx="76" cy="22" rx="8" ry="6"/></g><g fill="#e3955c"><circle cx="44" cy="22" r="3"/><circle cx="60" cy="21" r="3"/><circle cx="76" cy="22" r="3"/></g>'],
 ['rugelach','<g fill="none" stroke="#8a4b2a" stroke-width="5" stroke-linecap="round"><path d="M38 26q6-12 14 0"/><path d="M54 24q6-12 14 0"/><path d="M70 26q6-12 14 0"/></g>'],
 ['cholent','<path d="M34 29q26-26 52 0z" fill="#6e4430"/><g fill="#c7a27c"><circle cx="50" cy="22" r="2"/><circle cx="62" cy="18" r="2"/><circle cx="70" cy="24" r="2"/></g><ellipse cx="60" cy="13" rx="6" ry="4" fill="#e6c28f"/>'],
 ['tzimmes','<g fill="#f08c3a"><circle cx="46" cy="24" r="6"/><circle cx="60" cy="20" r="6"/><circle cx="74" cy="24" r="6"/><circle cx="60" cy="27" r="5"/></g>'],
 ['chopped liver','<path d="M40 29q20-24 40 0z" fill="#7b6152"/><g fill="#f4d35e"><circle cx="54" cy="20" r="1.5"/><circle cx="62" cy="16" r="1.5"/><circle cx="68" cy="22" r="1.5"/></g>'],
 ['blintzes','<g fill="#f2dcb0" stroke="#d4b07a"><rect x="38" y="16" width="20" height="11" rx="5"/><rect x="62" y="16" width="20" height="11" rx="5"/></g><path d="M50 15q10-8 20 0" stroke="#b33951" stroke-width="4" fill="none"/>'],
 ['babka','<rect x="36" y="12" width="48" height="16" rx="6" fill="#c98a4b"/><path d="M40 20q8-7 16 0t16 0 8 0" stroke="#4a2a1a" stroke-width="3" fill="none"/>'],
 ['herring','<g fill="#b9c4cf"><path d="M38 26l14-10 4 4-14 10z"/><path d="M58 26l14-10 4 4-14 10z"/></g><ellipse cx="80" cy="22" rx="5" ry="3" fill="none" stroke="#f1eaf7" stroke-width="2"/>'],
 ['a little dessert','<circle cx="60" cy="24" r="5" fill="#d9a25f"/><g fill="#5b3420"><circle cx="58" cy="23" r="1"/><circle cx="62" cy="25" r="1"/></g>']
];
function push(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Nobody is pushing</h2>`;
 const progress=el('div','push-progress','Enumerating plates: 14, done.'),tower=el('div','plate-tower');tower.setAttribute('aria-hidden','true');stage.append(progress,tower);
 const b=mountBubby(stage,ctx,{pose:'offer',brows:'up',prop:'<ellipse cx="100" cy="198" rx="30" ry="6" fill="#ebe6f0"/><path d="M84 196h32v-9H84z" fill="#e8b665"/>'});
 const lines={1:"Who's pushing?",3:"I'm not pushing.",6:'Just a taste.',9:"You'll take some home.",13:"It's dessert. Dessert doesn't count."};
 let at=500,kg=0;
 FOODS.forEach(([name,food],i)=>{
  later(()=>{
   const plate=el('div','plate'+(i===13?' tiny':''));plate.style.setProperty('--i',i);plate.style.setProperty('--jx',`${((i*37)%11)-5}px`);plate.innerHTML=PLATE(food);tower.append(plate);
   tower.style.setProperty('--sway',`${Math.min(6,i*.45)}deg`);retrigger(stage,'nudge');sound('clink');
   kg+=i===13?.1:.47;const pct=Math.round((i+1)/14*100);progress.textContent=`Writing objects: ${pct}% (${i+1}/14), ${kg.toFixed(1)} kg | ${name}`;
   if(lines[i])b.say(lines[i]);
  },at);
  at+=Math.max(390,650-i*22);
 });
 later(()=>{progress.textContent='To origin/your-plate\n   14 plates pushed. 0 requested.';progress.classList.add('done');b.set({pose:'rest',mouth:'smile'});},at+300);
}

// ---------- git push --force: here comes the airplane ----------
function pushForce(stage,ctx){
 const {later,sound,reduced}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Here comes the airplane</h2>`;
 const target=el('div','spoon-target');target.innerHTML='<span class="who">you@bubbys-table</span> <span class="muted">~</span> <b>❯</b> <span class="mm"></span><i class="mouth-cursor"></i>';
 const out=el('div','reject-output');out.setAttribute('aria-hidden','true');
 const spoon=el('div','flying-spoon');spoon.setAttribute('aria-hidden','true');spoon.innerHTML='<svg viewBox="0 0 90 40"><path d="M30 14l-8-12h6l12 12zM30 26l-8 12h6l12-12z" fill="#9aa1b3"/><path d="M4 20h44" stroke="#bfc4cf" stroke-width="5" stroke-linecap="round"/><ellipse cx="66" cy="20" rx="18" ry="12" fill="#d9dde6"/><ellipse cx="68" cy="17" rx="13" ry="8" fill="#f1e2b8"/></svg>';
 const trail=Array.from({length:18},()=>{const dot=el('i','trail-dot');stage.append(dot);return dot;});
 stage.append(target,out,spoon);
 const b=mountBubby(stage,ctx,{pose:'spoon',brows:'up'});
 later(()=>b.say("Force? Who's forcing?"),200);
 const W=()=>stage.clientWidth,H=()=>stage.clientHeight;
 const mouth=()=>{const t=target.querySelector('.mouth-cursor'),s=stage.getBoundingClientRect(),r=t.getBoundingClientRect();return {x:r.left-s.left+r.width/2,y:r.top-s.top+r.height/2};};
 const place=(x,y,angle,scale=1)=>{spoon.style.transform=`translate(${x}px,${y}px) translate(-70%,-50%) rotate(${angle}rad) scale(${scale})`;};
 const flight=(t,w,h,m)=>{
  // Takeoff from her hand, two loop-the-loops drifting left, a swoop, then a dive at the mouth.
  const hand={x:w*.86,y:h*.5};
  if(t<.15){const k=t/.15;return {x:hand.x-(w*.16)*k,y:hand.y-(h*.22)*Math.sin(k*Math.PI/2)};}
  if(t<.8){const k=(t-.15)/.65,cx=w*.7-w*.42*k,r=Math.min(w,h)*.15;const a=k*Math.PI*4;return {x:cx+r*Math.sin(a),y:h*.28+r-r*Math.cos(a)};}
  const k=(t-.8)/.2,ease=k*k,sx=w*.28,sy=h*.28;return {x:sx+(m.x-sx)*ease,y:sy+(m.y-sy)*ease};
 };
 let impacted=false;
 const impact=()=>{
  impacted=true;sound('clank');later(()=>sound('splat'),90);
  target.classList.add('flinch');const m=mouth();
  for(let i=0;i<5;i++){const blob=el('i','splat');blob.style.left=`${m.x+(i-2)*14+(i%2?6:-4)}px`;blob.style.top=`${m.y-18+((i*13)%22)}px`;blob.style.setProperty('--s',(.6+(i%3)*.3).toFixed(2));stage.append(blob);}
  place(m.x+40,m.y-40,-.9,.9);spoon.classList.add('bonked');
 };
 if(reduced){later(()=>{target.querySelector('.mm').textContent='mm-mm';target.classList.add('clamped');impact();},1000);}
 else{
  later(()=>{b.set({pose:'rest'});b.say('Here comes the airplane…');sound('airplane');spoon.classList.add('flying');},1300);
  const start=1300,length=3300;let last=null,tick=0;
  const frame=()=>{
   if(!stage.isConnected||impacted)return;
   const now=performance.now();const elapsed=now-frame.t0;const t=Math.min(1,elapsed/length);
   const w=W(),h=H(),m=mouth(),p=flight(t,w,h,m),prev=last||p;last=p;
   place(p.x,p.y,Math.atan2(p.y-prev.y,p.x-prev.x||.001));
   const dot=trail[tick++%trail.length];dot.style.transform=`translate(${p.x}px,${p.y}px)`;retrigger(dot,'fade');
   if(t>.62&&!target.classList.contains('clamped')){target.classList.add('clamped');target.querySelector('.mm').textContent='mm-mm';}
   if(t>=1){impact();return;}
   later(frame,1000/40);
  };
  later(()=>{frame.t0=performance.now();frame();},start);
 }
 later(()=>b.say('Open.',{pose:'wag',brows:'stern',mouth:'pursed'}),reduced?1300:4900);
 const lines=[' ! [rejected]   spoon -> mouth (mouth closed)',"error: failed to push some refs to 'you'","hint: Updates were rejected because Bubby knows you're hungry.",'hint: Retrying…'];
 lines.forEach((text,i)=>later(()=>{out.append(el('div','',text));sound('tick');},5500+i*350));
 later(()=>{b.say('One bite. For Zaidy.',{pose:'spoon',brows:'tender',mouth:'smile'});spoon.classList.add('retry');sound('airplane');},7300);
}

// ---------- git merge: the shidduch ----------
function merge(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Merge made by the shidduch strategy</h2>
 <svg class="merge-graph" viewBox="0 0 600 300" aria-hidden="true">
  <text x="20" y="66" class="branch-label">main (you)</text>
  <text x="20" y="244" class="branch-label gold-label">shidduch/lovely-girl-good-family</text>
  <path class="branch b-main" d="M20 90H300"/><path class="branch b-feature" d="M20 200H300"/>
  <path class="branch b-main later-path" d="M300 90H420"/><path class="branch b-feature later-path" d="M300 200C360 200 372 90 420 90"/>
  <path class="branch b-head later-path" d="M432 90H560"/><text x="566" y="94" class="branch-label head-label">HEAD</text>
  ${[[70,'learns'],[160,'works'],[250,'still single']].map(([x,t],i)=>`<g class="commit" style="--d:${.2+i*.35}s"><circle cx="${x}" cy="90" r="9" class="c-main"/><text x="${x}" y="122" class="commit-label">${t}</text></g>`).join('')}
  ${[[70,'kind'],[160,'bakes'],[250,'her father learns']].map(([x,t],i)=>`<g class="commit" style="--d:${.35+i*.35}s"><circle cx="${x}" cy="200" r="9" class="c-feature"/><text x="${x}" y="182" class="commit-label">${t}</text></g>`).join('')}
  <g class="chuppah"><path d="M378 140V44M462 140V44" stroke="#c9b28a" stroke-width="4"/><path d="M368 46Q420 18 472 46V54Q420 28 368 54Z" fill="#efe6f6"/><path d="M370 54q5 7 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0" stroke="#d6b77d" stroke-width="2" fill="none"/></g>
  <circle class="merge-node" cx="420" cy="90" r="13"/>
  <g class="glass"><path d="M410 -40h20l-3 26h-14z" fill="#f4f1f8"/><path d="M406 -26q14 8 28 0" stroke="#e2dbe9" stroke-width="4" fill="none"/></g>
  <g class="shards">${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<path d="M420 96l5-3 2 6z" style="--dx:${Math.round(Math.cos(a)*(50+(i%3)*25))}px;--dy:${Math.round(Math.sin(a)*(35+(i%4)*14))}px;--r:${i*47}deg"/>`;}).join('')}</g>
 </svg>`;
 const conflict=el('div','conflict');conflict.setAttribute('aria-hidden','true');
 [['c-head','CONFLICT (wedding): Merge conflict in chasuna.plan'],['c-mark','<<<<<<< HIS MOTHER'],['c-old','Lakewood. Small. Tasteful.'],['c-mark','======='],['c-old','Monsey. 600 people. Minimum.'],['c-mark','>>>>>>> HER MOTHER']].forEach(([cls,text])=>conflict.append(el('div',cls,text)));
 const tov=el('div','mazel-tov','MAZEL TOV!'),confetti=el('div','confetti');confetti.setAttribute('aria-hidden','true');
 confetti.innerHTML=Array.from({length:44},(_,i)=>`<i style="--x:${(i*23)%100}%;--d:${(1.6+(i%5)*.35).toFixed(2)}s;--delay:${((i*7)%10)/10}s;--c:${['#d6b77d','#bca3ef','#f3d7a3','#9edcb2','#ef8f9a'][i%5]};--r:${(i*53)%360}deg"></i>`).join('');
 const b=mountBubby(stage,ctx,{pose:'phone',brows:'up'});
 later(()=>b.say('I have someone for you.'),500);
 later(()=>{stage.append(conflict);sound('buzz');},2100);
 later(()=>b.say('Nobody asked the mothers.',{pose:'wag',brows:'stern',mouth:'pursed'}),3000);
 later(()=>{conflict.classList.add('resolving');const fix=el('div','c-new',"Bubby's backyard. Sunday. I'm making the fish.");conflict.append(fix);sound('tick');},3900);
 later(()=>{conflict.classList.add('resolved');stage.classList.add('merging');b.hush();b.set({pose:'dab',brows:'tender',mouth:'smile'});sound('whoosh');},5000);
 later(()=>{stage.classList.add('glass-drop');},6500);
 later(()=>{stage.classList.add('shattered');stage.append(tov,confetti);sound('shatter');later(()=>sound('klezmer'),350);},6900);
 later(()=>b.say('Next year, a little branch, im yirtzeh Hashem.',{pose:'rest',brows:'soft',mouth:'grin'}),8500);
}

// ---------- git bisect: who took the rugelach? ----------
const FACES={
 zaidy:'<path d="M14 34q16 30 32 0z" fill="#f2f0f4"/><rect x="12" y="10" width="36" height="5" rx="2" fill="#1b1a22"/><rect x="18" y="0" width="24" height="12" rx="3" fill="#1b1a22"/>',
 faigy:'<path d="M12 28q2-20 18-20t18 20q-6-8-18-8t-18 8z" fill="#3f8f8a"/><path d="M44 20q8 2 6 10" stroke="#3f8f8a" stroke-width="4" fill="none"/><circle cx="14" cy="36" r="2.5" fill="#d6b77d"/><circle cx="46" cy="36" r="2.5" fill="#d6b77d"/>',
 yanky:'<path d="M20 15q10-7 20 0z" fill="#3e5aa8"/><g fill="none" stroke="#2b2832" stroke-width="2"><circle cx="24" cy="31" r="5"/><circle cx="36" cy="31" r="5"/></g>',
 moishy:'<path d="M17 18q13-12 26 0" fill="#5a3b2a"/><path d="M15 30q-4 6 0 12M45 30q4 6 0 12" stroke="#5a3b2a" stroke-width="3" fill="none"/><circle cx="50" cy="44" r="5" fill="#ef6f8a"/><path d="M48 48l-6 6" stroke="#f1eaf7" stroke-width="2"/>',
 shloimy:'<path d="M12 32q2 26 18 26t18-26q-6 8-18 8t-18-8z" fill="#3b2a22"/><path d="M21 14q9-6 18 0z" fill="#1b1a22"/><g class="sugar" fill="#fff"><circle cx="22" cy="46" r="1.6"/><circle cx="30" cy="50" r="1.6"/><circle cx="37" cy="45" r="1.6"/><circle cx="27" cy="54" r="1.4"/><circle cx="34" cy="53" r="1.4"/></g>',
 mother:'<path d="M12 40q-2-30 18-30t18 30q-4-18-18-18t-18 18z" fill="#7a4b2c"/><circle cx="30" cy="52" r="1.6" fill="#fbf6ec"/>',
 neighbor:'<path d="M22 38q8 4 16 0" stroke="#4a3b33" stroke-width="3" fill="none"/>',
 you:'<path d="M8 50q0-44 22-44t22 44l-6 2q0-34-16-34T14 52z" fill="#4c4f63"/><path d="M12 30a18 18 0 0 1 36 0" stroke="#2b2832" stroke-width="3" fill="none"/><rect x="9" y="28" width="6" height="10" rx="2" fill="#2b2832"/><rect x="45" y="28" width="6" height="10" rx="2" fill="#2b2832"/>'
};
const face=(key,skin='#e6b896')=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="32" r="16" fill="${skin}"/><g fill="#3a2b2f"><circle cx="24" cy="31" r="1.8"/><circle cx="36" cy="31" r="1.8"/></g><path d="M25 39q5 3 10 0" stroke="#8a4b4f" stroke-width="1.8" fill="none" stroke-linecap="round"/>${FACES[key]}</svg>`;
const RUGELACH_TRAY=`<svg viewBox="0 0 220 70" aria-label="A tray of rugelach with one missing" role="img"><ellipse cx="110" cy="40" rx="104" ry="26" fill="#9ea3b2"/><ellipse cx="110" cy="38" rx="92" ry="20" fill="#c9cdd8"/>${Array.from({length:11},(_,i)=>{const x=36+i*14.8,y=34+(i%2)*8;return i===6?`<g fill="#e9dcc7"><circle cx="${x-3}" cy="${y}" r="1.4"/><circle cx="${x+3}" cy="${y+2}" r="1.1"/><circle cx="${x}" cy="${y-3}" r="1"/></g>`:`<path d="M${x-6} ${y+3}q6-12 12 0" stroke="#8a4b2a" stroke-width="5" fill="none" stroke-linecap="round"/>`;}).join('')}</svg>`;
function bisect(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Who took the rugelach?</h2><div class="tray">${RUGELACH_TRAY}<span>11 rugelach at 9:00. Now 10.</span></div>`;
 const people=[['zaidy','Zaidy','9:02','#efc6a6'],['faigy','Tante Faigy','9:40','#e6b896'],['yanky','Cousin Yanky','10:15','#f0c9a8'],['moishy','Little Moishy','10:30','#f3cfb0'],['shloimy','Uncle Shloimy','11:05','#e2b08e'],['mother','Your mother','11:30','#ecc3a4'],['neighbor','The neighbor','12:10','#d9a882'],['you','You','12:45','#e9bf9f']];
 const lineup=el('div','lineup');
 const cards=people.map(([key,name,time,skin],i)=>{const card=el('div','suspect');card.style.setProperty('--d',`${.25+i*.12}s`);card.innerHTML=`${face(key,skin)}<b></b><small></small><em class="verdict"></em>`;card.querySelector('b').textContent=name;card.querySelector('small').textContent=time;lineup.append(card);return card;});
 const term=el('div','bisect-term');term.setAttribute('aria-hidden','true');stage.append(lineup,term);
 const out=(text,cls='')=>{term.append(el('div',cls,text));while(term.children.length>7)term.firstElementChild.remove();sound('tick');};
 const b=mountBubby(stage,ctx,{pose:'rest',brows:'stern',mouth:'pursed'});
 later(()=>b.say('Somebody.'),400);
 ['$ git bisect start','$ git bisect bad          # now: 10','$ git bisect good 9:00    # 9:00: 11'].forEach((t,i)=>later(()=>out(t,'cmd'),1600+i*300));
 const test=(index,verdict,clear,at,message)=>{
  later(()=>{out(message);cards[index].classList.add('testing');},at);
  later(()=>{const card=cards[index];card.classList.remove('testing');card.classList.add(verdict);card.querySelector('.verdict').textContent=verdict==='good'?'good ✓':'bad ✗';sound(verdict==='good'?'good':'buzz');out(`[${people[index][2]}] ${people[index][1]}: ${verdict==='good'?'11':'10'} rugelach → ${verdict}`,verdict);},at+650);
  later(()=>clear.forEach(i=>cards[i].classList.add('cleared')),at+950);
 };
 test(3,'good',[0,1,2,3],2700,'Bisecting: 4 suspects left to test after this (roughly 2 steps)');
 test(5,'bad',[6,7],4100,'Bisecting: 1 suspect left to test after this (roughly 1 step)');
 test(4,'bad',[5],5500,'Bisecting: 0 suspects left to test after this (roughly 0 steps)');
 later(()=>{cards[4].classList.add('culprit');cards[4].querySelector('.verdict').textContent='first bad commit';stage.classList.add('accused');out('a7f3e2c is the first bad commit','bad');sound('doom');},6500);
 later(()=>b.say('I knew it.',{pose:'point',brows:'stern',mouth:'pursed'}),6900);
 later(()=>{const protest=el('div','protest','She GAVE it to me!');cards[4].append(protest);sound('scratch');b.hush();},8000);
 later(()=>{['Author:    Bubby <bubby@landline>','Committer: Uncle Shloimy','    Took one rugelach (to taste)'].forEach((t,i)=>later(()=>out(t,i===0?'reveal':''),i*260));},8700);
 later(()=>b.say("To taste! Tasting doesn't count.",{pose:'shrug',brows:'up',mouth:'o'}),9800);
}

// ---------- git blame: nobody is blaming ----------
const FINGER='<svg viewBox="0 0 44 16" aria-hidden="true"><path d="M10 8h30" stroke="#e6b896" stroke-width="5" stroke-linecap="round"/><circle cx="9" cy="9" r="8" fill="#e6b896"/></svg>';
function blame(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Nobody is blaming</h2><span class="scene-label bubby-label">git blame kugel-incident.txt</span>`;
 const family=[['shloimy','Uncle Shloimy','#e2b08e'],['faigy','Tante Faigy','#e6b896'],['yanky','Cousin Yanky','#f0c9a8'],['zaidy','Zaidy','#efc6a6'],['mother','Your mother','#ecc3a4']];
 const row=el('div','blame-family');
 const cards=family.map(([key,name,skin],i)=>{const card=el('div','blamer');card.style.setProperty('--d',`${.2+i*.12}s`);card.innerHTML=`${face(key,skin)}<b></b><i class="finger">${FINGER}</i>`;card.querySelector('b').textContent=name;row.append(card);return card;});
 const you=el('div','blamer you-card');you.innerHTML=`${face('you','#e9bf9f')}<b>You</b>`;
 const table=el('div','blame-table');table.setAttribute('aria-hidden','true');
 const rows=['The kugel was burnt.','Someone turned the oven up.','Someone left the door open.','Someone forgot to call Bubby.'].map((text,i)=>{
  const line=el('div','blame-row'),who=el('span','who',family[i][1]);
  line.append(el('span','sha',hex(i+40)),' (',who,`  2019-04-20  ${i+1}) `,el('span','text',text));line.style.setProperty('--d',`${i*.3}s`);table.append(line);return who;
 });
 stage.append(row,table);
 const aim=(card,target)=>{const s=stage.getBoundingClientRect(),a=card.getBoundingClientRect(),b=target.getBoundingClientRect();card.style.setProperty('--a',`${Math.atan2(b.top+b.height/2-(a.top+a.height*.4),b.left+b.width/2-(a.left+a.width/2))}rad`);card.classList.add('pointing');void s;};
 const order=[0,1,2,3,4,0,2,4,1,3,0,1,2,3,4];
 let at=2200;
 order.forEach((accuser,step)=>{
  const accused=(accuser+1+(step%3===2?1:0))%5;
  later(()=>{
   cards.forEach(c=>c.classList.remove('pointing','accused'));aim(cards[accuser],cards[accused]);cards[accused].classList.add('accused');
   const who=rows[step%4];who.textContent=family[accused][1];retrigger(who,'flash');sound(step<5?'buzz':'tick');
  },at);
  at+=Math.max(170,620-step*55);
 });
 later(()=>{
  stage.append(you);cards.forEach(c=>c.classList.remove('accused'));
  later(()=>{cards.forEach(c=>aim(c,you));you.classList.add('accused');rows.forEach(who=>{who.textContent='You';who.classList.add('you');});sound('doom');},250);
 },at+100);
 later(()=>{const b=mountBubby(stage,ctx,{pose:'rest',brows:'up',mouth:'smile'});later(()=>b.say("Blame? Who's blaming? I'm just saying."),300);later(()=>b.say('Since you moved out, the kugel burns.',{brows:'tender',mouth:'pursed'}),2500);},at+900);
}

// ---------- git cherry-pick: Bubby at the fruit stand ----------
const CHERRY=(extra='')=>`<svg viewBox="0 0 40 50" aria-hidden="true"><path d="M20 22Q22 9 30 3" stroke="#5d7a3a" stroke-width="2.5" fill="none"/><path d="M30 3q9 2 9 11q-9-1-9-11z" fill="#7fb35a"/><circle cx="20" cy="34" r="14" fill="#c8243c"/><circle cx="14" cy="29" r="4" fill="#f28a9b" opacity=".7"/>${extra}</svg>`;
const CRATE=`<svg viewBox="0 0 240 130" aria-label="A crate of cherries, twelve dollars a pound" role="img"><g fill="#c8243c">${Array.from({length:17},(_,i)=>`<circle cx="${34+(i%9)*22+(i>8?11:0)}" cy="${i>8?40:52}" r="12"/>`).join('')}</g><g fill="#f28a9b" opacity=".6">${Array.from({length:17},(_,i)=>`<circle cx="${30+(i%9)*22+(i>8?11:0)}" cy="${(i>8?40:52)-4}" r="3"/>`).join('')}</g><path d="M14 56h212l-12 70H26z" fill="#a8743f"/><path d="M18 76h204M22 98h196" stroke="#7e5428" stroke-width="5"/><path d="M196 10v50" stroke="#7e5428" stroke-width="3"/><rect x="170" y="2" width="56" height="28" rx="3" fill="#fbf6ec" transform="rotate(6 198 16)"/><text x="198" y="22" text-anchor="middle" transform="rotate(6 198 16)" font-family="Georgia,serif" font-size="14" fill="#b33951">$12/lb</text></svg>`;
function cherryPick(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Bubby at the fruit stand</h2><div class="crate">${CRATE}</div><div class="bowl"><svg viewBox="0 0 120 50" aria-hidden="true"><path d="M8 14h104q-6 34-52 34T8 14z" fill="#e9e4ee"/><ellipse cx="60" cy="14" rx="52" ry="7" fill="#cfc6da"/></svg><span>main</span></div>`;
 const out=el('div','pick-output');out.setAttribute('aria-hidden','true');out.append(el('div','cmd','$ git cherry-pick 3f2a9c1 a7e10b2 c41d7e8 4e1f2a7'));stage.append(out);
 const b=mountBubby(stage,ctx,{pose:'rest',brows:'stern',mouth:'pursed'});
 later(()=>b.say('Let me see.'),400);
 const picks=[
  {extra:'<ellipse cx="25" cy="39" rx="6" ry="4" fill="#5a1a24" opacity=".85"/>',line:'Bruised.',err:'3f2a9c1... cherry (bruised)',mood:{brows:'stern',mouth:'pursed'}},
  {extra:'<g fill="#fff"><circle cx="15" cy="33" r="3.6"/><circle cx="25" cy="33" r="3.6"/></g><g fill="#1b1a22"><circle cx="17.5" cy="33" r="1.8"/><circle cx="27.5" cy="33" r="1.8"/></g><path d="M12 27l6 2M28 26l-5 2" stroke="#5a1a24" stroke-width="1.5"/><path d="M16 41q4-2 8 0" stroke="#5a1a24" stroke-width="1.5" fill="none"/>',line:"This one's looking at me funny.",err:'a7e10b2... cherry (attitude)',mood:{brows:'up',mouth:'o'}},
  {extra:'',line:'Too soft.',err:'c41d7e8... cherry (too soft)',mood:{brows:'stern',mouth:'pursed'},squish:true},
  {extra:'',line:'This one. This one is perfect.',perfect:true,mood:{brows:'tender',mouth:'grin'}}
 ];
 const home=[[18,62],[26,60],[34,63],[42,61]];
 const schedule=[1400,3000,5700,7200];
 picks.forEach((pick,i)=>{
  const cherry=el('div','cherry');cherry.innerHTML=CHERRY(pick.extra);cherry.style.left=`${home[i][0]}%`;cherry.style.top=`${home[i][1]}%`;stage.append(cherry);
  const t=schedule[i];
  later(()=>{cherry.classList.add('lifted','inspect');cherry.style.left='42%';cherry.style.top='30%';sound('whoosh');},t);
  later(()=>{b.say(pick.line,pick.mood);if(pick.squish)cherry.classList.add('squish');},t+400);
  if(pick.perfect){
   later(()=>{cherry.classList.add('perfect');sound('ding');},t+500);
   later(()=>{cherry.classList.remove('inspect');cherry.style.left='60%';cherry.style.top='70%';out.append(el('div','ok','[main 4e1f2a7] one perfect cherry'),el('div','ok',' 1 file changed, 1 insertion(+)'));sound('good');},t+1500);
  }else{
   later(()=>{out.append(el('div','err','error: could not apply '+pick.err));sound('buzz');},t+600);
   later(()=>{cherry.classList.remove('inspect');cherry.classList.add('tossed');cherry.style.left=`${home[i][0]+6}%`;cherry.style.top='64%';},t+(i===1?2300:1300));
  }
 });
 later(()=>b.say("Twelve dollars a pound? I'll take one.",{pose:'shrug',brows:'up',mouth:'smile'}),9700);
}

// ---------- git reset --hard: life is hard, eat ----------
const SOUP=`<svg viewBox="0 0 220 150" aria-label="A bowl of chicken soup with matzah balls" role="img"><ellipse cx="110" cy="128" rx="104" ry="16" fill="#f4eef6" opacity=".9"/><path d="M14 128q8-6 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0" stroke="#e5dcea" stroke-width="3" fill="none"/><g class="steam"><path d="M80 40q-8-10 0-20t0-20M110 34q-8-10 0-20t0-20M140 40q-8-10 0-20t0-20" stroke="#efe7f5" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/></g><path d="M34 62h152q-4 58-76 60-72-2-76-60z" fill="#f7f4fa"/><path d="M36 74h148" stroke="#5f7fc0" stroke-width="4"/><ellipse cx="110" cy="62" rx="76" ry="15" fill="#e3b552"/><ellipse cx="110" cy="62" rx="70" ry="12" fill="#f0c862"/><g class="kneidel k1"><circle cx="88" cy="60" r="13" fill="#efdcae"/><circle cx="84" cy="56" r="3" fill="#f9edd0"/></g><g class="kneidel k2"><circle cx="128" cy="62" r="12" fill="#e9d29f"/><circle cx="124" cy="58" r="3" fill="#f9edd0"/></g><g fill="#ef8f3d"><circle cx="66" cy="64" r="4"/><circle cx="150" cy="58" r="4"/><circle cx="108" cy="68" r="3.5"/></g><g fill="#6aa65a"><circle cx="72" cy="58" r="1.5"/><circle cx="146" cy="66" r="1.5"/><circle cx="104" cy="56" r="1.5"/></g></svg>`;
function resetHard(stage,ctx){
 const {later,sound}=ctx;
 stage.innerHTML=`<h2 class="visually-hidden">Life is hard. Eat.</h2><svg class="crack" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true"><path d="M300 200l-40-30-30 8-50-60M300 200l60-20 20-50 70-30M300 200l-20 60-60 30-30 70M300 200l50 40 10 60 70 40M300 200l-90 10-80-20"/></svg>`;
 const status=el('div','tree-status');status.setAttribute('aria-hidden','true');
 [['','On branch main'],['','Changes not staged for commit:'],['mod','  modified:   thesis.js              (6 hours)'],['mod','  modified:   startup-idea.md        (3 years)'],['mod','  modified:   apology-to-bubby.txt   (draft 4)'],['','Untracked files:'],['mod','  feelings.txt'],['cmd','$ git reset --hard']].forEach(([cls,text],i)=>{const line=el('div',cls,text);line.style.setProperty('--d',`${i*.12}s`);line.style.setProperty('--fall',`${(i*.07).toFixed(2)}s`);line.style.setProperty('--spin',`${((i*29)%40)-20}deg`);status.append(line);});
 const dark=el('div','blackout');dark.innerHTML='<span class="gone"></span><i class="dark-cursor"></i>';
 const lamp=el('div','lamp');lamp.setAttribute('aria-hidden','true');
 const soup=el('figure','soup');soup.innerHTML=SOUP;
 const restore=el('div','restore');restore.innerHTML='<div class="restore-label">Restoring neshama…</div><div class="restore-bar"><i></i></div>';
 stage.append(status);
 later(()=>sound('tick'),900);
 later(()=>{stage.classList.add('cracked');sound('crack');},1700);
 later(()=>{stage.classList.add('crumble');},2000);
 later(()=>{stage.append(dark);stage.classList.add('dark');},3000);
 later(()=>{dark.querySelector('.gone').textContent='everything is gone.';},3400);
 later(()=>sound('knock'),4300);
 later(()=>{stage.classList.add('warm');stage.append(lamp,soup);sound('warm');},4900);
 later(()=>{const bubby=mountBubby(stage,ctx,{pose:'rest',brows:'tender'});stage.append(restore);
  [['warmth','restored'],['perspective','restored'],['your 6 hours','gone, sweetheart']].forEach(([a,c],i)=>later(()=>{const row=el('div','restore-row'+(i===2?' lost':''));row.append(el('span','',a),el('span','',c));restore.append(row);sound(i===2?'buzz':'good');},500+i*550));
  later(()=>bubby.say('Hard? Life is hard. Eat.',{brows:'soft'}),1300);
  later(()=>bubby.say('The code, you\'ll write again. The soup gets cold.',{brows:'tender',mouth:'pursed'}),3500);
 },5300);
}

const SCENES={log,diff,push,'push-force':pushForce,merge,blame,bisect,'cherry-pick':cherryPick,'reset-hard':resetHard};
export function animateBubby(command,scene,helpers){
 scene.className=`scene bubby-scene bubby-${command.id} scene-enter`;scene.hidden=false;scene.replaceChildren();
 const stage=el('div','bubby-stage');scene.append(stage);
 SCENES[command.id](stage,helpers);
}

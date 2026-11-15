const candle = '<div class="candle"><i class="flame"></i></div>';
const fish = `<svg class="fish-svg" viewBox="0 0 300 180" aria-label="A gefilte fish with a carrot garnish" role="img"><defs><linearGradient id="fishbody" x2="0" y2="1"><stop stop-color="#eddfb9"/><stop offset="1" stop-color="#b6a17c"/></linearGradient></defs><ellipse cx="148" cy="142" rx="118" ry="18" fill="#bad9db"/><ellipse cx="148" cy="138" rx="108" ry="14" fill="#6c9b9f"/><path d="M67 100Q70 45 150 48Q225 48 231 105Q220 140 145 139Q65 139 67 100Z" fill="url(#fishbody)"/><path d="M90 85q25-17 45-12m20 35q25-12 45-6m-90 17 20 3" stroke="#a99673" stroke-width="3" fill="none" opacity=".5"/><ellipse cx="151" cy="54" rx="30" ry="11" fill="#e88b38"/><ellipse cx="151" cy="52" rx="21" ry="6" fill="#f8ad57"/><circle cx="151" cy="52" r="3" fill="#cf7428"/><circle cx="82" cy="98" r="4" fill="#473d36"/><path d="m71 111 12 3" stroke="#685944" fill="none" stroke-width="2"/><path d="m215 127 24-14-5 20" fill="#b4d4a2"/></svg>`;
export function animate(command,scene,{later,sound,reduced,stopSound}){
 const sounds={shabbos:'shabbos',shmak:'celebrate',valt:'alarm','filter-fish':'bubble',morgen:'wake',nacht:'sleep',voch:'voch',yomtov:'celebrate',zuntight:'sneeze',gezunt:'health'};
 if(command.id!=='zuntight')sound(sounds[command.id]);
 scene.className=`scene ${command.id} scene-enter`;scene.hidden=false;
 const heading=t=>`<h2>${t}</h2>`;
 switch(command.id){
 case 'shabbos':scene.innerHTML=`<span class="scene-label">THE WORLD CAN WAIT</span><div class="candle-set">${candle}${candle}</div>${heading('GIT SHABBOS!')}<p>All processes have been suspended for Shabbos.</p><a class="source" href="https://open.spotify.com/track/24nzik8ZBcQltLkJAO0hBd" target="_blank" rel="noopener">Listen on Spotify · Joey Newcomb · How Aw Ya Reb Yid! ↗</a>`;break;
 case 'shmak':scene.innerHTML=`<canvas aria-hidden="true"></canvas><span class="scene-label">THIS CALLS FOR A CELEBRATION</span>${heading('GITSHMACK!')}<p>Simcha successfully deployed.</p>`;if(!reduced)fireworks(scene.querySelector('canvas'),later);break;
 case 'valt':scene.innerHTML=`<div class="warning-icon">⚠</div><div class="error-stack">ERR_TOO_MUCH_TZORES<br>panic: bubby has entered the chat<br>reassurance.service not found</div>${heading('GITVALT!')}<p>Attempting to remain calm…</p>`;scene.closest('.terminal').classList.add('panic');later(()=>{scene.closest('.terminal').classList.remove('panic');scene.querySelector('p').textContent='False alarm. Everything is fine.';scene.querySelector('.error-stack').textContent='All systems recovered.';},3400);break;
 case 'filter-fish':scene.innerHTML=`<div class="filter-lines"></div>${Array.from({length:12},(_,i)=>`<i class="bubble" style="--x:${i*9}%;--d:${3+i%4}s"></i>`).join('')}${fish}<h2 aria-live="polite">GIT FILTER FISH!</h2>`;later(()=>{stopSound();scene.querySelector('h2').textContent="I think that's borer.";},3100);break;
 case 'morgen':scene.innerHTML=`<div class="sun"></div>${heading('Git morgen.')}<p>A peaceful start to the day.</p>`;later(()=>{scene.classList.add('entrance');scene.innerHTML=`<span class="scene-label">AND NOW, WE’RE AWAKE</span>${heading('RABOISAI!<br>AH!!!')}<a class="source" href="https://mdydaf.com/" target="_blank" rel="noopener">Visit R’ Eli Stefansky’s MDY ↗</a>`;},command.duration / 2);break;
 case 'nacht':scene.innerHTML=`${Array.from({length:30},(_,i)=>`<span class="star" style="--x:${(i*37)%100}%;--y:${(i*23)%75}%;--d:${2+i%4}s">${i%3?'·':'✧'}</span>`).join('')}<div class="moon"></div><span class="zzz">z z z</span>${heading('Git nacht.')}<p>Your bugs will be waiting in the morning.</p>`;break;
 case 'voch':scene.innerHTML=havdalahScene();pourHavdalahWax(scene,{later,reduced});break;
 case 'yomtov':scene.innerHTML=`<div class="garland">${'<span>◆</span>'.repeat(12)}</div><span class="scene-label">A FESTIVE LITTLE RELEASE</span><div class="holiday-art" aria-hidden="true">🍷 ✦ 🕯</div>${heading('GIT YOM TOV!')}<p>May your simcha have no merge conflicts.</p>`;break;
 case 'zuntight':scene.innerHTML=`<span class="scene-label">AN UNEXPECTED INTERRUPTION</span><svg class="sneezer" viewBox="0 0 240 210" role="img" aria-label="A person sneezing into a tissue"><path d="M53 210q2-70 67-70t67 70" fill="#9e83c7"/><path d="M70 79q-8-58 50-58t50 58" fill="#433348"/><ellipse cx="120" cy="91" rx="48" ry="56" fill="#e5b395"/><path d="m91 87 17 6m41-6-17 6" fill="none" stroke="#5f3e3c" stroke-width="4" stroke-linecap="round"/><path d="m119 90-5 22h12" fill="none" stroke="#ba816e" stroke-width="3"/><ellipse cx="120" cy="129" rx="12" ry="10" fill="#70454d"/><path class="tissue" d="m101 116 42 8 18 37-45 7-27-26Z" fill="#f3edf5"/><path d="m79 189 27-48m55 48-27-42" stroke="#e5b395" stroke-width="19" stroke-linecap="round"/></svg><h2>GIT-ZUNTIGHT!</h2><p class="sneeze-caption">Ah… ah…</p><div class="sneeze-puff" aria-hidden="true">✧ · ✦ · ✧</div>`;later(()=>{scene.classList.add('achoo');scene.querySelector('.sneeze-caption').textContent='ACHOO!';sound('sneeze');},1100);later(()=>{scene.querySelector('.sneeze-caption').textContent='';},2300);break;
 case 'gezunt':scene.innerHTML=`<span class="scene-label">NESHAMA DIAGNOSTICS v1.0</span><svg class="ecg" viewBox="0 0 600 100" aria-hidden="true"><path d="M0 60H130l15-15 15 15h35l15-20 15 48 22-80 22 65 15-13h70l15-15 15 15h35l15-20 15 48 22-80 22 65 15-13h100"/></svg><div class="progress"></div><div class="diagnostics">${[['Neshama','Operational'],['Simcha','100%'],['Tzores','Acceptable'],['Git repository','Bli ayin hara']].map(([a,b],i)=>`<div style="--delay:${i*.8}s">${a}<span>${b}</span></div>`).join('')}</div><h2>GIT GEZUNT!</h2>`;break;
 }
}
function fireworks(canvas,later){
 const ctx=canvas.getContext('2d');if(!ctx)return;const width=canvas.parentElement.clientWidth,height=canvas.parentElement.clientHeight;canvas.width=width*devicePixelRatio;canvas.height=height*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);let particles=[],tick=0;
 function frame(){ctx.clearRect(0,0,width,height);if(tick%18===0){const x=Math.random()*width,y=30+Math.random()*height*.6,hue=Math.random()*360;for(let i=0;i<65;i++){const angle=i/65*Math.PI*2,speed=1+Math.random()*4;particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1,hue:hue+Math.random()*35});}}particles=particles.filter(p=>p.life>0);for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.life-=.014;ctx.fillStyle=`hsla(${p.hue},85%,72%,${p.life})`;ctx.fillRect(p.x,p.y,2.5,2.5);}tick++;later(frame,1000/30);}frame();
}

function havdalahScene(){
 const letters=[
  'M132 258C109 240 84 253 84 276C84 302 117 307 133 290V278H113',
  'M153 252H173M163 252V300M153 300H173',
  'M190 252H226M208 252V300',
  'M258 252L276 300L294 252',
  'M331 251C301 251 301 301 331 301C361 301 361 251 331 251',
  'M401 258C375 236 355 259 360 282C364 302 386 307 402 292',
  'M424 252V300M456 252V300M424 276H456',
  'M485 252V281M485 298V300'
 ];
 return `<div class="havdalah-stage"><h2 class="visually-hidden">GIT VOCH!</h2><span class="scene-label havdalah-label">A LITTLE LIGHT FOR THE WEEK AHEAD</span>
 <svg class="wax-scene" viewBox="0 0 600 350" aria-hidden="true">
 <defs>
 <linearGradient id="havdalah-wax" x1="0" x2="1"><stop stop-color="#b18ab7"/><stop offset=".4" stop-color="#f6dfb5"/><stop offset=".7" stop-color="#e6bb8b"/><stop offset="1" stop-color="#a57cb0"/></linearGradient>
 <linearGradient id="havdalah-flame" x2="0" y2="1"><stop stop-color="#fff8de"/><stop offset=".6" stop-color="#ffd37c"/><stop offset="1" stop-color="#ad8bfa"/></linearGradient>
 <pattern id="havdalah-braid" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="url(#havdalah-wax)"/><path d="M-15 0L30 45M0-15L45 30" stroke="#a477a6" stroke-width="9"/><path d="M-15 30L30-15M0 45L45 0" stroke="#f2d6ab" stroke-width="7"/></pattern>
 <clipPath id="candle-burn-clip"><rect class="candle-burn-clip" x="275" y="65" width="50" height="134"/></clipPath>
 <filter id="wax-puddle-shadow" x="-10%" y="-30%" width="120%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="1"/><feOffset dy="2"/><feComponentTransfer><feFuncA type="linear" slope=".4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 </defs>
 <ellipse cx="300" cy="312" rx="224" ry="14" fill="#eac494" opacity=".07"/>
 <g class="wax-letter-guides" visibility="hidden">${letters.map(d=>`<path d="${d}"/>`).join('')}</g>
 <g class="landed-wax" fill="#edcc9e" filter="url(#wax-puddle-shadow)"></g>
 <g class="wax-highlights" fill="#fff4d9" opacity=".25"></g>
 <g class="pouring-candle">
 <g clip-path="url(#candle-burn-clip)"><rect x="277" y="65" width="46" height="134" rx="8" fill="url(#havdalah-braid)"/></g>
 <g class="candle-rim"><path d="M280 69Q287 63 294 69T310 69T320 69" fill="none" stroke="#fff0cd" stroke-width="6" stroke-linecap="round"/>
 <path class="candle-side-wax" d="M280 70Q276 92 282 108M318 70Q324 87 317 96" fill="none" stroke="#efd6b0" stroke-width="4" stroke-linecap="round"/>
 <path d="M286 67V57M300 65V52M314 67V57" stroke="#51404e" stroke-width="2"/>
 ${[286,300,314].map((x,i)=>`<g transform="translate(${x} ${i===1?48:53})"><path class="wax-flame" style="--flame-delay:${i*.22}s" d="M0 7C-15-2-7-19 0-28C2-15 15-2 0 7Z" fill="url(#havdalah-flame)"/></g>`).join('')}
 </g></g>
 <g class="wax-in-flight" fill="#f2d5aa"></g>
 <g class="wax-impact-ripples" fill="none" stroke="#f8e0bc" stroke-width="1"/>
 </svg>
 <a class="source havdalah-source" target="_blank" rel="noopener" href="https://open.spotify.com/album/3moAWbawu9U7U5d568ZD2A">Listen to Joey Newcomb · A Gutte Voch ↗</a></div>`;
}

function pourHavdalahWax(scene,{later,reduced}){
 const svg=scene.querySelector('.wax-scene');
 const landed=svg.querySelector('.landed-wax'),highlights=svg.querySelector('.wax-highlights');
 const airborne=svg.querySelector('.wax-in-flight'),ripples=svg.querySelector('.wax-impact-ripples');
 const candle=svg.querySelector('.pouring-candle'),rim=svg.querySelector('.candle-rim');
 const clip=svg.querySelector('.candle-burn-clip');
 const ns='http://www.w3.org/2000/svg';
 const make=(tag,attributes,parent)=>{const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attributes))node.setAttribute(key,value);parent.append(node);return node;};
 // Hidden paths supply landing coordinates only. No letter strokes are revealed.
 const targets=[];
 svg.querySelectorAll('.wax-letter-guides path').forEach((path,letter)=>{
  const length=path.getTotalLength(),count=Math.ceil(length/5.5);
  for(let i=0;i<=count;i++){
   const point=path.getPointAtLength(length*i/count);
   targets.push({x:point.x,y:point.y,letter});
  }
 });
 function melt(progress){
  const burned=progress*95;
  clip.setAttribute('y',65+burned);clip.setAttribute('height',134-burned);
  rim.setAttribute('transform',`translate(0 ${burned})`);
 }
 function deposit(target,time,index){
  const radius=5.1+(index%3)*.25;
  const bead=make('ellipse',{cx:target.x,cy:target.y,rx:reduced?radius:2,ry:reduced?radius:1},landed);
  const shine=make('ellipse',{cx:target.x-1,cy:target.y-2,rx:1.8,ry:.7,opacity:reduced?.65:0},highlights);
  const ripple=reduced?null:make('ellipse',{cx:target.x,cy:target.y,rx:4,ry:2,opacity:.5},ripples);
  return {bead,shine,ripple,time,radius};
 }
 if(reduced){targets.forEach((target,i)=>deposit(target,0,i));melt(1);candle.setAttribute('transform','translate(185 0)');return;}
 const drops=[],puddles=[];let emitted=0,candleX=300,lastTime=0;
 const started=performance.now(),firstDrop=1000,pourDuration=7300,flight=580;
 function frame(){
  if(!scene.isConnected)return;
  const elapsed=performance.now()-started,dt=Math.min(60,elapsed-lastTime);lastTime=elapsed;
  const pouring=Math.max(0,Math.min(1,(elapsed-firstDrop)/pourDuration));
  melt(pouring);
  const next=targets[Math.min(targets.length-1,Math.floor(pouring*(targets.length-1)))];
  // The candle glides over each landing site while the braid keeps its proportions.
  const desired=elapsed<firstDrop?targets[0].x:next.x;
  candleX+=(desired-candleX)*(1-Math.exp(-dt/170));
  candle.setAttribute('transform',`translate(${candleX-300} 0)`);
  while(emitted<targets.length&&elapsed>=firstDrop+emitted/targets.length*pourDuration){
   const target=targets[emitted],node=make('path',{d:'M0-7C-2-3-4 0-4 3A4 4 0 0 0 4 3C4 0 2-3 0-7Z'},airborne);
   drops.push({node,target,start:firstDrop+emitted/targets.length*pourDuration,x:candleX,y:201,index:emitted});emitted++;
  }
  for(let i=drops.length-1;i>=0;i--){
   const drop=drops[i],t=Math.min(1,(elapsed-drop.start)/flight);
   if(t>=1){drop.node.remove();puddles.push(deposit(drop.target,elapsed,drop.index));drops.splice(i,1);continue;}
   const x=drop.x+(drop.target.x-drop.x)*t,y=drop.y+(drop.target.y-drop.y)*t*t;
   const neck=t<.16?.55+t*3:1;
   drop.node.setAttribute('transform',`translate(${x} ${y}) scale(${neck} ${1+.4*t})`);
  }
  for(const puddle of puddles){
   const age=elapsed-puddle.time,t=Math.min(1,age/360),ease=1-Math.pow(1-t,3);
   puddle.bead.setAttribute('rx',2+(puddle.radius-2)*ease);
   puddle.bead.setAttribute('ry',1+(puddle.radius-1)*ease);
   puddle.shine.setAttribute('opacity',.65*ease);
   if(puddle.ripple){puddle.ripple.setAttribute('rx',4+t*8);puddle.ripple.setAttribute('ry',2+t*2);puddle.ripple.setAttribute('opacity',.5*(1-t));if(t===1){puddle.ripple.remove();puddle.ripple=null;}}
  }
  if(elapsed<firstDrop+pourDuration+flight+400)later(frame,1000/30);
 }
 frame();
}

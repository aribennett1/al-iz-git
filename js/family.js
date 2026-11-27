// The family group chat. Everything you type in the terminal also goes to the
// family group, and the family has opinions. Who says what is in
// family-script.js; this file does the timing and the rendering.
//
// The chat keeps its own timers instead of the app's `later`. The app stops
// every scene when its duration ends, and the family is never done talking by
// then. A new event still cancels whatever the family had pending, the same
// way switching commands cancels a scene. Every node is built with
// textContent, and nothing anyone types is executed. The chat makes no sound.
import {cast,group,seed,scripts,pools,renames} from './family-script.js';

const LIMIT=80,LATE_GAP=8000,REPEAT_WINDOW=120000,SPAM_WINDOW=15000,SPAM_COUNT=4,LOCK_FOR=20000,AWAY=30000;
const pick=list=>list[Math.floor(Math.random()*list.length)];
const clock=()=>new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!=null)node.textContent=text;return node;}
const resolve=(value,context)=>typeof value==='function'?value(context):value;
// Fill in any text that depends on the moment: the time, the shared link, the group name.
function prepare(messages,context){
 return messages.map(m=>{const copy={...m};for(const key of ['text','forward','system','flowers'])if(key in copy)copy[key]=resolve(copy[key],context);return copy;});
}

export function createFamilyChat({root}){
 if(!root)return {react(){},stop(){}};
 const wide=matchMedia('(min-width:1360px)');
 let collapsed=false;try{collapsed=localStorage.getItem('al-iz-git:family-collapsed')==='1';}catch{/* Private windows still get the chat. */}
 let open=false,unread=seed.length,name=group.name,locked=false,posted=0,lastSender=null;
 let queue=[],busy=false,typingNode=null,timers=new Set(),generation=0;
 let last={event:null,at:0},sent=[],spammed=false,lateAt=0,hiddenAt=0;
 const once=new Set(),renamed=new Set();
 let idleTimers=[],unlockTimer=0,toastTimer=0;

 const members=`${Object.values(cast).slice(0,4).map(c=>c.name).join(', ')}, +${group.members-4}`;
 const footerText={open:'🔒 Reply in the terminal. Ma reads everything.',locked:'🔒 Only admins can send messages. Ma is the admin.'};

 const panel=el('section','family-panel');panel.id='family-panel';
 const header=el('header','family-header');
 const avatar=el('span','family-avatar','🕯️');avatar.setAttribute('aria-hidden','true');
 const titles=el('div','family-titles'),title=el('strong','family-name',name),status=el('span','family-status',members);
 titles.append(title,status);
 const close=el('button','family-close','×');close.type='button';close.setAttribute('aria-label','Close the family chat');
 header.append(avatar,titles,close);
 const log=el('div','family-log');log.setAttribute('role','log');log.setAttribute('aria-live','off');log.tabIndex=0;
 const footer=el('p','family-footer',footerText.open);
 panel.append(header,log,footer);
 const fab=el('button','family-fab');fab.type='button';fab.setAttribute('aria-controls','family-panel');
 const fabIcon=el('span','family-fab-icon','💬');fabIcon.setAttribute('aria-hidden','true');
 const badge=el('span','family-badge');badge.setAttribute('aria-hidden','true');
 fab.append(fabIcon,badge);
 const toast=el('button','family-toast');toast.type='button';toast.hidden=true;
 root.replaceChildren(panel,fab,toast);

 // Docked beside the terminal on wide screens, a floating button everywhere else.
 const visible=()=>wide.matches?!collapsed:open;
 function layout(){
  root.classList.toggle('docked',wide.matches);root.classList.toggle('collapsed',collapsed);root.classList.toggle('open',open);
  const shown=visible();panel.hidden=!shown;fab.hidden=shown;
  if(shown){unread=0;toast.hidden=true;log.scrollTop=log.scrollHeight;}
  badge.textContent=unread>99?'99+':String(unread);badge.hidden=!unread;
  fab.setAttribute('aria-label',`Open the family chat${unread?`, ${unread} unread`:''}`);
 }
 function show(){if(wide.matches){collapsed=false;remember();}else open=true;layout();close.focus();}
 function hide(){if(wide.matches){collapsed=true;remember();}else open=false;layout();fab.focus();}
 function remember(){try{localStorage.setItem('al-iz-git:family-collapsed',collapsed?'1':'0');}catch{/* Not saved; still works. */}}
 close.addEventListener('click',hide);fab.addEventListener('click',show);toast.addEventListener('click',show);
 // Esc closes the drawer only while focus is inside it, so it never fights Esc-to-interrupt.
 panel.addEventListener('keydown',event=>{if(event.key==='Escape'&&!wide.matches){event.stopPropagation();hide();}});
 wide.addEventListener('change',()=>{open=false;layout();});

 function later(fn,delay){const version=generation;const id=setTimeout(()=>{timers.delete(id);if(version===generation)fn();},delay);timers.add(id);}
 function cancel(){generation++;for(const id of timers)clearTimeout(id);timers.clear();queue=[];busy=false;hideTyping();}

 // A voice message nobody will play. Tapping it shows what Bubby said.
 function voice(length,transcript){
  const wrap=el('div','family-voice-wrap');
  const button=el('button','family-voice');button.type='button';button.setAttribute('aria-expanded','false');
  const row=el('span','family-voice-row'),mic=el('span','family-mic','🎤'),wave=el('span','family-wave');
  mic.setAttribute('aria-hidden','true');wave.setAttribute('aria-hidden','true');
  for(let i=0;i<28;i++){const bar=el('i');bar.style.height=`${24+(i*37%11)*6+(i%3)*5}%`;wave.append(bar);}
  const label=el('span','family-transcript-toggle','View transcript');
  row.append(mic,wave,el('span','family-length',length));button.append(row,label);
  const text=el('p','family-transcript',transcript);text.hidden=true;
  button.setAttribute('aria-label',`Voice message, ${length}. View transcript`);
  button.addEventListener('click',()=>{
   text.hidden=!text.hidden;button.setAttribute('aria-expanded',String(!text.hidden));
   label.textContent=text.hidden?'View transcript':'Hide transcript';
   button.setAttribute('aria-label',`Voice message, ${length}. ${label.textContent}`);
   if(!text.hidden)text.scrollIntoView({block:'nearest'});
  });
  wrap.append(button,text);return wrap;
 }
 function flowers({title:heading,line}){
  const card=el('div','family-flowers');card.setAttribute('role','img');card.setAttribute('aria-label',`A flower picture: ${heading}. ${line}`);
  for(const [x,y,delay] of [[12,18,0],[84,12,.5],[22,74,.9],[78,70,.3]]){const sparkle=el('span','family-sparkle','✦');sparkle.style.cssText=`left:${x}%;top:${y}%;animation-delay:${delay}s`;card.append(sparkle);}
  card.append(el('span','family-flowers-row','🌹🌸🌷🌸🌹'),el('strong','family-flowers-title',heading),el('span','family-flowers-line',line));
  for(const child of card.children)child.setAttribute('aria-hidden','true');
  return card;
 }
 function heart(node){const reaction=el('span','family-heart','❤️');reaction.setAttribute('aria-label','Bubby reacted with a heart');node.classList.add('hearted');node.append(reaction);}

 function render(m,time){
  if(m.system||m.rename){
   const line=m.rename?`${cast[m.by].name} changed the group name to "${m.rename}"`:m.system;
   lastSender=null;return {node:el('div','family-system',line),preview:line};
  }
  if(m.you){
   const node=el('div','family-msg family-you'),meta=el('span','family-meta',time+' '),ticks=el('span','family-ticks','✓✓');
   ticks.setAttribute('aria-label','Delivered');meta.append(ticks);node.append(el('p','family-text',m.you),meta);
   lastSender='you';return {node,ticks};
  }
  const who=cast[m.from],node=el('div','family-msg');node.style.setProperty('--sender',who.color);
  if(lastSender===m.from)node.classList.add('family-cont');else node.append(el('span','family-sender',who.name));
  lastSender=m.from;
  let preview;
  if(m.forward){node.append(el('span','family-forwarded','↪ Forwarded many times'),el('p','family-text',m.forward));preview='↪ '+m.forward;}
  else if(m.voice){node.append(voice(m.voice,m.transcript));preview=`🎤 Voice message (${m.voice})`;}
  else if(m.call){node.append(el('p','family-call','📞 Missed voice call'));preview='📞 Missed voice call';}
  else if(m.deleted){node.append(el('p','family-deleted','🚫 This message was deleted'));preview='🚫 This message was deleted';}
  else if(m.flowers){node.append(flowers(m.flowers));preview='📷 Photo';}
  else{node.append(el('p','family-text',m.text));preview=m.text;}
  node.append(el('span','family-meta',time));
  return {node,preview:`${who.name}: ${preview}`};
 }
 function append(node){log.append(node);while(log.children.length>LIMIT)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;}
 const bubbyLoves=m=>m.you||m.heart||(m.from&&m.from!=='bubby');

 function showToast(text){
  toast.textContent=text.length>90?text.slice(0,89)+'…':text;toast.hidden=false;
  toast.classList.remove('pop');void toast.offsetWidth;toast.classList.add('pop');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3200);
 }
 function showTyping(m){
  const who=cast[m.from];
  status.textContent=`${who.name} is ${m.voice?'recording audio':'typing'}…`;status.classList.add('typing');
  typingNode=el('div','family-typing');typingNode.style.setProperty('--sender',who.color);typingNode.setAttribute('aria-hidden','true');
  typingNode.append(el('i'),el('i'),el('i'));append(typingNode);
 }
 function hideTyping(){typingNode?.remove();typingNode=null;status.textContent=members;status.classList.remove('typing');}
 // How long each kind of message takes to arrive.
 function delay(m){
  if(m.you)return 0;
  if(m.system||m.rename)return 750;
  if(m.call)return 450;
  if(m.voice)return 2400;
  if(m.flowers)return 1400;
  if(m.forward||m.deleted)return 900;
  return Math.min(1700,Math.max(700,500+m.text.length*40));
 }
 const typed=m=>m.from&&!m.call;

 function post(m){
  const {node,preview,ticks}=render(m,clock());append(node);
  if(ticks)later(()=>{ticks.classList.add('read');ticks.setAttribute('aria-label','Read');},900);
  if(bubbyLoves(m))later(()=>heart(node),700);
  if(m.rename){name=m.rename;title.textContent=name;renamed.add(m.rename);}
  if(m.you)return;
  posted++;
  for(const rename of renames)if(posted>=rename.after&&!renamed.has(rename.name)&&!queue.some(q=>q.rename===rename.name))queue.unshift({rename:rename.name,by:rename.by},...prepare(rename.then,context()).filter(allowed));
  if(!visible()){unread++;layout();showToast(preview);}
 }
 function next(){
  if(!queue.length){busy=false;return;}
  busy=true;const m=queue.shift();
  if(typed(m))showTyping(m);
  later(()=>{hideTyping();post(m);later(next,m.you?650:260);},delay(m));
 }
 function enqueue(messages){queue.push(...messages);if(!busy)next();}
 const context=(extra={})=>({time:clock(),hour:new Date().getHours(),group:name,...extra});
 const allowed=m=>!locked||m.you||m.system||m.rename||m.from==='ma';
 // The lock is state, not a message, so a cancelled notice can't leave the group locked.
 function lock(value){locked=value;footer.textContent=locked?footerText.locked:footerText.open;footer.classList.toggle('locked',locked);}

 // `say` is what you "sent" to the group: the command, or what you typed.
 function react(event,{say,...extra}={}){
  const script=scripts[event];if(!script)return;
  const now=Date.now(),interrupted=queue.length>0||!!typingNode,out=[];
  cancel();
  if(say){
   out.push({you:say.length>60?say.slice(0,59)+'…':say});
   if(interrupted&&now-lateAt>LATE_GAP){lateAt=now;out.push({from:'bubby',text:pick(pools.late)});}
   const date=new Date(),hour=date.getHours();
   if(hour<5&&!once.has('night')){once.add('night');out.push(pools.night);}
   if(date.getDay()===5&&hour>=12&&hour<18&&event!=='shabbos'&&!once.has('friday')){once.add('friday');out.push(pools.friday);}
   if(last.event===event&&now-last.at<REPEAT_WINDOW)out.push(pools.repeat);
   last={event,at:now};
   sent=[...sent.filter(at=>now-at<SPAM_WINDOW),now];
   if(sent.length>=SPAM_COUNT&&!spammed){
    // Once per visit, Ma locks the group. Shloimy celebrates its return.
    spammed=true;lock(true);out.push(pools.lock);
    unlockTimer=setTimeout(()=>{lock(false);enqueue([pools.unlock,...prepare(pick(pools.forwards),context())]);},LOCK_FOR);
   }
  }
  out.push(...prepare(script,context(extra)));
  queue=out.filter(allowed);next();
 }

 // Nobody has typed anything for a while.
 function armIdle(){
  idleTimers.forEach(clearTimeout);idleTimers=[];
  if(document.hidden)return;
  for(const step of pools.idle)idleTimers.push(setTimeout(()=>enqueue(prepare(step.messages(),context()).filter(allowed)),step.after));
 }
 document.addEventListener('keydown',armIdle,true);
 document.addEventListener('pointerdown',armIdle,true);
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){hiddenAt=Date.now();idleTimers.forEach(clearTimeout);idleTimers=[];return;}
  if(hiddenAt&&Date.now()-hiddenAt>=AWAY)enqueue([pools.back].filter(allowed));
  hiddenAt=0;armIdle();
 });
 function stop(){cancel();idleTimers.forEach(clearTimeout);idleTimers=[];clearTimeout(unlockTimer);clearTimeout(toastTimer);}
 window.addEventListener('pagehide',stop);

 // Yesterday's messages are already there when you arrive.
 append(el('div','family-day','Yesterday'));
 for(const m of seed){const {node}=render(m,m.time);append(node);if(bubbyLoves(m))heart(node);}
 append(el('div','family-day','Today'));lastSender=null;
 layout();armIdle();
 return {react,stop};
}

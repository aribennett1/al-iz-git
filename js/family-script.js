// The family group chat: who says what. Data only. js/family.js does the timing.
// Message shapes:
//   {from, text}        a text message
//   {from, forward}     "↪ Forwarded many times"
//   {from, voice}       a voice message, voice is its length ('7:42')
//   {from, call:true}   a missed voice call
//   {from, deleted:true}
//   {from, flowers}     a "good morning" flower picture, flowers is {title, line}
//   {system}            a centered notice; heart:true lets Bubby ❤️ it
// Any text can be a function of the context: {time, hour, url, group}.
export const group = {name:'Mishpacha 🕯️🍷', members:47};

export const cast = {
 ma:{name:'Ma',color:'#f29bb2'},
 bubby:{name:'Bubby',color:'#e0bf7f'},
 shloimy:{name:'Uncle Shloimy',color:'#86d1ae'},
 faigy:{name:'Tante Faigy',color:'#a9b8ff'},
 yanky:{name:'Cousin Yanky',color:'#f3a86f'},
 zeidy:{name:'Zeidy',color:'#c5b0f2'}
};

// Already in the chat when the page opens, under "Yesterday".
export const seed = [
 {from:'bubby',text:'Gut Shabbos to my whole beautiful family ❤️❤️ Love, Bubby',time:'4:12 PM'},
 {from:'shloimy',forward:'Segula for parnassa: say this for 40 days and send it to 18 people. DO NOT BREAK THE CHAIN 🙏🙏',time:'4:31 PM'},
 {from:'ma',text:'Who took my tupperware',time:'9:47 PM'},
 {from:'faigy',text:'👍',time:'9:52 PM'}
];

const leftAndBack = who => [
 {system:`${who} left`,heart:true},
 {system:`Bubby added ${who}`}
];

// One script per event: the command ids from commands.js and bubby.js, plus
// not-found, help, clear, interrupt, mute and share.
export const scripts = {
 shabbos:[
  {from:'ma',text:"Who's bringing the kugel"},
  {from:'faigy',text:'I brought last week'},
  {from:'shloimy',forward:'Candle lighting times for 47 cities 🕯️ (PDF, 12 pages)'},
  {from:'zeidy',text:'Gut Shabbos.'}
 ],
 shmak:[
  {from:'bubby',text:'Mazel tov!!!! What happened'},
  {from:'ma',text:'Nobody knows what happened'},
  {from:'shloimy',text:'🎆🎆🎆'},
  {from:'yanky',text:'W'}
 ],
 valt:[
  {from:'ma',text:'WHAT HAPPENED'},
  {from:'ma',text:'CALL ME'},
  {from:'ma',call:true},
  {from:'ma',call:true},
  {from:'ma',call:true},
  {from:'shloimy',text:'Mazel tov!!!'},
  {from:'ma',text:'SHLOIMY'},
  {from:'shloimy',deleted:true}
 ],
 'filter-fish':[
  {from:'bubby',text:'Who is taking the fish home? There are 4 loaves left'},
  {from:'faigy',text:'Not me'},
  {from:'ma',text:'Not me'},
  {from:'yanky',text:'is gefilte fish a fish'},
  {from:'zeidy',call:true}
 ],
 morgen:[
  {from:'shloimy',flowers:{title:'GUT MORGEN',line:'Have a blessed day 🌸'}},
  {from:'bubby',text:'Gut morgen ❤️'},
  {from:'ma',text:({time,hour})=>hour>=5&&hour<11?`Shloimy it's ${time}. Some of us are sleeping`:`Shloimy it's ${time}`}
 ],
 nacht:[
  {from:'bubby',text:'Gut nacht everyone ❤️'},
  {from:'bubby',text:'Gut nacht'},
  {from:'bubby',text:'Did my gut nacht go through'},
  {from:'bubby',voice:'2:15'},
  {from:'ma',text:'Ma go to sleep'}
 ],
 voch:[
  {from:'ma',text:'Gut voch! Who has my tupperware'},
  {from:'faigy',text:'Which one'},
  {from:'ma',text:'The blue one from 2014'},
  {from:'faigy',text:'👍'},
  {from:'ma',text:'👍 what'}
 ],
 yomtov:[
  {from:'ma',text:'WHO IS HOSTING SECOND DAYS'},
  {system:'Nobody is typing.'},
  {system:'Uncle Shloimy left',heart:true},
  {from:'bubby',text:"I'll host. Bring chairs."},
  {system:'Bubby added Uncle Shloimy'}
 ],
 gezunt:[
  {from:'bubby',text:'Did you get the flu shot'},
  {from:'ma',text:"You're not answering"},
  {from:'shloimy',forward:'Doctors HATE this one segula 🧄🧄'},
  {from:'bubby',text:'Wear a sweater'}
 ],
 zuntight:[
  {from:'bubby',text:'Zei gezunt! Wear a sweater'},
  {from:'ma',text:'ARE YOU SICK'},
  {from:'ma',text:'CALL ME'},
  {from:'bubby',voice:'4:30'},
  {from:'shloimy',text:"Can someone type what Bubby said, I'm in shul"}
 ],
 log:[
  {from:'bubby',text:'I called you 47 times'},
  {from:'ma',text:'She called me too'},
  {from:'ma',text:'CALL YOUR BUBBY'},
  {from:'yanky',text:"she called me 12 times and it wasn't even me"}
 ],
 diff:[
  {from:'bubby',text:"Whose kugel is better? Be honest"},
  {from:'ma',text:'👀'},
  {from:'faigy',text:'Mine.'},
  {from:'bubby',text:'Faigy'},
  ...leftAndBack('Tante Faigy')
 ],
 push:[
  {from:'ma',text:'Nobody is pushing.'},
  {from:'ma',text:"But if you're coming for Yom Tov I need to know by Wednesday"},
  {from:'faigy',text:'👍'},
  {from:'bubby',text:"I'm making extra"}
 ],
 'push-force':[
  {from:'ma',text:'WHAT DID YOU PUSH'},
  {from:'ma',text:'WHO DID YOU PUSH'},
  {from:'shloimy',text:'Mazel tov!!!'},
  {from:'bubby',voice:'7:42'},
  {from:'yanky',text:'lol'},
  {from:'faigy',text:'Is this the right group'},
  ...leftAndBack('Tante Faigy'),
  {from:'bubby',text:"Faigy don't be like this"}
 ],
 merge:[
  {from:'ma',text:'MAZEL TOV??'},
  {from:'ma',text:'WHO'},
  {from:'bubby',text:'I knew it'},
  {from:'faigy',text:"Who's the family"},
  {from:'yanky',text:'wait what'},
  {from:'shloimy',text:'Mazel tov!!!'}
 ],
 blame:[
  {from:'ma',text:'Nobody is blaming.'},
  {from:'ma',text:'But who left the oven on'},
  {from:'shloimy',text:'Not me'},
  {from:'yanky',text:'not me'},
  {from:'faigy',text:'Not me'},
  {from:'zeidy',call:true}
 ],
 bisect:[
  {from:'bubby',text:'Who took the rugelach'},
  {from:'shloimy',deleted:true},
  {from:'yanky',text:'💀'},
  {from:'bubby',text:'Shloimy.'}
 ],
 'cherry-pick':[
  {from:'bubby',text:'Cherries are $8.99 a pound. Robbery.'},
  {from:'ma',text:"So don't buy them"},
  {from:'bubby',text:"I'm not buying them"},
  {from:'bubby',text:'I bought them'}
 ],
 'reset-hard':[
  {from:'bubby',text:'Life is hard. Did you eat?'},
  {from:'ma',text:'Did you eat'},
  {from:'faigy',text:'Is the child eating??'},
  {from:'yanky',text:'lol'}
 ],
 'not-found':[
  {from:'bubby',text:'Shloimy what does this mean'},
  {from:'shloimy',text:"I think it's a virus"},
  {from:'faigy',text:"Is this a scam? Don't click anything"}
 ],
 help:[
  {from:'zeidy',text:"In my day we didn't need help."},
  {from:'ma',text:'ZEIDY CAN TYPE??'}
 ],
 clear:[
  {from:'yanky',text:'someone cleared their history 👀'},
  {from:'ma',text:'What are you hiding'}
 ],
 interrupt:[
  {from:'ma',text:'Did you just hang up on me'},
  {from:'ma',text:'Call me back'}
 ],
 mute:[
  {system:({group})=>`You muted "${group}" for 8 hours`},
  {from:'bubby',text:'Hello??'},
  {from:'bubby',text:'Anybody??'},
  {from:'bubby',text:'Is this working'}
 ],
 share:[
  {from:'shloimy',forward:({url})=>`Look at this!! Is this real?? ${url}`},
  {from:'ma',text:'Shloimy that came from inside the family'},
  {from:'bubby',text:'Very nice. What is it'}
 ]
};

// Shloimy's forwards, for idling and right after someone renames the group.
const forwards = [
 [{from:'shloimy',forward:'Starting Monday this group will cost $4.99 a month. Send this to 10 people to keep it free 🙏🙏'}],
 [{from:'shloimy',forward:'Rare picture of a cloud shaped like a menorah 😱😱'},{from:'yanky',text:"that's a cloud"}],
 [{from:'shloimy',forward:'Mazel tov to the Goldbergs!!! 🎉🎉'},{from:'ma',text:'Who are the Goldbergs'},{from:'shloimy',text:'Mazel tov!!!'}],
 [{from:'shloimy',forward:'Segula for no merge conflicts: say Tehillim 20 and send to 18 people. DO NOT BREAK THE CHAIN 🙏'}]
];
const greeting = hour => hour<12?{title:'GUT MORGEN',line:'Have a blessed day 🌸'}:hour<18?{title:'A GUTEN TOG',line:'Have a blessed day 🌸'}:{title:'GUT NACHT',line:'Sweet dreams 🌙'};

export const pools = {
 forwards,
 // Bubby, replying to the message before the one you just sent.
 late:['wait what happened',"I'm still reading the last one",'What did I miss','Who sent this'],
 repeat:{from:'ma',text:'You sent this already'},
 night:{from:'ma',text:'Why are you up'},
 friday:{from:'ma',text:"Who's bringing the kugel"},
 back:{from:'ma',text:"Oh NOW you're online"},
 lock:{system:'Ma changed the group settings so only admins can send messages'},
 unlock:{system:'Ma changed the group settings so all members can send messages'},
 // Nobody has typed anything for a while. Activity starts the clock over.
 idle:[
  {after:45000,messages:()=>forwards[Math.floor(Math.random()*forwards.length)]},
  {after:120000,messages:()=>[{from:'bubby',flowers:greeting(new Date().getHours())},{from:'bubby',text:'Love, Bubby'}]},
  {after:240000,messages:()=>[{from:'bubby',text:'Hello? Is everyone ok?'},{from:'ma',text:'CALL YOUR BUBBY'}]}
 ]
};

// After this many messages, someone renames the group. Shloimy does not notice.
export const renames = [
 {after:12,by:'ma',name:'Mishpacha 🕯️ IMPORTANT ONLY',then:[{from:'shloimy',forward:'Good morning!!! 🌞 Have a blessed day 🌸🌸🌸'}]},
 {after:30,by:'faigy',name:'Mishpacha 🕯️ NO FORWARDS PLEASE',then:[{from:'shloimy',forward:'Please respect the group name 🙏 NO FORWARDS'}]}
];

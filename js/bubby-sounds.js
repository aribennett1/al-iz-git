// Original Web Audio effects for Bubby's kitchen. Everything is synthesized,
// so there are no recordings or licenses to track. Every source node goes
// through `track`, which registers it with Sound so Sound.stop() silences it.
const noiseBuffers = new WeakMap();
function noiseBuffer(ctx){
 if(!noiseBuffers.has(ctx)){const buffer=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;noiseBuffers.set(ctx,buffer);}
 return noiseBuffers.get(ctx);
}
function envelope(ctx,out,start,duration,peak,attack=.008){
 const gain=ctx.createGain();gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(peak,start+attack);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);gain.connect(out);return gain;
}
function tone(ctx,out,track,{type='sine',freq,to,start=0,duration=.3,peak=.1,attack,vibrato=0,filter}){
 const t=ctx.currentTime+start,osc=ctx.createOscillator(),gain=envelope(ctx,out,t,duration,peak,attack);
 osc.type=type;osc.frequency.setValueAtTime(freq,t);if(to)osc.frequency.exponentialRampToValueAtTime(to,t+duration);
 let tail=gain;
 if(filter){const biquad=ctx.createBiquadFilter();biquad.type='lowpass';biquad.frequency.value=filter;biquad.connect(gain);tail=biquad;}
 osc.connect(tail);
 const extra=[gain];if(tail!==gain)extra.push(tail);
 if(vibrato){const lfo=ctx.createOscillator(),depth=ctx.createGain();lfo.frequency.value=5.6;depth.gain.value=freq*vibrato;lfo.connect(depth);depth.connect(osc.frequency);lfo.start(t);lfo.stop(t+duration+.05);track(lfo,depth);}
 osc.start(t);osc.stop(t+duration+.05);track(osc,...extra);
}
function noise(ctx,out,track,{start=0,duration=.3,peak=.2,type='lowpass',freq=1000,to,q=1}){
 const t=ctx.currentTime+start,source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=envelope(ctx,out,t,duration,peak,.004);
 source.buffer=noiseBuffer(ctx);source.loop=true;filter.type=type;filter.Q.value=q;filter.frequency.setValueAtTime(freq,t);if(to)filter.frequency.exponentialRampToValueAtTime(to,t+duration);
 source.connect(filter);filter.connect(gain);source.start(t,Math.random()*.5);source.stop(t+duration+.05);track(source,filter,gain);
}
// D freygish, the klezmer mode: D Eb F# G A Bb C D.
const N={D3:146.83,A3:220,D4:293.66,Eb4:311.13,Fs4:369.99,G4:392,A4:440,Bb4:466.16,C5:523.25,D5:587.33};
export const bubbyVoices = {
 pop:(ctx,out,track)=>tone(ctx,out,track,{freq:520,to:900,duration:.07,peak:.05}),
 tick:(ctx,out,track)=>tone(ctx,out,track,{type:'square',freq:1700+Math.random()*300,duration:.025,peak:.025,filter:3000}),
 buzz:(ctx,out,track)=>{for(const start of [0,.16])tone(ctx,out,track,{type:'square',freq:120,start,duration:.11,peak:.03,filter:500});},
 ring:(ctx,out,track)=>{
  // An old bell phone: a 20 Hz hammer on two bells.
  const t=ctx.currentTime,mix=ctx.createGain(),hammer=ctx.createOscillator(),depth=ctx.createGain(),gain=envelope(ctx,out,t,1.15,.09,.02);
  mix.gain.value=.5;hammer.type='square';hammer.frequency.value=20;depth.gain.value=.5;hammer.connect(depth);depth.connect(mix.gain);mix.connect(gain);
  for(const freq of [1180,1490]){const bell=ctx.createOscillator();bell.frequency.value=freq;bell.connect(mix);bell.start(t);bell.stop(t+1.2);track(bell);}
  hammer.start(t);hammer.stop(t+1.2);track(hammer,depth,mix,gain);
 },
 clink:(ctx,out,track)=>{const base=2100+Math.random()*500;[[1,.07],[1.52,.04],[2.4,.02]].forEach(([ratio,peak])=>tone(ctx,out,track,{freq:base*ratio,duration:.32,peak}));},
 ding:(ctx,out,track)=>{tone(ctx,out,track,{freq:1568,duration:1.5,peak:.09});tone(ctx,out,track,{freq:3136,duration:.7,peak:.025});},
 whoosh:(ctx,out,track)=>noise(ctx,out,track,{type:'bandpass',freq:350,to:2400,duration:.4,peak:.12,q:.8}),
 crack:(ctx,out,track)=>{noise(ctx,out,track,{freq:1400,to:300,duration:.35,peak:.35});tone(ctx,out,track,{freq:90,to:38,duration:.4,peak:.18});},
 shatter:(ctx,out,track)=>{noise(ctx,out,track,{type:'highpass',freq:2600,duration:.6,peak:.22});for(let i=0;i<9;i++)tone(ctx,out,track,{freq:2400+Math.random()*4200,start:Math.random()*.45,duration:.08+Math.random()*.16,peak:.04});},
 clank:(ctx,out,track)=>{[523,659,1245].forEach(freq=>tone(ctx,out,track,{type:'square',freq,duration:.22,peak:.025,filter:2800}));noise(ctx,out,track,{type:'bandpass',freq:3200,duration:.08,peak:.12,q:2});},
 splat:(ctx,out,track)=>{noise(ctx,out,track,{freq:700,to:160,duration:.2,peak:.25});tone(ctx,out,track,{freq:150,to:55,duration:.18,peak:.12});},
 knock:(ctx,out,track)=>{for(const start of [0,.2]){tone(ctx,out,track,{freq:190,to:120,start,duration:.09,peak:.22});noise(ctx,out,track,{start,freq:900,duration:.05,peak:.1});}},
 good:(ctx,out,track)=>{tone(ctx,out,track,{freq:880,duration:.18,peak:.06});tone(ctx,out,track,{freq:1320,start:.09,duration:.25,peak:.05});},
 // Duh, duh, DUHHH.
 doom:(ctx,out,track)=>[[110,0,.2],[110,.26,.2],[87.3,.52,1.3]].forEach(([freq,start,duration])=>{for(const detune of [1,1.007])tone(ctx,out,track,{type:'sawtooth',freq:freq*detune,start,duration,peak:.05,filter:700});}),
 scratch:(ctx,out,track)=>{noise(ctx,out,track,{type:'bandpass',freq:2800,to:500,duration:.18,peak:.3,q:3});noise(ctx,out,track,{type:'bandpass',start:.17,freq:600,to:2600,duration:.2,peak:.25,q:3});},
 airplane:(ctx,out,track)=>{
  // Nyeeeoow: a buzzy engine whose pitch swoops with each loop.
  const t=ctx.currentTime,osc=ctx.createOscillator(),filter=ctx.createBiquadFilter(),gain=envelope(ctx,out,t,3.6,.05,.25);
  osc.type='sawtooth';filter.type='lowpass';filter.frequency.value=1100;
  osc.frequency.setValueCurveAtTime(new Float32Array([150,230,170,290,190,250,160,320,140]),t,3.5);
  osc.connect(filter);filter.connect(gain);osc.start(t);osc.stop(t+3.65);track(osc,filter,gain);
 },
 warm:(ctx,out,track)=>[349.23,440,523.25,698.46].forEach((freq,i)=>tone(ctx,out,track,{type:'triangle',freq,start:i*.06,duration:2.6,peak:.035,attack:.5})),
 klezmer:(ctx,out,track)=>{
  // An original freylekh flourish on a reedy "clarinet", over an oom-pah bass.
  const melody=[['D4',.07],['Fs4',.07],['A4',.07],['D5',.28],['C5',.14],['Bb4',.14],['A4',.28],['Bb4',.14],['A4',.14],['G4',.14],['Fs4',.14],['G4',.14],['Eb4',.14],['D4',.55]];
  let at=0;for(const [note,length] of melody){tone(ctx,out,track,{type:'square',freq:N[note],start:at,duration:length*1.05,peak:.035,attack:.015,vibrato:.012,filter:2100});at+=length;}
  for(let beat=0;beat<9;beat++)tone(ctx,out,track,{type:'triangle',freq:beat%2?N.A3:N.D3,start:.21+beat*.28,duration:.2,peak:.05});
 }
};

// Original Web Audio for the family group chat. Synthesized, so there are no
// recordings or licenses to track. Every source node goes through `track`,
// which registers it with Sound so Sound.stop() silences it.
export const familyVoices = {
 // Bubby's voice message, phone held too close: muffled wah-wah syllables.
 voicenote:(ctx,out,track)=>{
  const start=ctx.currentTime+.05,osc=ctx.createOscillator(),mouth=ctx.createBiquadFilter(),muffle=ctx.createBiquadFilter(),gain=ctx.createGain();
  osc.type='sawtooth';mouth.type='bandpass';mouth.Q.value=3;muffle.type='lowpass';muffle.frequency.value=1800;gain.gain.value=0;
  osc.connect(mouth);mouth.connect(muffle);muffle.connect(gain);gain.connect(out);
  // [pitch, length, pause]: a question, a story, an aside, a goodbye.
  const syllables=[[260,.18,.04],[300,.22,.05],[340,.32,.18],[240,.16,.03],[250,.16,.03],[230,.2,.03],[280,.26,.22],[320,.14,.03],[300,.14,.03],[210,.42,.25],[270,.2,.04],[330,.34,0]];
  let t=start;
  for(const [pitch,length,pause] of syllables){
   osc.frequency.setValueAtTime(pitch,t);osc.frequency.linearRampToValueAtTime(pitch*.86,t+length);
   mouth.frequency.setValueAtTime(450,t);mouth.frequency.linearRampToValueAtTime(1150,t+length*.35);mouth.frequency.linearRampToValueAtTime(420,t+length);
   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.11,t+.03);gain.gain.setValueAtTime(.11,t+length*.7);gain.gain.linearRampToValueAtTime(0,t+length);
   t+=length+pause;
  }
  osc.start(start);osc.stop(t+.05);track(osc,mouth,muffle,gain);
 }
};

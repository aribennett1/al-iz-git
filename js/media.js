// Local recordings and CC0 effects. See data/media-manifest.json for provenance.
import {bubbyVoices} from './bubby-sounds.js';
const recordings = {
 shabbos: {path:'media/shabbos.mp3',fallback:'gentle'},
 wake: {path:'media/mdy.mp3',fallback:'wake'},
 voch: {path:'media/voch.mp3',fallback:'gentle'},
 bubble: {path:'media/bubbles.mp3',fallback:'bubble'},
 sneeze: {path:'media/sneeze.mp3',fallback:null}
};
const commandSounds = {shabbos:'shabbos',morgen:'wake',voch:'voch','filter-fish':'bubble',zuntight:'sneeze'};
export class Sound {
 constructor(){this.enabled=true;this.interactive=false;this.volume=.35;this.context=null;this.master=null;this.nodes=new Set();this.buffers=new Map();this.generation=0;}
 unlock(){
  try{
   this.context??=new(window.AudioContext||window.webkitAudioContext)();
   if(!this.master){this.master=this.context.createGain();this.master.gain.value=this.volume;this.master.connect(this.context.destination);}
   // Resume synchronously within the command click/Enter gesture, before loading.
   this.context.resume().catch(()=>{});
  }catch{/* Silent scenes remain available if Web Audio is unsupported. */}
 }
 prepare(commandId,userInitiated){
  this.interactive=userInitiated;
  if(!this.enabled||!userInitiated)return;
  this.unlock();
  const kind=commandSounds[commandId];
  if(kind&&this.context)this.load(recordings[kind].path).catch(()=>{});
 }
 setEnabled(value){this.enabled=value;if(!value)this.stop();else this.unlock();}
 setVolume(value){this.volume=value;if(this.master)this.master.gain.setValueAtTime(value,this.context.currentTime);}
 load(path){
  if(!this.buffers.has(path)){
   const pending=fetch(new URL('../'+path,import.meta.url)).then(response=>{if(!response.ok)throw new Error('Media unavailable');return response.arrayBuffer();}).then(data=>this.context.decodeAudioData(data));
   this.buffers.set(path,pending);
   pending.catch(()=>{if(this.buffers.get(path)===pending)this.buffers.delete(path);});
  }
  return this.buffers.get(path);
 }
 async play(kind){
  if(!this.enabled||!this.interactive||!this.context)return;
  const generation=this.generation,recording=recordings[kind];
  if(recording){
   try{
    const buffer=await this.load(recording.path);
    if(generation!==this.generation||!this.enabled||!this.interactive)return;
    const source=this.context.createBufferSource();source.buffer=buffer;source.connect(this.master);this.nodes.add(source);
    source.onended=()=>{this.nodes.delete(source);source.disconnect();};source.start();return;
   }catch{if(generation!==this.generation||!this.enabled)return;if(!recording.fallback)return;kind=recording.fallback;}
  }
  this.synthesize(kind);
 }
 track(node,...parts){this.nodes.add(node);node.onended=()=>{this.nodes.delete(node);node.disconnect();parts.forEach(part=>part.disconnect());};}
 synthesize(kind){
  if(bubbyVoices[kind]){bubbyVoices[kind](this.context,this.master,(node,...parts)=>this.track(node,...parts));return;}
  const patterns={celebrate:[523,659,784,1047],alarm:[220,185,220,185],bubble:[180,310,440],wake:[392,523,784],health:[659,880],gentle:[262,330,392],sleep:[392,330,262]};
  (patterns[kind]||[440]).forEach((frequency,i)=>{
   const oscillator=this.context.createOscillator(),gain=this.context.createGain();oscillator.type=kind==='bubble'?'sine':'triangle';oscillator.frequency.value=frequency;gain.gain.value=.12;oscillator.connect(gain);gain.connect(this.master);this.nodes.add(oscillator);
   const start=this.context.currentTime+i*.13;oscillator.start(start);gain.gain.setValueAtTime(.12,start);gain.gain.exponentialRampToValueAtTime(.0001,start+.3);oscillator.stop(start+.31);
   oscillator.onended=()=>{this.nodes.delete(oscillator);oscillator.disconnect();gain.disconnect();};
  });
 }
 stop(){this.generation++;for(const node of this.nodes){try{node.stop();}catch{}node.disconnect();}this.nodes.clear();}
}

// Bubby's kitchen: real Git commands, answered by Bubby.
// The ten commandments in commands.js are untouched. These only run when the
// input is not one of them, so `git push origin main` gets a scene instead of
// "Command not found".
export const bubby = [
{id:'log',name:'git log',meaning:"Bubby's call log",description:'47 missed calls.',icon:'☎︎',duration:12000,match:/^git log( |$)/,result:'47 missed calls. 0 returned. Call your Bubby.'},
{id:'diff',name:'git diff',meaning:"Bubby's kugel",description:'Hers vs. yours.',icon:'±',duration:10000,match:/^git diff( |$)/,result:'1 file changed, 6 insertions(+), 4 deletions(-). Mostly schmaltz.'},
{id:'push',name:'git push',meaning:"Bubby's table",description:'Nobody is pushing.',icon:'◎',duration:10500,match:/^git push( |$)/,result:'Writing objects: 100% (14/14), 6.2 kg. Nobody was pushing.'},
{id:'push-force',name:'git push --force',meaning:'Here comes the airplane',description:'Who is forcing?',icon:'✈︎',duration:9500,match:/^git push( .*)? (-f|--force\S*)( |$)/,result:'! [rejected] spoon -> mouth (closed). Retrying, attempt 2 of ∞.'},
{id:'merge',name:'git merge',meaning:'Bubby the shadchan',description:'She has someone for you.',icon:'⚭',duration:11000,match:/^git merge( |$)/,result:"Merge made by the 'shidduch' strategy.\n 2 families changed, 600 insertions(+), 1 glass(-)"},
{id:'blame',name:'git blame',meaning:'Nobody is blaming',description:"Who's blaming?",icon:'☞\uFE0E',duration:12400,match:/^git blame( |$)/,result:'4 lines, 5 relatives, 1 author: You.'},
{id:'bisect',name:'git bisect',meaning:'The rugelach investigation',description:'Who took the rugelach?',icon:'⌕',duration:12000,match:/^git bisect( |$)/,result:'a7f3e2c is the first bad commit. Author: Bubby. Committer: Uncle Shloimy.'},
{id:'cherry-pick',name:'git cherry-pick',meaning:'Bubby at the fruit stand',description:'Only the perfect one.',icon:'❦',duration:12000,match:/^git cherry-pick( |$)/,result:'Picked 1 of 4 cherries. Rejected: bruised, attitude, too soft.'},
{id:'reset-hard',name:'git reset --hard',meaning:"Bubby's soup",description:'Life is hard. Eat.',icon:'♨︎',duration:11000,match:/^git reset( .*)? --hard( |$)/,result:"HEAD is now at Bubby's kitchen table."}
];
// Most specific first, so `git push --force` wins over `git push`.
const bySpecificity = [...bubby].sort((a,b)=>b.name.length-a.name.length);
export const resolveBubby = value => bySpecificity.find(c=>c.match.test(value));

export const commands = [
{id:'shabbos',name:'git shabbos',meaning:'Gut Shabbos',description:'All processes can wait.',icon:'♧',duration:8000,aliases:['shabos','shobbos','shobos','shabbes','shabes','shobbes','shobes','shabbas','shabas','shobbas','shobas','shabbus','shabus','shobbus','shobus','shabbis','shabis','shobbis','shobis','shabbat','shabat','shabbath','shabath','schabbos','schabos','schabbes','schabes','schabbat','schabat','sabbath','sabbat','sabat']},
{id:'shmak',name:'git shmak',meaning:'Geschmak',description:'A reason to celebrate.',icon:'✧',duration:6500},
{id:'valt',name:'git valt',meaning:'Gevalt',description:'Remain completely uncalm.',icon:'ϟ',duration:5200},
{id:'filter-fish',name:'git filter fish',meaning:'Gefilte fish',description:'A very selective filter.',icon:'♧',duration:6500},
{id:'morgen',name:'git morgen',meaning:'Gut morgen',description:'Your morning wake-up call.',icon:'☀',duration:10300},
{id:'nacht',name:'git nacht',meaning:'Gut nacht',description:'Put your bugs to bed.',icon:'☾',duration:8000},
{id:'voch',name:'git voch',meaning:'Gut voch',description:'A bright new beginning.',icon:'♨',duration:12500},
{id:'yomtov',name:'git yomtov',meaning:'Gut Yom Tov',description:'Deploy the festivities.',icon:'♔',duration:7000},
{id:'gezunt',name:'git gezunt',meaning:'Zei gezunt',description:'A little health check.',icon:'♡',duration:6500},
{id:'zuntight',name:'git-zuntight',meaning:'Gesundheit',description:'An unexpected achoo.',icon:'☺',duration:5000}
];
export const normalize = value => value.trim().toLowerCase().replace(/\s+/g,' ');
export const helpInputs = ['help','git','git help','git --help','git -h'];
// Every input that runs a command: its canonical name plus explicit spelling aliases.
export const names = c => [c.name,...(c.aliases??[]).map(a=>'git '+a)];
export function resolve(value){value=normalize(value);return commands.find(c=>names(c).includes(value));}

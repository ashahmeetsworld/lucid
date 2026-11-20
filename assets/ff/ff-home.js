// Fatal Frenzy art for the Lucid home page, drawn from the project deck's kit. Two palettes:
// 'holo' = Lucid's own light (cyan, violet, pink, gold on black); 'red' = the game's own red, ink and paper.
const FFH=(function(){const INK='#05040a';
 const PAL={holo:{bg:['#05040a','#14082e','#5b2bd6','#05040a','#2a0f5a'],aura:[INK,'#8f7bff','#ff6bd6','#7cf7ff','#fff'],rim:'#7cf7ff',rim2:'#ff6bd6',acc:'#ffd36b',paper:'#eeede8',hard:'#ff6bd6'},
  red:{bg:['#07050c','#3a0613','#f0123f','#07050c','#7a0a24'],aura:[INK,'#5aff9a','#c8ffe0','#fff'],rim:'#3dd6ff',rim2:'#f0123f',acc:'#f2ecd8',paper:'#f2ecd8',hard:'#f0123f'}};
 function svg(w,h,g){return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${g}</svg>`}
 // hero: two fighters mid-clash, aura boiling off the winner, warped arena behind
 function hero(p,seed){const P=PAL[p],R=FA.R(seed||7);let g=FA.warp(R,P.bg,{w:1920,h:1040,cx:1300,cy:520,n:18});
  g+=`<defs>${FA.ht('hh'+p,INK,3)}</defs><rect width="1920" height="1040" fill="url(#hh${p})" opacity=".2"/>`;
  g+=FA.aura(R,1220,560,270,P.aura,{up:1.8})+FA.wisps(R,1220,560,270,P.aura[2],10,14);
  g+=FA.speed(R,1220,540,INK,.16,46,360);
  g+=FA.fighter('kick',1150,820,1.75,{rim:P.rim})+FA.fighter('hit',1470,810,1.55,{flip:true,rim:P.rim2});
  g+=FA.burst(1365,600,30,96,14,P.acc,0.2);
  g+=FA.meter(1300,270,100,P.acc,96);
  return svg(1920,1040,g)}
 // ticket: tall portrait, one fighter rising out of the aura
 function ticket(p,seed){const P=PAL[p],R=FA.R(seed||4);let g=FA.warp(R,P.bg,{w:700,h:820,cx:350,cy:430,n:12});
  g+=FA.aura(R,350,470,250,P.aura,{up:1.9})+FA.wisps(R,350,470,250,P.aura[2],8,12);
  g+=FA.fighter('uppercut',350,760,1.75,{rim:P.rim});return svg(700,820,g)}
 // finisher frame: poster moon, two silhouettes, FINISH
 function finish(p,seed){const P=PAL[p],R=FA.R(seed||91);const bg=p=='holo'?'#2a0f5a':'#c8182a',moon=p=='holo'?'#7cf7ff':'#efe9dc';
  let g=`<rect width="1600" height="900" fill="${bg}"/>`;if(p=='holo')g+=FA.warp(R,['#14082e','#2a0f5a','#5b2bd6','#14082e'],{w:1600,h:900,cx:800,cy:420,n:12});
  g+=`<circle cx="800" cy="400" r="290" fill="${moon}"/><path d="M0 720C400 680 900 740 1600 700L1600 900L0 900Z" fill="${INK}"/>`;
  g+=FA.fighter('uppercut',660,760,2.2,{ink:INK,rim:INK,cuts:false,eye:INK})+FA.fighter('hit',1000,750,2.0,{flip:true,ink:INK,rim:INK,cuts:false,eye:INK});
  g+=`<text x="800" y="230" text-anchor="middle" transform="rotate(-6 800 230)" font-family="Archivo" font-style="italic" font-weight="900" font-stretch="125%" font-size="190" fill="${INK}">FINISH</text><text x="792" y="222" text-anchor="middle" transform="rotate(-6 792 222)" font-family="Archivo" font-style="italic" font-weight="900" font-stretch="125%" font-size="190" fill="${P.paper}">FINISH</text>`;
  return svg(1600,900,g)}
 // four rules of the fight, one small panel each
 function rule(p,k,seed){const P=PAL[p],R=FA.R(seed||k*13+5);let g=FA.warp(R,P.bg,{w:600,h:600,cx:300,cy:320,n:9});
  if(k==0){g+=FA.fighter('punch',250,540,1.5,{rim:P.rim});g+=FA.burst(450,330,20,70,12,P.acc,0);g+=`<text x="40" y="110" font-family="Archivo" font-style="italic" font-weight="900" font-stretch="125%" font-size="80" fill="${P.paper}" stroke="${INK}" stroke-width="5" paint-order="stroke">12 HITS</text>`}
  if(k==1){g+=`<circle cx="300" cy="260" r="170" fill="${P.paper}"/>`;g+=FA.fighter('uppercut',230,560,1.4,{ink:INK,rim:INK,cuts:false,eye:INK})+FA.fighter('hit',400,560,1.3,{flip:true,ink:INK,rim:INK,cuts:false,eye:INK})}
  if(k==2){g+=FA.aura(R,300,340,200,P.aura,{up:1.8});g+=FA.fighter('stance',300,560,1.4,{rim:P.rim});g+=FA.meter(60,130,100,P.acc,96)}
  if(k==3){g+=FA.crack(R,300,300,260,P.paper,4)+FA.crack(R,300,300,220,P.rim,3);g+=FA.fighter('air',300,400,1.3,{rim:P.rim2,flip:true})}
  return svg(600,600,g)}
 return {hero,ticket,finish,rule,PAL}})();

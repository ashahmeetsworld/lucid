// Lucid mock-up scenes: Scape (pixel first-person dungeon crawler) and Fatal Frenzy (platform arena fighter)
// Both are original, drawn in code. Palettes are passed in so each direction can tint them.

function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}

// ---------- SCAPE ----------
const SCAPE_DEF={sky:'#05040c',wall:[ '#3b2f6b','#2c2354','#201a40','#16122d'],mortar:'#120e24',hi:'#5d4bb0',
  floor:['#2a2347','#211b39','#18142b','#110e1f'],ceil:['#140f27','#100c20','#0c0918','#080612'],
  glow:'#ffb347',glow2:'#ff5e3a',door:'#0a0714',ui:'#0b0918',uiLine:'#8f7bff',hp:'#4dff8f',mp:'#4dc3ff',
  mon:'#ff4fd8',mon2:'#8a1fff',eye:'#fff6c9'};

function drawScape(cv,opt={}){
  const P=Object.assign({},SCAPE_DEF,opt.pal||{});
  const W=opt.w||192,H=opt.h||108;cv.width=W;cv.height=H;
  const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
  const R=rng(opt.seed||7);
  const viewH=opt.ui===false?H:Math.round(H*0.78);
  const cx=W/2,cy=Math.round(viewH*0.5);
  c.fillStyle=P.sky;c.fillRect(0,0,W,H);
  const k=W/192;
  const rs=[[96,cy],[62,cy*0.66],[38,cy*0.41],[23,cy*0.25],[14,cy*0.15]].map(([w,h])=>[w*k,h]);
  const poly=(pts,f)=>{c.beginPath();c.moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(p=>c.lineTo(p[0],p[1]));c.closePath();c.fillStyle=f;c.fill()};
  const line=(x1,y1,x2,y2,col)=>{c.strokeStyle=col;c.lineWidth=1;c.beginPath();c.moveTo(Math.round(x1)+.5,Math.round(y1)+.5);c.lineTo(Math.round(x2)+.5,Math.round(y2)+.5);c.stroke()};
  for(let d=0;d<4;d++){
    const [w0,h0]=rs[d],[w1,h1]=rs[d+1];
    // ceiling + floor
    poly([[cx-w0,cy-h0],[cx+w0,cy-h0],[cx+w1,cy-h1],[cx-w1,cy-h1]],P.ceil[d]);
    poly([[cx-w0,cy+h0],[cx+w0,cy+h0],[cx+w1,cy+h1],[cx-w1,cy+h1]],P.floor[d]);
    // floor tiles
    for(let t=1;t<4;t++){const u=t/4;const yy=cy+h0+(h1-h0)*u;const ww=w0+(w1-w0)*u;line(cx-ww,yy,cx+ww,yy,P.mortar)}
    for(let s=-3;s<=3;s++){line(cx+s*w0/3.5,cy+h0,cx+s*w1/3.5,cy+h1,P.mortar)}
    // side walls
    for(const sg of[-1,1]){
      poly([[cx+sg*w0,cy-h0],[cx+sg*w1,cy-h1],[cx+sg*w1,cy+h1],[cx+sg*w0,cy+h0]],P.wall[d]);
      const rows=8;
      for(let r=1;r<rows;r++){const u=r/rows;line(cx+sg*w0,cy-h0+2*h0*u,cx+sg*w1,cy-h1+2*h1*u,P.mortar)}
      for(let r=0;r<rows;r++){
        for(const f of (r%2?[0.33,0.8]:[0.15,0.58])){
          const x=w0+(w1-w0)*f;const hh=h0+(h1-h0)*f;
          line(cx+sg*x,cy-hh+2*hh*r/rows,cx+sg*x,cy-hh+2*hh*(r+1)/rows,P.mortar)}}
      // edge highlight
      line(cx+sg*w0,cy-h0,cx+sg*w1,cy-h1,P.hi);
    }
  }
  // end wall + door
  const [we,he]=rs[4];
  c.fillStyle=P.wall[3];c.fillRect(cx-we,cy-he,we*2,he*2);
  const dw=we*0.32,dh=he*1.45;
  const gr=we*3.4;const g=c.createRadialGradient(cx,cy+he*0.3,1,cx,cy+he*0.3,gr);g.addColorStop(0,P.glow+'99');g.addColorStop(1,P.glow+'00');
  c.fillStyle=g;c.fillRect(cx-gr,cy+he*0.3-gr,gr*2,gr*2);c.fillStyle=P.door;c.fillRect(Math.round(cx-we*0.8),Math.round(cy-he),Math.round(we*1.6),Math.round(he*2));
  c.fillStyle=P.glow;c.fillRect(Math.round(cx-dw),Math.round(cy+he-dh),Math.round(dw*2),Math.round(dh));
  c.fillStyle='#fff3d1';c.fillRect(Math.round(cx-dw*0.5),Math.round(cy+he-dh*0.8),Math.round(dw),Math.round(dh*0.8));
  // torches on d1 walls
  for(const sg of[-1,1]){
    const tx=Math.round(cx+sg*(rs[1][0]+ (rs[0][0]-rs[1][0])*0.5)), ty=Math.round(cy-rs[1][1]*0.35);
    const tg=c.createRadialGradient(tx,ty,1,tx,ty,26*k);tg.addColorStop(0,P.glow2+'aa');tg.addColorStop(1,P.glow2+'00');
    c.fillStyle=tg;c.fillRect(tx-30*k,ty-30*k,60*k,60*k);
    c.fillStyle='#3a2a1a';c.fillRect(tx-1,ty,3,8);
    c.fillStyle=P.glow2;c.fillRect(tx-2,ty-4,5,4);c.fillStyle=P.glow;c.fillRect(tx-1,ty-6,3,4);c.fillStyle='#fff3d1';c.fillRect(tx,ty-4,1,2);
  }
  // monster sprite (floating eye wisp)
  const M=['....xxxxx....','..xxyyyyyxx..','.xyyyyyyyyyx.','xyyyzzzzzyyyx','xyyzzwwwzzyyx','xyyzzwkwzzyyx','xyyzzwwwzzyyx','xyyyzzzzzyyyx','.xyyyyyyyyyx.','..xxyyyyyxx..','...x.x.x.x...','..x...x...x..'];
  const col={x:P.mon2,y:P.mon,z:'#ffffff',w:P.eye,k:'#000000'};
  const ms=Math.max(1,Math.round(k*(opt.monScale||1.6)));
  const mx=Math.round(cx-M[0].length*ms/2),my=Math.round(cy-M.length*ms*0.55);
  const mg=c.createRadialGradient(cx,cy,1,cx,cy,20*k);mg.addColorStop(0,P.mon+'66');mg.addColorStop(1,P.mon+'00');c.fillStyle=mg;c.fillRect(cx-24*k,cy-24*k,48*k,48*k);
  M.forEach((row,j)=>[...row].forEach((ch,i)=>{if(col[ch]){c.fillStyle=col[ch];c.fillRect(mx+i*ms,my+j*ms,ms,ms)}}));
  // dust
  for(let i=0;i<40;i++){c.fillStyle=R()<.5?P.glow+'88':'#ffffff55';c.fillRect(Math.round(R()*W),Math.round(R()*viewH),1,1)}
  if(opt.ui!==false){
    // minimap
    const mm=Math.round(22*k),mx0=W-mm-Math.round(5*k),my0=Math.round(5*k);
    c.fillStyle=P.ui+'dd';c.fillRect(mx0,my0,mm,mm);c.strokeStyle=P.uiLine;c.strokeRect(mx0+.5,my0+.5,mm-1,mm-1);
    const cell=Math.max(1,Math.round(2*k));
    for(let y=0;y<9;y++)for(let x=0;x<9;x++){if(R()<.42){c.fillStyle=P.uiLine+'88';c.fillRect(mx0+2+x*cell*1.1,my0+2+y*cell*1.1,cell,cell)}}
    c.fillStyle=P.glow;c.fillRect(mx0+mm/2-1,my0+mm/2-1,cell+1,cell+1);
    // party UI
    const y0=viewH;c.fillStyle=P.ui;c.fillRect(0,y0,W,H-y0);
    c.fillStyle=P.uiLine;c.fillRect(0,y0,W,1);
    const n=4,gap=Math.round(3*k),bw=(W-gap*(n+1))/n;
    for(let i=0;i<n;i++){const x=Math.round(gap+i*(bw+gap)),y=y0+Math.round(3*k),bh=H-y0-Math.round(6*k);
      c.strokeStyle=P.uiLine+'aa';c.strokeRect(x+.5,y+.5,Math.round(bw)-1,bh-1);
      c.fillStyle=P.uiLine+'55';c.fillRect(x+3,y+3,Math.round(bw*0.45),2);
      const hpw=Math.round((bw-6)*(0.45+R()*0.55)),mpw=Math.round((bw-6)*(0.3+R()*0.7));
      c.fillStyle='#ffffff18';c.fillRect(x+3,y+bh-9,Math.round(bw)-6,2);c.fillRect(x+3,y+bh-5,Math.round(bw)-6,2);
      c.fillStyle=P.hp;c.fillRect(x+3,y+bh-9,hpw,2);c.fillStyle=P.mp;c.fillRect(x+3,y+bh-5,mpw,2);}
  }
}

// ---------- FATAL FRENZY ----------
const FF_DEF={sky1:'#1a0630',sky2:'#ff2f6b',sun:'#ffd23f',far:'#2a0b45',plat:'#120818',edge:'#ff3df2',edge2:'#3dfcff',
  p1:'#ff3d5a',p2:'#3dd6ff',rim:'#ffffff',spark:'#fff27a',hud:'#0c0612'};

function fighter(c,x,y,s,col,rim,pose){
  // pose: joints relative, s = scale
  const J=pose.map(([a,b])=>[x+a*s,y+b*s]);
  // indices: 0 head,1 neck,2 hip,3 lhand,4 lelbow,5 rhand,6 relbow,7 lfoot,8 lknee,9 rfoot,10 rknee
  const seg=(i,j,w)=>{c.beginPath();c.moveTo(...J[i]);c.lineTo(...J[j]);c.lineWidth=w*s;c.stroke()};
  const draw=(stroke,ext)=>{c.strokeStyle=stroke;c.lineCap='round';c.lineJoin='round';
    seg(1,2,24+ext);seg(1,4,12+ext);seg(4,3,10+ext);seg(1,6,12+ext);seg(6,5,10+ext);seg(2,8,16+ext);seg(8,7,13+ext);seg(2,10,16+ext);seg(10,9,13+ext);
    c.beginPath();c.arc(J[0][0],J[0][1],(12+ext/2)*s,0,7);c.fillStyle=stroke;c.fill()};
  c.save();c.shadowColor=col;c.shadowBlur=30*s;draw(rim,5);c.restore();
  draw(col,0);
}

function drawFrenzy(cv,opt={}){
  const P=Object.assign({},FF_DEF,opt.pal||{});
  const W=cv.width=opt.w||1600,H=cv.height=opt.h||900;const c=cv.getContext('2d');const k=W/1600;const R=rng(opt.seed||11);
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sky1);g.addColorStop(.72,P.sky2);g.addColorStop(1,P.sky1);c.fillStyle=g;c.fillRect(0,0,W,H);
  // sun with bands
  const sx=W*0.5,sy=H*0.46,sr=230*k;
  c.save();c.beginPath();c.arc(sx,sy,sr,0,7);c.clip();
  const sg=c.createLinearGradient(0,sy-sr,0,sy+sr);sg.addColorStop(0,P.sun);sg.addColorStop(1,P.edge);c.fillStyle=sg;c.fillRect(sx-sr,sy-sr,sr*2,sr*2);
  c.fillStyle=P.sky2;for(let i=0;i<7;i++){const yy=sy+sr*0.1+i*i*5.2*k+i*14*k;c.fillRect(sx-sr,yy,sr*2,(3+i*2.2)*k)}
  c.restore();
  // far pillars / city
  c.fillStyle=P.far;
  for(let i=0;i<34;i++){const w=(26+R()*60)*k,x=R()*W,h=(80+R()*260)*k;c.fillRect(x,H*0.72-h,w,h+H)}
  // grid floor
  c.strokeStyle=P.edge2+'55';c.lineWidth=1.5*k;
  for(let i=-22;i<=22;i++){c.beginPath();c.moveTo(W/2+i*30*k,H*0.72);c.lineTo(W/2+i*220*k,H);c.stroke()}
  for(let i=0;i<9;i++){const yy=H*0.72+Math.pow(i/8,1.9)*H*0.28;c.beginPath();c.moveTo(0,yy);c.lineTo(W,yy);c.stroke()}
  // platforms
  const plat=(x,y,w,t,main)=>{
    c.save();c.shadowColor=P.edge;c.shadowBlur=40*k;
    c.fillStyle=P.plat;c.beginPath();c.moveTo(x,y);c.lineTo(x+w,y);c.lineTo(x+w-(main?70:20)*k,y+t);c.lineTo(x+(main?70:20)*k,y+t);c.closePath();c.fill();c.restore();
    c.fillStyle=P.edge;c.fillRect(x,y-3*k,w,6*k);
    c.fillStyle=P.edge2;c.fillRect(x+(main?70:20)*k,y+t-2*k,w-(main?140:40)*k,3*k);
    if(main){for(let i=1;i<9;i++){c.fillStyle=P.edge2+'40';c.fillRect(x+w*i/9,y+10*k,2*k,t-24*k)}}
  };
  plat(W*0.2,H*0.7,W*0.6,120*k,true);
  plat(W*0.12,H*0.46,W*0.18,26*k,false);plat(W*0.7,H*0.46,W*0.18,26*k,false);plat(W*0.41,H*0.28,W*0.18,26*k,false);
  // speed lines
  c.strokeStyle='#ffffff55';c.lineWidth=2*k;
  for(let i=0;i<26;i++){const y=H*(0.34+R()*0.3),x=W*(0.18+R()*0.25),l=(60+R()*160)*k;c.beginPath();c.moveTo(x,y);c.lineTo(x+l,y-l*0.12);c.stroke()}
  // fighters
  const kick=[[0,-58],[4,-44],[-6,-6],[-30,-60],[-18,-48],[30,-36],[18,-44],[52,-16],[24,-8],[-30,30],[-18,12]];
  const hit=[[0,-58],[-2,-44],[4,-6],[34,-78],[20,-62],[-34,-70],[-20,-56],[26,32],[14,14],[-16,34],[-8,16]];
  const bob=Math.sin((opt.t||0)*2)*10*k;fighter(c,W*0.42,H*0.55+bob,2.6*k,P.p1,P.rim,kick);
  fighter(c,W*0.615,H*0.5-bob,2.6*k,P.p2,P.rim,hit.map(([a,b])=>[a,b]));
  // impact
  const ix=W*0.535,iy=H*0.455;c.save();c.translate(ix,iy);c.shadowColor=P.spark;c.shadowBlur=50*k;c.fillStyle=P.spark;c.beginPath();
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=(i%2?28:92)*k*(0.8+R()*0.5);c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill();
  c.fillStyle='#fff';c.beginPath();c.arc(0,0,18*k,0,7);c.fill();c.restore();
  // sparks
  for(let i=0;i<30;i++){c.fillStyle=R()<.5?P.spark:P.edge2;const a=R()*7,d=(60+R()*170)*k;c.fillRect(ix+Math.cos(a)*d,iy+Math.sin(a)*d,5*k,5*k)}
  if(opt.hud!==false){
    const cards=[[P.p1,'[P1]','127%'],[P.p2,'[P2]','64%']];
    cards.forEach(([col,n,pc],i)=>{const w=230*k,h=96*k,x=W/2+(i?20*k:-w-20*k),y=H-h-34*k;
      c.fillStyle=P.hud+'e6';c.fillRect(x,y,w,h);c.fillStyle=col;c.fillRect(x,y,8*k,h);
      c.fillStyle=col;c.font=`700 ${15*k}px "Space Mono", monospace`;c.fillText(n,x+28*k,y+28*k);
      c.fillStyle='#ffffff';c.font=`italic 900 ${50*k}px Archivo, sans-serif`;c.fillText(pc,x+26*k,y+78*k);
      c.fillStyle=col;for(let s=0;s<3;s++){c.beginPath();c.arc(x+w-64*k+s*20*k,y+24*k,6*k,0,7);c.fill()}});
  }
}

function paintAll(){
  document.querySelectorAll('canvas[data-scene]').forEach(cv=>{
    const o=JSON.parse(cv.dataset.opt||'{}');
    if(cv.dataset.scene==='scape')drawScape(cv,o);else if(cv.dataset.scene==='frenzy')drawFrenzy(cv,o);
  });
}

// ---------- SCAPE v1.1: top-down pixel hack and slash ----------
const HS_DEF={floorA:'#2a2150',floorB:'#241c46',crack:'#17112f',wall:'#3b2f6b',wallD:'#1d1638',mortar:'#120e24',wallTop:'#5d4bb0',
  glow:'#ffb347',glow2:'#ff5e3a',door:'#0a0714',hero:'#3dd6ff',cloak:'#8f7bff',skin:'#ffd7b0',hair:'#1b1030',blade:'#e9fbff',
  slash:'#7cf7ff',slime:'#ff4fd8',slime2:'#8a1fff',hit:'#ffffff',dmg:'#ffd36b',gem:'#4dff8f',ui:'#0b0918',heart:'#ff3d5a'};
const DIG={'0':['111','101','101','101','111'],'1':['010','110','010','010','111'],'2':['111','001','111','100','111'],'3':['111','001','111','001','111'],'4':['101','101','111','001','001'],'5':['111','100','111','001','111'],'6':['111','100','111','101','111'],'7':['111','001','010','010','010'],'8':['111','101','111','101','111'],'9':['111','101','111','001','111'],'x':['000','101','010','101','000']};
function pxText(c,t,x,y,s,col,sh){[...t].forEach((ch,i)=>{const g=DIG[ch];if(!g)return;g.forEach((r,j)=>[...r].forEach((b,k)=>{if(b==='1'){if(sh){c.fillStyle=sh;c.fillRect(x+(i*4+k)*s+s,y+j*s+s,s,s)}c.fillStyle=col;c.fillRect(x+(i*4+k)*s,y+j*s,s,s)}}))})}
function sprite(c,M,col,x,y,s=1,flip=false){const w=M[0].length;M.forEach((r,j)=>[...r].forEach((ch,i)=>{if(col[ch]){c.fillStyle=col[ch];c.fillRect(x+(flip?w-1-i:i)*s,y+j*s,s,s)}}))}
function drawScapeHS(cv,opt={}){
  const P=Object.assign({},HS_DEF,opt.pal||{});const W=cv.width=opt.w||192,H=cv.height=opt.h||108;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const R=rng(opt.seed||5);
  const T=12,wallH=opt.wallH??28;
  for(let y=wallH;y<H;y+=T)for(let x=0;x<W;x+=T){const ix=x/T|0,iy=y/T|0;c.fillStyle=(ix+iy)%2?P.floorA:P.floorB;c.fillRect(x,y,T,T);c.fillStyle=P.crack;c.fillRect(x,y,T,1);c.fillRect(x,y,1,T);
    if(R()<.18){c.fillStyle=P.crack;let cx=x+2+R()*8|0,cy=y+2+R()*8|0;for(let k=0;k<4;k++){c.fillRect(cx,cy,1,1);cx+=R()<.5?1:0;cy+=1}}}
  // wall
  c.fillStyle=P.wall;c.fillRect(0,0,W,wallH);
  for(let y=0;y<wallH-4;y+=6){c.fillStyle=P.mortar;c.fillRect(0,y,W,1);for(let x=(y/6%2)*6;x<W;x+=12)c.fillRect(x,y,1,6)}
  c.fillStyle=P.wallTop;c.fillRect(0,wallH-4,W,1);c.fillStyle=P.wallD;c.fillRect(0,wallH-3,W,3);
  // door
  const dx=W/2-12,dw=24;c.fillStyle=P.door;c.fillRect(dx,wallH-26,dw,26);c.fillRect(dx+2,wallH-28,dw-4,2);c.fillRect(dx+5,wallH-30,dw-10,2);
  const dg=c.createRadialGradient(W/2,wallH,1,W/2,wallH,60);dg.addColorStop(0,P.glow+'66');dg.addColorStop(1,P.glow+'00');c.fillStyle=dg;c.fillRect(0,0,W,H);
  c.fillStyle=P.glow;c.fillRect(dx+6,wallH-18,dw-12,18);c.fillStyle='#fff3d1';c.fillRect(dx+9,wallH-14,dw-18,14);
  // torches
  [[W*0.22],[W*0.78]].forEach(([tx])=>{tx=Math.round(tx);const ty=wallH-18;const tg=c.createRadialGradient(tx,ty,1,tx,ty,40);tg.addColorStop(0,P.glow2+'77');tg.addColorStop(1,P.glow2+'00');c.fillStyle=tg;c.fillRect(tx-40,ty-40,80,80);
    c.fillStyle='#3a2a1a';c.fillRect(tx-1,ty,3,7);c.fillStyle=P.glow2;c.fillRect(tx-2,ty-4,5,4);c.fillStyle=P.glow;c.fillRect(tx-1,ty-6,3,4);c.fillStyle='#fff3d1';c.fillRect(tx,ty-4,1,2)});
  // gems + coins
  for(let i=0;i<9;i++){const x=R()*W|0,y=wallH+6+R()*(H-wallH-12)|0;c.fillStyle=i%3?P.dmg:P.gem;c.fillRect(x,y,2,2);c.fillStyle='#fff';c.fillRect(x,y,1,1)}
  const hx=Math.round(W*(opt.hx||0.48)),hy=Math.round(H*(opt.hy||0.6));
  // slimes
  const S=['...xxxx...','..xyyyyx..','.xyyyyyyx.','xyyzyyzyyx','xyyzyyzyyx','xyyyyyyyyx','xyyyyyyyyx','.xxxxxxxx.'];
  const foes=opt.foes||[[0.68,0.5,1],[0.7,0.72,1],[0.3,0.48,0],[0.2,0.78,0],[0.85,0.6,0],[0.55,0.86,0],[0.38,0.84,0]];
  foes.forEach(([fx,fy,hit],i)=>{const x=Math.round(W*fx),y=Math.round(H*fy+(opt.t==null?0:Math.round(Math.sin(opt.t*4+i)*1.5)));c.fillStyle='#00000055';c.fillRect(x+1,y+8,9,2);
    sprite(c,S,hit?{x:P.hit,y:P.hit,z:P.slime}:{x:P.slime2,y:P.slime,z:'#ffffff'},x,y);
    if(hit){for(let k=0;k<8;k++){c.fillStyle=k%2?P.slash:P.hit;c.fillRect(x+5+Math.cos(k)*(8+R()*6)|0,y+4+Math.sin(k)*(6+R()*5)|0,1,1)}pxText(c,i?'24':'31',x+12,y-8,1,P.dmg,'#000')}});
  // shadow + hero (facing right)
  c.fillStyle='#00000066';c.fillRect(hx-4,hy+12,10,2);
  const HM=['...hhhh...','..hhhhhh..','..hssss...','..hsssss..','...ssss...','.cccbbccc.','ccbbbbbbcc','ccbbbbbbcc','.cbbbbbbc.','..bbbbbb..','..bb..bb..','..bb..bb..','..dd..dd..'];
  sprite(c,HM,{h:P.hair,s:P.skin,c:P.cloak,b:P.hero,d:'#1b1030'},hx-5,hy-1);
  // slash arc
  c.save();const ag=c.createRadialGradient(hx+6,hy+4,4,hx+6,hy+4,34);ag.addColorStop(0,P.slash+'55');ag.addColorStop(1,P.slash+'00');c.fillStyle=ag;c.fillRect(hx-30,hy-30,72,72);c.restore();
  const sw=opt.t==null?85:(-75+((opt.t*1.6)%1.6>1?160:((opt.t*1.6)%1.6)*160));for(let a=-75;a<=sw;a+=2){const r=a*Math.PI/180;const k=(a+75)/160;for(let t=0;t<3+k*3;t++){const rr=17+t;c.fillStyle=t<1?P.hit:P.slash+(k>0.5?'ff':'aa');c.fillRect(Math.round(hx+6+Math.cos(r)*rr),Math.round(hy+4+Math.sin(r)*rr*0.8),1,1)}}
  // sword
  c.fillStyle=P.blade;for(let i=0;i<9;i++)c.fillRect(hx+6+i,hy+4+Math.round(i*0.55),1,1);c.fillStyle=P.dmg;c.fillRect(hx+5,hy+3,2,3);
  // dust
  for(let i=0;i<40;i++){c.fillStyle=R()<.5?P.glow+'88':'#ffffff44';c.fillRect(R()*W|0,R()*H|0,1,1)}
  // vignette
  const vg=c.createRadialGradient(W/2,H*0.55,H*0.35,W/2,H*0.55,W*0.7);vg.addColorStop(0,'#00000000');vg.addColorStop(1,'#000000aa');c.fillStyle=vg;c.fillRect(0,0,W,H);
  if(opt.ui!==false){for(let i=0;i<5;i++){const x=6+i*9,y=6;c.fillStyle=i<4?P.heart:'#ffffff30';c.fillRect(x,y+1,7,4);c.fillRect(x+1,y,2,1);c.fillRect(x+4,y,2,1);c.fillRect(x+1,y+5,5,1);c.fillRect(x+2,y+6,3,1);c.fillRect(x+3,y+7,1,1)}
    c.fillStyle=P.ui+'cc';c.fillRect(6,17,44,4);c.fillStyle=P.gem;c.fillRect(7,18,30,2);
    pxText(c,'x12',W-36,6,2,P.dmg,'#000');}
}
const _pa=paintAll;paintAll=function(){document.querySelectorAll('canvas[data-scene="hs"]').forEach(cv=>drawScapeHS(cv,JSON.parse(cv.dataset.opt||'{}')));_pa()};

// ---------- acid squiggle poster (from the festival ticket pin) ----------
function drawSquiggle(cv,opt={}){
  const W=cv.width=opt.w||600,H=cv.height=opt.h||800;const c=cv.getContext('2d');const R=rng(opt.seed||3);
  c.fillStyle='#000';c.fillRect(0,0,W,H);
  const cols=opt.cols||['#00e5ff','#7a3cff','#ff2fb4','#ffcc00'];
  for(let i=0;i<(opt.n||5);i++){const g=c.createLinearGradient(R()*W,0,R()*W,H);g.addColorStop(0,cols[i%cols.length]);g.addColorStop(1,cols[(i+1)%cols.length]);
    c.strokeStyle=g;c.lineWidth=W*(0.07+R()*0.03);c.lineCap='round';c.lineJoin='round';c.beginPath();let x=R()*W,y=R()*H;c.moveTo(x,y);
    for(let k=0;k<4;k++){c.bezierCurveTo(x+(R()-.5)*W,y+(R()-.5)*H,x+(R()-.5)*W,y+(R()-.5)*H,x=R()*W,y=R()*H)}c.stroke()}
  for(let i=0;i<3;i++){const g=c.createRadialGradient(0,0,0,0,0,1);const x=R()*W,y=R()*H,r=W*(0.12+R()*0.1);const rg=c.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,cols[i]);rg.addColorStop(1,cols[(i+2)%4]);c.fillStyle=rg;c.beginPath();
    for(let a=0;a<=24;a++){const t=a/24*Math.PI*2,rr=r*(a%2?0.78:1);c.lineTo(x+Math.cos(t)*rr,y+Math.sin(t)*rr)}c.fill()}
  const id=c.getImageData(0,0,W,H);for(let i=0;i<id.data.length;i+=4){const n=(R()-.5)*22;id.data[i]+=n;id.data[i+1]+=n;id.data[i+2]+=n}c.putImageData(id,0,0);
}
const _pa2=paintAll;paintAll=function(){document.querySelectorAll('canvas[data-scene="sq"]').forEach(cv=>drawSquiggle(cv,JSON.parse(cv.dataset.opt||'{}')));_pa2()};

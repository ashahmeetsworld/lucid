// Scape pixel worlds for the Lucid home page, from the project deck (pixelworld + regions), wrapped so nothing leaks.
const SCP=(function(){
// Scape v1.3 — one pixel world. Every scene shares one palette, one light, one pixel scale.
function PR(seed){let s=seed>>>0||1;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const PAL={
 night:{sky:'#141a33',far:'#1b2240',wall:'#262f4a',wall2:'#2e3a5a',walk:'#3a4766',walk2:'#425074',tile:'#4a5878',tile2:'#3f4c6c',line:'#323d5c',
  fac:['#2e3d5e','#34506a','#3d4f78','#2b4a55','#4a3f6a'],trim:'#1a2036',win:'#ffe3a0',winOff:'#24304e',cool:'#8fe0ff',
  sign:['#ff4f9a','#4fe3ff','#ffd24a','#7dff9a','#ff8a3d','#e8484a'],roof:'#2a5a9a',roof2:'#1f4478',awn:['#e8484a','#f4ecd8'],light:'#ffd27a'},
 lantern:{sky:'#2a1838',far:'#35203f',wall:'#3a2436',wall2:'#4a2d3f',walk:'#5a3a44',walk2:'#66434c',tile:'#6e4a50',tile2:'#5e3f46',line:'#4a2e38',
  fac:['#6a3a2e','#7a4a32','#5a3a3a','#8a5a3a','#6a4a5a'],trim:'#2a1620',win:'#ffcf7a',winOff:'#3a2430',cool:'#ffb0d0',
  sign:['#ff5a3d','#ffd24a','#ff9ad0','#ffb347','#e8484a','#7dffd0'],roof:'#b0383a',roof2:'#8a2a30',awn:['#ffd24a','#b0383a'],light:'#ffb347'},
 rain:{sky:'#1a1430',far:'#241a3e',wall:'#2a2244',wall2:'#342a52',walk:'#3a3460',walk2:'#443c6c',tile:'#4a4274',tile2:'#3e3864',line:'#2e2852',
  fac:['#3a3060','#4a3a6a','#2e3a62','#5a3a66','#3a4a6a'],trim:'#16122a',win:'#ffc8e8',winOff:'#2a2448',cool:'#8fe0ff',
  sign:['#ff4fd0','#4fe3ff','#ff6a8a','#b07aff','#ffd24a','#7dffd0'],roof:'#7a4aa8',roof2:'#5a3488',awn:['#ff4fd0','#2a2448'],light:'#ff9ad8'},
 sun:{sky:'#f6c98a',far:'#e8b47a',wall:'#c98a62',wall2:'#d89a6e',walk:'#e8c8a0',walk2:'#f0d4ae',tile:'#d8b48a',tile2:'#ccaa80',line:'#b8956e',
  fac:['#e8d4b0','#9fc4b8','#e8a080','#c8b8e0','#f0c880'],trim:'#6a4a3a',win:'#7fb8d8',winOff:'#5a8aa8',cool:'#ffffff',
  sign:['#e8484a','#2f8f8a','#ffd24a','#4a6ad8','#ff8a3d','#ff6fae'],roof:'#4a8ac8',roof2:'#3a6a9a',awn:['#e8484a','#fff3dc'],light:'#fff3c0'}
};
function px(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function glow(c,x,y,r,col,a){// dithered pixel glow
 for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++){const d=Math.sqrt(xx*xx+yy*yy)/r;if(d>1)continue;const p=(1-d)*(a||.5);
  if(((xx+yy)&1)&&p<.25)continue;c.globalAlpha=Math.min(.6,p);px(c,x+xx,y+yy,1,1,col)}c.globalAlpha=1}
const SPR={hero:['..hhhh..','.hhhhhh.','.hsffsh.','..ffff..','.bbbbbb.','b.bbbb.b','..bbbb..','..l..l..','..l..l..'],
 kid:['..hhh...','.hhhhh..','.hfffh..','..fff...','.cccccc.','..cccc..','..l..l..']};
function sprite(c,m,x,y,cols){m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(cols[ch])px(c,x+i,y+j,1,1,cols[ch])}))}
function person(c,R,x,y,P){const cols={h:['#3a2a2a','#f4ecd8','#ff8a3d','#2a2a4a','#c06bff'][Math.floor(R()*5)],f:'#f2c8a0',s:'#2a2030',b:P.sign[Math.floor(R()*P.sign.length)],c:P.fac[Math.floor(R()*P.fac.length)],l:'#1a1a2a'};
 px(c,x+1,y+9,6,1,'#00000055');sprite(c,R()<.5?SPR.hero:SPR.kid,x,y,cols)}
function windows(c,R,x,y,w,h,P,lit){for(let wy=y;wy<y+h-5;wy+=8)for(let wx=x+3;wx<x+w-6;wx+=8){const on=R()<(lit??.55);px(c,wx,wy,5,5,P.trim);px(c,wx+1,wy+1,3,3,on?(R()<.8?P.win:P.cool):P.winOff);if(on)px(c,wx+1,wy+1,1,1,'#ffffff')}}
function vsign(c,R,x,y,h,col){px(c,x-1,y-1,6,h+2,'#14182a');px(c,x,y,4,h,col);for(let k=y+2;k<y+h-2;k+=4)px(c,x+1,k,2,2,'#ffffff');glow(c,x+2,y+h/2,Math.min(14,h*.6),col,.35)}
function shop(c,R,x,y,w,P){// shopfront at street level: awning + lit window + door
 const a=P.awn;for(let i=0;i<w;i+=4)px(c,x+i,y,4,4,(i/4)%2?a[0]:a[1]);px(c,x,y+4,w,1,'#00000066');
 px(c,x+2,y+5,w-4,14,P.trim);px(c,x+4,y+7,w-16,10,P.win);px(c,x+5,y+8,3,2,'#ffffff');
 px(c,x+w-10,y+7,7,12,'#14182a');px(c,x+w-9,y+8,5,11,P.light);glow(c,x+w/2,y+22,12,P.light,.4)}
function building(c,R,x,y,w,h,P,o){const f=P.fac[Math.floor(R()*P.fac.length)];
 // roof top face (3/4 view)
 const rt=o&&o.roof||10;px(c,x,y,w,rt,P.trim);px(c,x+1,y+1,w-2,rt-2,shade(f,-.25));
 if(R()<.7){const ax=x+3+Math.floor(R()*(w-12));px(c,ax,y+2,7,5,'#8a96b0');px(c,ax+1,y+3,5,1,'#5a6680')}
 px(c,x,y+rt,w,h-rt,f);px(c,x,y+rt,w,2,shade(f,.18));px(c,x+w-2,y+rt,2,h-rt,shade(f,-.2));
 windows(c,R,x+1,y+rt+6,w-2,h-rt-30,P,o&&o.lit);
 shop(c,R,x+1,y+h-22,w-2,P);
 if(R()<.75)vsign(c,R,x+(R()<.5?2:w-6),y+rt+8,14+Math.floor(R()*16),P.sign[Math.floor(R()*P.sign.length)])}
function shade(hex,k){let n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k<0?v*(1+k):v+(255-v)*k)));return '#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}
function house(c,R,x,y,w,P){// pitched roof house like the reference
 const rh=Math.floor(w*.55);for(let i=0;i<rh;i++){const ww=Math.max(2,w*(i+1)/rh);px(c,x+w/2-ww/2,y+i,ww,1,i%3?P.roof:P.roof2)}
 for(let i=2;i<rh;i+=3)for(let k=0;k<w;k+=5)px(c,x+k+(i%2)*2,y+i,1,1,shade(P.roof,.2));
 px(c,x+2,y+rh,w-4,26,P.fac[2]);px(c,x+2,y+rh,w-4,2,shade(P.fac[2],.2));
 px(c,x+w/2-6,y+rh+6,12,9,P.trim);px(c,x+w/2-5,y+rh+7,10,7,P.win);glow(c,x+w/2,y+rh+10,10,P.light,.3)}
function billboard(c,R,x,y,w,h,P){px(c,x-1,y-1,w+2,h+2,'#14182a');px(c,x,y,w,h,'#f4a050');px(c,x+2,y+2,w-4,h-4,'#ff6a4a');
 // creature icon: round body + claws (original)
 const cx=x+w/2,cy=y+h/2;for(let yy=-6;yy<=6;yy++)for(let xx=-9;xx<=9;xx++)if(xx*xx/81+yy*yy/36<=1)px(c,cx+xx,cy+yy,1,1,'#ffb070');
 px(c,cx-4,cy-3,2,2,'#14182a');px(c,cx+2,cy-3,2,2,'#14182a');px(c,cx-13,cy-6,4,4,'#ffb070');px(c,cx+9,cy-6,4,4,'#ffb070');
 px(c,x+3,y+h-6,w-6,3,'#fff3dc');glow(c,cx,cy,w*.7,'#ff8a5a',.3)}
function pole(c,x,y1,y2,P){px(c,x,y1,3,y2-y1,'#5a4a40');px(c,x-6,y1+4,15,2,'#5a4a40');px(c,x-4,y1+12,11,2,'#5a4a40');px(c,x-6,y1+3,2,2,'#c8c0a8');px(c,x+7,y1+3,2,2,'#c8c0a8')}
function wire(c,x1,y1,x2,y2,sag){for(let t=0;t<=1;t+=1/Math.abs(x2-x1||1)){const x=x1+(x2-x1)*t,y=y1+(y2-y1)*t+sag*4*t*(1-t);px(c,x,y,1,1,'#0c0f1c')}}
function lamp(c,x,y,P){px(c,x,y,2,18,'#1a2036');px(c,x-2,y-2,6,3,'#1a2036');px(c,x-1,y,4,2,P.light);glow(c,x+1,y+12,16,P.light,.28)}

function lightPass(c,W,H,amb,L){const im=c.getImageData(0,0,W,H),d=im.data;
 const LL=L.map(l=>{const n=parseInt(l.c.slice(1),16);return [l.x,l.y,l.r,(n>>16)/255*(l.i||1),(n>>8&255)/255*(l.i||1),(n&255)/255*(l.i||1)]});
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){let r=amb[0],g=amb[1],b=amb[2];for(const l of LL){const dx=x-l[0],dy=(y-l[1])*1.25;const q=dx*dx+dy*dy;if(q>l[2]*l[2])continue;let f=1-Math.sqrt(q)/l[2];f=Math.ceil(f*5)/5;f*=f;r+=l[3]*f;g+=l[4]*f;b+=l[5]*f}
  const k=(y*W+x)*4;d[k]=Math.min(255,d[k]*Math.min(1.5,r));d[k+1]=Math.min(255,d[k+1]*Math.min(1.5,g));d[k+2]=Math.min(255,d[k+2]*Math.min(1.5,b))}
 c.putImageData(im,0,0)}
function glyphs(c,R,x,y,w,h,ink){for(let gx=x+2;gx<x+w-4;gx+=6){for(let k=0;k<3;k++){if(R()<.5)px(c,gx+Math.floor(R()*4),y+2,1,h-4,ink);else px(c,gx,y+2+Math.floor(R()*(h-4)),4,1,ink)}}}
function paintCity(cv,o){o=o||{};const W=cv.width=o.w||480,H=cv.height=o.h||270,c=cv.getContext('2d');c.imageSmoothingEnabled=false;const R=PR(o.seed||7);const P=PAL[o.style||'night'];
 const E=[],L=[];// emissive draw calls, lights
 const sun=o.style==='sun';
 px(c,0,0,W,H,P.wall);
 // back row (upper level): shops with glyph signs
 let x=-6;while(x<W){const w=30+Math.floor(R()*26),f=P.fac[Math.floor(R()*P.fac.length)];
  px(c,x,-2,w,68,f);px(c,x+w-2,-2,2,68,shade(f,-.3));px(c,x,0,w,2,shade(f,.2));
  // upper windows / balconies
  for(let wy=4;wy<30;wy+=10)for(let wx=x+3;wx<x+w-8;wx+=11){px(c,wx,wy,7,7,P.trim);if(R()<.45){const col=R()<.85?P.win:P.cool;E.push(()=>{px(c,wx+1,wy+1,5,5,col);px(c,wx+1,wy+1,2,1,'#fff')})}else px(c,wx+1,wy+1,5,5,P.winOff);if(R()<.3){px(c,wx-1,wy+7,9,1,'#8a96b0');px(c,wx-1,wy+5,1,2,'#8a96b0');px(c,wx+7,wy+5,1,2,'#8a96b0')}}
  if(R()<.6)px(c,x+w-12,30,8,5,'#8a96b0');
  // glyph sign over shop
  const sc=P.sign[Math.floor(R()*P.sign.length)];const sw=w-8;E.push(()=>{px(c,x+4,38,sw,9,'#14182a');px(c,x+5,39,sw-2,7,sc);glyphs(c,R,x+5,39,sw-2,7,'#14182a')});L.push({x:x+w/2,y:44,r:22,c:sc,i:.5});
  // shopfront or shutter
  if(R()<.75){px(c,x+3,49,w-6,17,P.trim);E.push(()=>{px(c,x+4,50,w-14,13,P.win);px(c,x+w-9,50,5,16,P.light);for(let k=x+6;k<x+w-14;k+=5)px(c,k,58,3,4,P.sign[k%6])});L.push({x:x+w/2,y:62,r:34,c:P.light,i:.8})}
  else{px(c,x+3,49,w-6,17,'#5a6680');for(let j=50;j<66;j+=2)px(c,x+3,j,w-6,1,'#4a5670')}
  x+=w}
 // upper walkway + railing
 px(c,0,66,W,30,P.walk);for(let i=0;i<W;i+=12)px(c,i,66,1,30,P.line);for(let j=74;j<96;j+=8)px(c,0,j,W,1,P.line);
 px(c,0,88,W,1,'#8a96b0');for(let i=0;i<W;i+=8)px(c,i,88,1,8,'#8a96b0');px(c,0,96,W,3,P.trim);
 // retaining wall with posters and weeds
 px(c,0,99,W,72,P.wall);for(let j=101;j<171;j+=6)for(let i=((j-101)/6%2)*7;i<W;i+=14)px(c,i,j,13,5,P.wall2);
 for(let k=0;k<10;k++){const qx=R()*W,qy=110+R()*40;px(c,qx,qy,8,11,['#f4ecd8','#ff6fae','#ffd24a','#8fe0ff'][k%4]);px(c,qx+1,qy+2,6,1,'#14182a');px(c,qx+1,qy+5,4,1,'#14182a')}
 c.globalAlpha=.4;for(let k=0;k<2;k++){const gx=60+k*300,gy=134;for(let a=0;a<6.28;a+=.08)px(c,gx+Math.cos(a)*16,gy+Math.sin(a)*11,1,1,'#c8d8e8');px(c,gx-7,gy-3,4,4,'#c8d8e8');px(c,gx+3,gy-3,4,4,'#c8d8e8')}c.globalAlpha=1;
 for(let i=0;i<W;i+=2){const h=3+Math.floor(R()*9);px(c,i,171-h,1,h,R()<.5?'#3a6a4a':'#2a5038')}
 // central stairs
 const sw=64,sx=Math.floor(W/2-sw/2);px(c,sx-6,96,sw+12,128,P.trim);for(let j=99;j<224;j+=5){px(c,sx,j,sw,3,P.tile);px(c,sx,j+3,sw,2,P.tile2)}
 px(c,sx-6,96,4,128,'#5a6680');px(c,sx+sw+2,96,4,128,'#5a6680');px(c,sx-4,96,1,128,'#8a96b0');px(c,sx+sw+3,96,1,128,'#8a96b0');
 // left: shop block (3/4 roof) + vending
 function block(bx,by,bw,bh,f){px(c,bx,by,bw,12,shade(f,-.35));px(c,bx,by,bw,1,'#0c0f1c');px(c,bx+4,by+3,8,5,'#8a96b0');
  px(c,bx,by+12,bw,bh-12,f);px(c,bx,by+12,bw,2,shade(f,.2));
  for(let wy=by+18;wy<by+bh-34;wy+=12)for(let wx=bx+4;wx<bx+bw-10;wx+=12){px(c,wx,wy,8,8,P.trim);if(R()<.5){const col=R()<.8?P.win:P.cool;E.push(()=>px(c,wx+1,wy+1,6,6,col))}else px(c,wx+1,wy+1,6,6,P.winOff)}
  const a=P.awn;for(let i=0;i<bw;i+=4)px(c,bx+i,by+bh-26,4,4,(i/4)%2?a[0]:a[1]);
  px(c,bx+3,by+bh-22,bw-6,22,P.trim);E.push(()=>{px(c,bx+5,by+bh-20,bw-20,13,P.win);px(c,bx+bw-12,by+bh-20,7,20,P.light)});L.push({x:bx+bw/2,y:by+bh+4,r:40,c:P.light,i:.9})}
 block(-4,108,92,116,P.fac[0]);block(88,128,64,96,P.fac[4]);
 E.push(()=>{px(c,150,140,6,42,'#14182a');px(c,151,141,4,40,P.sign[0]);glyphs(c,R,151,141,4,40,'#14182a')});L.push({x:153,y:160,r:30,c:P.sign[0],i:.7});
 // right: pitched-roof house, billboard, tall shop
 const hx=sx+sw+16;const rh=34;for(let i=0;i<rh;i++){const ww=Math.min(80,8+i*2.4);px(c,hx+40-ww/2,112+i,ww,1,i%4?P.roof:P.roof2)}
 px(c,hx+2,146,76,40,P.fac[2]);px(c,hx+2,146,76,2,shade(P.fac[2],.2));px(c,hx+30,160,20,26,P.trim);E.push(()=>{px(c,hx+32,162,16,24,P.win);px(c,hx+8,154,12,10,P.win)});L.push({x:hx+40,y:188,r:38,c:P.light,i:.8});
 px(c,hx+2,186,76,38,P.fac[1]);E.push(()=>{px(c,hx+6,192,30,10,'#14182a');px(c,hx+7,193,28,8,P.sign[2]);glyphs(c,R,hx+7,193,28,8,'#14182a')});
 const bbx=W-120,bby=104;px(c,bbx,bby,62,120,P.fac[3]);E.push(()=>{billboard(c,R,bbx+4,bby+8,54,40,P)});L.push({x:bbx+31,y:bby+30,r:56,c:'#ff8a5a',i:.8});
 block(W-58,96,62,128,P.fac[1]);E.push(()=>{px(c,W-66,118,6,52,'#14182a');px(c,W-65,119,4,50,P.sign[1]);glyphs(c,R,W-65,119,4,50,'#14182a')});L.push({x:W-63,y:144,r:30,c:P.sign[1],i:.7});
 // lower street
 px(c,0,224,W,H-224,P.tile);for(let j=226;j<H;j+=8)for(let i=((j-226)/8%2)*8;i<W;i+=16)px(c,i,j,8,8,P.tile2);px(c,0,224,W,2,P.trim);
 // street props: vending machines, cones, bins, bike
 for(const vx of [176,W-178]){px(c,vx,206,14,22,'#d8dce8');E.push(()=>{px(c,vx+2,208,10,10,'#8fe0ff');for(let k=0;k<3;k++)px(c,vx+3+k*3,210,2,2,P.sign[k])});L.push({x:vx+7,y:218,r:24,c:'#8fe0ff',i:.6})}
 for(let k=0;k<6;k++){const cx2=20+k*86+R()*20,cy2=246+R()*14;px(c,cx2,cy2,4,6,'#ff8a3d');px(c,cx2-1,cy2+5,6,2,'#c8603a');px(c,cx2,cy2+2,4,1,'#f4ecd8')}
 px(c,104,236,16,1,'#1a1a2a');px(c,104,240,4,4,'#1a1a2a');px(c,116,240,4,4,'#1a1a2a');px(c,108,236,6,4,'#e8484a');
 // poles + wires
 pole(c,sx-20,24,224,P);pole(c,sx+sw+18,20,112,P);wire(c,0,40,sx-18,30,8);wire(c,sx-16,30,sx+sw+20,26,12);wire(c,sx+sw+22,26,W,38,10);wire(c,0,50,W,56,26);
 for(const [lx,ly] of [[40,206],[W-44,206],[sx-14,70],[sx+sw+12,70]]){px(c,lx,ly,2,18,'#1a2036');px(c,lx-2,ly-2,6,3,'#1a2036');E.push(()=>px(c,lx-1,ly,4,2,P.light));L.push({x:lx+1,y:ly+16,r:46,c:P.light,i:.9})}
 // people
 const n=o.people??12;for(let k=0;k<n;k++){const z=R();let ppx,ppy;if(z<.45){ppx=10+R()*(W-30);ppy=230+R()*(H-245)}else if(z<.7){ppx=sx+8+R()*(sw-16);ppy=110+R()*100}else{ppx=10+R()*(W-30);ppy=70+R()*12}person(c,R,ppx,ppy,P)}
 if(o.style==='lantern'){for(let s2=1;s2<2;s2++){const y0=30+s2*48;for(let i=0;i<W;i+=2){const y=y0+6*Math.sin(i/W*Math.PI*3);px(c,i,y,1,1,'#2a1620');if(i%16==0){E.push(()=>{px(c,i-1,y+1,3,4,'#ff5a3d');px(c,i,y+2,1,1,'#ffd24a')});L.push({x:i,y:y+3,r:16,c:'#ffb347',i:.6})}}}}
 // neon: extra hanging and vertical signs, cyan + pink, stacked like a packed night street
 if(o.neon){const NS=['#4fe3ff','#ff4f9a','#ff4fd0','#7dff9a','#ffd24a'];
  const VX=[22,64,110,300,348,402,450];for(let k=0;k<7;k++){const vx=VX[k]+Math.floor(R()*6),vy=104+Math.floor(R()*30),vh=30+Math.floor(R()*26),col=NS[k%NS.length];
   E.push(()=>{px(c,vx-1,vy-1,9,vh+2,'#0c0f1c');px(c,vx,vy,7,vh,col);px(c,vx+1,vy+1,5,vh-2,shade(col,.35));glyphs(c,R,vx,vy,7,vh,'#0c0f1c')});L.push({x:vx+3,y:vy+vh/2,r:34,c:col,i:.9})}
  for(let k=0;k<5;k++){const hx2=30+k*96+Math.floor(R()*20),hy2=72,hw=26+Math.floor(R()*14),col=NS[(k+2)%NS.length];
   E.push(()=>{px(c,hx2-1,hy2-1,hw+2,10,'#0c0f1c');px(c,hx2,hy2,hw,8,col);glyphs(c,R,hx2,hy2,hw,8,'#0c0f1c')});L.push({x:hx2+hw/2,y:hy2+4,r:40,c:col,i:1.1})}
  L.forEach(l=>{l.r*=1.35;l.i=(l.i||1)*1.2})}
 // light
 if(!sun)lightPass(c,W,H,o.neon?[.3,.33,.55]:o.amb||(o.style==='lantern'?[.5,.38,.55]:o.style==='rain'?[.46,.4,.66]:[.42,.48,.68]),L);
 E.forEach(f=>f());
 if(!sun){// wet street reflections of the signs
  for(let k=0;k<70;k++){const rx=R()*W,ry=228+R()*(H-232);c.globalAlpha=.35;px(c,rx,ry,2+R()*5,1,P.sign[Math.floor(R()*P.sign.length)]);c.globalAlpha=1}
  if(o.style==='rain'){c.globalAlpha=.3;for(let k=0;k<260;k++){const rx=R()*W,ry=R()*H;px(c,rx,ry,1,5,'#b8c8ff')}c.globalAlpha=1}}
 if(o.neon)bloom(c,W,H);
}
// bloom: bright pixels bleed a soft coloured halo, the neon-sign glow
function bloom(c,W,H){const im=c.getImageData(0,0,W,H),d=im.data;const g=document.createElement('canvas');g.width=W;g.height=H;const gc=g.getContext('2d');const gi=gc.createImageData(W,H),q=gi.data;
 for(let k=0;k<d.length;k+=4){const m=Math.max(d[k],d[k+1],d[k+2]);if(m>200){q[k]=d[k];q[k+1]=d[k+1];q[k+2]=d[k+2];q[k+3]=255}}gc.putImageData(gi,0,0);
 c.save();c.globalCompositeOperation='lighter';c.imageSmoothingEnabled=true;c.filter='blur(6px)';c.globalAlpha=.6;c.drawImage(g,0,0);c.filter='blur(2px)';c.globalAlpha=.4;c.drawImage(g,0,0);c.restore()}

function tree(c,R,x,y,r,G){px(c,x-r*.8,y+r*.7,r*1.8,r*.5,'#00000044');
 for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++){const d=xx*xx+yy*yy;if(d>r*r)continue;const edge=d>(r-1.5)*(r-1.5);const hi=xx+yy<-r*.6;const lo=xx+yy>r*.5;
  px(c,x+xx,y+yy,1,1,edge?G[0]:hi?G[3]:lo?G[1]:G[2])}
 for(let k=0;k<r;k++){const a=R()*6.28,d=R()*r*.7;px(c,x+Math.cos(a)*d,y+Math.sin(a)*d,1,1,G[3])}}
function paintWild(cv,o){o=o||{};const W=cv.width=o.w||480,H=cv.height=o.h||270,c=cv.getContext('2d');c.imageSmoothingEnabled=false;const R=PR(o.seed||3);const E=[],L=[];
 const G=['#123029','#1f4a3a','#2f6a48','#6ab070'];const Gb=['#2a1230','#7a3a6a','#c06a9a','#ffb0d0'];const grass=['#3a7048','#407a50','#356842','#4a8458'];
 for(let y=0;y<H;y+=2)for(let x=0;x<W;x+=2)px(c,x,y,2,2,grass[Math.floor(R()*4)]);
 for(let k=0;k<500;k++){const x=R()*W,y=R()*H;px(c,x,y,1,3,'#2a5a3a');px(c,x+1,y+1,1,2,'#2a5a3a')}
 // canal with stone banks
 const ry=o.river??176;for(let x=0;x<W;x++){const y=ry+Math.round(8*Math.sin(x/70)+3*Math.sin(x/19));px(c,x,y-4,1,4,(x>>2)%2?'#8a8a96':'#7a7a88');px(c,x,y,1,24,'#1e6a7a');px(c,x,y+2,1,4,'#16525e');px(c,x,y+24,1,4,(x>>2)%2?'#8a8a96':'#7a7a88');
  if(R()<.07){const gy=y+6+Math.floor(R()*14);E.push(()=>px(c,x,gy,3,1,'#9af0e8'))}}
 // path
 const pxs=o.path??250;const pathX=y=>pxs+Math.round(22*Math.sin(y/50));for(let y=0;y<H;y++){const x=pathX(y);px(c,x-10,y,20,1,'#c8a878');px(c,x-10,y,2,1,'#8a6e4a');px(c,x+8,y,2,1,'#8a6e4a');if(y%6==0)px(c,x-6+(y%12?0:6),y,6,4,'#d8be8a')}
 const bx=pathX(ry);px(c,bx-15,ry-8,30,36,'#7a5034');for(let j=ry-8;j<ry+28;j+=4)px(c,bx-15,j,30,1,'#5a3a24');px(c,bx-17,ry-10,2,40,'#4a2a1a');px(c,bx+15,ry-10,2,40,'#4a2a1a');
 // cottages along the canal (lit windows)
 for(const [hx,hy] of (o.houses||[[330,124],[392,136],[90,214]])){const rw=44;for(let i=0;i<18;i++){const ww=Math.min(rw,6+i*2.6);px(c,hx+rw/2-ww/2,hy+i,ww,1,i%4?'#b0383a':'#8a2a30')}
  px(c,hx+3,hy+18,rw-6,20,'#c8a070');px(c,hx+3,hy+18,rw-6,2,'#e0bc8a');px(c,hx+rw/2-4,hy+26,8,12,'#4a2a1a');E.push(()=>{px(c,hx+8,hy+23,7,6,'#ffd27a');px(c,hx+rw-15,hy+23,7,6,'#ffd27a')});L.push({x:hx+rw/2,y:hy+38,r:40,c:'#ffb347',i:.9});
  for(let k=0;k<8;k++)px(c,hx+2+k*5,hy+38,3,3,['#ff7ac8','#ffd24a','#f4ecd8'][k%3])}
 // ruin gate to a dungeon, swallowed by roots
 if(o.cave!==false){const cx=o.cx??80,cy=o.cy??66;for(let yy=cy-26;yy<cy+8;yy+=4)for(let xx=cx-32+((yy-cy)/4%2)*4;xx<cx+32;xx+=8)px(c,xx,yy,7,3,['#a85a42','#8a4a3a','#b8664a'][Math.floor(R()*3)]);
  px(c,cx-34,cy-30,68,5,'#4a6a6a');for(let yy=0;yy<26;yy++){const ww=Math.round(16*Math.sqrt(1-((26-yy)/26)**2));px(c,cx-ww,cy-18+yy,ww*2,1,'#0a0612')}
  const rc=['#1e0e1a','#5a2a48','#a05a80'];for(let k=0;k<5;k++){const pts=[];let x=cx-30+k*15,y=cy-34,a=1.57+(k-2)*.3;for(let st=0;st<30;st++){a+=Math.sin(st*.3+k)*.12;x+=Math.cos(a);y+=Math.sin(a);pts.push([x,y])}strand(c,pts,3,rc)}
  E.push(()=>{px(c,cx-6,cy-4,3,2,'#9aff5a');px(c,cx+3,cy-4,3,2,'#9aff5a')});L.push({x:cx,y:cy,r:44,c:'#c06bff',i:.9})}
 // trees: greens + blossom
 const trees=o.trees??44;for(let k=0;k<trees;k++){const x=R()*W,y=R()*H;if(Math.abs(x-pathX(y))<28)continue;if(Math.abs(y-ry-10)<24)continue;if(o.cave!==false&&Math.hypot(x-(o.cx??80),y-(o.cy??66))<44)continue;
  if((o.houses||[[330,124],[392,136],[90,214]]).some(([hx,hy])=>x>hx-14&&x<hx+58&&y>hy-14&&y<hy+50))continue;tree(c,R,x,y,7+R()*9,R()<.22?Gb:G)}
 for(let k=0;k<26;k++){const fx=R()*W,fy=R()*H;for(let q=0;q<10;q++)px(c,fx+R()*10,fy+R()*6,1,1,['#ff7ac8','#ffd24a','#f4ecd8','#8fe0ff'][q%4])}
 // lanterns along the path
 for(let k=0;k<5;k++){const ly=18+k*54,lx=pathX(ly)+(k%2?16:-18);px(c,lx,ly,2,12,'#3a2a20');E.push(()=>{px(c,lx-1,ly-3,4,4,'#ffcf7a');px(c,lx,ly-2,2,2,'#fff6c0')});L.push({x:lx,y:ly+6,r:36,c:'#ffb347',i:.9})}
 // the party
 const py=o.py??108;const ppx=pathX(py);
 E.push(()=>{sprite(c,SPR.hero,ppx-4,py,{h:'#f4ecd8',f:'#f2c8a0',s:'#2a2030',b:'#e8484a',l:'#1a1a2a'});sprite(c,SPR.kid,ppx-14,py+12,{h:'#ff8a3d',f:'#f2c8a0',c:'#4fe3ff',l:'#1a1a2a'});sprite(c,SPR.kid,ppx+6,py+14,{h:'#3a2a2a',f:'#c89070',c:'#ffd24a',l:'#1a1a2a'})});
 lightPass(c,W,H,o.amb||[.62,.66,.86],L);E.forEach(f=>f());
 for(let k=0;k<60;k++){const x=R()*W,y=R()*H;px(c,x,y,1,1,'#fff6a0');if(R()<.3){c.globalAlpha=.35;px(c,x-1,y,3,1,'#fff6a0');px(c,x,y-1,1,3,'#fff6a0');c.globalAlpha=1}}
}

function strand(c,pts,w0,cols){[[1,cols[0]],[0,cols[1]]].forEach(([extra,col])=>pts.forEach(([x,y],i)=>{const w=Math.max(1,w0*(1-i/pts.length))+extra;for(let yy=-w;yy<=w;yy++)for(let xx=-w;xx<=w;xx++)if(xx*xx+yy*yy<=w*w)px(c,x+xx,y+yy,1,1,col)}));
 pts.forEach(([x,y],i)=>{const w=Math.max(1,w0*(1-i/pts.length));px(c,x-w*.5,y-w*.5,Math.max(1,w*.5),1,cols[2]);if(i%9==4)px(c,x,y+w*.4,w*.8,1,cols[0])})}
function paintDungeon(cv,o){o=o||{};const W=cv.width=o.w||480,H=cv.height=o.h||270,c=cv.getContext('2d');c.imageSmoothingEnabled=false;const R=PR(o.seed||5);const E=[],L=[];
 px(c,0,0,W,H,'#1a1226');
 const tx=o.tx??W/2;
 // irregular flagstones over the whole floor
 for(let y=0;y<H;){const rh=6+Math.floor(R()*4);let x=-R()*12;while(x<W){const w=8+Math.floor(R()*12),h=rh-1-Math.floor(R()*2);const col=['#4a7078','#567c80','#3e646c','#5e8480'][Math.floor(R()*4)];
   if(R()<.07){px(c,x,y,w,h,'#2a1e36')}else{px(c,x+2,y+1,w-3,h,col);px(c,x+1,y+2,w-1,h-2,col);px(c,x+2,y+1,w-3,1,shade(col,.22));px(c,x+2,y+h,w-3,1,shade(col,-.3));if(R()<.2)px(c,x+3+R()*(w-6),y+2+R()*(h-3),2,1,shade(col,-.25))}x+=w}y+=rh}
 // void tunnel at the deep end: starry sky
 const top=[];for(let x=tx-70;x<=tx+70;x++){const t=(x-tx)/70;const yb=Math.round(96-26*t*t+3*Math.sin(x/5));top.push([x,yb]);for(let y=0;y<yb;y++)px(c,x,y,1,1,y<40?'#0a0c2a':y<70?'#141a4a':'#262a6a')}
 E.push(()=>{for(let k=0;k<80;k++){const x=tx-60+R()*120,y=R()*70;px(c,x,y,1,1,R()<.25?'#fff':'#8a9aff')}px(c,tx,18,1,5,'#fff');px(c,tx-2,20,5,1,'#fff')});
 // pink lit path out of the tunnel
 for(let y=70;y<H;y++){const hw=Math.round(18+(y-70)*.5);px(c,tx-hw,y,hw*2,1,'#3a3070');for(let x=tx-hw;x<tx+hw;x++){if(R()<.12)px(c,x,y,1,1,'#7a6ad8')}}
 // root walls: thick living roots either side, framing the tunnel
 const rc=['#1e0e1a','#5a2a48','#a05a80'];
 for(const side of [-1,1]){for(let k=0;k<11;k++){const pts=[];let x=tx+side*(60+k*14+R()*8),y=-6,a=1.57+side*(.25+k*.06);for(let st=0;st<80;st++){a+=Math.sin(st*.13+k*1.7)*.05;x+=Math.cos(a)*1.6;y+=Math.sin(a)*1.6;pts.push([x,y])}strand(c,pts,11-k*.5,rc)}
  // eyes in the roots
  const ex=tx+side*112,ey=54;for(let yy=-8;yy<=8;yy++)for(let xx=-13;xx<=13;xx++){const d=xx*xx/169+yy*yy/64;if(d<=1.25&&d>1)px(c,ex+xx,ey+yy,1,1,'#1e0e1a')}
  E.push(()=>{for(let yy=-8;yy<=8;yy++)for(let xx=-13;xx<=13;xx++){const d=xx*xx/169+yy*yy/64;if(d<=1)px(c,ex+xx,ey+yy,1,1,d>.5?'#4ad83a':d>.2?'#9aff5a':'#f0ffc0')}});L.push({x:ex,y:ey,r:60,c:'#8aff4a',i:.9});
  // crystals
  for(let k=0;k<6;k++){const cx=tx+side*(64+R()*70),cy=110+R()*18,h=5+R()*12;E.push(()=>{px(c,cx,cy-h,2,h,'#6a8aff');px(c,cx,cy-h,1,h*.6,'#d8e4ff')});L.push({x:cx,y:cy-h/2,r:18,c:'#6a8aff',i:.6})}}
 // ruin blocks with teal caps and terracotta brick faces
 function ruin(x,y,w,h,cap){px(c,x,y,w,cap,'#16222a');for(let yy=y+1;yy<y+cap-1;yy+=4)for(let xx=x+1+((yy-y)/4%2)*3;xx<x+w-2;xx+=6)px(c,xx,yy,5,3,'#4a6a6a');
  for(let yy=y+cap;yy<y+h;yy+=4)for(let xx=x+((yy-y)/4%2)*4;xx<x+w;xx+=8)px(c,xx,yy,7,3,['#a85a42','#8a4a3a','#b8664a','#7a4234'][Math.floor(R()*4)]);px(c,x,y+h,w,3,'#0c0814')}
 ruin(-6,104,110,76,26);ruin(W-104,104,110,76,26);ruin(-6,216,76,60,20);ruin(W-74,222,80,52,20);
 px(c,40,148,22,32,'#1e0e1a');E.push(()=>{px(c,43,151,16,29,'#ffcf6a');px(c,45,154,12,26,'#f0a040')});L.push({x:51,y:178,r:40,c:'#ffb347',i:.9});
 // torches
 for(const [x,y] of [[90,140],[W-92,140],[36,232],[W-50,236],[tx-74,176],[tx+72,176]]){px(c,x,y,2,7,'#3a2a20');E.push(()=>{px(c,x-1,y-4,4,4,'#ff9a3d');px(c,x,y-6,2,2,'#ffe07a')});L.push({x,y:y+4,r:58,c:'#ff8a3d',i:1.4})}
 // veins on the path (emissive)
 E.push(()=>{const RR=PR(9);for(let k=0;k<8;k++){let x=tx+(RR()-.5)*30,y=96,a=1.57+(RR()-.5)*1.2;for(let st=0;st<150;st++){a+=(RR()-.5)*.45;x+=Math.cos(a);y+=Math.sin(a)*.8;if(y>H)break;px(c,x,y,1,1,st<50?'#ffb0f0':st<100?'#ff6ad0':'#c04aa8')}}});
 L.push({x:tx,y:150,r:90,c:'#ff6ad0',i:.6});L.push({x:tx,y:60,r:70,c:'#4a5aff',i:.6});
 // rubble
 for(let k=0;k<30;k++){const x=R()*W,y=120+R()*(H-120);px(c,x,y,2+R()*3,2,'#5a4a5e')}
 // party heading into the deep end
 const hx=o.hx??tx-4,hy=o.hy??190;
 E.push(()=>{px(c,hx-16,hy+22,36,2,'#00000066');sprite(c,SPR.hero,hx,hy,{h:'#f4ecd8',f:'#f2c8a0',s:'#2a2030',b:'#e8484a',l:'#1a1a2a'});px(c,hx+8,hy-4,1,10,'#dfe8ff');
 sprite(c,SPR.kid,hx-14,hy+12,{h:'#ff8a3d',f:'#f2c8a0',c:'#4fe3ff',l:'#1a1a2a'});sprite(c,SPR.kid,hx+12,hy+13,{h:'#3a2a2a',f:'#c89070',c:'#ffd24a',l:'#1a1a2a'})});
 lightPass(c,W,H,[.34,.3,.5],L);E.forEach(f=>f());
 E.length=0;for(let k=0;k<40;k++)px(c,R()*W,R()*H,1,1,R()<.6?'#ff5a3d':'#ffd24a');
}

// world strip / map: cities joined by outer world, dungeons inside it
function paintMap(cv,o){o=o||{};const W=cv.width=o.w||420,H=cv.height=o.h||112,c=cv.getContext('2d');c.imageSmoothingEnabled=false;const R=PR(o.seed||13);
 // sea edges + land
 px(c,0,0,W,H,'#173a5a');for(let k=0;k<200;k++)px(c,R()*W,R()*H,2,1,'#22507a');
 for(let x=0;x<W;x++){const t=6+Math.round(4*Math.sin(x/23)+3*Math.sin(x/7)),b=H-6-Math.round(4*Math.sin(x/19+1)+3*Math.sin(x/9));px(c,x,t,1,b-t,'#2f6a48');px(c,x,t,1,2,'#d8be8a');px(c,x,b-2,1,2,'#d8be8a')}
 for(let k=0;k<1400;k++){const x=R()*W,y=10+R()*(H-20);px(c,x,y,1,1,R()<.5?'#2a5a40':'#3a7a52')}
 const C=o.cities||[[48,'night'],[210,'rain'],[372,'lantern']];
 // road
 const ry=Math.floor(H/2);for(let x=C[0][0];x<C[C.length-1][0];x+=3){const y=ry+Math.round(8*Math.sin(x/34));px(c,x,y,2,1,'#e8d4a0')}
 // river crossing
 for(let y=0;y<H;y++){const x=Math.round(W*.62+6*Math.sin(y/12));px(c,x,y,4,1,'#2a8a96')}
 // forests + mountains between the cities
 const between=[];for(let i=0;i<C.length-1;i++)between.push([C[i][0]+34,C[i+1][0]-34]);
 between.forEach(([a,b],i)=>{for(let k=0;k<60;k++){const x=a+R()*(b-a),y=12+R()*(H-24);if(Math.abs(y-ry-8*Math.sin(x/34))<5)continue;const r=2+Math.floor(R()*2);for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++)if(xx*xx+yy*yy<=r*r)px(c,x+xx,y+yy,1,1,xx+yy<-r/2?'#5aa060':'#1f4a3a')}
  for(let k=0;k<4;k++){const mx=a+10+R()*(b-a-20),my=16+R()*12;for(let j=0;j<10;j++)px(c,mx-j,my+j,j*2+1,1,j<3?'#f4ecd8':'#6a6a7e')}
  // dungeon mouth inside the wild
  const dx=Math.round((a+b)/2+(i%2?10:-10)),dy=ry+(i%2?-24:22);glow(c,dx,dy,9,'#c06bff',.6);px(c,dx-4,dy-2,8,5,'#0a0612');px(c,dx-5,dy-3,10,1,'#7a3fa8');px(c,dx-2,dy,1,1,'#ffe14a');px(c,dx+1,dy,1,1,'#ffe14a');
  o.dungeons&&o.dungeons.push([dx,dy])});
 // cities, each its own style
 C.forEach(([cx,st],i)=>{const P=PAL[st];for(let yy=-22;yy<=22;yy+=5)for(let xx=-26;xx<=26;xx+=6){if(xx*xx/700+yy*yy/500>1)continue;px(c,cx+xx,cy(yy),5,4,P.fac[Math.floor(R()*5)]);px(c,cx+xx,cy(yy),5,1,st==='night'?P.roof2:P.roof);if(R()<.5)px(c,cx+xx+1+Math.floor(R()*3),cy(yy)+2,1,1,P.win)}
  function cy(yy){return ry+yy-2}
  glow(c,cx,ry,26,P.light,.18);
  if(i===0){px(c,cx-1,ry-30,3,16,'#8fe0ff');glow(c,cx,ry-28,8,'#8fe0ff',.6)}});
}
// Scape v1.4 — the regions from the visual style guide: havens, outlands, dungeons (shallow to deep), characters, monsters.
// Needs pixelworld.js (PR, px, glow, sprite, SPR, shade, tree, strand, lightPass).
function ell2(c,x,y,rx,ry,col){for(let yy=-ry;yy<=ry;yy++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry))));px(c,x-w,y+yy,w*2+1,1,col)}}
function disc2(c,x,y,r,col){for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++)if(xx*xx+yy*yy<=r*r)px(c,x+xx,y+yy,1,1,col)}
function party(c,x,y,cols){cols=cols||[['#f4ecd8','#e8484a'],['#ff8a3d','#4fe3ff'],['#3a2a2a','#ffd24a']];
 px(c,x-16,y+22,40,2,'#00000055');sprite(c,SPR.hero,x,y,{h:cols[0][0],f:'#f2c8a0',s:'#2a2030',b:cols[0][1],l:'#1a1a2a'});px(c,x+8,y-4,1,10,'#dfe8ff');
 sprite(c,SPR.kid,x-14,y+12,{h:cols[1][0],f:'#f2c8a0',c:cols[1][1],l:'#1a1a2a'});sprite(c,SPR.kid,x+12,y+13,{h:cols[2][0],f:'#c89070',c:cols[2][1],l:'#1a1a2a'})}
function setup(cv,o,dw,dh){const W=cv.width=o.w||dw||480,H=cv.height=o.h||dh||270,c=cv.getContext('2d');c.imageSmoothingEnabled=false;return [c,W,H]}

/* HAVEN · the station: a sunny, overgrown train stop. Warm day, nature taking the city back. */
function paintStation(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||4);const E=[],L=[];
 // sky
 ['#b8d4c4','#c4dcc4','#d0e0c0','#dcdcb8'].forEach((col,i)=>px(c,0,i*16,W,16,col));px(c,0,64,W,H,'#dcdcb8');
 for(let k=0;k<5;k++){const x=R()*W,y=8+R()*36;ell2(c,x,y,18+R()*14,4,'#ffffff')}
 // far apartment blocks, pastel, with balconies of plants
 let x=-6;while(x<W){const w=34+Math.floor(R()*30),h=70+Math.floor(R()*60),y=150-h;const f=['#c4b494','#c8a890','#a8b8a0','#b8a0a8','#c4b078'][Math.floor(R()*5)];
  px(c,x,y,w,h+20,f);px(c,x,y,w,2,shade(f,-.2));px(c,x+w-3,y,3,h+20,shade(f,-.12));
  for(let wy=y+6;wy<150;wy+=10)for(let wx=x+4;wx<x+w-8;wx+=9){if(R()<.3){px(c,wx,wy,6,6,'#2a3430');px(c,wx+1,wy+1,1,3,'#7f9a98');px(c,wx+3,wy+2,2,1,'#7f9a98')}else{px(c,wx,wy,6,6,'#6f98a8');px(c,wx,wy,6,1,'#4a6a78')}c.globalAlpha=.35;px(c,wx+1,wy+6,1+Math.floor(R()*3),3+Math.floor(R()*7),'#3a3a2a');c.globalAlpha=1;if(R()<.35){px(c,wx-1,wy+6,8,2,'#6a4a3a');for(let q=0;q<4;q++)px(c,wx+q*2,wy+4-R()*3,2,3,['#4a9a5a','#6ab070','#ff7ac8'][q%3])}}
  c.globalAlpha=.28;for(let q=0;q<5;q++)px(c,x+Math.floor(R()*w),y+2,1+Math.floor(R()*2),10+Math.floor(R()*(h-10)),'#3a3424');c.globalAlpha=1;
  for(let q=0;q<w;q+=2)px(c,x+q,y-1-Math.floor(R()*4),2,3,['#3a7a40','#4a9a5a','#2a5a34'][Math.floor(R()*3)]);
  x+=w+2}
 // vines draping over the blocks
 for(let k=0;k<70;k++){const vx=R()*W,vy=20+R()*70,len=14+R()*70;for(let q=0;q<len;q++){px(c,vx+Math.sin(q*.3+k)*2,vy+q,2,1,q%5==0?'#8ad070':'#2f7a40');if(q%6==0)px(c,vx+Math.sin(q*.3+k)*2-1,vy+q,4,2,'#3a8a4a')}}
 for(let k=0;k<14;k++){const mx=R()*W,my=30+R()*100;for(let q=0;q<10;q++)px(c,mx+(R()-.5)*14,my+(R()-.5)*8,3,3,['#2f6a3a','#4a9a5a','#6ab070'][q%3])}
 // overhead line + catenary poles
 for(let px2=20;px2<W;px2+=120){px(c,px2,96,3,70,'#5a6a6a');px(c,px2-10,98,24,2,'#5a6a6a')}px(c,0,100,W,1,'#3a4a4a');
 // the train: cream car, pink stripe, green roof
 const ty=112;px(c,40,ty,300,46,'#1e2a2a');px(c,42,ty+2,296,42,'#d4c8a8');px(c,42,ty+2,296,6,'#5a8a5a');px(c,42,ty+30,296,5,'#c8709a');px(c,42,ty+36,296,2,'#a8484a');px(c,42,ty+38,296,6,'#7a6a4a');
 for(let k=0;k<22;k++){const rx=44+R()*290,ry=ty+4+R()*36;px(c,rx,ry,2+R()*5,2+R()*4,['#8a5a3a','#a06a3a','#6a4a2a'][k%3])}
 c.globalAlpha=.4;for(let k=0;k<30;k++)px(c,44+R()*292,ty+8,1,6+R()*28,'#5a4a30');c.globalAlpha=1;
 for(let wx=54;wx<330;wx+=34){px(c,wx,ty+12,24,14,'#2a3a4a');px(c,wx+1,ty+13,22,6,'#8fd0e8');px(c,wx+1,ty+13,4,12,'#c8f0ff')}
 for(let q=0;q<26;q++)px(c,226+q*2+Math.round(Math.sin(q)*2),ty+27+Math.round(Math.cos(q*.7)*2),2,2,['#c06bff','#4fe3ff'][q%2]);
 px(c,184,ty+10,16,26,'#a89878');px(c,191,ty+10,1,26,'#8a7a6a');
 for(let k=0;k<6;k++){disc2(c,60+k*52,ty+46,4,'#2a2a2a');disc2(c,60+k*52,ty+46,1,'#8a8a8a')}
 // moss on the roof
 for(let k=0;k<110;k++)px(c,42+R()*296,ty-2-R()*5,2+R()*5,2+R()*3,['#2f6a3a','#4a9a5a','#6ab070','#8ad070'][Math.floor(R()*4)]);
 for(let k=0;k<16;k++){const vx=46+R()*288,len=6+R()*26;for(let q=0;q<len;q++)px(c,vx+Math.sin(q*.4+k),ty+q,2,1,q%4?'#2f7a40':'#6ab070')}
 // platform: tiles, yellow edge, cracks with grass
 px(c,0,164,W,H,'#9a9484');for(let y=166;y<H;y+=10)for(let x2=((y/10)%2)*10;x2<W;x2+=20){const t=R();px(c,x2,y,19,9,t<.2?'#8a8474':t<.3?'#7a8a64':'#b0a898');px(c,x2,y,19,1,'#c0b8a8')}
 for(let k=0;k<14;k++){let cx3=R()*W,cy3=168+R()*96;for(let q=0;q<14;q++){cx3+=(R()-.5)*4;cy3+=1;px(c,cx3,cy3,1,1,'#4a4434')}}
 for(let k=0;k<6;k++)ell2(c,30+R()*420,200+R()*60,8+R()*10,2,'#7f98a0');
 px(c,0,162,W,4,'#ffd24a');for(let x2=0;x2<W;x2+=8)px(c,x2,162,4,4,'#2a2a2a');
 for(let k=0;k<90;k++){const gx=R()*W,gy=168+R()*96;for(let q=0;q<6;q++)px(c,gx+q,gy-R()*5,1,5,q%2?'#3a8a4a':'#6ab070')}
 for(let k=0;k<10;k++){const mx=R()*W,my=170+R()*90;ell2(c,mx,my,6+R()*8,2,'#4a7a3a')}
 // a tree has broken up through the platform
 for(let q=0;q<40;q++)px(c,276+Math.round(Math.sin(q*.15)*3),130+q*1.1,6,2,'#5a4030');tree(c,R,280,118,22,['#123029','#2f6a48','#4a9a5a','#8ad070']);for(let q=0;q<10;q++)px(c,262+q*4,176+(q%3),5,2,'#7a6a5a');
 // stairs down on the right, with a shop sign
 px(c,360,150,110,120,'#9a8a7a');for(let s=0;s<10;s++)px(c,368,168+s*10,94,6,s%2?'#b0a090':'#c8b8a8');px(c,366,150,4,120,'#6a5a4a');px(c,460,150,4,120,'#6a5a4a');
 px(c,370,128,88,18,'#2a2a3a');px(c,372,130,84,14,'#a8403a');glyphs(c,R,374,130,80,14,'#fff3dc');
 // planters, vending machine, bench
 for(const [bx,by] of [[14,196],[300,206],[120,236]]){px(c,bx,by,26,12,'#a85a42');tree(c,R,bx+13,by-4,8,['#123029','#2f6a48','#4a9a5a','#8ad070'])}
 px(c,330,174,18,30,'#2a3a6a');px(c,332,176,14,12,'#8fe0ff');for(let q=0;q<4;q++)px(c,333+q*3,190,2,3,['#e8484a','#ffd24a','#7ac08a','#ff7ac8'][q]);
 px(c,200,196,50,4,'#8a5a3a');px(c,204,200,3,8,'#4a3a2a');px(c,242,200,3,8,'#4a3a2a');
 // townsfolk
 const tf=[[90,180,'#3a2a2a','#7ac08a'],[262,186,'#ff8a3d','#c06bff'],[214,184,'#f4ecd8','#4a6ad8']];tf.forEach(([x2,y,h,b])=>sprite(c,SPR.kid,x2,y,{h,f:'#f2c8a0',c:b,l:'#1a1a2a'}));
 party(c,150,214);
 // dust and seeds in the air, a grimy haze over it all
 for(let k=0;k<50;k++)px(c,R()*W,R()*H,1,1,['#f4ecd8','#c8d8a0','#ffd24a'][k%3]);
 c.globalAlpha=.1;px(c,0,0,W,H,'#4a4a20');c.globalAlpha=1;
}

/* HAVEN · the castle: a quiet fairytale haven under the stars, mirrored in a lake. */
function paintCastle(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||8);
 for(let y=0;y<150;y++)px(c,0,y,W,1,y<50?'#06103a':y<100?'#0a1a5a':'#12287a');
 for(let k=0;k<160;k++){const x=R()*W,y=R()*140;const b=R();px(c,x,y,1,1,b<.2?'#ffffff':'#8ab0ff');if(b<.06){px(c,x-1,y,3,1,'#cfe0ff');px(c,x,y-1,1,3,'#cfe0ff')}}
 // hills
 for(let x=0;x<W;x++){const hy=128+Math.round(8*Math.sin(x/40)+4*Math.sin(x/13));px(c,x,hy,1,150-hy,'#081440')}
 // castle
 const cx=240,base=150,blue=['#2a4aa8','#3a6ad8','#6a9aff','#bcd4ff'];
 function tower(x,y,w,roof){px(c,x,y,w,base-y,blue[1]);px(c,x,y,2,base-y,blue[2]);px(c,x+w-2,y,2,base-y,blue[0]);
  for(let i=0;i<roof;i++){const ww=Math.max(1,w+2-i*((w+2)/roof)*1);px(c,x+w/2-ww/2,y-i,ww,1,i%3?blue[2]:blue[3])}
  for(let wy=y+6;wy<base-6;wy+=10)px(c,x+w/2-1,wy,3,4,'#ffe07a')}
 tower(cx-60,96,16,24);tower(cx+44,96,16,24);tower(cx-30,86,20,30);tower(cx+10,86,20,30);tower(cx-10,68,20,36);
 px(c,cx-64,120,128,30,blue[1]);for(let x=cx-64;x<cx+64;x+=6)px(c,x,116,4,4,blue[1]);px(c,cx-64,120,128,2,blue[2]);
 px(c,cx-8,130,16,20,'#081440');ell2(c,cx,130,8,4,'#081440');px(c,cx-5,132,10,18,'#ffd27a');
 for(let wx=cx-56;wx<cx+56;wx+=14)if(Math.abs(wx-cx)>14)px(c,wx,128,3,5,'#ffe07a');
 glow(c,cx,140,40,'#ffd27a',.35);
 // lake + reflection
 const top=150;const img=c.getImageData(0,0,W,top);const ref=c.createImageData(W,H-top);
 for(let y=0;y<H-top;y++){const sy=top-1-Math.floor(y*1.1);const off=Math.round(Math.sin(y*.5)*(1+y/40));for(let x=0;x<W;x++){const sx=Math.min(W-1,Math.max(0,x+off));const k=((y)*W+x)*4;if(sy<0){ref.data[k+3]=0;continue}const s=(sy*W+sx)*4;
  ref.data[k]=img.data[s]*.62;ref.data[k+1]=img.data[s+1]*.7;ref.data[k+2]=Math.min(255,img.data[s+2]*.9+12);ref.data[k+3]=255}}
 c.putImageData(ref,0,top);for(let y=top;y<H;y+=3)for(let k=0;k<6;k++)px(c,R()*W,y,4+R()*10,1,'#3a5aa833');
 for(let k=0;k<30;k++)px(c,R()*W,top+R()*(H-top),3+R()*6,1,'#9ab8ff55');
 // shore + two small figures under an umbrella
 for(let x=0;x<W;x++){const sy=226+Math.round(4*Math.sin(x/30));px(c,x,sy,1,H-sy,'#040a24');if(R()<.4)px(c,x,sy-1-R()*5,1,5,'#040a24')}
 const fx=236,fy=212;px(c,fx-14,fy-6,30,2,'#040a24');for(let i=0;i<6;i++)px(c,fx-12+i,fy-4-i,26-i*2,1,'#040a24');px(c,fx,fy-6,1,14,'#040a24');
 ell2(c,fx-5,fy+6,4,4,'#040a24');px(c,fx-8,fy+8,7,10,'#040a24');ell2(c,fx+6,fy+8,3,3,'#040a24');px(c,fx+3,fy+10,6,8,'#040a24');
 for(let k=0;k<40;k++){const x=R()*W,y=180+R()*40;px(c,x,y,1,1,'#ffe07a')}
}

/* OUTLANDS · the grove: a glowing tree shrine at night. Explore, scavenge, camp. */
function paintGrove(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||6);const E=[],L=[];
 px(c,0,0,W,H,'#0c1630');
 // canopy: dense olive-gold leaf clumps
 const Gc=['#0a1422','#2a3a1e','#5a6a24','#c8c050'];
 for(let k=0;k<900;k++){const x=R()*W,y=R()*(110+Math.sin(x/40)*14)-8,r=2+R()*4;const sh=y<30?0:1;for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++){if(xx*xx+yy*yy>r*r||R()<.25)continue;px(c,x+xx,y+yy,1,1,yy<-r*.4?Gc[3]:yy<r*.3?Gc[2]:Gc[1])}}for(let k=0;k<40;k++){const x=R()*W;for(let q=0;q<12+R()*20;q++)px(c,x+Math.sin(q*.4)*2,110+q,1,1,'#3a5a24')}
 for(let y=172;y<H;y++)px(c,0,y,W,1,y<200?'#16244a':y<235?'#1a2a50':'#1e3054');for(let k=0;k<70;k++){const x=R()*W,y=180+R()*90;px(c,x,y,10+R()*20,1,'#22385a')}
 // giant trunk
 const tx=240;for(let y=40;y<H;y++){const w=40+Math.round((y-40)*.18)+Math.round(3*Math.sin(y/9));px(c,tx-w/2,y,w,1,'#2a1e18');px(c,tx-w/2,y,4,1,'#4a3a28');px(c,tx+w/2-6,y,6,1,'#1a120e')}
 for(let k=0;k<8;k++){const pts=[];let x=tx+(k<4?-1:1)*(18+k%4*6),y=210+k*4,a=k<4?2.6:.5;for(let s=0;s<70;s++){a+=(R()-.5)*.12;x+=Math.cos(a)*1.4;y+=Math.sin(a)*.6+.15;pts.push([x,y])}strand(c,pts,5,['#140c0a','#3a2a1e','#5a4a34'])}
 // shrine carved into the trunk, glowing gold
 px(c,tx-16,140,32,34,'#140c0a');ell2(c,tx,140,16,10,'#140c0a');E.push(()=>{px(c,tx-12,144,24,30,'#ffcf6a');ell2(c,tx,144,12,7,'#ffcf6a');px(c,tx-6,152,12,18,'#fff3c0');px(c,tx-1,148,2,4,'#e8484a')});L.push({x:tx,y:160,r:120,c:'#ffcf6a',i:1.3});
 // forest floor: navy grass with lime highlights
 
 for(let k=0;k<300;k++){const x=R()*W,y=180+R()*90;px(c,x,y,1,3,'#3a6a3a');px(c,x+1,y+1,1,2,'#2a4a2a')}
 // SCAVENGE: a half-buried old robot, crates, a chest
 const rx=96,ry=206;ell2(c,rx,ry,22,14,'#3a4a5a');ell2(c,rx,ry,20,12,'#5a6a7a');ell2(c,rx-6,ry-5,6,4,'#8a9aaa');px(c,rx-22,ry+6,46,10,'#16244a');E.push(()=>{px(c,rx-9,ry-1,4,3,'#9aff5a');px(c,rx+5,ry-1,4,3,'#9aff5a')});L.push({x:rx,y:ry,r:30,c:'#9aff5a',i:.7});
 for(let k=0;k<6;k++){const vx=rx-18+k*7;for(let q=0;q<10;q++)px(c,vx+Math.sin(q*.6+k)*2,ry-12+q,1,1,'#4a9a5a')}
 for(const [bx,by] of [[360,214],[378,222],[352,228]]){px(c,bx,by,16,12,'#6a4a2a');px(c,bx,by,16,2,'#8a6a3a');px(c,bx+7,by,2,12,'#4a3018')}
 px(c,406,232,20,12,'#7a3a2a');px(c,406,232,20,4,'#a85a3a');E.push(()=>{px(c,414,236,4,3,'#ffd24a');glow(c,416,236,8,'#ffd24a',.5)});
 // campfire + the party
 const fx=300,fy=246;E.push(()=>{px(c,fx-6,fy+2,12,2,'#4a3018');px(c,fx-3,fy-4,6,6,'#ff8a3d');px(c,fx-1,fy-7,3,4,'#ffe07a')});L.push({x:fx,y:fy,r:60,c:'#ff8a3d',i:1.3});
 E.push(()=>party(c,fx-34,fy-22));
 lightPass(c,W,H,[.5,.55,.85],L);E.forEach(f=>f());
 // fireflies + drifting spores
 for(let k=0;k<90;k++){const x=R()*W,y=R()*H;px(c,x,y,1,1,R()<.5?'#fff6a0':'#c8ff8a');if(R()<.25){c.globalAlpha=.35;px(c,x-1,y,3,1,'#fff6a0');px(c,x,y-1,1,3,'#fff6a0');c.globalAlpha=1}}
}

/* OUTLANDS · the meadow: bright day, seen from above, with things to find. */
function paintMeadow(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||12);
 const g=['#7ad048','#8ae050','#6ac040','#9af060'];for(let y=0;y<H;y+=2)for(let x=0;x<W;x+=2)px(c,x,y,2,2,g[Math.floor(R()*4)]);
 for(let k=0;k<900;k++){const x=R()*W,y=R()*H;px(c,x,y,1,2,'#4a9a30')}
 for(let k=0;k<220;k++){const x=R()*W,y=R()*H;const col=['#ffffff','#ffd24a','#ff9ad0','#8fe0ff'][Math.floor(R()*4)];px(c,x,y,2,2,col);px(c,x+1,y+1,1,1,'#fff6c0')}
 // stream
 for(let y=0;y<H;y++){const x=330+Math.round(20*Math.sin(y/30));px(c,x,y,22,1,'#4ab8d8');px(c,x+4,y,6,1,'#8ae0f0');if(y%7==0)px(c,x+12,y,3,1,'#ffffff')}
 // trees on the edges
 for(let k=0;k<24;k++){const x=R()<.5?R()*80:400+R()*80,y=R()*H;tree(c,R,x,y,10+R()*10,['#1a4a2a','#2a7a3a','#4aa048','#a0f070'])}
 // scavenge spots: glinting items, a stone ring, an old sign
 for(const [x,y] of [[150,60],[260,200],[190,130],[120,220]]){px(c,x-1,y,3,3,'#ffd24a');px(c,x,y-3,1,9,'#ffffffaa');px(c,x-3,y+1,7,1,'#ffffffaa')}
 for(let a=0;a<6.28;a+=.6)px(c,230+Math.cos(a)*22,80+Math.sin(a)*12,5,4,'#9a9a9a');
 px(c,96,110,3,16,'#6a4a2a');px(c,86,104,24,9,'#a87a4a');
 party(c,214,150);
}

/* DUNGEON · shallow: an infestation. Ruins overrun by worms and thorn vines, an accepted part of life. */
function paintInfest(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||3);const E=[],L=[];
 px(c,0,0,W,H,'#1a2030');
 for(let y=0;y<H;y+=8)for(let x=((y/8)%2)*8;x<W;x+=16){const col=['#3a5a5a','#446666','#345050'][Math.floor(R()*3)];px(c,x,y,15,7,col);px(c,x,y,15,1,shade(col,.2))}
 // broken walls
 for(const [x,y,w,h] of [[0,0,160,70],[300,0,180,60],[0,180,60,90],[420,170,60,100]]){for(let yy=y;yy<y+h;yy+=6)for(let xx=x+((yy/6)%2)*6;xx<x+w;xx+=12)px(c,xx,yy,11,5,['#8a4a3a','#a85a42','#7a4234'][Math.floor(R()*3)]);px(c,x,y+h,w,3,'#0c0814')}
 // purple thorn vines everywhere
 for(let k=0;k<18;k++){const pts=[];let x=R()*W,y=R()*H,a=R()*6.28;for(let s=0;s<90;s++){a+=(R()-.5)*.3;x+=Math.cos(a)*1.3;y+=Math.sin(a)*1.3;pts.push([x,y])}strand(c,pts,3,['#1a0a24','#6a2a8a','#b06ad8']);
  pts.forEach(([x2,y2],i)=>{if(i%8==0)px(c,x2+2,y2-2,1,2,'#e0b0ff')})}
 // orange worms (segmented)
 function worm(x,y,n,a,s){for(let i=n;i>=0;i--){const xx=x+Math.cos(a+Math.sin(i*.5)*.6)*i*s*1.6,yy=y+Math.sin(a+Math.sin(i*.5)*.6)*i*s*1.6;disc2(c,xx,yy,s+1,'#4a1a0a');disc2(c,xx,yy,s,i%2?'#ff8a2a':'#ffa84a');px(c,xx-1,yy-s+1,2,1,'#ffe0a0')}
  E.push(()=>{px(c,x-2,y-1,1,1,'#fff');px(c,x+1,y-1,1,1,'#fff')})}
 worm(330,150,14,2.6,5);worm(90,120,9,.3,3);worm(400,250,8,3.6,3);worm(200,240,6,5.6,2);
 // grubs
 for(let k=0;k<14;k++){const x=R()*W,y=R()*H;px(c,x,y,4,2,'#e8d080');px(c,x,y,1,1,'#4a1a0a')}
 // townsfolk signs: someone has put up a warning and a bucket, life goes on
 px(c,180,96,2,18,'#5a3a24');px(c,170,90,22,10,'#ffd24a');px(c,173,94,16,2,'#1a1a1a');px(c,250,112,10,8,'#5a6a7a');
 for(const [x,y] of [[60,90],[420,96],[150,180],[340,200]]){px(c,x,y,2,7,'#3a2a20');E.push(()=>{px(c,x-1,y-4,4,4,'#ff9a3d');px(c,x,y-6,2,2,'#ffe07a')});L.push({x,y:y+4,r:62,c:'#ff8a3d',i:1.3})}
 E.push(()=>party(c,232,150));L.push({x:240,y:160,r:70,c:'#ffd27a',i:.6});
 lightPass(c,W,H,[.42,.4,.56],L);E.forEach(f=>f());
}

/* DUNGEON · deeper: flat comic horror. A black beast under a pink sky, green smoke. */
function paintAbyss(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||9);
 for(let y=0;y<H;y++)px(c,0,y,W,1,y<90?'#c070d8':y<160?'#a050c8':'#7a38a8');
 // green and blue smoke swirls
 function swirl(x,y,r,col,col2){for(let a=0;a<14;a+=.04){const rr=r*(1-a/16);const xx=x+Math.cos(a)*rr,yy=y+Math.sin(a)*rr*.7;disc2(c,xx,yy,Math.max(1,3-a/6),col)}for(let a=0;a<12;a+=.05){const rr=r*.8*(1-a/14);px(c,x+Math.cos(a)*rr,y+Math.sin(a)*rr*.7,2,2,col2)}}
 swirl(110,70,46,'#5aff9a','#c8ffe0');swirl(390,60,40,'#4ad8ff','#d0f4ff');swirl(300,120,26,'#5aff9a','#c8ffe0');
 // pink planet
 disc2(c,400,40,16,'#ff4fb0');disc2(c,396,36,6,'#ff9ad8');
 // black beast with tentacles
 const bx=240,by=200;for(let k=0;k<10;k++){const pts=[];let x=bx+(k-4.5)*14,y=by+10,a=-1.57+(k-4.5)*.28;for(let s=0;s<60;s++){a+=Math.sin(s*.15+k)*.08;x+=Math.cos(a)*1.6;y+=Math.sin(a)*1.6;pts.push([x,y])}strand(c,pts,7,['#000000','#0a0612','#2a1a3a'])}
 ell2(c,bx,by+30,120,60,'#000000');ell2(c,bx,by+30,116,56,'#0a0612');
 // mouth + teeth
 ell2(c,bx+30,by+40,40,18,'#ff3d8a');ell2(c,bx+30,by+40,34,12,'#c0105a');for(let t=0;t<9;t++){px(c,bx-6+t*9,by+22,4,6,'#ffffff');px(c,bx-2+t*9,by+52,4,6,'#ffffff')}
 // eye
 ell2(c,bx-50,by+6,14,9,'#000');ell2(c,bx-50,by+6,12,7,'#ffe03a');ell2(c,bx-48,by+6,4,6,'#000');px(c,bx-56,by+2,2,2,'#fff');
 // the hero standing on top, small and calm
 SPR.hero.forEach((r,j)=>[...r].forEach((ch,i)=>{const cc={h:'#2a2a3a',f:'#f2c8a0',s:'#2a2030',b:'#f4ecd8',l:'#1a1a2a'}[ch];if(cc)px(c,bx-20+i*2,by-46+j*2,2,2,cc)}));px(c,bx-3,by-58,2,22,'#dfe8ff');
 // flat ink outline vibe: dark ground
 px(c,0,H-14,W,14,'#000');for(let x=0;x<W;x+=6)px(c,x,H-16,4,2,'#000');
}

/* DUNGEON · deepest: the void. Neon line-drawn ruins hanging in black, a star-god watching. */
function paintVoid(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||2);
 px(c,0,0,W,H,'#020206');for(let k=0;k<120;k++)px(c,R()*W,R()*H,1,1,R()<.3?'#ffffff':'#5a5aaa');
 function line(x1,y1,x2,y2,col){const n=Math.max(Math.abs(x2-x1),Math.abs(y2-y1));for(let i=0;i<=n;i++)px(c,x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,1,1,col)}
 // isometric line blocks (floating ruins)
 function iso(x,y,w,h,col){const d=w/2;line(x,y,x+w,y+d/2,col);line(x,y,x-w,y+d/2,col);line(x-w,y+d/2,x,y+d,col);line(x+w,y+d/2,x,y+d,col);line(x-w,y+d/2,x-w,y+d/2+h,col);line(x+w,y+d/2,x+w,y+d/2+h,col);line(x,y+d,x,y+d+h,col);line(x-w,y+d/2+h,x,y+d+h,col);line(x+w,y+d/2+h,x,y+d+h,col);
  for(let k=0;k<3;k++)line(x-w+6+k*8,y+d/2+8+k*4,x-w+6+k*8,y+d/2+14+k*4,col)}
 iso(90,150,40,40,'#ff3d5a');iso(380,160,44,30,'#3dff8a');iso(230,206,30,20,'#ff3dd0');iso(150,60,20,26,'#3dff8a');iso(340,70,24,30,'#ff3d5a');
 // a tower drawn in red lines, lit stripes
 for(let y=120;y<250;y+=4)line(40,y,64,y,'#ff3d5a');line(40,120,52,96,'#ff3d5a');line(64,120,52,96,'#ff3d5a');
 // star-god: constellation figure with scales
 const gx=240,gy=96;const stars=[[0,-60],[-6,-48],[6,-48],[0,-40],[-18,-30],[18,-30],[0,-14],[-10,6],[10,6],[-14,30],[14,30],[-30,-36],[30,-36],[-38,-20],[38,-20]];
 [[0,1],[0,2],[1,3],[2,3],[3,6],[3,4],[3,5],[6,7],[6,8],[7,9],[8,10],[4,11],[5,12],[11,13],[12,14]].forEach(([a,b])=>line(gx+stars[a][0],gy+stars[a][1],gx+stars[b][0],gy+stars[b][1],'#7a8aff'));
 stars.forEach(([x,y])=>{px(c,gx+x-1,gy+y,3,1,'#ffffff');px(c,gx+x,gy+y-1,1,3,'#ffffff');glow(c,gx+x,gy+y,5,'#9aa8ff',.4)});
 line(gx-38,gy-20,gx-44,gy-4,'#7a8aff');line(gx-50,gy-4,gx-38,gy-4,'#ffd24a');line(gx+38,gy-20,gx+44,gy-4,'#7a8aff');line(gx+38,gy-4,gx+50,gy-4,'#ffd24a');
 // third eye
 ell2(c,gx,gy-52,5,2,'#ffd24a');px(c,gx-1,gy-53,2,2,'#020206');glow(c,gx,gy-52,16,'#ffd24a',.4);
 // tiny party at the bottom, lit by their own lantern
 party(c,226,236,[['#f4ecd8','#e8484a'],['#ff8a3d','#4fe3ff'],['#3a2a2a','#ffd24a']]);glow(c,236,246,24,'#ffd27a',.35);
}

/* CHARACTERS · a range of faces you might meet in the havens and outlands. 16px chunky sprites. */
const FOLK=[
 {n:'Street kid',m:['...hhhh...','..hhhhhh..','..hsffsh..','..hffffh..','...ffff...','..cccccc..','.cccccccc.','.f.cccc.f.','...pppp...','...p..p...','...b..b...'],c:{h:'#ff8a3d',f:'#f2c8a0',s:'#2a2030',c:'#4fe3ff',p:'#2a3a6a',b:'#1a1a2a'}},
 {n:'Scavenger',m:['..gggggg..','.gggggggg.','..hsffsh..','..ffffff..','..gggggg..','.ccccccccx','.ccccccccx','.f.cccc.fx','...pppp...','...p..p...','..bb..bb..'],c:{g:'#5a6a4a',h:'#3a2a2a',f:'#c89070',s:'#2a2030',c:'#8a6a3a',x:'#9a9aaa',p:'#4a3a2a',b:'#1a1a1a'}},
 {n:'Big man',m:['...hhhh...','..hhhhhh..','..hsffsh..','..dddddd..','..dddddd..','.cccccccc.','cccccccccc','fccccccccf','.pppppppp.','.ppp..ppp.','.bbb..bbb.'],c:{h:'#6a4a2a',f:'#e0a878',s:'#2a2030',d:'#8a5a2a',c:'#e88a3a',p:'#3a4a3a',b:'#1a1a1a'}},
 {n:'White-haired girl',m:['..wwwwww..','.wwwwwwww.','.wwsffsww.','.wwffffww.','.ww.ff.ww.','..cccccc..','.wccccccw.','.f.cccc.f.','...cccc...','...f..f...','...b..b...'],c:{w:'#f4ecd8',f:'#f2c8a0',s:'#2a2030',c:'#c8a070',b:'#6a3a2a'}},
 {n:'Shopkeeper',m:['...tttt...','..tttttt..','..hsffsh..','..ffffff..','...ffff...','.aaaaaaaa.','.acccccca.','.facccaf..','..aaaaaa..','...p..p...','...b..b...'],c:{t:'#e8484a',h:'#3a2a2a',f:'#f2c8a0',s:'#2a2030',a:'#f4ecd8',c:'#7ac08a',p:'#3a3a5a',b:'#1a1a1a'}},
 {n:'Green-haired drifter',m:['..gggggg..','.gggggggg.','.ghsffshg.','..ffffff..','..rrrrrr..','.rrcccccr.','.cccccccc.','.f.cccc.f.','...pppp...','...p..p...','..bb..bb..'],c:{g:'#7ac08a',h:'#4a8a5a',f:'#f2c8a0',s:'#2a2030',r:'#e8484a',c:'#2a2a3a',p:'#8a3a3a',b:'#1a1a1a'}},
 {n:'Old sage',m:['...hhhh...','..hhhhhh..','..hsffsh..','..wwwwww..','..wwwwww..','.cccwwccc.','cccccccccc','f.cccccc.f','..cccccc..','..cccccc..','..bb..bb..'],c:{h:'#9a9aaa',f:'#e0a878',s:'#2a2030',w:'#f4ecd8',c:'#6a4aa8',b:'#3a2a1a'}},
 {n:'Kid in a mask',m:['...mmmm...','..mmmmmm..','..msmmsm..','..mmmmmm..','...mmmm...','..cccccc..','.cccccccc.','.f.cccc.f.','...pppp...','...p..p...','...b..b...'],c:{m:'#f4ecd8',s:'#e8484a',c:'#ffd24a',f:'#c89070',p:'#2a3a6a',b:'#1a1a1a'}}];
function drawFolk(cv,list,o){o=o||{};const W=cv.width,H=cv.height,c=cv.getContext('2d');c.imageSmoothingEnabled=false;const sp=W/list.length;
 list.forEach((f,i)=>{const x=Math.round(sp*i+sp/2-5);px(c,x-1,H-2,12,2,'#00000066');sprite(c,f.m,x,H-13,f.c)})}

/* MONSTERS · three tiers, shallow to deep: pests, dream beasts, gods. */
const MON={
 grub:['....oooo....','..oooooooo..','.oowooowoo..','oooooooooooo','.o.o.o.o.o.o'],
 worm:['.......oooo.','.....oooooo.','...ooowowoo.','.oooooooooo.','ooooo.......'],
 thorn:['..p...p...p.','.ppp.ppp.ppp','..pppppppp..','...pwppwp...','....pppp....','.....pp.....'],
 tentacle:['....kkkk....','..kkkkkkkk..','.kkykkkkkkk.','.kkkkkkkkkk.','k.k.k.kk.k.k','k.k.k..k.k.k','..k.k..k..k.'],
 eyeball:['...pppppp...','..pwwwwwwp..','.pwwkkkkwwp.','.pwwkyykwwp.','.pwwkkkkwwp.','..pwwwwwwp..','...pppppp...','..p.p..p.p..'],
 book:['.tttttttttt.','.tbbbbbbbbt.','.tbbtbbbbbt.','.tbbbtbbbbt.','.tbbbbbbbbt.','.tbbbbbbbbt.','.tttttttttt.','t..t....t..t'],
 cat:['.k........k.','.kk......kk.','.kkkkkkkkkk.','.kkkykkykkk.','.kkkkykkkkk.','..kkkkkkkk..','.kkkkkkkkkk.','kkkkkkkkkkkk','.oo.oo.oo.oo'],
 star:['.....y......','....yyy.....','.w..www..w..','..ww.w.ww...','.....w......','....w.w.....','...w...w....','..w.....w...'],
};
function drawMon(cv,key,cols,o){const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const m=MON[key];sprite(c,m,Math.round((cv.width-m[0].length)/2),Math.round((cv.height-m.length)/2),cols)}
// v1.5 Spirits tier: a lantern-lit spirit market below the haven. Soot crowds swarm the walls (the accepted infestation),
// masked spirits drift between stalls, the hero's hit lets off a soft psychic ring, the air goes wavy round the big one.
function paintSpirits(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||5);const E=[],L=[];
 for(let y=0;y<H;y++)px(c,0,y,W,1,y<120?'#12202a':'#1a2a30');
 // back: tiered wooden hall, red rails, rows of warm windows
 const tiers=[[110,22,260,30],[90,52,300,34],[70,86,340,36]];
 tiers.forEach(([x,y,w,h],i)=>{for(let k=0;k<14;k++)px(c,x-10+k*(w+20)/14,y-6+Math.abs(k-6.5)*.6,(w+20)/14+1,6,'#3a2a2a');px(c,x-12,y-1,w+24,2,'#b0383a');
  px(c,x,y,w,h,'#5a3a30');for(let wx=x+6;wx<x+w-10;wx+=16){px(c,wx,y+8,10,h-14,'#2a1a18');E.push(()=>{px(c,wx+1,y+9,8,h-16,'#ffc870');px(c,wx+4,y+9,1,h-16,'#d89040')});L.push({x:wx+5,y:y+h/2,r:20,c:'#ffb347',i:.6})}
  px(c,x,y+h-3,w,3,'#b0383a')});
 for(let k=0;k<5;k++){const sx=150+k*44;for(let q=0;q<26;q++){c.globalAlpha=.25;ell2(c,sx+Math.sin(q*.5+k)*5,20-q*1.2+(k%2)*6,3+q*.25,2,'#e8f0f0');c.globalAlpha=1}}
 // floor: wet stone
 for(let y=122;y<H;y+=6)for(let x=((y/6)%2)*9;x<W;x+=18){px(c,x,y,17,5,['#2a3a40','#304248','#263438'][Math.floor(R()*3)])}
 // stalls with noren curtains, left and right
 for(const [sx,flip] of [[0,0],[372,1]]){px(c,sx,100,108,70,'#4a2e28');px(c,sx-4,96,116,6,'#2a1a18');
  for(let k=0;k<6;k++){const cx=sx+4+k*17;px(c,cx,102,15,22,['#2a4a6a','#b0383a'][k%2]);px(c,cx+6,106,3,3,'#f4ecd8')}
  E.push(()=>{px(c,sx+10,130,88,30,'#ffd27a');for(let k=0;k<7;k++)disc2(c,sx+18+k*12,146,3,['#ff8a3d','#7dffd0','#ff9ad0'][k%3])});L.push({x:sx+54,y:150,r:60,c:'#ffb347',i:.9})}
 // soot crowds swarming the walls and steps
 for(let k=0;k<120;k++){const sx=R()<.5?R()*120:360+R()*120,sy=60+R()*120;disc2(c,sx,sy,2,'#0a0a10');if(R()<.6){px(c,sx-1,sy-1,1,1,'#fff');px(c,sx+1,sy-1,1,1,'#fff')}}
 // a string of paper lanterns
 for(let i=0;i<W;i+=2){const y=118+8*Math.sin(i/W*Math.PI);px(c,i,y,1,1,'#2a1a18');if(i%24==12){E.push(()=>{ell2(c,i,y+5,3,4,'#e8484a');px(c,i-1,y+3,3,4,'#ff8a5a');px(c,i,y+4,1,2,'#ffe07a')});L.push({x:i,y:y+5,r:26,c:'#ff8a3d',i:.7})}}
 // masked spirits drifting through the crowd
 function mask(x,y,s){px(c,x-3*s,y,6*s,14*s,'#0c0c14');ell2(c,x,y+14*s,4*s,2*s,'#0c0c14');px(c,x-2*s,y+2*s,4*s,5*s,'#f4ecd8');px(c,x-1*s,y+3*s,1*s,1*s,'#3a2a3a');px(c,x+1*s,y+3*s,1*s,1*s,'#3a2a3a');px(c,x-1*s,y+5*s,2*s,1*s,'#3ad8b0');px(c,x-2*s,y+2*s,4*s,1*s,'#3ad8b0');px(c,x-3*s,y-2*s,1*s,3*s,'#f4ecd8');px(c,x+2*s,y-2*s,1*s,3*s,'#f4ecd8');px(c,x-4*s,y-3*s,1*s,1*s,'#f4ecd8');px(c,x+3*s,y-3*s,1*s,1*s,'#f4ecd8');c.globalAlpha=.5;px(c,x-3*s,y+15*s,6*s,1,'#3a5a6a');c.globalAlpha=1}
 mask(190,150,1);mask(300,146,1);mask(120,170,1);
 // the big one, with the air bending round it
 c.globalAlpha=.35;for(let r=18;r<60;r+=8){for(let a=0;a<6.28;a+=.03){const w=Math.sin(a*6+r*.3)*2;px(c,330+Math.cos(a)*(r+w),190+Math.sin(a)*(r+w)*.6,1,1,'#9ad8e8')}}c.globalAlpha=1;
 mask(330,150,3);
 // hero mid-swing: a soft psychic ring
 E.push(()=>{c.globalAlpha=.8;for(const [r,col] of [[10,'#e8fbff'],[16,'#9ad8ff'],[22,'#c09aff']])for(let a=0;a<6.28;a+=.05)px(c,232+Math.cos(a)*r,214+Math.sin(a)*r*.7,1,1,col);c.globalAlpha=1;party(c,224,206)});L.push({x:232,y:214,r:44,c:'#9ad8ff',i:.9});
 lightPass(c,W,H,[.42,.46,.6],L);E.forEach(f=>f());
}
// v1.5 Outlands by day: wind-swept high grass, ruins floating in the sky, a mossy old guardian, and a haven on legs walking by.
function paintSky(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||17);
 ['#6ab8e8','#7cc4ec','#8ed0f0','#a2dcf2','#b8e6f2','#d0eef0'].forEach((col,i)=>px(c,0,i*18,W,18,col));px(c,0,108,W,H,'#d0eef0');
 // big summer clouds
 for(const [x,y,s] of [[80,40,1.2],[300,28,1.5],[430,70,.9]]){for(let k=0;k<9;k++){const cx=x+(k-4)*9*s,cy=y-Math.abs(Math.sin(k*1.3))*14*s;disc2(c,cx,cy+2,Math.round((9+(k%3)*3)*s),'#c8dcec');disc2(c,cx,cy,Math.round((9+(k%3)*3)*s),'#ffffff')}}
 // floating ruins: rock under, roots, a broken arch, a thin waterfall
 function isle(x,y,w){for(let k=0;k<w/2;k++){const d=Math.round((1-Math.abs(k/(w/4)-1))*w*.45);px(c,x+k*2,y,2,d,k%3?'#8a7a6a':'#6a5a4a')}px(c,x-2,y-3,w+4,5,'#5aa848');px(c,x,y-4,w,1,'#8ad070');
  for(let k=0;k<5;k++){const rx=x+6+R()*(w-12);for(let q=0;q<10+R()*16;q++)px(c,rx+Math.sin(q*.4)*1.5,y+w*.3+q,1,1,'#4a3a2a')}
  const ax=x+w*.3;px(c,ax,y-26,4,23,'#c8c0b0');px(c,ax+18,y-20,4,17,'#c8c0b0');for(let k=0;k<12;k++)px(c,ax+k*1.6,y-28+Math.abs(k-6)*.6,3,3,'#b0a898');for(let q=0;q<6;q++)px(c,ax+q*3,y-27-R()*3,2,2,'#5aa848');
  for(let q=0;q<60;q++)px(c,x+w-6,y+q,2,1,q%4?'#d8f4ff':'#ffffff')}
 isle(250,60,70);isle(90,92,40);isle(400,30,34);
 // far hills and the walking haven
 for(let x=0;x<W;x++){const h=150+Math.round(14*Math.sin(x/60)+6*Math.sin(x/17));px(c,x,h,1,H-h,'#7ab0a0')}
 const hx=360,hy=118;// legs
 for(const [lx,a] of [[hx-8,-.25],[hx+10,.2]]){for(let q=0;q<26;q++)px(c,lx+Math.sin(a)*q,hy+16+q,3,1,'#4a4a5a');px(c,lx+Math.sin(a)*26-3,hy+42,8,2,'#3a3a4a')}
 // body: a heap of houses, turrets and chimneys
 for(const [bx,by,bw,bh,col] of [[-22,4,26,16,'#8a6a5a'],[0,-4,20,22,'#a87a5a'],[16,6,18,14,'#7a7a8a'],[-14,-12,12,10,'#b08a6a'],[6,-16,10,12,'#6a8a9a']]){px(c,hx+bx,hy+by,bw,bh,col);px(c,hx+bx,hy+by,bw,1,shade(col,.25));for(let wy=hy+by+3;wy<hy+by+bh-3;wy+=5)px(c,hx+bx+3,wy,2,2,'#ffe07a')}
 for(const [tx,ty] of [[hx-10,hy-20],[hx+10,hy-24]]){px(c,tx,ty,3,8,'#4a4a5a');for(let q=0;q<6;q++){c.globalAlpha=.7-q*.1;disc2(c,tx+1-q*4,ty-3-q*4,2+q,'#f4f4f4');c.globalAlpha=1}}

 // near hills: wind-swept grass leaning one way
 for(let x=0;x<W;x++){const h=196+Math.round(10*Math.sin(x/50+1));px(c,x,h,1,H-h,'#5aa848')}
 for(let k=0;k<1400;k++){const x=R()*W,y=190+R()*(H-190);const l=3+R()*5;for(let q=0;q<l;q++)px(c,x+q*.6,y-q,1,1,['#4a9a3a','#6ac04a','#8ad870','#3a8a30'][k%4])}
 for(let k=0;k<60;k++)px(c,R()*W,200+R()*70,2,2,['#ffffff','#ffd24a','#ff9ad0'][k%3]);
 // the old guardian, sitting in the grass, mossed over, flowers on its head
 const gx=110,gy=196;ell2(c,gx,gy+8,26,6,'#3a7a3a');ell2(c,gx,gy-6,18,16,'#8a6a4a');ell2(c,gx-2,gy-8,16,14,'#a88060');for(let k=0;k<30;k++)px(c,gx-16+R()*30,gy-22+R()*10,3,2,['#4a9a3a','#6ac04a'][k%2]);
 disc2(c,gx+6,gy-10,3,'#2a2a2a');disc2(c,gx+6,gy-10,1,'#ffb347');px(c,gx-26,gy-6,4,18,'#8a6a4a');px(c,gx+20,gy-4,4,16,'#8a6a4a');
 for(let k=0;k<4;k++)px(c,gx-6+k*5,gy-25,2,2,['#ffd24a','#ff9ad0','#ffffff','#ffd24a'][k]);
 party(c,200,224);
 // wind streaks
 c.globalAlpha=.5;for(let k=0;k<14;k++){const x=R()*W,y=120+R()*120;px(c,x,y,14+R()*20,1,'#ffffff')}c.globalAlpha=1;
}
MON.soot=['..kk....kk..','.kkkk..kkkk.','.kwkw..kwkw.','.kkkk..kkkk.','..kk.kk.kk..','....kkkk....','....kwkw....','....kkkk....','.....kk.....'];
MON.mask=['.w........w.','..w......w..','...krrrrk...','...wpwwpw...','...wwwwww...','...wwrrww...','...kwwwwk...','..kkkkkkkk..','..kkkkkkkk..','.kkkkkkkkkk.','.k.kk..kk.k.'];
MON.lantern=['.....kk.....','....rrrr....','...rryyrr...','...ryyyyr...','...ykyyky...','...yyyyyy...','...ryykyr...','....rrrr....','.....oo.....','....o..o....'];
// v1.6 Neon haven: one megacity. Stacked towers with LED crowns and an orb spire, a stepped needle tower,
// fire escapes and water tanks, vertical sign stacks, an elevated train, cabs and steam on a wet crossing.
function paintMetro(cv,o){o=o||{};const [c,W,H]=setup(cv,o);const R=PR(o.seed||7);const E=[],L=[];const P=PAL.night;
 c.translate(0,-36);const NS=['#4fe3ff','#ff4f9a','#ff4fd0','#7dff9a','#ffd24a','#b07aff'];
 ['#0c0a1c','#120e26','#1a1230','#26143a','#3a1a44','#5a2050'].forEach((col,i)=>px(c,0,i*24,W,24,col));px(c,0,144,W,H+40,'#5a2050');
 // far skyline
 let x=-4;while(x<W){const w=14+Math.floor(R()*22),h=60+Math.floor(R()*70);px(c,x,150-h,w,h+40,'#1a1834');for(let wy=150-h+4;wy<150;wy+=4)for(let wx=x+2;wx<x+w-2;wx+=3)if(R()<.35)px(c,wx,wy,1,2,R()<.7?'#ffd27a':'#8fe0ff');
  if(R()<.4){const col=NS[Math.floor(R()*NS.length)];E.push(()=>px(c,x,150-h,w,2,col));L.push({x:x+w/2,y:150-h,r:20,c:col,i:.6})}x+=w+1}
 // orb spire
 const ox=372;px(c,ox,24,4,126,'#2a2440');for(const [oy,r] of [[98,7],[120,5]]){for(let yy=-r;yy<=r;yy++){const ww=Math.round(Math.sqrt(r*r-yy*yy));px(c,ox+2-ww,oy+yy,ww*2,1,'#3a2a5a')}E.push(()=>{for(let a=0;a<6.28;a+=.15)px(c,ox+2+Math.cos(a)*r,oy+Math.sin(a)*r,1,1,'#ff4fd0')});L.push({x:ox+2,y:oy,r:30,c:'#ff4fd0',i:1})}
 E.push(()=>px(c,ox+1,74,2,18,'#ff9ad0'));
 // stepped needle tower
 const nx=96;[[0,30,90],[4,22,60],[8,14,40],[11,8,26]].forEach(([d,w,t])=>px(c,nx+d,t,w,150-t,'#24203e'));px(c,nx+14,6,2,20,'#c8c8d8');for(let wy=34;wy<150;wy+=5)px(c,nx+3,wy,24,1,'#ffd27a55');E.push(()=>{px(c,nx+12,26,6,3,'#fff3c8')});L.push({x:nx+15,y:28,r:22,c:'#ffd27a',i:.8});
 // elevated train
 px(c,0,128,W,6,'#14122a');for(let k=10;k<W;k+=60)px(c,k,134,5,70,'#14122a');px(c,140,116,180,12,'#2a2a4a');E.push(()=>{for(let wx=144;wx<316;wx+=9)px(c,wx,119,6,5,'#bfefff')});L.push({x:230,y:122,r:60,c:'#8fe0ff',i:.7});
 // mid buildings: fire escapes, water tanks, sign stacks
 function bld(bx,bw,top,f){px(c,bx,top,bw,210-top,f);px(c,bx,top,bw,2,shade(f,.25));px(c,bx+bw-2,top,2,210-top,shade(f,-.3));
  for(let wy=top+6;wy<200;wy+=9)for(let wx=bx+3;wx<bx+bw-6;wx+=8){px(c,wx,wy,5,6,'#141a30');if(R()<.45){const col=R()<.75?'#ffd27a':'#8fe0ff';E.push(()=>px(c,wx,wy,5,6,col))}}
  for(let fy=top+10;fy<196;fy+=12){px(c,bx+2,fy,14,1,'#0a0a14');for(let q=0;q<10;q++)px(c,bx+3+q,fy+q*1.1,1,1,'#0a0a14')}
  if(R()<.7){const tx=bx+bw-14;px(c,tx,top-12,10,10,'#5a3a2a');px(c,tx-1,top-14,12,2,'#3a2a20');px(c,tx+1,top-2,1,3,'#3a2a20');px(c,tx+8,top-2,1,3,'#3a2a20')}}
 bld(-4,70,92,'#2a2e4e');bld(70,56,120,'#34284e');bld(300,64,104,'#2a3450');bld(368,50,138,'#3a2a4a');bld(420,64,96,'#2a2a48');
 for(const [vx,vy,vh] of [[60,98,60],[118,126,48],[290,110,56],[358,140,46],[412,104,64],[470,100,50]]){const col=NS[Math.floor(R()*NS.length)];
  E.push(()=>{px(c,vx-1,vy-1,9,vh+2,'#0a0a14');px(c,vx,vy,7,vh,col);px(c,vx+1,vy+1,5,vh-2,shade(col,.35));glyphs(c,R,vx,vy,7,vh,'#0a0a14')});L.push({x:vx+3,y:vy+vh/2,r:40,c:col,i:1.1})}
 for(const [hx,hy,hw] of [[8,150,40],[160,140,46],[240,150,40],[430,150,34]]){const col=NS[Math.floor(R()*NS.length)];E.push(()=>{px(c,hx-1,hy-1,hw+2,11,'#0a0a14');px(c,hx,hy,hw,9,col);glyphs(c,R,hx,hy,hw,9,'#0a0a14')});L.push({x:hx+hw/2,y:hy+4,r:44,c:col,i:1})}
 // a giant screen
 px(c,180,88,70,26,'#0a0a14');E.push(()=>{px(c,182,90,66,22,'#ff4f9a');px(c,182,102,66,10,'#4fe3ff');for(let k=0;k<6;k++)px(c,190+k*9,93,5,7,'#fff3dc')});L.push({x:215,y:100,r:70,c:'#ff6fd0',i:1.1});
 // street: wet asphalt, crossing, cabs, steam, crowd
 px(c,0,206,W,H+40-206,'#1a1a2a');px(c,0,206,W,3,'#3a3a5a');for(let k=0;k<12;k++)px(c,150+k*16,232,9,24,'#c8c8d8');
 for(const [cx,dir] of [[40,1],[330,-1],[420,1]]){px(c,cx,214,30,10,'#ffc83a');px(c,cx+6,208,16,7,'#ffc83a');px(c,cx+8,209,5,4,'#2a3a4a');px(c,cx+15,209,5,4,'#2a3a4a');px(c,cx+11,206,6,2,'#1a1a1a');px(c,cx+4,223,5,4,'#111');px(c,cx+21,223,5,4,'#111');
  E.push(()=>{px(c,dir>0?cx+28:cx,216,3,2,'#fff6c0')});L.push({x:dir>0?cx+40:cx-10,y:218,r:40,c:'#fff0c0',i:.7})}
 for(const sx of [120,282]){for(let q=0;q<14;q++){c.globalAlpha=.32-q*.018;disc2(c,sx+Math.sin(q*.6)*4,230-q*5,3+q*.7,'#e8e0f0');c.globalAlpha=1}}
 for(let k=0;k<16;k++)person(c,R,8+R()*(W-20),226+R()*30,P);
 c.setTransform(1,0,0,1,0,0);L.forEach(l=>l.y-=36);lightPass(c,W,H,[.32,.32,.5],L);c.translate(0,-36);E.forEach(f=>f());
 for(let k=0;k<110;k++){const rx=R()*W,ry=212+R()*(H-214);c.globalAlpha=.4;px(c,rx,ry,2+R()*6,1,NS[Math.floor(R()*NS.length)]);c.globalAlpha=1}
 c.setTransform(1,0,0,1,0,0);bloom(c,W,H);
}
return {paintCity,paintMetro,paintStation,paintCastle,paintGrove,paintMeadow,paintSky,paintInfest,paintSpirits,paintAbyss,paintVoid};})();

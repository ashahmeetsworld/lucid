// Fatal Frenzy v1.4: the psychic-explosion layer from the updated board.
// Aura blobs that boil off a fighter, warped psychedelic backdrops, a chunky % meter.
// aura: stacked boiling flame-blobs around (x,y). cols from outside in, e.g. [INK,'#5aff9a','#fff']
FA.aura=(R,x,y,r,cols,o)=>{o=o||{};const up=o.up??1.6;let g='';const ph=R()*6.28,k1=5+Math.floor(R()*3),k2=11+Math.floor(R()*4);
 cols.forEach((col,ci)=>{const rr=r*(1-ci*(o.step||.22));let d='';const n=120;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;let m=1+.28*Math.sin(k1*a+ph+ci)+.14*Math.sin(k2*a-ph*2+ci*2)+.08*Math.sin(23*a+ci);
   // flames lick upward: stretch the top half
   const s=Math.sin(a)<0?1+(-Math.sin(a))*(up-1)*(.6+.4*Math.sin(k1*a*1.5+ph)):1;const px=x+Math.cos(a)*rr*m,py=y+Math.sin(a)*rr*m*s;d+=(i?'L':'M')+px.toFixed(1)+' '+py.toFixed(1)}
  g+=`<path d="${d}Z" fill="${col}"${o.op?` opacity="${o.op}"`:''}/>`});
 return g};
// wisps: tapered ribbons curling off an aura
FA.wisps=(R,x,y,r,col,n,w)=>{let g='';for(let k=0;k<(n||10);k++){let a=-Math.PI/2+(R()-.5)*2.6,px=x+Math.cos(a)*r*.8,py=y+Math.sin(a)*r*.8;const pts=[];let ang=a;const L=40+R()*60,cv=(R()-.5)*.18;
  for(let i=0;i<L;i++){ang+=cv+Math.sin(i*.2+k)*.04;px+=Math.cos(ang)*6;py+=Math.sin(ang)*6-1.5;pts.push([px,py])}
  const W0=(w||14)*(.5+R());let L1='',L2='';pts.forEach(([qx,qy],i)=>{const t=1-i/pts.length,ww=W0*t,nx=-Math.sin(ang),ny=Math.cos(ang);L1+=(i?'L':'M')+(qx+nx*ww).toFixed(1)+' '+(qy+ny*ww).toFixed(1);L2=`L${(qx-nx*ww).toFixed(1)} ${(qy-ny*ww).toFixed(1)}`+L2});
  g+=`<path d="${L1}${L2}Z" fill="${col}"/>`}return g};
// warp: full-screen wavy psychedelic bands (the "everything bends" backdrop)
FA.warp=(R,cols,o)=>{o=o||{};const W=o.w||1920,H=o.h||1080,n=o.n||16,cx=o.cx??W/2,cy=o.cy??H/2;let g=`<rect width="${W}" height="${H}" fill="${cols[0]}"/>`;
 for(let b=n;b>0;b--){const rad=b*(Math.hypot(W,H)/n)*.62;let d='';const ph=R()*6.28;for(let i=0;i<=160;i++){const a=i/160*Math.PI*2;const m=1+.08*Math.sin(6*a+ph+b*.6)+.05*Math.sin(13*a-b);d+=(i?'L':'M')+(cx+Math.cos(a)*rad*m*1.25).toFixed(0)+' '+(cy+Math.sin(a)*rad*m*.85).toFixed(0)}
  g+=`<path d="${d}Z" fill="${cols[b%cols.length]}"/>`}
 return g};
// meter: chunky % readout, the frenzy filling up
FA.meter=(x,y,pct,col,size,label)=>`<g transform="translate(${x} ${y}) rotate(-4)"><text x="8" y="8" font-family="Archivo" font-style="italic" font-weight="900" font-stretch="125%" font-size="${size}" fill="#07050c">${pct}%</text><text font-family="Archivo" font-style="italic" font-weight="900" font-stretch="125%" font-size="${size}" fill="${col}" stroke="#07050c" stroke-width="4" paint-order="stroke">${pct}%</text>${label?`<text y="${size*.42}" font-family="Space Mono" font-weight="700" font-size="${Math.round(size*.16)}" letter-spacing="4" fill="${col}">${label}</text>`:''}</g>`;

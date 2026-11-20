// Fatal Frenzy v1.3 art kit: inked fighters, impact bursts, shards, halftone, painted stages, blood
const FA={};
FA.R=s=>{let x=s>>>0||1;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296}};
FA.POSE={
 stance:{head:[0,-178],neck:[0,-156],hip:[0,-76],rs:[14,-148],re:[38,-118],rh:[44,-150],ls:[-12,-148],le:[14,-112],lh:[22,-142],rp:[8,-76],rk:[36,-40],rf:[48,0],lp:[-8,-76],lk:[-30,-38],lf:[-48,0]},
 punch:{head:[14,-172],neck:[8,-150],hip:[-12,-72],rs:[18,-146],re:[66,-142],rh:[124,-148],ls:[-6,-146],le:[-38,-116],lh:[-14,-100],rp:[-2,-72],rk:[38,-36],rf:[66,0],lp:[-18,-72],lk:[-50,-36],lf:[-78,0]},
 kick:{head:[-34,-160],neck:[-24,-140],hip:[0,-82],rs:[-14,-134],re:[-52,-112],rh:[-84,-124],ls:[-28,-134],le:[0,-112],lh:[22,-128],rp:[6,-82],rk:[64,-114],rf:[132,-146],lp:[-6,-80],lk:[-12,-40],lf:[-24,0]},
 air:{head:[44,-152],neck:[28,-136],hip:[-30,-100],rs:[32,-136],re:[74,-116],rh:[118,-94],ls:[16,-140],le:[-10,-168],lh:[-44,-184],rp:[-24,-100],rk:[-62,-124],rf:[-106,-112],lp:[-36,-98],lk:[-56,-68],lf:[-98,-58]},
 hit:{head:[-46,-152],neck:[-36,-134],hip:[0,-72],rs:[-24,-140],re:[-34,-182],rh:[-14,-216],ls:[-44,-136],le:[-88,-128],lh:[-122,-148],rp:[6,-70],rk:[42,-40],rf:[30,0],lp:[-6,-70],lk:[22,-30],lf:[-10,6]},
 uppercut:{head:[6,-186],neck:[4,-164],hip:[-6,-80],rs:[14,-156],re:[30,-196],rh:[34,-246],ls:[-12,-154],le:[-40,-128],lh:[-20,-112],rp:[2,-80],rk:[30,-44],rf:[36,0],lp:[-12,-80],lk:[-42,-46],lf:[-60,-4]}
};
FA.limb=(a,b,w1,w2)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;return `M${a[0]+nx*w1} ${a[1]+ny*w1}L${b[0]+nx*w2} ${b[1]+ny*w2}L${b[0]-nx*w2} ${b[1]-ny*w2}L${a[0]-nx*w1} ${a[1]-ny*w1}Z`};
FA.body=(P,flip)=>{const f=p=>[flip?-p[0]:p[0],p[1]];const J={};for(const k in P)J[k]=f(P[k]);let d='';
 // torso: shoulders to hip
 d+=`M${J.ls[0]} ${J.ls[1]-4}L${J.rs[0]} ${J.rs[1]-4}L${(J.rs[0]+J.rp[0])/2+6} ${(J.rs[1]+J.rp[1])/2}L${J.rp[0]+8} ${J.rp[1]+6}L${J.lp[0]-8} ${J.lp[1]+6}L${(J.ls[0]+J.lp[0])/2-6} ${(J.ls[1]+J.lp[1])/2}Z`;
 d+=FA.limb(J.neck,[(J.ls[0]+J.rs[0])/2,(J.ls[1]+J.rs[1])/2+10],8,14);
 d+=FA.limb(J.rs,J.re,11,9)+FA.limb(J.re,J.rh,9,7)+FA.limb(J.ls,J.le,11,9)+FA.limb(J.le,J.lh,9,7);
 d+=FA.limb(J.rp,J.rk,15,10)+FA.limb(J.rk,J.rf,10,7)+FA.limb(J.lp,J.lk,15,10)+FA.limb(J.lk,J.lf,10,7);
 const c=(p,r)=>`M${p[0]-r} ${p[1]}a${r} ${r} 0 1 0 ${r*2} 0a${r} ${r} 0 1 0 ${-r*2} 0Z`;
 d+=c(J.re,9)+c(J.le,9)+c(J.rk,10)+c(J.lk,10)+c(J.rh,10)+c(J.lh,10)+c(J.head,19);
 // feet
 const ft=(k,a)=>{const s=flip?-1:1;return `M${k[0]-8*s} ${k[1]-6}L${k[0]+18*s} ${k[1]-4}L${k[0]+20*s} ${k[1]+4}L${k[0]-8*s} ${k[1]+4}Z`};d+=ft(J.rf)+ft(J.lf);
 // spiky hair
 const h=J.head;const hs=flip?1:-1;for(let i=0;i<5;i++){const a=-2.4+i*.42;d+=`M${h[0]+Math.cos(a)*14} ${h[1]+Math.sin(a)*14}L${h[0]+Math.cos(a+.2)*34+hs*14} ${h[1]+Math.sin(a+.2)*30-4}L${h[0]+Math.cos(a+.42)*14} ${h[1]+Math.sin(a+.42)*14}Z`}
 return {d,J}};
// fighter: rim offset + ink body + white cut highlights + optional scarf
FA.fighter=(pose,x,y,s,o)=>{o=o||{};const {d,J}=FA.body(FA.POSE[pose],o.flip);const ink=o.ink||'#07050c',rim=o.rim||'#f0123f';
 let g=`<g transform="translate(${x} ${y}) scale(${s})">`;
 if(o.scarf){const n=J.neck,dir=o.flip?1:-1;g+=`<path d="M${n[0]} ${n[1]}C${n[0]+dir*60} ${n[1]-30} ${n[0]+dir*90} ${n[1]+30} ${n[0]+dir*170} ${n[1]-10}L${n[0]+dir*150} ${n[1]+16}C${n[0]+dir*90} ${n[1]+40} ${n[0]+dir*50} ${n[1]+10} ${n[0]} ${n[1]+10}Z" fill="${o.scarf}" stroke="${ink}" stroke-width="3"/>`}
 g+=`<path d="${d}" fill="${rim}" transform="translate(${o.flip?-7:7} -5)"/>`;
 g+=`<path d="${d}" fill="${ink}" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>`;
 // eye glint
 const h=J.head;g+=`<path d="M${h[0]+(o.flip?-12:4)} ${h[1]-2}l9 -3l-1 4z" fill="${o.eye||'#fff'}"/>`;
 // white cut lines
 if(o.cuts!==false){g+=`<path d="M${J.rs[0]} ${J.rs[1]+10}L${J.rp[0]} ${J.rp[1]-10}" stroke="${o.hi||'#fff'}" stroke-width="2.5" opacity=".8"/>`;g+=`<path d="M${J.re[0]} ${J.re[1]}L${J.rh[0]} ${J.rh[1]}" stroke="${o.hi||'#fff'}" stroke-width="2" opacity=".6" transform="translate(0 -6)"/>`}
 return g+'</g>'};
FA.burst=(x,y,r1,r2,n,fill,rot,stroke)=>{let p='';for(let i=0;i<n*2;i++){const a=(rot||0)+i*Math.PI/n,r=i%2?r1:r2*(.75+((i*37)%10)/40);p+=(i?'L':'M')+(x+Math.cos(a)*r).toFixed(1)+' '+(y+Math.sin(a)*r).toFixed(1)}return `<path d="${p}Z" fill="${fill}" ${stroke?`stroke="${stroke}" stroke-width="6" stroke-linejoin="miter"`:''}/>`};
FA.speed=(R,fx,fy,col,op,n,r0)=>{let g='';for(let k=0;k<(n||90);k++){const a=R()*Math.PI*2,r1=(r0||220)+R()*300,r2=r1+800+R()*1400,w=.004+R()*.01;
 g+=`<path d="M${fx+Math.cos(a)*r1} ${fy+Math.sin(a)*r1}L${fx+Math.cos(a+w)*r2} ${fy+Math.sin(a+w)*r2}L${fx+Math.cos(a-w)*r2} ${fy+Math.sin(a-w)*r2}Z" fill="${col}" opacity="${op}"/>`}return g};
FA.ht=(id,col,r,ang)=>`<pattern id="${id}" width="${r*4}" height="${r*4}" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang||22})"><circle cx="${r*2}" cy="${r*2}" r="${r}" fill="${col}"/></pattern>`;
FA.lines=(id,col,w,gap,ang)=>`<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang||-30})"><rect width="${w}" height="${gap}" fill="${col}"/></pattern>`;
FA.shard=(pts,fill,o)=>`<path d="M${pts.map(p=>p.join(' ')).join('L')}Z" fill="${fill}" ${o||''}/>`;
// painted stage: soft Ori-like light, silhouetted floating platforms, motes
FA.stage=(id,R,o)=>{o=o||{};let g=`<defs><radialGradient id="${id}a" cx="${o.lx||.55}" cy="${o.ly||.35}" r=".7"><stop offset="0" stop-color="${o.c1||'#fff6d6'}"/><stop offset=".18" stop-color="${o.c2||'#7fe0d0'}"/><stop offset=".55" stop-color="${o.c3||'#1a4a6a'}"/><stop offset="1" stop-color="${o.c4||'#050b18'}"/></radialGradient>
 <filter id="${id}b"><feGaussianBlur stdDeviation="${o.blur||10}"/></filter></defs><rect width="${o.w||1920}" height="${o.h||1080}" fill="url(#${id}a)"/>`;
 const W=o.w||1920,H=o.h||1080;
 // far trees / roots as soft silhouettes
 g+=`<g filter="url(#${id}b)" opacity=".75">`;for(let k=0;k<9;k++){const x=R()*W,w=40+R()*90;g+=`<path d="M${x} ${H}C${x+10} ${H*.6} ${x-30} ${H*.35} ${x+20} ${H*.05}L${x+w} ${H*.05}C${x+w-20} ${H*.4} ${x+w+30} ${H*.6} ${x+w+10} ${H}Z" fill="${o.far||'#0a2232'}"/>`}g+='</g>';
 // light shafts
 for(let k=0;k<5;k++){const x=W*(.3+R()*.5);g+=`<path d="M${x} 0L${x+60+R()*80} 0L${x-200+R()*100} ${H}L${x-300} ${H}Z" fill="#fff6d6" opacity=".06"/>`}
 // ground
 g+=`<path d="M0 ${H*.86}C${W*.25} ${H*.8} ${W*.6} ${H*.9} ${W} ${H*.82}L${W} ${H}L0 ${H}Z" fill="${o.ground||'#02060e'}"/>`;
 // platforms
 (o.plats||[[.16,.62,.22],[.62,.5,.24],[.4,.72,.18]]).forEach(([px,py,pw])=>{const x=px*W,y=py*H,w=pw*W;g+=`<path d="M${x} ${y}L${x+w} ${y}L${x+w-20} ${y+18}C${x+w*.6} ${y+60} ${x+w*.4} ${y+40} ${x+30} ${y+22}Z" fill="${o.ground||'#02060e'}"/><path d="M${x} ${y}L${x+w} ${y}" stroke="${o.edge||'#7fe0d0'}" stroke-width="4"/>`});
 // motes
 for(let k=0;k<60;k++){const x=R()*W,y=R()*H*.85,r=1+R()*3;g+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6d6" opacity="${.3+R()*.6}"/>`}
 return g};
// blood
FA.splat=(R,x,y,r,col)=>{let d='';const n=14+Math.floor(R()*8);let pts=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,rr=r*(.65+R()*.5);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr])}
 d+=`<path d="M${pts.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join('L')}Z" fill="${col}"/>`;
 for(let i=0;i<10+R()*10;i++){const a=R()*Math.PI*2,l=r*(1.2+R()*1.8),w=r*(.06+R()*.1);const bx=x+Math.cos(a)*r*.6,by=y+Math.sin(a)*r*.6;
  d+=`<path d="M${bx+Math.cos(a+1.57)*w} ${by+Math.sin(a+1.57)*w}L${x+Math.cos(a)*l} ${y+Math.sin(a)*l}L${bx-Math.cos(a+1.57)*w} ${by-Math.sin(a+1.57)*w}Z" fill="${col}"/>`;if(R()<.7)d+=`<circle cx="${x+Math.cos(a)*(l+r*.25)}" cy="${y+Math.sin(a)*(l+r*.25)}" r="${w*(.6+R())}" fill="${col}"/>`}
 for(let i=0;i<24;i++){const a=R()*Math.PI*2,l=r*(1+R()*2.6);d+=`<circle cx="${x+Math.cos(a)*l}" cy="${y+Math.sin(a)*l}" r="${1+R()*r*.06}" fill="${col}"/>`}
 for(let i=0;i<3+R()*4;i++){const dx=x+(R()-.5)*r*1.2,len=r*(.6+R()*1.8),w=r*(.05+R()*.07);d+=`<rect x="${dx-w}" y="${y}" width="${w*2}" height="${len}" fill="${col}"/><circle cx="${dx}" cy="${y+len}" r="${w*1.5}" fill="${col}"/>`}
 return d};
FA.blood=(R,x,y,r)=>FA.splat(R,x,y,r,'#7a0016')+FA.splat(R,x+r*.15,y-r*.1,r*.6,'#d10a32');
FA.crack=(R,x,y,len,col,sw)=>{let d='';for(let b=0;b<7;b++){let a=R()*Math.PI*2,px=x,py=y,p=`M${x} ${y}`;const L=len*(.5+R()*.6);for(let s=0;s<6;s++){a+=(R()-.5)*.9;px+=Math.cos(a)*L/6;py+=Math.sin(a)*L/6;p+=`L${px} ${py}`}d+=`<path d="${p}" stroke="${col}" stroke-width="${sw}" fill="none"/>`}return d};
FA.bolt=(R,x1,y1,x2,y2,col,w)=>{let p=`M${x1} ${y1}`;for(let i=1;i<10;i++){const t=i/10;p+=`L${x1+(x2-x1)*t+(R()-.5)*90} ${y1+(y2-y1)*t+(R()-.5)*90}`}p+=`L${x2} ${y2}`;return `<path d="${p}" stroke="${col}" stroke-width="${w*4}" fill="none" opacity=".35"/><path d="${p}" stroke="#fff" stroke-width="${w}" fill="none"/>`};
// eye cut-in strip (stylised, original): almond eye with iris + lashes
FA.eye=(x,y,w,iris,flip)=>{const h=w*.34,s=flip?-1:1;return `<g transform="translate(${x} ${y}) scale(${s} 1)"><path d="M${-w/2} 0C${-w/4} ${-h} ${w/4} ${-h} ${w/2} ${-h*.2}C${w/4} ${h*.7} ${-w/4} ${h*.7} ${-w/2} 0Z" fill="#f2ecd8" stroke="#07050c" stroke-width="${w*.05}"/>
 <circle cx="${w*.06}" cy="${-h*.1}" r="${h*.62}" fill="${iris}"/><circle cx="${w*.06}" cy="${-h*.1}" r="${h*.3}" fill="#07050c"/><circle cx="${w*.13}" cy="${-h*.32}" r="${h*.13}" fill="#fff"/>
 <path d="M${-w/2-w*.04} ${-h*.05}C${-w/4} ${-h*1.25} ${w/4} ${-h*1.2} ${w/2+w*.06} ${-h*.35}" stroke="#07050c" stroke-width="${w*.07}" fill="none"/>
 <path d="M${-w*.1} ${-h*1.25}L${-w*.05} ${-h*1.6}M${w*.15} ${-h*1.15}L${w*.24} ${-h*1.45}" stroke="#07050c" stroke-width="${w*.03}"/></g>`};

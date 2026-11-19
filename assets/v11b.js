const F={L:['10000','10000','10000','10000','10000','10000','11111'],U:['10001','10001','10001','10001','10001','10001','01110'],C:['01111','10000','10000','10000','10000','10000','01111'],I:['11111','00100','00100','00100','00100','00100','11111'],D:['11110','10001','10001','10001','10001','10001','11110']};
function led(cv){const t=cv.dataset.led,p=+cv.dataset.px,cell=p*2;const cols=t.length*6-1;const W=cols*cell+p*2,H=7*cell;const d=2;cv.width=W*d;cv.height=H*d;cv.style.width=W+'px';cv.style.height=H+'px';
 const c=cv.getContext('2d');c.scale(d,d);c.globalCompositeOperation='lighter';
 for(const [dx,col] of [[-p*0.35,'#ff2f6b'],[p*0.35,'#3dd6ff'],[0,'#ffffff']]){[...t].forEach((ch,n)=>F[ch].forEach((r,y)=>[...r].forEach((b,x)=>{if(b!=='1')return;const cx=(n*6+x)*cell+cell/2+p+dx,cy=y*cell+cell/2;c.beginPath();c.arc(cx,cy,p*0.8,0,7);c.fillStyle=col;c.globalAlpha=col==='#ffffff'?.9:.8;c.fill()})))}
}
function barcode(el,seed){const R=rng(seed);let x=0;const W=el.clientWidth;let s='';while(x<W-4){const w=1+(R()*3|0);if(R()<.62)s+=`<i style="left:${x}px;width:${w}px"></i>`;x+=w+1}el.innerHTML=s;el.style.position='relative';el.querySelectorAll('i').forEach(i=>{i.style.cssText+=';position:absolute;top:0;bottom:0;background:#0b0b10'})}
function extras(){document.querySelectorAll('canvas.led').forEach(led);document.querySelectorAll('.bc').forEach((e,i)=>barcode(e,i*7+3))}

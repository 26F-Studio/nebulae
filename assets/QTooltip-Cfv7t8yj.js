import{r as L,aE as ge,aB as _,at as ve,aU as q,w as W,P as pe,z,g as ie,aV as D,aR as V,aW as F,aX as xe,k as be,c as ye,ab as Te,ac as O,ad as we,ae as Ee,a as k,af as He,O as Se,ag as We,ah as Ce,ai as Me,ao as Pe,h as G,T as ke,b as Le,aa as qe}from"./index-D07Ikl8C.js";import{c as Q}from"./selection-DfpBlV27.js";const oe={target:{type:[Boolean,String,Element],default:!0},noParentEvent:Boolean},Qe={...oe,contextMenu:Boolean};function ze({showing:e,avoidEmit:n,configureAnchorEl:l}){const{props:t,proxy:o,emit:c}=ie(),a=L(null);let r=null;function f(i){return a.value===null?!1:i===void 0||i.touches===void 0||i.touches.length<=1}const u={};l===void 0&&(Object.assign(u,{hide(i){o.hide(i)},toggle(i){o.toggle(i),i.qAnchorHandled=!0},toggleKey(i){ge(i,13)===!0&&u.toggle(i)},contextClick(i){o.hide(i),_(i),ve(()=>{o.show(i),i.qAnchorHandled=!0})},prevent:_,mobileTouch(i){if(u.mobileCleanup(i),f(i)!==!0)return;o.hide(i),a.value.classList.add("non-selectable");const s=i.target;q(u,"anchor",[[s,"touchmove","mobileCleanup","passive"],[s,"touchend","mobileCleanup","passive"],[s,"touchcancel","mobileCleanup","passive"],[a.value,"contextmenu","prevent","notPassive"]]),r=setTimeout(()=>{r=null,o.show(i),i.qAnchorHandled=!0},300)},mobileCleanup(i){a.value.classList.remove("non-selectable"),r!==null&&(clearTimeout(r),r=null),e.value===!0&&i!==void 0&&Q()}}),l=function(i=t.contextMenu){if(t.noParentEvent===!0||a.value===null)return;let s;i===!0?o.$q.platform.is.mobile===!0?s=[[a.value,"touchstart","mobileTouch","passive"]]:s=[[a.value,"mousedown","hide","passive"],[a.value,"contextmenu","contextClick","notPassive"]]:s=[[a.value,"click","toggle","passive"],[a.value,"keyup","toggleKey","passive"]],q(u,"anchor",s)});function h(){D(u,"anchor")}function H(i){for(a.value=i;a.value.classList.contains("q-anchor--skip");)a.value=a.value.parentNode;l()}function b(){if(t.target===!1||t.target===""||o.$el.parentNode===null)a.value=null;else if(t.target===!0)H(o.$el.parentNode);else{let i=t.target;if(typeof t.target=="string")try{i=document.querySelector(t.target)}catch{i=void 0}i!=null?(a.value=i.$el||i,l()):(a.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return W(()=>t.contextMenu,i=>{a.value!==null&&(h(),l(i))}),W(()=>t.target,()=>{a.value!==null&&h(),b()}),W(()=>t.noParentEvent,i=>{a.value!==null&&(i===!0?h():l())}),pe(()=>{b(),n!==!0&&t.modelValue===!0&&a.value===null&&c("update:modelValue",!1)}),z(()=>{r!==null&&clearTimeout(r),h()}),{anchorEl:a,canShow:f,anchorEvents:u}}function Ae(e,n){const l=L(null);let t;function o(r,f){const u=`${f!==void 0?"add":"remove"}EventListener`,h=f!==void 0?f:t;r!==window&&r[u]("scroll",h,V.passive),window[u]("scroll",h,V.passive),t=f}function c(){l.value!==null&&(o(l.value),l.value=null)}const a=W(()=>e.noParentEvent,()=>{l.value!==null&&(c(),n())});return z(a),{localScrollTarget:l,unconfigureScrollTarget:c,changeScrollEvent:o}}const{notPassiveCapture:A}=V,E=[];function $(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let l=F.length-1;for(;l>=0;){const t=F[l].$;if(t.type.name==="QTooltip"){l--;continue}if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;l--}for(let t=E.length-1;t>=0;t--){const o=E[t];if((o.anchorEl.value===null||o.anchorEl.value.contains(n)===!1)&&(n===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(n)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function $e(e){E.push(e),E.length===1&&(document.addEventListener("mousedown",$,A),document.addEventListener("touchstart",$,A))}function J(e){const n=E.findIndex(l=>l===e);n!==-1&&(E.splice(n,1),E.length===0&&(document.removeEventListener("mousedown",$,A),document.removeEventListener("touchstart",$,A)))}let Z,ee;function te(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Be(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const N={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{N[`${e}#ltr`]=e,N[`${e}#rtl`]=e});function ne(e,n){const l=e.split(" ");return{vertical:l[0],horizontal:N[`${l[1]}#${n===!0?"rtl":"ltr"}`]}}function je(e,n){let{top:l,left:t,right:o,bottom:c,width:a,height:r}=e.getBoundingClientRect();return n!==void 0&&(l-=n[1],t-=n[0],c+=n[1],o+=n[0],a+=n[0],r+=n[1]),{top:l,bottom:c,height:r,left:t,right:o,width:a,middle:t+(o-t)/2,center:l+(c-l)/2}}function Oe(e,n,l){let{top:t,left:o}=e.getBoundingClientRect();return t+=n.top,o+=n.left,l!==void 0&&(t+=l[1],o+=l[0]),{top:t,bottom:t+1,height:1,left:o,right:o+1,width:1,middle:o,center:t}}function Re(e,n){return{top:0,center:n/2,bottom:n,left:0,middle:e/2,right:e}}function le(e,n,l,t){return{top:e[l.vertical]-n[t.vertical],left:e[l.horizontal]-n[t.horizontal]}}function ae(e,n=0){if(e.targetEl===null||e.anchorEl===null||n>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{ae(e,n+1)},10);return}const{targetEl:l,offset:t,anchorEl:o,anchorOrigin:c,selfOrigin:a,absoluteOffset:r,fit:f,cover:u,maxHeight:h,maxWidth:H}=e;if(xe.is.ios===!0&&window.visualViewport!==void 0){const S=document.body.style,{offsetLeft:v,offsetTop:p}=window.visualViewport;v!==Z&&(S.setProperty("--q-pe-left",v+"px"),Z=v),p!==ee&&(S.setProperty("--q-pe-top",p+"px"),ee=p)}const{scrollLeft:b,scrollTop:i}=l,s=r===void 0?je(o,u===!0?[0,0]:t):Oe(o,r,t);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:H,maxHeight:h,visibility:"visible"});const{offsetWidth:y,offsetHeight:C}=l,{elWidth:B,elHeight:P}=f===!0||u===!0?{elWidth:Math.max(s.width,y),elHeight:u===!0?Math.max(s.height,C):C}:{elWidth:y,elHeight:C};let g={maxWidth:H,maxHeight:h};(f===!0||u===!0)&&(g.minWidth=s.width+"px",u===!0&&(g.minHeight=s.height+"px")),Object.assign(l.style,g);const T=Re(B,P);let d=le(s,T,c,a);if(r===void 0||t===void 0)R(d,s,T,c,a);else{const{top:S,left:v}=d;R(d,s,T,c,a);let p=!1;if(d.top!==S){p=!0;const x=2*t[1];s.center=s.top-=x,s.bottom-=x+2}if(d.left!==v){p=!0;const x=2*t[0];s.middle=s.left-=x,s.right-=x+2}p===!0&&(d=le(s,T,c,a),R(d,s,T,c,a))}g={top:d.top+"px",left:d.left+"px"},d.maxHeight!==void 0&&(g.maxHeight=d.maxHeight+"px",s.height>d.maxHeight&&(g.minHeight=g.maxHeight)),d.maxWidth!==void 0&&(g.maxWidth=d.maxWidth+"px",s.width>d.maxWidth&&(g.minWidth=g.maxWidth)),Object.assign(l.style,g),l.scrollTop!==i&&(l.scrollTop=i),l.scrollLeft!==b&&(l.scrollLeft=b)}function R(e,n,l,t,o){const c=l.bottom,a=l.right,r=be(),f=window.innerHeight-r,u=document.body.clientWidth;if(e.top<0||e.top+c>f)if(o.vertical==="center")e.top=n[t.vertical]>f/2?Math.max(0,f-c):0,e.maxHeight=Math.min(c,f);else if(n[t.vertical]>f/2){const h=Math.min(f,t.vertical==="center"?n.center:t.vertical===o.vertical?n.bottom:n.top);e.maxHeight=Math.min(c,h),e.top=Math.max(0,h-c)}else e.top=Math.max(0,t.vertical==="center"?n.center:t.vertical===o.vertical?n.top:n.bottom),e.maxHeight=Math.min(c,f-e.top);if(e.left<0||e.left+a>u)if(e.maxWidth=Math.min(a,u),o.horizontal==="middle")e.left=n[t.horizontal]>u/2?Math.max(0,u-a):0;else if(n[t.horizontal]>u/2){const h=Math.min(u,t.horizontal==="middle"?n.middle:t.horizontal===o.horizontal?n.right:n.left);e.maxWidth=Math.min(a,h),e.left=Math.max(0,h-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?n.middle:t.horizontal===o.horizontal?n.left:n.right),e.maxWidth=Math.min(a,u-e.left)}const Ne=ye({name:"QTooltip",inheritAttrs:!1,props:{...oe,...Te,...O,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{...O.transitionShow,default:"jump-down"},transitionHide:{...O.transitionHide,default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:te},self:{type:String,default:"top middle",validator:te},offset:{type:Array,default:()=>[14,14],validator:Be},scrollTarget:we,delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...Ee],setup(e,{slots:n,emit:l,attrs:t}){let o,c;const a=ie(),{proxy:{$q:r}}=a,f=L(null),u=L(!1),h=k(()=>ne(e.anchor,r.lang.rtl)),H=k(()=>ne(e.self,r.lang.rtl)),b=k(()=>e.persistent!==!0),{registerTick:i,removeTick:s}=He(),{registerTimeout:y}=Se(),{transitionProps:C,transitionStyle:B}=We(e),{localScrollTarget:P,changeScrollEvent:g,unconfigureScrollTarget:T}=Ae(e,U),{anchorEl:d,canShow:S,anchorEvents:v}=ze({showing:u,configureAnchorEl:fe}),{show:p,hide:x}=Ce({showing:u,canShow:S,handleShow:ue,handleHide:se,hideOnRouteChange:b,processOnMount:!0});Object.assign(v,{delayShow:ce,delayHide:de});const{showPortal:I,hidePortal:K,renderPortal:re}=Me(a,f,me,"tooltip");if(r.platform.is.mobile===!0){const m={anchorEl:d,innerRef:f,onClickOutside(w){return x(w),w.target.classList.contains("q-dialog__backdrop")&&qe(w),!0}},j=k(()=>e.modelValue===null&&e.persistent!==!0&&u.value===!0);W(j,w=>{(w===!0?$e:J)(m)}),z(()=>{J(m)})}function ue(m){I(),i(()=>{c=new MutationObserver(()=>M()),c.observe(f.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),M(),U()}),o===void 0&&(o=W(()=>r.screen.width+"|"+r.screen.height+"|"+e.self+"|"+e.anchor+"|"+r.lang.rtl,M)),y(()=>{I(!0),l("show",m)},e.transitionDuration)}function se(m){s(),K(),X(),y(()=>{K(!0),l("hide",m)},e.transitionDuration)}function X(){c!==void 0&&(c.disconnect(),c=void 0),o!==void 0&&(o(),o=void 0),T(),D(v,"tooltipTemp")}function M(){ae({targetEl:f.value,offset:e.offset,anchorEl:d.value,anchorOrigin:h.value,selfOrigin:H.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ce(m){if(r.platform.is.mobile===!0){Q(),document.body.classList.add("non-selectable");const j=d.value,w=["touchmove","touchcancel","touchend","click"].map(Y=>[j,Y,"delayHide","passiveCapture"]);q(v,"tooltipTemp",w)}y(()=>{p(m)},e.delay)}function de(m){r.platform.is.mobile===!0&&(D(v,"tooltipTemp"),Q(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),y(()=>{x(m)},e.hideDelay)}function fe(){if(e.noParentEvent===!0||d.value===null)return;const m=r.platform.is.mobile===!0?[[d.value,"touchstart","delayShow","passive"]]:[[d.value,"mouseenter","delayShow","passive"],[d.value,"mouseleave","delayHide","passive"]];q(v,"anchor",m)}function U(){if(d.value!==null||e.scrollTarget!==void 0){P.value=Pe(d.value,e.scrollTarget);const m=e.noParentEvent===!0?M:x;g(P.value,m)}}function he(){return u.value===!0?G("div",{...t,ref:f,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,B.value],role:"tooltip"},Le(n.default)):null}function me(){return G(ke,C.value,he)}return z(X),Object.assign(a.proxy,{updatePosition:M}),re}});export{Ne as Q,Be as a,Ae as b,ze as c,$e as d,ne as p,J as r,ae as s,Qe as u,te as v};

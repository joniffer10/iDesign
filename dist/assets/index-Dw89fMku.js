(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();/**
* @vue/shared v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ci(e){const t=Object.create(null);for(const s of e.split(","))t[s]=1;return s=>s in t}const xe={},is=[],bt=()=>{},Vn=()=>!1,ba=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ya=e=>e.startsWith("onUpdate:"),Ne=Object.assign,ui=(e,t)=>{const s=e.indexOf(t);s>-1&&e.splice(s,1)},ol=Object.prototype.hasOwnProperty,he=(e,t)=>ol.call(e,t),te=Array.isArray,ns=e=>js(e)==="[object Map]",$a=e=>js(e)==="[object Set]",Li=e=>js(e)==="[object Date]",re=e=>typeof e=="function",Ie=e=>typeof e=="string",ot=e=>typeof e=="symbol",be=e=>e!==null&&typeof e=="object",Mn=e=>(be(e)||re(e))&&re(e.then)&&re(e.catch),Nn=Object.prototype.toString,js=e=>Nn.call(e),ll=e=>js(e).slice(8,-1),Pn=e=>js(e)==="[object Object]",pi=e=>Ie(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ss=ci(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ka=e=>{const t=Object.create(null);return s=>t[s]||(t[s]=e(s))},rl=/-\w/g,Ue=ka(e=>e.replace(rl,t=>t.slice(1).toUpperCase())),dl=/\B([A-Z])/g,Dt=ka(e=>e.replace(dl,"-$1").toLowerCase()),xa=ka(e=>e.charAt(0).toUpperCase()+e.slice(1)),Da=ka(e=>e?`on${xa(e)}`:""),ht=(e,t)=>!Object.is(e,t),Xs=(e,...t)=>{for(let s=0;s<e.length;s++)e[s](...t)},Ln=(e,t,s,a=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:a,value:s})},wa=e=>{const t=parseFloat(e);return isNaN(t)?e:t},cl=e=>{const t=Ie(e)?Number(e):NaN;return isNaN(t)?e:t};let Ei;const Ca=()=>Ei||(Ei=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ze(e){if(te(e)){const t={};for(let s=0;s<e.length;s++){const a=e[s],n=Ie(a)?ml(a):ze(a);if(n)for(const i in n)t[i]=n[i]}return t}else if(Ie(e)||be(e))return e}const ul=/;(?![^(]*\))/g,pl=/:([^]+)/,fl=/\/\*[^]*?\*\//g;function ml(e){const t={};return e.replace(fl,"").split(ul).forEach(s=>{if(s){const a=s.split(pl);a.length>1&&(t[a[0].trim()]=a[1].trim())}}),t}function E(e){let t="";if(Ie(e))t=e;else if(te(e))for(let s=0;s<e.length;s++){const a=E(e[s]);a&&(t+=a+" ")}else if(be(e))for(const s in e)e[s]&&(t+=s+" ");return t.trim()}const vl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",gl=ci(vl);function En(e){return!!e||e===""}function hl(e,t){if(e.length!==t.length)return!1;let s=!0;for(let a=0;s&&a<e.length;a++)s=Hs(e[a],t[a]);return s}function Hs(e,t){if(e===t)return!0;let s=Li(e),a=Li(t);if(s||a)return s&&a?e.getTime()===t.getTime():!1;if(s=ot(e),a=ot(t),s||a)return e===t;if(s=te(e),a=te(t),s||a)return s&&a?hl(e,t):!1;if(s=be(e),a=be(t),s||a){if(!s||!a)return!1;const n=Object.keys(e).length,i=Object.keys(t).length;if(n!==i)return!1;for(const l in e){const c=e.hasOwnProperty(l),u=t.hasOwnProperty(l);if(c&&!u||!c&&u||!Hs(e[l],t[l]))return!1}}return String(e)===String(t)}function bl(e,t){return e.findIndex(s=>Hs(s,t))}const Dn=e=>!!(e&&e.__v_isRef===!0),y=e=>Ie(e)?e:e==null?"":te(e)||be(e)&&(e.toString===Nn||!re(e.toString))?Dn(e)?y(e.value):JSON.stringify(e,Bn,2):String(e),Bn=(e,t)=>Dn(t)?Bn(e,t.value):ns(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((s,[a,n],i)=>(s[Ba(a,i)+" =>"]=n,s),{})}:$a(t)?{[`Set(${t.size})`]:[...t.values()].map(s=>Ba(s))}:ot(t)?Ba(t):be(t)&&!te(t)&&!Pn(t)?String(t):t,Ba=(e,t="")=>{var s;return ot(e)?`Symbol(${(s=e.description)!=null?s:t})`:e};/**
* @vue/reactivity v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Le;class yl{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Le&&(Le.active?(this.parent=Le,this.index=(Le.scopes||(Le.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,s;if(this.scopes){const a=this.scopes.slice();for(t=0,s=a.length;t<s;t++)a[t].pause()}for(t=0,s=this.effects.length;t<s;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,s;if(this.scopes){const n=this.scopes.slice();for(t=0,s=n.length;t<s;t++)n[t].resume()}const a=this.effects.slice();for(t=0,s=a.length;t<s;t++)a[t].resume()}}run(t){if(this._active){const s=Le;try{return Le=this,t()}finally{Le=s}}}on(){++this._on===1&&(this.prevScope=Le,Le=this)}off(){if(this._on>0&&--this._on===0){if(Le===this)Le=this.prevScope;else{let t=Le;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let s,a;for(s=0,a=this.effects.length;s<a;s++)this.effects[s].stop();for(this.effects.length=0,s=0,a=this.cleanups.length;s<a;s++)this.cleanups[s]();if(this.cleanups.length=0,this.scopes){const n=this.scopes.slice();for(s=0,a=n.length;s<a;s++)n[s].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const n=this.parent.scopes.pop();n&&n!==this&&(this.parent.scopes[this.index]=n,n.index=this.index)}this.parent=void 0}}}function $l(){return Le}let we;const Ra=new WeakSet;class Rn{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Le&&(Le.active?Le.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ra.has(this)&&(Ra.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Fn(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Di(this),_n(this);const t=we,s=it;we=this,it=!0;try{return this.fn()}finally{jn(this),we=t,it=s,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)vi(t);this.deps=this.depsTail=void 0,Di(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ra.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ya(this)&&this.run()}get dirty(){return Ya(this)}}let On=0,Is,As;function Fn(e,t=!1){if(e.flags|=8,t){e.next=As,As=e;return}e.next=Is,Is=e}function fi(){On++}function mi(){if(--On>0)return;if(As){let t=As;for(As=void 0;t;){const s=t.next;t.next=void 0,t.flags&=-9,t=s}}let e;for(;Is;){let t=Is;for(Is=void 0;t;){const s=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(a){e||(e=a)}t=s}}if(e)throw e}function _n(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function jn(e){let t,s=e.depsTail,a=s;for(;a;){const n=a.prevDep;a.version===-1?(a===s&&(s=n),vi(a),kl(a)):t=a,a.dep.activeLink=a.prevActiveLink,a.prevActiveLink=void 0,a=n}e.deps=t,e.depsTail=s}function Ya(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Hn(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Hn(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Ns)||(e.globalVersion=Ns,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ya(e))))return;e.flags|=2;const t=e.dep,s=we,a=it;we=e,it=!0;try{_n(e);const n=e.fn(e._value);(t.version===0||ht(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(n){throw t.version++,n}finally{we=s,it=a,jn(e),e.flags&=-3}}function vi(e,t=!1){const{dep:s,prevSub:a,nextSub:n}=e;if(a&&(a.nextSub=n,e.prevSub=void 0),n&&(n.prevSub=a,e.nextSub=void 0),s.subs===e&&(s.subs=a,!a&&s.computed)){s.computed.flags&=-5;for(let i=s.computed.deps;i;i=i.nextDep)vi(i,!0)}!t&&!--s.sc&&s.map&&s.map.delete(s.key)}function kl(e){const{prevDep:t,nextDep:s}=e;t&&(t.nextDep=s,e.prevDep=void 0),s&&(s.prevDep=t,e.nextDep=void 0)}let it=!0;const Un=[];function It(){Un.push(it),it=!1}function At(){const e=Un.pop();it=e===void 0?!0:e}function Di(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const s=we;we=void 0;try{t()}finally{we=s}}}let Ns=0;class xl{constructor(t,s){this.sub=t,this.dep=s,this.version=s.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class gi{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!we||!it||we===this.computed)return;let s=this.activeLink;if(s===void 0||s.sub!==we)s=this.activeLink=new xl(we,this),we.deps?(s.prevDep=we.depsTail,we.depsTail.nextDep=s,we.depsTail=s):we.deps=we.depsTail=s,qn(s);else if(s.version===-1&&(s.version=this.version,s.nextDep)){const a=s.nextDep;a.prevDep=s.prevDep,s.prevDep&&(s.prevDep.nextDep=a),s.prevDep=we.depsTail,s.nextDep=void 0,we.depsTail.nextDep=s,we.depsTail=s,we.deps===s&&(we.deps=a)}return s}trigger(t){this.version++,Ns++,this.notify(t)}notify(t){fi();try{for(let s=this.subs;s;s=s.prevSub)s.sub.notify()&&s.sub.dep.notify()}finally{mi()}}}function qn(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let a=t.deps;a;a=a.nextDep)qn(a)}const s=e.dep.subs;s!==e&&(e.prevSub=s,s&&(s.nextSub=e)),e.dep.subs=e}}const Qa=new WeakMap,Gt=Symbol(""),Za=Symbol(""),Ps=Symbol("");function Be(e,t,s){if(it&&we){let a=Qa.get(e);a||Qa.set(e,a=new Map);let n=a.get(s);n||(a.set(s,n=new gi),n.map=a,n.key=s),n.track()}}function xt(e,t,s,a,n,i){const l=Qa.get(e);if(!l){Ns++;return}const c=u=>{u&&u.trigger()};if(fi(),t==="clear")l.forEach(c);else{const u=te(e),f=u&&pi(s);if(u&&s==="length"){const p=Number(a);l.forEach((h,k)=>{(k==="length"||k===Ps||!ot(k)&&k>=p)&&c(h)})}else switch((s!==void 0||l.has(void 0))&&c(l.get(s)),f&&c(l.get(Ps)),t){case"add":u?f&&c(l.get("length")):(c(l.get(Gt)),ns(e)&&c(l.get(Za)));break;case"delete":u||(c(l.get(Gt)),ns(e)&&c(l.get(Za)));break;case"set":ns(e)&&c(l.get(Gt));break}}mi()}function ts(e){const t=me(e);return t===e?t:(Be(t,"iterate",Ps),Xe(e)?t:t.map(lt))}function Sa(e){return Be(e=me(e),"iterate",Ps),e}function vt(e,t){return zt(e)?cs(Wt(e)?lt(t):t):lt(t)}const wl={__proto__:null,[Symbol.iterator](){return Oa(this,Symbol.iterator,e=>vt(this,e))},concat(...e){return ts(this).concat(...e.map(t=>te(t)?ts(t):t))},entries(){return Oa(this,"entries",e=>(e[1]=vt(this,e[1]),e))},every(e,t){return yt(this,"every",e,t,void 0,arguments)},filter(e,t){return yt(this,"filter",e,t,s=>s.map(a=>vt(this,a)),arguments)},find(e,t){return yt(this,"find",e,t,s=>vt(this,s),arguments)},findIndex(e,t){return yt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return yt(this,"findLast",e,t,s=>vt(this,s),arguments)},findLastIndex(e,t){return yt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return yt(this,"forEach",e,t,void 0,arguments)},includes(...e){return Fa(this,"includes",e)},indexOf(...e){return Fa(this,"indexOf",e)},join(e){return ts(this).join(e)},lastIndexOf(...e){return Fa(this,"lastIndexOf",e)},map(e,t){return yt(this,"map",e,t,void 0,arguments)},pop(){return hs(this,"pop")},push(...e){return hs(this,"push",e)},reduce(e,...t){return Bi(this,"reduce",e,t)},reduceRight(e,...t){return Bi(this,"reduceRight",e,t)},shift(){return hs(this,"shift")},some(e,t){return yt(this,"some",e,t,void 0,arguments)},splice(...e){return hs(this,"splice",e)},toReversed(){return ts(this).toReversed()},toSorted(e){return ts(this).toSorted(e)},toSpliced(...e){return ts(this).toSpliced(...e)},unshift(...e){return hs(this,"unshift",e)},values(){return Oa(this,"values",e=>vt(this,e))}};function Oa(e,t,s){const a=Sa(e),n=a[t]();return a!==e&&!Xe(e)&&(n._next=n.next,n.next=()=>{const i=n._next();return i.done||(i.value=s(i.value)),i}),n}const Cl=Array.prototype;function yt(e,t,s,a,n,i){const l=Sa(e),c=l!==e&&!Xe(e),u=l[t];if(u!==Cl[t]){const h=u.apply(e,i);return c?lt(h):h}let f=s;l!==e&&(c?f=function(h,k){return s.call(this,vt(e,h),k,e)}:s.length>2&&(f=function(h,k){return s.call(this,h,k,e)}));const p=u.call(l,f,a);return c&&n?n(p):p}function Bi(e,t,s,a){const n=Sa(e),i=n!==e&&!Xe(e);let l=s,c=!1;n!==e&&(i?(c=a.length===0,l=function(f,p,h){return c&&(c=!1,f=vt(e,f)),s.call(this,f,vt(e,p),h,e)}):s.length>3&&(l=function(f,p,h){return s.call(this,f,p,h,e)}));const u=n[t](l,...a);return c?vt(e,u):u}function Fa(e,t,s){const a=me(e);Be(a,"iterate",Ps);const n=a[t](...s);return(n===-1||n===!1)&&yi(s[0])?(s[0]=me(s[0]),a[t](...s)):n}function hs(e,t,s=[]){It(),fi();const a=me(e)[t].apply(e,s);return mi(),At(),a}const Sl=ci("__proto__,__v_isRef,__isVue"),Gn=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ot));function Il(e){ot(e)||(e=String(e));const t=me(this);return Be(t,"has",e),t.hasOwnProperty(e)}class Wn{constructor(t=!1,s=!1){this._isReadonly=t,this._isShallow=s}get(t,s,a){if(s==="__v_skip")return t.__v_skip;const n=this._isReadonly,i=this._isShallow;if(s==="__v_isReactive")return!n;if(s==="__v_isReadonly")return n;if(s==="__v_isShallow")return i;if(s==="__v_raw")return a===(n?i?Dl:Qn:i?Yn:Jn).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(a)?t:void 0;const l=te(t);if(!n){let u;if(l&&(u=wl[s]))return u;if(s==="hasOwnProperty")return Il}const c=Reflect.get(t,s,Fe(t)?t:a);if((ot(s)?Gn.has(s):Sl(s))||(n||Be(t,"get",s),i))return c;if(Fe(c)){const u=l&&pi(s)?c:c.value;return n&&be(u)?sa(u):u}return be(c)?n?sa(c):Ia(c):c}}class Kn extends Wn{constructor(t=!1){super(!1,t)}set(t,s,a,n){let i=t[s];const l=te(t)&&pi(s);if(!this._isShallow){const f=zt(i);if(!Xe(a)&&!zt(a)&&(i=me(i),a=me(a)),!l&&Fe(i)&&!Fe(a))return f||(i.value=a),!0}const c=l?Number(s)<t.length:he(t,s),u=Reflect.set(t,s,a,Fe(t)?t:n);return t===me(n)&&u&&(c?ht(a,i)&&xt(t,"set",s,a):xt(t,"add",s,a)),u}deleteProperty(t,s){const a=he(t,s);t[s];const n=Reflect.deleteProperty(t,s);return n&&a&&xt(t,"delete",s,void 0),n}has(t,s){const a=Reflect.has(t,s);return(!ot(s)||!Gn.has(s))&&Be(t,"has",s),a}ownKeys(t){return Be(t,"iterate",te(t)?"length":Gt),Reflect.ownKeys(t)}}class Al extends Wn{constructor(t=!1){super(!0,t)}set(t,s){return!0}deleteProperty(t,s){return!0}}const zl=new Kn,Tl=new Al,Vl=new Kn(!0);const Xa=e=>e,Ks=e=>Reflect.getPrototypeOf(e);function Ml(e,t,s){return function(...a){const n=this.__v_raw,i=me(n),l=ns(i),c=e==="entries"||e===Symbol.iterator&&l,u=e==="keys"&&l,f=n[e](...a),p=s?Xa:t?cs:lt;return!t&&Be(i,"iterate",u?Za:Gt),Ne(Object.create(f),{next(){const{value:h,done:k}=f.next();return k?{value:h,done:k}:{value:c?[p(h[0]),p(h[1])]:p(h),done:k}}})}}function Js(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Nl(e,t){const s={get(n){const i=this.__v_raw,l=me(i),c=me(n);e||(ht(n,c)&&Be(l,"get",n),Be(l,"get",c));const{has:u}=Ks(l),f=t?Xa:e?cs:lt;if(u.call(l,n))return f(i.get(n));if(u.call(l,c))return f(i.get(c));i!==l&&i.get(n)},get size(){const n=this.__v_raw;return!e&&Be(me(n),"iterate",Gt),n.size},has(n){const i=this.__v_raw,l=me(i),c=me(n);return e||(ht(n,c)&&Be(l,"has",n),Be(l,"has",c)),n===c?i.has(n):i.has(n)||i.has(c)},forEach(n,i){const l=this,c=l.__v_raw,u=me(c),f=t?Xa:e?cs:lt;return!e&&Be(u,"iterate",Gt),c.forEach((p,h)=>n.call(i,f(p),f(h),l))}};return Ne(s,e?{add:Js("add"),set:Js("set"),delete:Js("delete"),clear:Js("clear")}:{add(n){const i=me(this),l=Ks(i),c=me(n),u=!t&&!Xe(n)&&!zt(n)?c:n;return l.has.call(i,u)||ht(n,u)&&l.has.call(i,n)||ht(c,u)&&l.has.call(i,c)||(i.add(u),xt(i,"add",u,u)),this},set(n,i){!t&&!Xe(i)&&!zt(i)&&(i=me(i));const l=me(this),{has:c,get:u}=Ks(l);let f=c.call(l,n);f||(n=me(n),f=c.call(l,n));const p=u.call(l,n);return l.set(n,i),f?ht(i,p)&&xt(l,"set",n,i):xt(l,"add",n,i),this},delete(n){const i=me(this),{has:l,get:c}=Ks(i);let u=l.call(i,n);u||(n=me(n),u=l.call(i,n)),c&&c.call(i,n);const f=i.delete(n);return u&&xt(i,"delete",n,void 0),f},clear(){const n=me(this),i=n.size!==0,l=n.clear();return i&&xt(n,"clear",void 0,void 0),l}}),["keys","values","entries",Symbol.iterator].forEach(n=>{s[n]=Ml(n,e,t)}),s}function hi(e,t){const s=Nl(e,t);return(a,n,i)=>n==="__v_isReactive"?!e:n==="__v_isReadonly"?e:n==="__v_raw"?a:Reflect.get(he(s,n)&&n in a?s:a,n,i)}const Pl={get:hi(!1,!1)},Ll={get:hi(!1,!0)},El={get:hi(!0,!1)};const Jn=new WeakMap,Yn=new WeakMap,Qn=new WeakMap,Dl=new WeakMap;function Bl(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ia(e){return zt(e)?e:bi(e,!1,zl,Pl,Jn)}function Rl(e){return bi(e,!1,Vl,Ll,Yn)}function sa(e){return bi(e,!0,Tl,El,Qn)}function bi(e,t,s,a,n){if(!be(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;const i=n.get(e);if(i)return i;const l=Bl(ll(e));if(l===0)return e;const c=new Proxy(e,l===2?a:s);return n.set(e,c),c}function Wt(e){return zt(e)?Wt(e.__v_raw):!!(e&&e.__v_isReactive)}function zt(e){return!!(e&&e.__v_isReadonly)}function Xe(e){return!!(e&&e.__v_isShallow)}function yi(e){return e?!!e.__v_raw:!1}function me(e){const t=e&&e.__v_raw;return t?me(t):e}function Ol(e){return!he(e,"__v_skip")&&Object.isExtensible(e)&&Ln(e,"__v_skip",!0),e}const lt=e=>be(e)?Ia(e):e,cs=e=>be(e)?sa(e):e;function Fe(e){return e?e.__v_isRef===!0:!1}function B(e){return Fl(e,!1)}function Fl(e,t){return Fe(e)?e:new _l(e,t)}class _l{constructor(t,s){this.dep=new gi,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=s?t:me(t),this._value=s?t:lt(t),this.__v_isShallow=s}get value(){return this.dep.track(),this._value}set value(t){const s=this._rawValue,a=this.__v_isShallow||Xe(t)||zt(t);t=a?t:me(t),ht(t,s)&&(this._rawValue=t,this._value=a?t:lt(t),this.dep.trigger())}}function D(e){return Fe(e)?e.value:e}const jl={get:(e,t,s)=>t==="__v_raw"?e:D(Reflect.get(e,t,s)),set:(e,t,s,a)=>{const n=e[t];return Fe(n)&&!Fe(s)?(n.value=s,!0):Reflect.set(e,t,s,a)}};function Zn(e){return Wt(e)?e:new Proxy(e,jl)}class Hl{constructor(t,s,a){this.fn=t,this.setter=s,this._value=void 0,this.dep=new gi(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ns-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!s,this.isSSR=a}notify(){if(this.flags|=16,!(this.flags&8)&&we!==this)return Fn(this,!0),!0}get value(){const t=this.dep.track();return Hn(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Ul(e,t,s=!1){let a,n;return re(e)?a=e:(a=e.get,n=e.set),new Hl(a,n,s)}const Ys={},aa=new WeakMap;let _t;function ql(e,t=!1,s=_t){if(s){let a=aa.get(s);a||aa.set(s,a=[]),a.push(e)}}function Gl(e,t,s=xe){const{immediate:a,deep:n,once:i,scheduler:l,augmentJob:c,call:u}=s,f=F=>n?F:Xe(F)||n===!1||n===0?wt(F,1):wt(F);let p,h,k,w,m=!1,$=!1;if(Fe(e)?(h=()=>e.value,m=Xe(e)):Wt(e)?(h=()=>f(e),m=!0):te(e)?($=!0,m=e.some(F=>Wt(F)||Xe(F)),h=()=>e.map(F=>{if(Fe(F))return F.value;if(Wt(F))return f(F);if(re(F))return u?u(F,2):F()})):re(e)?t?h=u?()=>u(e,2):e:h=()=>{if(k){It();try{k()}finally{At()}}const F=_t;_t=p;try{return u?u(e,3,[w]):e(w)}finally{_t=F}}:h=bt,t&&n){const F=h,le=n===!0?1/0:n;h=()=>wt(F(),le)}const _=$l(),T=()=>{p.stop(),_&&_.active&&ui(_.effects,p)};if(i&&t){const F=t;t=(...le)=>{const de=F(...le);return T(),de}}let P=$?new Array(e.length).fill(Ys):Ys;const j=F=>{if(!(!(p.flags&1)||!p.dirty&&!F))if(t){const le=p.run();if(F||n||m||($?le.some((de,ae)=>ht(de,P[ae])):ht(le,P))){k&&k();const de=_t;_t=p;try{const ae=[le,P===Ys?void 0:$&&P[0]===Ys?[]:P,w];P=le,u?u(t,3,ae):t(...ae)}finally{_t=de}}}else p.run()};return c&&c(j),p=new Rn(h),p.scheduler=l?()=>l(j,!1):j,w=F=>ql(F,!1,p),k=p.onStop=()=>{const F=aa.get(p);if(F){if(u)u(F,4);else for(const le of F)le();aa.delete(p)}},t?a?j(!0):P=p.run():l?l(j.bind(null,!0),!0):p.run(),T.pause=p.pause.bind(p),T.resume=p.resume.bind(p),T.stop=T,T}function wt(e,t=1/0,s){if(t<=0||!be(e)||e.__v_skip||(s=s||new Map,(s.get(e)||0)>=t))return e;if(s.set(e,t),t--,Fe(e))wt(e.value,t,s);else if(te(e))for(let a=0;a<e.length;a++)wt(e[a],t,s);else if($a(e)||ns(e))e.forEach(a=>{wt(a,t,s)});else if(Pn(e)){for(const a in e)wt(e[a],t,s);for(const a of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,a)&&wt(e[a],t,s)}return e}/**
* @vue/runtime-core v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Us(e,t,s,a){try{return a?e(...a):e()}catch(n){Aa(n,t,s)}}function et(e,t,s,a){if(re(e)){const n=Us(e,t,s,a);return n&&Mn(n)&&n.catch(i=>{Aa(i,t,s)}),n}if(te(e)){const n=[];for(let i=0;i<e.length;i++)n.push(et(e[i],t,s,a));return n}}function Aa(e,t,s,a=!0){const n=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||xe;if(t){let c=t.parent;const u=t.proxy,f=`https://vuejs.org/error-reference/#runtime-${s}`;for(;c;){const p=c.ec;if(p){for(let h=0;h<p.length;h++)if(p[h](e,u,f)===!1)return}c=c.parent}if(i){It(),Us(i,null,10,[e,u,f]),At();return}}Wl(e,s,n,a,l)}function Wl(e,t,s,a=!0,n=!1){if(n)throw e;console.error(e)}const He=[];let mt=-1;const os=[];let Lt=null,as=0;const Xn=Promise.resolve();let ia=null;function Ls(e){const t=ia||Xn;return e?t.then(this?e.bind(this):e):t}function Kl(e){let t=mt+1,s=He.length;for(;t<s;){const a=t+s>>>1,n=He[a],i=Es(n);i<e||i===e&&n.flags&2?t=a+1:s=a}return t}function $i(e){if(!(e.flags&1)){const t=Es(e),s=He[He.length-1];!s||!(e.flags&2)&&t>=Es(s)?He.push(e):He.splice(Kl(t),0,e),e.flags|=1,eo()}}function eo(){ia||(ia=Xn.then(so))}function Jl(e){if(!te(e))Lt&&e.id===-1?Lt.splice(as+1,0,e):e.flags&1||(os.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)os.push(e[t]);eo()}function Ri(e,t,s=mt+1){for(;s<He.length;s++){const a=He[s];if(a&&a.flags&2){if(e&&a.id!==e.uid)continue;He.splice(s,1),s--,a.flags&4&&(a.flags&=-2),a(),a.flags&4||(a.flags&=-2)}}}function to(e){if(os.length){const t=[...new Set(os)].sort((s,a)=>Es(s)-Es(a));if(os.length=0,Lt){for(let s=0;s<t.length;s++)Lt.push(t[s]);return}for(Lt=t,as=0;as<Lt.length;as++){const s=Lt[as];s.flags&4&&(s.flags&=-2),s.flags&8||s(),s.flags&=-2}Lt=null,as=0}}const Es=e=>e.id==null?e.flags&2?-1:1/0:e.id;function so(e){try{for(mt=0;mt<He.length;mt++){const t=He[mt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Us(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;mt<He.length;mt++){const t=He[mt];t&&(t.flags&=-2)}mt=-1,He.length=0,to(),ia=null,(He.length||os.length)&&so()}}let Ee=null,ao=null;function na(e){const t=Ee;return Ee=e,ao=e&&e.type.__scopeId||null,t}function A(e,t=Ee,s){if(!t||e._n)return e;const a=(...n)=>{a._d&&da(-1);const i=na(t),l=St.length;let c;try{c=e(...n)}finally{for(let u=St.length;u>l;u--)Si();na(i),a._d&&da(1)}return c};return a._n=!0,a._c=!0,a._d=!0,a}function ls(e,t){if(Ee===null)return e;const s=Pa(Ee),a=e.dirs||(e.dirs=[]);for(let n=0;n<t.length;n++){let[i,l,c,u=xe]=t[n];i&&(re(i)&&(i={mounted:i,updated:i}),i.deep&&wt(l),a.push({dir:i,instance:s,value:l,oldValue:void 0,arg:c,modifiers:u}))}return e}function Rt(e,t,s,a){const n=e.dirs,i=t&&t.dirs;for(let l=0;l<n.length;l++){const c=n[l];i&&(c.oldValue=i[l].value);let u=c.dir[a];u&&(It(),et(u,s,8,[e.el,c,e,t]),At())}}function Yl(e,t){if(Oe){let s=Oe.provides;const a=Oe.parent&&Oe.parent.provides;a===s&&(s=Oe.provides=Object.create(a)),s[e]=t}}function zs(e,t,s=!1){const a=Ii();if(a||ds){let n=ds?ds._context.provides:a?a.parent==null||a.ce?a.vnode.appContext&&a.vnode.appContext.provides:a.parent.provides:void 0;if(n&&e in n)return n[e];if(arguments.length>1)return s&&re(t)?t.call(a&&a.proxy):t}}const Ql=Symbol.for("v-scx"),Zl=()=>zs(Ql);function Ct(e,t,s){return io(e,t,s)}function io(e,t,s=xe){const{immediate:a,deep:n,flush:i,once:l}=s,c=Ne({},s),u=t&&a||!t&&i!=="post";let f;if(Fs){if(i==="sync"){const w=Zl();f=w.__watcherHandles||(w.__watcherHandles=[])}else if(!u){const w=()=>{};return w.stop=bt,w.resume=bt,w.pause=bt,w}}const p=Oe;c.call=(w,m,$)=>et(w,p,m,$);let h=!1;i==="post"?c.scheduler=w=>{je(w,p&&p.suspense)}:i!=="sync"&&(h=!0,c.scheduler=(w,m)=>{m?w():$i(w)}),c.augmentJob=w=>{t&&(w.flags|=4),h&&(w.flags|=2,p&&(w.id=p.uid,w.i=p))};const k=Gl(e,t,c);return Fs&&(f?f.push(k):u&&k()),k}function Xl(e,t,s){const a=this.proxy,n=Ie(e)?e.includes(".")?no(a,e):()=>a[e]:e.bind(a,a);let i;re(t)?i=t:(i=t.handler,s=t);const l=Gs(this),c=io(n,i.bind(a),s);return l(),c}function no(e,t){const s=t.split(".");return()=>{let a=e;for(let n=0;n<s.length&&a;n++)a=a[s[n]];return a}}const Mt=new WeakMap,oo=Symbol("_vte"),za=e=>e.__isTeleport,jt=e=>e&&(e.disabled||e.disabled===""),er=e=>e&&(e.defer||e.defer===""),Oi=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Fi=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,ei=(e,t)=>{const s=e&&e.to;return Ie(s)?t?t(s):null:s},tr={name:"Teleport",__isTeleport:!0,process(e,t,s,a,n,i,l,c,u,f){const{mc:p,pc:h,pbc:k,o:{insert:w,querySelector:m,createText:$,createComment:_,parentNode:T}}=f,P=jt(t.props);let{dynamicChildren:j}=t;const F=(ae,pe,Q)=>{ae.shapeFlag&16&&p(ae.children,pe,Q,n,i,l,c,u)},le=(ae=t)=>{const pe=jt(ae.props),Q=ae.target=ei(ae.props,m),ee=ti(Q,ae,$,w);Q&&(l!=="svg"&&Oi(Q)?l="svg":l!=="mathml"&&Fi(Q)&&(l="mathml"),n&&n.isCE&&(n.ce._teleportTargets||(n.ce._teleportTargets=new Set)).add(Q),pe||(F(ae,Q,ee),ks(ae,!1)))},de=ae=>{const pe=()=>{if(Mt.get(ae)===pe){if(Mt.delete(ae),jt(ae.props)){const Q=T(ae.el)||s;F(ae,Q,ae.anchor),ks(ae,!0)}le(ae)}};Mt.set(ae,pe),je(pe,i)};if(e==null){const ae=t.el=$(""),pe=t.anchor=$("");if(w(ae,s,a),w(pe,s,a),er(t.props)||i&&i.pendingBranch){de(t);return}P&&(F(t,s,pe),ks(t,!0)),le()}else{t.el=e.el;const ae=t.anchor=e.anchor,pe=Mt.get(e);if(pe){pe.flags|=8,Mt.delete(e),de(t);return}t.targetStart=e.targetStart;const Q=t.target=e.target,ee=t.targetAnchor=e.targetAnchor,ce=jt(e.props),J=ce?s:Q,ge=ce?ae:ee;if(l==="svg"||Oi(Q)?l="svg":(l==="mathml"||Fi(Q))&&(l="mathml"),j?(k(e.dynamicChildren,j,J,n,i,l,c),Ci(e,t,!0)):u||h(e,t,J,ge,n,i,l,c,!1),P)ce?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Qs(t,s,ae,f,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const Ae=ei(t.props,m);Ae&&(t.target=Ae,Qs(t,Ae,null,f,0))}else ce&&Qs(t,Q,ee,f,1);ks(t,P)}},remove(e,t,s,{um:a,o:{remove:n}},i){const{shapeFlag:l,children:c,anchor:u,targetStart:f,targetAnchor:p,target:h,props:k}=e,w=jt(k),m=i||!w,$=Mt.get(e);if($&&($.flags|=8,Mt.delete(e)),h&&(n(f),n(p)),i&&n(u),!$&&(w||h)&&l&16)for(let _=0;_<c.length;_++){const T=c[_];a(T,t,s,m,!!T.dynamicChildren)}},move:Qs,hydrate:sr};function Qs(e,t,s,{o:{insert:a},m:n},i=2){i===0&&a(e.targetAnchor,t,s);const{el:l,anchor:c,shapeFlag:u,children:f,props:p}=e,h=i===2;if(h&&a(l,t,s),!Mt.has(e)&&(!h||jt(p))&&u&16)for(let k=0;k<f.length;k++)n(f[k],t,s,2);h&&a(c,t,s)}function sr(e,t,s,a,n,i,{o:{nextSibling:l,parentNode:c,querySelector:u,insert:f,createText:p}},h){function k(_,T){let P=T;for(;P;){if(P&&P.nodeType===8){if(P.data==="teleport start anchor")t.targetStart=P;else if(P.data==="teleport anchor"){t.targetAnchor=P,_._lpa=t.targetAnchor&&l(t.targetAnchor);break}}P=l(P)}}function w(_,T){T.anchor=h(l(_),T,c(_),s,a,n,i)}const m=t.target=ei(t.props,u),$=jt(t.props);if(m){const _=m._lpa||m.firstChild;t.shapeFlag&16&&($?(w(e,t),k(m,_),t.targetAnchor||ti(m,t,p,f,c(e)===m?e:null)):(t.anchor=l(e),k(m,_),t.targetAnchor||ti(m,t,p,f),h(_&&l(_),t,m,s,a,n,i))),ks(t,$)}else $&&t.shapeFlag&16&&(w(e,t),t.targetStart=e,t.targetAnchor=l(e));return t.anchor&&l(t.anchor)}const Zt=tr;function ks(e,t){const s=e.ctx;if(s&&s.ut){let a,n;for(t?(a=e.el,n=e.anchor):(a=e.targetStart,n=e.targetAnchor);a&&a!==n;)a.nodeType===1&&a.setAttribute("data-v-owner",s.uid),a=a.nextSibling;s.ut()}}function ti(e,t,s,a,n=null){const i=t.targetStart=s(""),l=t.targetAnchor=s("");return i[oo]=l,e&&(a(i,e,n),a(l,e,n)),l}const Ze=Symbol("_leaveCb"),bs=Symbol("_enterCb");function lo(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return tt(()=>{e.isMounted=!0}),Xt(()=>{e.isUnmounting=!0}),e}const Qe=[Function,Array],ro={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Qe,onEnter:Qe,onAfterEnter:Qe,onEnterCancelled:Qe,onBeforeLeave:Qe,onLeave:Qe,onAfterLeave:Qe,onLeaveCancelled:Qe,onBeforeAppear:Qe,onAppear:Qe,onAfterAppear:Qe,onAppearCancelled:Qe},co=e=>{const t=e.subTree;return t.component?co(t.component):t},ar={name:"BaseTransition",props:ro,setup(e,{slots:t}){const s=Ii(),a=lo();return()=>{const n=t.default&&ki(t.default(),!0),i=n&&n.length?uo(n):s.subTree?S():void 0;if(!i)return;const l=me(e),{mode:c}=l;if(a.isLeaving)return _a(i);const u=oa(i);if(!u)return _a(i);let f=Ds(u,l,a,s,h=>f=h);u.type!==Re&&Kt(u,f);let p=s.subTree&&oa(s.subTree);if(p&&p.type!==Re&&!Ht(p,u)&&co(s).type!==Re){let h=Ds(p,l,a,s);if(Kt(p,h),c==="out-in"&&u.type!==Re)return a.isLeaving=!0,h.afterLeave=()=>{a.isLeaving=!1,s.job.flags&8||s.update(),delete h.afterLeave,p=void 0},_a(i);c==="in-out"&&u.type!==Re?h.delayLeave=(k,w,m)=>{const $=po(a,p);$[String(p.key)]=p,k[Ze]=()=>{w(),k[Ze]=void 0,delete f.delayedLeave,p=void 0},f.delayedLeave=()=>{m(),delete f.delayedLeave,p=void 0}}:p=void 0}else p&&(p=void 0);return i}}};function uo(e){let t=e[0];if(e.length>1){for(const s of e)if(s.type!==Re){t=s;break}}return t}const ir=ar;function po(e,t){const{leavingVNodes:s}=e;let a=s.get(t.type);return a||(a=Object.create(null),s.set(t.type,a)),a}function Ds(e,t,s,a,n){const{appear:i,mode:l,persisted:c=!1,onBeforeEnter:u,onEnter:f,onAfterEnter:p,onEnterCancelled:h,onBeforeLeave:k,onLeave:w,onAfterLeave:m,onLeaveCancelled:$,onBeforeAppear:_,onAppear:T,onAfterAppear:P,onAppearCancelled:j}=t,F=String(e.key),le=po(s,e),de=(Q,ee)=>{Q&&et(Q,a,9,ee)},ae=(Q,ee)=>{const ce=ee[1];de(Q,ee),te(Q)?Q.every(J=>J.length<=1)&&ce():Q.length<=1&&ce()},pe={mode:l,persisted:c,beforeEnter(Q){let ee=u;if(!s.isMounted)if(i)ee=_||u;else return;Q[Ze]&&Q[Ze](!0);const ce=le[F];ce&&Ht(e,ce)&&ce.el[Ze]&&ce.el[Ze](),de(ee,[Q])},enter(Q){if(le[F]===e)return;let ee=f,ce=p,J=h;if(!s.isMounted)if(i)ee=T||f,ce=P||p,J=j||h;else return;let ge=!1;Q[bs]=We=>{ge||(ge=!0,We?de(J,[Q]):de(ce,[Q]),pe.delayedLeave&&pe.delayedLeave(),Q[bs]=void 0)};const Ae=Q[bs].bind(null,!1);ee?ae(ee,[Q,Ae]):Ae()},leave(Q,ee){const ce=String(e.key);if(Q[bs]&&Q[bs](!0),s.isUnmounting)return ee();de(k,[Q]);let J=!1;Q[Ze]=Ae=>{J||(J=!0,ee(),Ae?de($,[Q]):de(m,[Q]),Q[Ze]=void 0,le[ce]===e&&delete le[ce])};const ge=Q[Ze].bind(null,!1);le[ce]=e,w?ae(w,[Q,ge]):ge()},clone(Q){const ee=Ds(Q,t,s,a,n);return n&&n(ee),ee}};return pe}function _a(e){if(Ta(e))return e=Et(e),e.children=null,e}function oa(e){if(!Ta(e))return za(e.type)&&e.children?uo(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:s}=e;if(s){if(t&16)return s[0];if(t&32&&re(s.default))return s.default()}}function Kt(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;const s=e.component.subTree;Kt(za(s.type)&&oa(s)||s,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ki(e,t=!1,s){let a=[],n=0;for(let i=0;i<e.length;i++){let l=e[i];const c=s==null?l.key:String(s)+String(l.key!=null?l.key:i);l.type===Y?(l.patchFlag&128&&n++,a=a.concat(ki(l.children,t,c))):(t||l.type!==Re)&&a.push(c!=null?Et(l,{key:c}):l)}if(n>1)for(let i=0;i<a.length;i++)a[i].patchFlag=-2;return a}function fo(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function _i(e,t){let s;return!!((s=Object.getOwnPropertyDescriptor(e,t))&&!s.configurable)}const la=new WeakMap;function Ts(e,t,s,a,n=!1){if(te(e)){e.forEach(($,_)=>Ts($,t&&(te(t)?t[_]:t),s,a,n));return}if(rs(a)&&!n){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&Ts(e,t,s,a.component.subTree);return}const i=a.shapeFlag&4?Pa(a.component):a.el,l=n?null:i,{i:c,r:u}=e,f=t&&t.r,p=c.refs===xe?c.refs={}:c.refs,h=c.setupState,k=me(h),w=h===xe?Vn:$=>_i(p,$)?!1:he(k,$),m=($,_)=>!(_&&_i(p,_));if(f!=null&&f!==u){if(ji(t),Ie(f))p[f]=null,w(f)&&(h[f]=null);else if(Fe(f)){const $=t;m(f,$.k)&&(f.value=null),$.k&&(p[$.k]=null)}}if(re(u))Us(u,c,12,[l,p]);else{const $=Ie(u),_=Fe(u);if($||_){const T=()=>{if(e.f){const P=$?w(u)?h[u]:p[u]:m()||!e.k?u.value:p[e.k];if(n)te(P)&&ui(P,i);else if(te(P))P.includes(i)||P.push(i);else if($)p[u]=[i],w(u)&&(h[u]=p[u]);else{const j=[i];m(u,e.k)&&(u.value=j),e.k&&(p[e.k]=j)}}else $?(p[u]=l,w(u)&&(h[u]=l)):_&&(m(u,e.k)&&(u.value=l),e.k&&(p[e.k]=l))};if(l){const P=()=>{T(),la.delete(e)};P.id=-1,la.set(e,P),je(P,s)}else ji(e),T()}}}function ji(e){const t=la.get(e);t&&(t.flags|=8,la.delete(e))}Ca().requestIdleCallback;Ca().cancelIdleCallback;const rs=e=>!!e.type.__asyncLoader,Ta=e=>e.type.__isKeepAlive;function nr(e,t){mo(e,"a",t)}function or(e,t){mo(e,"da",t)}function mo(e,t,s=Oe){const a=e.__wdc||(e.__wdc=()=>{let n=s;for(;n;){if(n.isDeactivated)return;n=n.parent}return e()});if(Va(t,a,s),s){let n=s.parent;for(;n&&n.parent;)Ta(n.parent.vnode)&&lr(a,t,s,n),n=n.parent}}function lr(e,t,s,a){const n=Va(t,e,a,!0);qs(()=>{ui(a[t],n)},s)}function Va(e,t,s=Oe,a=!1){if(s){const n=s[e]||(s[e]=[]),i=t.__weh||(t.__weh=(...l)=>{It();const c=Gs(s),u=et(t,s,e,l);return c(),At(),u});return a?n.unshift(i):n.push(i),i}}const Tt=e=>(t,s=Oe)=>{(!Fs||e==="sp")&&Va(e,(...a)=>t(...a),s)},rr=Tt("bm"),tt=Tt("m"),dr=Tt("bu"),vo=Tt("u"),Xt=Tt("bum"),qs=Tt("um"),cr=Tt("sp"),ur=Tt("rtg"),pr=Tt("rtc");function fr(e,t=Oe){Va("ec",e,t)}const go="components";function mr(e,t){return bo(go,e,!0,t)||e}const ho=Symbol.for("v-ndc");function Ce(e){return Ie(e)?bo(go,e,!1)||e:e||ho}function bo(e,t,s=!0,a=!1){const n=Ee||Oe;if(n){const i=n.type;{const c=Zr(i,!1);if(c&&(c===t||c===Ue(t)||c===xa(Ue(t))))return i}const l=Hi(n[e]||i[e],t)||Hi(n.appContext[e],t);return!l&&a?i:l}}function Hi(e,t){return e&&(e[t]||e[Ue(t)]||e[xa(Ue(t))])}function ue(e,t,s,a){let n;const i=s,l=te(e);if(l||Ie(e)){const c=l&&Wt(e);let u=!1,f=!1;c&&(u=!Xe(e),f=zt(e),e=Sa(e)),n=new Array(e.length);for(let p=0,h=e.length;p<h;p++)n[p]=t(u?f?cs(lt(e[p])):lt(e[p]):e[p],p,void 0,i)}else if(typeof e=="number"){n=new Array(e);for(let c=0;c<e;c++)n[c]=t(c+1,c,void 0,i)}else if(be(e))if(e[Symbol.iterator])n=Array.from(e,(c,u)=>t(c,u,void 0,i));else{const c=Object.keys(e);n=new Array(c.length);for(let u=0,f=c.length;u<f;u++){const p=c[u];n[u]=t(e[p],p,u,i)}}else n=[];return n}function vr(e,t){for(let s=0;s<t.length;s++){const a=t[s];if(te(a))for(let n=0;n<a.length;n++)e[a[n].name]=a[n].fn;else a&&(e[a.name]=a.key?(...n)=>{const i=a.fn(...n);return i&&(i.key=a.key),i}:a.fn)}return e}function R(e,t,s,a,n,i){if(s==null&&(s={}),Ee.ce||Ee.parent&&rs(Ee.parent)&&Ee.parent.ce){const f=i!=null&&s.key==null?Ne({},s,{key:i}):s,p=Object.keys(f).length>0;return t!=="default"&&(f.name=t),r(),O(Y,null,[g("slot",f,a&&a())],p?-2:64)}let l=e[t];l&&l._c&&(l._d=!1);const c=St.length;r();let u;try{const f=l&&yo(l(s)),p=s.key||i||f&&f.key;u=O(Y,{key:(p&&!ot(p)?p:`_${t}`)+(!f&&a?"_fb":"")},f||(a?a():[]),f&&e._===1?64:-2)}catch(f){for(let p=St.length;p>c;p--)Si();throw f}finally{l&&l._c&&(l._d=!0)}return u}function yo(e){return e.some(t=>Rs(t)?!(t.type===Re||t.type===Y&&!yo(t.children)):!0)?e:null}const si=e=>e?Ro(e)?Pa(e):si(e.parent):null,Vs=Ne(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>si(e.parent),$root:e=>si(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>ko(e),$forceUpdate:e=>e.f||(e.f=()=>{$i(e.update)}),$nextTick:e=>e.n||(e.n=Ls.bind(e.proxy)),$watch:e=>Xl.bind(e)}),ja=(e,t)=>e!==xe&&!e.__isScriptSetup&&he(e,t),gr={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:s,setupState:a,data:n,props:i,accessCache:l,type:c,appContext:u}=e;if(t[0]!=="$"){const k=l[t];if(k!==void 0)switch(k){case 1:return a[t];case 2:return n[t];case 4:return s[t];case 3:return i[t]}else{if(ja(a,t))return l[t]=1,a[t];if(n!==xe&&he(n,t))return l[t]=2,n[t];if(he(i,t))return l[t]=3,i[t];if(s!==xe&&he(s,t))return l[t]=4,s[t];ai&&(l[t]=0)}}const f=Vs[t];let p,h;if(f)return t==="$attrs"&&Be(e.attrs,"get",""),f(e);if((p=c.__cssModules)&&(p=p[t]))return p;if(s!==xe&&he(s,t))return l[t]=4,s[t];if(h=u.config.globalProperties,he(h,t))return h[t]},set({_:e},t,s){const{data:a,setupState:n,ctx:i}=e;return ja(n,t)?(n[t]=s,!0):a!==xe&&he(a,t)?(a[t]=s,!0):he(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=s,!0)},has({_:{data:e,setupState:t,accessCache:s,ctx:a,appContext:n,props:i,type:l}},c){let u;return!!(s[c]||e!==xe&&c[0]!=="$"&&he(e,c)||ja(t,c)||he(i,c)||he(a,c)||he(Vs,c)||he(n.config.globalProperties,c)||(u=l.__cssModules)&&u[c])},defineProperty(e,t,s){return s.get!=null?e._.accessCache[t]=0:he(s,"value")&&this.set(e,t,s.value,null),Reflect.defineProperty(e,t,s)}};function Ui(e){return te(e)?e.reduce((t,s)=>(t[s]=null,t),{}):e}let ai=!0;function hr(e){const t=ko(e),s=e.proxy,a=e.ctx;ai=!1,t.beforeCreate&&qi(t.beforeCreate,e,"bc");const{data:n,computed:i,methods:l,watch:c,provide:u,inject:f,created:p,beforeMount:h,mounted:k,beforeUpdate:w,updated:m,activated:$,deactivated:_,beforeDestroy:T,beforeUnmount:P,destroyed:j,unmounted:F,render:le,renderTracked:de,renderTriggered:ae,errorCaptured:pe,serverPrefetch:Q,expose:ee,inheritAttrs:ce,components:J,directives:ge,filters:Ae}=t;if(f&&br(f,a,null),l)for(const v in l){const ye=l[v];re(ye)&&(a[v]=ye.bind(s))}if(n){const v=n.call(s,s);be(v)&&(e.data=Ia(v))}if(ai=!0,i)for(const v in i){const ye=i[v],rt=re(ye)?ye.bind(s,s):re(ye.get)?ye.get.bind(s,s):bt,es=!re(ye)&&re(ye.set)?ye.set.bind(s):bt,ve=Z({get:rt,set:es});Object.defineProperty(a,v,{enumerable:!0,configurable:!0,get:()=>ve.value,set:C=>ve.value=C})}if(c)for(const v in c)$o(c[v],a,s,v);if(u){const v=re(u)?u.call(s):u;Reflect.ownKeys(v).forEach(ye=>{Yl(ye,v[ye])})}p&&qi(p,e,"c");function Te(v,ye){te(ye)?ye.forEach(rt=>v(rt.bind(s))):ye&&v(ye.bind(s))}if(Te(rr,h),Te(tt,k),Te(dr,w),Te(vo,m),Te(nr,$),Te(or,_),Te(fr,pe),Te(pr,de),Te(ur,ae),Te(Xt,P),Te(qs,F),Te(cr,Q),te(ee))if(ee.length){const v=e.exposed||(e.exposed={});ee.forEach(ye=>{Object.defineProperty(v,ye,{get:()=>s[ye],set:rt=>s[ye]=rt,enumerable:!0})})}else e.exposed||(e.exposed={});le&&e.render===bt&&(e.render=le),ce!=null&&(e.inheritAttrs=ce),J&&(e.components=J),ge&&(e.directives=ge),Q&&fo(e)}function br(e,t,s=bt){te(e)&&(e=ii(e));for(const a in e){const n=e[a];let i;be(n)?"default"in n?i=zs(n.from||a,n.default,!0):i=zs(n.from||a):i=zs(n),Fe(i)?Object.defineProperty(t,a,{enumerable:!0,configurable:!0,get:()=>i.value,set:l=>i.value=l}):t[a]=i}}function qi(e,t,s){et(te(e)?e.map(a=>a.bind(t.proxy)):e.bind(t.proxy),t,s)}function $o(e,t,s,a){let n=a.includes(".")?no(s,a):()=>s[a];if(Ie(e)){const i=t[e];re(i)&&Ct(n,i)}else if(re(e))Ct(n,e.bind(s));else if(be(e))if(te(e))e.forEach(i=>$o(i,t,s,a));else{const i=re(e.handler)?e.handler.bind(s):t[e.handler];re(i)&&Ct(n,i,e)}}function ko(e){const t=e.type,{mixins:s,extends:a}=t,{mixins:n,optionsCache:i,config:{optionMergeStrategies:l}}=e.appContext,c=i.get(t);let u;return c?u=c:!n.length&&!s&&!a?u=t:(u={},n.length&&n.forEach(f=>ra(u,f,l,!0)),ra(u,t,l)),be(t)&&i.set(t,u),u}function ra(e,t,s,a=!1){const{mixins:n,extends:i}=t;i&&ra(e,i,s,!0),n&&n.forEach(l=>ra(e,l,s,!0));for(const l in t)if(!(a&&l==="expose")){const c=yr[l]||s&&s[l];e[l]=c?c(e[l],t[l]):t[l]}return e}const yr={data:Gi,props:Wi,emits:Wi,methods:xs,computed:xs,beforeCreate:_e,created:_e,beforeMount:_e,mounted:_e,beforeUpdate:_e,updated:_e,beforeDestroy:_e,beforeUnmount:_e,destroyed:_e,unmounted:_e,activated:_e,deactivated:_e,errorCaptured:_e,serverPrefetch:_e,components:xs,directives:xs,watch:kr,provide:Gi,inject:$r};function Gi(e,t){return t?e?function(){return Ne(re(e)?e.call(this,this):e,re(t)?t.call(this,this):t)}:t:e}function $r(e,t){return xs(ii(e),ii(t))}function ii(e){if(te(e)){const t={};for(let s=0;s<e.length;s++)t[e[s]]=e[s];return t}return e}function _e(e,t){return e?[...new Set([].concat(e,t))]:t}function xs(e,t){return e?Ne(Object.create(null),e,t):t}function Wi(e,t){return e?te(e)&&te(t)?[...new Set([...e,...t])]:Ne(Object.create(null),Ui(e),Ui(t??{})):t}function kr(e,t){if(!e)return t;if(!t)return e;const s=Ne(Object.create(null),e);for(const a in t)s[a]=_e(e[a],t[a]);return s}function xo(){return{app:null,config:{isNativeTag:Vn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let xr=0;function wr(e,t){return function(a,n=null){re(a)||(a=Ne({},a)),n!=null&&!be(n)&&(n=null);const i=xo(),l=new WeakSet,c=[];let u=!1;const f=i.app={_uid:xr++,_component:a,_props:n,_container:null,_context:i,_instance:null,version:ed,get config(){return i.config},set config(p){},use(p,...h){return l.has(p)||(p&&re(p.install)?(l.add(p),p.install(f,...h)):re(p)&&(l.add(p),p(f,...h))),f},mixin(p){return i.mixins.includes(p)||i.mixins.push(p),f},component(p,h){return h?(i.components[p]=h,f):i.components[p]},directive(p,h){return h?(i.directives[p]=h,f):i.directives[p]},mount(p,h,k){if(!u){const w=f._ceVNode||g(a,n);return w.appContext=i,k===!0?k="svg":k===!1&&(k=void 0),e(w,p,k),u=!0,f._container=p,p.__vue_app__=f,Pa(w.component)}},onUnmount(p){c.push(p)},unmount(){u&&(et(c,f._instance,16),e(null,f._container),delete f._container.__vue_app__)},provide(p,h){return i.provides[p]=h,f},runWithContext(p){const h=ds;ds=f;try{return p()}finally{ds=h}}};return f}}let ds=null;const Cr=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ue(t)}Modifiers`]||e[`${Dt(t)}Modifiers`];function Sr(e,t,...s){if(e.isUnmounted)return;const a=e.vnode.props||xe;let n=s;const i=t.startsWith("update:"),l=i&&Cr(a,t.slice(7));l&&(l.trim&&(n=s.map(p=>Ie(p)?p.trim():p)),l.number&&(n=s.map(wa)));let c,u=a[c=Da(t)]||a[c=Da(Ue(t))];!u&&i&&(u=a[c=Da(Dt(t))]),u&&et(u,e,6,n);const f=a[c+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,et(f,e,6,n)}}const Ir=new WeakMap;function wo(e,t,s=!1){const a=s?Ir:t.emitsCache,n=a.get(e);if(n!==void 0)return n;const i=e.emits;let l={},c=!1;if(!re(e)){const u=f=>{const p=wo(f,t,!0);p&&(c=!0,Ne(l,p))};!s&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!i&&!c?(be(e)&&a.set(e,null),null):(te(i)?i.forEach(u=>l[u]=null):Ne(l,i),be(e)&&a.set(e,l),l)}function Ma(e,t){return!e||!ba(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),he(e,t[0].toLowerCase()+t.slice(1))||he(e,Dt(t))||he(e,t))}function Ki(e){const{type:t,vnode:s,proxy:a,withProxy:n,propsOptions:[i],slots:l,attrs:c,emit:u,render:f,renderCache:p,props:h,data:k,setupState:w,ctx:m,inheritAttrs:$}=e,_=na(e);let T,P;try{if(s.shapeFlag&4){const F=n||a,le=F;T=gt(f.call(le,F,p,h,w,k,m)),P=c}else{const F=t;T=gt(F.length>1?F(h,{attrs:c,slots:l,emit:u}):F(h,null)),P=t.props?c:Ar(c)}}catch(F){St.length=0,Aa(F,e,1),T=g(Re)}let j=T;if(P&&$!==!1){const F=Object.keys(P),{shapeFlag:le}=j;F.length&&le&7&&(i&&F.some(ya)&&(P=zr(P,i)),j=Et(j,P,!1,!0))}if(s.dirs&&(j=Et(j,null,!1,!0),j.dirs=j.dirs?j.dirs.concat(s.dirs):s.dirs),s.transition){const F=za(j.type)&&oa(j)||j;Kt(F,s.transition)}return T=j,na(_),T}const Ar=e=>{let t;for(const s in e)(s==="class"||s==="style"||ba(s))&&((t||(t={}))[s]=e[s]);return t},zr=(e,t)=>{const s={};for(const a in e)(!ya(a)||!(a.slice(9)in t))&&(s[a]=e[a]);return s};function Tr(e,t,s){const{props:a,children:n,component:i}=e,{props:l,children:c,patchFlag:u}=t,f=i.emitsOptions;if(t.dirs||t.transition)return!0;if(s&&u>=0){if(u&1024)return!0;if(u&16)return a?Ji(a,l,f):!!l;if(u&8){const p=t.dynamicProps;for(let h=0;h<p.length;h++){const k=p[h];if(Co(l,a,k)&&!Ma(f,k))return!0}}}else return(n||c)&&(!c||!c.$stable)?!0:a===l?!1:a?l?Ji(a,l,f):!0:!!l;return!1}function Ji(e,t,s){const a=Object.keys(t);if(a.length!==Object.keys(e).length)return!0;for(let n=0;n<a.length;n++){const i=a[n];if(Co(t,e,i)&&!Ma(s,i))return!0}return!1}function Co(e,t,s){const a=e[s],n=t[s];return s==="style"&&be(a)&&be(n)?!Hs(a,n):a!==n}function Vr({vnode:e,parent:t,suspense:s},a){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=a,e=n),n===e)(e=t.vnode).el=a,t=t.parent;else break}s&&s.activeBranch===e&&(s.vnode.el=a)}const So={},Io=()=>Object.create(So),Ao=e=>Object.getPrototypeOf(e)===So;function Mr(e,t,s,a=!1){const n={},i=Io();e.propsDefaults=Object.create(null),zo(e,t,n,i);for(const l in e.propsOptions[0])l in n||(n[l]=void 0);s?e.props=a?n:Rl(n):e.type.props?e.props=n:e.props=i,e.attrs=i}function Nr(e,t,s,a){const{props:n,attrs:i,vnode:{patchFlag:l}}=e,c=me(n),[u]=e.propsOptions;let f=!1;if((a||l>0)&&!(l&16)){if(l&8){const p=e.vnode.dynamicProps;for(let h=0;h<p.length;h++){let k=p[h];if(Ma(e.emitsOptions,k))continue;const w=t[k];if(u)if(he(i,k))w!==i[k]&&(i[k]=w,f=!0);else{const m=Ue(k);n[m]=ni(u,c,m,w,e,!1)}else w!==i[k]&&(i[k]=w,f=!0)}}}else{zo(e,t,n,i)&&(f=!0);let p;for(const h in c)(!t||!he(t,h)&&((p=Dt(h))===h||!he(t,p)))&&(u?s&&(s[h]!==void 0||s[p]!==void 0)&&(n[h]=ni(u,c,h,void 0,e,!0)):delete n[h]);if(i!==c)for(const h in i)(!t||!he(t,h))&&(delete i[h],f=!0)}f&&xt(e.attrs,"set","")}function zo(e,t,s,a){const[n,i]=e.propsOptions;let l=!1,c;if(t)for(let u in t){if(Ss(u))continue;const f=t[u];let p;n&&he(n,p=Ue(u))?!i||!i.includes(p)?s[p]=f:(c||(c={}))[p]=f:Ma(e.emitsOptions,u)||(!(u in a)||f!==a[u])&&(a[u]=f,l=!0)}if(i){const u=me(s),f=c||xe;for(let p=0;p<i.length;p++){const h=i[p];s[h]=ni(n,u,h,f[h],e,!he(f,h))}}return l}function ni(e,t,s,a,n,i){const l=e[s];if(l!=null){const c=he(l,"default");if(c&&a===void 0){const u=l.default;if(l.type!==Function&&!l.skipFactory&&re(u)){const{propsDefaults:f}=n;if(s in f)a=f[s];else{const p=Gs(n);a=f[s]=u.call(null,t),p()}}else a=u;n.ce&&n.ce._setProp(s,a)}l[0]&&(i&&!c?a=!1:l[1]&&(a===""||a===Dt(s))&&(a=!0))}return a}const Pr=new WeakMap;function To(e,t,s=!1){const a=s?Pr:t.propsCache,n=a.get(e);if(n)return n;const i=e.props,l={},c=[];let u=!1;if(!re(e)){const p=h=>{u=!0;const[k,w]=To(h,t,!0);Ne(l,k),w&&c.push(...w)};!s&&t.mixins.length&&t.mixins.forEach(p),e.extends&&p(e.extends),e.mixins&&e.mixins.forEach(p)}if(!i&&!u)return be(e)&&a.set(e,is),is;if(te(i))for(let p=0;p<i.length;p++){const h=Ue(i[p]);Yi(h)&&(l[h]=xe)}else if(i)for(const p in i){const h=Ue(p);if(Yi(h)){const k=i[p],w=l[h]=te(k)||re(k)?{type:k}:Ne({},k),m=w.type;let $=!1,_=!0;if(te(m))for(let T=0;T<m.length;++T){const P=m[T],j=re(P)&&P.name;if(j==="Boolean"){$=!0;break}else j==="String"&&(_=!1)}else $=re(m)&&m.name==="Boolean";w[0]=$,w[1]=_,($||he(w,"default"))&&c.push(h)}}const f=[l,c];return be(e)&&a.set(e,f),f}function Yi(e){return e[0]!=="$"&&!Ss(e)}const xi=e=>e==="_"||e==="_ctx"||e==="$stable",wi=e=>te(e)?e.map(gt):[gt(e)],Lr=(e,t,s)=>{if(t._n)return t;const a=A((...n)=>wi(t(...n)),s);return a._c=!1,a},Vo=(e,t,s)=>{const a=e._ctx;for(const n in e){if(xi(n))continue;const i=e[n];if(re(i))t[n]=Lr(n,i,a);else if(i!=null){const l=wi(i);t[n]=()=>l}}},Mo=(e,t)=>{const s=wi(t);e.slots.default=()=>s},No=(e,t,s)=>{for(const a in t)(s||!xi(a))&&(e[a]=t[a])},Er=(e,t,s)=>{const a=e.slots=Io();if(e.vnode.shapeFlag&32){const n=t._;n?(No(a,t,s),s&&Ln(a,"_",n,!0)):Vo(t,a)}else t&&Mo(e,t)},Dr=(e,t,s)=>{const{vnode:a,slots:n}=e;let i=!0,l=xe;if(a.shapeFlag&32){const c=t._;c?s&&c===1?i=!1:No(n,t,s):(i=!t.$stable,Vo(t,n)),l=t}else t&&(Mo(e,t),l={default:1});if(i)for(const c in n)!xi(c)&&l[c]==null&&delete n[c]},je=_r;function Br(e){return Rr(e)}function Rr(e,t){const s=Ca();s.__VUE__=!0;const{insert:a,remove:n,patchProp:i,createElement:l,createText:c,createComment:u,setText:f,setElementText:p,parentNode:h,nextSibling:k,setScopeId:w=bt,insertStaticContent:m}=e,$=(b,x,I,L=null,N=null,V=null,G=void 0,q=null,H=!!x.dynamicChildren)=>{if(b===x)return;b&&!Ht(b,x)&&(L=De(b),C(b,N,V,!0),b=null),x.patchFlag===-2&&(H=!1,x.dynamicChildren=null);const{type:M,ref:se,shapeFlag:K}=x;switch(M){case Na:_(b,x,I,L);break;case Re:T(b,x,I,L);break;case ea:b==null&&P(x,I,L,G);break;case Y:J(b,x,I,L,N,V,G,q,H);break;default:K&1?le(b,x,I,L,N,V,G,q,H):K&6?ge(b,x,I,L,N,V,G,q,H):(K&64||K&128)&&M.process(b,x,I,L,N,V,G,q,H,vs)}se!=null&&N?Ts(se,b&&b.ref,V,x||b,!x):se==null&&b&&b.ref!=null&&Ts(b.ref,null,V,b,!0)},_=(b,x,I,L)=>{if(b==null)a(x.el=c(x.children),I,L);else{const N=x.el=b.el;x.children!==b.children&&f(N,x.children)}},T=(b,x,I,L)=>{b==null?a(x.el=u(x.children||""),I,L):x.el=b.el},P=(b,x,I,L)=>{[b.el,b.anchor]=m(b.children,x,I,L,b.el,b.anchor)},j=({el:b,anchor:x},I,L)=>{let N;for(;b&&b!==x;)N=k(b),a(b,I,L),b=N;a(x,I,L)},F=({el:b,anchor:x})=>{let I;for(;b&&b!==x;)I=k(b),n(b),b=I;n(x)},le=(b,x,I,L,N,V,G,q,H)=>{if(x.type==="svg"?G="svg":x.type==="math"&&(G="mathml"),b==null)de(x,I,L,N,V,G,q,H);else{const M=b.el&&b.el._isVueCE?b.el:null;try{M&&M._beginPatch(),Q(b,x,N,V,G,q,H)}finally{M&&M._endPatch()}}},de=(b,x,I,L,N,V,G,q)=>{let H,M;const{props:se,shapeFlag:K,transition:X,dirs:ie}=b;if(H=b.el=l(b.type,V,se&&se.is,se),K&8?p(H,b.children):K&16&&pe(b.children,H,null,L,N,Ha(b,V),G,q),ie&&Rt(b,null,L,"created"),ae(H,b,b.scopeId,G,L),se){for(const ke in se)ke!=="value"&&!Ss(ke)&&i(H,ke,null,se[ke],V,L);"value"in se&&i(H,"value",null,se.value,V),(M=se.onVnodeBeforeMount)&&pt(M,L,b)}ie&&Rt(b,null,L,"beforeMount");const fe=Or(N,X);fe&&X.beforeEnter(H),a(H,x,I),((M=se&&se.onVnodeMounted)||fe||ie)&&je(()=>{try{M&&pt(M,L,b),fe&&X.enter(H),ie&&Rt(b,null,L,"mounted")}finally{}},N)},ae=(b,x,I,L,N)=>{if(I&&w(b,I),L)for(let V=0;V<L.length;V++)w(b,L[V]);if(N){let V=N.subTree;if(x===V||Eo(V.type)&&(V.ssContent===x||V.ssFallback===x)){const G=N.vnode;ae(b,G,G.scopeId,G.slotScopeIds,N.parent)}}},pe=(b,x,I,L,N,V,G,q,H=0)=>{for(let M=H;M<b.length;M++){const se=b[M]=q?kt(b[M]):gt(b[M]);$(null,se,x,I,L,N,V,G,q)}},Q=(b,x,I,L,N,V,G)=>{const q=x.el=b.el;let{patchFlag:H,dynamicChildren:M,dirs:se}=x;H|=b.patchFlag&16;const K=b.props||xe,X=x.props||xe;let ie;if(I&&Ot(I,!1),(ie=X.onVnodeBeforeUpdate)&&pt(ie,I,x,b),se&&Rt(x,b,I,"beforeUpdate"),I&&Ot(I,!0),M&&(!b.dynamicChildren||b.dynamicChildren.length!==M.length)&&(H=0,G=!1,M=null),(K.innerHTML&&X.innerHTML==null||K.textContent&&X.textContent==null)&&p(q,""),M?ee(b.dynamicChildren,M,q,I,L,Ha(x,N),V):G||ye(b,x,q,null,I,L,Ha(x,N),V,!1),H>0){if(H&16)ce(q,K,X,I,N);else if(H&2&&K.class!==X.class&&i(q,"class",null,X.class,N),H&4&&i(q,"style",K.style,X.style,N),H&8){const fe=x.dynamicProps;for(let ke=0;ke<fe.length;ke++){const $e=fe[ke],Me=K[$e],Pe=X[$e];(Pe!==Me||$e==="value")&&i(q,$e,Me,Pe,N,I)}}H&1&&b.children!==x.children&&p(q,x.children)}else!G&&M==null&&ce(q,K,X,I,N);((ie=X.onVnodeUpdated)||se)&&je(()=>{ie&&pt(ie,I,x,b),se&&Rt(x,b,I,"updated")},L)},ee=(b,x,I,L,N,V,G)=>{for(let q=0;q<x.length;q++){const H=b[q],M=x[q],se=H.el&&(H.type===Y||!Ht(H,M)||H.shapeFlag&198)?h(H.el):I;$(H,M,se,null,L,N,V,G,!0)}},ce=(b,x,I,L,N)=>{if(x!==I){if(x!==xe)for(const V in x)!Ss(V)&&!(V in I)&&i(b,V,x[V],null,N,L);for(const V in I){if(Ss(V))continue;const G=I[V],q=x[V];G!==q&&V!=="value"&&i(b,V,q,G,N,L)}"value"in I&&i(b,"value",x.value,I.value,N)}},J=(b,x,I,L,N,V,G,q,H)=>{const M=x.el=b?b.el:c(""),se=x.anchor=b?b.anchor:c("");let{patchFlag:K,dynamicChildren:X,slotScopeIds:ie}=x;ie&&(q=q?q.concat(ie):ie),b==null?(a(M,I,L),a(se,I,L),pe(x.children||[],I,se,N,V,G,q,H)):K>0&&K&64&&X&&b.dynamicChildren&&b.dynamicChildren.length===X.length?(ee(b.dynamicChildren,X,I,N,V,G,q),(x.key!=null||N&&x===N.subTree)&&Ci(b,x,!0)):ye(b,x,I,se,N,V,G,q,H)},ge=(b,x,I,L,N,V,G,q,H)=>{x.slotScopeIds=q,b==null?x.shapeFlag&512?N.ctx.activate(x,I,L,G,H):Ae(x,I,L,N,V,G,H):We(b,x,H)},Ae=(b,x,I,L,N,V,G)=>{const q=b.component=Wr(b,L,N);if(Ta(b)&&(q.ctx.renderer=vs),Kr(q,!1,G),q.asyncDep){if(N&&N.registerDep(q,Te,G),!b.el){const H=q.subTree=g(Re);T(null,H,x,I),b.placeholder=H.el}}else Te(q,b,x,I,N,V,G)},We=(b,x,I)=>{const L=x.component=b.component;if(Tr(b,x,I))if(L.asyncDep&&!L.asyncResolved){v(L,x,I);return}else L.next=x,L.update();else x.el=b.el,L.vnode=x},Te=(b,x,I,L,N,V,G)=>{const q=()=>{if(b.isMounted){let{next:K,bu:X,u:ie,parent:fe,vnode:ke}=b;{const ct=Po(b);if(ct){K&&(K.el=ke.el,v(b,K,G)),ct.asyncDep.then(()=>{je(()=>{b.isUnmounted||M()},N)});return}}let $e=K,Me;Ot(b,!1),K?(K.el=ke.el,v(b,K,G)):K=ke,X&&Xs(X),(Me=K.props&&K.props.onVnodeBeforeUpdate)&&pt(Me,fe,K,ke),Ot(b,!0);const Pe=Ki(b),dt=b.subTree;b.subTree=Pe,$(dt,Pe,h(dt.el),De(dt),b,N,V),K.el=Pe.el,$e===null&&Vr(b,Pe.el),ie&&je(ie,N),(Me=K.props&&K.props.onVnodeUpdated)&&je(()=>pt(Me,fe,K,ke),N)}else{let K;const{el:X,props:ie}=x,{bm:fe,m:ke,parent:$e,root:Me,type:Pe}=b,dt=rs(x);Ot(b,!1),fe&&Xs(fe),!dt&&(K=ie&&ie.onVnodeBeforeMount)&&pt(K,$e,x),Ot(b,!0);{Me.ce&&Me.ce._hasShadowRoot()&&Me.ce._injectChildStyle(Pe,b.parent?b.parent.type:void 0);const ct=b.subTree=Ki(b);$(null,ct,I,L,b,N,V),x.el=ct.el}if(ke&&je(ke,N),!dt&&(K=ie&&ie.onVnodeMounted)){const ct=x;je(()=>pt(K,$e,ct),N)}(x.shapeFlag&256||$e&&rs($e.vnode)&&$e.vnode.shapeFlag&256)&&b.a&&je(b.a,N),b.isMounted=!0,x=I=L=null}};b.scope.on();const H=b.effect=new Rn(q);b.scope.off();const M=b.update=H.run.bind(H),se=b.job=H.runIfDirty.bind(H);se.i=b,se.id=b.uid,H.scheduler=()=>$i(se),Ot(b,!0),M()},v=(b,x,I)=>{x.component=b;const L=b.vnode.props;b.vnode=x,b.next=null,Nr(b,x.props,L,I),Dr(b,x.children,I),It(),Ri(b),At()},ye=(b,x,I,L,N,V,G,q,H=!1)=>{const M=b&&b.children,se=b?b.shapeFlag:0,K=x.children,{patchFlag:X,shapeFlag:ie}=x;if(X>0){if(X&128){es(M,K,I,L,N,V,G,q,H);return}else if(X&256){rt(M,K,I,L,N,V,G,q,H);return}}ie&8?(se&16&&Ve(M,N,V),K!==M&&p(I,K)):se&16?ie&16?es(M,K,I,L,N,V,G,q,H):Ve(M,N,V,!0):(se&8&&p(I,""),ie&16&&pe(K,I,L,N,V,G,q,H))},rt=(b,x,I,L,N,V,G,q,H)=>{b=b||is,x=x||is;const M=b.length,se=x.length,K=Math.min(M,se);let X;for(X=0;X<K;X++){const ie=x[X]=H?kt(x[X]):gt(x[X]);$(b[X],ie,I,null,N,V,G,q,H)}M>se?Ve(b,N,V,!0,!1,K):pe(x,I,L,N,V,G,q,H,K)},es=(b,x,I,L,N,V,G,q,H)=>{let M=0;const se=x.length;let K=b.length-1,X=se-1;for(;M<=K&&M<=X;){const ie=b[M],fe=x[M]=H?kt(x[M]):gt(x[M]);if(Ht(ie,fe))$(ie,fe,I,null,N,V,G,q,H);else break;M++}for(;M<=K&&M<=X;){const ie=b[K],fe=x[X]=H?kt(x[X]):gt(x[X]);if(Ht(ie,fe))$(ie,fe,I,null,N,V,G,q,H);else break;K--,X--}if(M>K){if(M<=X){const ie=X+1,fe=ie<se?x[ie].el:L;for(;M<=X;)$(null,x[M]=H?kt(x[M]):gt(x[M]),I,fe,N,V,G,q,H),M++}}else if(M>X)for(;M<=K;)C(b[M],N,V,!0),M++;else{const ie=M,fe=M,ke=new Map;for(M=fe;M<=X;M++){const Ke=x[M]=H?kt(x[M]):gt(x[M]);Ke.key!=null&&ke.set(Ke.key,M)}let $e,Me=0;const Pe=X-fe+1;let dt=!1,ct=0;const gs=new Array(Pe);for(M=0;M<Pe;M++)gs[M]=0;for(M=ie;M<=K;M++){const Ke=b[M];if(Me>=Pe){C(Ke,N,V,!0);continue}let ut;if(Ke.key!=null)ut=ke.get(Ke.key);else for($e=fe;$e<=X;$e++)if(gs[$e-fe]===0&&Ht(Ke,x[$e])){ut=$e;break}ut===void 0?C(Ke,N,V,!0):(gs[ut-fe]=M+1,ut>=ct?ct=ut:dt=!0,$(Ke,x[ut],I,null,N,V,G,q,H),Me++)}const Mi=dt?Fr(gs):is;for($e=Mi.length-1,M=Pe-1;M>=0;M--){const Ke=fe+M,ut=x[Ke],Ni=x[Ke+1],Pi=Ke+1<se?Ni.el||Lo(Ni):L;gs[M]===0?$(null,ut,I,Pi,N,V,G,q,H):dt&&($e<0||M!==Mi[$e]?ve(ut,I,Pi,2):$e--)}}},ve=(b,x,I,L,N=null)=>{const{el:V,type:G,transition:q,children:H,shapeFlag:M}=b;if(M&6){ve(b.component.subTree,x,I,L);return}if(M&128){b.suspense.move(x,I,L);return}if(M&64){G.move(b,x,I,vs);return}if(G===Y){a(V,x,I);for(let K=0;K<H.length;K++)ve(H[K],x,I,L);a(b.anchor,x,I);return}if(G===ea){j(b,x,I);return}if(L!==2&&M&1&&q)if(L===0)q.persisted&&!V[Ze]?a(V,x,I):(q.beforeEnter(V),a(V,x,I),je(()=>q.enter(V),N));else{const{leave:K,delayLeave:X,afterLeave:ie}=q,fe=()=>{b.ctx.isUnmounted?n(V):a(V,x,I)},ke=()=>{const $e=V._isLeaving||!!V[Ze];V._isLeaving&&V[Ze](!0),q.persisted&&!$e?fe():K(V,()=>{fe(),ie&&ie()})};X?X(V,fe,ke):ke()}else a(V,x,I)},C=(b,x,I,L=!1,N=!1)=>{const{type:V,props:G,ref:q,children:H,dynamicChildren:M,shapeFlag:se,patchFlag:K,dirs:X,cacheIndex:ie,memo:fe}=b;if(K===-2&&(N=!1),q!=null&&(It(),Ts(q,null,I,b,!0),At()),ie!=null&&(x.renderCache[ie]=void 0),se&256){x.ctx.deactivate(b);return}const ke=se&1&&X,$e=!rs(b);let Me;if($e&&(Me=G&&G.onVnodeBeforeUnmount)&&pt(Me,x,b),se&6)U(b.component,I,L);else{if(se&128){b.suspense.unmount(I,L);return}ke&&Rt(b,null,x,"beforeUnmount"),se&64?b.type.remove(b,x,I,vs,L):M&&!M.hasOnce&&(V!==Y||K>0&&K&64)?Ve(M,x,I,!1,!0):(V===Y&&K&384||!N&&se&16)&&Ve(H,x,I),L&&Bt(b)}const Pe=fe!=null&&ie==null;($e&&(Me=G&&G.onVnodeUnmounted)||ke||Pe)&&je(()=>{Me&&pt(Me,x,b),ke&&Rt(b,null,x,"unmounted"),Pe&&(b.el=null)},I)},Bt=b=>{const{type:x,el:I,anchor:L,transition:N}=b;if(x===Y){ms(I,L);return}if(x===ea){F(b);return}const V=()=>{n(I),N&&!N.persisted&&N.afterLeave&&N.afterLeave()};if(b.shapeFlag&1&&N&&!N.persisted){const{leave:G,delayLeave:q}=N,H=()=>G(I,V);q?q(b.el,V,H):H()}else V()},ms=(b,x)=>{let I;for(;b!==x;)I=k(b),n(b),b=I;n(x)},U=(b,x,I)=>{const{bum:L,scope:N,job:V,subTree:G,um:q,m:H,a:M}=b;Qi(H),Qi(M),L&&Xs(L),N.stop(),V&&(V.flags|=8,C(G,b,x,I)),q&&je(q,x),je(()=>{b.isUnmounted=!0},x)},Ve=(b,x,I,L=!1,N=!1,V=0)=>{for(let G=V;G<b.length;G++)C(b[G],x,I,L,N)},De=b=>{if(b.shapeFlag&6)return De(b.component.subTree);if(b.shapeFlag&128)return b.suspense.next();const x=k(b.anchor||b.el),I=x&&x[oo];return I?k(I):x};let Ea=!1;const Vi=(b,x,I)=>{let L;b==null?x._vnode&&(C(x._vnode,null,null,!0),L=x._vnode.component):$(x._vnode||null,b,x,null,null,null,I),x._vnode=b,Ea||(Ea=!0,Ri(L),to(),Ea=!1)},vs={p:$,um:C,m:ve,r:Bt,mt:Ae,mc:pe,pc:ye,pbc:ee,n:De,o:e};return{render:Vi,hydrate:void 0,createApp:wr(Vi)}}function Ha({type:e,props:t},s){return s==="svg"&&e==="foreignObject"||s==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:s}function Ot({effect:e,job:t},s){s?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Or(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Ci(e,t,s=!1){const a=e.children,n=t.children;if(te(a)&&te(n))for(let i=0;i<a.length;i++){const l=a[i];let c=n[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=n[i]=kt(n[i]),c.el=l.el),!s&&c.patchFlag!==-2&&Ci(l,c)),c.type===Na&&(c.patchFlag===-1&&(c=n[i]=kt(c)),c.el=l.el),c.type===Re&&!c.el&&(c.el=l.el)}}function Fr(e){const t=e.slice(),s=[0];let a,n,i,l,c;const u=e.length;for(a=0;a<u;a++){const f=e[a];if(f!==0){if(n=s[s.length-1],e[n]<f){t[a]=n,s.push(a);continue}for(i=0,l=s.length-1;i<l;)c=i+l>>1,e[s[c]]<f?i=c+1:l=c;f<e[s[i]]&&(i>0&&(t[a]=s[i-1]),s[i]=a)}}for(i=s.length,l=s[i-1];i-- >0;)s[i]=l,l=t[l];return s}function Po(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Po(t)}function Qi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Lo(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Lo(t.subTree):null}const Eo=e=>e.__isSuspense;function _r(e,t){t&&t.pendingBranch?te(e)?t.effects.push(...e):t.effects.push(e):Jl(e)}const Y=Symbol.for("v-fgt"),Na=Symbol.for("v-txt"),Re=Symbol.for("v-cmt"),ea=Symbol.for("v-stc"),St=[];let Ye=null;function r(e=!1){St.push(Ye=e?null:[])}function Si(){St.pop(),Ye=St[St.length-1]||null}let Bs=1;function da(e,t=!1){Bs+=e,e<0&&Ye&&t&&(Ye.hasOnce=!0)}function Do(e){return e.dynamicChildren=Bs>0?Ye||is:null,Si(),Bs>0&&Ye&&Ye.push(e),e}function d(e,t,s,a,n,i){return Do(o(e,t,s,a,n,i,!0))}function O(e,t,s,a,n){return Do(g(e,t,s,a,n,!0))}function Rs(e){return e?e.__v_isVNode===!0:!1}function Ht(e,t){return e.type===t.type&&e.key===t.key}const Bo=({key:e})=>e??null,ta=({ref:e,ref_key:t,ref_for:s})=>(typeof e=="number"&&(e=""+e),e!=null?Ie(e)||Fe(e)||re(e)?{i:Ee,r:e,k:t,f:!!s}:e:null);function o(e,t=null,s=null,a=0,n=null,i=e===Y?0:1,l=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Bo(t),ref:t&&ta(t),scopeId:ao,slotScopeIds:null,children:s,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:a,dynamicProps:n,dynamicChildren:null,appContext:null,ctx:Ee};return c?(ca(u,s),i&128&&e.normalize(u)):s&&(u.shapeFlag|=Ie(s)?8:16),Bs>0&&!l&&Ye&&(u.patchFlag>0||i&6)&&u.patchFlag!==32&&Ye.push(u),u}const g=jr;function jr(e,t=null,s=null,a=0,n=null,i=!1){if((!e||e===ho)&&(e=Re),Rs(e)){const c=Et(e,t,!0);return s&&ca(c,s),Bs>0&&!i&&Ye&&(c.shapeFlag&6?Ye[Ye.indexOf(e)]=c:Ye.push(c)),c.patchFlag=-2,c}if(Xr(e)&&(e=e.__vccOpts),t){t=Hr(t);let{class:c,style:u}=t;c&&!Ie(c)&&(t.class=E(c)),be(u)&&(yi(u)&&!te(u)&&(u=Ne({},u)),t.style=ze(u))}const l=Ie(e)?1:Eo(e)?128:za(e)?64:be(e)?4:re(e)?2:0;return o(e,t,s,a,n,l,i,!0)}function Hr(e){return e?yi(e)||Ao(e)?Ne({},e):e:null}function Et(e,t,s=!1,a=!1){const{props:n,ref:i,patchFlag:l,children:c,transition:u}=e,f=t?Ur(n||{},t):n,p={__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Bo(f),ref:t&&t.ref?s&&i?te(i)?i.concat(ta(t)):[i,ta(t)]:ta(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Y?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Et(e.ssContent),ssFallback:e.ssFallback&&Et(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&a&&Kt(p,u.clone(p)),p}function z(e=" ",t=0){return g(Na,null,e,t)}function Ge(e,t){const s=g(ea,null,e);return s.staticCount=t,s}function S(e="",t=!1){return t?(r(),O(Re,null,e)):g(Re,null,e)}function gt(e){return e==null||typeof e=="boolean"?g(Re):te(e)?g(Y,null,e.slice()):Rs(e)?kt(e):g(Na,null,String(e))}function kt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Et(e)}function ca(e,t){let s=0;const{shapeFlag:a}=e;if(t==null)t=null;else if(te(t))s=16;else if(typeof t=="object")if(a&65){const n=t.default;n&&(n._c&&(n._d=!1),ca(e,n()),n._c&&(n._d=!0));return}else{s=32;const n=t._;!n&&!Ao(t)?t._ctx=Ee:n===3&&Ee&&(Ee.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(re(t)){if(a&65){ca(e,{default:t});return}t={default:t,_ctx:Ee},s=32}else t=String(t),a&64?(s=16,t=[z(t)]):s=8;e.children=t,e.shapeFlag|=s}function Ur(...e){const t={};for(let s=0;s<e.length;s++){const a=e[s];for(const n in a)if(n==="class")t.class!==a.class&&(t.class=E([t.class,a.class]));else if(n==="style")t.style=ze([t.style,a.style]);else if(ba(n)){const i=t[n],l=a[n];l&&i!==l&&!(te(i)&&i.includes(l))?t[n]=i?[].concat(i,l):l:l==null&&i==null&&!ya(n)&&(t[n]=l)}else n!==""&&(t[n]=a[n])}return t}function pt(e,t,s,a=null){et(e,t,7,[s,a])}const qr=xo();let Gr=0;function Wr(e,t,s){const a=e.type,n=(t?t.appContext:e.appContext)||qr,i={uid:Gr++,vnode:e,type:a,parent:t,appContext:n,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new yl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(n.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:To(a,n),emitsOptions:wo(a,n),emit:null,emitted:null,propsDefaults:xe,inheritAttrs:a.inheritAttrs,ctx:xe,data:xe,props:xe,attrs:xe,slots:xe,refs:xe,setupState:xe,setupContext:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=Sr.bind(null,i),e.ce&&e.ce(i),i}let Oe=null;const Ii=()=>Oe||Ee;let ua,Os;{const e=Ca(),t=(s,a)=>{let n;return(n=e[s])||(n=e[s]=[]),n.push(a),i=>{n.length>1?n.forEach(l=>l(i)):n[0](i)}};ua=t("__VUE_INSTANCE_SETTERS__",s=>Oe=s),Os=t("__VUE_SSR_SETTERS__",s=>Fs=s)}const Gs=e=>{const t=Oe;return ua(e),e.scope.on(),()=>{e.scope.off(),ua(t)}},Zi=()=>{Oe&&Oe.scope.off(),ua(null)};function Ro(e){return e.vnode.shapeFlag&4}let Fs=!1;function Kr(e,t=!1,s=!1){t&&Os(t);const{props:a,children:n}=e.vnode,i=Ro(e);Mr(e,a,i,t),Er(e,n,s||t);const l=i?Jr(e,t):void 0;return t&&Os(!1),l}function Jr(e,t){const s=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,gr);const{setup:a}=s;if(a){It();const n=e.setupContext=a.length>1?Qr(e):null,i=Gs(e),l=Us(a,e,0,[e.props,n]),c=Mn(l);if(At(),i(),(c||e.sp)&&!rs(e)&&fo(e),c){if(l.then(Zi,Zi),t)return l.then(u=>{Os(!0);try{Xi(e,u,t)}finally{Os(!1)}}).catch(u=>{Aa(u,e,0)});e.asyncDep=l}else Xi(e,l)}else Oo(e)}function Xi(e,t,s){re(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:be(t)&&(e.setupState=Zn(t)),Oo(e)}function Oo(e,t,s){const a=e.type;e.render||(e.render=a.render||bt);{const n=Gs(e);It();try{hr(e)}finally{At(),n()}}}const Yr={get(e,t){return Be(e,"get",""),e[t]}};function Qr(e){const t=s=>{e.exposed=s||{}};return{attrs:new Proxy(e.attrs,Yr),slots:e.slots,emit:e.emit,expose:t}}function Pa(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Zn(Ol(e.exposed)),{get(t,s){if(s in t)return t[s];if(s in Vs)return Vs[s](e)},has(t,s){return s in t||s in Vs}})):e.proxy}function Zr(e,t=!0){return re(e)?e.displayName||e.name:e.name||t&&e.__name}function Xr(e){return re(e)&&"__vccOpts"in e}const Z=(e,t)=>Ul(e,t,Fs);function pa(e,t,s){try{da(-1);const a=arguments.length;return a===2?be(t)&&!te(t)?Rs(t)?g(e,null,[t]):g(e,t):g(e,null,t):(a>3?s=Array.prototype.slice.call(arguments,2):a===3&&Rs(s)&&(s=[s]),g(e,t,s))}finally{da(1)}}const ed="3.5.41";/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let oi;const en=typeof window<"u"&&window.trustedTypes;if(en)try{oi=en.createPolicy("vue",{createHTML:e=>e})}catch{}const Fo=oi?e=>oi.createHTML(e):e=>e,td="http://www.w3.org/2000/svg",sd="http://www.w3.org/1998/Math/MathML",$t=typeof document<"u"?document:null,tn=$t&&$t.createElement("template"),ad={insert:(e,t,s)=>{t.insertBefore(e,s||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,s,a)=>{const n=t==="svg"?$t.createElementNS(td,e):t==="mathml"?$t.createElementNS(sd,e):s?$t.createElement(e,{is:s}):$t.createElement(e);return e==="select"&&a&&a.multiple!=null&&n.setAttribute("multiple",a.multiple),n},createText:e=>$t.createTextNode(e),createComment:e=>$t.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>$t.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,s,a,n,i){const l=s?s.previousSibling:t.lastChild;if(n&&(n===i||n.nextSibling))for(;t.insertBefore(n.cloneNode(!0),s),!(n===i||!(n=n.nextSibling)););else{tn.innerHTML=Fo(a==="svg"?`<svg>${e}</svg>`:a==="mathml"?`<math>${e}</math>`:e);const c=tn.content;if(a==="svg"||a==="mathml"){const u=c.firstChild;for(;u.firstChild;)c.appendChild(u.firstChild);c.removeChild(u)}t.insertBefore(c,s)}return[l?l.nextSibling:t.firstChild,s?s.previousSibling:t.lastChild]}},Vt="transition",ys="animation",us=Symbol("_vtc"),_o={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},jo=Ne({},ro,_o),id=e=>(e.displayName="Transition",e.props=jo,e),qe=id((e,{slots:t})=>pa(ir,Ho(e),t)),Ft=(e,t=[])=>{te(e)?e.forEach(s=>s(...t)):e&&e(...t)},sn=e=>e?te(e)?e.some(t=>t.length>1):e.length>1:!1;function Ho(e){const t={};for(const J in e)J in _o||(t[J]=e[J]);if(e.css===!1)return t;const{name:s="v",type:a,duration:n,enterFromClass:i=`${s}-enter-from`,enterActiveClass:l=`${s}-enter-active`,enterToClass:c=`${s}-enter-to`,appearFromClass:u=i,appearActiveClass:f=l,appearToClass:p=c,leaveFromClass:h=`${s}-leave-from`,leaveActiveClass:k=`${s}-leave-active`,leaveToClass:w=`${s}-leave-to`}=e,m=nd(n),$=m&&m[0],_=m&&m[1],{onBeforeEnter:T,onEnter:P,onEnterCancelled:j,onLeave:F,onLeaveCancelled:le,onBeforeAppear:de=T,onAppear:ae=P,onAppearCancelled:pe=j}=t,Q=(J,ge,Ae,We)=>{J._enterCancelled=We,Nt(J,ge?p:c),Nt(J,ge?f:l),Ae&&Ae()},ee=(J,ge)=>{J._isLeaving=!1,Nt(J,h),Nt(J,w),Nt(J,k),ge&&ge()},ce=J=>(ge,Ae)=>{const We=J?ae:P,Te=()=>Q(ge,J,Ae);Ft(We,[ge,Te]),an(()=>{Nt(ge,J?u:i),ft(ge,J?p:c),sn(We)||nn(ge,a,$,Te)})};return Ne(t,{onBeforeEnter(J){Ft(T,[J]),ft(J,i),ft(J,l)},onBeforeAppear(J){Ft(de,[J]),ft(J,u),ft(J,f)},onEnter:ce(!1),onAppear:ce(!0),onLeave(J,ge){J._isLeaving=!0;const Ae=()=>ee(J,ge);ft(J,h),J._enterCancelled?(ft(J,k),li(J)):(li(J),ft(J,k)),an(()=>{J._isLeaving&&(Nt(J,h),ft(J,w),sn(F)||nn(J,a,_,Ae))}),Ft(F,[J,Ae])},onEnterCancelled(J){Q(J,!1,void 0,!0),Ft(j,[J])},onAppearCancelled(J){Q(J,!0,void 0,!0),Ft(pe,[J])},onLeaveCancelled(J){ee(J),Ft(le,[J])}})}function nd(e){if(e==null)return null;if(be(e))return[Ua(e.enter),Ua(e.leave)];{const t=Ua(e);return[t,t]}}function Ua(e){return cl(e)}function ft(e,t){t.split(/\s+/).forEach(s=>s&&e.classList.add(s)),(e[us]||(e[us]=new Set)).add(t)}function Nt(e,t){t.split(/\s+/).forEach(a=>a&&e.classList.remove(a));const s=e[us];s&&(s.delete(t),s.size||(e[us]=void 0))}function an(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let od=0;function nn(e,t,s,a){const n=e._endId=++od,i=()=>{n===e._endId&&a()};if(s!=null)return setTimeout(i,s);const{type:l,timeout:c,propCount:u}=Uo(e,t);if(!l)return a();const f=l+"end";let p=0;const h=()=>{e.removeEventListener(f,k),i()},k=w=>{w.target===e&&++p>=u&&h()};setTimeout(()=>{p<u&&h()},c+1),e.addEventListener(f,k)}function Uo(e,t){const s=window.getComputedStyle(e),a=m=>(s[m]||"").split(", "),n=a(`${Vt}Delay`),i=a(`${Vt}Duration`),l=on(n,i),c=a(`${ys}Delay`),u=a(`${ys}Duration`),f=on(c,u);let p=null,h=0,k=0;t===Vt?l>0&&(p=Vt,h=l,k=i.length):t===ys?f>0&&(p=ys,h=f,k=u.length):(h=Math.max(l,f),p=h>0?l>f?Vt:ys:null,k=p?p===Vt?i.length:u.length:0);const w=p===Vt&&/\b(?:transform|all)(?:,|$)/.test(a(`${Vt}Property`).toString());return{type:p,timeout:h,propCount:k,hasTransform:w}}function on(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((s,a)=>ln(s)+ln(e[a])))}function ln(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function li(e){return(e?e.ownerDocument:document).body.offsetHeight}function ld(e,t,s){const a=e[us];a&&(t=(t?[t,...a]:[...a]).join(" ")),t==null?e.removeAttribute("class"):s?e.setAttribute("class",t):e.className=t}const rn=Symbol("_vod"),qo=Symbol("_vsh"),rd=Symbol(""),dd=/(?:^|;)\s*display\s*:/;function cd(e,t,s){const a=e.style,n=Ie(s);let i=!1;if(s&&!n){if(t)if(Ie(t))for(const l of t.split(";")){const c=l.slice(0,l.indexOf(":")).trim();s[c]==null&&ws(a,c,"")}else for(const l in t)s[l]==null&&ws(a,l,"");for(const l in s){l==="display"&&(i=!0);const c=s[l];c!=null?pd(e,l,!Ie(t)&&t?t[l]:void 0,c)||ws(a,l,c):ws(a,l,"")}}else if(n){if(t!==s){const l=a[rd];l&&(s+=";"+l),a.cssText=s,i=dd.test(s)}}else t&&e.removeAttribute("style");rn in e&&(e[rn]=i?a.display:"",e[qo]&&(a.display="none"))}const dn=/\s*!important$/;function ws(e,t,s){if(te(s))s.forEach(a=>ws(e,t,a));else if(s==null&&(s=""),t.startsWith("--"))e.setProperty(t,s);else{const a=ud(e,t);dn.test(s)?e.setProperty(Dt(a),s.replace(dn,""),"important"):e[a]=s}}const cn=["Webkit","Moz","ms"],qa={};function ud(e,t){const s=qa[t];if(s)return s;let a=Ue(t);if(a!=="filter"&&a in e)return qa[t]=a;a=xa(a);for(let n=0;n<cn.length;n++){const i=cn[n]+a;if(i in e)return qa[t]=i}return t}function pd(e,t,s,a){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&Ie(a)&&s===a}const un="http://www.w3.org/1999/xlink";function pn(e,t,s,a,n,i=gl(t)){a&&t.startsWith("xlink:")?s==null?e.removeAttributeNS(un,t.slice(6,t.length)):e.setAttributeNS(un,t,s):s==null||i&&!En(s)?e.removeAttribute(t):e.setAttribute(t,i?"":ot(s)?String(s):s)}function fn(e,t,s,a,n){if(t==="innerHTML"||t==="textContent"){s!=null&&(e[t]=t==="innerHTML"?Fo(s):s);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?e.getAttribute("value")||"":e.value,u=s==null?e.type==="checkbox"?"on":"":String(s);(c!==u||!("_value"in e))&&(e.value=u),s==null&&e.removeAttribute(t),e._value=s;return}let l=!1;if(s===""||s==null){const c=typeof e[t];c==="boolean"?s=En(s):s==null&&c==="string"?(s="",l=!0):c==="number"&&(s=0,l=!0)}try{e[t]=s}catch{}l&&e.removeAttribute(n||t)}function Ut(e,t,s,a){e.addEventListener(t,s,a)}function fd(e,t,s,a){e.removeEventListener(t,s,a)}const mn=Symbol("_vei");function md(e,t,s,a,n=null){const i=e[mn]||(e[mn]={}),l=i[t];if(a&&l)l.value=a;else{const[c,u]=hd(t);if(a){const f=i[t]=$d(a,n);Ut(e,c,f,u)}else l&&(fd(e,c,l,u),i[t]=void 0)}}const vd=/(Once|Passive|Capture)$/,gd=/^on:?(?:Once|Passive|Capture)$/;function hd(e){let t,s;for(;(s=e.match(vd))&&!gd.test(e);)t||(t={}),e=e.slice(0,e.length-s[1].length),t[s[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Dt(e.slice(2)),t]}let Ga=0;const bd=Promise.resolve(),yd=()=>Ga||(bd.then(()=>Ga=0),Ga=Date.now());function $d(e,t){const s=a=>{if(!a._vts)a._vts=Date.now();else if(a._vts<=s.attached)return;const n=s.value;if(te(n)){const i=a.stopImmediatePropagation;a.stopImmediatePropagation=()=>{i.call(a),a._stopped=!0};const l=n.slice(),c=[a];for(let u=0;u<l.length&&!a._stopped;u++){const f=l[u];f&&et(f,t,5,c)}}else et(n,t,5,[a])};return s.value=e,s.attached=yd(),s}const vn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,kd=(e,t,s,a,n,i)=>{const l=n==="svg";t==="class"?ld(e,a,l):t==="style"?cd(e,s,a):ba(t)?ya(t)||md(e,t,s,a,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):xd(e,t,a,l))?(fn(e,t,a),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&pn(e,t,a,l,i,t!=="value")):e._isVueCE&&(wd(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ie(a)))?fn(e,Ue(t),a,i,t):(t==="true-value"?e._trueValue=a:t==="false-value"&&(e._falseValue=a),pn(e,t,a,l))};function xd(e,t,s,a){if(a)return!!(t==="innerHTML"||t==="textContent"||t in e&&vn(t)&&re(s));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const n=e.tagName;if(n==="IMG"||n==="VIDEO"||n==="CANVAS"||n==="SOURCE")return!1}return vn(t)&&Ie(s)?!1:t in e}function wd(e,t){const s=e._def.props;if(!s)return!1;const a=Ue(t);return Array.isArray(s)?s.some(n=>Ue(n)===a):Object.keys(s).some(n=>Ue(n)===a)}const Go=new WeakMap,Wo=new WeakMap,fa=Symbol("_moveCb"),gn=Symbol("_enterCb"),Cd=e=>(delete e.props.mode,e),Sd=Cd({name:"TransitionGroup",props:Ne({},jo,{tag:String,moveClass:String}),setup(e,{slots:t}){const s=Ii(),a=lo();let n,i;return vo(()=>{if(!n.length)return;const l=e.moveClass||`${e.name||"v"}-move`;if(!Vd(n[0].el,s.vnode.el,l)){n=[];return}n.forEach(Ad),n.forEach(zd);const c=n.filter(Td);li(s.vnode.el),c.forEach(u=>{const f=u.el,p=f.style;ft(f,l),p.transform=p.webkitTransform=p.transitionDuration="";const h=f[fa]=k=>{k&&k.target!==f||(!k||k.propertyName.endsWith("transform"))&&(f.removeEventListener("transitionend",h),f[fa]=null,Nt(f,l))};f.addEventListener("transitionend",h)}),n=[]}),()=>{const l=me(e),c=Ho(l);let u=l.tag||Y;if(n=[],i)for(let f=0;f<i.length;f++){const p=i[f];p.el&&p.el instanceof Element&&!p.el[qo]&&(n.push(p),Kt(p,Ds(p,c,a,s)),Go.set(p,Ko(p.el)))}i=t.default?ki(t.default()):[];for(let f=0;f<i.length;f++){const p=i[f];p.key!=null&&Kt(p,Ds(p,c,a,s))}return g(u,null,i)}}}),Id=Sd;function Ad(e){const t=e.el;t[fa]&&t[fa](),t[gn]&&t[gn]()}function zd(e){Wo.set(e,Ko(e.el))}function Td(e){const t=Go.get(e),s=Wo.get(e),a=t.left-s.left,n=t.top-s.top;if(a||n){const i=e.el,l=i.style,c=i.getBoundingClientRect();let u=1,f=1;return i.offsetWidth&&(u=c.width/i.offsetWidth),i.offsetHeight&&(f=c.height/i.offsetHeight),(!Number.isFinite(u)||u===0)&&(u=1),(!Number.isFinite(f)||f===0)&&(f=1),Math.abs(u-1)<.01&&(u=1),Math.abs(f-1)<.01&&(f=1),l.transform=l.webkitTransform=`translate(${a/u}px,${n/f}px)`,l.transitionDuration="0s",e}}function Ko(e){const t=e.getBoundingClientRect();return{left:t.left,top:t.top}}function Vd(e,t,s){const a=e.cloneNode(),n=e[us];n&&n.forEach(c=>{c.split(/\s+/).forEach(u=>u&&a.classList.remove(u))}),s.split(/\s+/).forEach(c=>c&&a.classList.add(c)),a.style.display="none";const i=t.nodeType===1?t:t.parentNode;i.appendChild(a);const{hasTransform:l}=Uo(a);return i.removeChild(a),l}const ma=e=>{const t=e.props["onUpdate:modelValue"]||!1;return te(t)?s=>Xs(t,s):t};function Md(e){e.target.composing=!0}function hn(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const qt=Symbol("_assign"),Zs=Symbol("_initialValue");function Wa(e,t,s){return t&&(e=e.trim()),s&&(e=wa(e)),e}const _s={created(e,{modifiers:{lazy:t,trim:s,number:a}},n){e.parentNode&&(e.type==="text"?e[Zs]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[Zs]=e.defaultValue.replace(/\r\n?/g,`
`))),e[qt]=ma(n);const i=a||n.props&&n.props.type==="number";Ut(e,t?"change":"input",l=>{l.target.composing||e[qt](Wa(e.value,s,i))}),(s||i)&&Ut(e,"change",()=>{e.value=Wa(e.value,s,i)}),t||(Ut(e,"compositionstart",Md),Ut(e,"compositionend",hn),Ut(e,"change",hn))},mounted(e,{value:t,modifiers:{trim:s,number:a}}){const n=t??"",i=e[Zs];delete e[Zs],i!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==i?e[qt](Wa(e.value,s,a)):e.value=n},beforeUpdate(e,{value:t,oldValue:s,modifiers:{lazy:a,trim:n,number:i}},l){if(e[qt]=ma(l),e.composing)return;const c=(i||e.type==="number")&&!/^0\d/.test(e.value)?wa(e.value):e.value,u=t??"";if(c===u)return;const f=e.getRootNode();(f instanceof Document||f instanceof ShadowRoot)&&f.activeElement===e&&e.type!=="range"&&(a&&t===s||n&&e.value.trim()===u)||(e.value=u)}},Nd={deep:!0,created(e,{value:t,modifiers:{number:s}},a){e._modelValue=t,Ut(e,"change",()=>{const n=Array.prototype.filter.call(e.options,i=>i.selected).map(i=>s?wa(va(i)):va(i));e[qt](e.multiple?$a(e._modelValue)?new Set(n):n:n[0]),e._assigning=!0,Ls(()=>{e._assigning=!1})}),e[qt]=ma(a)},mounted(e,{value:t}){bn(e,t)},beforeUpdate(e,{value:t},s){e._modelValue=t,e[qt]=ma(s)},updated(e,{value:t}){e._assigning||bn(e,t)}};function bn(e,t){const s=e.multiple,a=te(t);if(!(s&&!a&&!$a(t))){for(let n=0,i=e.options.length;n<i;n++){const l=e.options[n],c=va(l);if(s)if(a){const u=typeof c;u==="string"||u==="number"?l.selected=t.some(f=>String(f)===String(c)):l.selected=bl(t,c)>-1}else l.selected=t.has(c);else if(Hs(va(l),t)){e.selectedIndex!==n&&(e.selectedIndex=n);return}}!s&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function va(e){return"_value"in e?e._value:e.value}const Pd=["ctrl","shift","alt","meta"],Ld={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Pd.some(s=>e[`${s}Key`]&&!t.includes(s))},Se=(e,t)=>{if(!e)return e;const s=e._withMods||(e._withMods={}),a=t.join(".");return s[a]||(s[a]=(n,...i)=>{for(let l=0;l<t.length;l++){const c=Ld[t[l]];if(c&&c(n,t))return}return e(n,...i)})},Ed={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},ps=(e,t)=>{const s=e._withKeys||(e._withKeys={}),a=t.join(".");return s[a]||(s[a]=n=>{if(!("key"in n))return;const i=Dt(n.key);if(t.some(l=>l===i||Ed[l]===i))return e(n)})},Dd=Ne({patchProp:kd},ad);let yn;function Bd(){return yn||(yn=Br(Dd))}const Rd=(...e)=>{const t=Bd().createApp(...e),{mount:s}=t;return t.mount=a=>{const n=Fd(a);if(!n)return;const i=t._component;!re(i)&&!i.render&&!i.template&&(i.template=n.innerHTML),n.nodeType===1&&(n.textContent="");const l=s(n,!1,Od(n));return n instanceof Element&&(n.removeAttribute("v-cloak"),n.setAttribute("data-v-app","")),l},t};function Od(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Fd(e){return Ie(e)?document.querySelector(e):e}/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $n=e=>e==="";/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=(...e)=>e.filter((t,s,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===s).join(" ").trim();/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,a)=>a?a.toUpperCase():s.toLowerCase());/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=e=>{const t=jd(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ss={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ud=Symbol("lucide-icons");function qd(){return zs(Ud,{})}/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gd=({name:e,iconNode:t,"icon-node":s,absoluteStrokeWidth:a,"absolute-stroke-width":n,strokeWidth:i,"stroke-width":l,size:c,color:u,...f},{slots:p})=>{const{size:h,color:k,strokeWidth:w=2,absoluteStrokeWidth:m=!1,class:$=""}=qd(),_=Z(()=>{const T=$n(a)||$n(n)||a===!0||n===!0||m===!0,P=i||l||w||ss["stroke-width"];return T?Number(P)*24/Number(c??h??ss.width):P});return pa("svg",{...ss,...f,width:c??h??ss.width,height:c??h??ss.height,stroke:u??k??ss.stroke,"stroke-width":_.value,class:_d("lucide",$,...e?[`lucide-${kn(Hd(e))}-icon`,`lucide-${kn(e)}`]:["lucide-icon"])},[...(t??s??[]).map(T=>pa(...T)),...p.default?[p.default()]:[]])};/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=(e,t)=>(s,{slots:a,attrs:n})=>pa(Gd,{...n,...s,iconNode:t,name:e},a.default?{default:a.default}:void 0);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ri=ne("arrow-right",Wd);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Jo=ne("bell",Kd);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jd=[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17",key:"1q5490"}]],Yd=ne("bluetooth",Jd);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]],Zd=ne("box",Qd);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]],ec=ne("calendar",Xd);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tc=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Yo=ne("check",tc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sc=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ac=ne("chevron-down",sc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ic=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Qo=ne("chevron-left",ic);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nc=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Ws=ne("chevron-right",nc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oc=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],lc=ne("chevron-up",oc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rc=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],dc=ne("circle-alert",rc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cc=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Zo=ne("circle-check",cc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Xo=ne("circle-x",uc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pc=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],fc=ne("cloud-upload",pc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],el=ne("copy",mc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],gc=ne("download",vc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hc=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],bc=ne("ellipsis",hc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],$c=ne("file-text",yc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kc=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],xc=ne("folder-open",kc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],tl=ne("folder",wc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cc=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],Sc=ne("house",Cc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]],Ac=ne("inbox",Ic);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zc=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Ai=ne("info",zc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Vc=ne("layers",Tc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mc=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Nc=ne("loader-circle",Mc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Lc=ne("lock",Pc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],zi=ne("menu",Ec);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dc=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],xn=ne("message-square",Dc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bc=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],Rc=ne("mic",Bc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],wn=ne("moon",Oc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fc=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]],_c=ne("paperclip",Fc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jc=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Hc=ne("play",jc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uc=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],qc=ne("plus",Uc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gc=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Jt=ne("search",Gc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wc=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],Kc=ne("send",Wc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Yc=ne("settings",Jc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qc=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],Zc=ne("share-2",Qc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],Ka=ne("shopping-bag",Xc);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],Cn=ne("sliders-vertical",eu);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tu=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Ms=ne("sparkles",tu);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Sn=ne("sun",su);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],In=ne("terminal",au);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Ti=ne("triangle-alert",iu);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nu=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],ou=ne("wifi",nu);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],nt=ne("x",lu);/**
 * @license @lucide/vue v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ru=[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]],An=ne("zap",ru),W=(e,t)=>{const s=e.__vccOpts||e;for(const[a,n]of t)s[a]=n;return s},du={class:"glass-nav main-navbar"},cu={class:"nav-container"},uu={class:"search-input-wrap desktop-search"},pu=["value"],fu={key:1,class:"shortcut-kbd"},mu={class:"nav-actions desktop-actions"},vu=["aria-expanded"],gu={key:0,class:"mobile-nav-dropdown"},hu={class:"search-input-wrap mobile-search"},bu=["value"],yu={class:"mobile-actions-list"},$u={__name:"Navbar",props:{searchQuery:{type:String,default:""}},emits:["navigate","update:searchQuery","open-tokens","open-mobile-demo","open-install"],setup(e,{expose:t,emit:s}){const a=s,n=B(null),i=B(!1),l=B(!1),c=h=>{l.value=!1,a(h)};t({focusSearch:()=>{n.value&&n.value.focus()}});const f=h=>{i.value=h,h?(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light")):(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light")),localStorage.setItem("idesign_dark",h?"true":"false")},p=()=>{f(!i.value)};return tt(()=>{const h=localStorage.getItem("idesign_dark");let k=!1;h!==null?k=h==="true":k=document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,f(k)}),(h,k)=>(r(),d("header",du,[o("div",cu,[o("a",{href:"#",class:"brand",onClick:k[0]||(k[0]=Se(w=>h.$emit("navigate","home"),["prevent"]))},[...k[10]||(k[10]=[Ge('<div class="brand-badge" data-v-e0607701><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-e0607701><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-e0607701></path></svg></div><div class="brand-text" data-v-e0607701><span class="name" data-v-e0607701>Idesign</span><span class="badge-vue" data-v-e0607701>Vue 3 / Nuxt 3</span></div>',2)])]),o("div",uu,[g(D(Jt),{size:15,class:"nav-search-icon"}),o("input",{ref_key:"searchInputRef",ref:n,value:e.searchQuery,type:"text",placeholder:"Search 60+ components...",class:"nav-search-input",onInput:k[1]||(k[1]=w=>h.$emit("update:searchQuery",w.target.value))},null,40,pu),e.searchQuery?(r(),d("button",{key:0,type:"button",class:"clear-btn","aria-label":"Clear search",onClick:k[2]||(k[2]=w=>h.$emit("update:searchQuery",""))},[g(D(nt),{size:14})])):(r(),d("kbd",fu,"⌘K"))]),o("div",mu,[o("button",{type:"button",class:"nav-btn-link",onClick:k[3]||(k[3]=w=>h.$emit("open-tokens"))},[g(D(Cn),{size:15}),k[11]||(k[11]=z(" Tokens & Rules ",-1))]),o("button",{type:"button",class:"theme-toggle-btn","aria-label":"Toggle Dark Mode",onClick:p},[i.value?(r(),O(D(Sn),{key:0,size:15})):(r(),O(D(wn),{key:1,size:15})),z(" "+y(i.value?"Light":"Dark"),1)]),o("button",{type:"button",class:"cli-btn",onClick:k[4]||(k[4]=w=>h.$emit("open-install"))},[g(D(In),{size:15}),k[12]||(k[12]=z(" Install CLI ",-1))])]),o("button",{type:"button",class:"mobile-hamburger-btn","aria-expanded":l.value,"aria-label":"Toggle Navigation Menu",onClick:k[5]||(k[5]=w=>l.value=!l.value)},[l.value?(r(),O(D(nt),{key:0,size:20})):(r(),O(D(zi),{key:1,size:20}))],8,vu)]),g(qe,{name:"mobile-menu"},{default:A(()=>[l.value?(r(),d("div",gu,[o("div",hu,[g(D(Jt),{size:15,class:"nav-search-icon"}),o("input",{value:e.searchQuery,type:"text",placeholder:"Search components...",class:"nav-search-input",onInput:k[6]||(k[6]=w=>h.$emit("update:searchQuery",w.target.value))},null,40,bu),e.searchQuery?(r(),d("button",{key:0,type:"button",class:"clear-btn","aria-label":"Clear search",onClick:k[7]||(k[7]=w=>h.$emit("update:searchQuery",""))},[g(D(nt),{size:14})])):S("",!0)]),o("div",yu,[o("button",{type:"button",class:"mobile-menu-item",onClick:k[8]||(k[8]=w=>c("open-tokens"))},[g(D(Cn),{size:16}),k[13]||(k[13]=o("span",null,"Tokens & Design System",-1))]),o("button",{type:"button",class:"mobile-menu-item",onClick:p},[i.value?(r(),O(D(Sn),{key:0,size:16})):(r(),O(D(wn),{key:1,size:16})),o("span",null,"Theme: "+y(i.value?"Dark Mode":"Light Mode"),1)]),o("button",{type:"button",class:"mobile-menu-item primary",onClick:k[9]||(k[9]=w=>c("open-install"))},[g(D(In),{size:16}),k[14]||(k[14]=o("span",null,"Install CLI & Setup",-1))])])])):S("",!0)]),_:1})]))}},ku=W($u,[["__scopeId","data-v-e0607701"]]),xu={class:"hero-section"},wu={class:"hero-container"},Cu={class:"command-bar"},Su={key:0,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#30d158","stroke-width":"2.5"},Iu={key:1,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Au={__name:"HeroSection",emits:["toast"],setup(e,{emit:t}){const s=t,a=B(!1),n=()=>{navigator.clipboard.writeText("npx idesign init"),a.value=!0,s("toast",'Copied "npx idesign init" to clipboard!'),setTimeout(()=>{a.value=!1},2e3)};return(i,l)=>(r(),d("section",xu,[o("div",wu,[l[3]||(l[3]=Ge('<div class="live-status" data-v-3479d502><span class="pulse-dot" data-v-3479d502></span><span class="live-text" data-v-3479d502>IDESIGN SYSTEM · VUE 3 &amp; NUXT 3 READY</span></div><h1 class="hero-title" data-v-3479d502> Apple-Grade UI Components.<br data-v-3479d502><span class="gradient-text" data-v-3479d502>Copy, Paste, or Install.</span></h1><p class="hero-subtitle" data-v-3479d502> Built strictly on Apple Liquid Glass design tokens — calm light grey ground, unified white surfaces, hairline dividers, negative tracking typography, and frosted glass. </p>',3)),o("div",Cu,[l[2]||(l[2]=o("div",{class:"code-terminal"},[o("span",{class:"prompt"},"$"),o("span",{class:"cmd"},"npx idesign init")],-1)),o("button",{type:"button",class:"copy-cmd-btn",onClick:n},[a.value?(r(),d("svg",Su,[...l[0]||(l[0]=[o("path",{d:"M20 6L9 17l-5-5"},null,-1)])])):(r(),d("svg",Iu,[...l[1]||(l[1]=[o("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"},null,-1),o("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"},null,-1)])])),o("span",null,y(a.value?"Copied!":"Copy CLI"),1)])]),l[4]||(l[4]=Ge('<div class="feature-chips" data-v-3479d502><span class="chip" data-v-3479d502><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3479d502><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14" data-v-3479d502></path><polyline points="22 4 12 14.01 9 11.01" data-v-3479d502></polyline></svg> No Fragmented Cards </span><span class="chip" data-v-3479d502><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3479d502><circle cx="12" cy="12" r="10" data-v-3479d502></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" data-v-3479d502></path></svg> Glass Only on Overlap </span><span class="chip" data-v-3479d502><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3479d502><polyline points="16 18 22 12 16 6" data-v-3479d502></polyline><polyline points="8 6 2 12 8 18" data-v-3479d502></polyline></svg> Vue 3 &amp; Nuxt 3 SFC </span><span class="chip" data-v-3479d502><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3479d502><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-3479d502></path></svg> Zero Weight Runtime </span></div>',1))])]))}},zu=W(Au,[["__scopeId","data-v-3479d502"]]),Tu={class:"seg-container",role:"tablist","aria-label":"Segmented control"},Vu=["aria-selected","onClick"],Mu={__name:"IdSegmentedControl",props:{modelValue:{type:[String,Number],default:void 0},active:{type:[String,Number],default:void 0},options:{type:Array,default:()=>["Overview","Components","Tokens"]},theme:{type:String,default:"white",validator:e=>["white","black"].includes(e)}},emits:["update:modelValue","update:active","change"],setup(e,{emit:t}){const s=e,a=t,n=Z(()=>s.options.map(u=>typeof u=="object"&&u!==null?{val:u.id!==void 0?u.id:u.value!==void 0?u.value:u.label,lbl:u.label||u.id||u.value}:{val:u,lbl:u})),i=Z(()=>{var u;return s.active!==void 0&&s.active!==null&&s.active!==""?s.active:s.modelValue!==void 0&&s.modelValue!==null&&s.modelValue!==""?s.modelValue:(u=n.value[0])==null?void 0:u.val}),l=B(i.value);Ct(()=>[s.active,s.modelValue],([u,f])=>{u!=null&&u!==""?l.value=u:f!=null&&f!==""&&(l.value=f)});const c=u=>{l.value=u,a("update:modelValue",u),a("update:active",u),a("change",u)};return(u,f)=>(r(),d("div",Tu,[(r(!0),d(Y,null,ue(n.value,p=>(r(),d("button",{key:p.val,type:"button",role:"tab","aria-selected":l.value===p.val,class:E(["seg-item",{active:l.value===p.val,"active--black":e.theme==="black"&&l.value===p.val}]),onClick:h=>c(p.val)},y(p.lbl),11,Vu))),128))]))}},La=W(Mu,[["__scopeId","data-v-05303c06"]]),Nu={class:"catalog-section",id:"components"},Pu={class:"catalog-controls"},Lu={key:0,class:"cards-grid"},Eu=["onClick"],Du={class:"preview-box"},Bu={key:0,class:"mini-nav"},Ru={key:1,class:"mini-dock"},Ou={key:2,class:"mini-seg"},Fu={key:3,class:"mini-tabs"},_u={key:4,class:"mini-crumbs"},ju={key:5,class:"mini-pagination"},Hu={key:6,class:"mini-dropdown"},Uu={key:7,class:"mini-btns"},qu={key:8,class:"mini-panel"},Gu={key:9,class:"mini-card-box"},Wu={key:10,class:"mini-hero-cta"},Ku={key:11,class:"mini-accordion"},Ju={key:12,class:"mini-proj-section"},Yu={key:13,class:"mini-img-frame"},Qu={key:14,class:"mini-stepper-box"},Zu={key:15,class:"mini-timeline-box"},Xu={key:16,class:"mini-grid-box"},ep={key:17,class:"mini-barchart-box"},tp={key:18,class:"mini-piechart-box"},sp={key:19,class:"mini-input-box"},ap={key:20,class:"mini-textarea-box"},ip={key:21,class:"mini-select-box"},np={key:22,class:"mini-checkbox-box"},op={key:23,class:"mini-radio-box"},lp={key:24,class:"mini-slider-box"},rp={key:25,class:"mini-switch-wrap"},dp={key:26,class:"mini-date-box"},cp={key:27,class:"mini-upload-box"},up={key:28,class:"mini-cmd-box"},pp={key:29,class:"mini-modal"},fp={key:30,class:"mini-sheet-box"},mp={key:31,class:"mini-drawer-box"},vp={key:32,class:"mini-popover-box"},gp={key:33,class:"mini-tooltip-box"},hp={key:34,class:"mini-confirm-box"},bp={key:35,class:"mini-live"},yp={key:36,class:"mini-tags-box"},$p={key:37,class:"mini-alert-box"},kp={key:38,class:"mini-table-box"},xp={key:39,class:"mini-avatar-box"},wp={key:40,class:"mini-av-group"},Cp={key:41,class:"mini-badge-box"},Sp={key:42,class:"mini-progress-box"},Ip={key:43,class:"mini-skel-box"},Ap={key:44,class:"mini-spin-box"},zp={key:45,class:"mini-stat-box"},Tp={key:46,class:"mini-spark-box"},Vp={key:47,class:"mini-empty-box"},Mp={key:48,class:"mini-tree-box"},Np={key:49,class:"mini-carousel-box"},Pp={key:50,class:"mini-mac-banner"},Lp={key:51,class:"mini-stack-box"},Ep={key:52,class:"mini-divider-box"},Dp={key:53,class:"mini-hero-page"},Bp={key:54,class:"mini-product-page"},Rp={key:55,class:"mini-chat-page"},Op={key:56,class:"mini-toast-box"},Fp={key:57,class:"mini-tour-card"},_p={key:58,class:"mini-dash-page"},jp={key:59,class:"mini-auth-page"},Hp={key:60,class:"generic-preview"},Up={class:"card-info"},qp={class:"card-header"},Gp={class:"category-badge"},Wp={class:"card-title"},Kp={class:"card-description"},Jp={class:"card-actions"},Yp=["onClick"],Qp={key:1,class:"empty-state"},Zp={__name:"CatalogGrid",props:{components:{type:Array,required:!0},categories:{type:Array,required:!0},searchQuery:{type:String,default:""}},emits:["select-component","quick-copy","update:searchQuery"],setup(e){const t=e,s=B("all"),a=Z(()=>t.components.filter(n=>{const i=s.value,l=i==="all"||n.category===i,c=t.searchQuery.toLowerCase().trim(),u=!c||n.name.toLowerCase().includes(c)||n.description.toLowerCase().includes(c)||n.tags.some(f=>f.toLowerCase().includes(c));return l&&u}));return(n,i)=>(r(),d("section",Nu,[o("div",Pu,[g(La,{modelValue:s.value,"onUpdate:modelValue":i[0]||(i[0]=l=>s.value=l),options:e.categories,theme:"black"},null,8,["modelValue","options"])]),a.value.length>0?(r(),d("div",Lu,[(r(!0),d(Y,null,ue(a.value,l=>(r(),d("div",{key:l.id,class:"component-card",onClick:c=>n.$emit("select-component",l)},[o("div",Du,[l.id==="glass-nav"?(r(),d("div",Bu,[...i[2]||(i[2]=[o("div",{class:"mini-brand"},[o("span",null,"⚡"),z(" Idesign")],-1),o("div",{class:"mini-links"},[o("span",null,"Docs"),z(),o("span",{class:"mini-btn"},"Action")],-1)])])):l.id==="dock"?(r(),d("div",Ru,[...i[3]||(i[3]=[o("div",{class:"mini-dock-icon",style:{background:"#007aff"}},"📁",-1),o("div",{class:"mini-dock-icon",style:{background:"#34c759"}},"🌐",-1),o("div",{class:"mini-dock-icon",style:{background:"#ff9500"}},"📝",-1),o("div",{class:"mini-dock-dot"},null,-1)])])):l.id==="segmented-control"?(r(),d("div",Ou,[...i[4]||(i[4]=[o("span",{class:"active"},"Overview",-1),o("span",null,"Components",-1),o("span",null,"Tokens",-1)])])):l.id==="tabs"?(r(),d("div",Fu,[...i[5]||(i[5]=[o("div",{class:"mini-tab-item active"},"Overview",-1),o("div",{class:"mini-tab-item"},"Components",-1),o("div",{class:"mini-tab-bar"},null,-1)])])):l.id==="breadcrumbs"?(r(),d("div",_u,[...i[6]||(i[6]=[o("span",null,"Home",-1),o("span",{class:"sep"},"›",-1),o("span",null,"Components",-1),o("span",{class:"sep"},"›",-1),o("span",{class:"active"},"Button",-1)])])):l.id==="pagination"?(r(),d("div",ju,[...i[7]||(i[7]=[o("span",null,"‹",-1),o("span",{class:"p-page"},"1",-1),o("span",{class:"p-page active"},"2",-1),o("span",{class:"p-page"},"3",-1),o("span",null,"›",-1)])])):l.id==="dropdown-menu"?(r(),d("div",Hu,[...i[8]||(i[8]=[o("div",{class:"d-item"},[o("span",null,"Edit"),o("kbd",null,"⌘E")],-1),o("div",{class:"d-item danger"},[o("span",null,"Delete")],-1)])])):l.id==="apple-button"?(r(),d("div",Uu,[...i[9]||(i[9]=[o("button",{class:"m-btn-primary"},"Primary →",-1),o("button",{class:"m-btn-glass"},"Glass",-1)])])):l.id==="unified-panel"?(r(),d("div",qu,[...i[10]||(i[10]=[Ge('<div class="mini-row" data-v-b4fa8933><span class="m-row-left" data-v-b4fa8933><span class="m-sq" style="background:#007aff;" data-v-b4fa8933>📶</span> Wi-Fi</span><span class="m-detail" data-v-b4fa8933>Home ›</span></div><div class="mini-row" data-v-b4fa8933><span class="m-row-left" data-v-b4fa8933><span class="m-sq" style="background:#34c759;" data-v-b4fa8933>⚡</span> Bluetooth</span><span class="m-detail" data-v-b4fa8933>On ›</span></div>',2)])])):l.id==="card"?(r(),d("div",Gu,[...i[11]||(i[11]=[o("div",{class:"m-card-title"},"Apple Vision Pro",-1),o("div",{class:"m-card-sub"},"Spatial Computing",-1),o("div",{class:"m-card-chip"},"Explore",-1)])])):l.id==="hero-cta"?(r(),d("div",Wu,[...i[12]||(i[12]=[o("div",{class:"mini-cta-title"},"Liquid Glass Hero CTA",-1),o("div",{class:"mini-glass-chip"},"Explore",-1)])])):l.id==="accordion"?(r(),d("div",Ku,[...i[13]||(i[13]=[o("div",{class:"m-acc-header"},[o("span",null,"What is Idesign?"),o("span",null,"˅")],-1),o("div",{class:"m-acc-body"},"An Apple-grade Vue 3 component library.",-1)])])):l.id==="project-section"?(r(),d("div",Ju,[...i[14]||(i[14]=[o("div",{class:"m-proj-head"},"📁 Featured Projects",-1),o("div",{class:"m-proj-card"},[o("span",null,"⚡ Spatial Studio")],-1)])])):l.id==="image-frame"?(r(),d("div",Yu,[...i[15]||(i[15]=[o("div",{class:"m-frame-inner"},[o("span",{class:"m-photo-icon"},"📷")],-1)])])):l.id==="stepper"?(r(),d("div",Qu,[...i[16]||(i[16]=[Ge('<div class="m-step done" data-v-b4fa8933>✓</div><div class="m-step-line done" data-v-b4fa8933></div><div class="m-step active" data-v-b4fa8933>2</div><div class="m-step-line" data-v-b4fa8933></div><div class="m-step" data-v-b4fa8933>3</div>',5)])])):l.id==="timeline"?(r(),d("div",Zu,[...i[17]||(i[17]=[o("div",{class:"m-tl-item"},[o("span",{class:"m-dot primary"}),o("span",null,"v2.4 System Update")],-1),o("div",{class:"m-tl-item"},[o("span",{class:"m-dot success"}),o("span",null,"Security Audit Passed")],-1)])])):l.id==="grid"?(r(),d("div",Xu,[...i[18]||(i[18]=[o("div",{class:"m-g-col"},"Col 1",-1),o("div",{class:"m-g-col"},"Col 2",-1),o("div",{class:"m-g-col"},"Col 3",-1)])])):l.id==="bar-chart"?(r(),d("div",ep,[...i[19]||(i[19]=[Ge('<div class="m-bar" style="height:40%;" data-v-b4fa8933></div><div class="m-bar" style="height:75%;" data-v-b4fa8933></div><div class="m-bar active" style="height:100%;" data-v-b4fa8933></div><div class="m-bar" style="height:60%;" data-v-b4fa8933></div><div class="m-bar" style="height:80%;" data-v-b4fa8933></div>',5)])])):l.id==="pie-chart"?(r(),d("div",tp,[...i[20]||(i[20]=[Ge('<svg width="40" height="40" viewBox="0 0 36 36" data-v-b4fa8933><circle cx="18" cy="18" r="14" fill="none" stroke="var(--hairline)" stroke-width="4" data-v-b4fa8933></circle><circle cx="18" cy="18" r="14" fill="none" stroke="#0071e3" stroke-width="4" stroke-dasharray="55 100" stroke-dashoffset="0" data-v-b4fa8933></circle><circle cx="18" cy="18" r="14" fill="none" stroke="#30d158" stroke-width="4" stroke-dasharray="30 100" stroke-dashoffset="-55" data-v-b4fa8933></circle></svg><span class="m-pie-label" data-v-b4fa8933>Direct Traffic</span>',2)])])):l.id==="input"?(r(),d("div",sp,[...i[21]||(i[21]=[o("span",{class:"m-search-icon"},"🔍",-1),o("span",{class:"m-input-text"},"Search components...",-1),o("span",{class:"m-clear-btn"},"×",-1)])])):l.id==="textarea"?(r(),d("div",ap,[...i[22]||(i[22]=[o("span",{class:"m-ta-text"},"Write description...",-1),o("span",{class:"m-ta-count"},"14/200",-1)])])):l.id==="select"?(r(),d("div",ip,[...i[23]||(i[23]=[o("span",null,"Framework: Vue 3",-1),o("span",null,"▾",-1)])])):l.id==="checkbox"?(r(),d("div",np,[...i[24]||(i[24]=[o("div",{class:"m-chk-square"},"✓",-1),o("span",null,"Accept terms & conditions",-1)])])):l.id==="radio-group"?(r(),d("div",op,[...i[25]||(i[25]=[o("div",{class:"m-radio-item active"},[o("span",{class:"r-dot"}),z(" Free")],-1),o("div",{class:"m-radio-item"},[o("span",{class:"r-dot-off"}),z(" Pro")],-1)])])):l.id==="slider"?(r(),d("div",lp,[...i[26]||(i[26]=[o("div",{class:"m-slider-track"},[o("div",{class:"m-slider-fill"}),o("div",{class:"m-slider-thumb"})],-1)])])):l.id==="ios-switch"?(r(),d("div",rp,[...i[27]||(i[27]=[o("span",null,"Notifications",-1),o("div",{class:"m-switch"},[o("span",{class:"m-thumb"})],-1)])])):l.id==="date-picker"?(r(),d("div",dp,[...i[28]||(i[28]=[o("span",null,"📅 Aug 15, 2026",-1),o("span",{class:"m-cal-badge"},"Calendar",-1)])])):l.id==="file-upload"?(r(),d("div",cp,[...i[29]||(i[29]=[o("span",{class:"m-up-icon"},"☁️",-1),o("span",{class:"m-up-text"},"Drag & drop files here",-1)])])):l.id==="command-palette"?(r(),d("div",up,[...i[30]||(i[30]=[o("div",{class:"m-cmd-input"},[z("🔍 Type a command... "),o("kbd",null,"⌘K")],-1)])])):l.id==="liquid-modal"?(r(),d("div",pp,[...i[31]||(i[31]=[o("div",{class:"m-modal-card"},[o("div",{class:"m-modal-head"},"Confirm Action"),o("div",{class:"m-modal-btns"},[o("span",null,"Cancel"),o("span",{class:"m-accent"},"Confirm")])],-1)])])):l.id==="bottom-sheet"?(r(),d("div",fp,[...i[32]||(i[32]=[o("div",{class:"m-sheet-bar"},null,-1),o("div",{class:"m-sheet-title"},"Actions Sheet",-1)])])):l.id==="drawer"?(r(),d("div",mp,[...i[33]||(i[33]=[o("div",{class:"m-drawer-panel"},[o("span",null,"Settings Drawer")],-1)])])):l.id==="popover"?(r(),d("div",vp,[...i[34]||(i[34]=[o("div",{class:"m-pop-card"},"Popover anchored",-1)])])):l.id==="tooltip"?(r(),d("div",gp,[...i[35]||(i[35]=[o("div",{class:"m-tooltip-pill"},"Helpful tip",-1),o("div",{class:"m-tooltip-btn"},"Hover Button",-1)])])):l.id==="confirm-dialog"?(r(),d("div",hp,[...i[36]||(i[36]=[o("div",{class:"m-conf-head"},"Delete Item",-1),o("div",{class:"m-conf-btns"},[o("span",null,"Cancel"),o("span",{class:"m-danger"},"Delete")],-1)])])):l.id==="live-indicator"?(r(),d("div",bp,[...i[37]||(i[37]=[o("span",{class:"pulse-dot"},null,-1),o("span",null,"SYSTEM ONLINE · LIVE",-1)])])):l.id==="tag"?(r(),d("div",yp,[...i[38]||(i[38]=[o("span",{class:"m-tag plain"},"plain",-1),o("span",{class:"m-tag accent"},"accent",-1),o("span",{class:"m-tag heat"},"🔥 hot",-1)])])):l.id==="alert"?(r(),d("div",$p,[...i[39]||(i[39]=[o("span",{class:"m-alert-icon"},"ℹ️",-1),o("span",{class:"m-alert-title"},"Software Update Available",-1)])])):l.id==="table"?(r(),d("div",kp,[...i[40]||(i[40]=[o("div",{class:"m-t-head"},[o("span",null,"Name"),o("span",null,"Role")],-1),o("div",{class:"m-t-row"},[o("span",null,"Jane"),o("span",null,"Developer")],-1)])])):l.id==="avatar"?(r(),d("div",xp,[...i[41]||(i[41]=[o("div",{class:"m-av circle"},"JS",-1),o("div",{class:"m-av squircle framed"},"AR",-1)])])):l.id==="avatar-group"?(r(),d("div",wp,[...i[42]||(i[42]=[o("div",{class:"m-av-stack s1"},"JS",-1),o("div",{class:"m-av-stack s2"},"AR",-1),o("div",{class:"m-av-stack s3"},"+3",-1)])])):l.id==="badge"?(r(),d("div",Cp,[...i[43]||(i[43]=[o("span",{class:"m-bell"},"🔔",-1),o("span",{class:"m-count"},"5",-1)])])):l.id==="progress"?(r(),d("div",Sp,[...i[44]||(i[44]=[o("div",{class:"m-prog-bar"},[o("div",{class:"m-prog-fill"})],-1),o("span",{class:"m-prog-val"},"65%",-1)])])):l.id==="skeleton"?(r(),d("div",Ip,[...i[45]||(i[45]=[o("div",{class:"m-skel line1"},null,-1),o("div",{class:"m-skel line2"},null,-1)])])):l.id==="spinner"?(r(),d("div",Ap,[...i[46]||(i[46]=[o("div",{class:"m-spin-arc"},null,-1),o("span",null,"Loading...",-1)])])):l.id==="stat"?(r(),d("div",zp,[...i[47]||(i[47]=[o("div",{class:"m-stat-top"},[o("span",null,"Revenue"),o("span",{class:"m-stat-badge"},"+14.2%")],-1),o("div",{class:"m-stat-val"},"$128,450",-1)])])):l.id==="sparkline"?(r(),d("div",Tp,[...i[48]||(i[48]=[o("svg",{width:"100",height:"30",viewBox:"0 0 100 30"},[o("path",{d:"M 0 25 L 20 15 L 40 20 L 60 8 L 80 12 L 100 2",fill:"none",stroke:"#0071e3","stroke-width":"2.5"})],-1)])])):l.id==="empty-state"?(r(),d("div",Vp,[...i[49]||(i[49]=[o("span",null,"🔍",-1),o("span",{class:"m-empty-title"},"No Results Found",-1)])])):l.id==="file-tree"?(r(),d("div",Mp,[...i[50]||(i[50]=[o("div",null,"📁 src",-1),o("div",{class:"m-indent"},"📄 App.vue",-1)])])):l.id==="carousel"?(r(),d("div",Np,[...i[51]||(i[51]=[o("div",{class:"m-car-card"},"Slide Card",-1),o("div",{class:"m-car-dots"},[o("span",{class:"active"}),o("span"),o("span")],-1)])])):l.id==="macos-banner"?(r(),d("div",Pp,[...i[52]||(i[52]=[o("div",{class:"m-mac-head"},"⚡ System • now",-1),o("div",{class:"m-mac-title"},"Update Ready",-1)])])):l.id==="stack"?(r(),d("div",Lp,[...i[53]||(i[53]=[o("div",{class:"m-st-item"},"Item 1",-1),o("div",{class:"m-st-item"},"Item 2",-1)])])):l.id==="divider"?(r(),d("div",Ep,[...i[54]||(i[54]=[o("span",null,"Above",-1),o("hr",{class:"m-hr"},null,-1),o("span",null,"Below",-1)])])):l.id==="hero-page"?(r(),d("div",Dp,[...i[55]||(i[55]=[Ge('<div class="m-hero-nav" data-v-b4fa8933><span data-v-b4fa8933>✦ AURA</span><span class="m-btn-mini" data-v-b4fa8933>Start</span></div><div class="m-hero-body" data-v-b4fa8933><span class="m-pill" data-v-b4fa8933>AURA 2.0</span><div class="m-title" data-v-b4fa8933>Intelligence for Vision</div></div>',2)])])):l.id==="product-page"?(r(),d("div",Bp,[...i[56]||(i[56]=[Ge('<div class="m-store-head" data-v-b4fa8933><span data-v-b4fa8933>Apple Store</span><span class="m-bag" data-v-b4fa8933>🛍️ (2)</span></div><div class="m-store-card" data-v-b4fa8933><div class="m-store-img" data-v-b4fa8933></div><div class="m-store-info" data-v-b4fa8933><span data-v-b4fa8933>Vision Pro</span><b data-v-b4fa8933>$3,499</b></div></div>',2)])])):l.id==="ai-chat-page"?(r(),d("div",Rp,[...i[57]||(i[57]=[o("div",{class:"m-chat-side"},"📁",-1),o("div",{class:"m-chat-main"},[o("div",{class:"m-msg ai"},[o("span",null,"✦ Hello Jane!")]),o("div",{class:"m-msg user"},[o("span",null,"Write Vue button")])],-1)])])):l.id==="toast"?(r(),d("div",Op,[...i[58]||(i[58]=[o("span",{class:"m-toast-icon"},"✨",-1),o("span",{class:"m-toast-text"},"Changes Saved",-1)])])):l.id==="tour"?(r(),d("div",Fp,[...i[59]||(i[59]=[Ge('<div class="m-tour-head" data-v-b4fa8933><span class="m-tour-pill" data-v-b4fa8933>STEP 1 OF 3</span><span class="m-tour-close" data-v-b4fa8933>×</span></div><div class="m-tour-body" data-v-b4fa8933><span class="m-tour-icon" data-v-b4fa8933>⚡</span><span class="m-tour-title" data-v-b4fa8933>Welcome to Idesign</span></div>',2)])])):l.id==="dashboard-page"?(r(),d("div",_p,[...i[60]||(i[60]=[o("div",{class:"m-dash-stats"},[o("div",{class:"m-stat"},[o("b",null,"$128k")]),o("div",{class:"m-stat"},[o("b",null,"48k")])],-1),o("div",{class:"m-dash-table"},[o("span",null,"Team Members")],-1)])])):l.id==="auth-page"?(r(),d("div",jp,[...i[61]||(i[61]=[o("div",{class:"m-auth-tabs"},[o("span",{class:"active"},"Sign In"),o("span",null,"Sign Up")],-1),o("div",{class:"m-auth-field"},"Email address...",-1),o("div",{class:"m-auth-btn"},"Sign In →",-1)])])):(r(),d("div",Hp,[i[62]||(i[62]=o("div",{class:"m-icon-box"},"✦",-1)),o("span",null,y(l.name),1)]))]),o("div",Up,[o("div",qp,[o("span",Gp,y(l.category),1),i[63]||(i[63]=o("span",{class:"vue-ready-tag"},"Vue SFC",-1))]),o("h3",Wp,y(l.name),1),o("p",Kp,y(l.description),1),o("div",Jp,[o("button",{class:"quick-copy-btn",title:"Copy SFC code",onClick:Se(c=>n.$emit("quick-copy",l),["stop"])},[g(D(el),{size:13}),i[64]||(i[64]=z(" Copy SFC ",-1))],8,Yp),i[65]||(i[65]=o("span",{class:"explore-link"},"Inspect & Edit →",-1))])])],8,Eu))),128))])):(r(),d("div",Qp,[i[66]||(i[66]=o("div",{class:"empty-icon"},"🔍",-1)),o("h3",null,'No components match "'+y(e.searchQuery)+'"',1),i[67]||(i[67]=o("p",null,"Try searching for navigation, panel, toggle, modal, or hero.",-1)),o("button",{class:"reset-btn",onClick:i[1]||(i[1]=l=>{n.$emit("update:searchQuery",""),s.value="all"})},"Reset Search Filter")]))]))}},Xp=W(Zp,[["__scopeId","data-v-b4fa8933"]]),ef=["aria-label"],tf={key:0,class:"modal-header"},sf={class:"modal-header-titles"},af={key:0,class:"modal-title"},nf={key:1,class:"modal-subtitle"},of={class:"modal-body"},lf={key:0,class:"modal-body-text"},rf={key:1,class:"modal-footer"},df={__name:"IdModal",props:{modelValue:{type:Boolean,default:!1},title:{type:String,default:""},subtitle:String,content:String,body:String,maxWidth:String,size:{type:String,default:"md",validator:e=>["sm","md","lg","xl","full"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass","alert"].includes(e)},closeOnBackdrop:{type:Boolean,default:!0},teleport:{type:Boolean,default:!0}},emits:["update:modelValue"],setup(e){const t=e;return Ct(()=>t.modelValue,s=>{s?document.body.style.overflow="hidden":document.body.style.overflow=""}),(s,a)=>(r(),O(Zt,{to:"body",disabled:!e.teleport},[g(qe,{name:"modal-fade"},{default:A(()=>[e.modelValue?(r(),d("div",{key:0,class:"modal-backdrop",onClick:a[1]||(a[1]=Se(n=>e.closeOnBackdrop&&s.$emit("update:modelValue",!1),["self"])),onKeydown:a[2]||(a[2]=ps(n=>s.$emit("update:modelValue",!1),["escape"]))},[o("div",{class:E(["modal-surface",`size-${e.size}`,`variant-${e.variant}`]),style:ze(e.maxWidth?{maxWidth:e.maxWidth}:{}),role:"dialog","aria-modal":"true","aria-label":e.title},[e.title||e.subtitle||s.$slots.header?(r(),d("div",tf,[R(s.$slots,"header",{},()=>[o("div",sf,[e.title?(r(),d("h3",af,y(e.title),1)):S("",!0),e.subtitle?(r(),d("p",nf,y(e.subtitle),1)):S("",!0)])],!0),o("button",{type:"button",class:"modal-close-btn","aria-label":"Close modal",onClick:a[0]||(a[0]=n=>s.$emit("update:modelValue",!1))},[g(D(nt),{size:16})])])):S("",!0),o("div",of,[R(s.$slots,"default",{},()=>[e.content||e.body?(r(),d("p",lf,y(e.content||e.body),1)):S("",!0)],!0)]),s.$slots.footer||s.$slots.actions?(r(),d("div",rf,[R(s.$slots,"actions",{},()=>[R(s.$slots,"footer",{},void 0,!0)],!0)])):S("",!0)],14,ef)],32)):S("",!0)]),_:3})],8,["disabled"]))}},Yt=W(df,[["__scopeId","data-v-ccf40fce"]]),cf={class:"glass-nav-container"},uf={class:"brand-slot"},pf={href:"#",class:"brand-link"},ff={class:"brand-icon"},mf={key:1,class:"icon-str"},vf={class:"brand-title"},gf={key:0,class:"nav-links desktop-only"},hf=["href"],bf={key:1,class:"actions-slot desktop-only"},yf=["aria-expanded"],$f={key:0,class:"mobile-nav-drawer"},kf={key:0,class:"mobile-links-list"},xf=["href"],wf={__name:"IdGlassNav",props:{title:{type:String,default:"Idesign"},icon:[String,Object,Function],links:Array,variant:{type:String,default:"glass",validator:e=>["glass","solid","pill","full-width"].includes(e)}},setup(e){const t=B(!1);return(s,a)=>(r(),d("header",{class:E(["glass-nav",`variant-${e.variant}`,{"mobile-open":t.value}])},[o("div",cf,[o("div",uf,[R(s.$slots,"brand",{},()=>[o("a",pf,[o("div",ff,[R(s.$slots,"icon",{},()=>[e.icon&&typeof e.icon!="string"?(r(),O(Ce(e.icon),{key:0,size:18})):typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",mf,y(e.icon),1)):(r(),O(D(Vc),{key:2,size:18}))],!0)]),o("span",vf,y(e.title),1)])])]),e.links&&e.links.length||s.$slots.nav?(r(),d("nav",gf,[R(s.$slots,"nav",{},()=>[(r(!0),d(Y,null,ue(e.links,(n,i)=>(r(),d("a",{key:i,href:n.href||"#",class:E(["nav-link-item",{active:n.active}])},y(n.label||n),11,hf))),128))])])):S("",!0),s.$slots.actions?(r(),d("div",bf,[R(s.$slots,"actions",{},void 0)])):S("",!0),o("button",{type:"button",class:"nav-hamburger-btn mobile-only","aria-expanded":t.value,"aria-label":"Toggle navigation menu",onClick:a[0]||(a[0]=n=>t.value=!t.value)},[t.value?(r(),O(D(nt),{key:0,size:18})):(r(),O(D(zi),{key:1,size:18}))],8,yf)]),g(qe,{name:"nav-drawer"},{default:A(()=>[t.value?(r(),d("div",$f,[e.links&&e.links.length||s.$slots.nav?(r(),d("nav",kf,[R(s.$slots,"nav",{},()=>[(r(!0),d(Y,null,ue(e.links,(n,i)=>(r(),d("a",{key:i,href:n.href||"#",class:E(["mobile-link-item",{active:n.active}]),onClick:a[1]||(a[1]=l=>t.value=!1)},y(n.label||n),11,xf))),128))],!0)])):S("",!0),s.$slots.actions?(r(),d("div",{key:1,class:"mobile-actions-container",onClick:a[2]||(a[2]=n=>t.value=!1)},[R(s.$slots,"actions",{},void 0,!0)])):S("",!0)])):S("",!0)]),_:3})],2))}},Cf=W(wf,[["__scopeId","data-v-c84b2d38"]]),Sf={key:0,class:"btn-icon left"},If={key:1},Af={key:1,class:"btn-label"},zf={key:2,class:"btn-icon right"},Tf={key:1},Vf={__name:"IdButton",props:{label:String,variant:{type:String,default:"primary",validator:e=>["primary","secondary","outline","glass","dark","ghost","danger"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple","orange","red","black","gray"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},iconLeft:[Object,Function,String],iconRight:[Object,Function,String],href:String,type:{type:String,default:"button"},disabled:Boolean,loading:Boolean,block:Boolean},emits:["click"],setup(e){const t=e,s=Z(()=>t.href?"a":"button"),a=Z(()=>t.size==="sm"?14:t.size==="lg"?18:16),n=i=>typeof i=="object"||typeof i=="function";return(i,l)=>(r(),O(Ce(s.value),{href:e.href,type:s.value==="button"?e.type:void 0,class:E(["id-btn",`btn-${e.variant}`,`color-${e.color}`,`size-${e.size}`,{"is-disabled":e.disabled||e.loading,"is-block":e.block,"is-loading":e.loading}]),disabled:e.disabled||e.loading,onClick:l[0]||(l[0]=c=>i.$emit("click",c))},{default:A(()=>[e.loading?(r(),O(D(Nc),{key:0,class:"btn-spinner",size:a.value},null,8,["size"])):(r(),d(Y,{key:1},[i.$slots.iconLeft||e.iconLeft?(r(),d("span",Sf,[R(i.$slots,"iconLeft",{},()=>[n(e.iconLeft)?(r(),O(Ce(e.iconLeft),{key:0,size:a.value},null,8,["size"])):(r(),d("span",If,y(e.iconLeft),1))],!0)])):S("",!0),i.$slots.default||e.label?(r(),d("span",Af,[R(i.$slots,"default",{},()=>[z(y(e.label),1)],!0)])):S("",!0),i.$slots.iconRight||e.iconRight?(r(),d("span",zf,[R(i.$slots,"iconRight",{},()=>[n(e.iconRight)?(r(),O(Ce(e.iconRight),{key:0,size:a.value},null,8,["size"])):(r(),d("span",Tf,y(e.iconRight),1))],!0)])):S("",!0)],64))]),_:3},8,["href","type","class","disabled"]))}},oe=W(Vf,[["__scopeId","data-v-a11a7340"]]),Mf={__name:"IdPanel",props:{size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","no-dividers","glass","inset"].includes(e)},noDividers:Boolean},setup(e){return(t,s)=>(r(),d("div",{class:E(["id-panel",`size-${e.size}`,`variant-${e.variant}`,{"no-dividers":e.noDividers||e.variant==="no-dividers"}])},[R(t.$slots,"default",{},void 0)],2))}},ga=W(Mf,[["__scopeId","data-v-3a5ff6d4"]]),Nf={key:1},Pf={class:"row-content"},Lf={key:0,class:"row-title"},Ef={key:1,class:"row-subtitle"},Df={key:1,class:"row-detail"},Bf={key:2,class:"row-action"},Rf={key:3,class:"row-chevron"},Of={__name:"IdPanelRow",props:{title:String,subtitle:String,detail:String,icon:[String,Object,Function],iconBg:String,href:String,clickable:Boolean,chevron:{type:Boolean,default:!0}},emits:["click"],setup(e){return(t,s)=>(r(),O(Ce(e.href?"a":"div"),{href:e.href,class:E(["id-panel-row",{"is-clickable":e.clickable||e.href}]),onClick:s[0]||(s[0]=a=>t.$emit("click",a))},{default:A(()=>[e.icon||t.$slots.icon||e.iconBg?(r(),d("div",{key:0,class:"row-icon-wrap",style:ze(e.iconBg?{background:e.iconBg,color:"#fff"}:{})},[R(t.$slots,"icon",{},()=>[e.icon&&typeof e.icon!="string"?(r(),O(Ce(e.icon),{key:0,size:16})):typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Nf,y(e.icon),1)):S("",!0)],!0)],4)):S("",!0),o("div",Pf,[e.title?(r(),d("div",Lf,y(e.title),1)):S("",!0),e.subtitle||t.$slots.subtitle?(r(),d("div",Ef,[R(t.$slots,"subtitle",{},()=>[z(y(e.subtitle),1)],!0)])):S("",!0),R(t.$slots,"default",{},void 0,!0)]),e.detail?(r(),d("div",Df,y(e.detail),1)):S("",!0),t.$slots.action||t.$slots.trailing?(r(),d("div",Bf,[R(t.$slots,"action",{},()=>[R(t.$slots,"trailing",{},void 0,!0)],!0)])):e.chevron?(r(),d("div",Rf,[g(D(Ws),{size:16})])):S("",!0)]),_:3},8,["href","class"]))}},Je=W(Of,[["__scopeId","data-v-d10d5b61"]]),Ff={class:"cta-content"},_f={key:0,class:"cta-eyebrow"},jf={class:"cta-title"},Hf={key:1,class:"cta-subtitle"},Uf={class:"cta-actions"},qf={__name:"IdHeroCta",props:{title:{type:String,default:"Build Apple-Grade Apps"},description:String,subtitle:{type:String,default:"Clean, unified surfaces with frosted glass used only where layers overlap."},eyebrow:{type:String,default:"DESIGN SYSTEM V2.0"},actionLabel:String,variant:{type:String,default:"glass",validator:e=>["glass","gradient"].includes(e)}},emits:["action"],setup(e){return(t,s)=>(r(),d("section",{class:E(["id-hero-cta",`variant-${e.variant}`])},[s[1]||(s[1]=o("div",{class:"blur-orb orb-top"},null,-1)),s[2]||(s[2]=o("div",{class:"blur-orb orb-bottom"},null,-1)),o("div",Ff,[e.eyebrow||t.$slots.eyebrow?(r(),d("div",_f,[R(t.$slots,"eyebrow",{},()=>[z(y(e.eyebrow),1)])])):S("",!0),o("h2",jf,[R(t.$slots,"title",{},()=>[z(y(e.title),1)])]),e.description||e.subtitle||t.$slots.description||t.$slots.subtitle?(r(),d("p",Hf,[R(t.$slots,"description",{},()=>[R(t.$slots,"subtitle",{},()=>[z(y(e.description||e.subtitle),1)],!0)])])):S("",!0),o("div",Uf,[R(t.$slots,"actions",{},()=>[e.actionLabel?(r(),d("button",{key:0,type:"button",class:"cta-btn primary",onClick:s[0]||(s[0]=a=>t.$emit("action"))},y(e.actionLabel),1)):S("",!0)])])])],2))}},Gf=W(qf,[["__scopeId","data-v-06775efa"]]),Wf={key:0,class:"toggle-label"},Kf=["aria-checked","disabled"],Jf={__name:"IdToggle",props:{modelValue:{type:Boolean,default:!1},label:String,variant:{type:String,default:"success",validator:e=>["success","primary","purple","orange","red"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},disabled:Boolean},emits:["update:modelValue"],setup(e){return(t,s)=>(r(),d("div",{class:E(["id-toggle-container",`size-${e.size}`,{"is-disabled":e.disabled}])},[e.label?(r(),d("span",Wf,y(e.label),1)):S("",!0),o("button",{type:"button",role:"switch","aria-checked":e.modelValue,class:E(["id-toggle",`variant-${e.variant}`,{"is-active":e.modelValue}]),disabled:e.disabled,onClick:s[0]||(s[0]=a=>t.$emit("update:modelValue",!e.modelValue))},[...s[1]||(s[1]=[o("span",{class:"toggle-thumb"},null,-1)])],10,Kf)],2))}},zn=W(Jf,[["__scopeId","data-v-a55ccedb"]]),Yf={},Qf={class:"live-dot-container"},Zf={class:"live-label"};function Xf(e,t){return r(),d("div",Qf,[t[1]||(t[1]=o("span",{class:"pulse-dot"},null,-1)),o("span",Zf,[R(e.$slots,"default",{},()=>[t[0]||(t[0]=z("LIVE",-1))])])])}const sl=W(Yf,[["render",Xf],["__scopeId","data-v-cca2de82"]]),em={class:"iphone-shell"},tm={class:"iphone-bezel"},sm={class:"status-bar"},am={class:"time"},im={class:"screen-content"},nm={__name:"IdIphoneFrame",setup(e){const t=B("9:41");return tt(()=>{(()=>{const a=new Date;let n=a.getHours();const i=a.getMinutes().toString().padStart(2,"0");t.value=`${n}:${i}`})()}),(s,a)=>(r(),d("div",em,[o("div",tm,[a[1]||(a[1]=o("div",{class:"dynamic-island"},[o("div",{class:"camera-lens"})],-1)),o("div",sm,[o("span",am,y(t.value),1),a[0]||(a[0]=Ge('<div class="status-icons" data-v-c4e1d245><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" data-v-c4e1d245><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.35A.996.996 0 0 0 5.06 21c.26 0 .52-.1.71-.29l1.74-1.74C8.93 19.46 10.42 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" data-v-c4e1d245></path></svg><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-v-c4e1d245><rect x="2" y="7" width="18" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="2" data-v-c4e1d245></rect><rect x="4" y="9" width="12" height="6" rx="1.5" data-v-c4e1d245></rect><path d="M22 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-c4e1d245></path></svg></div>',1))]),o("div",im,[R(s.$slots,"default",{},void 0)]),a[2]||(a[2]=o("div",{class:"home-indicator"},[o("div",{class:"bar"})],-1))])]))}},al=W(nm,[["__scopeId","data-v-c4e1d245"]]),om={key:0,class:"input-label"},lm={key:0,class:"input-icon left"},rm=["type","value","placeholder","disabled"],dm={key:2,class:"input-icon right"},cm={key:0,class:"trailing-text"},um={__name:"IdInput",props:{modelValue:{type:[String,Number],default:""},label:String,placeholder:String,hint:String,errorText:String,trailingText:String,type:{type:String,default:"text"},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","search","error","success"].includes(e)},clearable:Boolean,disabled:Boolean},emits:["update:modelValue"],setup(e){const t=B(!1);return(s,a)=>(r(),d("div",{class:E(["id-input-group",`size-${e.size}`,{"has-error":e.variant==="error","has-success":e.variant==="success","is-disabled":e.disabled}])},[e.label?(r(),d("label",om,y(e.label),1)):S("",!0),o("div",{class:E(["input-wrapper",{"is-focused":t.value,"is-search":e.variant==="search"}])},[e.variant==="search"||s.$slots.iconLeft?(r(),d("span",lm,[R(s.$slots,"iconLeft",{},()=>[e.variant==="search"?(r(),O(D(Jt),{key:0,size:16})):S("",!0)])])):S("",!0),o("input",{type:e.type,value:e.modelValue,placeholder:e.placeholder||(e.variant==="search"?"Search...":""),disabled:e.disabled,class:"id-input",onInput:a[0]||(a[0]=n=>s.$emit("update:modelValue",n.target.value)),onFocus:a[1]||(a[1]=n=>t.value=!0),onBlur:a[2]||(a[2]=n=>t.value=!1)},null,40,rm),e.clearable&&e.modelValue?(r(),d("button",{key:1,type:"button",class:"clear-btn","aria-label":"Clear text",onClick:a[3]||(a[3]=n=>s.$emit("update:modelValue",""))},[g(D(nt),{size:12})])):S("",!0),s.$slots.iconRight||e.trailingText?(r(),d("span",dm,[R(s.$slots,"iconRight",{},()=>[e.trailingText?(r(),d("span",cm,y(e.trailingText),1)):S("",!0)])])):S("",!0)],2),e.hint||e.errorText?(r(),d("span",{key:1,class:E(["input-hint",{"error-msg":e.variant==="error"}])},y(e.variant==="error"&&e.errorText?e.errorText:e.hint),3)):S("",!0)],2))}},Pt=W(um,[["__scopeId","data-v-c8a544b6"]]),pm={key:0,class:"textarea-label"},fm=["value","placeholder","disabled","rows","maxlength","aria-label"],mm={key:1,class:"textarea-footer"},vm={key:0,class:"textarea-hint"},gm={key:1,class:"textarea-count"},hm={__name:"IdTextarea",props:{modelValue:{type:String,default:""},label:String,placeholder:String,hint:String,rows:{type:Number,default:4},maxlength:Number,disabled:Boolean,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass","error"].includes(e)}},emits:["update:modelValue"],setup(e){const t=B(!1);return(s,a)=>(r(),d("div",{class:E(["id-textarea-group",`size-${e.size}`,`variant-${e.variant}`])},[e.label?(r(),d("label",pm,y(e.label),1)):S("",!0),o("textarea",{value:e.modelValue,placeholder:e.placeholder,disabled:e.disabled,rows:e.rows,maxlength:e.maxlength,class:E(["id-textarea",{"is-focused":t.value}]),"aria-label":e.label,onInput:a[0]||(a[0]=n=>s.$emit("update:modelValue",n.target.value)),onFocus:a[1]||(a[1]=n=>t.value=!0),onBlur:a[2]||(a[2]=n=>t.value=!1)},null,42,fm),e.hint||e.maxlength?(r(),d("div",mm,[e.hint?(r(),d("span",vm,y(e.hint),1)):S("",!0),e.maxlength?(r(),d("span",gm,y((e.modelValue||"").length)+"/"+y(e.maxlength),1)):S("",!0)])):S("",!0)],2))}},bm=W(hm,[["__scopeId","data-v-bf61be87"]]),ym=["aria-expanded","aria-labelledby"],$m=["aria-labelledby"],km=["aria-selected","onClick","onMouseenter"],xm={key:0,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},wm={key:1,class:"select-hint"},Cm={__name:"IdSelect",props:{modelValue:{type:[String,Number,null],default:null},options:{type:Array,required:!0},label:String,placeholder:{type:String,default:"Select an option..."},hint:String,disabled:Boolean,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","no-divider","glass"].includes(e)}},emits:["update:modelValue"],setup(e,{emit:t}){const s=e,a=t,n=B(null),i=B(!1),l=B(-1),u=`id-select-label-${Math.random().toString(36).substring(2,8)}`,f=Z(()=>s.options.map($=>typeof $=="object"?{value:$.value,label:$.label||$.value}:{value:$,label:String($)})),p=Z(()=>{const $=f.value.find(_=>_.value===s.modelValue);return $?$.label:s.placeholder}),h=()=>{s.disabled||(i.value=!i.value)},k=$=>{a("update:modelValue",$),i.value=!1},w=$=>{if(!s.disabled)switch($.key){case"Enter":case" ":$.preventDefault(),i.value&&l.value>=0?k(f.value[l.value].value):h();break;case"ArrowDown":$.preventDefault(),i.value?l.value=Math.min(l.value+1,f.value.length-1):(i.value=!0,l.value=0);break;case"ArrowUp":$.preventDefault(),l.value=Math.max(l.value-1,0);break;case"Escape":i.value=!1;break}},m=$=>{n.value&&!n.value.contains($.target)&&(i.value=!1)};return tt(()=>document.addEventListener("click",m)),Xt(()=>document.removeEventListener("click",m)),($,_)=>(r(),d("div",{class:E(["id-select-group",`size-${e.size}`,`variant-${e.variant}`,{"is-disabled":e.disabled}])},[e.label?(r(),d("label",{key:0,id:u,class:"select-label"},y(e.label),1)):S("",!0),o("div",{ref_key:"selectRef",ref:n,class:E(["select-wrapper",`variant-${e.variant}`,{"is-open":i.value,"is-focused":i.value}]),role:"combobox","aria-expanded":i.value,"aria-haspopup":!0,"aria-labelledby":e.label?u:void 0,tabindex:"0",onClick:h,onKeydown:w},[o("span",{class:E(["select-value",{"is-placeholder":!e.modelValue}])},y(p.value),3),_[0]||(_[0]=o("svg",{class:"select-chevron",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[o("path",{d:"M6 9l6 6 6-6"})],-1))],42,ym),g(qe,{name:"dropdown"},{default:A(()=>[i.value?(r(),d("div",{key:0,class:E(["select-dropdown",`variant-${e.variant}`]),role:"listbox","aria-labelledby":e.label?u:void 0},[(r(!0),d(Y,null,ue(f.value,(T,P)=>(r(),d("div",{key:T.value,class:E(["select-option",{"is-selected":e.modelValue===T.value,"is-focused":l.value===P}]),role:"option","aria-selected":e.modelValue===T.value,onClick:Se(j=>k(T.value),["stop"]),onMouseenter:j=>l.value=P},[o("span",null,y(T.label),1),e.modelValue===T.value?(r(),d("svg",xm,[..._[1]||(_[1]=[o("path",{d:"M20 6L9 17l-5-5"},null,-1)])])):S("",!0)],42,km))),128))],10,$m)):S("",!0)]),_:1}),e.hint?(r(),d("span",wm,y(e.hint),1)):S("",!0)],2))}},Sm=W(Cm,[["__scopeId","data-v-4c198272"]]),Im=["checked","disabled"],Am=["aria-checked"],zm=["width","height"],Tm={key:0,class:"checkbox-label"},Vm={__name:"IdCheckbox",props:{modelValue:{type:Boolean,default:!1},label:String,disabled:Boolean,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple","orange","red"].includes(e)}},emits:["update:modelValue"],setup(e){const t=e,s=Z(()=>t.size==="sm"?11:t.size==="lg"?16:13);return(a,n)=>(r(),d("label",{class:E(["id-checkbox",`size-${e.size}`,`color-${e.color}`,{"is-checked":e.modelValue,"is-disabled":e.disabled}])},[o("input",{type:"checkbox",checked:e.modelValue,disabled:e.disabled,class:"sr-only",onChange:n[0]||(n[0]=i=>a.$emit("update:modelValue",i.target.checked))},null,40,Im),o("span",{class:E(["checkbox-box",{checked:e.modelValue}]),role:"checkbox","aria-checked":e.modelValue},[e.modelValue?(r(),d("svg",{key:0,width:s.value,height:s.value,viewBox:"0 0 24 24",fill:"none",stroke:"#fff","stroke-width":"3","stroke-linecap":"round"},[...n[1]||(n[1]=[o("path",{d:"M20 6L9 17l-5-5"},null,-1)])],8,zm)):S("",!0)],10,Am),e.label||a.$slots.default?(r(),d("span",Tm,[R(a.$slots,"default",{},()=>[z(y(e.label),1)])])):S("",!0)],2))}},ha=W(Vm,[["__scopeId","data-v-a4c7523b"]]),Mm=["aria-label"],Nm={key:0,class:"radio-group-label"},Pm=["value","checked","disabled","onChange"],Lm={class:"radio-label"},Em={__name:"IdRadioGroup",props:{modelValue:{type:[String,Number],default:""},options:{type:Array,required:!0},label:String,direction:{type:String,default:"vertical"},disabled:Boolean},emits:["update:modelValue"],setup(e){const t=e,s=`radio-${Math.random().toString(36).substring(2,8)}`,a=Z(()=>t.options.map(n=>typeof n=="object"?n:{value:n,label:String(n)}));return(n,i)=>(r(),d("div",{class:"id-radio-group",role:"radiogroup","aria-label":e.label},[e.label?(r(),d("span",Nm,y(e.label),1)):S("",!0),o("div",{class:E(["radio-options",e.direction==="horizontal"?"horizontal":"vertical"])},[(r(!0),d(Y,null,ue(a.value,l=>(r(),d("label",{key:l.value,class:E(["radio-item",{"is-selected":e.modelValue===l.value,"is-disabled":e.disabled}])},[o("input",{type:"radio",value:l.value,checked:e.modelValue===l.value,disabled:e.disabled,name:s,class:"sr-only",onChange:c=>n.$emit("update:modelValue",l.value)},null,40,Pm),i[0]||(i[0]=o("span",{class:"radio-circle"},[o("span",{class:"radio-dot"})],-1)),o("span",Lm,y(l.label),1)],2))),128))],2)],8,Mm))}},Dm=W(Em,[["__scopeId","data-v-e182d3e5"]]),Bm={class:"id-slider-group"},Rm={key:0,class:"slider-header"},Om={key:0,class:"slider-label"},Fm={key:1,class:"slider-value"},_m=["min","max","step","value","disabled","aria-label","aria-valuemin","aria-valuemax","aria-valuenow"],jm={__name:"IdSlider",props:{modelValue:{type:Number,default:50},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},label:String,showValue:{type:Boolean,default:!0},disabled:Boolean},emits:["update:modelValue"],setup(e){const t=e,s=Z(()=>({"--pct":`${(t.modelValue-t.min)/(t.max-t.min)*100}%`}));return(a,n)=>(r(),d("div",Bm,[e.label||e.showValue?(r(),d("div",Rm,[e.label?(r(),d("label",Om,y(e.label),1)):S("",!0),e.showValue?(r(),d("span",Fm,y(e.modelValue),1)):S("",!0)])):S("",!0),o("input",{type:"range",min:e.min,max:e.max,step:e.step,value:e.modelValue,disabled:e.disabled,class:"id-slider",style:ze(s.value),"aria-label":e.label,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,onInput:n[0]||(n[0]=i=>a.$emit("update:modelValue",Number(i.target.value)))},null,44,_m)]))}},Hm=W(jm,[["__scopeId","data-v-b763b866"]]),Um=["aria-label"],qm=["src","alt"],Gm={key:0,class:"avatar-emoji"},Wm={key:2,class:"avatar-initials"},Km={__name:"IdAvatar",props:{src:String,name:{type:String,default:""},icon:[String,Object,Function],alt:String,size:{type:String,default:"md",validator:e=>["xs","sm","md","lg","xl"].includes(e)},shape:{type:String,default:"circle",validator:e=>["circle","squircle"].includes(e)},framed:Boolean,status:{type:String,default:null,validator:e=>[null,"online","offline","busy"].includes(e)}},setup(e){const t=e,s=B(!1),a=Z(()=>{if(!t.name)return"?";const n=t.name.trim().split(/\s+/);return n.length>=2?(n[0][0]+n[1][0]).toUpperCase():n[0].substring(0,2).toUpperCase()});return(n,i)=>(r(),d("div",{class:E(["id-avatar-wrap",`size-${e.size}`,{"has-status":!!e.status}]),role:"img","aria-label":e.alt||e.name||"Avatar"},[o("div",{class:E(["id-avatar",`shape-${e.shape}`,{"is-framed":e.framed}])},[R(n.$slots,"default",{},()=>[e.src&&!s.value?(r(),d("img",{key:0,src:e.src,alt:e.alt||e.name,class:"avatar-img",onError:i[0]||(i[0]=l=>s.value=!0)},null,40,qm)):R(n.$slots,"icon",{},()=>[typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Gm,y(e.icon),1)):e.icon?(r(),O(Ce(e.icon),{key:1,class:"avatar-icon-svg"})):(r(),d("span",Wm,y(a.value),1))],!0,1)])],2),e.status?(r(),d("span",{key:0,class:E(["avatar-status",`status-${e.status}`,`shape-${e.shape}`]),title:"Status"},null,2)):S("",!0)],10,Um))}},Qt=W(Km,[["__scopeId","data-v-1f5aa76a"]]),Jm={key:0,class:"badge-count"},Ym={key:1,class:"badge-dot"},Qm={__name:"IdBadge",props:{variant:{type:String,default:"default"},count:{type:[Number,String],default:null},dot:Boolean,showZero:{type:Boolean,default:!1},max:{type:Number,default:99}},setup(e){const t=e,s=Z(()=>{if(t.count===null||t.count===void 0||t.count==="")return null;const l=Number(t.count);return isNaN(l)?t.count:l}),a=Z(()=>s.value===null?!1:typeof s.value=="number"?t.showZero?!0:s.value>0:!0),n=Z(()=>t.dot||a.value),i=Z(()=>typeof s.value=="number"&&s.value>t.max?`${t.max}+`:s.value);return(l,c)=>(r(),d("span",{class:E(["id-badge",`badge-${e.variant}`,{"has-count":a.value}])},[R(l.$slots,"default",{},void 0),a.value?(r(),d("span",Jm,y(i.value),1)):e.dot&&n.value?(r(),d("span",Ym)):S("",!0)],2))}},Zm=W(Qm,[["__scopeId","data-v-6857b1b0"]]),Xm=["aria-valuenow","aria-label"],ev={key:0,class:"progress-header"},tv={key:0,class:"progress-label"},sv={key:1,class:"progress-value"},av={__name:"IdProgress",props:{value:{type:Number,default:0},label:String,showValue:{type:Boolean,default:!0},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},indeterminate:Boolean,variant:{type:String,default:"default",validator:e=>["default","glass"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple","orange","red"].includes(e)}},setup(e){const t=e,s=Z(()=>Math.min(100,Math.max(0,t.value)));return(a,n)=>(r(),d("div",{class:E(["id-progress",`size-${e.size}`,`variant-${e.variant}`,`color-${e.color}`]),role:"progressbar","aria-valuenow":e.indeterminate?null:e.value,"aria-valuemin":0,"aria-valuemax":100,"aria-label":e.label},[e.label||e.showValue&&!e.indeterminate?(r(),d("div",ev,[e.label?(r(),d("span",tv,y(e.label),1)):S("",!0),e.showValue&&!e.indeterminate?(r(),d("span",sv,y(Math.round(s.value))+"%",1)):S("",!0)])):S("",!0),o("div",{class:E(["progress-track",`size-${e.size}`])},[o("div",{class:E(["progress-fill",{"is-indeterminate":e.indeterminate}]),style:ze(e.indeterminate?{}:{width:s.value+"%"})},null,6)],2)],10,Xm))}},iv=W(av,[["__scopeId","data-v-756d00d2"]]),nv={__name:"IdSkeleton",props:{variant:{type:String,default:"rect",validator:e=>["rect","text","circle","card"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},width:String,height:String,borderRadius:String,animated:{type:Boolean,default:!0}},setup(e){const t=e,s=Z(()=>({sm:{text:"12px",circle:"36px",card:"100px",rect:"60px"},md:{text:"16px",circle:"56px",card:"140px",rect:"100px"},lg:{text:"20px",circle:"72px",card:"180px",rect:"140px"}})),a=Z(()=>{const n=s.value[t.size]||s.value.md;return{width:t.width||(t.variant==="circle"?n.circle:"100%"),height:t.height||n[t.variant]||"100px",borderRadius:t.borderRadius||(t.variant==="circle"?"50%":t.variant==="text"?"6px":"14px")}});return(n,i)=>(r(),d("div",{class:E(["id-skeleton",`variant-${e.variant}`,`size-${e.size}`,{"is-animated":e.animated}]),style:ze(a.value),role:"status","aria-label":"Loading..."},null,6))}},ov=W(nv,[["__scopeId","data-v-a06d0c25"]]),lv={key:0,class:"spinner-label"},rv={__name:"IdSpinner",props:{size:{type:String,default:"md",validator:e=>["sm","md","lg","xl"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple","white","gray"].includes(e)},label:String},setup(e){return(t,s)=>(r(),d("div",{class:E(["id-spinner",`size-${e.size}`,`color-${e.color}`]),role:"status","aria-label":"Loading"},[s[0]||(s[0]=o("svg",{viewBox:"0 0 24 24",fill:"none",class:"spinner-svg"},[o("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"3",opacity:"0.2"}),o("path",{d:"M12 2a10 10 0 0 1 10 10",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round"})],-1)),e.label?(r(),d("span",lv,y(e.label),1)):S("",!0)],2))}},dv=W(rv,[["__scopeId","data-v-4ac28963"]]),cv={class:"tooltip-text"},uv={__name:"IdTooltip",props:{text:{type:String,required:!0},position:{type:String,default:"top",validator:e=>["top","bottom","left","right"].includes(e)}},setup(e){const t=B(!1);return(s,a)=>(r(),d("div",{class:"id-tooltip-wrapper",onMouseenter:a[0]||(a[0]=n=>t.value=!0),onMouseleave:a[1]||(a[1]=n=>t.value=!1),onFocus:a[2]||(a[2]=n=>t.value=!0),onBlur:a[3]||(a[3]=n=>t.value=!1)},[R(s.$slots,"default",{},void 0),g(qe,{name:"tooltip-pop"},{default:A(()=>[t.value?(r(),d("div",{key:0,class:E(["id-tooltip",`pos-${e.position}`]),role:"tooltip"},[o("span",cv,y(e.text),1)],2)):S("",!0)]),_:1})],32))}},pv=W(uv,[["__scopeId","data-v-6283fa82"]]),fv=["aria-expanded","onClick"],mv={class:"accordion-title"},vv={key:0,class:"accordion-content"},gv={class:"accordion-body"},hv={__name:"IdAccordion",props:{items:{type:Array,required:!0},multiple:{type:Boolean,default:!1},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","separated","glass"].includes(e)}},setup(e){const t=e,s=B([0]),a=n=>{s.value.includes(n)?s.value=s.value.filter(i=>i!==n):s.value=t.multiple?[...s.value,n]:[n]};return(n,i)=>(r(),d("div",{class:E(["id-accordion",`size-${e.size}`,`variant-${e.variant}`])},[(r(!0),d(Y,null,ue(e.items,(l,c)=>(r(),d("div",{key:c,class:"accordion-item"},[o("button",{type:"button",class:"accordion-trigger","aria-expanded":s.value.includes(c),onClick:u=>a(c)},[o("span",mv,y(l.title),1),(r(),d("svg",{class:E(["accordion-chevron",{rotated:s.value.includes(c)}]),width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[...i[0]||(i[0]=[o("path",{d:"M6 9l6 6 6-6"},null,-1)])],2))],8,fv),g(qe,{name:"accordion-expand"},{default:A(()=>[s.value.includes(c)?(r(),d("div",vv,[o("div",gv,[R(n.$slots,`item-${c}`,{},()=>[z(y(l.content),1)],!0)])])):S("",!0)]),_:2},1024)]))),128))],2))}},bv=W(hv,[["__scopeId","data-v-94dd0606"]]),yv={class:"tabs-list",role:"tablist"},$v=["aria-selected","onClick"],kv={class:"tab-panel",role:"tabpanel"},xv={__name:"IdTabs",props:{modelValue:{type:[String,Number],required:!0},tabs:{type:Array,required:!0},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","pill","glass"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple"].includes(e)}},emits:["update:modelValue"],setup(e){const t=e,s=Z(()=>{const n=t.tabs.findIndex(i=>(i.value!==void 0?i.value:i)===t.modelValue);return n>=0?n:0}),a=Z(()=>({left:`${s.value/t.tabs.length*100}%`,width:`${100/t.tabs.length}%`}));return(n,i)=>(r(),d("div",{class:E(["id-tabs",`size-${e.size}`,`variant-${e.variant}`,`color-${e.color}`])},[o("div",yv,[(r(!0),d(Y,null,ue(e.tabs,(l,c)=>(r(),d("button",{key:l.value||c,type:"button",role:"tab",class:E(["tab-trigger",{active:e.modelValue===(l.value||c)}]),"aria-selected":e.modelValue===(l.value||c),onClick:u=>n.$emit("update:modelValue",l.value||c)},y(l.label||l),11,$v))),128)),e.variant==="default"?(r(),d("div",{key:0,class:"tab-indicator",style:ze(a.value)},null,4)):S("",!0)]),o("div",kv,[R(n.$slots,e.modelValue,{},void 0),R(n.$slots,"default",{},void 0)])],2))}},wv=W(xv,[["__scopeId","data-v-281fe342"]]),Cv={class:"alert-icon"},Sv={key:1,class:"icon-emoji"},Iv={class:"alert-body"},Av={key:0,class:"alert-title"},zv={key:1,class:"alert-message"},Tv={__name:"IdAlert",props:{variant:{type:String,default:"info",validator:e=>["info","success","warning","error","glass"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},title:String,description:String,icon:[String,Object,Function],dismissible:Boolean},emits:["dismiss"],setup(e){const t=e,s=Z(()=>t.size==="sm"?16:t.size==="lg"?24:20),a=Z(()=>t.size==="sm"?14:t.size==="lg"?18:16);return(n,i)=>(r(),d("div",{class:E(["id-alert",`alert-${e.variant}`,`size-${e.size}`]),role:"alert"},[o("div",Cv,[R(n.$slots,"icon",{},()=>[e.icon&&typeof e.icon!="string"?(r(),O(Ce(e.icon),{key:0,size:s.value},null,8,["size"])):typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Sv,y(e.icon),1)):(r(),d(Y,{key:2},[e.variant==="info"||e.variant==="glass"?(r(),O(D(Ai),{key:0,size:s.value},null,8,["size"])):e.variant==="success"?(r(),O(D(Zo),{key:1,size:s.value},null,8,["size"])):e.variant==="warning"?(r(),O(D(Ti),{key:2,size:s.value},null,8,["size"])):(r(),O(D(Xo),{key:3,size:s.value},null,8,["size"]))],64))])]),o("div",Iv,[e.title?(r(),d("div",Av,y(e.title),1)):S("",!0),e.description||n.$slots.default?(r(),d("div",zv,[R(n.$slots,"default",{},()=>[z(y(e.description),1)])])):S("",!0)]),e.dismissible?(r(),d("button",{key:0,type:"button",class:"alert-close","aria-label":"Dismiss",onClick:i[0]||(i[0]=l=>n.$emit("dismiss"))},[g(D(nt),{size:a.value},null,8,["size"])])):S("",!0)],2))}},Vv=W(Tv,[["__scopeId","data-v-780765ff"]]),Mv={key:0,class:"tag-icon left"},Nv={key:1},Pv={class:"tag-label"},Lv={key:1,class:"tag-icon right"},Ev={key:1},Dv={__name:"IdTag",props:{label:String,variant:{type:String,default:"plain",validator:e=>["plain","accent","success","warning","danger","heat","mono"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},iconLeft:[Object,Function,String],iconRight:[Object,Function,String],removable:Boolean},emits:["remove"],setup(e){const t=e,s=Z(()=>t.size==="sm"?11:t.size==="lg"?14:12.5),a=n=>typeof n=="object"||typeof n=="function";return(n,i)=>(r(),d("span",{class:E(["id-tag",`tag-${e.variant}`,`size-${e.size}`,{"is-removable":e.removable}])},[n.$slots.iconLeft||e.iconLeft?(r(),d("span",Mv,[R(n.$slots,"iconLeft",{},()=>[a(e.iconLeft)?(r(),O(Ce(e.iconLeft),{key:0,size:s.value},null,8,["size"])):(r(),d("span",Nv,y(e.iconLeft),1))])])):S("",!0),o("span",Pv,[R(n.$slots,"default",{},()=>[z(y(e.label),1)])]),n.$slots.iconRight||e.iconRight?(r(),d("span",Lv,[R(n.$slots,"iconRight",{},()=>[a(e.iconRight)?(r(),O(Ce(e.iconRight),{key:0,size:s.value},null,8,["size"])):(r(),d("span",Ev,y(e.iconRight),1))])])):S("",!0),e.removable?(r(),d("button",{key:2,type:"button",class:"remove-btn","aria-label":"Remove tag",onClick:i[0]||(i[0]=l=>n.$emit("remove",l))},[g(D(nt),{size:11})])):S("",!0)],2))}},at=W(Dv,[["__scopeId","data-v-7563c4eb"]]),Bv={__name:"IdDivider",props:{direction:{type:String,default:"horizontal"},variant:{type:String,default:"hairline"}},setup(e){return(t,s)=>(r(),d("div",{class:E(["id-divider",e.direction,`variant-${e.variant}`]),role:"separator"},null,2))}},Rv=W(Bv,[["__scopeId","data-v-678c3a68"]]),Ov={class:"crumbs-list"},Fv={key:0,class:"crumb-sep"},_v=["href","onClick"],jv={key:1,class:"crumb-icon-str"},Hv={key:2,class:"crumb-current","aria-current":"page"},Uv={key:1,class:"crumb-icon-str"},qv={__name:"IdBreadcrumbs",props:{items:{type:Array,required:!0},variant:{type:String,default:"default",validator:e=>["default","with-icons","glass"].includes(e)},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","purple","green","gray"].includes(e)}},emits:["navigate"],setup(e){const t=e,s=Z(()=>t.size==="sm"?13:t.size==="lg"?16:14),a=Z(()=>t.size==="sm"?12:t.size==="lg"?16:14),n=i=>i===0?Sc:i===1?tl:$c;return(i,l)=>(r(),d("nav",{class:E(["id-breadcrumbs",`size-${e.size}`,`variant-${e.variant}`,`color-${e.color}`]),"aria-label":"Breadcrumb"},[o("ol",Ov,[(r(!0),d(Y,null,ue(e.items,(c,u)=>(r(),d("li",{key:u,class:"crumb-item"},[u>0?(r(),d("span",Fv,[g(D(Ws),{size:a.value},null,8,["size"])])):S("",!0),c.href&&u<e.items.length-1?(r(),d("a",{key:1,href:c.href,class:"crumb-link",onClick:f=>i.$emit("navigate",c,f)},[e.variant==="with-icons"?(r(),d(Y,{key:0},[c.icon&&typeof c.icon!="string"?(r(),O(Ce(c.icon),{key:0,size:s.value,class:"crumb-icon"},null,8,["size"])):typeof c.icon=="string"&&c.icon?(r(),d("span",jv,y(c.icon),1)):(r(),O(Ce(n(u)),{key:2,size:s.value,class:"crumb-icon"},null,8,["size"]))],64)):S("",!0),o("span",null,y(c.label),1)],8,_v)):(r(),d("span",Hv,[e.variant==="with-icons"?(r(),d(Y,{key:0},[c.icon&&typeof c.icon!="string"?(r(),O(Ce(c.icon),{key:0,size:s.value,class:"crumb-icon"},null,8,["size"])):typeof c.icon=="string"&&c.icon?(r(),d("span",Uv,y(c.icon),1)):(r(),O(Ce(n(u)),{key:2,size:s.value,class:"crumb-icon"},null,8,["size"]))],64)):S("",!0),o("span",null,y(c.label),1)]))]))),128))])],2))}},il=W(qv,[["__scopeId","data-v-d25611db"]]),Gv=["disabled"],Wv=["disabled","onClick"],Kv=["disabled"],Jv={__name:"IdPagination",props:{modelValue:{type:Number,required:!0},totalPages:{type:Number,required:!0},siblings:{type:Number,default:1},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","pill","glass"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple"].includes(e)}},emits:["update:modelValue"],setup(e,{emit:t}){const s=e,a=t,n=Z(()=>s.size==="sm"?14:s.size==="lg"?18:16),i=c=>{c>=1&&c<=s.totalPages&&a("update:modelValue",c)},l=Z(()=>{const c=s.totalPages,u=s.modelValue,f=s.siblings;if(c<=7)return Array.from({length:c},(w,m)=>m+1);const p=[1],h=Math.max(2,u-f),k=Math.min(c-1,u+f);h>2&&p.push("...");for(let w=h;w<=k;w++)p.push(w);return k<c-1&&p.push("..."),p.push(c),p});return(c,u)=>(r(),d("nav",{class:E(["id-pagination",`size-${e.size}`,`variant-${e.variant}`,`color-${e.color}`]),"aria-label":"Pagination"},[o("button",{type:"button",class:"page-btn",disabled:e.modelValue<=1,"aria-label":"Previous page",onClick:u[0]||(u[0]=f=>i(e.modelValue-1))},[g(D(Qo),{size:n.value},null,8,["size"])],8,Gv),(r(!0),d(Y,null,ue(l.value,f=>(r(),d("button",{key:f,type:"button",class:E(["page-btn","page-num",{active:f===e.modelValue,ellipsis:f==="..."}]),disabled:f==="...",onClick:p=>f!=="..."&&i(f)},y(f),11,Wv))),128)),o("button",{type:"button",class:"page-btn",disabled:e.modelValue>=e.totalPages,"aria-label":"Next page",onClick:u[1]||(u[1]=f=>i(e.modelValue+1))},[g(D(Ws),{size:n.value},null,8,["size"])],8,Kv)],2))}},Yv=W(Jv,[["__scopeId","data-v-09910659"]]),Qv={class:"sheet-surface"},Zv={key:0,class:"sheet-header"},Xv={key:0,class:"sheet-title"},eg={key:1,class:"sheet-desc"},tg={class:"sheet-body"},sg={key:1,class:"sheet-footer"},ag={__name:"IdBottomSheet",props:{modelValue:{type:Boolean,default:!1},title:String,description:String,body:String,teleport:{type:Boolean,default:!0}},emits:["update:modelValue"],setup(e){return(t,s)=>(r(),O(Zt,{to:"body",disabled:!e.teleport},[g(qe,{name:"sheet-slide"},{default:A(()=>[e.modelValue?(r(),d("div",{key:0,class:"sheet-backdrop",onClick:s[0]||(s[0]=Se(a=>t.$emit("update:modelValue",!1),["self"]))},[o("div",Qv,[s[1]||(s[1]=o("div",{class:"sheet-grabber"},null,-1)),e.title||e.description||t.$slots.header?(r(),d("div",Zv,[R(t.$slots,"header",{},()=>[e.title?(r(),d("h3",Xv,y(e.title),1)):S("",!0),e.description?(r(),d("p",eg,y(e.description),1)):S("",!0)],!0)])):S("",!0),o("div",tg,[R(t.$slots,"default",{},()=>[z(y(e.body),1)],!0)]),t.$slots.footer?(r(),d("div",sg,[R(t.$slots,"footer",{},void 0,!0)])):S("",!0)])])):S("",!0)]),_:3})],8,["disabled"]))}},ig=W(ag,[["__scopeId","data-v-d2755b41"]]),ng=["aria-label"],og={key:0,class:"drawer-header"},lg={class:"drawer-header-content"},rg={key:0,class:"drawer-title"},dg={key:1,class:"drawer-desc"},cg={class:"drawer-body"},ug={key:1,class:"drawer-footer"},pg={__name:"IdDrawer",props:{modelValue:Boolean,title:String,description:String,body:String,position:{type:String,default:"right",validator:e=>["right","left"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","floating-sheet"].includes(e)},teleport:{type:Boolean,default:!0}},emits:["update:modelValue"],setup(e){const t=e;return Ct(()=>t.modelValue,s=>{t.teleport&&(document.body.style.overflow=s?"hidden":"")}),(s,a)=>(r(),O(Zt,{to:"body",disabled:!e.teleport},[g(qe,{name:"drawer-slide"},{default:A(()=>[e.modelValue?(r(),d("div",{key:0,class:"drawer-backdrop",onClick:a[1]||(a[1]=Se(n=>s.$emit("update:modelValue",!1),["self"]))},[o("div",{class:E(["drawer-surface",`pos-${e.position}`,`variant-${e.variant}`]),role:"dialog","aria-modal":"true","aria-label":e.title||"Drawer"},[e.title||e.description||s.$slots.header?(r(),d("div",og,[R(s.$slots,"header",{},()=>[o("div",lg,[e.title?(r(),d("h3",rg,y(e.title),1)):S("",!0),e.description?(r(),d("p",dg,y(e.description),1)):S("",!0)])],!0),o("button",{type:"button",class:"drawer-close","aria-label":"Close drawer",onClick:a[0]||(a[0]=n=>s.$emit("update:modelValue",!1))},[g(D(nt),{size:16})])])):S("",!0),o("div",cg,[R(s.$slots,"default",{},()=>[z(y(e.body),1)],!0)]),s.$slots.footer?(r(),d("div",ug,[R(s.$slots,"footer",{},void 0,!0)])):S("",!0)],10,ng)])):S("",!0)]),_:3})],8,["disabled"]))}},fg=W(pg,[["__scopeId","data-v-c92e0103"]]),mg=["role","tabindex","onClick","onKeydown"],vg={class:"menu-label"},gg={key:0,class:"menu-shortcut"},hg={__name:"IdDropdownMenu",props:{items:{type:Array,required:!0},align:{type:String,default:"left"},size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass"].includes(e)}},emits:["select"],setup(e,{emit:t}){const s=t,a=B(null),n=B(!1),i=()=>{n.value=!n.value},l=u=>{s("select",u),n.value=!1},c=u=>{a.value&&!a.value.contains(u.target)&&(n.value=!1)};return tt(()=>document.addEventListener("click",c)),Xt(()=>document.removeEventListener("click",c)),(u,f)=>(r(),d("div",{ref_key:"menuRef",ref:a,class:"id-dropdown-menu-wrapper"},[o("div",{onClick:i},[R(u.$slots,"trigger",{},void 0)]),g(qe,{name:"menu-pop"},{default:A(()=>[n.value?(r(),d("div",{key:0,class:E(["dropdown-menu",`align-${e.align}`,`size-${e.size}`,`variant-${e.variant}`]),role:"menu"},[(r(!0),d(Y,null,ue(e.items,(p,h)=>(r(),d("div",{key:h,class:E(["menu-item",{"is-danger":p.danger,"is-separator":p.separator}]),role:p.separator?"separator":"menuitem",tabindex:p.separator?-1:0,onClick:k=>!p.separator&&l(p),onKeydown:ps(k=>!p.separator&&l(p),["enter"])},[p.separator?S("",!0):(r(),d(Y,{key:0},[o("span",vg,y(p.label),1),p.shortcut?(r(),d("span",gg,y(p.shortcut),1)):S("",!0)],64))],42,mg))),128))],2)):S("",!0)]),_:1})],512))}},bg=W(hg,[["__scopeId","data-v-5ff69749"]]),yg={key:0,class:"table-header-bar"},$g={class:"table-title-group"},kg={key:0,class:"table-title"},xg={key:1,class:"table-count-badge"},wg={class:"table-header-actions"},Cg={key:0,class:"table-search-box"},Sg={class:"table-scroll-container"},Ig={class:"id-table"},Ag={key:0,class:"col-checkbox"},zg=["checked","indeterminate"],Tg=["onClick"],Vg={key:2,class:"sort-neutral"},Mg={key:1,class:"col-actions",style:{"text-align":"right"}},Ng=["onClick"],Pg=["checked","onChange"],Lg={type:"button",class:"row-action-btn","aria-label":"Row actions"},Eg={key:0},Dg=["colspan"],Bg={class:"empty-wrap"},Rg={__name:"IdTable",props:{columns:{type:Array,required:!0},data:{type:Array,default:()=>[]},title:String,count:[Number,String],variant:{type:String,default:"default",validator:e=>["default","striped","glass","compact","borderless"].includes(e)},compact:Boolean,selectable:Boolean,hoverable:{type:Boolean,default:!0},searchable:Boolean,selectedRows:{type:Array,default:()=>[]},hasRowActions:Boolean,emptyText:{type:String,default:"No records found."}},emits:["update:selectedRows","row-click","sort"],setup(e,{emit:t}){const s=e,a=t,n=B(""),i=B(null),l=B("asc"),c=Z(()=>s.count!==void 0&&s.count!==null&&s.count!==""?s.count:s.data?s.data.length:0),u=T=>{i.value===T?l.value=l.value==="asc"?"desc":"asc":(i.value=T,l.value="asc"),a("sort",{key:i.value,order:l.value})},f=Z(()=>{let T=[...s.data];if(n.value.trim()){const P=n.value.toLowerCase();T=T.filter(j=>Object.values(j).some(F=>String(F).toLowerCase().includes(P)))}return i.value&&T.sort((P,j)=>{const F=P[i.value],le=j[i.value];return F<le?l.value==="asc"?-1:1:F>le?l.value==="asc"?1:-1:0}),T}),p=Z(()=>{let T=s.columns.length;return s.selectable&&T++,s.hasRowActions&&T++,T}),h=T=>s.selectedRows.includes(T),k=Z(()=>f.value.length?f.value.every(T=>h(T)):!1),w=Z(()=>{const T=f.value.filter(P=>h(P)).length;return T>0&&T<f.value.length}),m=T=>{const P=[...s.selectedRows],j=P.indexOf(T);j>=0?P.splice(j,1):P.push(T),a("update:selectedRows",P)},$=()=>{k.value?a("update:selectedRows",[]):a("update:selectedRows",[...f.value])},_=(T,P)=>{a("row-click",T,P)};return(T,P)=>(r(),d("div",{class:E(["id-table-wrapper",`variant-${e.variant}`,{"is-compact":e.compact,"is-selectable":e.selectable}])},[e.title||T.$slots.header||e.searchable||T.$slots.headerActions?(r(),d("div",yg,[o("div",$g,[R(T.$slots,"header",{},()=>[e.title?(r(),d("h3",kg,y(e.title),1)):S("",!0),c.value!==null&&c.value!==void 0?(r(),d("span",xg,y(c.value),1)):S("",!0)])]),o("div",wg,[e.searchable?(r(),d("div",Cg,[g(D(Jt),{size:14,class:"table-search-icon"}),ls(o("input",{"onUpdate:modelValue":P[0]||(P[0]=j=>n.value=j),type:"text",placeholder:"Filter table...",class:"table-search-input"},null,512),[[_s,n.value]])])):S("",!0),R(T.$slots,"headerActions",{},void 0)])])):S("",!0),o("div",Sg,[o("table",Ig,[o("thead",null,[o("tr",null,[e.selectable?(r(),d("th",Ag,[o("input",{type:"checkbox",checked:k.value,indeterminate:w.value,class:"id-table-checkbox",onChange:$},null,40,zg)])):S("",!0),(r(!0),d(Y,null,ue(e.columns,j=>(r(),d("th",{key:j.key,style:ze({width:j.width,textAlign:j.align||"left"}),class:E({"is-sortable":j.sortable}),onClick:F=>j.sortable&&u(j.key)},[o("div",{class:"th-content",style:ze({justifyContent:j.align==="right"?"flex-end":j.align==="center"?"center":"flex-start"})},[o("span",null,y(j.label),1),j.sortable?(r(),d(Y,{key:0},[i.value===j.key&&l.value==="asc"?(r(),O(D(lc),{key:0,size:13})):i.value===j.key&&l.value==="desc"?(r(),O(D(ac),{key:1,size:13})):(r(),d("span",Vg,"↕"))],64)):S("",!0)],4)],14,Tg))),128)),T.$slots.actions||e.hasRowActions?(r(),d("th",Mg," Actions ")):S("",!0)])]),o("tbody",null,[(r(!0),d(Y,null,ue(f.value,(j,F)=>{var le;return r(),d("tr",{key:F,class:E({"is-selected":h(j),"is-clickable":e.hoverable||((le=T.$listeners)==null?void 0:le["row-click"])}),onClick:de=>_(j,de)},[e.selectable?(r(),d("td",{key:0,class:"col-checkbox",onClick:P[1]||(P[1]=Se(()=>{},["stop"]))},[o("input",{type:"checkbox",checked:h(j),class:"id-table-checkbox",onChange:de=>m(j)},null,40,Pg)])):S("",!0),(r(!0),d(Y,null,ue(e.columns,de=>(r(),d("td",{key:de.key,style:ze({textAlign:de.align||"left"})},[R(T.$slots,`col-${de.key}`,{row:j,value:j[de.key],index:F},()=>[z(y(j[de.key]),1)])],4))),128)),T.$slots.actions||e.hasRowActions?(r(),d("td",{key:1,class:"col-actions",style:{"text-align":"right"},onClick:P[2]||(P[2]=Se(()=>{},["stop"]))},[R(T.$slots,"actions",{row:j,index:F},()=>[o("button",Lg,[g(D(bc),{size:16})])])])):S("",!0)],10,Ng)}),128)),!f.value||f.value.length===0?(r(),d("tr",Eg,[o("td",{colspan:p.value,class:"table-empty"},[R(T.$slots,"empty",{},()=>[o("div",Bg,[g(D(Jt),{size:20,class:"empty-icon"}),o("span",null,y(n.value?`No rows match "${n.value}"`:e.emptyText),1)])])],8,Dg)])):S("",!0)])])])],2))}},di=W(Rg,[["__scopeId","data-v-a55bc784"]]),Og={class:"id-file-upload"},Fg=["accept","multiple"],_g={class:"upload-icon"},jg={class:"upload-text"},Hg={class:"upload-hint"},Ug={key:0,class:"file-list"},qg={class:"file-info"},Gg={class:"file-name"},Wg={class:"file-size"},Kg=["onClick"],Jg={__name:"IdFileUpload",props:{accept:String,multiple:Boolean,hint:String,disabled:Boolean},emits:["change"],setup(e,{emit:t}){const s=e,a=t,n=B(null),i=B(!1),l=B([]),c=()=>{!s.disabled&&n.value&&n.value.click()},u=w=>{const m=Array.from(w);l.value=s.multiple?[...l.value,...m]:m,a("change",l.value)},f=w=>{w.target.files&&u(w.target.files)},p=w=>{i.value=!1,!s.disabled&&w.dataTransfer.files&&u(w.dataTransfer.files)},h=w=>{l.value.splice(w,1),a("change",l.value)},k=w=>{if(w===0)return"0 B";const m=1024,$=["B","KB","MB","GB"],_=Math.floor(Math.log(w)/Math.log(m));return parseFloat((w/Math.pow(m,_)).toFixed(1))+" "+$[_]};return(w,m)=>(r(),d("div",Og,[o("div",{class:E(["drop-zone",{"is-dragging":i.value,"is-disabled":e.disabled}]),onDragover:m[0]||(m[0]=Se($=>i.value=!0,["prevent"])),onDragleave:m[1]||(m[1]=Se($=>i.value=!1,["prevent"])),onDrop:Se(p,["prevent"]),onClick:c},[o("input",{ref_key:"fileInput",ref:n,type:"file",accept:e.accept,multiple:e.multiple,class:"sr-only",onChange:f},null,40,Fg),o("div",_g,[g(D(fc),{size:28})]),o("div",jg,[m[2]||(m[2]=o("span",{class:"upload-title"},"Click to upload or drag & drop",-1)),o("span",Hg,y(e.hint||"SVG, PNG, JPG or GIF (max 10MB)"),1)])],34),l.value.length>0?(r(),d("div",Ug,[(r(!0),d(Y,null,ue(l.value,($,_)=>(r(),d("div",{key:_,class:"file-item"},[o("div",qg,[o("span",Gg,y($.name),1),o("span",Wg,y(k($.size)),1)]),o("button",{type:"button",class:"file-remove","aria-label":"Remove file",onClick:Se(T=>h(_),["stop"])},[g(D(nt),{size:14})],8,Kg)]))),128))])):S("",!0)]))}},Yg=W(Jg,[["__scopeId","data-v-108ba777"]]),Qg={key:0,class:"centered-empty-confirm"},Zg={class:"confirm-icon-box"},Xg={key:1,class:"confirm-emoji"},eh={key:0,class:"centered-title"},th={class:"centered-message"},sh={class:"centered-actions"},ah={key:1,class:"confirm-body"},ih={class:"confirm-message"},nh={class:"confirm-actions"},oh={__name:"IdConfirmDialog",props:{modelValue:Boolean,title:{type:String,default:"Confirm Action"},message:{type:String,default:"Are you sure you want to proceed?"},confirmText:{type:String,default:"Confirm"},cancelText:{type:String,default:"Cancel"},icon:[String,Object,Function],variant:{type:String,default:"default",validator:e=>["default","centered-empty"].includes(e)},danger:Boolean,teleport:{type:Boolean,default:!0}},emits:["update:modelValue","confirm","cancel"],setup(e,{emit:t}){const s=t,a=()=>{s("confirm"),s("update:modelValue",!1)},n=()=>{s("cancel"),s("update:modelValue",!1)};return(i,l)=>(r(),O(Yt,{"model-value":e.modelValue,title:e.variant==="centered-empty"?"":e.title,variant:e.variant==="centered-empty"?"alert":"default",teleport:e.teleport,"onUpdate:modelValue":l[0]||(l[0]=c=>i.$emit("update:modelValue",c))},{default:A(()=>[e.variant==="centered-empty"?(r(),d("div",Qg,[o("div",Zg,[R(i.$slots,"icon",{},()=>[e.icon&&typeof e.icon!="string"?(r(),O(Ce(e.icon),{key:0,size:28})):typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Xg,y(e.icon),1)):e.danger?(r(),O(D(Ti),{key:2,size:28,class:"danger-icon"})):(r(),O(D(Ai),{key:3,size:28,class:"info-icon"}))],!0)]),e.title?(r(),d("h3",eh,y(e.title),1)):S("",!0),o("p",th,y(e.message),1),o("div",sh,[g(oe,{variant:"secondary",size:"md",block:"",onClick:n},{default:A(()=>[z(y(e.cancelText),1)]),_:1}),g(oe,{variant:e.danger?"danger":"primary",size:"md",block:"",onClick:a},{default:A(()=>[z(y(e.confirmText),1)]),_:1},8,["variant"])])])):(r(),d("div",ah,[o("p",ih,y(e.message),1),o("div",nh,[g(oe,{variant:"secondary",onClick:n},{default:A(()=>[z(y(e.cancelText),1)]),_:1}),g(oe,{variant:e.danger?"danger":"primary",onClick:a},{default:A(()=>[z(y(e.confirmText),1)]),_:1},8,["variant"])])]))]),_:3},8,["model-value","title","variant","teleport"]))}},lh=W(oh,[["__scopeId","data-v-7b773986"]]),rh={__name:"IdStack",props:{direction:{type:String,default:"vertical"},gap:{type:[Number,String],default:12},align:{type:String,default:"stretch"},justify:{type:String,default:"flex-start"},wrap:Boolean},setup(e){return(t,s)=>(r(),d("div",{class:"id-stack",style:ze({flexDirection:e.direction==="horizontal"?"row":"column",gap:typeof e.gap=="number"?`${e.gap}px`:e.gap,alignItems:e.align,justify:e.justify,flexWrap:e.wrap?"wrap":"nowrap"})},[R(t.$slots,"default",{},void 0)],4))}},dh=W(rh,[["__scopeId","data-v-01f60bf1"]]),ch={class:"command-card",role:"dialog","aria-modal":"true","aria-label":"Command Palette"},uh={class:"command-header"},ph={class:"command-list",role:"listbox"},fh={class:"group-title"},mh=["aria-selected","onClick","onMouseenter"],vh={class:"item-left"},gh=["innerHTML"],hh={class:"item-label"},bh={key:0,class:"item-shortcut"},yh={key:0,class:"command-empty"},$h={__name:"IdCommandPalette",props:{modelValue:Boolean,groups:{type:Array,required:!0}},emits:["update:modelValue","select"],setup(e,{emit:t}){const s=e,a=t,n=B(""),i=B(null),l=B(null),c=()=>{a("update:modelValue",!1)},u=Z(()=>{const w=n.value.toLowerCase().trim();return w?s.groups.map(m=>({title:m.title,items:m.items.filter($=>$.label.toLowerCase().includes(w)||$.shortcut&&$.shortcut.toLowerCase().includes(w))})).filter(m=>m.items.length>0):s.groups}),f=Z(()=>u.value.flatMap(w=>w.items));Ct(()=>s.modelValue,w=>{w&&(n.value="",Ls(()=>{l.value&&l.value.focus(),f.value.length>0&&(i.value=f.value[0].id)}))});const p=w=>{a("select",w),c()},h=w=>{const m=f.value;if(m.length===0)return;const $=m.findIndex(_=>_.id===i.value);if(w.key==="ArrowDown"){w.preventDefault();const _=($+1)%m.length;i.value=m[_].id}else if(w.key==="ArrowUp"){w.preventDefault();const _=($-1+m.length)%m.length;i.value=m[_].id}else w.key==="Enter"?(w.preventDefault(),$>=0&&p(m[$])):w.key==="Escape"&&c()},k=w=>{(w.metaKey||w.ctrlKey)&&w.key==="k"&&(w.preventDefault(),a("update:modelValue",!s.modelValue))};return tt(()=>window.addEventListener("keydown",k)),Xt(()=>window.removeEventListener("keydown",k)),(w,m)=>(r(),O(Zt,{to:"body"},[g(qe,{name:"palette-fade"},{default:A(()=>[e.modelValue?(r(),d("div",{key:0,class:"command-backdrop",onClick:Se(c,["self"]),onKeydown:ps(c,["escape"])},[o("div",ch,[o("div",uh,[g(D(Jt),{size:18,class:"search-icon"}),ls(o("input",{ref_key:"inputRef",ref:l,"onUpdate:modelValue":m[0]||(m[0]=$=>n.value=$),type:"text",placeholder:"Type a command or search...",class:"command-input",onKeydown:h},null,544),[[_s,n.value]]),m[1]||(m[1]=o("kbd",{class:"esc-kbd"},"ESC",-1))]),o("div",ph,[(r(!0),d(Y,null,ue(u.value,($,_)=>(r(),d("div",{key:_,class:"command-group"},[o("div",fh,y($.title),1),(r(!0),d(Y,null,ue($.items,T=>(r(),d("div",{key:T.id,class:E(["command-item",{"is-focused":i.value===T.id}]),role:"option","aria-selected":i.value===T.id,onClick:P=>p(T),onMouseenter:P=>i.value=T.id},[o("div",vh,[T.icon?(r(),d("span",{key:0,class:"item-icon",innerHTML:T.icon},null,8,gh)):S("",!0),o("span",hh,y(T.label),1)]),T.shortcut?(r(),d("span",bh,y(T.shortcut),1)):S("",!0)],42,mh))),128))]))),128)),u.value.length===0?(r(),d("div",yh,' No results found for "'+y(n.value)+'" ',1)):S("",!0)])])],32)):S("",!0)]),_:1})]))}},kh=W($h,[["__scopeId","data-v-8b6ae148"]]),xh={key:0,class:"picker-label"},wh=["onKeydown"],Ch={key:0,class:"picker-popover"},Sh={class:"month-header"},Ih={class:"month-title"},Ah={class:"week-days"},zh={class:"days-grid"},Th=["disabled","onClick"],Vh={__name:"IdDatePicker",props:{modelValue:{type:String,default:""},label:String,placeholder:{type:String,default:"Select date..."}},emits:["update:modelValue"],setup(e,{emit:t}){const s=e,a=t,n=B(null),i=B(!1),l=B(s.modelValue?new Date(s.modelValue):new Date),c=Z(()=>l.value.getFullYear()),u=Z(()=>l.value.getMonth()),f=Z(()=>l.value.toLocaleString("default",{month:"long"})),p=Z(()=>s.modelValue?new Date(s.modelValue+"T00:00:00").toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):""),h=Z(()=>{const P=c.value,j=u.value,F=new Date(P,j,1).getDay(),le=new Date(P,j+1,0).getDate(),de=new Date(P,j,0).getDate(),ae=[];for(let ee=F-1;ee>=0;ee--){const ce=`${P}-${String(j).padStart(2,"0")}-${String(de-ee).padStart(2,"0")}`;ae.push({dayNum:de-ee,inMonth:!1,date:ce,isToday:!1})}const pe=new Date().toISOString().split("T")[0];for(let ee=1;ee<=le;ee++){const ce=`${P}-${String(j+1).padStart(2,"0")}-${String(ee).padStart(2,"0")}`;ae.push({dayNum:ee,inMonth:!0,date:ce,isToday:ce===pe})}const Q=42-ae.length;for(let ee=1;ee<=Q;ee++){const ce=`${P}-${String(j+2).padStart(2,"0")}-${String(ee).padStart(2,"0")}`;ae.push({dayNum:ee,inMonth:!1,date:ce,isToday:!1})}return ae}),k=()=>{i.value=!i.value},w=()=>{l.value=new Date(c.value,u.value-1,1)},m=()=>{l.value=new Date(c.value,u.value+1,1)},$=P=>s.modelValue===P,_=P=>{a("update:modelValue",P),i.value=!1},T=P=>{n.value&&!n.value.contains(P.target)&&(i.value=!1)};return tt(()=>document.addEventListener("click",T)),Xt(()=>document.removeEventListener("click",T)),(P,j)=>(r(),d("div",{ref_key:"wrapperRef",ref:n,class:"id-date-picker"},[e.label?(r(),d("label",xh,y(e.label),1)):S("",!0),o("div",{class:E(["picker-input",{"is-open":i.value}]),tabindex:"0",onClick:k,onKeydown:[ps(Se(k,["prevent"]),["space"]),ps(Se(k,["prevent"]),["enter"])]},[g(D(ec),{size:16,class:"calendar-icon"}),o("span",{class:E(["picker-value",{"is-placeholder":!e.modelValue}])},y(p.value||e.placeholder),3)],42,wh),g(qe,{name:"popover"},{default:A(()=>[i.value?(r(),d("div",Ch,[o("div",Sh,[o("button",{type:"button",class:"nav-arrow","aria-label":"Previous month",onClick:w},[g(D(Qo),{size:16})]),o("span",Ih,y(f.value)+" "+y(c.value),1),o("button",{type:"button",class:"nav-arrow","aria-label":"Next month",onClick:m},[g(D(Ws),{size:16})])]),o("div",Ah,[(r(),d(Y,null,ue(["Su","Mo","Tu","We","Th","Fr","Sa"],F=>o("span",{key:F,class:"week-day"},y(F),1)),64))]),o("div",zh,[(r(!0),d(Y,null,ue(h.value,(F,le)=>(r(),d("button",{key:le,type:"button",disabled:!F.inMonth,class:E(["day-cell",{"not-in-month":!F.inMonth,"is-today":F.isToday,"is-selected":$(F.date)}]),onClick:de=>_(F.date)},y(F.dayNum),11,Th))),128))])])):S("",!0)]),_:1})],512))}},Mh=W(Vh,[["__scopeId","data-v-daa1cd43"]]),Nh={key:0,class:"card-bg-image-wrapper"},Ph=["src","alt"],Lh={key:1,class:"card-media"},Eh=["src","alt"],Dh={key:2,class:"card-header"},Bh={key:0,class:"card-tag"},Rh={key:1,class:"card-title"},Oh={key:2,class:"card-subtitle"},Fh={key:3,class:"card-body"},_h={key:4,class:"card-footer"},Tn="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",jh={__name:"IdCard",props:{title:String,subtitle:String,description:String,tag:String,image:String,imageAlt:String,imageAspect:{type:String,default:"16-9",validator:e=>["16-9","4-3","1-1","21-9","auto"].includes(e)},href:String,variant:{type:String,default:"default",validator:e=>["default","framed","glass","hero","image-top","image-bg"].includes(e)},padding:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},interactive:Boolean,showActions:{type:Boolean,default:!0}},emits:["click"],setup(e){return(t,s)=>(r(),O(Ce(e.href?"a":"div"),{href:e.href,class:E(["id-card",`variant-${e.variant}`,`pad-${e.padding}`,`aspect-${e.imageAspect}`,{"is-interactive":e.href||e.interactive,"has-image":e.variant==="image-top"||e.variant==="image-bg"}]),onClick:s[0]||(s[0]=a=>t.$emit("click",a))},{default:A(()=>[e.variant==="image-bg"?(r(),d("div",Nh,[R(t.$slots,"image",{},()=>[o("img",{src:e.image||Tn,alt:e.imageAlt||e.title||"Card background",class:"card-bg-img"},null,8,Ph)],!0),s[1]||(s[1]=o("div",{class:"card-bg-overlay"},null,-1))])):e.variant==="image-top"?(r(),d("div",Lh,[R(t.$slots,"image",{},()=>[R(t.$slots,"media",{},()=>[o("img",{src:e.image||Tn,alt:e.imageAlt||e.title||"Card banner",class:"card-banner-img"},null,8,Eh)],!0)],!0)])):S("",!0),e.title||e.subtitle||e.tag||t.$slots.header?(r(),d("div",Dh,[R(t.$slots,"header",{},()=>[e.tag?(r(),d("div",Bh,y(e.tag),1)):S("",!0),e.title?(r(),d("h3",Rh,y(e.title),1)):S("",!0),e.subtitle?(r(),d("p",Oh,y(e.subtitle),1)):S("",!0)],!0)])):S("",!0),e.description||t.$slots.default?(r(),d("div",Fh,[R(t.$slots,"default",{},()=>[z(y(e.description),1)],!0)])):S("",!0),(t.$slots.footer||t.$slots.actions)&&e.showActions?(r(),d("div",_h,[R(t.$slots,"actions",{},()=>[R(t.$slots,"footer",{},void 0,!0)],!0)])):S("",!0)]),_:3},8,["href","class"]))}},st=W(jh,[["__scopeId","data-v-38f39dfb"]]),Hh={class:"id-project-section"},Uh={key:0,class:"section-header"},qh={class:"header-left"},Gh={key:0,class:"header-icon-badge"},Wh={key:0},Kh={class:"section-title"},Jh=["href"],Yh={class:"section-body"},Qh={__name:"IdProjectSection",props:{title:{type:String,default:"Featured Projects"},icon:{type:[String,Object,Function],default:"📁"},actionLabel:String,actionHref:String},emits:["action-click"],setup(e){return(t,s)=>(r(),d("div",Hh,[e.title||t.$slots.header?(r(),d("div",Uh,[R(t.$slots,"header",{},()=>[o("div",qh,[e.icon||t.$slots.icon?(r(),d("div",Gh,[R(t.$slots,"icon",{},()=>[typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Wh,y(e.icon),1)):(r(),O(Ce(e.icon),{key:1,size:18}))],!0)])):S("",!0),o("h3",Kh,y(e.title),1)]),R(t.$slots,"action",{},()=>[e.actionHref||e.actionLabel?(r(),d("a",{key:0,href:e.actionHref||"#",class:"section-action-btn","aria-label":"View all projects"},[o("span",null,y(e.actionLabel),1),g(D(ri),{size:16})],8,Jh)):(r(),d("button",{key:1,type:"button",class:"section-action-btn","aria-label":"Action",onClick:s[0]||(s[0]=a=>t.$emit("action-click"))},[g(D(ri),{size:16})]))],!0)])])):S("",!0),o("div",Yh,[R(t.$slots,"default",{},void 0)])]))}},Zh=W(Qh,[["__scopeId","data-v-eff4eb65"]]),Xh=["src","alt"],e1={key:1,class:"project-logo-emoji"},t1={key:2,class:"project-logo-fallback"},s1={class:"project-content"},a1={class:"project-title-row"},i1={class:"project-title"},n1={key:0,class:"project-description"},o1={key:1,class:"project-tech-row"},l1=["title"],r1=["src","alt"],d1={key:1},c1=["src"],u1={key:2,class:"tech-text"},p1={class:"project-action"},f1={__name:"IdProjectCard",props:{title:{type:String,required:!0},description:String,badge:String,badgeVariant:{type:String,default:"success",validator:e=>["success","warning","info","accent","purple","neutral"].includes(e)},logo:String,logoBg:String,techStack:{type:Array,default:()=>[]},href:String,interactive:{type:Boolean,default:!0}},emits:["click"],setup(e){return(t,s)=>(r(),O(Ce(e.href?"a":"div"),{href:e.href,class:E(["id-project-card",{"is-interactive":e.interactive||e.href}]),onClick:s[0]||(s[0]=a=>t.$emit("click",a))},{default:A(()=>[o("div",{class:"project-logo-wrap",style:ze(e.logoBg?{background:e.logoBg}:{})},[R(t.$slots,"logo",{},()=>[e.logo&&(e.logo.startsWith("http")||e.logo.startsWith("/"))?(r(),d("img",{key:0,src:e.logo,alt:e.title,class:"project-logo-img"},null,8,Xh)):e.logo?(r(),d("span",e1,y(e.logo),1)):(r(),d("span",t1,y(e.title?e.title[0].toUpperCase():"P"),1))],!0)],4),o("div",s1,[o("div",a1,[o("h4",i1,y(e.title),1),R(t.$slots,"badge",{},()=>[e.badge?(r(),d("span",{key:0,class:E(["project-badge",`badge-${e.badgeVariant}`])},[s[1]||(s[1]=o("span",{class:"badge-dot"},null,-1)),z(" "+y(e.badge),1)],2)):S("",!0)],!0)]),e.description||t.$slots.default?(r(),d("p",n1,[R(t.$slots,"default",{},()=>[z(y(e.description),1)],!0)])):S("",!0),e.techStack&&e.techStack.length>0||t.$slots.tech?(r(),d("div",o1,[R(t.$slots,"tech",{},()=>[(r(!0),d(Y,null,ue(e.techStack,(a,n)=>(r(),d("div",{key:n,class:"tech-icon-pill",title:typeof a=="object"?a.name:a},[typeof a=="object"&&a.icon?(r(),d("img",{key:0,src:a.icon,alt:a.name||"tech"},null,8,r1)):typeof a=="string"&&(a.startsWith("http")||a.startsWith("/"))?(r(),d("span",d1,[o("img",{src:a,alt:"tech"},null,8,c1)])):(r(),d("span",u1,y(typeof a=="object"?a.name:a),1))],8,l1))),128))],!0)])):S("",!0)]),o("div",p1,[R(t.$slots,"action",{},()=>[g(D(Ws),{size:20,class:"chevron-icon"})],!0)])]),_:3},8,["href","class"]))}},Ja=W(f1,[["__scopeId","data-v-32e9a2a5"]]),m1={class:"frame-bezel"},v1=["src","alt"],g1={key:0,class:"frame-caption"},h1={__name:"IdImageFrame",props:{src:String,alt:String,aspectRatio:{type:String,default:"1-1",validator:e=>["1-1","16-9","4-3","3-4","21-9","auto"].includes(e)},shape:{type:String,default:"squircle",validator:e=>["squircle","circle"].includes(e)},bezelSize:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},maxWidth:String,caption:String,interactive:Boolean},setup(e){return(t,s)=>(r(),d("div",{class:E(["id-image-frame",`shape-${e.shape}`,`bezel-${e.bezelSize}`,`aspect-${e.aspectRatio.replace("/","-")}`,{"is-interactive":e.interactive}]),style:ze(e.maxWidth?{maxWidth:e.maxWidth}:{})},[o("div",m1,[R(t.$slots,"default",{},()=>[e.src?(r(),d("img",{key:0,src:e.src,alt:e.alt||"Framed image",class:"frame-img"},null,8,v1)):S("",!0)])]),e.caption||t.$slots.caption?(r(),d("div",g1,[R(t.$slots,"caption",{},()=>[z(y(e.caption),1)])])):S("",!0)],6))}},b1=W(h1,[["__scopeId","data-v-e009a7c9"]]),y1={class:"id-carousel-wrap"},$1={key:0,class:"carousel-controls"},k1={key:0,class:"carousel-dots"},x1=["onClick"],w1={__name:"IdCarousel",props:{showControls:{type:Boolean,default:!0},showDots:{type:Boolean,default:!0}},setup(e){const t=B(null),s=B(0),a=B(0),n=()=>{t.value&&(a.value=t.value.children.length)},i=()=>{if(!t.value||a.value===0)return;const f=t.value,p=f.scrollWidth/a.value;s.value=Math.round(f.scrollLeft/p)},l=f=>{if(!t.value||a.value===0)return;const p=t.value,h=p.scrollWidth/a.value;p.scrollTo({left:h*f,behavior:"smooth"})},c=()=>{l(Math.min(s.value+1,a.value-1))},u=()=>{l(Math.max(s.value-1,0))};return tt(()=>{n(),window.addEventListener("resize",n)}),qs(()=>{window.removeEventListener("resize",n)}),(f,p)=>(r(),d("div",y1,[o("div",{ref_key:"trackRef",ref:t,class:"carousel-track",onScroll:i},[R(f.$slots,"default",{},void 0)],544),e.showControls?(r(),d("div",$1,[o("button",{type:"button",class:"nav-btn prev","aria-label":"Previous slide",onClick:u},"‹"),e.showDots&&a.value>0?(r(),d("div",k1,[(r(!0),d(Y,null,ue(a.value,h=>(r(),d("span",{key:h,class:E(["dot",{active:s.value===h-1}]),onClick:k=>l(h-1)},null,10,x1))),128))])):S("",!0),o("button",{type:"button",class:"nav-btn next","aria-label":"Next slide",onClick:c},"›")])):S("",!0)]))}},C1=W(w1,[["__scopeId","data-v-1dae7e2b"]]),S1={key:0,class:"macos-banner",role:"alert","aria-live":"polite"},I1={class:"banner-header"},A1={class:"banner-app"},z1={key:1},T1=["src"],V1={class:"app-name"},M1={class:"banner-time"},N1={class:"banner-body"},P1={class:"banner-title"},L1={key:0,class:"banner-message"},E1={key:0,class:"banner-actions"},D1={__name:"IdMacOsBanner",props:{modelValue:{type:Boolean,default:!0},appName:{type:String,default:"System Settings"},title:{type:String,default:"Software Update Ready"},message:{type:String,default:""},time:{type:String,default:"now"},icon:[String,Object,Function],iconBg:String,actionLabel:String,secondaryActionLabel:String,dismissible:{type:Boolean,default:!0}},emits:["update:modelValue","dismiss","action","secondary-action"],setup(e){return(t,s)=>(r(),O(qe,{name:"banner-slide"},{default:A(()=>[e.modelValue?(r(),d("div",S1,[o("div",I1,[o("div",A1,[o("div",{class:"app-icon",style:ze(e.iconBg?{background:e.iconBg,color:"#fff"}:{})},[R(t.$slots,"icon",{},()=>[e.icon&&typeof e.icon!="string"?(r(),O(Ce(e.icon),{key:0,size:13})):typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",z1,y(e.icon),1)):typeof e.icon=="string"&&(e.icon.startsWith("http")||e.icon.startsWith("/"))?(r(),d("img",{key:2,src:e.icon,alt:"icon",class:"app-icon-img"},null,8,T1)):(r(),O(D(Jo),{key:3,size:13}))],!0)],4),o("span",V1,y(e.appName),1)]),o("span",M1,y(e.time),1)]),o("div",N1,[o("h4",P1,y(e.title),1),e.message?(r(),d("p",L1,y(e.message),1)):S("",!0)]),t.$slots.actions||e.actionLabel||e.secondaryActionLabel||e.dismissible?(r(),d("div",E1,[R(t.$slots,"actions",{},()=>[e.secondaryActionLabel?(r(),d("button",{key:0,type:"button",class:"banner-btn",onClick:s[0]||(s[0]=a=>t.$emit("secondary-action"))},y(e.secondaryActionLabel),1)):S("",!0),e.actionLabel?(r(),d("button",{key:1,type:"button",class:"banner-btn primary",onClick:s[1]||(s[1]=a=>t.$emit("action"))},y(e.actionLabel),1)):S("",!0),e.dismissible&&!e.secondaryActionLabel?(r(),d("button",{key:2,type:"button",class:"banner-btn",onClick:s[2]||(s[2]=a=>{t.$emit("dismiss"),t.$emit("update:modelValue",!1)})}," Dismiss ")):S("",!0)],!0)])):S("",!0)])):S("",!0)]),_:3}))}},B1=W(D1,[["__scopeId","data-v-e1895424"]]),R1={class:"id-file-tree",role:"tree"},O1=["aria-expanded","onClick"],F1=["onClick"],_1={key:1,class:"toggle-placeholder"},j1={class:"node-icon"},H1={class:"node-name"},U1={key:0,class:"tree-children"},q1={__name:"IdFileTree",props:{items:{type:Array,required:!0},selectedId:[String,Number],expandedIds:{type:Array,default:()=>[]}},emits:["select","toggle-expand"],setup(e,{emit:t}){const s=t,a=i=>{s("select",i)},n=i=>{s("toggle-expand",i)};return(i,l)=>{const c=mr("IdFileTree",!0);return r(),d("div",R1,[(r(!0),d(Y,null,ue(e.items,u=>(r(),d("div",{key:u.id||u.name,class:"tree-node-wrap"},[o("div",{class:E(["tree-row",{"is-selected":e.selectedId===u.id}]),role:"treeitem","aria-expanded":u.children?e.expandedIds.includes(u.id):void 0,onClick:f=>a(u)},[u.children?(r(),d("button",{key:0,type:"button",class:E(["toggle-btn",{"is-open":e.expandedIds.includes(u.id)}]),onClick:Se(f=>n(u.id),["stop"])}," › ",10,F1)):(r(),d("span",_1)),o("span",j1,[R(i.$slots,"icon",{item:u},()=>[u.children?(r(),d(Y,{key:0},[z("📁")],64)):u.name.endsWith(".js")||u.name.endsWith(".ts")?(r(),d(Y,{key:1},[z("⚡")],64)):u.name.endsWith(".vue")?(r(),d(Y,{key:2},[z("💚")],64)):u.name.endsWith(".css")?(r(),d(Y,{key:3},[z("🎨")],64)):(r(),d(Y,{key:4},[z("📄")],64))])]),o("span",H1,y(u.name),1)],10,O1),u.children&&e.expandedIds.includes(u.id)?(r(),d("div",U1,[g(c,{items:u.children,"selected-id":e.selectedId,"expanded-ids":e.expandedIds,onSelect:l[0]||(l[0]=f=>i.$emit("select",f)),onToggleExpand:l[1]||(l[1]=f=>i.$emit("toggle-expand",f))},null,8,["items","selected-id","expanded-ids"])])):S("",!0)]))),128))])}}},G1=W(q1,[["__scopeId","data-v-0ead9e32"]]),W1={key:0,class:"popover-content"},K1={key:0,class:"popover-title"},J1={key:1,class:"popover-subtitle"},Y1={key:2,class:"popover-body"},Q1={__name:"IdPopover",props:{position:{type:String,default:"bottom",validator:e=>["top","bottom","left","right"].includes(e)},title:String,subtitle:String,content:String,body:String,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass"].includes(e)}},setup(e){const t=B(!1),s=B(null),a=()=>{t.value=!t.value},n=i=>{s.value&&!s.value.contains(i.target)&&(t.value=!1)};return tt(()=>document.addEventListener("click",n)),Xt(()=>document.removeEventListener("click",n)),(i,l)=>(r(),d("div",{ref_key:"wrapperRef",ref:s,class:"id-popover-wrapper"},[o("div",{class:"trigger-wrap",onClick:a},[R(i.$slots,"trigger",{},void 0)]),g(qe,{name:"popover-fade"},{default:A(()=>[t.value?(r(),d("div",{key:0,class:E(["popover-card",`position-${e.position}`,`size-${e.size}`,`variant-${e.variant}`]),role:"dialog"},[e.title||e.subtitle||e.content||e.body?(r(),d("div",W1,[e.title?(r(),d("div",K1,y(e.title),1)):S("",!0),e.subtitle?(r(),d("div",J1,y(e.subtitle),1)):S("",!0),e.content||e.body?(r(),d("div",Y1,y(e.content||e.body),1)):S("",!0),R(i.$slots,"default",{},void 0,!0)])):R(i.$slots,"default",{},void 0,!0,1)],2)):S("",!0)]),_:3})],512))}},Z1=W(Q1,[["__scopeId","data-v-388f5930"]]),X1={class:"dock-container"},eb={key:0,class:"dock-separator"},tb=["aria-label","onClick"],sb={class:"dock-tooltip"},ab={key:1,class:"item-emoji"},ib={key:2,class:"item-letter"},nb={key:0,class:"dock-dot"},ob={__name:"IdDock",props:{items:{type:Array,required:!0},activeId:[String,Number],position:{type:String,default:"bottom",validator:e=>["bottom","top"].includes(e)}},emits:["select"],setup(e){return(t,s)=>(r(),d("div",{class:E(["id-dock-wrap",`position-${e.position}`]),role:"toolbar","aria-label":"macOS Dock"},[o("div",X1,[(r(!0),d(Y,null,ue(e.items,(a,n)=>(r(),d("div",{key:a.id||n,class:"dock-item-wrapper"},[a.separator?(r(),d("div",eb)):(r(),d("button",{key:1,type:"button",class:E(["dock-item",{"is-active":e.activeId===a.id}]),"aria-label":a.label,onClick:i=>t.$emit("select",a)},[o("span",sb,y(a.label),1),o("div",{class:"icon-squircle",style:ze(a.iconBg?{background:a.iconBg,color:"#fff"}:{})},[R(t.$slots,"icon",{item:a},()=>[a.icon&&typeof a.icon!="string"?(r(),O(Ce(a.icon),{key:0,size:20})):typeof a.icon=="string"&&a.icon.length<=4?(r(),d("span",ab,y(a.icon),1)):(r(),d("span",ib,y(a.label?a.label[0].toUpperCase():"A"),1))])],4),a.active||e.activeId===a.id?(r(),d("span",nb)):S("",!0)],10,tb))]))),128))])],2))}},lb=W(ob,[["__scopeId","data-v-4c1f2d0c"]]),rb={class:"avatars-container"},db=["onClick"],cb={key:0,class:"group-label"},ub={__name:"IdAvatarGroup",props:{users:{type:Array,required:!0},max:{type:Number,default:4},size:{type:String,default:"md",validator:e=>["xs","sm","md","lg","xl"].includes(e)},shape:{type:String,default:"circle",validator:e=>["circle","squircle"].includes(e)},variant:{type:String,default:"stacked",validator:e=>["stacked","grid","hero","expanded"].includes(e)},direction:{type:String,default:"row",validator:e=>["row","column"].includes(e)},framed:{type:Boolean,default:!1},interactive:{type:Boolean,default:!0},label:String},emits:["click-avatar","click-overflow"],setup(e){const t=e,s=Z(()=>t.users.slice(0,t.max)),a=Z(()=>Math.max(0,t.users.length-t.max));return(n,i)=>(r(),d("div",{class:E(["id-avatar-group",`variant-${e.variant}`,`dir-${e.direction}`,`size-${e.size}`,{"is-interactive":e.interactive}]),role:"group","aria-label":"Avatar group"},[o("div",rb,[(r(!0),d(Y,null,ue(s.value,(l,c)=>(r(),d("div",{key:l.id||c,class:"avatar-item",style:ze(e.variant==="stacked"?{zIndex:s.value.length-c}:{}),onClick:u=>e.interactive&&n.$emit("click-avatar",l,c)},[g(Qt,{src:l.src,name:l.name,size:e.size,shape:e.shape,framed:e.framed,status:l.status},null,8,["src","name","size","shape","framed","status"])],12,db))),128)),a.value>0?(r(),d("div",{key:0,class:E(["avatar-overflow",`size-${e.size}`,`shape-${e.shape}`,{"is-framed":e.framed}]),onClick:i[0]||(i[0]=l=>e.interactive&&n.$emit("click-overflow",a.value))},[R(n.$slots,"overflow",{count:a.value},()=>[z(" +"+y(a.value),1)])],2)):S("",!0)]),e.label||n.$slots.label?(r(),d("div",cb,[R(n.$slots,"label",{},()=>[o("span",null,y(e.label),1)])])):S("",!0)],2))}},nl=W(ub,[["__scopeId","data-v-54a3a7d0"]]),pb=["width","height"],fb={key:0},mb=["id"],vb=["stop-color"],gb=["stop-color"],hb=["d","fill"],bb=["d","stroke","stroke-width"],yb={__name:"IdSparkline",props:{data:{type:Array,default:()=>[10,25,18,35,28,45,40,60]},color:{type:String,default:"#0071e3"},fill:{type:Boolean,default:!0},width:{type:Number,default:120},height:{type:Number,default:36},strokeWidth:{type:Number,default:2.5}},setup(e){const t=e,s=Z(()=>`spark-grad-${Math.random().toString(36).substr(2,9)}`),a=Z(()=>{if(!t.data||t.data.length===0)return[];const l=Math.max(...t.data,1),c=Math.min(...t.data,0),u=l-c||1,f=100/(t.data.length-1||1);return t.data.map((p,h)=>{const k=h*f,w=35-(p-c)/u*30;return{x:k,y:w}})}),n=Z(()=>a.value.length===0?"":a.value.reduce((l,c,u)=>`${l} ${u===0?"M":"L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`,"")),i=Z(()=>{if(a.value.length===0)return"";const l=a.value[0].x.toFixed(1),c=a.value[a.value.length-1].x.toFixed(1);return`${n.value} L ${c} 40 L ${l} 40 Z`});return(l,c)=>(r(),d("div",{class:"id-sparkline",style:ze({width:`${e.width}px`,height:`${e.height}px`})},[(r(),d("svg",{width:e.width,height:e.height,viewBox:"0 0 100 40",preserveAspectRatio:"none"},[e.fill?(r(),d("defs",fb,[o("linearGradient",{id:s.value,x1:"0",y1:"0",x2:"0",y2:"1"},[o("stop",{offset:"0%","stop-color":e.color,"stop-opacity":"0.3"},null,8,vb),o("stop",{offset:"100%","stop-color":e.color,"stop-opacity":"0"},null,8,gb)],8,mb)])):S("",!0),e.fill?(r(),d("path",{key:1,d:i.value,fill:`url(#${s.value})`},null,8,hb)):S("",!0),o("path",{d:n.value,fill:"none",stroke:e.color,"stroke-width":e.strokeWidth,"stroke-linecap":"round","stroke-linejoin":"round"},null,8,bb)],8,pb))],4))}},$b=W(yb,[["__scopeId","data-v-6462bb44"]]),kb={class:"stat-header"},xb={class:"stat-label"},wb={class:"stat-value-group"},Cb={class:"stat-value"},Sb={key:0,class:"stat-unit"},Ib={key:0,class:"stat-desc"},Ab={key:1,class:"stat-sparkline"},zb={__name:"IdStat",props:{label:{type:String,required:!0},value:{type:[String,Number],required:!0},unit:String,change:String,changeType:{type:String,default:"positive",validator:e=>["positive","negative","neutral"].includes(e)},description:String,sparklineData:Array,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass","hero"].includes(e)}},setup(e){const t=e,s=Z(()=>t.size==="sm"?28:t.size==="lg"?48:38),a=Z(()=>t.changeType==="positive"?"#34c759":t.changeType==="negative"?"#ff3b30":"#0071e3");return(n,i)=>(r(),d("div",{class:E(["id-stat-card",`size-${e.size}`,`variant-${e.variant}`])},[o("div",kb,[o("span",xb,y(e.label),1),e.change?(r(),d("span",{key:0,class:E(["stat-badge",e.changeType])},y(e.change),3)):S("",!0)]),o("div",wb,[o("span",Cb,y(e.value),1),e.unit?(r(),d("span",Sb,y(e.unit),1)):S("",!0)]),e.description?(r(),d("p",Ib,y(e.description),1)):S("",!0),e.sparklineData&&e.sparklineData.length?(r(),d("div",Ab,[g($b,{data:e.sparklineData,color:a.value,height:s.value},null,8,["data","color","height"])])):S("",!0)],2))}},Cs=W(zb,[["__scopeId","data-v-e319ae34"]]),Tb={class:"id-empty-state"},Vb={class:"empty-icon-box"},Mb={key:0,class:"default-icon"},Nb=["src"],Pb={class:"empty-title"},Lb={key:0,class:"empty-desc"},Eb={key:1,class:"empty-action"},Db={__name:"IdEmpty",props:{title:{type:String,default:"No Results Found"},description:{type:String,default:"Try adjusting your search filters or create a new item."},icon:{type:[String,Object,Function],default:"🔍"},actionLabel:String},emits:["action","click"],setup(e){return(t,s)=>(r(),d("div",Tb,[o("div",Vb,[R(t.$slots,"icon",{},()=>[typeof e.icon=="string"&&e.icon.length<=4?(r(),d("span",Mb,y(e.icon),1)):typeof e.icon=="string"&&(e.icon.startsWith("http")||e.icon.startsWith("/"))?(r(),d("img",{key:1,src:e.icon,alt:"icon",class:"empty-icon-img"},null,8,Nb)):(r(),O(Ce(e.icon),{key:2,size:28,class:"empty-icon-svg"}))])]),o("h3",Pb,y(e.title),1),e.description?(r(),d("p",Lb,y(e.description),1)):S("",!0),t.$slots.action||e.actionLabel?(r(),d("div",Eb,[R(t.$slots,"action",{},()=>[g(oe,{variant:"primary",size:"md",onClick:s[0]||(s[0]=a=>{t.$emit("action",a),t.$emit("click",a)})},{default:A(()=>[z(y(e.actionLabel),1)]),_:1})])])):S("",!0)]))}},Bb=W(Db,[["__scopeId","data-v-53cd5804"]]),$s=B([]);let Rb=0;function fs(){const e=(c,u={})=>{const f=++Rb,p={id:f,message:typeof c=="string"?c:u.message||"",title:typeof c=="object"?c.title:u.title||c,description:typeof c=="object"?c.description:u.description,type:u.type||u.variant||(typeof c=="object"?c.type:"info"),duration:u.duration!==void 0?u.duration:3500,actionLabel:u.actionLabel,onAction:u.onAction,dismissible:u.dismissible!==!1,icon:u.icon};return $s.value.push(p),p.duration>0&&setTimeout(()=>t(f),p.duration),f},t=c=>{$s.value=$s.value.filter(u=>u.id!==c)};return{toasts:sa($s),add:e,remove:t,clear:()=>{$s.value=[]},success:(c,u)=>e(c,{...u,type:"success"}),error:(c,u)=>e(c,{...u,type:"error"}),info:(c,u)=>e(c,{...u,type:"info"}),warning:(c,u)=>e(c,{...u,type:"warning"})}}const Ob={class:"toast-icon"},Fb={class:"toast-body"},_b={class:"toast-title"},jb={key:0,class:"toast-desc"},Hb=["onClick"],Ub=["onClick"],qb={__name:"IdToast",props:{position:{type:String,default:"bottom-center",validator:e=>["bottom-center","bottom-right","top-center","top-right"].includes(e)}},setup(e){const{toasts:t,remove:s}=fs();return(a,n)=>(r(),O(Zt,{to:"body"},[o("div",{class:E(["id-toast-container",`pos-${e.position}`])},[g(Id,{name:"toast-list"},{default:A(()=>[(r(!0),d(Y,null,ue(D(t),i=>(r(),d("div",{key:i.id,class:E(["id-toast-item",`toast-${i.type||"info"}`]),role:"status","aria-live":"polite"},[o("div",Ob,[i.type==="success"?(r(),O(D(Zo),{key:0,size:18})):i.type==="info"?(r(),O(D(Ai),{key:1,size:18})):i.type==="warning"?(r(),O(D(Ti),{key:2,size:18})):i.type==="error"||i.type==="danger"?(r(),O(D(Xo),{key:3,size:18})):i.icon?(r(),O(Ce(i.icon),{key:4,size:18})):S("",!0)]),o("div",Fb,[o("div",_b,y(i.title||i.message),1),i.description?(r(),d("div",jb,y(i.description),1)):S("",!0)]),i.actionLabel?(r(),d("button",{key:0,type:"button",class:"toast-action-btn",onClick:l=>i.onAction?i.onAction(i):D(s)(i.id)},y(i.actionLabel),9,Hb)):S("",!0),i.dismissible!==!1?(r(),d("button",{key:1,type:"button",class:"toast-close-btn","aria-label":"Close notification",onClick:l=>D(s)(i.id)},[g(D(nt),{size:14})],8,Ub)):S("",!0)],2))),128))]),_:1})],2)]))}},Gb=W(qb,[["__scopeId","data-v-43b8ae04"]]),Wb=["onClick"],Kb={class:"step-indicator"},Jb={key:2},Yb={key:3},Qb={class:"step-content"},Zb={class:"step-label"},Xb={key:0,class:"step-desc"},ey={key:0,class:"step-connector"},ty={__name:"IdStepper",props:{steps:{type:Array,required:!0},modelValue:{type:Number,default:0},clickable:Boolean,size:{type:String,default:"md",validator:e=>["sm","md","lg"].includes(e)},variant:{type:String,default:"default",validator:e=>["default","glass"].includes(e)},color:{type:String,default:"blue",validator:e=>["blue","green","purple","orange"].includes(e)}},emits:["update:modelValue"],setup(e){const t=e,s=Z(()=>t.size==="sm"?13:t.size==="lg"?18:15);return(a,n)=>(r(),d("div",{class:E(["id-stepper",`size-${e.size}`,`variant-${e.variant}`,`color-${e.color}`]),role:"navigation","aria-label":"Progress steps"},[(r(!0),d(Y,null,ue(e.steps,(i,l)=>(r(),d("div",{key:l,class:E(["step-item",{"is-active":l===e.modelValue,"is-completed":l<e.modelValue,"is-clickable":e.clickable}]),onClick:c=>e.clickable&&a.$emit("update:modelValue",l)},[o("div",Kb,[l<e.modelValue?(r(),O(D(Yo),{key:0,size:s.value,class:"check-icon"},null,8,["size"])):i.icon&&typeof i.icon!="string"?(r(),O(Ce(i.icon),{key:1,size:s.value},null,8,["size"])):typeof i.icon=="string"?(r(),d("span",Jb,y(i.icon),1)):(r(),d("span",Yb,y(l+1),1))]),o("div",Qb,[o("span",Zb,y(i.label||i),1),i.description?(r(),d("span",Xb,y(i.description),1)):S("",!0)]),l<e.steps.length-1?(r(),d("div",ey)):S("",!0)],10,Wb))),128))],2))}},sy=W(ty,[["__scopeId","data-v-0efe6475"]]),ay={class:"id-timeline"},iy={class:"timeline-left"},ny={class:"timeline-dot-wrap"},oy={key:1,class:"timeline-str"},ly={key:2,class:"timeline-dot"},ry={key:0,class:"timeline-line"},dy={class:"timeline-content"},cy={class:"timeline-header"},uy={class:"timeline-title"},py={key:0,class:"timeline-time"},fy={key:0,class:"timeline-desc"},my={__name:"IdTimeline",props:{items:{type:Array,required:!0}},setup(e){return(t,s)=>(r(),d("div",ay,[(r(!0),d(Y,null,ue(e.items,(a,n)=>(r(),d("div",{key:n,class:E(["timeline-item",`variant-${a.variant||"default"}`])},[o("div",iy,[o("div",ny,[a.icon&&typeof a.icon!="string"?(r(),O(Ce(a.icon),{key:0,size:14,class:"timeline-icon"})):typeof a.icon=="string"?(r(),d("span",oy,y(a.icon),1)):(r(),d("span",ly))]),n<e.items.length-1?(r(),d("div",ry)):S("",!0)]),o("div",dy,[o("div",cy,[o("h4",uy,y(a.title),1),a.time?(r(),d("span",py,y(a.time),1)):S("",!0)]),a.description?(r(),d("p",fy,y(a.description),1)):S("",!0)])],2))),128))]))}},vy=W(my,[["__scopeId","data-v-8e78b913"]]),gy={__name:"IdGrid",props:{cols:{type:[Number,String],default:3},gap:{type:[Number,String],default:"20px"},minColWidth:{type:String,default:"280px"},autoFit:Boolean},setup(e){const t=e,s=Z(()=>{if(t.autoFit)return`repeat(auto-fit, minmax(${t.minColWidth}, 1fr))`;const n=Number(t.cols);return isNaN(n)?t.cols:`repeat(${n}, minmax(0, 1fr))`}),a=Z(()=>typeof t.gap=="number"?`${t.gap}px`:t.gap==="sm"?"12px":t.gap==="md"?"20px":t.gap==="lg"?"32px":t.gap);return(n,i)=>(r(),d("div",{class:"id-grid",style:ze({gridTemplateColumns:s.value,gap:a.value})},[R(n.$slots,"default",{},void 0)],4))}},hy=W(gy,[["__scopeId","data-v-0cf36656"]]),by={class:"bars-container"},yy={class:"bar-track"},$y={class:"bar-tooltip"},ky={class:"bar-label"},xy={__name:"IdBarChart",props:{data:{type:Array,required:!0},height:{type:[Number,String],default:180},color:String,max:Number},setup(e){const t=e,s=Z(()=>t.max?t.max:!t.data||!t.data.length?100:Math.max(...t.data.map(n=>n.value),1)),a=n=>Math.min(100,Math.max(0,n/s.value*100));return(n,i)=>(r(),d("div",{class:"id-bar-chart",style:ze({height:typeof e.height=="number"?`${e.height}px`:e.height})},[o("div",by,[(r(!0),d(Y,null,ue(e.data,(l,c)=>(r(),d("div",{key:c,class:"bar-item-group"},[o("div",yy,[o("div",{class:"bar-fill",style:ze({height:`${a(l.value)}%`,background:l.color||e.color||"var(--accent)"})},[o("span",$y,y(l.value),1)],4)]),o("span",ky,y(l.label),1)]))),128))])],4))}},wy=W(xy,[["__scopeId","data-v-0763b2ca"]]),Cy={class:"id-pie-chart"},Sy={class:"donut-wrapper"},Iy={viewBox:"0 0 100 100",class:"donut-svg"},Ay=["stroke","stroke-dasharray","stroke-dashoffset"],zy={class:"donut-center"},Ty={class:"donut-total"},Vy={class:"donut-label"},My={class:"pie-legend"},Ny={class:"legend-name"},Py={class:"legend-val"},Ly={__name:"IdPieChart",props:{data:{type:Array,required:!0},centerLabel:String},setup(e){const t=e,s=["#0071e3","#30d158","#af52de","#ff9f0a","#ff3b30","#5e5ce6"],a=Z(()=>!t.data||!t.data.length?0:t.data.reduce((i,l)=>i+(Number(l.value)||0),0)),n=Z(()=>{const i=a.value||1;let l=0;const c=251.327;return t.data.map((u,f)=>{const h=(Number(u.value)||0)/i*c,k=l/i*c;return l+=Number(u.value)||0,{dash:h,offset:k,color:u.color||s[f%s.length]}})});return(i,l)=>(r(),d("div",Cy,[o("div",Sy,[(r(),d("svg",Iy,[(r(!0),d(Y,null,ue(n.value,(c,u)=>(r(),d("circle",{key:u,cx:"50",cy:"50",r:"40",fill:"transparent",stroke:c.color,"stroke-width":"16","stroke-dasharray":`${c.dash} ${100-c.dash}`,"stroke-dashoffset":-c.offset,class:"donut-segment"},null,8,Ay))),128))])),o("div",zy,[o("span",Ty,y(a.value),1),o("span",Vy,y(e.centerLabel||"Total"),1)])]),o("div",My,[(r(!0),d(Y,null,ue(e.data,(c,u)=>(r(),d("div",{key:u,class:"legend-item"},[o("span",{class:"legend-dot",style:ze({background:c.color||s[u%s.length]})},null,4),o("span",Ny,y(c.label),1),o("span",Py,y(c.value),1)]))),128))])]))}},Ey=W(Ly,[["__scopeId","data-v-06b947e3"]]),Dy=["aria-label"],By={class:"tour-header"},Ry={class:"tour-step-pill"},Oy={class:"step-counter"},Fy={key:0,class:"tour-step-media"},_y=["src","alt"],jy={key:1,class:"tour-visual-stage"},Hy={class:"visual-squircle-icon"},Uy={key:1,class:"step-icon-emoji"},qy={class:"tour-body"},Gy={class:"tour-title"},Wy={class:"tour-desc"},Ky={class:"tour-footer"},Jy={class:"tour-pills-nav",role:"tablist","aria-label":"Tour progress"},Yy=["aria-label","onClick"],Qy={class:"tour-action-group"},Zy={__name:"IdTour",props:{modelValue:{type:Boolean,default:!1},steps:{type:Array,default:()=>[{title:"Welcome to Idesign",description:"Explore our Apple-grade Liquid Glass Vue 3 component system with real-time reactive sandbox.",icon:"⚡",badge:"STEP 1 OF 3",nextLabel:"Explore System →"},{title:"Interactive Playground",description:"Customize component properties, toggle dark mode, and inspect SFC code snippets.",icon:"🎛️",badge:"STEP 2 OF 3",nextLabel:"View Export Options →"},{title:"Production Ready",description:"Export clean ESM/UMD modules or auto-import with Nuxt 3 in your Vue projects.",icon:"🚀",badge:"STEP 3 OF 3",finishLabel:"Get Started ✨"}]},activeStep:{type:Number,default:0},teleport:{type:Boolean,default:!0},dismissible:{type:Boolean,default:!0},nextLabel:{type:String,default:"Continue →"},finishLabel:{type:String,default:"Get Started ✨"},backLabel:{type:String,default:"Back"},skipLabel:{type:String,default:"Skip"}},emits:["update:modelValue","update:activeStep","change","finish","close"],setup(e,{emit:t}){const s=e,a=t,n=B(s.activeStep);Ct(()=>s.activeStep,w=>{n.value=w});const i=Z(()=>s.steps[n.value]||s.steps[0]||{title:"Step",description:""}),l=Z(()=>i.value.badge||`STEP ${n.value+1} OF ${s.steps.length}`),c=w=>{w>=0&&w<s.steps.length&&(n.value=w,a("update:activeStep",w),a("change",w))},u=()=>{n.value<s.steps.length-1&&c(n.value+1)},f=()=>{n.value>0&&c(n.value-1)},p=()=>{a("finish"),h()},h=()=>{a("update:modelValue",!1),a("close")},k=()=>{s.dismissible&&h()};return(w,m)=>(r(),O(Zt,{to:"body",disabled:!e.teleport},[g(qe,{name:"tour-fade"},{default:A(()=>[e.modelValue?(r(),d("div",{key:0,class:"id-tour-overlay",onClick:Se(k,["self"])},[m[3]||(m[3]=o("div",{class:"tour-backdrop"},null,-1)),o("div",{class:"tour-card",role:"dialog","aria-modal":"true","aria-label":i.value.title},[m[1]||(m[1]=o("div",{class:"tour-glow-orb orb-top"},null,-1)),m[2]||(m[2]=o("div",{class:"tour-glow-orb orb-bottom"},null,-1)),o("div",By,[o("div",Ry,[o("span",Oy,y(l.value),1)]),o("button",{type:"button",class:"tour-close-btn","aria-label":"Close tour",onClick:h},[...m[0]||(m[0]=[o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[o("path",{d:"M18 6L6 18M6 6l12 12"})],-1)])])]),i.value.image?(r(),d("div",Fy,[o("img",{src:i.value.image,alt:i.value.title,class:"tour-step-img"},null,8,_y)])):(r(),d("div",jy,[o("div",Hy,[R(w.$slots,"step-icon",{step:i.value,index:n.value},()=>[i.value.icon&&typeof i.value.icon!="string"?(r(),O(Ce(i.value.icon),{key:0,size:32,class:"step-icon-svg"})):i.value.icon?(r(),d("span",Uy,y(i.value.icon),1)):(r(),O(D(Ms),{key:2,size:32,class:"step-icon-svg"}))],!0)])])),o("div",qy,[o("h3",Gy,[R(w.$slots,"step-title",{step:i.value},()=>[z(y(i.value.title),1)],!0)]),o("p",Wy,[R(w.$slots,"step-description",{step:i.value},()=>[z(y(i.value.description),1)],!0)])]),o("div",Ky,[o("div",Jy,[(r(!0),d(Y,null,ue(e.steps,($,_)=>(r(),d("button",{key:_,type:"button",class:E(["page-pill",{active:_===n.value,completed:_<n.value}]),"aria-label":`Go to step ${_+1}`,onClick:T=>c(_)},null,10,Yy))),128))]),o("div",Qy,[n.value>0?(r(),d("button",{key:0,type:"button",class:"tour-btn btn-secondary",onClick:f},y(i.value.backLabel||i.value.secondaryLabel||e.backLabel),1)):S("",!0),o("button",{type:"button",class:"tour-btn btn-ghost",onClick:h},y(i.value.skipLabel||e.skipLabel),1),n.value<e.steps.length-1?(r(),d("button",{key:1,type:"button",class:"tour-btn btn-primary",onClick:u},y(i.value.nextLabel||i.value.primaryLabel||e.nextLabel),1)):(r(),d("button",{key:2,type:"button",class:"tour-btn btn-primary",onClick:p},y(i.value.finishLabel||i.value.primaryLabel||e.finishLabel),1))])])],8,Dy)])):S("",!0)]),_:3})],8,["disabled"]))}},Xy=W(Zy,[["__scopeId","data-v-968cafd4"]]),e0={class:"template-hero-page"},t0={class:"glass-nav-bar"},s0={class:"nav-actions"},a0={class:"hero-section"},i0={class:"hero-content"},n0={class:"hero-cta-buttons"},o0={class:"features-section"},l0={class:"section-head"},r0={class:"features-grid"},d0={__name:"HeroTemplate",setup(e){return(t,s)=>(r(),d("div",e0,[o("header",t0,[s[2]||(s[2]=Ge('<div class="nav-brand" data-v-785589c4><span class="brand-logo" data-v-785589c4>✦</span><span class="brand-title" data-v-785589c4>AURA AI</span></div><nav class="nav-links" data-v-785589c4><a href="#features" data-v-785589c4>Features</a><a href="#pricing" data-v-785589c4>Pricing</a><a href="#developers" data-v-785589c4>Developers</a></nav>',2)),o("div",s0,[g(oe,{variant:"glass",size:"sm"},{default:A(()=>[...s[0]||(s[0]=[z("Sign In",-1)])]),_:1}),g(oe,{variant:"primary",size:"sm"},{default:A(()=>[...s[1]||(s[1]=[z("Get Started →",-1)])]),_:1})])]),o("section",a0,[s[9]||(s[9]=o("div",{class:"ambient-orb orb-1"},null,-1)),s[10]||(s[10]=o("div",{class:"ambient-orb orb-2"},null,-1)),o("div",i0,[g(at,{variant:"accent","icon-left":"⚡",class:"hero-pill"},{default:A(()=>[...s[3]||(s[3]=[z(" ANNOUNCING AURA SPATIAL 2.0 ",-1)])]),_:1}),s[6]||(s[6]=o("h1",{class:"hero-title"},[z(" Intelligence, "),o("br"),o("span",{class:"gradient-text"},"Designed for Vision.")],-1)),s[7]||(s[7]=o("p",{class:"hero-subtitle"}," Experience spatial AI workflows crafted with Apple liquid glass physics, 120fps fluid motion, and zero-latency local intelligence. ",-1)),o("div",n0,[g(oe,{variant:"primary",size:"lg","icon-right":D(ri)},{default:A(()=>[...s[4]||(s[4]=[z(" Start Free Trial ",-1)])]),_:1},8,["icon-right"]),g(oe,{variant:"glass",size:"lg","icon-left":D(Hc)},{default:A(()=>[...s[5]||(s[5]=[z(" Watch Keynote (2 min) ",-1)])]),_:1},8,["icon-left"])]),s[8]||(s[8]=Ge('<div class="hero-stats-grid" data-v-785589c4><div class="stat-box" data-v-785589c4><span class="stat-num" data-v-785589c4>99.8%</span><span class="stat-lbl" data-v-785589c4>Accuracy Score</span></div><div class="stat-divider" data-v-785589c4></div><div class="stat-box" data-v-785589c4><span class="stat-num" data-v-785589c4>&lt; 12ms</span><span class="stat-lbl" data-v-785589c4>Local Latency</span></div><div class="stat-divider" data-v-785589c4></div><div class="stat-box" data-v-785589c4><span class="stat-num" data-v-785589c4>4.9 ★</span><span class="stat-lbl" data-v-785589c4>Developer Rating</span></div></div>',1))])]),o("section",o0,[o("div",l0,[g(at,{variant:"mono"},{default:A(()=>[...s[11]||(s[11]=[z("ARCHITECTURE",-1)])]),_:1}),s[12]||(s[12]=o("h2",null,"Engineered for Apple Silicon",-1)),s[13]||(s[13]=o("p",null,"Built ground-up with Vue 3, Vite, and hardware-accelerated CSS tokens.",-1))]),o("div",r0,[g(st,{variant:"glass",title:"Neural Engine Sync",subtitle:"Metal 3 Acceleration",tag:"REALTIME",interactive:""},{actions:A(()=>[g(oe,{variant:"ghost",size:"sm"},{default:A(()=>[...s[14]||(s[14]=[z("Learn More →",-1)])]),_:1})]),default:A(()=>[s[15]||(s[15]=z(" Leverage unified memory architecture for instantaneous vector embedding calculations. ",-1))]),_:1}),g(st,{variant:"hero",title:"Liquid Glass Surfaces",subtitle:"180% Vibrancy Saturation",tag:"DESIGN SYSTEM",interactive:""},{actions:A(()=>[g(oe,{variant:"glass",size:"sm"},{default:A(()=>[...s[16]||(s[16]=[z("Explore Tokens →",-1)])]),_:1})]),default:A(()=>[s[17]||(s[17]=z(" Dynamic Gaussian blur surfaces with adaptive dark mode color token transitions. ",-1))]),_:1}),g(st,{variant:"glass",title:"End-to-End Encryption",subtitle:"Secure Enclave Guard",tag:"SECURITY",interactive:""},{actions:A(()=>[g(oe,{variant:"ghost",size:"sm"},{default:A(()=>[...s[18]||(s[18]=[z("Read Whitepaper →",-1)])]),_:1})]),default:A(()=>[s[19]||(s[19]=z(" Zero data leaves your Apple device without explicit biometric confirmation. ",-1))]),_:1})])])]))}},c0=W(d0,[["__scopeId","data-v-785589c4"]]),u0={class:"template-product-page"},p0={class:"store-header"},f0={class:"header-container"},m0={class:"header-controls"},v0={class:"cart-badge-wrap"},g0={class:"store-main"},h0={class:"product-grid"},b0={class:"product-card-body"},y0={class:"product-desc"},$0={class:"product-footer-row"},k0={class:"product-price"},x0={class:"product-actions"},w0={key:0,class:"modal-product-details"},C0=["src","alt"],S0={class:"modal-meta"},I0={class:"modal-desc"},A0={class:"modal-price"},z0={__name:"ProductShowcaseTemplate",setup(e){const t=fs(),s=B("All"),a=B(2),n=B(!1),i=B(!1),l=B(null),c=[{id:"1",category:"Hardware",name:"Apple Vision Pro",subtitle:"Spatial Computer",tag:"FLAGSHIP",price:"$3,499",image:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",desc:"Transforms how you work, watch, connect, and re-experience memories in spatial 3D.",fullDesc:"Apple Vision Pro seamlessly blends digital content with your physical space. You navigate simply by using your eyes, hands, and voice."},{id:"2",category:"Audio",name:"AirPods Max",subtitle:"Spatial Audio Headset",tag:"BESTSELLER",price:"$549",image:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",desc:"High-fidelity audio, Active Noise Cancellation, and personalized Spatial Audio.",fullDesc:"Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences."},{id:"3",category:"Accessories",name:"Magic Keyboard Touch ID",subtitle:"Wireless Keyboard",tag:"ACCESSIBLE",price:"$199",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",desc:"Delivers a remarkably comfortable and precise typing experience with Touch ID security.",fullDesc:"Wireless and rechargeable, with an incredibly long-lasting internal battery that powers your keyboard for a month or more between charges."},{id:"4",category:"Hardware",name:"Mac Studio M2 Ultra",subtitle:"Pro Workstation",tag:"PRO PERFORMANCE",price:"$3,999",image:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",desc:"Outrageous performance in an extensively compact footprint for pro studios.",fullDesc:"Mac Studio features 24-core CPU, up to 76-core GPU, and up to 192GB of unified memory with 800GB/s memory bandwidth."}],u=Z(()=>s.value==="All"?c:c.filter(h=>h.category===s.value)),f=h=>{a.value++,t.success(`Added ${h.name} to Bag`,{description:`${h.price} · Standard Free Delivery`})},p=h=>{l.value=h,i.value=!0};return(h,k)=>{var w,m;return r(),d("div",u0,[o("header",p0,[o("div",f0,[k[5]||(k[5]=o("div",{class:"store-title-group"},[o("h1",null,"Apple Vision Store"),o("p",null,"Explore spatial devices, accessories, and developer hardware.")],-1)),o("div",m0,[g(La,{modelValue:s.value,"onUpdate:modelValue":k[0]||(k[0]=$=>s.value=$),options:["All","Hardware","Audio","Accessories"],theme:"white"},null,8,["modelValue"]),o("div",v0,[g(oe,{variant:"glass","icon-left":D(Ka),onClick:k[1]||(k[1]=$=>n.value=!0)},{default:A(()=>[z(" Bag ("+y(a.value)+") ",1)]),_:1},8,["icon-left"])])])])]),o("main",g0,[o("div",h0,[(r(!0),d(Y,null,ue(u.value,$=>(r(),O(st,{key:$.id,variant:"image-top","image-aspect":"16-9",image:$.image,title:$.name,subtitle:$.subtitle,tag:$.tag,interactive:""},{default:A(()=>[o("div",b0,[o("p",y0,y($.desc),1),o("div",$0,[o("span",k0,y($.price),1),o("div",x0,[g(oe,{size:"sm",variant:"secondary",onClick:Se(_=>p($),["stop"])},{default:A(()=>[...k[6]||(k[6]=[z(" Quick View ",-1)])]),_:1},8,["onClick"]),g(oe,{size:"sm",variant:"primary","icon-left":D(Ka),onClick:Se(_=>f($),["stop"])},{default:A(()=>[...k[7]||(k[7]=[z(" Add ",-1)])]),_:1},8,["icon-left","onClick"])])])])]),_:2},1032,["image","title","subtitle","tag"]))),128))])]),g(Yt,{modelValue:i.value,"onUpdate:modelValue":k[4]||(k[4]=$=>i.value=$),title:(w=l.value)==null?void 0:w.name,subtitle:(m=l.value)==null?void 0:m.subtitle,teleport:!1},{actions:A(()=>[g(oe,{variant:"secondary",onClick:k[2]||(k[2]=$=>i.value=!1)},{default:A(()=>[...k[9]||(k[9]=[z("Close",-1)])]),_:1}),g(oe,{variant:"primary","icon-left":D(Ka),onClick:k[3]||(k[3]=$=>{f(l.value),i.value=!1})},{default:A(()=>{var $;return[z(" Add to Bag — "+y(($=l.value)==null?void 0:$.price),1)]}),_:1},8,["icon-left"])]),default:A(()=>[l.value?(r(),d("div",w0,[o("img",{src:l.value.image,alt:l.value.name,class:"modal-prod-img"},null,8,C0),o("div",S0,[g(at,{variant:"success","icon-left":"⚡"},{default:A(()=>[...k[8]||(k[8]=[z("IN STOCK · SHIPS TODAY",-1)])]),_:1}),o("p",I0,y(l.value.fullDesc||l.value.desc),1),o("span",A0,y(l.value.price),1)])])):S("",!0)]),_:1},8,["modelValue","title","subtitle"])])}}},T0=W(z0,[["__scopeId","data-v-23d745d6"]]),V0={class:"sidebar-header"},M0={class:"sidebar-brand"},N0={class:"chat-history-list"},P0={class:"history-group"},L0=["onClick"],E0={class:"chat-title"},D0={class:"history-group"},B0=["onClick"],R0={class:"chat-title"},O0={class:"sidebar-user-footer"},F0={class:"chat-main"},_0={class:"chat-header"},j0={class:"header-left"},H0={class:"model-picker"},U0={class:"header-right"},q0={class:"avatar-cell"},G0={key:1,class:"ai-avatar-box"},W0={class:"bubble-cell"},K0={class:"message-sender-name"},J0={class:"message-time"},Y0={class:"message-bubble"},Q0={key:0,class:"chat-code-block"},Z0={class:"code-header"},X0=["onClick"],e$={key:0,class:"message-row assistant typing"},t$={class:"avatar-cell"},s$={class:"ai-avatar-box"},a$={class:"chat-input-footer"},i$={class:"chat-input-bar"},n$={type:"button",class:"input-tool-btn",title:"Attach file"},o$=["onKeydown"],l$={type:"button",class:"input-tool-btn",title:"Voice input"},r$=["disabled"],d$={__name:"AiChatTemplate",props:{variant:{type:String,default:"full",validator:e=>["full","standalone","widget"].includes(e)},showSidebar:{type:Boolean,default:!0}},setup(e){const t=fs(),s=B(!1),a=B("1"),n=B(""),i=B(!1),l=B(null),c=B([{id:"1",title:"Refactoring Vue 3 Apple Navigation"},{id:"2",title:"Design System Token Automation"}]),u=B([{id:"3",title:"Liquid Glass Blur CSS Optimization"},{id:"4",title:"Tailwind vs Vanilla CSS Benchmark"}]),f=B([{role:"assistant",text:"Hello Jane! I am Aura AI, your spatial computing assistant. How can I assist your Vue 3 component architecture today?",time:"10:42 AM"},{role:"user",text:"Can you show me how to write an Apple-style liquid glass button in Vue 3?",time:"10:43 AM"},{role:"assistant",text:"Here is a sleek, hardware-accelerated liquid glass button using standard Vue 3 `<script setup>` and CSS backdrop filters:",codeLang:"vue",code:`<template>
  <button class="id-glass-btn">
    <slot />
  </button>
</template>

<style scoped>
.id-glass-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  padding: 12px 24px;
  color: #fff;
  font-weight: 600;
  transition: transform 0.2s ease;
}
.id-glass-btn:hover { transform: scale(1.04); }
</style>`,time:"10:44 AM"}]),p=()=>{if(!n.value.trim())return;const w=n.value;f.value.push({role:"user",text:w,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),n.value="",i.value=!0,Ls(()=>{l.value&&(l.value.scrollTop=l.value.scrollHeight)}),setTimeout(()=>{i.value=!1,f.value.push({role:"assistant",text:`Analyzed "${w}". I have updated the component logic and optimized state bindings for maximum FPS!`,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),Ls(()=>{l.value&&(l.value.scrollTop=l.value.scrollHeight)})},1200)},h=w=>{navigator.clipboard.writeText(w),t.success("Code copied to clipboard!")},k=()=>{f.value=[{role:"assistant",text:"New chat session started. What shall we build next?",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]};return(w,m)=>(r(),d("div",{class:E(["template-chat-page",`variant-${e.variant}`])},[e.variant==="full"&&e.showSidebar?(r(),d("aside",{key:0,class:E(["chat-sidebar",{"is-open":s.value}])},[o("div",V0,[o("div",M0,[g(D(Ms),{size:20,class:"sparkle-icon"}),m[2]||(m[2]=o("span",null,"Idesign AI",-1))]),g(oe,{size:"sm",variant:"glass","icon-left":D(qc),onClick:k},{default:A(()=>[...m[3]||(m[3]=[z(" New Chat ",-1)])]),_:1},8,["icon-left"])]),o("div",N0,[o("div",P0,[m[4]||(m[4]=o("span",{class:"history-label"},"Today",-1)),(r(!0),d(Y,null,ue(c.value,$=>(r(),d("button",{key:$.id,class:E(["history-item",{active:a.value===$.id}]),onClick:_=>a.value=$.id},[g(D(xn),{size:15}),o("span",E0,y($.title),1)],10,L0))),128))]),o("div",D0,[m[5]||(m[5]=o("span",{class:"history-label"},"Yesterday",-1)),(r(!0),d(Y,null,ue(u.value,$=>(r(),d("button",{key:$.id,class:E(["history-item",{active:a.value===$.id}]),onClick:_=>a.value=$.id},[g(D(xn),{size:15}),o("span",R0,y($.title),1)],10,B0))),128))])]),o("div",O0,[g(Qt,{name:"Jane Doe",status:"online",size:"sm",shape:"squircle"}),m[6]||(m[6]=o("div",{class:"user-meta"},[o("span",{class:"user-name"},"Jane Doe"),o("span",{class:"user-plan"},"Pro Member")],-1)),g(D(Yc),{size:16,class:"settings-icon"})])],2)):S("",!0),o("main",F0,[o("header",_0,[o("div",j0,[o("button",{type:"button",class:"mobile-sidebar-toggle",onClick:m[0]||(m[0]=$=>s.value=!s.value)},[g(D(zi),{size:18})]),o("div",H0,[m[8]||(m[8]=o("span",{class:"model-name"},"Aura Vision 3.5",-1)),g(at,{variant:"accent",size:"sm"},{default:A(()=>[...m[7]||(m[7]=[z("SUPERCHARGED",-1)])]),_:1})])]),o("div",U0,[g(sl,null,{default:A(()=>[...m[9]||(m[9]=[z("ONLINE",-1)])]),_:1}),g(oe,{size:"sm",variant:"ghost","icon-left":D(Zc)},{default:A(()=>[...m[10]||(m[10]=[z("Share",-1)])]),_:1},8,["icon-left"])])]),o("div",{ref_key:"scrollViewport",ref:l,class:"chat-messages-viewport"},[(r(!0),d(Y,null,ue(f.value,($,_)=>(r(),d("div",{key:_,class:E(["message-row",$.role])},[o("div",q0,[$.role==="user"?(r(),O(Qt,{key:0,name:"Jane Doe",size:"sm",shape:"squircle"})):(r(),d("div",G0,[g(D(Ms),{size:16})]))]),o("div",W0,[o("div",K0,[z(y($.role==="user"?"Jane":"Aura AI")+" ",1),o("span",J0,y($.time),1)]),o("div",Y0,[o("p",null,y($.text),1),$.code?(r(),d("div",Q0,[o("div",Z0,[o("span",null,y($.codeLang||"vue"),1),o("button",{type:"button",class:"copy-code-btn",onClick:T=>h($.code)},[g(D(el),{size:13}),m[11]||(m[11]=z(" Copy ",-1))],8,X0)]),o("pre",null,[o("code",null,y($.code),1)])])):S("",!0)])])],2))),128)),i.value?(r(),d("div",e$,[o("div",t$,[o("div",s$,[g(D(Ms),{size:16})])]),m[12]||(m[12]=Ge('<div class="bubble-cell" data-v-4d701c88><div class="message-bubble typing-dots" data-v-4d701c88><span class="dot" data-v-4d701c88></span><span class="dot" data-v-4d701c88></span><span class="dot" data-v-4d701c88></span></div></div>',1))])):S("",!0)],512),o("footer",a$,[o("div",i$,[o("button",n$,[g(D(_c),{size:18})]),ls(o("input",{"onUpdate:modelValue":m[1]||(m[1]=$=>n.value=$),type:"text",placeholder:"Ask Aura AI anything or paste Vue 3 code...",class:"chat-text-input",onKeydown:ps(Se(p,["prevent"]),["enter"])},null,40,o$),[[_s,n.value]]),o("button",l$,[g(D(Rc),{size:18})]),o("button",{type:"button",disabled:!n.value.trim(),class:"send-btn","aria-label":"Send message",onClick:p},[g(D(Kc),{size:16})],8,r$)]),m[13]||(m[13]=o("span",{class:"disclaimer-text"},"Aura AI can generate design tokens and Vue 3 components. Check accuracy.",-1))])])],2))}},c$=W(d$,[["__scopeId","data-v-4d701c88"]]),u$={class:"template-dashboard-page"},p$={class:"dash-header"},f$={class:"dash-title-group"},m$={class:"dash-breadcrumbs"},v$={class:"dash-actions"},g$={class:"dash-body"},h$={class:"stats-row"},b$={class:"dash-grid-layout"},y$={class:"table-section-box"},$$={class:"side-panel-box"},k$={class:"team-card-box"},x$={__name:"DashboardTemplate",setup(e){const t=fs(),s=B("7d"),a=B([]),n=B([{name:"Jane Smith",status:"online"},{name:"Alex Rivera",status:"online"},{name:"Sarah Chen",status:"busy"},{name:"David Kim",status:"online"},{name:"Elena Rostova"}]),i=[{key:"name",label:"Member Name",sortable:!0},{key:"role",label:"Role"},{key:"status",label:"Status"},{key:"lastActive",label:"Last Active"}],l=[{id:"1",name:"Jane Smith",role:"Design Lead",status:"Active",lastActive:"Just now"},{id:"2",name:"Alex Rivera",role:"Staff Engineer",status:"Active",lastActive:"4m ago"},{id:"3",name:"Sarah Chen",role:"Product Manager",status:"Syncing",lastActive:"12m ago"},{id:"4",name:"David Kim",role:"Security Ops",status:"Active",lastActive:"1h ago"},{id:"5",name:"Elena Rostova",role:"QA Lead",status:"Away",lastActive:"3h ago"}],c=()=>{t.success("Analytics Report Exported",{description:`PDF report generated for timeframe: ${s.value}`})},u=f=>{t.info(`Editing member: ${f.name}`)};return(f,p)=>(r(),d("div",u$,[o("header",p$,[o("div",f$,[o("div",m$,[g(il,{items:[{label:"Workspace"},{label:"Analytics & Systems"}]})]),p[2]||(p[2]=o("h2",null,"System Overview",-1))]),o("div",v$,[g(La,{modelValue:s.value,"onUpdate:modelValue":p[0]||(p[0]=h=>s.value=h),options:["24h","7d","30d","1y"],theme:"white"},null,8,["modelValue"]),g(oe,{variant:"primary",size:"sm","icon-left":D(gc),onClick:c},{default:A(()=>[...p[3]||(p[3]=[z(" Export Report ",-1)])]),_:1},8,["icon-left"])])]),o("main",g$,[o("div",h$,[g(Cs,{label:"Total Revenue",value:"$128,450",change:"+14.2%","change-type":"positive",description:"Compared to $112,400 last month","sparkline-data":[12,18,24,20,32,45,52,60]}),g(Cs,{label:"Active Users",value:"48,290",change:"+8.6%","change-type":"positive",description:"Daily active spatial sessions","sparkline-data":[20,25,30,28,35,40,48,55]}),g(Cs,{label:"Server Load",value:"18.4%",change:"-3.1%","change-type":"positive",description:"Apple Silicon M2 cluster utilization","sparkline-data":[40,35,28,30,22,19,18,18]}),g(Cs,{label:"System Incidents",value:"0",change:"100% Uptime","change-type":"neutral",description:"Zero downtime over 90 days"})]),o("div",b$,[o("div",y$,[g(di,{title:"Team Activity & Roles",variant:"striped",columns:i,data:l,selectable:"",searchable:"","has-row-actions":"","selected-rows":a.value,"onUpdate:selectedRows":p[1]||(p[1]=h=>a.value=h)},{"col-status":A(({value:h})=>[g(at,{variant:h==="Active"?"success":h==="Syncing"?"accent":"warning",size:"sm"},{default:A(()=>[z(y(h),1)]),_:2},1032,["variant"])]),actions:A(({row:h})=>[g(oe,{size:"sm",variant:"ghost",onClick:k=>u(h)},{default:A(()=>[...p[4]||(p[4]=[z(" Manage ",-1)])]),_:1},8,["onClick"])]),_:1},8,["selected-rows"])]),o("div",$$,[g(ga,{title:"System Controls"},{default:A(()=>[g(Je,{title:"Wi-Fi 6E",subtitle:"5.4 Gbps Mesh","icon-bg":"#007aff",detail:"Connected"},{icon:A(()=>[...p[5]||(p[5]=[z("📶",-1)])]),_:1}),g(Je,{title:"Spatial Sync",subtitle:"Local Peer-to-Peer","icon-bg":"#34c759",detail:"Active"},{icon:A(()=>[...p[6]||(p[6]=[z("⚡",-1)])]),_:1}),g(Je,{title:"Push Notifications",subtitle:"APNs Enabled","icon-bg":"#ff9500",detail:"Enabled"},{icon:A(()=>[...p[7]||(p[7]=[z("🔔",-1)])]),_:1}),g(Je,{title:"Security Enclave",subtitle:"Hardware Vault","icon-bg":"#af52de",detail:"Encrypted"},{icon:A(()=>[...p[8]||(p[8]=[z("🛡️",-1)])]),_:1})]),_:1}),o("div",k$,[p[9]||(p[9]=o("h4",{class:"card-head"},"Active Collaborators",-1)),g(nl,{variant:"hero",shape:"squircle",size:"md",users:n.value,label:"5 engineers online"},null,8,["users"])])])])])]))}},w$=W(x$,[["__scopeId","data-v-1b65e7fb"]]),C$={key:0,class:"ambient-orbs"},S$={key:1,class:"auth-card split-card"},I$={class:"auth-form-side"},A$={class:"auth-header"},z$={class:"auth-title"},T$={class:"auth-subtitle"},V$={class:"auth-tabs"},M$={key:1,class:"auth-row"},N$={class:"social-grid"},P$={class:"auth-banner-side"},L$={class:"banner-content"},E$={class:"banner-glass-card"},D$={class:"card-header"},B$={key:2,class:"auth-card centered-card"},R$={class:"centered-header"},O$={class:"auth-title"},F$={class:"auth-subtitle"},_$={class:"auth-tabs"},j$={key:1,class:"auth-row"},H$={class:"social-grid"},U$={key:3,class:"auth-card minimal-card"},q$={class:"minimal-header"},G$={class:"auth-title"},W$={class:"auth-subtitle"},K$={class:"minimal-footer"},J$={__name:"AuthTemplate",props:{variant:{type:String,default:"default",validator:e=>["default","split-hero","centered-card","minimal-glass"].includes(e)},title:String,subtitle:String,showSocial:{type:Boolean,default:!0}},setup(e){const t=e,s=fs(),a=B(!1),n=B(""),i=B("jane.smith@apple.com"),l=B("password123"),c=B(!0),u=B(!1),f=t.title,p=t.subtitle,h=()=>{u.value=!0,setTimeout(()=>{u.value=!1,s.success(a.value?"Account created successfully!":"Signed in successfully!",{description:`Welcome ${a.value?n.value||"User":i.value}`})},1e3)},k=w=>{s.info(`Connecting to ${w}...`,{description:"OAuth 2.0 authentication flow initialized."})};return(w,m)=>(r(),d("div",{class:E(["auth-page-container",`variant-${e.variant}`])},[e.variant==="centered-card"||e.variant==="minimal-glass"?(r(),d("div",C$,[...m[18]||(m[18]=[o("div",{class:"orb orb-1"},null,-1),o("div",{class:"orb orb-2"},null,-1)])])):S("",!0),e.variant==="default"||e.variant==="split-hero"?(r(),d("div",S$,[o("div",I$,[o("div",A$,[m[19]||(m[19]=o("div",{class:"auth-logo"},[o("span",{class:"logo-icon"},"⚡"),o("span",{class:"logo-text"},"Idesign")],-1)),o("h2",z$,y(D(f)||(a.value?"Create your account":"Welcome back")),1),o("p",T$,y(D(p)||(a.value?"Enter your details to register a new account.":"Please enter your credentials to access your dashboard.")),1)]),o("div",V$,[o("button",{type:"button",class:E(["auth-tab",{active:!a.value}]),onClick:m[0]||(m[0]=$=>a.value=!1)}," Sign In ",2),o("button",{type:"button",class:E(["auth-tab",{active:a.value}]),onClick:m[1]||(m[1]=$=>a.value=!0)}," Create Account ",2)]),o("form",{class:"auth-form",onSubmit:Se(h,["prevent"])},[a.value?(r(),O(Pt,{key:0,modelValue:n.value,"onUpdate:modelValue":m[2]||(m[2]=$=>n.value=$),label:"Full Name",placeholder:"Jane Smith",required:""},null,8,["modelValue"])):S("",!0),g(Pt,{modelValue:i.value,"onUpdate:modelValue":m[3]||(m[3]=$=>i.value=$),label:"Email Address",placeholder:"jane.smith@apple.com",type:"email",required:""},null,8,["modelValue"]),g(Pt,{modelValue:l.value,"onUpdate:modelValue":m[4]||(m[4]=$=>l.value=$),label:"Password",placeholder:"••••••••••••",type:"password",required:""},null,8,["modelValue"]),a.value?S("",!0):(r(),d("div",M$,[g(ha,{modelValue:c.value,"onUpdate:modelValue":m[5]||(m[5]=$=>c.value=$),label:"Remember me"},null,8,["modelValue"]),m[20]||(m[20]=o("a",{href:"#",class:"forgot-link"},"Forgot password?",-1))])),g(oe,{variant:"primary",size:"lg",block:"",type:"submit",loading:u.value},{default:A(()=>[z(y(a.value?"Create Account →":"Sign In →"),1)]),_:1},8,["loading"])],32),e.showSocial?(r(),d(Y,{key:0},[m[23]||(m[23]=o("div",{class:"divider-or"},[o("span",null,"OR CONTINUE WITH")],-1)),o("div",N$,[o("button",{type:"button",class:"social-btn",onClick:m[6]||(m[6]=$=>k("Apple"))},[...m[21]||(m[21]=[o("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor"},[o("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.31c.67-.82 1.13-1.96.99-3.11-.98.04-2.17.66-2.86 1.47-.62.72-1.16 1.89-.99 3.01 1.09.08 2.21-.55 2.86-1.37z"})],-1),z(" Apple ID ",-1)])]),o("button",{type:"button",class:"social-btn",onClick:m[7]||(m[7]=$=>k("GitHub"))},[...m[22]||(m[22]=[o("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor"},[o("path",{d:"M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"})],-1),z(" GitHub ",-1)])])])],64)):S("",!0)]),o("div",P$,[m[29]||(m[29]=o("div",{class:"banner-blur-orb orb-1"},null,-1)),m[30]||(m[30]=o("div",{class:"banner-blur-orb orb-2"},null,-1)),o("div",L$,[g(at,{variant:"accent","icon-left":"⚡"},{default:A(()=>[...m[24]||(m[24]=[z("DESIGN SYSTEM V2.0",-1)])]),_:1}),m[27]||(m[27]=o("h3",{class:"banner-title"},"Build Apple-Grade Web Applications",-1)),m[28]||(m[28]=o("p",{class:"banner-desc"}," Clean unified surfaces, frosted glass overlays, and spring animations engineered for next-gen spatial computing interfaces. ",-1)),o("div",E$,[o("div",D$,[g(Qt,{name:"Jane Smith",shape:"squircle",size:"sm",status:"online"}),m[25]||(m[25]=o("div",null,[o("div",{class:"card-user"},"Jane Smith"),o("div",{class:"card-role"},"Design Director · Apple Inc.")],-1))]),m[26]||(m[26]=o("p",{class:"card-quote"},`"Idesign is the cleanest Vue component library we've ever deployed."`,-1))])])])])):e.variant==="centered-card"?(r(),d("div",B$,[o("div",R$,[m[31]||(m[31]=o("div",{class:"centered-badge"},[o("span",{class:"badge-icon"},"⚡")],-1)),o("h2",O$,y(D(f)||(a.value?"Create your account":"Welcome back")),1),o("p",F$,y(D(p)||(a.value?"Enter your details to register.":"Enter your email to sign in.")),1)]),o("div",_$,[o("button",{type:"button",class:E(["auth-tab",{active:!a.value}]),onClick:m[8]||(m[8]=$=>a.value=!1)}," Sign In ",2),o("button",{type:"button",class:E(["auth-tab",{active:a.value}]),onClick:m[9]||(m[9]=$=>a.value=!0)}," Create Account ",2)]),o("form",{class:"auth-form",onSubmit:Se(h,["prevent"])},[a.value?(r(),O(Pt,{key:0,modelValue:n.value,"onUpdate:modelValue":m[10]||(m[10]=$=>n.value=$),label:"Full Name",placeholder:"Jane Smith",required:""},null,8,["modelValue"])):S("",!0),g(Pt,{modelValue:i.value,"onUpdate:modelValue":m[11]||(m[11]=$=>i.value=$),label:"Email Address",placeholder:"jane.smith@apple.com",type:"email",required:""},null,8,["modelValue"]),g(Pt,{modelValue:l.value,"onUpdate:modelValue":m[12]||(m[12]=$=>l.value=$),label:"Password",placeholder:"••••••••••••",type:"password",required:""},null,8,["modelValue"]),a.value?S("",!0):(r(),d("div",j$,[g(ha,{modelValue:c.value,"onUpdate:modelValue":m[13]||(m[13]=$=>c.value=$),label:"Remember me"},null,8,["modelValue"]),m[32]||(m[32]=o("a",{href:"#",class:"forgot-link"},"Forgot password?",-1))])),g(oe,{variant:"primary",size:"lg",block:"",type:"submit",loading:u.value},{default:A(()=>[z(y(a.value?"Create Account →":"Sign In →"),1)]),_:1},8,["loading"])],32),e.showSocial?(r(),d(Y,{key:0},[m[35]||(m[35]=o("div",{class:"divider-or"},[o("span",null,"OR CONTINUE WITH")],-1)),o("div",H$,[o("button",{type:"button",class:"social-btn",onClick:m[14]||(m[14]=$=>k("Apple"))},[...m[33]||(m[33]=[o("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor"},[o("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.31c.67-.82 1.13-1.96.99-3.11-.98.04-2.17.66-2.86 1.47-.62.72-1.16 1.89-.99 3.01 1.09.08 2.21-.55 2.86-1.37z"})],-1),z(" Apple ID ",-1)])]),o("button",{type:"button",class:"social-btn",onClick:m[15]||(m[15]=$=>k("GitHub"))},[...m[34]||(m[34]=[o("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor"},[o("path",{d:"M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"})],-1),z(" GitHub ",-1)])])])],64)):S("",!0)])):e.variant==="minimal-glass"?(r(),d("div",U$,[o("div",q$,[g(Qt,{name:"Apple Passkey",size:"lg",shape:"squircle",framed:"",icon:"⚡"}),o("h2",G$,y(D(f)||"Sign in with Apple ID"),1),o("p",W$,y(D(p)||"Touch ID or Face ID enabled"),1)]),o("form",{class:"auth-form",onSubmit:Se(h,["prevent"])},[g(Pt,{modelValue:i.value,"onUpdate:modelValue":m[16]||(m[16]=$=>i.value=$),placeholder:"Apple ID or Email",type:"email",size:"lg",required:""},null,8,["modelValue"]),g(oe,{variant:"primary",size:"lg",block:"",type:"submit",loading:u.value},{default:A(()=>[...m[36]||(m[36]=[z(" Continue with Passkey → ",-1)])]),_:1},8,["loading"])],32),o("div",K$,[o("button",{type:"button",class:"link-btn",onClick:m[17]||(m[17]=$=>k("Passkey"))},"Use Face ID / Touch ID")])])):S("",!0)],2))}},Y$=W(J$,[["__scopeId","data-v-56245f3f"]]),Q$={key:0,class:"playground-layout"},Z$={class:"playground-header"},X$={class:"header-meta"},e2={class:"category-tag"},t2={class:"component-desc"},s2={class:"preview-stage"},a2={class:"stage-bar"},i2={class:"view-mode-toggles"},n2={key:0,style:{width:"100%"}},o2={key:1,style:{width:"100%","max-width":"580px"}},l2={key:2,style:{width:"100%","max-width":"440px"}},r2={key:3,style:{width:"100%","max-width":"580px"}},d2={key:4,style:{width:"100%","max-width":"440px"}},c2={key:5,style:{width:"100%","max-width":"440px"}},u2={key:7,style:{width:"100%","max-width":"400px"}},p2={style:{"font-size":"14px",color:"var(--text-2)"}},f2={key:11,style:{position:"relative",width:"100%",height:"120px",display:"flex","align-items":"flex-end","justify-content":"center"}},m2={key:12,style:{width:"100%","max-width":"440px"}},v2={key:13,style:{width:"100%","max-width":"580px"}},g2={key:14,style:{width:"100%","max-width":"440px"}},h2={key:15,style:{width:"100%","max-width":"580px"}},b2={key:16,style:{width:"100%","max-width":"320px",display:"flex","justify-content":"center"}},y2={key:17,style:{width:"100%","max-width":"320px",display:"flex","flex-direction":"column",gap:"10px","align-items":"center"}},$2={key:18,style:{width:"100%","max-width":"340px"}},k2={key:19,style:{width:"100%","max-width":"380px"}},x2={key:20,style:{width:"100%","max-width":"300px"}},w2={key:21,style:{display:"flex","flex-direction":"column",gap:"12px"}},C2={key:23,style:{width:"100%","max-width":"320px"}},S2={key:25,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},I2={key:26,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},A2={key:27,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},z2={key:28,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"14px"}},T2={style:{display:"flex",gap:"10px","flex-wrap":"wrap","justify-content":"center"}},V2={key:31,style:{display:"flex",gap:"10px","flex-wrap":"wrap","align-items":"center","justify-content":"center"}},M2={key:32,style:{width:"100%","max-width":"480px"}},N2={key:33,style:{width:"100%","max-width":"640px"}},P2={key:34,style:{display:"flex",gap:"16px","align-items":"center","flex-wrap":"wrap"}},L2={key:36,style:{width:"100%","max-width":"320px"}},E2={key:38,style:{width:"100%","max-width":"360px"}},D2={key:39,style:{display:"flex",gap:"24px","align-items":"center"}},B2={key:40,style:{width:"100%","max-width":"380px"}},R2={key:41,style:{width:"100%","max-width":"320px",display:"flex","justify-content":"center"}},O2={key:42,style:{display:"flex",gap:"24px","align-items":"center"}},F2={key:43,style:{width:"100%","max-width":"300px",display:"flex","flex-direction":"column",gap:"16px"}},_2={key:44,style:{width:"100%","max-width":"640px"}},j2={key:45,style:{width:"100%","max-width":"400px"}},H2={key:46,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},U2={key:47,style:{width:"100%","max-width":"320px"}},q2={key:48,style:{width:"100%","max-width":"500px"}},G2={key:50,style:{width:"100%","max-width":"320px",background:"var(--surface)",border:"1px solid var(--hairline)","border-radius":"12px",padding:"10px"}},W2={key:52,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},K2={key:53,style:{width:"100%","max-width":"400px"}},J2={key:54,style:{display:"flex","justify-content":"center",padding:"10px 0",width:"100%"}},Y2={style:{padding:"16px",flex:"1",display:"flex","flex-direction":"column",gap:"12px"}},Q2={key:55,style:{width:"100%","max-height":"540px","overflow-y":"auto","border-radius":"16px",border:"1px solid var(--hairline)"}},Z2={key:56,style:{width:"100%","max-height":"540px","overflow-y":"auto","border-radius":"16px",border:"1px solid var(--hairline)"}},X2={key:57,style:{width:"100%","max-height":"540px","border-radius":"16px",border:"1px solid var(--hairline)"}},ek={key:58,style:{width:"100%","max-height":"540px","overflow-y":"auto","border-radius":"16px",border:"1px solid var(--hairline)"}},tk={key:59,style:{width:"100%","max-height":"540px","overflow-y":"auto","border-radius":"16px",border:"1px solid var(--hairline)"}},sk={key:60,style:{display:"flex","flex-direction":"column","align-items":"center",gap:"12px"}},ak={key:61,style:{"text-align":"center",color:"var(--text-3)","font-size":"14px"}},ik={key:0,class:"controls-panel"},nk={class:"props-grid"},ok={class:"prop-label"},lk=["onUpdate:modelValue"],rk=["onUpdate:modelValue"],dk=["onUpdate:modelValue"],ck=["value"],uk={class:"code-inspector"},pk={class:"code-header"},fk={class:"code-tabs"},mk={key:0,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#30d158","stroke-width":"2.5"},vk={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},gk={class:"code-display"},hk={class:"api-docs-section"},bk={class:"api-table-wrapper"},yk={class:"api-table"},$k={class:"prop-name"},kk={class:"type-name"},xk={class:"default-val"},wk={class:"prop-desc"},Ck={key:0,style:{display:"block","font-size":"11px",opacity:"0.75","margin-top":"2px"}},Sk={key:0},Ik={__name:"ComponentPlaygroundModal",props:{component:{type:Object,default:null}},emits:["close","toast"],setup(e,{emit:t}){const s={Search:Jt,FolderOpen:xc,Inbox:Ac,AlertCircle:dc,Sparkles:Ms,Lock:Lc,Zap:An,Box:Zd,Folder:tl},a=ve=>ve?s[ve]?s[ve]:ve:"🔍",n=e,i=t,l=B("light"),c=ve=>{l.value=ve,ve==="dark"?(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light")):(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"))};let u=null;tt(()=>{const ve=document.documentElement.classList.contains("dark");l.value=ve?"dark":"light",u=new MutationObserver(()=>{const C=document.documentElement.classList.contains("dark");l.value=C?"dark":"light"}),u.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}),qs(()=>{u&&u.disconnect()});const f=B("vue"),p=B(!1),h=B(!1),k=B("2"),w=B(["1","3"]),m=B(!1),$=B(!1),_=B("overview"),T=B(1),P=fs(),j=ve=>{const C=ve==="success"?"Settings saved successfully":ve==="warning"?"Storage reaching capacity":ve==="error"?"Failed to synchronize data":"New update ready";P[ve](C,{description:"All changes synchronized to your Apple iCloud account."})},F=B("Sample text"),le=B(""),de=B("Vue 3"),ae=B(!0),pe=B(!1),Q=B("Pro"),ee=B(65),ce=B(!0),J=B(1),ge=B(!1),Ae=B("2026-08-15"),We=B(!1),Te=B(!1),v=Ia({});Ct(()=>n.component,ve=>{if(ve){const C=document.documentElement.classList.contains("dark");l.value=C?"dark":"light",Object.keys(v).forEach(Bt=>delete v[Bt])}ve&&ve.props&&Object.keys(ve.props).forEach(C=>{v[C]=ve.props[C].default})},{immediate:!0});const ye=Z(()=>n.component&&n.component.props&&Object.keys(n.component.props).length>0),rt=Z(()=>n.component?f.value==="vue"?typeof n.component.vueCode=="function"?n.component.vueCode(v):n.component.vueCode:f.value==="nuxt"?typeof n.component.nuxtCode=="function"?n.component.nuxtCode(v):n.component.nuxtCode||(typeof n.component.vueCode=="function"?n.component.vueCode(v):n.component.vueCode):typeof n.component.htmlCode=="function"?n.component.htmlCode(v):n.component.htmlCode:""),es=()=>{navigator.clipboard.writeText(rt.value),p.value=!0,i("toast",`Copied ${n.component.name} code snippet!`),setTimeout(()=>{p.value=!1},2e3)};return(ve,C)=>{var Bt;return r(),O(Yt,{"model-value":!!e.component,title:((Bt=e.component)==null?void 0:Bt.name)||"Component Playground","max-width":"780px","onUpdate:modelValue":C[38]||(C[38]=ms=>ve.$emit("close"))},{default:A(()=>{var ms;return[e.component?(r(),d("div",Q$,[o("div",Z$,[o("div",X$,[o("span",e2,y(e.component.category),1),C[39]||(C[39]=o("span",{class:"vue-tag"},"Vue 3 / Nuxt 3 Component",-1))]),o("p",t2,y(e.component.description),1)]),o("div",s2,[o("div",a2,[C[40]||(C[40]=o("span",{class:"stage-title"},"Live Preview Sandbox",-1)),o("div",i2,[o("button",{class:E(["mode-btn",{active:l.value==="light"}]),onClick:C[0]||(C[0]=U=>c("light"))},"Light Ground",2),o("button",{class:E(["mode-btn",{active:l.value==="dark"}]),onClick:C[1]||(C[1]=U=>c("dark"))},"Dark Preview",2)])]),o("div",{class:E(["canvas-area",`bg-${l.value}`,{dark:l.value==="dark"}])},[(r(),d("div",{key:`${(ms=e.component)==null?void 0:ms.id}-${JSON.stringify(v)}`,style:{width:"100%",display:"flex","justify-content":"center","align-items":"center","min-height":"100%"}},[e.component.id==="glass-nav"?(r(),d("div",n2,[g(Cf,{title:v.title!==void 0?v.title:"Idesign",variant:v.variant||"glass",icon:a(v.icon),links:[{label:"Features",href:"#"},{label:"Pricing",href:"#"}]},{actions:A(()=>[g(oe,{size:"sm",variant:"primary"},{default:A(()=>[...C[41]||(C[41]=[z("Action",-1)])]),_:1})]),_:1},8,["title","variant","icon"])])):e.component.id==="stepper"?(r(),d("div",o2,[g(sy,{"model-value":v.activeStep??J.value,"onUpdate:modelValue":C[2]||(C[2]=U=>{J.value=U,v.activeStep=U}),size:v.size||"md",variant:v.variant||"default",color:v.color||"blue",clickable:v.clickable!==!1,steps:[{label:"Account",description:"Create user"},{label:"Security",description:"2FA settings"},{label:"Review",description:"Confirm details"}]},null,8,["model-value","size","variant","color","clickable"])])):e.component.id==="timeline"?(r(),d("div",l2,[g(vy,{items:[{title:"v2.4 System Update Released",description:"Added 5 new Apple Liquid Glass components.",time:"10 min ago",variant:"primary",icon:D(An)},{title:"Security Audit Passed",description:"Enclave verification completed cleanly.",time:"2 hours ago",variant:"success",icon:D(Yo)}]},null,8,["items"])])):e.component.id==="grid"?(r(),d("div",r2,[g(hy,{cols:v.cols?Number(v.cols):3,gap:v.gap||"md","auto-fit":!!v.autoFit},{default:A(()=>[g(st,{title:"Column 1",subtitle:"Responsive"}),g(st,{title:"Column 2",subtitle:"Layout Grid"}),g(st,{title:"Column 3",subtitle:"Apple System"})]),_:1},8,["cols","gap","auto-fit"])])):e.component.id==="bar-chart"?(r(),d("div",d2,[g(wy,{height:v.height?Number(v.height):180,data:[{label:"Mon",value:45},{label:"Tue",value:82},{label:"Wed",value:60},{label:"Thu",value:95},{label:"Fri",value:75}]},null,8,["height"])])):e.component.id==="pie-chart"?(r(),d("div",c2,[g(Ey,{"center-label":v.centerLabel!==void 0?v.centerLabel:"Direct Traffic",data:[{label:"Direct",value:45,color:"#0071e3"},{label:"Social",value:25,color:"#30d158"},{label:"Referral",value:30,color:"#af52de"}]},null,8,["center-label"])])):e.component.id==="segmented-control"?(r(),O(La,{key:6,active:v.active||"Overview",size:v.size||"md",options:["Overview","Components","Tokens"],theme:v.theme||"white"},null,8,["active","size","theme"])):e.component.id==="tabs"?(r(),d("div",u2,[g(wv,{modelValue:_.value,"onUpdate:modelValue":C[3]||(C[3]=U=>_.value=U),size:v.size||"md",variant:v.variant||"default",color:v.color||"blue",tabs:[{value:"overview",label:"Overview"},{value:"code",label:"Code"},{value:"api",label:"API"}]},{default:A(()=>[o("p",p2,'Content for "'+y(_.value)+'" tab.',1)]),_:1},8,["modelValue","size","variant","color"])])):e.component.id==="breadcrumbs"?(r(),O(il,{key:8,variant:v.variant||"default",size:v.size||"md",color:v.color||"blue",items:[{label:"Home",href:"#"},{label:"Components",href:"#"},{label:"Breadcrumbs"}]},null,8,["variant","size","color"])):e.component.id==="pagination"?(r(),O(Yv,{key:9,modelValue:T.value,"onUpdate:modelValue":C[4]||(C[4]=U=>T.value=U),"total-pages":v.totalPages||12,size:v.size||"md",variant:v.variant||"default",color:v.color||"blue"},null,8,["modelValue","total-pages","size","variant","color"])):e.component.id==="dropdown-menu"?(r(),O(bg,{key:10,size:v.size||"md",variant:v.variant||"default",items:[{label:"Edit",shortcut:"⌘E"},{label:"Duplicate"},{separator:!0},{label:"Delete",danger:!0}]},{trigger:A(()=>[g(oe,{variant:"secondary"},{default:A(()=>[...C[42]||(C[42]=[z("Actions ▾",-1)])]),_:1})]),_:1},8,["size","variant"])):e.component.id==="dock"?(r(),d("div",f2,[g(lb,{items:[{id:"finder",label:"Finder",icon:"📁",iconBg:"#007aff",active:!0},{id:"safari",label:"Safari",icon:"🌐",iconBg:"#34c759"},{id:"notes",label:"Notes",icon:"📝",iconBg:"#ff9500"},{separator:!0},{id:"settings",label:"Settings",icon:"⚙️",iconBg:"#8e8e93"}],style:{position:"relative",bottom:"0"}})])):e.component.id==="unified-panel"?(r(),d("div",m2,[g(ga,{size:v.size||"md",variant:v.variant||"default","no-dividers":v.noDividers},{default:A(()=>[g(Je,{title:"Wi-Fi",icon:D(ou),"icon-bg":"#007aff",detail:"Home Network"},null,8,["icon"]),g(Je,{title:"Bluetooth",icon:D(Yd),"icon-bg":"#34c759",detail:"On"},null,8,["icon"]),g(Je,{title:"Notifications",icon:D(Jo),"icon-bg":"#ff9500",detail:"Enabled"},null,8,["icon"])]),_:1},8,["size","variant","no-dividers"])])):e.component.id==="hero-cta"?(r(),d("div",v2,[g(Gf,{title:v.title||"Build Apple-Grade Apps",description:v.description||"Clean, unified surfaces with frosted glass used only where layers overlap.",eyebrow:v.eyebrow||"DESIGN SYSTEM V2.0","action-label":v.actionLabel||"Get Started",variant:v.variant||"glass"},null,8,["title","description","eyebrow","action-label","variant"])])):e.component.id==="accordion"?(r(),d("div",g2,[g(bv,{size:v.size||"md",variant:v.variant||"default",items:[{title:"What is Idesign?",content:"An Apple-grade Vue 3 component library."},{title:"Is it free?",content:"Yes, MIT licensed."},{title:"Dark mode?",content:"Yes, supports OS preference and .dark class."}]},null,8,["size","variant"])])):e.component.id==="project-section"?(r(),d("div",h2,[g(Zh,{title:v.title||"Featured Projects",icon:v.icon||"📁"},{default:A(()=>[g(Ja,{title:"Spatial Studio",description:"Next-gen spatial computing workstation built with Liquid Glass design system.",logo:"⚡","logo-bg":"#1e293b"}),g(Ja,{title:"EcoTrack Analytics",description:"Smart environmental telemetry and realtime resource monitoring dashboard.",logo:"🌐","logo-bg":"#1e293b"}),g(Ja,{title:"TrailFinder Mobile",description:"Cross-platform navigation and community trail exploration application.",logo:"🚀","logo-bg":"#1e293b"})]),_:1},8,["title","icon"])])):e.component.id==="image-frame"?(r(),d("div",b2,[g(b1,{src:v.src||"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",shape:v.shape||"squircle","aspect-ratio":v.aspectRatio||"1-1","bezel-size":v.bezelSize||"md",caption:v.caption||"Apple Studio Portrait",interactive:v.interactive!==!1},null,8,["src","shape","aspect-ratio","bezel-size","caption","interactive"])])):e.component.id==="apple-button"?(r(),d("div",y2,[g(oe,{variant:v.variant||"primary",color:v.color||"blue",size:v.size||"md","icon-left":v.iconLeft,"icon-right":v.iconRight,disabled:v.disabled,loading:v.loading,block:v.block},{default:A(()=>[z(y(v.label||"Continue"),1)]),_:1},8,["variant","color","size","icon-left","icon-right","disabled","loading","block"])])):e.component.id==="input"?(r(),d("div",$2,[g(Pt,{modelValue:F.value,"onUpdate:modelValue":C[5]||(C[5]=U=>F.value=U),label:v.label||"Search components",placeholder:v.placeholder||"Type here...",variant:v.variant||"default",size:v.size||"md",clearable:v.clearable,"trailing-text":v.trailingText},null,8,["modelValue","label","placeholder","variant","size","clearable","trailing-text"])])):e.component.id==="textarea"?(r(),d("div",k2,[g(bm,{modelValue:le.value,"onUpdate:modelValue":C[6]||(C[6]=U=>le.value=U),label:v.label||"Description",size:v.size||"md",variant:v.variant||"default",placeholder:"Write something...",maxlength:v.maxlength||200},null,8,["modelValue","label","size","variant","maxlength"])])):e.component.id==="select"?(r(),d("div",x2,[g(Sm,{modelValue:de.value,"onUpdate:modelValue":C[7]||(C[7]=U=>de.value=U),label:v.label||"Framework",size:v.size||"md",variant:v.variant||"default",options:["Vue 3","Nuxt 3","React","Svelte","Angular"],placeholder:"Choose a framework..."},null,8,["modelValue","label","size","variant"])])):e.component.id==="checkbox"?(r(),d("div",w2,[g(ha,{modelValue:ae.value,"onUpdate:modelValue":C[8]||(C[8]=U=>ae.value=U),label:v.label||"Accept terms",size:v.size||"md",color:v.color||"blue"},null,8,["modelValue","label","size","color"]),g(ha,{modelValue:pe.value,"onUpdate:modelValue":C[9]||(C[9]=U=>pe.value=U),label:"Subscribe to updates",size:v.size||"md",color:v.color||"blue"},null,8,["modelValue","size","color"])])):e.component.id==="radio-group"?(r(),O(Dm,{key:22,modelValue:Q.value,"onUpdate:modelValue":C[10]||(C[10]=U=>Q.value=U),label:"Plan",direction:v.direction||"vertical",options:["Free","Pro","Enterprise"]},null,8,["modelValue","direction"])):e.component.id==="slider"?(r(),d("div",C2,[g(Hm,{modelValue:ee.value,"onUpdate:modelValue":C[11]||(C[11]=U=>ee.value=U),label:"Volume",min:v.min||0,max:v.max||100},null,8,["modelValue","min","max"])])):e.component.id==="ios-switch"?(r(),O(zn,{key:24,modelValue:ce.value,"onUpdate:modelValue":C[12]||(C[12]=U=>ce.value=U),label:v.label||"Notifications",size:v.size||"md",variant:v.variant||"success"},null,8,["modelValue","label","size","variant"])):e.component.id==="liquid-modal"?(r(),d("div",S2,[g(oe,{variant:"primary",onClick:C[13]||(C[13]=U=>h.value=!0)},{default:A(()=>[z("Trigger Modal ("+y(v.variant||"default")+")",1)]),_:1}),g(Yt,{modelValue:h.value,"onUpdate:modelValue":C[16]||(C[16]=U=>h.value=U),title:v.title||"Confirm Action",subtitle:v.subtitle||"Are you sure you want to proceed?",content:v.content||"Modal body content and description text goes here.",variant:v.variant||"default",size:v.size||"md",teleport:!1},{actions:A(()=>[g(oe,{variant:"secondary",onClick:C[14]||(C[14]=U=>h.value=!1)},{default:A(()=>[...C[43]||(C[43]=[z("Cancel",-1)])]),_:1}),g(oe,{variant:"primary",onClick:C[15]||(C[15]=U=>h.value=!1)},{default:A(()=>[...C[44]||(C[44]=[z("Confirm",-1)])]),_:1})]),_:1},8,["modelValue","title","subtitle","content","variant","size"])])):e.component.id==="bottom-sheet"?(r(),d("div",I2,[g(oe,{variant:"primary",onClick:C[17]||(C[17]=U=>m.value=!0)},{default:A(()=>[...C[45]||(C[45]=[z("Open Bottom Sheet",-1)])]),_:1}),g(ig,{modelValue:m.value,"onUpdate:modelValue":C[18]||(C[18]=U=>m.value=U),title:v.title||"Sheet Actions",description:v.description||"Choose an action to proceed."},{default:A(()=>[...C[46]||(C[46]=[o("p",{style:{color:"var(--text-2)"}},"Bottom sheet with edge-anchored slide animation.",-1)])]),_:1},8,["modelValue","title","description"])])):e.component.id==="drawer"?(r(),d("div",A2,[g(oe,{variant:"primary",onClick:C[19]||(C[19]=U=>$.value=!0)},{default:A(()=>[z("Open Drawer ("+y(v.variant||"default")+")",1)]),_:1}),g(fg,{modelValue:$.value,"onUpdate:modelValue":C[20]||(C[20]=U=>$.value=U),title:v.title||"Settings",description:v.description||"Manage your preferences.",position:v.position||"right",variant:v.variant||"default"},{default:A(()=>[...C[47]||(C[47]=[o("p",{style:{color:"var(--text-2)"}},"Drawer content with body scroll lock.",-1)])]),_:1},8,["modelValue","title","description","position","variant"])])):e.component.id==="toast"?(r(),d("div",z2,[o("div",T2,[g(oe,{variant:"primary",onClick:C[21]||(C[21]=U=>j("success"))},{default:A(()=>[...C[48]||(C[48]=[z("Success Toast",-1)])]),_:1}),g(oe,{variant:"secondary",onClick:C[22]||(C[22]=U=>j("info"))},{default:A(()=>[...C[49]||(C[49]=[z("Info Toast",-1)])]),_:1}),g(oe,{variant:"dark",onClick:C[23]||(C[23]=U=>j("warning"))},{default:A(()=>[...C[50]||(C[50]=[z("Warning Toast",-1)])]),_:1}),g(oe,{variant:"danger",onClick:C[24]||(C[24]=U=>j("error"))},{default:A(()=>[...C[51]||(C[51]=[z("Error Toast",-1)])]),_:1})]),g(Gb,{position:v.position||"bottom-center"},null,8,["position"])])):e.component.id==="tooltip"?(r(),O(pv,{key:29,text:v.text||"Helpful tip",position:v.position||"top"},{default:A(()=>[g(oe,{variant:"secondary"},{default:A(()=>[...C[52]||(C[52]=[z("Hover me",-1)])]),_:1})]),_:1},8,["text","position"])):e.component.id==="live-indicator"?(r(),O(sl,{key:30},{default:A(()=>[z(y(v.text||"SYSTEM ONLINE · LIVE"),1)]),_:1})):e.component.id==="tag"?(r(),d("div",V2,[g(at,{variant:v.variant||"success",size:v.size||"md","icon-left":v.iconLeft,"icon-right":v.iconRight,removable:v.removable},{default:A(()=>[z(y(v.label||"Active"),1)]),_:1},8,["variant","size","icon-left","icon-right","removable"]),g(at,{variant:"accent","icon-left":"🔵"},{default:A(()=>[...C[53]||(C[53]=[z("Processing",-1)])]),_:1}),g(at,{variant:"warning","icon-left":"⚠️"},{default:A(()=>[...C[54]||(C[54]=[z("Pending",-1)])]),_:1}),g(at,{variant:"danger","icon-left":"🛑"},{default:A(()=>[...C[55]||(C[55]=[z("Failed",-1)])]),_:1})])):e.component.id==="alert"?(r(),d("div",M2,[g(Vv,{variant:v.variant||"info",size:v.size||"md",title:v.title||"Update Available",description:v.description||"A new software version is ready to install.",dismissible:""},null,8,["variant","size","title","description"])])):e.component.id==="table"?(r(),d("div",N2,[g(di,{title:v.title!==void 0?v.title:"Team Members",count:v.count,variant:v.variant||"default",selectable:v.selectable!==!1,searchable:v.searchable!==!1,"has-row-actions":v.hasRowActions!==!1,columns:[{key:"name",label:"Name",sortable:!0},{key:"role",label:"Role"},{key:"status",label:"Status"}],data:[{name:"Jane Smith",role:"Design Director",status:"Active"},{name:"Alex Rivera",role:"Staff Engineer",status:"Active"},{name:"Sarah Chen",role:"Product Manager",status:"Away"}]},{"col-status":A(({value:U})=>[g(at,{variant:U==="Active"?"success":"warning",size:"sm"},{default:A(()=>[z(y(U),1)]),_:2},1032,["variant"])]),actions:A(({row:U})=>[g(oe,{size:"sm",variant:"ghost"},{default:A(()=>[...C[56]||(C[56]=[z("Edit",-1)])]),_:1})]),_:1},8,["title","count","variant","selectable","searchable","has-row-actions"])])):e.component.id==="avatar"?(r(),d("div",P2,[(r(),O(Qt,{key:`avatar-${JSON.stringify(v)}`,name:v.name||"Jane Smith",src:v.src,icon:a(v.icon),size:v.size||"md",shape:v.shape||"circle",framed:v.framed,status:v.status||"online"},null,8,["name","src","icon","size","shape","framed","status"])),g(Qt,{name:"Alex Rivera",size:"lg",shape:"squircle",framed:"",status:"online"})])):e.component.id==="avatar-group"?(r(),O(nl,{key:35,users:[{name:"Jane Smith",status:"online"},{name:"Alex Rivera",status:"online"},{name:"Sarah Chen",status:"busy"},{name:"David Kim",status:"offline"},{name:"Elena Rostova"}],variant:v.variant||"hero",shape:v.shape||"circle",size:v.size||"md",max:v.max||3,label:v.label||"5 active team members",framed:v.framed},null,8,["variant","shape","size","max","label","framed"])):e.component.id==="stat"?(r(),d("div",L2,[g(Cs,{label:v.label||"Total Revenue",value:v.value||"$128,450",change:v.change||"+14.2%","change-type":"positive",description:v.description||"Compared to $112,400 last month",size:v.size||"md",variant:v.variant||"default","sparkline-data":[10,25,18,35,28,45,40,65]},null,8,["label","value","change","description","size","variant"])])):e.component.id==="empty-state"?(r(),O(Bb,{key:37,title:v.title||"No Active Deployments",description:v.description||"Deploy your Vue 3 application to see live metrics.",icon:a(v.icon),"action-label":v.actionLabel||"Deploy Now",onAction:C[25]||(C[25]=U=>ve.toast.info("Action button clicked!"))},null,8,["title","description","icon","action-label"])):e.component.id==="card"?(r(),d("div",E2,[(r(),O(st,{key:`card-${JSON.stringify(v)}`,title:v.title,subtitle:v.subtitle,description:v.description,tag:v.tag,image:v.image,variant:v.variant||"default",padding:v.padding||"md",interactive:!!v.interactive,"show-actions":v.showActions!==!1},vr({_:2},[v.showActions!==!1?{name:"actions",fn:A(()=>[g(oe,{size:"sm",variant:"secondary"},{default:A(()=>[...C[57]||(C[57]=[z("Details",-1)])]),_:1}),g(oe,{size:"sm",variant:"primary"},{default:A(()=>[...C[58]||(C[58]=[z("Action",-1)])]),_:1})]),key:"0"}:void 0]),1032,["title","subtitle","description","tag","image","variant","padding","interactive","show-actions"]))])):e.component.id==="badge"?(r(),d("div",D2,[g(Zm,{count:v.count,"show-zero":v.showZero},{default:A(()=>[g(oe,{variant:"secondary"},{default:A(()=>[...C[59]||(C[59]=[z("Notifications",-1)])]),_:1})]),_:1},8,["count","show-zero"])])):e.component.id==="progress"?(r(),d("div",B2,[(r(),O(iv,{key:`prog-${v.size}-${v.variant}-${v.color}-${v.indeterminate}`,value:v.value??65,size:v.size||"md",variant:v.variant||"default",color:v.color||"blue",indeterminate:!!v.indeterminate,label:"Upload Progress"},null,8,["value","size","variant","color","indeterminate"]))])):e.component.id==="skeleton"?(r(),d("div",R2,[(r(),O(ov,{key:`skel-${v.variant}-${v.size}`,variant:v.variant||"rect",size:v.size||"md"},null,8,["variant","size"]))])):e.component.id==="spinner"?(r(),d("div",O2,[g(dv,{size:v.size||"md",color:v.color||"blue",label:v.label||"Loading..."},null,8,["size","color","label"])])):e.component.id==="divider"?(r(),d("div",F2,[C[60]||(C[60]=o("p",{style:{"font-size":"14px",color:"var(--text-2)"}},"Content above",-1)),g(Rv,{variant:v.variant||"hairline"},null,8,["variant"]),C[61]||(C[61]=o("p",{style:{"font-size":"14px",color:"var(--text-2)"}},"Content below",-1))])):e.component.id==="table"?(r(),d("div",_2,[g(di,{title:v.title||"Team Members",count:v.count,variant:v.variant||"default",columns:[{key:"name",label:"Name",sortable:!0},{key:"role",label:"Role"},{key:"status",label:"Status"}],data:[{name:"Jane Smith",role:"Engineering Lead",status:"Active"},{name:"Alex Rivera",role:"Product Designer",status:"Active"}],selectable:v.selectable,searchable:v.searchable,"has-row-actions":v.hasRowActions},null,8,["title","count","variant","selectable","searchable","has-row-actions"])])):e.component.id==="file-upload"?(r(),d("div",j2,[g(Yg,{hint:"Upload files up to 25MB"})])):e.component.id==="confirm-dialog"?(r(),d("div",H2,[g(oe,{variant:"primary",onClick:C[26]||(C[26]=U=>ge.value=!0)},{default:A(()=>[z("Trigger Confirm Dialog ("+y(v.variant||"default")+")",1)]),_:1}),g(lh,{modelValue:ge.value,"onUpdate:modelValue":C[27]||(C[27]=U=>ge.value=U),title:v.title||"Delete Security Token",message:v.message||"Are you sure you want to delete this key? This action cannot be undone.",variant:v.variant||"default",danger:v.danger,teleport:!1},null,8,["modelValue","title","message","variant","danger"])])):e.component.id==="date-picker"?(r(),d("div",U2,[g(Mh,{modelValue:Ae.value,"onUpdate:modelValue":C[28]||(C[28]=U=>Ae.value=U),label:v.label||"Select Date"},null,8,["modelValue","label"])])):e.component.id==="carousel"?(r(),d("div",q2,[g(C1,{"show-dots":v.showDots,"show-controls":v.showControls},{default:A(()=>[g(st,{title:"Apple Vision Pro",subtitle:"Spatial Computing",variant:"framed"}),g(st,{title:"MacBook Pro M4",subtitle:"Mind-blowing speed",variant:"glass"}),g(st,{title:"iPad Pro OLED",subtitle:"Ultra Retina XDR",variant:"hero"})]),_:1},8,["show-dots","show-controls"])])):e.component.id==="macos-banner"?(r(),O(B1,{key:49,"app-name":v.appName||"System Settings",title:v.title||"Software Update Ready",message:v.message||"macOS Sequoia 15.1 is ready to install.",time:v.time||"now",icon:a(v.icon),"action-label":v.actionLabel||"Update Now","secondary-action-label":v.secondaryActionLabel},null,8,["app-name","title","message","time","icon","action-label","secondary-action-label"])):e.component.id==="file-tree"?(r(),d("div",G2,[g(G1,{items:[{id:"1",name:"src",children:[{id:"2",name:"App.vue"},{id:"3",name:"components",children:[{id:"4",name:"Navbar.vue"}]}]},{id:"5",name:"package.json"}],"selected-id":k.value,"expanded-ids":w.value,onSelect:C[29]||(C[29]=U=>k.value=U.id),onToggleExpand:C[30]||(C[30]=U=>{const Ve=w.value.indexOf(U);Ve>=0?w.value.splice(Ve,1):w.value.push(U)})},null,8,["selected-id","expanded-ids"])])):e.component.id==="popover"?(r(),O(Z1,{key:51,position:v.position||"bottom",title:v.title||"Popover Title",body:v.body||"Popover body content and description text goes here.",size:v.size||"md",variant:v.variant||"default"},{trigger:A(()=>[g(oe,{variant:"secondary"},{default:A(()=>[...C[62]||(C[62]=[z("Open Popover Anchor",-1)])]),_:1})]),_:1},8,["position","title","body","size","variant"])):e.component.id==="command-palette"?(r(),d("div",W2,[g(oe,{variant:"primary",onClick:C[31]||(C[31]=U=>We.value=!0)},{default:A(()=>[...C[63]||(C[63]=[z("Trigger Command Palette (⌘K)",-1)])]),_:1}),g(kh,{modelValue:We.value,"onUpdate:modelValue":C[32]||(C[32]=U=>We.value=U),groups:[{title:"Navigation",items:[{id:"1",label:"Go to Components",shortcut:"⌘C"},{id:"2",label:"View Tokens",shortcut:"⌘T"}]},{title:"Actions",items:[{id:"3",label:"Copy Installation CLI",shortcut:"⌘I"}]}]},null,8,["modelValue"])])):e.component.id==="stack"?(r(),d("div",K2,[g(dh,{direction:v.direction||"vertical",gap:v.gap||12},{default:A(()=>[...C[64]||(C[64]=[o("div",{style:{padding:"10px",background:"var(--hover)","border-radius":"8px","font-size":"13px"}},"Stack Item 1",-1),o("div",{style:{padding:"10px",background:"var(--hover)","border-radius":"8px","font-size":"13px"}},"Stack Item 2",-1),o("div",{style:{padding:"10px",background:"var(--hover)","border-radius":"8px","font-size":"13px"}},"Stack Item 3",-1)])]),_:1},8,["direction","gap"])])):e.component.id==="iphone-shell"?(r(),d("div",J2,[g(al,null,{default:A(()=>[o("div",Y2,[C[65]||(C[65]=o("div",{style:{"font-size":"11px","font-weight":"700",color:"var(--accent)","letter-spacing":"0.1em","text-transform":"uppercase"}}," DYNAMIC ISLAND DEMO ",-1)),C[66]||(C[66]=o("h3",{style:{"font-size":"20px","font-weight":"700","letter-spacing":"-0.02em"}}," iOS Shell Simulator ",-1)),g(ga,null,{default:A(()=>[g(Je,{title:"Large Title Collapse Nav",detail:"iOS Physics"}),g(Je,{title:"Edge Bottom Sheet",detail:"Native Sheet"}),g(Je,{title:"Touch Target ≥ 44px",detail:"Compliant"})]),_:1})])]),_:1})])):e.component.id==="hero-page"?(r(),d("div",Q2,[g(c0)])):e.component.id==="product-page"?(r(),d("div",Z2,[g(T0)])):e.component.id==="ai-chat-page"?(r(),d("div",X2,[g(c$,{variant:v.variant||"full"},null,8,["variant"])])):e.component.id==="dashboard-page"?(r(),d("div",ek,[g(w$)])):e.component.id==="auth-page"?(r(),d("div",tk,[g(Y$,{variant:v.variant||"default"},null,8,["variant"])])):e.component.id==="tour"?(r(),d("div",sk,[g(oe,{variant:"primary",onClick:C[33]||(C[33]=U=>Te.value=!0)},{default:A(()=>[...C[67]||(C[67]=[z("Start Product Tour ✨",-1)])]),_:1}),g(Xy,{modelValue:Te.value,"onUpdate:modelValue":C[34]||(C[34]=U=>Te.value=U),"next-label":v.nextLabel||"Continue →","finish-label":v.finishLabel||"Get Started ✨",teleport:!1},null,8,["modelValue","next-label","finish-label"])])):(r(),d("div",ak," Preview for this component is rendered from the code snippet. "))]))],2),ye.value?(r(),d("div",ik,[C[68]||(C[68]=o("div",{class:"controls-title"},"Interactive Props",-1)),o("div",nk,[(r(!0),d(Y,null,ue(e.component.props,(U,Ve)=>(r(),d("div",{key:Ve,class:"prop-item"},[o("label",ok,y(Ve),1),U.type==="text"?ls((r(),d("input",{key:0,"onUpdate:modelValue":De=>v[Ve]=De,type:"text",class:"prop-input"},null,8,lk)),[[_s,v[Ve]]]):U.type==="number"?ls((r(),d("input",{key:1,"onUpdate:modelValue":De=>v[Ve]=De,type:"number",class:"prop-input"},null,8,rk)),[[_s,v[Ve],void 0,{number:!0}]]):U.type==="select"?ls((r(),d("select",{key:2,"onUpdate:modelValue":De=>v[Ve]=De,class:"prop-select"},[(r(!0),d(Y,null,ue(U.options,De=>(r(),d("option",{key:De,value:De},y(De),9,ck))),128))],8,dk)),[[Nd,v[Ve]]]):U.type==="boolean"?(r(),O(zn,{key:3,modelValue:v[Ve],"onUpdate:modelValue":De=>v[Ve]=De},null,8,["modelValue","onUpdate:modelValue"])):S("",!0)]))),128))])])):S("",!0)]),o("div",uk,[o("div",pk,[o("div",fk,[o("button",{class:E(["code-tab",{active:f.value==="vue"}]),onClick:C[35]||(C[35]=U=>f.value="vue")},"Vue 3 SFC (.vue)",2),o("button",{class:E(["code-tab",{active:f.value==="nuxt"}]),onClick:C[36]||(C[36]=U=>f.value="nuxt")},"Nuxt 3",2),o("button",{class:E(["code-tab",{active:f.value==="html"}]),onClick:C[37]||(C[37]=U=>f.value="html")},"HTML + CSS",2)]),o("button",{type:"button",class:"copy-code-btn",onClick:es},[p.value?(r(),d("svg",mk,[...C[69]||(C[69]=[o("path",{d:"M20 6L9 17l-5-5"},null,-1)])])):(r(),d("svg",vk,[...C[70]||(C[70]=[o("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"},null,-1),o("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"},null,-1)])])),z(" "+y(p.value?"Copied Code!":"Copy Code"),1)])]),o("div",gk,[o("pre",null,[o("code",null,y(rt.value),1)])])]),o("div",hk,[C[74]||(C[74]=o("h4",{class:"api-docs-title"},"Component API Specification",-1)),o("div",bk,[o("table",yk,[C[73]||(C[73]=o("thead",null,[o("tr",null,[o("th",null,"Prop"),o("th",null,"Type"),o("th",null,"Default"),o("th",null,"Description")])],-1)),o("tbody",null,[(r(!0),d(Y,null,ue(e.component.props,(U,Ve)=>(r(),d("tr",{key:Ve},[o("td",$k,[o("code",null,y(Ve),1)]),o("td",kk,[o("code",null,y(U.type),1)]),o("td",xk,[o("code",null,y(U.default!==void 0?U.default:"—"),1)]),o("td",wk,[z(y(U.description||(U.type==="select"?`Options: ${U.options.join(" | ")}`:"Configurable property."))+" ",1),U.type==="select"&&U.description?(r(),d("span",Ck,[C[71]||(C[71]=z(" Options: ",-1)),o("code",null,y(U.options.join(" | ")),1)])):S("",!0)])]))),128)),ye.value?S("",!0):(r(),d("tr",Sk,[...C[72]||(C[72]=[o("td",{colspan:"4",class:"no-props"},"No props required — plug-and-play component.",-1)])]))])])])])])):S("",!0)]}),_:1},8,["model-value","title"])}}},Ak=W(Ik,[["__scopeId","data-v-14ed6691"]]),zk={__name:"TokenInspectorModal",props:{modelValue:Boolean},emits:["update:modelValue","toast"],setup(e,{emit:t}){const s=t,a=()=>{navigator.clipboard.writeText(`:root {
  --bg: #f5f5f7; --surface: #ffffff; --text: #1d1d1f; --text-2: #6e6e73;
  --hairline: rgba(0,0,0,0.07); --accent: #0071e3; --live: #30d158;
  --r-pill: 999px; --r-card: 18px; --r-panel: 22px; --r-hero: 26px;
  --sh-card: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
  --sh-panel: 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05);
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
}`),s("toast","Copied Apple tokens.css to clipboard!")};return(n,i)=>(r(),O(Yt,{"model-value":e.modelValue,title:"Apple Liquid Glass — Tokens & Rules","max-width":"840px","onUpdate:modelValue":i[0]||(i[0]=l=>n.$emit("update:modelValue",l))},{footer:A(()=>[o("button",{type:"button",class:"copy-tokens-btn",onClick:a}," Copy Full tokens.css File ")]),default:A(()=>[i[1]||(i[1]=o("div",{class:"tokens-layout"},[o("div",{class:"rules-box"},[o("h4",{class:"section-heading"},"The 5 Core Philosophy Rules"),o("div",{class:"rules-list"},[o("div",{class:"rule-card"},[o("span",{class:"rule-num"},"1"),o("div",null,[o("strong",null,"Unified surface > fragmented cards:"),z(" Sibling items belong on one white panel with hairline dividers. ")])]),o("div",{class:"rule-card"},[o("span",{class:"rule-num"},"2"),o("div",null,[o("strong",null,"Glass is seasoning, not the dish:"),z(" `backdrop-filter` frost ONLY where layers actually overlap. Plain content areas stay solid white. ")])]),o("div",{class:"rule-card"},[o("span",{class:"rule-num"},"3"),o("div",null,[o("strong",null,"Restraint is luxury:"),z(" If whitespace and clean hierarchy can solve it, don't add borders, fills, or decorative icons. ")])]),o("div",{class:"rule-card"},[o("span",{class:"rule-num"},"4"),o("div",null,[o("strong",null,"Hierarchy from weight & size, not color:"),z(" Body interface is black-white-grey. Reserve color for accent (blue), heat (orange), live. ")])]),o("div",{class:"rule-card"},[o("span",{class:"rule-num"},"5"),o("div",null,[o("strong",null,"Apple details:"),z(" Negative tracking on titles, `tabular-nums` for data, 180% saturation blur, spring-like easing. ")])])])]),o("div",{class:"tokens-section"},[o("h4",{class:"section-heading"},"Color Palette Tokens"),o("div",{class:"swatches-grid"},[o("div",{class:"swatch-card",style:{background:"#f5f5f7"}},[o("span",{class:"swatch-label"},"--bg (#f5f5f7)"),o("span",{class:"swatch-desc"},"Cool Grey Ground")]),o("div",{class:"swatch-card",style:{background:"#ffffff",border:"1px solid #e5e5e5",color:"#111"}},[o("span",{class:"swatch-label"},"--surface (#ffffff)"),o("span",{class:"swatch-desc"},"Panel / Surface")]),o("div",{class:"swatch-card",style:{background:"#1d1d1f",color:"#fff"}},[o("span",{class:"swatch-label"},"--text (#1d1d1f)"),o("span",{class:"swatch-desc"},"Primary Titles")]),o("div",{class:"swatch-card",style:{background:"#6e6e73",color:"#fff"}},[o("span",{class:"swatch-label"},"--text-2 (#6e6e73)"),o("span",{class:"swatch-desc"},"Secondary Meta")]),o("div",{class:"swatch-card",style:{background:"#0071e3",color:"#fff"}},[o("span",{class:"swatch-label"},"--accent (#0071e3)"),o("span",{class:"swatch-desc"},"Apple Blue")]),o("div",{class:"swatch-card",style:{background:"#ff6b00",color:"#fff"}},[o("span",{class:"swatch-label"},"--heat (#ff6b00)"),o("span",{class:"swatch-desc"},"Heat Accent")]),o("div",{class:"swatch-card",style:{background:"#30d158",color:"#fff"}},[o("span",{class:"swatch-label"},"--live (#30d158)"),o("span",{class:"swatch-desc"},"Live Status")]),o("div",{class:"swatch-card",style:{background:"rgba(0,0,0,0.07)",border:"1px solid #ccc",color:"#111"}},[o("span",{class:"swatch-label"},"--hairline"),o("span",{class:"swatch-desc"},"rgba(0,0,0,0.07)")])])]),o("div",{class:"tokens-section"},[o("h4",{class:"section-heading"},"Radius Semantic Tiers"),o("div",{class:"radius-flex"},[o("div",{class:"radius-box r-pill"},"--r-pill (999px)"),o("div",{class:"radius-box r-hero"},"--r-hero (26px)"),o("div",{class:"radius-box r-panel"},"--r-panel (22px)"),o("div",{class:"radius-box r-card"},"--r-card (18px)"),o("div",{class:"radius-box r-thumb"},"--r-thumb (12px)"),o("div",{class:"radius-box r-chip"},"--r-chip (6px)")])])],-1))]),_:1},8,["model-value"]))}},Tk=W(zk,[["__scopeId","data-v-c0400855"]]),Vk={class:"install-guide-layout"},Mk={class:"option-card"},Nk={class:"terminal-block"},Pk={class:"terminal-block mt-2"},Lk={class:"option-card"},Ek={class:"terminal-block"},Dk={__name:"InstallCliModal",props:{modelValue:Boolean},emits:["update:modelValue","toast"],setup(e,{emit:t}){const s=t,a=(n,i)=>{navigator.clipboard.writeText(n),s("toast",`Copied ${i}!`)};return(n,i)=>(r(),O(Yt,{"model-value":e.modelValue,title:"Install Idesign to Any Vue 3 / Nuxt 3 Project","max-width":"640px","onUpdate:modelValue":i[3]||(i[3]=l=>n.$emit("update:modelValue",l))},{default:A(()=>[o("div",Vk,[o("div",Mk,[i[6]||(i[6]=o("div",{class:"option-badge"},"Option 1 (Recommended)",-1)),i[7]||(i[7]=o("h4",{class:"option-title"},"Add Components via CLI",-1)),i[8]||(i[8]=o("p",{class:"option-desc"},"Install Idesign tokens and add individual components directly into your project's `components/` folder.",-1)),o("div",Nk,[i[4]||(i[4]=o("code",null,"npx idesign init",-1)),o("button",{class:"copy-small-btn",onClick:i[0]||(i[0]=l=>a("npx idesign init","CLI init command"))},"Copy")]),o("div",Pk,[i[5]||(i[5]=o("code",null,"npx idesign add button panel hero-cta glass-nav",-1)),o("button",{class:"copy-small-btn",onClick:i[1]||(i[1]=l=>a("npx idesign add button panel hero-cta glass-nav","CLI add command"))},"Copy")])]),o("div",Lk,[i[10]||(i[10]=o("div",{class:"option-badge"},"Option 2",-1)),i[11]||(i[11]=o("h4",{class:"option-title"},"Nuxt 3 Auto-Import Integration",-1)),i[12]||(i[12]=o("p",{class:"option-desc"},[z("Drop components into your Nuxt 3 "),o("code",null,"components/idesign/"),z(" directory. Nuxt 3 auto-imports them with zero configuration required!")],-1)),o("div",Ek,[i[9]||(i[9]=o("code",null,"npm install @idesign/vue-core lucide-vue-next",-1)),o("button",{class:"copy-small-btn",onClick:i[2]||(i[2]=l=>a("npm install @idesign/vue-core lucide-vue-next","npm install command"))},"Copy")])]),i[13]||(i[13]=o("div",{class:"option-card"},[o("div",{class:"option-badge"},"Option 3"),o("h4",{class:"option-title"},"Manual Copy-Paste"),o("p",{class:"option-desc"},[z("Click "),o("strong",null,"Inspect & Test"),z(" on any component card in the catalog, click "),o("strong",null,"Copy Code"),z(", and save as "),o("code",null,".vue"),z(" in your codebase.")])],-1))])]),_:1},8,["model-value"]))}},Bk=W(Dk,[["__scopeId","data-v-20a89417"]]),Rk={key:0,class:"toast-container"},Ok={class:"toast-content"},Fk={class:"toast-message"},_k={__name:"Toast",props:{message:{type:String,default:null}},setup(e){return(t,s)=>(r(),O(Zt,{to:"body"},[g(qe,{name:"toast-slide"},{default:A(()=>[e.message?(r(),d("div",Rk,[o("div",Ok,[s[0]||(s[0]=o("div",{class:"toast-icon"},[o("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#30d158","stroke-width":"2.5"},[o("path",{d:"M20 6L9 17l-5-5"})])],-1)),o("span",Fk,y(e.message),1)])])):S("",!0)]),_:1})]))}},jk=W(_k,[["__scopeId","data-v-54621596"]]),Hk=[{id:"all",label:"All"},{id:"templates",label:"Page Templates ✨"},{id:"navigation",label:"Navigation"},{id:"buttons",label:"Buttons"},{id:"panels",label:"Panels & Cards"},{id:"inputs",label:"Form Inputs"},{id:"overlays",label:"Overlays"},{id:"indicators",label:"Indicators"},{id:"data",label:"Data Display"},{id:"layout",label:"Layout"},{id:"mobile",label:"iOS Shell"}],Uk=[{id:"hero-page",name:"Hero, Headlines & CTA Page",category:"templates",description:"Apple-grade landing page with sticky glass nav, ambient gradient glow orbs, headlines, key metrics row, and feature cards.",tags:["template","hero","landing","headline","cta","page"],props:{},vueCode:e=>`<script setup>
import { HeroTemplate } from '@idesign/vue'
<\/script>

<template>
  <HeroTemplate />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import (pages/index.vue) -->
<template>
  <HeroTemplate />
</template>`,htmlCode:e=>`<section class="template-hero-page">
  <header class="glass-nav">
    <div class="nav-brand"><span>⚡</span> Idesign</div>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <button class="btn btn-primary btn-sm">Get Started</button>
    </nav>
  </header>
  <main class="hero-content">
    <span class="eyebrow-tag">DESIGN SYSTEM V2.0</span>
    <h1 class="hero-title">Spatial Computing Interfaces</h1>
    <p class="hero-desc">Apple-grade liquid glass component library for Vue 3 & Nuxt 3.</p>
  </main>
</section>`},{id:"product-page",name:"Product Showcase & Store Page",category:"templates",description:"Apple Store e-commerce page with category pill filters, image banner cards, price tags, quick view modal, and shopping bag counter.",tags:["template","product","store","ecommerce","shop","page"],props:{},vueCode:e=>`<script setup>
import { ProductShowcaseTemplate } from '@idesign/vue'
<\/script>

<template>
  <ProductShowcaseTemplate />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import (pages/store.vue) -->
<template>
  <ProductShowcaseTemplate />
</template>`,htmlCode:e=>`<div class="template-product-page">
  <header class="store-header">
    <h2>Apple Store Online</h2>
    <div class="bag-counter">Bag (2)</div>
  </header>
  <div class="product-grid">
    <article class="product-card">
      <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500" alt="Vision Pro" />
      <h3>Apple Vision Pro</h3>
      <span class="price">$3,499</span>
      <button class="btn btn-primary">Buy Now</button>
    </article>
  </div>
</div>`},{id:"ai-chat-page",name:"AI Chat Interface (iMessage)",category:"templates",description:"Vision Pro AI assistant page with variants for full page with sidebar vs standalone chat window without sidebar.",tags:["template","ai","chat","imessage","assistant","prompt","page"],props:{variant:{type:"select",options:["full","standalone","widget"],default:"full",description:"Layout structure variant for AI conversation shell."}},vueCode:e=>`<script setup>
import { AiChatTemplate } from '@idesign/vue'
<\/script>

<template>
  <AiChatTemplate variant="${e.variant}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <AiChatTemplate variant="${e.variant}" />
</template>`,htmlCode:e=>`<div class="template-chat-page variant-${e.variant}">
  <aside class="chat-sidebar">
    <button class="btn-new-chat">+ New Chat</button>
  </aside>
  <main class="chat-main">
    <div class="chat-messages">
      <div class="message user">How do I integrate Idesign?</div>
      <div class="message assistant">Import components from @idesign/vue directly.</div>
    </div>
    <div class="chat-input-bar">
      <input type="text" placeholder="Ask AI Assistant..." />
      <button class="btn-send">Send</button>
    </div>
  </main>
</div>`},{id:"dashboard-page",name:"Analytics & Systems Dashboard",category:"templates",description:"Apple System & Health dashboard with 4 KPI stat cards, interactive data table with search/selection, control panels, and team collaborators.",tags:["template","dashboard","analytics","admin","table","kpi","page"],props:{},vueCode:e=>`<script setup>
import { DashboardTemplate } from '@idesign/vue'
<\/script>

<template>
  <DashboardTemplate />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <DashboardTemplate />
</template>`,htmlCode:e=>`<div class="template-dashboard-page">
  <div class="kpi-grid">
    <div class="stat-card">
      <span class="label">Total Revenue</span>
      <span class="value">$128,450</span>
    </div>
  </div>
  <div class="data-table-container">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>Jane Doe</td><td>Design Lead</td><td>Active</td></tr>
      </tbody>
    </table>
  </div>
</div>`},{id:"auth-page",name:"Login & Sign Up Page",category:"templates",description:"Apple Liquid Glass authentication page supporting split-hero, centered-card, and minimal-glass passkey layouts.",tags:["template","login","signup","auth","signin","register","page","passkey"],props:{variant:{type:"select",options:["default","split-hero","centered-card","minimal-glass"],default:"default",description:"Visual style layout variant for authentication card."}},vueCode:e=>`<script setup>
import { AuthTemplate } from '@idesign/vue'
<\/script>

<template>
  <AuthTemplate variant="${e.variant}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <AuthTemplate variant="${e.variant}" />
</template>`,htmlCode:e=>`<div class="auth-page-container variant-${e.variant}">
  <div class="auth-card">
    <div class="auth-header">
      <h2>Welcome Back</h2>
      <p>Enter your credentials to access your dashboard.</p>
    </div>
    <form class="auth-form">
      <div class="input-group">
        <label>Email Address</label>
        <input type="email" placeholder="jane@apple.com" required />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Sign In →</button>
    </form>
  </div>
</div>`},{id:"glass-nav",name:"Sticky Glass Nav",category:"navigation",description:"Frosted header with saturation, blur, pill/solid/full-width variants, dynamic title, icon, and nav links.",tags:["nav","header","glass","sticky","pill"],props:{title:{type:"text",default:"Idesign",description:"Brand or page title rendered in the navbar header."},variant:{type:"select",options:["glass","solid","pill","full-width"],default:"glass",description:"Visual surface presentation variant."},icon:{type:"text",default:"⚡",description:"Brand icon emoji or SVG symbol displayed next to title."}},vueCode:e=>`<script setup>
import { IdGlassNav, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdGlassNav
    title="${e.title}"
    variant="${e.variant}"
    icon="${e.icon}"
    :links="[
      { label: 'Features', href: '#features' },
      { label: 'Components', href: '#components' },
      { label: 'Pricing', href: '#pricing' }
    ]"
  >
    <template #actions>
      <IdButton size="sm" variant="primary">Get Started</IdButton>
    </template>
  </IdGlassNav>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdGlassNav
    title="${e.title}"
    variant="${e.variant}"
    icon="${e.icon}"
    :links="[
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' }
    ]"
  />
</template>`,htmlCode:e=>`<header class="glass-nav variant-${e.variant}">
  <div class="nav-brand">
    <span class="brand-icon">${e.icon}</span>
    <span class="brand-title">${e.title}</span>
  </div>
  <nav class="nav-links">
    <a href="#features">Features</a>
    <a href="#components">Components</a>
    <a href="#pricing">Pricing</a>
  </nav>
  <div class="nav-actions">
    <button class="btn btn-primary btn-sm">Get Started</button>
  </div>
</header>`},{id:"stepper",name:"Step Progress Bar (Stepper)",category:"navigation",description:"Step progress bar component with completed checkmarks, active indicators, step labels, and descriptions.",tags:["stepper","steps","progress","wizard"],props:{activeStep:{type:"number",default:1,description:"Zero-based index of the currently active step."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Sizing scale for step indicators and labels."},variant:{type:"select",options:["default","glass"],default:"default",description:"Container surface background variant."},color:{type:"select",options:["blue","green","purple","orange"],default:"blue",description:"Active step accent theme color."},clickable:{type:"boolean",default:!0,description:"Allows clicking steps directly to change active step."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdStepper } from '@idesign/vue'

const currentStep = ref(${e.activeStep})
const steps = [
  { label: 'Account', description: 'Create credentials' },
  { label: 'Security', description: 'Set up 2FA' },
  { label: 'Confirm', description: 'Review details' }
]
<\/script>

<template>
  <IdStepper
    v-model="currentStep"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
    :clickable="${e.clickable}"
    :steps="steps"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStepper
    v-model="activeStep"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
    :clickable="${e.clickable}"
    :steps="steps"
  />
</template>`,htmlCode:e=>`<div class="id-stepper size-${e.size} variant-${e.variant} color-${e.color}">
  <ol class="stepper-list">
    <li class="step-item is-completed">
      <span class="step-badge">✓</span>
      <div class="step-meta"><span class="label">Account</span></div>
    </li>
    <li class="step-item is-active">
      <span class="step-badge">2</span>
      <div class="step-meta"><span class="label">Security</span></div>
    </li>
    <li class="step-item">
      <span class="step-badge">3</span>
      <div class="step-meta"><span class="label">Confirm</span></div>
    </li>
  </ol>
</div>`},{id:"segmented-control",name:"Segmented Pill Control",category:"navigation",description:"Grey track pill with white/black active modes and dynamic active prop state.",tags:["segmented","pill","filter","active"],props:{active:{type:"select",options:["Overview","Components","Tokens"],default:"Overview",description:"Currently active tab label."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Padding and text scale."},theme:{type:"select",options:["white","black"],default:"white",description:"Active pill background theme color."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdSegmentedControl } from '@idesign/vue'

const currentSegment = ref('${e.active}')
const options = ['Overview', 'Components', 'Tokens']
<\/script>

<template>
  <IdSegmentedControl
    v-model="currentSegment"
    size="${e.size}"
    theme="${e.theme}"
    :options="options"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSegmentedControl
    v-model="selected"
    size="${e.size}"
    theme="${e.theme}"
    :options="['Overview', 'Components', 'Tokens']"
  />
</template>`,htmlCode:e=>`<div class="segmented-control size-${e.size} theme-${e.theme}">
  <button class="seg-item ${e.active==="Overview"?"is-active":""}">Overview</button>
  <button class="seg-item ${e.active==="Components"?"is-active":""}">Components</button>
  <button class="seg-item ${e.active==="Tokens"?"is-active":""}">Tokens</button>
</div>`},{id:"tabs",name:"Tab Navigation",category:"navigation",description:"Tab list with animated sliding indicator bar and ARIA tab roles.",tags:["tabs","navigation","indicator"],props:{size:{type:"select",options:["sm","md","lg"],default:"md",description:"Tab text and padding size."},variant:{type:"select",options:["default","pill","glass"],default:"default",description:"Tab container layout style."},color:{type:"select",options:["blue","green","purple"],default:"blue",description:"Active bar accent color."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdTabs } from '@idesign/vue'

const activeTab = ref('overview')
const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'code', label: 'Code Snippets' },
  { value: 'api', label: 'API Reference' }
]
<\/script>

<template>
  <IdTabs
    v-model="activeTab"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
    :tabs="tabs"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTabs
    v-model="activeTab"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
    :tabs="tabs"
  />
</template>`,htmlCode:e=>`<div role="tablist" class="id-tabs size-${e.size} variant-${e.variant} color-${e.color}">
  <button role="tab" aria-selected="true" class="tab-item active">Overview</button>
  <button role="tab" aria-selected="false" class="tab-item">Code Snippets</button>
  <button role="tab" aria-selected="false" class="tab-item">API Reference</button>
  <div class="active-indicator-bar"></div>
</div>`},{id:"breadcrumbs",name:"Breadcrumbs",category:"navigation",description:"ARIA breadcrumb navigation supporting default, with-icons, and glass variants.",tags:["breadcrumbs","navigation","path","icon"],props:{variant:{type:"select",options:["default","with-icons","glass"],default:"default",description:"Breadcrumb visual presentation style."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Text and icon sizing."},color:{type:"select",options:["blue","purple","green","gray"],default:"blue",description:"Active item accent color."}},vueCode:e=>`<script setup>
import { IdBreadcrumbs } from '@idesign/vue'

const items = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Components', href: '/components', icon: 'Folder' },
  { label: 'Button', icon: 'Square' }
]
<\/script>

<template>
  <IdBreadcrumbs
    variant="${e.variant}"
    size="${e.size}"
    color="${e.color}"
    :items="items"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBreadcrumbs
    variant="${e.variant}"
    size="${e.size}"
    color="${e.color}"
    :items="items"
  />
</template>`,htmlCode:e=>`<nav aria-label="Breadcrumb" class="id-breadcrumbs variant-${e.variant} size-${e.size} color-${e.color}">
  <ol class="breadcrumb-list">
    <li class="crumb-item"><a href="/">Home</a><span class="sep">›</span></li>
    <li class="crumb-item"><a href="/components">Components</a><span class="sep">›</span></li>
    <li class="crumb-item is-active" aria-current="page">Button</li>
  </ol>
</nav>`},{id:"pagination",name:"Pagination",category:"navigation",description:"Page navigation with ellipsis, prev/next arrows, and tabular-nums.",tags:["pagination","pages","navigation"],props:{totalPages:{type:"number",default:12,description:"Total number of pages."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Button size scale."},variant:{type:"select",options:["default","pill","glass"],default:"default",description:"Page button shape variant."},color:{type:"select",options:["blue","green","purple"],default:"blue",description:"Active page accent color."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdPagination } from '@idesign/vue'

const currentPage = ref(1)
<\/script>

<template>
  <IdPagination
    v-model="currentPage"
    :total-pages="${e.totalPages||12}"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPagination
    v-model="currentPage"
    :total-pages="${e.totalPages||12}"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
  />
</template>`,htmlCode:e=>`<nav aria-label="Pagination" class="id-pagination size-${e.size} variant-${e.variant} color-${e.color}">
  <button class="page-btn prev" aria-label="Previous Page">‹</button>
  <button class="page-btn is-active">1</button>
  <button class="page-btn">2</button>
  <button class="page-btn">3</button>
  <span class="ellipsis">…</span>
  <button class="page-btn">${e.totalPages||12}</button>
  <button class="page-btn next" aria-label="Next Page">›</button>
</nav>`},{id:"dropdown-menu",name:"Dropdown Menu",category:"navigation",description:"Context/action menu with keyboard nav, shortcuts, and separators.",tags:["dropdown","menu","context"],props:{size:{type:"select",options:["sm","md","lg"],default:"md",description:"Menu padding and font size scale."},variant:{type:"select",options:["default","glass"],default:"default",description:"Frosted glass or default surface backdrop."}},vueCode:e=>`<script setup>
import { IdDropdownMenu, IdButton } from '@idesign/vue'

const items = [
  { label: 'Edit Project', shortcut: '⌘E' },
  { label: 'Duplicate', shortcut: '⌘D' },
  { separator: true },
  { label: 'Delete', danger: true, shortcut: '⌘⌫' }
]
<\/script>

<template>
  <IdDropdownMenu size="${e.size}" variant="${e.variant}" :items="items">
    <template #trigger>
      <IdButton variant="secondary">Actions ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDropdownMenu size="${e.size}" variant="${e.variant}" :items="items">
    <template #trigger>
      <IdButton variant="secondary">Actions ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>`,htmlCode:e=>`<div class="id-dropdown-wrapper">
  <button class="btn btn-secondary">Actions ▾</button>
  <div class="dropdown-menu size-${e.size} variant-${e.variant}" role="menu">
    <div class="menu-item" role="menuitem"><span>Edit Project</span><kbd>⌘E</kbd></div>
    <div class="menu-item" role="menuitem"><span>Duplicate</span><kbd>⌘D</kbd></div>
    <div class="menu-divider"></div>
    <div class="menu-item is-danger" role="menuitem"><span>Delete</span><kbd>⌘⌫</kbd></div>
  </div>
</div>`},{id:"dock",name:"macOS Floating Dock",category:"navigation",description:"macOS-style liquid glass floating dock navbar with magnification physics, tooltips, and active dots.",tags:["dock","macos","navbar","glass","floating"],props:{position:{type:"select",options:["bottom","top"],default:"bottom",description:"Screen placement position for floating dock bar."}},vueCode:e=>`<script setup>
import { IdDock } from '@idesign/vue'

const items = [
  { id: 'finder', label: 'Finder', icon: '📁', iconBg: '#007aff', active: true },
  { id: 'safari', label: 'Safari', icon: '🌐', iconBg: '#34c759' },
  { separator: true },
  { id: 'settings', label: 'Settings', icon: '⚙️', iconBg: '#8e8e93' }
]
<\/script>

<template>
  <IdDock position="${e.position}" :items="items" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDock position="${e.position}" :items="items" />
</template>`,htmlCode:e=>`<div class="id-dock-wrap position-${e.position}">
  <div class="dock-container">
    <button class="dock-icon active" title="Finder"><span class="icon-bg" style="background:#007aff;">📁</span><span class="active-dot"></span></button>
    <button class="dock-icon" title="Safari"><span class="icon-bg" style="background:#34c759;">🌐</span></button>
    <div class="dock-separator"></div>
    <button class="dock-icon" title="Settings"><span class="icon-bg" style="background:#8e8e93;">⚙️</span></button>
  </div>
</div>`},{id:"apple-button",name:"Apple Pill Buttons",category:"buttons",description:"Pill-shaped buttons with ≥44px touch targets, left/right Lucide icon support, color selection, disabled state, loading spinner, and 7 variants including outline.",tags:["button","pill","primary","secondary","outline","color","icon","disabled"],props:{label:{type:"text",default:"Continue",description:"Button text content."},variant:{type:"select",options:["primary","secondary","outline","glass","dark","ghost","danger"],default:"primary",description:"Visual style variant."},color:{type:"select",options:["blue","green","purple","orange","red","black"],default:"blue",description:"Accent background or outline color theme."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Size scale (sm: 34px, md: 42px, lg: 48px height)."},iconLeft:{type:"text",default:"⚡",description:"Left icon component name or emoji."},iconRight:{type:"text",default:"→",description:"Right icon component name or emoji."},disabled:{type:"boolean",default:!1,description:"Disables user interactions and applies muted styling."},loading:{type:"boolean",default:!1,description:"Replaces icon/text with animated loading spinner."},block:{type:"boolean",default:!1,description:"Expands button to fill 100% of parent width."}},vueCode:e=>`<script setup>
import { IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdButton
    variant="${e.variant}"
    color="${e.color}"
    size="${e.size}"
    ${e.iconLeft?`icon-left="${e.iconLeft}"`:""}
    ${e.iconRight?`icon-right="${e.iconRight}"`:""}
    ${e.disabled?"disabled":""}
    ${e.loading?"loading":""}
    ${e.block?"block":""}
  >
    ${e.label}
  </IdButton>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdButton
    variant="${e.variant}"
    color="${e.color}"
    size="${e.size}"
    ${e.iconLeft?`icon-left="${e.iconLeft}"`:""}
    ${e.iconRight?`icon-right="${e.iconRight}"`:""}
  >
    ${e.label}
  </IdButton>
</template>`,htmlCode:e=>`<button type="button" class="id-btn btn-${e.variant} color-${e.color} size-${e.size} ${e.block?"is-block":""}" ${e.disabled?"disabled":""}>
  ${e.iconLeft?`<span class="icon-left">${e.iconLeft}</span>`:""}
  <span class="btn-label">${e.label}</span>
  ${e.iconRight?`<span class="icon-right">${e.iconRight}</span>`:""}
</button>`},{id:"unified-panel",name:"Unified Panel List",category:"panels",description:"Anti-fragmentation pattern — one surface, no-dividers, glass, inset variants, Lucide icons.",tags:["panel","list","rows","glass","inset"],props:{size:{type:"select",options:["sm","md","lg"],default:"md",description:"Row padding and text size."},variant:{type:"select",options:["default","no-dividers","glass","inset"],default:"default",description:"Panel surface and border styling variant."},noDividers:{type:"boolean",default:!1,description:"Hides item row divider hairline borders."}},vueCode:e=>`<script setup>
import { IdPanel, IdPanelRow } from '@idesign/vue'
<\/script>

<template>
  <IdPanel size="${e.size}" variant="${e.variant}" ${e.noDividers?"no-dividers":""}>
    <IdPanelRow title="Wi-Fi" icon="Wifi" iconBg="#007aff" detail="Home Network" />
    <IdPanelRow title="Bluetooth" icon="Bluetooth" iconBg="#34c759" detail="On" />
    <IdPanelRow title="Notifications" icon="Bell" iconBg="#ff9500" detail="Enabled" />
  </IdPanel>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPanel size="${e.size}" variant="${e.variant}">
    <IdPanelRow title="Wi-Fi" icon="Wifi" iconBg="#007aff" detail="Home Network" />
    <IdPanelRow title="Bluetooth" icon="Bluetooth" iconBg="#34c759" detail="On" />
  </IdPanel>
</template>`,htmlCode:e=>`<div class="id-panel size-${e.size} variant-${e.variant}">
  <div class="panel-row">
    <div class="row-left"><span class="icon-sq" style="background:#007aff;">📶</span> <span class="row-title">Wi-Fi</span></div>
    <span class="row-detail">Home Network ›</span>
  </div>
  <div class="panel-row">
    <div class="row-left"><span class="icon-sq" style="background:#34c759;">⚡</span> <span class="row-title">Bluetooth</span></div>
    <span class="row-detail">On ›</span>
  </div>
</div>`},{id:"hero-cta",name:"Liquid Glass Hero CTA",category:"panels",description:"Gradient & glass CTA with ambient blur orbs behind frosted glass buttons.",tags:["hero","cta","gradient","glass"],props:{title:{type:"text",default:"Build Apple-Grade Apps",description:"Hero section primary title."},description:{type:"text",default:"Clean, unified surfaces with frosted glass used only where layers overlap.",description:"Body description text."},eyebrow:{type:"text",default:"DESIGN SYSTEM V2.0",description:"Small uppercase tagline pill text."},actionLabel:{type:"text",default:"Get Started",description:"Primary action button label."},variant:{type:"select",options:["glass","gradient"],default:"glass",description:"Hero background presentation style."}},vueCode:e=>`<script setup>
import { IdHeroCta, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdHeroCta
    title="${e.title}"
    description="${e.description}"
    eyebrow="${e.eyebrow}"
    action-label="${e.actionLabel}"
    variant="${e.variant}"
  >
    <template #actions>
      <IdButton variant="glass">Explore Documentation</IdButton>
    </template>
  </IdHeroCta>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdHeroCta
    title="${e.title}"
    description="${e.description}"
    eyebrow="${e.eyebrow}"
    action-label="${e.actionLabel}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<section class="id-hero-cta variant-${e.variant}">
  <div class="hero-orb orb-1"></div>
  <div class="hero-orb orb-2"></div>
  <div class="hero-inner">
    <span class="eyebrow">${e.eyebrow}</span>
    <h2 class="title">${e.title}</h2>
    <p class="desc">${e.description}</p>
    <div class="cta-actions">
      <button class="btn btn-primary">${e.actionLabel}</button>
      <button class="btn btn-glass">Explore</button>
    </div>
  </div>
</section>`},{id:"accordion",name:"Accordion",category:"panels",description:"Collapsible content panels supporting default, separated, and glass card variants.",tags:["accordion","collapse","expand","separated","cards","glass"],props:{size:{type:"select",options:["sm","md","lg"],default:"md",description:"Item padding and header size."},variant:{type:"select",options:["default","separated","glass"],default:"default",description:"Item container separation variant."}},vueCode:e=>`<script setup>
import { IdAccordion } from '@idesign/vue'

const items = [
  { title: 'What is Idesign?', content: 'An Apple-grade Vue 3 & Nuxt 3 component library.' },
  { title: 'Is it production ready?', content: 'Yes, fully tested with ESM and UMD bundles.' }
]
<\/script>

<template>
  <IdAccordion size="${e.size}" variant="${e.variant}" :items="items" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAccordion size="${e.size}" variant="${e.variant}" :items="items" />
</template>`,htmlCode:e=>`<div class="id-accordion size-${e.size} variant-${e.variant}">
  <div class="accordion-item is-expanded">
    <button class="accordion-header"><span>What is Idesign?</span><span class="chevron">▲</span></button>
    <div class="accordion-body"><p>An Apple-grade Vue 3 component library.</p></div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header"><span>Is it free?</span><span class="chevron">▼</span></button>
  </div>
</div>`},{id:"card",name:"Card (IdCard)",category:"panels",description:"Unified surface container supporting default text, action buttons, glass, hero, top image banner, and full background image variants.",tags:["card","image","banner","media","container"],props:{title:{type:"text",default:"Apple Vision Pro",description:"Card primary title."},subtitle:{type:"text",default:"Spatial Computing UI",description:"Subtitle metadata label."},description:{type:"text",default:"Welcome to the era of spatial computing.",description:"Body text content."},tag:{type:"text",default:"FEATURED",description:"Header tag pill text."},variant:{type:"select",options:["default","framed","glass","hero","image-top","image-bg"],default:"default",description:"Card visual container style."},image:{type:"text",default:"",description:"Optional header banner image URL."},showActions:{type:"boolean",default:!0,description:"Controls rendering of footer action buttons slot."},padding:{type:"select",options:["sm","md","lg"],default:"md",description:"Card internal padding size."},interactive:{type:"boolean",default:!1,description:"Enables hover elevation physics animation."}},vueCode:e=>`<script setup>
import { IdCard, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdCard
    title="${e.title}"
    subtitle="${e.subtitle}"
    description="${e.description}"
    variant="${e.variant}"
    padding="${e.padding}"
    ${e.tag?`tag="${e.tag}"`:""}
    ${e.image?`image="${e.image}"`:""}
    ${e.interactive?"interactive":""}
  >
    ${e.showActions?`<template #actions>
      <IdButton size="sm" variant="secondary">Details</IdButton>
      <IdButton size="sm" variant="primary">Action</IdButton>
    </template>`:""}
  </IdCard>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCard
    title="${e.title}"
    subtitle="${e.subtitle}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<div class="id-card variant-${e.variant} padding-${e.padding} ${e.interactive?"is-interactive":""}">
  <div class="card-header">
    <span class="card-tag">${e.tag||"FEATURED"}</span>
    <h3 class="card-title">${e.title}</h3>
    <span class="card-subtitle">${e.subtitle}</span>
  </div>
  <p class="card-body">${e.description}</p>
  <div class="card-actions">
    <button class="btn btn-secondary btn-sm">Details</button>
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>`},{id:"input",name:"Text Input",category:"inputs",description:"Quiet text input with search variant, clearable button, trailing text, and status rings.",tags:["input","text","form","search"],props:{placeholder:{type:"text",default:"Enter text...",description:"Input placeholder guidance text."},label:{type:"text",default:"Label",description:"Top label text."},variant:{type:"select",options:["default","search","error","success"],default:"default",description:"Input status or search variant."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Input height scale."},clearable:{type:"boolean",default:!0,description:"Displays an (x) clear button when text is present."},trailingText:{type:"text",default:"",description:'Trailing text unit badge (e.g. "USD").'}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdInput } from '@idesign/vue'

const textValue = ref('')
<\/script>

<template>
  <IdInput
    v-model="textValue"
    label="${e.label}"
    placeholder="${e.placeholder}"
    variant="${e.variant}"
    size="${e.size}"
    ${e.clearable?"clearable":""}
    ${e.trailingText?`trailing-text="${e.trailingText}"`:""}
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdInput
    v-model="textValue"
    label="${e.label}"
    placeholder="${e.placeholder}"
    variant="${e.variant}"
    size="${e.size}"
  />
</template>`,htmlCode:e=>`<div class="id-input-group size-${e.size} variant-${e.variant}">
  <label class="input-label">${e.label}</label>
  <div class="input-wrapper">
    <input type="text" class="id-input" placeholder="${e.placeholder}" />
    ${e.clearable?'<button class="clear-btn" aria-label="Clear input">✕</button>':""}
  </div>
</div>`},{id:"textarea",name:"Textarea",category:"inputs",description:"Multiline text input with size, glass variant, and optional character counter.",tags:["textarea","form","multiline","glass"],props:{label:{type:"text",default:"Description",description:"Header label text."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Textarea padding and font scale."},variant:{type:"select",options:["default","glass","error"],default:"default",description:"Surface glass or error border style."},maxlength:{type:"number",default:200,description:"Maximum allowed characters."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdTextarea } from '@idesign/vue'

const message = ref('')
<\/script>

<template>
  <IdTextarea
    v-model="message"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
    :maxlength="${e.maxlength}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTextarea
    v-model="message"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<div class="id-textarea-group size-${e.size} variant-${e.variant}">
  <label class="textarea-label">${e.label}</label>
  <textarea class="id-textarea" maxlength="${e.maxlength}" placeholder="Type message..."></textarea>
  <span class="char-count">0 / ${e.maxlength}</span>
</div>`},{id:"select",name:"Select Dropdown",category:"inputs",description:"Custom dropdown with keyboard nav, ARIA combobox role, size, and glass variants.",tags:["select","dropdown","form","no-divider","glass"],props:{label:{type:"text",default:"Framework",description:"Label text above dropdown trigger."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Height and font size scale."},variant:{type:"select",options:["default","no-divider","glass"],default:"default",description:"Dropdown item divider visual style."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdSelect } from '@idesign/vue'

const selected = ref('Vue 3')
const options = ['Vue 3', 'Nuxt 3', 'React', 'Svelte']
<\/script>

<template>
  <IdSelect
    v-model="selected"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
    :options="options"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSelect
    v-model="selected"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
    :options="['Vue 3', 'Nuxt 3', 'React']"
  />
</template>`,htmlCode:e=>`<div class="id-select-group size-${e.size} variant-${e.variant}">
  <label class="select-label">${e.label}</label>
  <div class="select-wrapper" role="combobox" aria-expanded="false">
    <span class="select-value">Vue 3</span>
    <span class="chevron">▾</span>
  </div>
</div>`},{id:"tour",name:"Product Tour Guide",category:"overlays",description:"Step-by-step product onboarding tour guide modal card supporting step-level custom badges, images, icons, and action button labels per step.",tags:["tour","onboarding","walkthrough","guide","steps","modal"],props:{nextLabel:{type:"text",default:"Continue →",description:"Default next step button text."},finishLabel:{type:"text",default:"Get Started ✨",description:"Final step primary action button text."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdTour, IdButton } from '@idesign/vue'

const tourOpen = ref(false)
const steps = [
  { title: 'Welcome to Idesign', description: 'Explore our Apple Liquid Glass design system.', badge: 'STEP 1 OF 3', icon: '⚡' },
  { title: 'Interactive Sandbox', description: 'Customize properties dynamically.', badge: 'STEP 2 OF 3', icon: '🎛️' },
  { title: 'Production Ready', description: 'Export clean ESM/UMD code snippets.', badge: 'STEP 3 OF 3', icon: '🚀' }
]
<\/script>

<template>
  <IdButton @click="tourOpen = true">Start Product Tour ✨</IdButton>
  <IdTour v-model="tourOpen" :steps="steps" next-label="${e.nextLabel}" finish-label="${e.finishLabel}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdButton @click="tourOpen = true">Start Product Tour ✨</IdButton>
  <IdTour v-model="tourOpen" :steps="steps" next-label="${e.nextLabel}" finish-label="${e.finishLabel}" />
</template>`,htmlCode:e=>`<div class="id-tour-overlay">
  <div class="tour-backdrop"></div>
  <div class="tour-card" role="dialog">
    <div class="tour-header">
      <span class="tour-step-pill">STEP 1 OF 3</span>
      <button class="tour-close-btn">✕</button>
    </div>
    <div class="tour-body">
      <h3>Welcome to Idesign</h3>
      <p>Explore our Apple-grade Liquid Glass design system.</p>
    </div>
    <div class="tour-footer">
      <button class="btn btn-primary">${e.nextLabel}</button>
    </div>
  </div>
</div>`},{id:"checkbox",name:"Checkbox",category:"inputs",description:"Checkbox with size, label, and Apple color palette selection.",tags:["checkbox","form","boolean","color"],props:{label:{type:"text",default:"Accept terms",description:"Label text next to checkbox."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Checkbox indicator size scale."},color:{type:"select",options:["blue","green","purple","orange","red"],default:"blue",description:"Checked accent background color."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdCheckbox } from '@idesign/vue'

const agreed = ref(true)
<\/script>

<template>
  <IdCheckbox
    v-model="agreed"
    label="${e.label}"
    size="${e.size}"
    color="${e.color}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCheckbox
    v-model="agreed"
    label="${e.label}"
    size="${e.size}"
    color="${e.color}"
  />
</template>`,htmlCode:e=>`<label class="id-checkbox size-${e.size} color-${e.color}">
  <input type="checkbox" checked />
  <span class="checkbox-box">✓</span>
  <span class="checkbox-label">${e.label}</span>
</label>`},{id:"radio-group",name:"Radio Group",category:"inputs",description:"Radio button group with vertical/horizontal layout.",tags:["radio","form","group"],props:{direction:{type:"select",options:["vertical","horizontal"],default:"vertical",description:"Layout arrangement direction."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdRadioGroup } from '@idesign/vue'

const plan = ref('Pro')
const options = ['Free', 'Pro', 'Enterprise']
<\/script>

<template>
  <IdRadioGroup
    v-model="plan"
    label="Select Plan"
    direction="${e.direction}"
    :options="options"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdRadioGroup
    v-model="plan"
    label="Plan"
    direction="${e.direction}"
    :options="['Free', 'Pro', 'Enterprise']"
  />
</template>`,htmlCode:e=>`<div class="id-radio-group direction-${e.direction}" role="radiogroup">
  <label class="radio-item"><input type="radio" name="plan" value="Free" /> <span>Free</span></label>
  <label class="radio-item"><input type="radio" name="plan" value="Pro" checked /> <span>Pro</span></label>
</div>`},{id:"slider",name:"Range Slider",category:"inputs",description:"Slider with accent fill track and ARIA range attributes.",tags:["slider","range","form"],props:{min:{type:"number",default:0,description:"Minimum range value."},max:{type:"number",default:100,description:"Maximum range value."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdSlider } from '@idesign/vue'

const val = ref(65)
<\/script>

<template>
  <IdSlider v-model="val" label="Volume" :min="${e.min}" :max="${e.max}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSlider v-model="val" label="Volume" :min="${e.min}" :max="${e.max}" />
</template>`,htmlCode:e=>`<div class="id-slider">
  <label>Volume: 65%</label>
  <input type="range" min="${e.min}" max="${e.max}" value="65" />
</div>`},{id:"ios-switch",name:"iOS Toggle Switch",category:"inputs",description:"iOS switch toggle with green, blue, purple, orange, red active color variants, sizes, and spring thumb.",tags:["toggle","switch","ios","color","size"],props:{label:{type:"text",default:"Notifications",description:"Label text next to toggle switch."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Switch scale size."},variant:{type:"select",options:["success","primary","purple","orange","red"],default:"success",description:"Active track color theme."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdToggle } from '@idesign/vue'

const enabled = ref(true)
<\/script>

<template>
  <IdToggle
    v-model="enabled"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdToggle
    v-model="enabled"
    label="${e.label}"
    size="${e.size}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<button type="button" role="switch" aria-checked="true" class="id-toggle size-${e.size} variant-${e.variant} is-active">
  <span class="toggle-thumb"></span>
</button>`},{id:"date-picker",name:"Date Picker",category:"inputs",description:"Apple Calendar-style date picker popover.",tags:["date","calendar","picker","form"],props:{label:{type:"text",default:"Select Date",description:"Input label text."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdDatePicker } from '@idesign/vue'

const date = ref('2026-08-15')
<\/script>

<template>
  <IdDatePicker v-model="date" label="${e.label}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDatePicker v-model="date" label="${e.label}" />
</template>`,htmlCode:e=>`<div class="id-date-picker">
  <label>${e.label}</label>
  <input type="date" value="2026-08-15" class="date-input" />
</div>`},{id:"command-palette",name:"Command Palette (⌘K)",category:"overlays",description:"Spotlight-style command palette modal with global ⌘K shortcut and keyboard nav.",tags:["command","palette","shortcut","spotlight"],props:{},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdCommandPalette } from '@idesign/vue'

const open = ref(false)
const groups = [
  { title: 'Navigation', items: [{ id: '1', label: 'Go to Components', shortcut: '⌘C' }] },
  { title: 'Actions', items: [{ id: '2', label: 'Create New Token', shortcut: '⌘N' }] }
]
<\/script>

<template>
  <IdCommandPalette v-model="open" :groups="groups" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCommandPalette v-model="open" :groups="groups" />
</template>`,htmlCode:e=>`<div class="command-palette-overlay">
  <div class="command-card" role="dialog">
    <div class="command-search"><span class="icon">🔍</span><input type="text" placeholder="Type a command or search..." /></div>
    <div class="command-group">
      <div class="group-title">Navigation</div>
      <div class="command-item active"><span>Go to Components</span><kbd>⌘C</kbd></div>
    </div>
  </div>
</div>`},{id:"liquid-modal",name:"Liquid Glass Modal",category:"overlays",description:"Clean frosted modal materializing with scale+opacity spring animation, body text prop, action slots, and glass/alert variants.",tags:["modal","dialog","overlay","glass"],props:{title:{type:"text",default:"Confirm Action",description:"Modal header title."},subtitle:{type:"text",default:"Are you sure you want to proceed?",description:"Subheader metadata text."},content:{type:"text",default:"Modal body content and description text goes here.",description:"Body text content."},variant:{type:"select",options:["default","glass","alert"],default:"default",description:"Modal backdrop and card visual style."},size:{type:"select",options:["sm","md","lg","xl"],default:"md",description:"Modal width scale."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdModal, IdButton } from '@idesign/vue'

const open = ref(false)
<\/script>

<template>
  <IdModal
    v-model="open"
    title="${e.title}"
    subtitle="${e.subtitle}"
    content="${e.content}"
    variant="${e.variant}"
    size="${e.size}"
  >
    <template #actions>
      <IdButton variant="secondary" @click="open = false">Cancel</IdButton>
      <IdButton variant="primary" @click="open = false">Confirm</IdButton>
    </template>
  </IdModal>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdModal
    v-model="open"
    title="${e.title}"
    subtitle="${e.subtitle}"
    content="${e.content}"
    variant="${e.variant}"
    size="${e.size}"
  />
</template>`,htmlCode:e=>`<div class="id-modal-overlay">
  <div class="modal-card size-${e.size} variant-${e.variant}" role="dialog">
    <div class="modal-header"><h3>${e.title}</h3><p>${e.subtitle}</p></div>
    <div class="modal-body"><p>${e.content}</p></div>
    <div class="modal-actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>`},{id:"bottom-sheet",name:"Bottom Sheet",category:"overlays",description:"Edge-anchored mobile sheet supporting title, description, body props, and grabber handle.",tags:["sheet","mobile","overlay"],props:{title:{type:"text",default:"Sheet Actions",description:"Header title."},description:{type:"text",default:"Choose an action to proceed.",description:"Subheader description."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdBottomSheet } from '@idesign/vue'

const open = ref(false)
<\/script>

<template>
  <IdBottomSheet v-model="open" title="${e.title}" description="${e.description}">
    <p>Sheet body content.</p>
  </IdBottomSheet>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBottomSheet v-model="open" title="${e.title}" description="${e.description}">
    <p>Sheet content</p>
  </IdBottomSheet>
</template>`,htmlCode:e=>`<div class="id-bottom-sheet">
  <div class="sheet-handle"></div>
  <div class="sheet-header"><h3>${e.title}</h3><p>${e.description}</p></div>
</div>`},{id:"drawer",name:"Side Drawer",category:"overlays",description:"Left/right sliding drawer supporting default and floating-sheet variants.",tags:["drawer","sidebar","overlay","sheet"],props:{title:{type:"text",default:"Settings",description:"Drawer title."},description:{type:"text",default:"Manage your preferences.",description:"Subheader description."},position:{type:"select",options:["right","left"],default:"right",description:"Screen edge anchor position."},variant:{type:"select",options:["default","floating-sheet"],default:"default",description:"Drawer card style."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdDrawer } from '@idesign/vue'

const open = ref(false)
<\/script>

<template>
  <IdDrawer
    v-model="open"
    title="${e.title}"
    description="${e.description}"
    position="${e.position}"
    variant="${e.variant}"
  >
    <p>Drawer body content.</p>
  </IdDrawer>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDrawer
    v-model="open"
    title="${e.title}"
    position="${e.position}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<div class="id-drawer position-${e.position} variant-${e.variant}">
  <div class="drawer-header"><h3>${e.title}</h3></div>
  <div class="drawer-body"><p>${e.description}</p></div>
</div>`},{id:"toast",name:"Toast Notification System",category:"overlays",description:"Floating liquid glass toast notifications with useToast() composable, status icons, action buttons, and auto-dismiss.",tags:["toast","notification","alert","floating","composable"],props:{message:{type:"text",default:"File saved successfully",description:"Notification message."},type:{type:"select",options:["success","info","warning","error"],default:"success",description:"Status icon and color theme."},position:{type:"select",options:["bottom-center","bottom-right","top-center","top-right"],default:"bottom-center",description:"Toast container screen anchor."}},vueCode:e=>`<script setup>
import { useToast, IdToast } from '@idesign/vue'

const toast = useToast()
const notify = () => {
  toast.${e.type}('${e.message}', { description: 'All changes stored in cloud.' })
}
<\/script>

<template>
  <!-- Mount root container in App.vue -->
  <IdToast position="${e.position}" />
  <button @click="notify">Show Toast</button>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdToast position="${e.position}" />
</template>`,htmlCode:e=>`<div class="id-toast-container position-${e.position}">
  <div class="toast-item type-${e.type}">
    <span class="toast-icon">✓</span>
    <div class="toast-meta">
      <span class="toast-msg">${e.message}</span>
    </div>
  </div>
</div>`},{id:"tooltip",name:"Tooltip",category:"overlays",description:"Rounded hover tooltip with dark mode support and top/bottom/left/right positions.",tags:["tooltip","popover","hover","darkmode"],props:{text:{type:"text",default:"Helpful tip",description:"Tooltip message text."},position:{type:"select",options:["top","bottom","left","right"],default:"top",description:"Anchor orientation."}},vueCode:e=>`<script setup>
import { IdTooltip, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdTooltip text="${e.text}" position="${e.position}">
    <IdButton>Hover me</IdButton>
  </IdTooltip>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTooltip text="${e.text}" position="${e.position}">
    <IdButton>Hover me</IdButton>
  </IdTooltip>
</template>`,htmlCode:e=>`<div class="id-tooltip-wrap">
  <button class="btn">Hover me</button>
  <div class="tooltip-card position-${e.position}" role="tooltip">${e.text}</div>
</div>`},{id:"live-indicator",name:"Live Pulsing Dot",category:"indicators",description:"Animated green pulsing indicator for live statuses.",tags:["live","dot","pulse"],props:{text:{type:"text",default:"SYSTEM · LIVE",description:"Badge label text."}},vueCode:e=>`<script setup>
import { IdLiveDot } from '@idesign/vue'
<\/script>

<template>
  <IdLiveDot>${e.text}</IdLiveDot>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdLiveDot>${e.text}</IdLiveDot>
</template>`,htmlCode:e=>`<span class="id-live-dot">
  <span class="pulse-ring"></span>
  <span class="dot"></span>
  <span class="live-label">${e.text}</span>
</span>`},{id:"tag",name:"Tags & Status Pills",category:"indicators",description:"Status pills and chips with left/right Lucide icon support, status colors, and dismiss buttons.",tags:["tag","chip","pill","status","icon"],props:{label:{type:"text",default:"Active",description:"Tag label text."},variant:{type:"select",options:["plain","accent","success","warning","danger","heat","mono"],default:"success",description:"Color theme variant."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Tag scale size."},iconLeft:{type:"text",default:"⚡",description:"Left icon symbol."},removable:{type:"boolean",default:!1,description:"Shows close dismiss button."}},vueCode:e=>`<script setup>
import { IdTag } from '@idesign/vue'
<\/script>

<template>
  <IdTag
    variant="${e.variant}"
    size="${e.size}"
    ${e.iconLeft?`icon-left="${e.iconLeft}"`:""}
    ${e.removable?"removable":""}
  >
    ${e.label}
  </IdTag>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTag variant="${e.variant}" size="${e.size}">
    ${e.label}
  </IdTag>
</template>`,htmlCode:e=>`<span class="id-tag variant-${e.variant} size-${e.size}">
  ${e.iconLeft?`<span class="icon">${e.iconLeft}</span>`:""}
  <span>${e.label}</span>
</span>`},{id:"alert",name:"Alert Banner",category:"indicators",description:"Info/success/warning/error/glass alert banner supporting custom icons, sizes, title, description, and dismissible props.",tags:["alert","banner","notification","icon","glass"],props:{variant:{type:"select",options:["info","success","warning","error","glass"],default:"info",description:"Alert tone variant."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Padding and text scale."},title:{type:"text",default:"Update Available",description:"Header title."},description:{type:"text",default:"A new version is ready to install.",description:"Body text content."}},vueCode:e=>`<script setup>
import { IdAlert } from '@idesign/vue'
<\/script>

<template>
  <IdAlert
    variant="${e.variant}"
    size="${e.size}"
    title="${e.title}"
    description="${e.description}"
    dismissible
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAlert
    variant="${e.variant}"
    size="${e.size}"
    title="${e.title}"
    description="${e.description}"
  />
</template>`,htmlCode:e=>`<div class="id-alert variant-${e.variant} size-${e.size}" role="alert">
  <div class="alert-content">
    <h4 class="alert-title">${e.title}</h4>
    <p class="alert-desc">${e.description}</p>
  </div>
</div>`},{id:"table",name:"Data Table & Row Actions",category:"data",description:"Clean data table with striped, glass, compact, borderless variants, column sorting, row selection checkboxes, live filter bar, dynamic count badge, and action dropdown slots.",tags:["table","grid","data","actions","select","sort","count"],props:{title:{type:"text",default:"Team Members",description:"Header title."},count:{type:"text",default:"",description:"Custom count badge text."},variant:{type:"select",options:["default","striped","glass","compact","borderless"],default:"default",description:"Table surface and border style."},selectable:{type:"boolean",default:!0,description:"Enables row checkbox selection."},searchable:{type:"boolean",default:!0,description:"Shows search filter bar."},hasRowActions:{type:"boolean",default:!0,description:"Enables row action dropdown slot."}},vueCode:e=>`<script setup>
import { IdTable, IdButton } from '@idesign/vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]
const data = [
  { name: 'Jane Doe', role: 'Design Lead', status: 'Active' }
]
<\/script>

<template>
  <IdTable
    title="${e.title}"
    variant="${e.variant}"
    :columns="columns"
    :data="data"
    ${e.selectable?"selectable":""}
    ${e.searchable?"searchable":""}
  >
    <template #actions="{ row }">
      <IdButton size="sm" variant="ghost">Edit</IdButton>
    </template>
  </IdTable>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTable
    title="${e.title}"
    variant="${e.variant}"
    :columns="columns"
    :data="data"
  />
</template>`,htmlCode:e=>`<div class="id-table-container variant-${e.variant}">
  <div class="table-header">
    <h3>${e.title}</h3>
  </div>
  <table class="id-table">
    <thead>
      <tr><th>Name</th><th>Role</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Jane Doe</td><td>Design Lead</td><td>Active</td></tr>
    </tbody>
  </table>
</div>`},{id:"avatar",name:"Avatar",category:"data",description:"User avatar supporting photo src images, Lucide icons, emojis, initials fallback, framed Apple ring, status dot, and squircle shape.",tags:["avatar","user","profile","squircle","icon","image"],props:{name:{type:"text",default:"Jane Smith",description:"User full name (used for initials fallback & tooltip)."},src:{type:"text",default:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",description:"Image avatar URL."},icon:{type:"select",options:["","⚡","🤖","👑","User","Sparkles"],default:"",description:"Icon symbol instead of image."},size:{type:"select",options:["xs","sm","md","lg","xl"],default:"md",description:"Avatar dimension scale."},shape:{type:"select",options:["circle","squircle"],default:"circle",description:"Border radius shape."},framed:{type:"boolean",default:!1,description:"Adds Apple Vision Pro glass border frame ring."},status:{type:"select",options:["online","offline","busy"],default:"online",description:"Presence status indicator dot."}},vueCode:e=>`<script setup>
import { IdAvatar } from '@idesign/vue'
<\/script>

<template>
  <IdAvatar
    name="${e.name}"
    src="${e.src}"
    size="${e.size}"
    shape="${e.shape}"
    status="${e.status}"
    ${e.framed?"framed":""}
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAvatar
    name="${e.name}"
    src="${e.src}"
    size="${e.size}"
    shape="${e.shape}"
  />
</template>`,htmlCode:e=>`<div class="id-avatar size-${e.size} shape-${e.shape} ${e.framed?"is-framed":""}">
  <img src="${e.src}" alt="${e.name}" />
  <span class="status-dot ${e.status}"></span>
</div>`},{id:"avatar-group",name:"Avatar Group",category:"data",description:"Stacked, grid, liquid glass hero, and expanded avatar groups with dynamic framed and shape props.",tags:["avatar","group","stacked","grid","glass","users"],props:{variant:{type:"select",options:["stacked","grid","hero","expanded"],default:"hero",description:"Layout arrangement style."},shape:{type:"select",options:["circle","squircle"],default:"circle",description:"Avatar item shape."},size:{type:"select",options:["xs","sm","md","lg","xl"],default:"md",description:"Avatar size scale."},max:{type:"number",default:3,description:"Maximum visible avatars before showing +N counter."},label:{type:"text",default:"5 active team members",description:"Metadata label text."},framed:{type:"boolean",default:!1,description:"Applies glass frame ring to each avatar."}},vueCode:e=>`<script setup>
import { IdAvatarGroup } from '@idesign/vue'

const users = [
  { name: 'Jane Smith' },
  { name: 'Alex Rivera' },
  { name: 'Sarah Chen' },
  { name: 'David Kim' }
]
<\/script>

<template>
  <IdAvatarGroup
    variant="${e.variant}"
    shape="${e.shape}"
    size="${e.size}"
    :max="${e.max}"
    label="${e.label}"
    ${e.framed?"framed":""}
    :users="users"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAvatarGroup
    variant="${e.variant}"
    shape="${e.shape}"
    size="${e.size}"
    :max="${e.max}"
    :users="users"
  />
</template>`,htmlCode:e=>`<div class="id-avatar-group variant-${e.variant} size-${e.size}">
  <div class="avatar-stack">
    <div class="avatar-item">JS</div>
    <div class="avatar-item">AR</div>
    <div class="avatar-more">+2</div>
  </div>
  <span class="group-label">${e.label}</span>
</div>`},{id:"stat",name:"Statistic Card",category:"data",description:"Key-value stat card with percentage change badge, size, glass/hero variants, comparison description prop, and SVG sparkline chart.",tags:["stat","sparkline","chart","kpi","description","hero","glass"],props:{label:{type:"text",default:"Total Revenue",description:"Metric title."},value:{type:"text",default:"$128,450",description:"Primary value text."},change:{type:"text",default:"+14.2%",description:"Percentage change tag text."},description:{type:"text",default:"Compared to $112,400 last month",description:"Subtext comparison detail."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Card scale size."},variant:{type:"select",options:["default","glass","hero"],default:"default",description:"Container visual style."}},vueCode:e=>`<script setup>
import { IdStat } from '@idesign/vue'
<\/script>

<template>
  <IdStat
    label="${e.label}"
    value="${e.value}"
    change="${e.change}"
    description="${e.description}"
    size="${e.size}"
    variant="${e.variant}"
    change-type="positive"
    :sparkline-data="[10, 25, 18, 35, 28, 45, 60]"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStat
    label="${e.label}"
    value="${e.value}"
    change="${e.change}"
    size="${e.size}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<div class="id-stat-card size-${e.size} variant-${e.variant}">
  <div class="stat-header">
    <span class="stat-label">${e.label}</span>
    <span class="change-tag positive">${e.change}</span>
  </div>
  <div class="stat-value">${e.value}</div>
  <p class="stat-desc">${e.description}</p>
</div>`},{id:"empty-state",name:"Empty / Error State",category:"indicators",description:"Empty or error state container with dynamic Lucide icons, emojis, titles, descriptions, and action buttons.",tags:["empty","error","state","blank","icon"],props:{title:{type:"text",default:"No Data Available",description:"Title header text."},description:{type:"text",default:"Create your first item to get started.",description:"Body guidance description."},icon:{type:"select",options:["🔍","📂","📦","⚡","Search","FolderOpen"],default:"🔍",description:"Center graphic icon symbol."},actionLabel:{type:"text",default:"Create New",description:"Action button text."}},vueCode:e=>`<script setup>
import { IdEmpty } from '@idesign/vue'
<\/script>

<template>
  <IdEmpty
    title="${e.title}"
    description="${e.description}"
    icon="${e.icon}"
    action-label="${e.actionLabel}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdEmpty
    title="${e.title}"
    description="${e.description}"
    icon="${e.icon}"
    action-label="${e.actionLabel}"
  />
</template>`,htmlCode:e=>`<div class="id-empty-state">
  <div class="empty-icon">${e.icon}</div>
  <h3 class="empty-title">${e.title}</h3>
  <p class="empty-desc">${e.description}</p>
  <button class="btn btn-primary">${e.actionLabel}</button>
</div>`},{id:"badge",name:"Badge",category:"data",description:"Notification badge with count overlay and dot indicator (hides count if 0 or null).",tags:["badge","count","notification"],props:{count:{type:"number",default:5,description:"Notification count number."},showZero:{type:"boolean",default:!1,description:"Renders badge even when count is 0."}},vueCode:e=>`<script setup>
import { IdBadge, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdBadge :count="${e.count}" ${e.showZero?"show-zero":""}>
    <IdButton>Notifications</IdButton>
  </IdBadge>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBadge :count="${e.count}">
    <IdButton>Notifications</IdButton>
  </IdBadge>
</template>`,htmlCode:e=>`<div class="id-badge-wrap">
  <button class="btn">Notifications</button>
  <span class="badge-count">${e.count}</span>
</div>`},{id:"progress",name:"Progress Bar",category:"data",description:"Determinate/indeterminate progress with ARIA progressbar, color selection, and shimmer animation.",tags:["progress","loading","bar","color"],props:{value:{type:"number",default:65,description:"Completion percentage (0-100)."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Progress bar height."},variant:{type:"select",options:["default","glass"],default:"default",description:"Track surface style."},color:{type:"select",options:["blue","green","purple","orange","red"],default:"blue",description:"Fill accent color."},indeterminate:{type:"boolean",default:!1,description:"Enables continuous pulsing shimmer animation."}},vueCode:e=>`<script setup>
import { IdProgress } from '@idesign/vue'
<\/script>

<template>
  <IdProgress
    :value="${e.value}"
    label="Upload"
    size="${e.size}"
    variant="${e.variant}"
    color="${e.color}"
    ${e.indeterminate?"indeterminate":""}
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdProgress
    :value="${e.value}"
    size="${e.size}"
    color="${e.color}"
  />
</template>`,htmlCode:e=>`<div role="progressbar" aria-valuenow="${e.value}" class="id-progress size-${e.size} color-${e.color}">
  <div class="progress-track">
    <div class="progress-fill" style="width: ${e.value}%;"></div>
  </div>
</div>`},{id:"skeleton",name:"Skeleton Loader",category:"data",description:"Shimmer loading placeholders rendering exact selected variant (rect, text, circle, card) and size.",tags:["skeleton","loading","placeholder","variant","size"],props:{variant:{type:"select",options:["rect","text","circle","card"],default:"rect",description:"Placeholder geometric shape."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Dimension scale."}},vueCode:e=>`<script setup>
import { IdSkeleton } from '@idesign/vue'
<\/script>

<template>
  <IdSkeleton variant="${e.variant}" size="${e.size}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSkeleton variant="${e.variant}" size="${e.size}" />
</template>`,htmlCode:e=>`<div class="id-skeleton variant-${e.variant} size-${e.size}"></div>`},{id:"spinner",name:"Loading Spinner",category:"data",description:"SVG arc spinner with optional label text, size, and color props.",tags:["spinner","loading","indicator","color"],props:{size:{type:"select",options:["sm","md","lg","xl"],default:"md",description:"Spinner diameter scale."},color:{type:"select",options:["blue","green","purple","white","gray"],default:"blue",description:"Arc stroke color."},label:{type:"text",default:"Loading...",description:"Optional label subtext."}},vueCode:e=>`<script setup>
import { IdSpinner } from '@idesign/vue'
<\/script>

<template>
  <IdSpinner size="${e.size}" color="${e.color}" label="${e.label}" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSpinner size="${e.size}" color="${e.color}" label="${e.label}" />
</template>`,htmlCode:e=>`<div class="id-spinner size-${e.size} color-${e.color}">
  <svg viewBox="0 0 24 24" class="spinner-svg"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2.5" /></svg>
  <span>${e.label}</span>
</div>`},{id:"stack",name:"Stack Layout",category:"layout",description:"Flex container helper supporting vertical/horizontal direction and custom gap.",tags:["stack","layout","flex"],props:{direction:{type:"select",options:["vertical","horizontal"],default:"vertical",description:"Flex layout direction."},gap:{type:"number",default:12,description:"Gap spacing between child elements in pixels."}},vueCode:e=>`<script setup>
import { IdStack } from '@idesign/vue'
<\/script>

<template>
  <IdStack direction="${e.direction}" :gap="${e.gap}">
    <div>Item 1</div>
    <div>Item 2</div>
  </IdStack>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStack direction="${e.direction}" :gap="${e.gap}">
    <div>Item 1</div>
    <div>Item 2</div>
  </IdStack>
</template>`,htmlCode:e=>`<div class="id-stack direction-${e.direction}" style="gap: ${e.gap}px;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`},{id:"grid",name:"Responsive Layout Grid",category:"layout",description:"CSS Grid layout helper with columns, gap, and responsive auto-fit props.",tags:["grid","layout","responsive","columns"],props:{cols:{type:"select",options:[1,2,3,4,6],default:3,description:"Number of grid columns."},gap:{type:"select",options:["sm","md","lg"],default:"md",description:"Grid gap spacing size."},autoFit:{type:"boolean",default:!1,description:"Enables responsive auto-fit column width."}},vueCode:e=>`<script setup>
import { IdGrid, IdCard } from '@idesign/vue'
<\/script>

<template>
  <IdGrid :cols="${e.cols}" gap="${e.gap}" ${e.autoFit?"auto-fit":""}>
    <IdCard title="Card 1" />
    <IdCard title="Card 2" />
    <IdCard title="Card 3" />
  </IdGrid>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdGrid :cols="${e.cols}" gap="${e.gap}">
    <IdCard title="Card 1" />
  </IdGrid>
</template>`,htmlCode:e=>`<div class="id-grid cols-${e.cols} gap-${e.gap}">
  <div class="grid-item">Card 1</div>
  <div class="grid-item">Card 2</div>
  <div class="grid-item">Card 3</div>
</div>`},{id:"file-upload",name:"File Upload",category:"inputs",description:"Drag & drop file upload zone with file list preview and size formatting.",tags:["upload","file","drag"],props:{},vueCode:e=>`<script setup>
import { IdFileUpload } from '@idesign/vue'
<\/script>

<template>
  <IdFileUpload @change="files => console.log(files)" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFileUpload @change="files => console.log(files)" />
</template>`,htmlCode:e=>`<div class="id-file-upload">
  <div class="drop-zone">
    <span class="upload-icon">📁</span>
    <p>Drag & drop files here, or <button class="btn-link">browse</button></p>
  </div>
</div>`},{id:"confirm-dialog",name:"Confirm Dialog",category:"overlays",description:"Action confirm dialog supporting default and centered-empty variants matching IdEmpty layout.",tags:["confirm","dialog","modal","centered"],props:{title:{type:"text",default:"Delete Security Token",description:"Dialog title."},message:{type:"text",default:"Are you sure you want to proceed?",description:"Message explanation."},variant:{type:"select",options:["default","centered-empty"],default:"default",description:"Visual dialog layout."},danger:{type:"boolean",default:!0,description:"Highlights primary button in red danger styling."}},vueCode:e=>`<script setup>
import { ref } from 'vue'
import { IdConfirmDialog } from '@idesign/vue'

const open = ref(false)
<\/script>

<template>
  <IdConfirmDialog
    v-model="open"
    title="${e.title}"
    message="${e.message}"
    variant="${e.variant}"
    ${e.danger?"danger":""}
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdConfirmDialog
    v-model="open"
    title="${e.title}"
    message="${e.message}"
    variant="${e.variant}"
  />
</template>`,htmlCode:e=>`<div class="confirm-dialog-overlay">
  <div class="confirm-card variant-${e.variant}">
    <h3>${e.title}</h3>
    <p>${e.message}</p>
    <div class="actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn ${e.danger?"btn-danger":"btn-primary"}">Confirm</button>
    </div>
  </div>
</div>`},{id:"carousel",name:"Card Carousel",category:"panels",description:"Apple Store-style horizontal snap card carousel with pagination dots and smooth physics.",tags:["carousel","cards","banner","slider"],props:{showDots:{type:"boolean",default:!0,description:"Shows bottom dot page indicators."},showControls:{type:"boolean",default:!0,description:"Shows prev/next arrow navigation buttons."}},vueCode:e=>`<script setup>
import { IdCarousel, IdCard } from '@idesign/vue'
<\/script>

<template>
  <IdCarousel :show-dots="${e.showDots}" :show-controls="${e.showControls}">
    <IdCard title="Slide 1" />
    <IdCard title="Slide 2" />
    <IdCard title="Slide 3" />
  </IdCarousel>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCarousel :show-dots="${e.showDots}" :show-controls="${e.showControls}">
    <IdCard title="Slide 1" />
  </IdCarousel>
</template>`,htmlCode:e=>`<div class="id-carousel-wrap">
  <div class="carousel-track">
    <div class="carousel-slide">Slide 1</div>
    <div class="carousel-slide">Slide 2</div>
  </div>
  ${e.showDots?'<div class="carousel-dots"><span class="dot active"></span><span class="dot"></span></div>':""}
</div>`},{id:"macos-banner",name:"macOS System Banner",category:"indicators",description:"macOS floating notification card with dynamic app name, title, message, time, icon, primary action, and secondary action buttons.",tags:["macos","banner","notification","system","icon","action"],props:{appName:{type:"text",default:"System Settings",description:"Application title label."},title:{type:"text",default:"Software Update Ready",description:"Banner title."},message:{type:"text",default:"macOS Sequoia 15.1 is ready to install.",description:"Notification message."},time:{type:"text",default:"now",description:"Timestamp label."},icon:{type:"select",options:["⚡","🔔","⚙️","📁"],default:"⚡",description:"App icon symbol."},actionLabel:{type:"text",default:"Update Now",description:"Primary action label."},secondaryActionLabel:{type:"text",default:"Options...",description:"Secondary options button label."}},vueCode:e=>`<script setup>
import { IdMacOsBanner } from '@idesign/vue'
<\/script>

<template>
  <IdMacOsBanner
    app-name="${e.appName}"
    title="${e.title}"
    message="${e.message}"
    time="${e.time}"
    icon="${e.icon}"
    action-label="${e.actionLabel}"
    secondary-action-label="${e.secondaryActionLabel}"
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdMacOsBanner
    app-name="${e.appName}"
    title="${e.title}"
    message="${e.message}"
  />
</template>`,htmlCode:e=>`<div class="macos-banner">
  <div class="banner-top">
    <span class="app-icon">${e.icon}</span>
    <span class="app-name">${e.appName}</span>
    <span class="time">${e.time}</span>
  </div>
  <h4 class="banner-title">${e.title}</h4>
  <p class="banner-msg">${e.message}</p>
  <div class="banner-actions">
    <button class="btn-action">${e.actionLabel}</button>
  </div>
</div>`},{id:"file-tree",name:"macOS Finder Tree",category:"data",description:"macOS Finder style expandable directory tree view with file/folder icons.",tags:["tree","finder","files","directory"],props:{},vueCode:e=>`<script setup>
import { IdFileTree } from '@idesign/vue'

const items = [
  { id: '1', name: 'src', children: [{ id: '2', name: 'App.vue' }] }
]
<\/script>

<template>
  <IdFileTree :items="items" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFileTree :items="items" />
</template>`,htmlCode:e=>`<div class="id-file-tree">
  <div class="tree-item folder expanded">
    <span class="icon">📁</span> <span class="name">src</span>
    <div class="tree-children">
      <div class="tree-item file"><span class="icon">📄</span> <span class="name">App.vue</span></div>
    </div>
  </div>
</div>`},{id:"popover",name:"Floating Popover",category:"overlays",description:"Floating card anchored to any trigger with title, subtitle, body text props, glass variant, and auto-outside click dismiss.",tags:["popover","floating","anchor","glass","body"],props:{position:{type:"select",options:["bottom","top","left","right"],default:"bottom",description:"Placement orientation."},title:{type:"text",default:"Popover Title",description:"Card title."},body:{type:"text",default:"Popover body content text goes here.",description:"Body text content."},size:{type:"select",options:["sm","md","lg"],default:"md",description:"Popover card size."},variant:{type:"select",options:["default","glass"],default:"default",description:"Frosted glass or default surface background."}},vueCode:e=>`<script setup>
import { IdPopover, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdPopover
    position="${e.position}"
    title="${e.title}"
    body="${e.body}"
    size="${e.size}"
    variant="${e.variant}"
  >
    <template #trigger>
      <IdButton>Toggle Popover</IdButton>
    </template>
  </IdPopover>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPopover
    position="${e.position}"
    title="${e.title}"
    body="${e.body}"
    size="${e.size}"
    variant="${e.variant}"
  >
    <template #trigger>
      <IdButton>Toggle Popover</IdButton>
    </template>
  </IdPopover>
</template>`,htmlCode:e=>`<div class="id-popover-wrapper">
  <button class="btn">Toggle Popover</button>
  <div class="popover-card position-${e.position} size-${e.size} variant-${e.variant}" role="dialog">
    <div class="popover-title">${e.title}</div>
    <div class="popover-body">${e.body}</div>
  </div>
</div>`},{id:"iphone-shell",name:"iPhone Frame Shell",category:"mobile",description:"Device frame with Dynamic Island, status bar, and home indicator.",tags:["iphone","mobile","ios"],props:{},vueCode:e=>`<script setup>
import { IdIphoneFrame } from '@idesign/vue'
<\/script>

<template>
  <IdIphoneFrame>
    <div style="padding: 16px;">
      <h3>iOS Application Content</h3>
    </div>
  </IdIphoneFrame>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdIphoneFrame>
    <div style="padding: 16px;">
      <h3>iOS Application Content</h3>
    </div>
  </IdIphoneFrame>
</template>`,htmlCode:e=>`<div class="iphone-shell">
  <div class="dynamic-island"></div>
  <div class="screen-content">
    <h3>iOS App Content</h3>
  </div>
  <div class="home-indicator"></div>
</div>`},{id:"bar-chart",name:"Dashboard Bar Chart",category:"data",description:"Animated SVG dashboard bar chart with value tooltips and custom bar colors.",tags:["chart","bar","graph","dashboard","data"],props:{height:{type:"number",default:180,description:"SVG chart height in pixels."}},vueCode:e=>`<script setup>
import { IdBarChart } from '@idesign/vue'

const chartData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 82 },
  { label: 'Wed', value: 60 },
  { label: 'Thu', value: 95 },
  { label: 'Fri', value: 75 }
]
<\/script>

<template>
  <IdBarChart :height="${e.height}" :data="chartData" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBarChart :height="${e.height}" :data="chartData" />
</template>`,htmlCode:e=>`<div class="id-bar-chart" style="height: ${e.height}px;">
  <svg viewBox="0 0 400 180" class="chart-svg">
    <rect x="20" y="80" width="30" height="90" fill="#0071e3" rx="4" />
    <rect x="80" y="40" width="30" height="130" fill="#0071e3" rx="4" />
  </svg>
</div>`},{id:"pie-chart",name:"Dashboard Donut Chart",category:"data",description:"Interactive SVG donut / pie chart component with center summary total and legend.",tags:["chart","pie","donut","graph","dashboard","analytics"],props:{centerLabel:{type:"text",default:"Direct Traffic",description:"Label shown inside center donut hole."}},vueCode:e=>`<script setup>
import { IdPieChart } from '@idesign/vue'

const data = [
  { label: 'Direct', value: 45, color: '#0071e3' },
  { label: 'Social', value: 25, color: '#30d158' },
  { label: 'Referral', value: 30, color: '#af52de' }
]
<\/script>

<template>
  <IdPieChart center-label="${e.centerLabel}" :data="data" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPieChart center-label="${e.centerLabel}" :data="data" />
</template>`,htmlCode:e=>`<div class="id-pie-chart">
  <div class="donut-center">${e.centerLabel}</div>
</div>`},{id:"timeline",name:"Activity Timeline",category:"data",description:"Vertical timeline component for activity feeds, release changelogs, audit logs, and status history.",tags:["timeline","activity","feed","history","changelog"],props:{},vueCode:e=>`<script setup>
import { IdTimeline } from '@idesign/vue'

const items = [
  { title: 'v2.4 Released', description: 'Added new components.', time: '10 min ago' }
]
<\/script>

<template>
  <IdTimeline :items="items" />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTimeline :items="items" />
</template>`,htmlCode:e=>`<div class="id-timeline">
  <div class="timeline-item">
    <span class="timeline-node"></span>
    <div class="timeline-content">
      <h4>v2.4 Released</h4>
      <p>Added new components.</p>
    </div>
  </div>
</div>`},{id:"project-section",name:"Featured Projects Section",category:"panels",description:"Apple portfolio section card container with inner project cards, status pills, tech stack icon badges, and chevron hover state.",tags:["projects","portfolio","section","cards","list"],props:{title:{type:"text",default:"Featured Projects",description:"Section title."},icon:{type:"text",default:"📁",description:"Section header icon."}},vueCode:e=>`<script setup>
import { IdProjectSection, IdProjectCard } from '@idesign/vue'
<\/script>

<template>
  <IdProjectSection title="${e.title}" icon="${e.icon}">
    <IdProjectCard title="Spatial Studio" description="Next-gen spatial computing workstation." logo="⚡" />
  </IdProjectSection>
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdProjectSection title="${e.title}" icon="${e.icon}">
    <IdProjectCard title="Spatial Studio" description="Next-gen spatial computing workstation." logo="⚡" />
  </IdProjectSection>
</template>`,htmlCode:e=>`<div class="id-project-section">
  <h3>${e.icon} ${e.title}</h3>
  <div class="project-card">Spatial Studio</div>
</div>`},{id:"image-frame",name:"Image Bezel Frame",category:"data",description:"Standalone Apple photo frame component with thick squircle or circular bezel, inset photo shadow, aspect ratios, and hover zoom physics.",tags:["frame","photo","bezel","image","portfolio"],props:{src:{type:"text",default:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",description:"Image source URL."},shape:{type:"select",options:["squircle","circle"],default:"squircle",description:"Frame bezel border radius shape."},aspectRatio:{type:"select",options:["1-1","16-9","4-3","3-4"],default:"1-1",description:"Aspect ratio container proportion."},bezelSize:{type:"select",options:["sm","md","lg"],default:"md",description:"Bezel border thickness."},caption:{type:"text",default:"Apple Studio Portrait",description:"Optional image caption."},interactive:{type:"boolean",default:!0,description:"Enables hover zoom animation."}},vueCode:e=>`<script setup>
import { IdImageFrame } from '@idesign/vue'
<\/script>

<template>
  <IdImageFrame
    src="${e.src}"
    shape="${e.shape}"
    aspect-ratio="${e.aspectRatio}"
    bezel-size="${e.bezelSize}"
    caption="${e.caption}"
    ${e.interactive?"interactive":""}
  />
</template>`,nuxtCode:e=>`<!-- Nuxt 3 Auto-Import -->
<template>
  <IdImageFrame
    src="${e.src}"
    shape="${e.shape}"
    aspect-ratio="${e.aspectRatio}"
  />
</template>`,htmlCode:e=>`<div class="id-image-frame shape-${e.shape} aspect-${e.aspectRatio} bezel-${e.bezelSize}">
  <img src="${e.src}" alt="${e.caption}" />
  <span class="caption">${e.caption}</span>
</div>`}],qk={class:"idesign-app"},Gk={style:{display:"flex","justify-content":"center",padding:"10px 0"}},Wk={style:{padding:"16px",flex:"1"}},Kk={style:{"margin-top":"16px"}},Jk={class:"main-footer"},Yk={class:"footer-container"},Qk={class:"footer-links"},Zk={__name:"App",setup(e){const t=B(null),s=B(""),a=B(null),n=B(!1),i=B(!1),l=B(!1),c=B(null);let u=null;const f=w=>{c.value=w,u&&clearTimeout(u),u=setTimeout(()=>{c.value=null},2400)},p=w=>{const m=w.vueCode({});navigator.clipboard.writeText(m),f(`Copied ${w.name} .vue SFC to clipboard!`)},h=()=>{t.value&&t.value.focusSearch()},k=w=>{(w.metaKey||w.ctrlKey)&&w.key==="k"&&(w.preventDefault(),h())};return tt(()=>{window.addEventListener("keydown",k)}),qs(()=>{window.removeEventListener("keydown",k)}),(w,m)=>(r(),d("div",qk,[g(ku,{ref_key:"navbarRef",ref:t,"search-query":s.value,"onUpdate:searchQuery":m[0]||(m[0]=$=>s.value=$),onOpenTokens:m[1]||(m[1]=$=>n.value=!0),onOpenMobileDemo:m[2]||(m[2]=$=>i.value=!0),onOpenInstall:m[3]||(m[3]=$=>l.value=!0)},null,8,["search-query"]),g(zu,{onToast:f}),g(Xp,{"search-query":s.value,"onUpdate:searchQuery":m[4]||(m[4]=$=>s.value=$),components:D(Uk),categories:D(Hk),onSelectComponent:m[5]||(m[5]=$=>a.value=$),onQuickCopy:p},null,8,["search-query","components","categories"]),g(Yt,{modelValue:i.value,"onUpdate:modelValue":m[6]||(m[6]=$=>i.value=$),title:"Apple iOS Mobile Shell Simulator","max-width":"420px"},{default:A(()=>[o("div",Gk,[g(al,null,{default:A(()=>[o("div",Wk,[m[12]||(m[12]=o("div",{style:{"font-size":"11px","font-weight":"700",color:"var(--accent)","letter-spacing":"0.1em","text-transform":"uppercase"}}," APP SHELL DEMO ",-1)),m[13]||(m[13]=o("h2",{style:{"font-size":"22px","font-weight":"700","letter-spacing":"-0.02em","margin-top":"4px"}}," Idesign iOS ",-1)),o("div",Kk,[g(ga,null,{default:A(()=>[g(Je,{title:"Large Title Collapse Nav",subtitle:"Smooth iOS scrolling behavior"}),g(Je,{title:"Edge Bottom Sheet",subtitle:"Native sheet transitions"}),g(Je,{title:"Safe Areas & Targets",subtitle:"Touch target ≥ 44px"})]),_:1})])])]),_:1})])]),_:1},8,["modelValue"]),g(Ak,{component:a.value,onClose:m[7]||(m[7]=$=>a.value=null),onToast:f},null,8,["component"]),g(Tk,{modelValue:n.value,"onUpdate:modelValue":m[8]||(m[8]=$=>n.value=$),onToast:f},null,8,["modelValue"]),g(Bk,{modelValue:l.value,"onUpdate:modelValue":m[9]||(m[9]=$=>l.value=$),onToast:f},null,8,["modelValue"]),o("footer",Jk,[o("div",Yk,[m[15]||(m[15]=o("div",{class:"footer-brand"},[o("span",{class:"footer-logo"},"⚡ Idesign"),o("p",{class:"footer-tagline"},"Apple-grade component system for Vue 3 and Nuxt 3.")],-1)),o("div",Qk,[m[14]||(m[14]=o("a",{href:"#components"},"Components",-1)),o("a",{href:"#",onClick:m[10]||(m[10]=Se($=>n.value=!0,["prevent"]))},"Tokens"),o("a",{href:"#",onClick:m[11]||(m[11]=Se($=>l.value=!0,["prevent"]))},"CLI Installation")])])]),g(jk,{message:c.value},null,8,["message"])]))}},Xk=W(Zk,[["__scopeId","data-v-7f758113"]]);Rd(Xk).mount("#app");

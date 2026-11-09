var K=globalThis,q=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),$e=new WeakMap,D=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(q&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=$e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(t,e))}return e}toString(){return this.cssText}},be=s=>new D(typeof s=="string"?s:s+"",void 0,Z),Q=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,o,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new D(t,s,Z)},_e=(s,e)=>{if(q)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),o=K.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},ee=q?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return be(t)})(s):s;var{is:We,defineProperty:Ke,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Ve,getOwnPropertySymbols:Ge,getPrototypeOf:Je}=Object,V=globalThis,xe=V.trustedTypes,Xe=xe?xe.emptyScript:"",Ye=V.reactiveElementPolyfillSupport,H=(s,e)=>s,te={toAttribute(s,e){switch(e){case Boolean:s=s?Xe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ke=(s,e)=>!We(s,e),Se={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Ke(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:n}=qe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:o,set(r){let l=o?.call(this);n?.call(this,r),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Se}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=Je(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,i=[...Ve(t),...Ge(t)];for(let o of i)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)t.unshift(ee(o))}else e!==void 0&&t.push(ee(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:te).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let n=i.getPropertyOptions(o),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:te;this._$Em=o;let l=r.fromAttribute(t,n.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,t,i,o=!1,n){if(e!==void 0){let r=this.constructor;if(o===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??ke)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,n]of i){let{wrapped:r}=n,l=this[o];r!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,n,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[H("elementProperties")]=new Map,$[H("finalized")]=new Map,Ye?.({ReactiveElement:$}),(V.reactiveElementVersions??=[]).push("2.1.2");var le=globalThis,we=s=>s,G=le.trustedTypes,Ae=G?G.createPolicy("lit-html",{createHTML:s=>s}):void 0,Me="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,De="?"+x,Ze=`<${De}>`,w=document,N=()=>w.createComment(""),U=s=>s===null||typeof s!="object"&&typeof s!="function",de=Array.isArray,Qe=s=>de(s)||typeof s?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,Ce=/>/g,S=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pe=/'/g,Te=/"/g,He=/^(?:script|style|textarea|title)$/i,pe=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),c=pe(1),vt=pe(2),$t=pe(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Re=new WeakMap,k=w.createTreeWalker(w,129);function Le(s,e){if(!de(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(e):e}var et=(s,e)=>{let t=s.length-1,i=[],o,n=e===2?"<svg>":e===3?"<math>":"",r=L;for(let l=0;l<t;l++){let a=s[l],d,h,p=-1,m=0;for(;m<a.length&&(r.lastIndex=m,h=r.exec(a),h!==null);)m=r.lastIndex,r===L?h[1]==="!--"?r=Ee:h[1]!==void 0?r=Ce:h[2]!==void 0?(He.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=S):h[3]!==void 0&&(r=S):r===S?h[0]===">"?(r=o??L,p=-1):h[1]===void 0?p=-2:(p=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?S:h[3]==='"'?Te:Pe):r===Te||r===Pe?r=S:r===Ee||r===Ce?r=L:(r=S,o=void 0);let g=r===S&&s[l+1].startsWith("/>")?" ":"";n+=r===L?a+Ze:p>=0?(i.push(d),a.slice(0,p)+Me+a.slice(p)+x+g):a+x+(p===-2?l:g)}return[Le(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},O=class s{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0,l=e.length-1,a=this.parts,[d,h]=et(e,t);if(this.el=s.createElement(d,i),k.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=k.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Me)){let m=h[r++],g=o.getAttribute(p).split(x),C=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:C[2],strings:g,ctor:C[1]==="."?oe:C[1]==="?"?ne:C[1]==="@"?re:T}),o.removeAttribute(p)}else p.startsWith(x)&&(a.push({type:6,index:n}),o.removeAttribute(p));if(He.test(o.tagName)){let p=o.textContent.split(x),m=p.length-1;if(m>0){o.textContent=G?G.emptyScript:"";for(let g=0;g<m;g++)o.append(p[g],N()),k.nextNode(),a.push({type:2,index:++n});o.append(p[m],N())}}}else if(o.nodeType===8)if(o.data===De)a.push({type:2,index:n});else{let p=-1;for(;(p=o.data.indexOf(x,p+1))!==-1;)a.push({type:7,index:n}),p+=x.length-1}n++}}static createElement(e,t){let i=w.createElement("template");return i.innerHTML=e,i}};function P(s,e,t=s,i){if(e===A)return e;let o=i!==void 0?t._$Co?.[i]:t._$Cl,n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=o:t._$Cl=o),o!==void 0&&(e=P(s,o._$AS(s,e.values),o,i)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??w).importNode(t,!0);k.currentNode=o;let n=k.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new B(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new ae(n,this,e)),this._$AV.push(d),a=i[++l]}r!==a?.index&&(n=k.nextNode(),r++)}return k.currentNode=w,o}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},B=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),U(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(Le(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let n=new se(o,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=Re.get(e.strings);return t===void 0&&Re.set(e.strings,t=new O(e)),t}k(e){de(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let n of e)o===t.length?t.push(i=new s(this.O(N()),this.O(N()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=we(e).nextSibling;we(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,t=this,i,o){let n=this.strings,r=!1;if(n===void 0)e=P(this,e,t,0),r=!U(e)||e!==this._$AH&&e!==A,r&&(this._$AH=e);else{let l=e,a,d;for(e=n[0],a=0;a<n.length-1;a++)d=P(this,l[i+a],t,a),d===A&&(d=this._$AH[a]),r||=!U(d)||d!==this._$AH[a],d===u?e=u:e!==u&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},oe=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},ne=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},re=class extends T{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??u)===A)return;let i=this._$AH,o=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==u&&(i===u||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ae=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var tt=le.litHtmlPolyfillSupport;tt?.(O,B),(le.litHtmlVersions??=[]).push("3.3.3");var Ne=(s,e,t)=>{let i=t?.renderBefore??e,o=i._$litPart$;if(o===void 0){let n=t?.renderBefore??null;i._$litPart$=o=new B(e.insertBefore(N(),n),n,void 0,t??{})}return o._$AI(s),o};var ce=globalThis,f=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};f._$litElement$=!0,f.finalized=!0,ce.litElementHydrateSupport?.({LitElement:f});var it=ce.litElementPolyfillSupport;it?.({LitElement:f});(ce.litElementVersions??=[]).push("4.2.2");var st=new Set(["unknown","unavailable",""]);function he(s){return s!==void 0&&!st.has(s.state)}function E(s){if(typeof s!="string")return;let e=new Date(s);return Number.isNaN(e.getTime())?void 0:e}function z(s){let e=typeof s=="number"?s:typeof s=="string"?Number(s):NaN;return Number.isFinite(e)?e:void 0}function ue(s){return typeof s=="string"&&s!==""?s:void 0}function ot(s,e){let t={};for(let i of Object.values(s.entities))i.device_id===e&&i.platform==="piyolog"&&i.translation_key&&(t[i.translation_key]=i.entity_id);return t}function me(s){let e=new Set;for(let t of Object.values(s.entities))t.platform==="piyolog"&&t.device_id&&e.add(t.device_id);return[...e]}function nt(s,e){let t=s.devices[e];return t?.name_by_user||t?.name||"PiyoLog"}function rt(s){if(!he(s))return;let e=s.attributes,t=E(e.today_start),i=E(e.today_end);if(!t||!i)return;let o=[];for(let r of Array.isArray(e.records)?e.records:[]){let l=r,a=E(l.time),d=ue(l.type);if(!a||!d)continue;let h=l.details&&typeof l.details=="object"?l.details:void 0;o.push({time:a,type:d,amountMl:z(l.amount_ml),details:h})}let n=[];for(let r of Array.isArray(e.sleep_intervals)?e.sleep_intervals:[]){let l=r,a=E(l.start),d=E(l.end);a&&d&&n.push({start:a,end:d})}return{start:t,end:i,records:o,sleepIntervals:n,openSleepSince:E(e.open_sleep_since)}}function Ue(s,e,t){let i=ot(s,e),o=M=>{let _=i[M];return _?s.states[_]:void 0},n=M=>{let _=o(M);return he(_)?E(_.state):void 0},r=M=>{let _=o(M);return he(_)?z(_.state):void 0},l=n("last_formula"),a=n("last_breastfeeding"),d=n("last_pee"),h=n("last_poop"),p=n("last_sleep"),m=n("last_wake_up"),g;p&&(!m||p>m)?g={kind:"sleep",time:p}:m&&(g={kind:"wake",time:m});let C=o("last_formula")?.attributes??{},ye=o("last_breastfeeding")?.attributes??{},ve=o("last_poop")?.attributes??{},Ie=r("sleep_today");return{name:t||nt(s,e),lastUpdated:n("last_updated"),formula:l?{time:l,ml:z(C.amount_ml)}:void 0,breastfeeding:a?{time:a,leftSeconds:z(ye.left_seconds),rightSeconds:z(ye.right_seconds)}:void 0,pee:d?{time:d}:void 0,poop:h?{time:h,hardness:ue(ve.hardness),color:ue(ve.color)}:void 0,sleepEvent:g,today:{formulaMl:r("formula_today"),breastfeedings:r("breastfeeding_count_today"),diapers:r("diaper_count_today"),sleepSeconds:Ie},timeline:rt(o("timeline"))}}var at={noDevice:"PiyoLog \u306E\u30C7\u30D0\u30A4\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",pickDevice:"\u30AB\u30FC\u30C9\u306E\u8A2D\u5B9A\u3067\u30C7\u30D0\u30A4\u30B9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044",noRecord:"\u8A18\u9332\u306A\u3057",justNow:"\u305F\u3063\u305F\u4ECA",agoSuffix:"\u524D",updated:s=>`\u66F4\u65B0 ${s}`,sleptSince:(s,e)=>`\u5C31\u5BDD ${s} \u304B\u3089 ${e}`,wokeSince:(s,e)=>`\u8D77\u5E8A ${s} \u304B\u3089 ${e}`,lastFormula:"\u6700\u5F8C\u306E\u30DF\u30EB\u30AF",lastBreastfeeding:"\u6700\u5F8C\u306E\u6388\u4E73",lastPee:"\u304A\u3057\u3063\u3053",lastPoop:"\u3046\u3093\u3061",today:"\u4ECA\u65E5",formula:"\u30DF\u30EB\u30AF",breastfeeding:"\u6388\u4E73",diapers:"\u304A\u3080\u3064",sleepConfirmed:"\u7761\u7720",sleepRow:"\u7761\u7720",milkRow:"\u30DF\u30EB\u30AF",diaperRow:"\u6392\u6CC4",legendSleep:"\u7761\u7720\uFF08\u8D77\u5E8A\u307E\u3067\u8A18\u9332\u6E08\u307F\uFF09",legendOpenSleep:"\u5C31\u5BDD\uFF08\u8D77\u5E8A\u304C\u672A\u8A18\u9332\uFF09",legendMilk:"\u30DF\u30EB\u30AF\u30FB\u6388\u4E73",legendPee:"\u304A\u3057\u3063\u3053",legendPoop:"\u3046\u3093\u3061",left:"\u5DE6",right:"\u53F3",minutesShort:"\u5206",hours:"\u6642\u9593",minutes:"\u5206",days:"\u65E5",editorDevice:"\u30C7\u30D0\u30A4\u30B9",editorName:"\u540D\u524D\uFF08\u7701\u7565\u3059\u308B\u3068\u30C7\u30D0\u30A4\u30B9\u540D\uFF09",editorKind:"\u8868\u793A\u5185\u5BB9",kindFormula:"\u30DF\u30EB\u30AF",kindSleep:"\u7761\u7720",sleepStartedAt:"\u5C31\u5BDD",poopSince:"\u3046\u3093\u3061\u304B\u3089",recordedSleep:"\u8A18\u9332\u6E08\u307F\u7761\u7720",todayTotal:"\u4ECA\u65E5\u306E\u5408\u8A08",hardness:{diarrhea:"\u4E0B\u75E2",soft:"\u8EDF\u3089\u304B\u3044",normal:"\u666E\u901A",hard:"\u786C\u3044"},color:{white:"\u767D",yellow:"\u9EC4\u8272",orange:"\u30AA\u30EC\u30F3\u30B8",brown:"\u8336\u8272",green:"\u7DD1",red:"\u8D64",black:"\u9ED2"},types:{Formula:"\u30DF\u30EB\u30AF",BreastFeeding:"\u6388\u4E73",ExpressedBreastMilk:"\u643E\u6BCD\u4E73",Pumping:"\u643E\u4E73",Sleep:"\u5C31\u5BDD",WakeUp:"\u8D77\u5E8A",Pee:"\u304A\u3057\u3063\u3053",Poop:"\u3046\u3093\u3061",Temperature:"\u4F53\u6E29",Weight:"\u4F53\u91CD",Height:"\u8EAB\u9577",Solid:"\u96E2\u4E73\u98DF",Snack:"\u9593\u98DF",Meal:"\u98DF\u4E8B",Drink:"\u98F2\u307F\u7269",Bath:"\u304A\u98A8\u5442",Medicine:"\u6295\u85AC",Hospital:"\u901A\u9662",Walking:"\u6563\u6B69"}},lt={noDevice:"No PiyoLog device found",pickDevice:"Choose a device in the card settings",noRecord:"No record",justNow:"just now",agoSuffix:" ago",updated:s=>`Updated ${s}`,sleptSince:(s,e)=>`Bedtime ${s} \xB7 ${e}`,wokeSince:(s,e)=>`Woke ${s} \xB7 ${e}`,lastFormula:"Last formula",lastBreastfeeding:"Last breastfeeding",lastPee:"Pee",lastPoop:"Poop",today:"Today",formula:"Formula",breastfeeding:"Feeds",diapers:"Diapers",sleepConfirmed:"Sleep",sleepRow:"Sleep",milkRow:"Milk",diaperRow:"Diaper",legendSleep:"Sleep (wake-up recorded)",legendOpenSleep:"Bedtime (no wake-up yet)",legendMilk:"Formula / breastfeeding",legendPee:"Pee",legendPoop:"Poop",left:"L",right:"R",minutesShort:"min",hours:"h",minutes:"m",days:"d",editorDevice:"Device",editorName:"Name (defaults to the device name)",editorKind:"Show",kindFormula:"Formula",kindSleep:"Sleep",sleepStartedAt:"Bedtime",poopSince:"since poop",recordedSleep:"Recorded sleep",todayTotal:"Today",hardness:{diarrhea:"Diarrhea",soft:"Soft",normal:"Normal",hard:"Hard"},color:{white:"White",yellow:"Yellow",orange:"Orange",brown:"Brown",green:"Green",red:"Red",black:"Black"},types:{Formula:"Formula",BreastFeeding:"Breastfeeding",ExpressedBreastMilk:"Expressed milk",Pumping:"Pumping",Sleep:"Bedtime",WakeUp:"Wake-up",Pee:"Pee",Poop:"Poop",Temperature:"Temperature",Weight:"Weight",Height:"Height",Solid:"Solid food",Snack:"Snack",Meal:"Meal",Drink:"Drink",Bath:"Bath",Medicine:"Medicine",Hospital:"Hospital",Walking:"Walk"}};function j(s){return s?.toLowerCase().startsWith("ja")?"ja":"en"}function b(s){return s==="ja"?at:lt}var fe=6e4,ge=60*fe,F=24*ge;function y(s,e){let t=b(e),i=Math.max(0,Math.floor(s/fe)),o=Math.floor(i/1440),n=Math.floor(i%1440/60),r=i%60,l=e==="ja"?"":" ",a=[];return o>0&&a.push(`${o}${t.days}`),(o>0||n>0)&&a.push(`${n}${t.hours}`),o===0&&(r>0||n===0)&&a.push(`${r}${t.minutes}`),o>0&&n===0&&r===0&&a.pop(),a.join(l).trim()}function I(s,e){let t=b(e);if(s<fe)return t.justNow;if(s>=F){let i=Math.floor(s/F),o=Math.floor(s%F/ge);return`${o>0?y(i*F+o*ge,e):y(i*F,e)}${t.agoSuffix}`}return`${y(s,e)}${t.agoSuffix}`}function Oe(s,e){return new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:e}).format(s)}function Be(s,e,t){let i=b(t),o=(n,r)=>r&&r>0?`${n} ${Math.round(r/60)}${i.minutesShort}`:void 0;return[o(i.left,s),o(i.right,e)].filter(Boolean).join(" / ")}var ze=Q`
  :host {
    display: block;
    --piyolog-milk: #4a90e2;
    --piyolog-sleep: #7c6fd6;
    --piyolog-pee: #e0834a;
    --piyolog-poop: #9a6b3f;
    --piyolog-dim: var(--secondary-text-color, #6a7587);
    --piyolog-fg: var(--primary-text-color, #1d2530);
    --piyolog-tile: var(--secondary-background-color, #f3f5f8);
    --piyolog-line: var(--divider-color, #e2e6ec);
  }
  ha-card {
    padding: 16px;
    display: grid;
    gap: 14px;
    color: var(--piyolog-fg);
  }
  ha-card.compact {
    padding: 12px 14px;
    gap: 12px;
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
    min-width: 0;
  }
  .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sub {
    font-size: 12px;
    color: var(--piyolog-dim);
  }
  .pill {
    margin-left: auto;
    flex: none;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 999px;
    white-space: nowrap;
    color: var(--piyolog-sleep);
    background: color-mix(in srgb, var(--piyolog-sleep) 16%, transparent);
    font-variant-numeric: tabular-nums;
  }
  .tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .tile {
    background: var(--piyolog-tile);
    border-radius: 10px;
    padding: 10px 12px;
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .tile .k {
    font-size: 11px;
    color: var(--piyolog-dim);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .tile .v {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    font-variant-numeric: tabular-nums;
  }
  .tile .v .unit,
  .big .v .unit {
    font-size: 12px;
    font-weight: 400;
    color: var(--piyolog-dim);
  }
  .tile .v.empty {
    font-size: 14px;
    color: var(--piyolog-dim);
    font-weight: 400;
  }
  .tile .d {
    font-size: 11px;
    color: var(--piyolog-dim);
    min-height: 1.2em;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .today {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--piyolog-line);
    padding-top: 12px;
    text-align: center;
  }
  .today > div {
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .today > div + div {
    border-left: 1px solid var(--piyolog-line);
  }
  .today .v {
    font-size: 16px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .today .v .unit {
    font-size: 11px;
    font-weight: 400;
    color: var(--piyolog-dim);
  }
  .today .k {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .message {
    padding: 8px 0;
    color: var(--piyolog-dim);
    font-size: 14px;
  }

  /* timeline */
  .tl {
    display: grid;
    gap: 10px;
  }
  .row {
    display: grid;
    grid-template-columns: 52px 1fr;
    align-items: center;
    gap: 8px;
  }
  .row .lab {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .track {
    position: relative;
    height: 22px;
    background: var(--piyolog-tile);
    border-radius: 6px;
  }
  .bar {
    position: absolute;
    top: 3px;
    bottom: 3px;
    border-radius: 4px;
    background: var(--piyolog-sleep);
    opacity: 0.85;
  }
  .mark {
    position: absolute;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 2px var(--ha-card-background, var(--card-background-color, #fff));
  }
  .mark.milk {
    background: var(--piyolog-milk);
  }
  .mark.pee {
    background: var(--piyolog-pee);
  }
  .mark.poop {
    background: var(--piyolog-poop);
  }
  .mark.open-sleep {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: 2px solid var(--piyolog-sleep);
    width: 8px;
    height: 8px;
  }
  .now {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 2px;
    border-radius: 1px;
    background: var(--primary-color, #f2b705);
  }
  .axis {
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 8px;
  }
  .ticks {
    position: relative;
    height: 14px;
    font-size: 10px;
    color: var(--piyolog-dim);
    font-variant-numeric: tabular-nums;
  }
  .ticks span {
    position: absolute;
    transform: translateX(-50%);
  }
  .ticks span:first-child {
    transform: none;
  }
  .ticks span:last-child {
    transform: translateX(-100%);
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .legend i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
    box-sizing: border-box;
  }
  .log {
    border-top: 1px solid var(--piyolog-line);
  }
  .log .item {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--piyolog-line);
    font-size: 13px;
  }
  .log .item:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .log .t,
  .log .r {
    font-size: 12px;
    color: var(--piyolog-dim);
    font-variant-numeric: tabular-nums;
  }

  /* compact */
  .line {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .ico {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    flex: none;
  }
  .txt {
    min-width: 0;
    display: grid;
  }
  .txt b {
    font-size: 14px;
  }
  .txt span {
    font-size: 12px;
    color: var(--piyolog-dim);
  }
  .big {
    margin-left: auto;
    text-align: right;
    display: grid;
    flex: none;
  }
  .big .v {
    font-size: 18px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .big .d {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .quick {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .quick > div {
    background: var(--piyolog-tile);
    border-radius: 10px;
    padding: 8px 6px;
    text-align: center;
    font-size: 12px;
    color: var(--piyolog-dim);
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .quick .v {
    color: var(--piyolog-fg);
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`;var dt=3e4;function R(s){let e=s.split(/(\d+)/).filter(t=>t!=="");return c`${e.map(t=>/^\d+$/.test(t)?c`${t}`:c`<span class="unit">${t}</span>`)}`}var v=class extends f{constructor(){super();this.compactCard=!1;this._now=Date.now()}setConfig(t){this._config={...t}}connectedCallback(){super.connectedCallback(),this._now=Date.now(),this._timer=window.setInterval(()=>this._now=Date.now(),dt)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer)}getCardSize(){return 4}get uiLang(){return j(this.hass?.language)}get s(){return b(this.uiLang)}clock(t){return Oe(t,this.hass?.config.time_zone??"UTC")}deviceId(){if(!this.hass)return;if(this._config?.device_id)return this._config.device_id;let t=me(this.hass);return t.length===1?t[0]:void 0}render(){if(!this.hass||!this._config)return u;let t=this.deviceId();if(!t){let o=me(this.hass).length===0;return c`<ha-card><div class="message">${o?this.s.noDevice:this.s.pickDevice}</div></ha-card>`}let i=Ue(this.hass,t,this._config.name);return c`<ha-card class=${this.compactCard?"compact":""}>${this.renderCard(i)}</ha-card>`}renderSleepPill(t){let i=t.sleepEvent;if(!i)return u;let o=(i.kind==="sleep"?this.s.sleptSince:this.s.wokeSince)(this.clock(i.time),y(this._now-i.time.getTime(),this.uiLang));return c`<div class="pill">${o}</div>`}};v.properties={hass:{attribute:!1},_config:{state:!0},_now:{state:!0}},v.styles=ze;var J=class extends v{constructor(){super(...arguments);this.compactCard=!0}icon(t,i){return c`<div class="ico" style="background:color-mix(in srgb, var(${i}) 18%, transparent)">
      <ha-icon icon=${t} style="color:var(${i})"></ha-icon>
    </div>`}renderFormula(t){let i=this.s,o=t.formula,n=o?[this.clock(o.time),o.ml!==void 0?`${o.ml}ml`:void 0].filter(Boolean).join(" \xB7 "):"",r=t.poop?y(this._now-t.poop.time.getTime(),this.uiLang):"\u2013";return c`
      <div class="line">
        ${this.icon("mdi:baby-bottle-outline","--piyolog-milk")}
        <div class="txt"><b>${i.lastFormula}</b><span class="num">${o?n:i.noRecord}</span></div>
        ${o?c`<div class="big">
              <span class="v" style="color:var(--piyolog-milk)"
                >${R(I(this._now-o.time.getTime(),this.uiLang))}</span
              >
              ${t.today.formulaMl!==void 0?c`<span class="d num">${i.todayTotal} ${t.today.formulaMl}ml</span>`:""}
            </div>`:""}
      </div>
      <div class="quick">
        <div><span class="v">${t.today.breastfeedings??"\u2013"}</span>${i.breastfeeding}</div>
        <div><span class="v">${t.today.diapers??"\u2013"}</span>${i.diapers}</div>
        <div><span class="v">${r}</span>${i.poopSince}</div>
      </div>
    `}renderSleep(t){let i=this.s,o=t.sleepEvent;if(!o)return c`<div class="line">
        ${this.icon("mdi:sleep","--piyolog-sleep")}
        <div class="txt"><b>${i.sleepConfirmed}</b><span>${i.noRecord}</span></div>
      </div>`;let n=t.today.sleepSeconds;return c`<div class="line">
      ${this.icon("mdi:sleep","--piyolog-sleep")}
      <div class="txt">
        <b>${o.kind==="sleep"?i.types.Sleep:i.types.WakeUp}</b><span class="num">${this.clock(o.time)}</span>
      </div>
      <div class="big">
        <span class="v" style="color:var(--piyolog-sleep)"
          >${R(I(this._now-o.time.getTime(),this.uiLang))}</span
        >
        ${n!==void 0?c`<span class="d num">${i.recordedSleep} ${y(n*1e3,this.uiLang)}</span>`:""}
      </div>
    </div>`}renderCard(t){return this._config?.kind==="sleep"?this.renderSleep(t):this.renderFormula(t)}getCardSize(){return this._config?.kind==="sleep"?1:2}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{kind:"formula"}}};var X=class extends v{tile(e,t,i,o){let n=c`<i class="dot" style="background:var(${t})"></i>`;return i?c`<div class="tile">
      <div class="k">${n}${e}</div>
      <div class="v">${R(I(this._now-i.getTime(),this.uiLang))}</div>
      <div class="d num">${[this.clock(i),o].filter(Boolean).join(" \xB7 ")}</div>
    </div>`:c`<div class="tile">
        <div class="k">${n}${e}</div>
        <div class="v empty">${this.s.noRecord}</div>
        <div class="d"></div>
      </div>`}count(e,t=""){return e===void 0?c`<span class="v">–</span>`:c`<span class="v">${e}${t?c`<span class="unit">${t}</span>`:""}</span>`}renderCard(e){let t=this.s,i=[e.poop?.hardness?t.hardness[e.poop.hardness]??e.poop.hardness:void 0,e.poop?.color?t.color[e.poop.color]??e.poop.color:void 0].filter(Boolean).join(" \xB7 "),o=e.breastfeeding?Be(e.breastfeeding.leftSeconds,e.breastfeeding.rightSeconds,this.uiLang):void 0,n=e.today.sleepSeconds;return c`
      <div class="head">
        <div style="min-width:0">
          <div class="name">${e.name}</div>
          <div class="sub num">${e.lastUpdated?t.updated(this.clock(e.lastUpdated)):""}</div>
        </div>
        ${this.renderSleepPill(e)}
      </div>
      <div class="tiles">
        ${this.tile(t.lastFormula,"--piyolog-milk",e.formula?.time,e.formula?.ml!==void 0?`${e.formula.ml}ml`:void 0)}
        ${this.tile(t.lastBreastfeeding,"--piyolog-milk",e.breastfeeding?.time,o)}
        ${this.tile(t.lastPee,"--piyolog-pee",e.pee?.time,void 0)}
        ${this.tile(t.lastPoop,"--piyolog-poop",e.poop?.time,i||void 0)}
      </div>
      <div class="today">
        <div>${this.count(e.today.formulaMl,"ml")}<span class="k">${t.formula}</span></div>
        <div>${this.count(e.today.breastfeedings)}<span class="k">${t.breastfeeding}</span></div>
        <div>${this.count(e.today.diapers)}<span class="k">${t.diapers}</span></div>
        <div>
          <span class="v"
            >${n===void 0?"\u2013":R(y(n*1e3,this.uiLang))}</span
          ><span class="k">${t.sleepConfirmed}</span>
        </div>
      </div>
    `}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{}}};function pt(s){return Math.min(100,Math.max(0,s))}function je(s,e){let t=s.start.getTime(),i=s.end.getTime()-t,o=p=>pt((p-t)/i*100),n=[];for(let p of s.sleepIntervals){let m=o(p.start.getTime()),g=o(p.end.getTime());g>m&&n.push({left:m,width:g-m})}let r=[],l=[];for(let p of s.records){let m=o(p.time.getTime());p.type==="Formula"||p.type==="BreastFeeding"?r.push({left:m,kind:"milk"}):p.type==="Pee"?l.push({left:m,kind:"pee"}):p.type==="Poop"&&l.push({left:m,kind:"poop"})}let a=s.openSleepSince,d=a&&a.getTime()>=t&&a.getTime()<t+i?{left:o(a.getTime()),kind:"open-sleep"}:void 0,h=e>=t&&e<t+i;return{sleepBars:n,milkMarks:r,diaperMarks:l,openSleepMark:d,now:h?o(e):void 0}}var ct=[0,6,12,18,24],ht=4,Y=class extends v{marks(e){return e.map(t=>c`<div class="mark ${t.kind}" style="left:${t.left}%"></div>`)}recordDetail(e){let t=this.s;return e.type==="Poop"&&e.details?[e.details.hardness?t.hardness[e.details.hardness]??e.details.hardness:void 0,e.details.color?t.color[e.details.color]??e.details.color:void 0].filter(Boolean).join(" \xB7 "):e.amountMl!==void 0?`${e.amountMl}ml`:""}renderCard(e){let t=this.s,i=e.timeline,o=c`<div class="head">
      <div style="min-width:0">
        <div class="name">${e.name} · ${t.today}</div>
        <div class="sub num">0:00 – 24:00</div>
      </div>
      ${this.renderSleepPill(e)}
    </div>`;if(!i)return c`${o}<div class="message">${t.noRecord}</div>`;let n=je(i,this._now),r=n.now===void 0?"":c`<div class="now" style="left:${n.now}%"></div>`,l=(d,h)=>c`<div class="row">
      <div class="lab">${d}</div>
      <div class="track">${h}${r}</div>
    </div>`,a=[...i.records].reverse().slice(0,ht);return c`
      ${o}
      <div class="tl">
        ${l(t.sleepRow,c`${n.sleepBars.map(d=>c`<div class="bar" style="left:${d.left}%;width:${d.width}%"></div>`)}${n.openSleepMark?this.marks([n.openSleepMark]):""}`)}
        ${l(t.milkRow,this.marks(n.milkMarks))} ${l(t.diaperRow,this.marks(n.diaperMarks))}
      </div>
      <div class="axis">
        <span></span>
        <div class="ticks">${ct.map(d=>c`<span style="left:${d/24*100}%">${d}:00</span>`)}</div>
      </div>
      <div class="legend">
        <span><i style="background:var(--piyolog-sleep)"></i>${t.legendSleep}</span>
        <span><i style="border:2px solid var(--piyolog-sleep)"></i>${t.legendOpenSleep}</span>
        <span><i style="background:var(--piyolog-milk)"></i>${t.legendMilk}</span>
        <span><i style="background:var(--piyolog-pee)"></i>${t.legendPee}</span>
        <span><i style="background:var(--piyolog-poop)"></i>${t.legendPoop}</span>
      </div>
      <div class="log">
        ${a.map(d=>c`<div class="item">
            <span class="t">${this.clock(d.time)}</span>
            <span>${t.types[d.type]??d.type}</span>
            <span class="r">${this.recordDetail(d)}</span>
          </div>`)}
      </div>
    `}getCardSize(){return 6}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{}}};var W=class extends f{constructor(){super(...arguments);this.label=t=>{let i=b(j(this.hass?.language));return{device_id:i.editorDevice,name:i.editorName,kind:i.editorKind}[t.name]??t.name}}setConfig(t){this._config=t}schema(){let t=b(j(this.hass?.language)),i=[{name:"device_id",selector:{device:{integration:"piyolog"}}},{name:"name",selector:{text:{}}}];return this._config?.type.endsWith("piyolog-compact-card")&&i.push({name:"kind",selector:{select:{mode:"dropdown",options:[{value:"formula",label:t.kindFormula},{value:"sleep",label:t.kindSleep}]}}}),i}changed(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,...t.detail.value}},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?u:c`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${this.schema()}
      .computeLabel=${this.label}
      @value-changed=${this.changed}
    ></ha-form>`}};W.properties={hass:{attribute:!1},_config:{state:!0}};var Fe=[{tag:"piyolog-summary-card",ctor:X,name:"PiyoLog summary",description:"Last feeding, diaper changes and today's totals."},{tag:"piyolog-timeline-card",ctor:Y,name:"PiyoLog timeline",description:"Sleep, feeding and diaper records across today."},{tag:"piyolog-compact-card",ctor:J,name:"PiyoLog compact",description:"A one-line card for formula or sleep."}];for(let s of Fe)customElements.get(s.tag)||customElements.define(s.tag,s.ctor);customElements.get("piyolog-card-editor")||customElements.define("piyolog-card-editor",W);var ut=window.customCards??=[];for(let s of Fe)ut.push({type:s.tag,name:s.name,description:s.description,preview:!1});

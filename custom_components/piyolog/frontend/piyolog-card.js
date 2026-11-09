var ee=globalThis,te=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),Te=new WeakMap,z=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(te&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Te.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Te.set(t,e))}return e}toString(){return this.cssText}},Ee=o=>new z(typeof o=="string"?o:o+"",void 0,le),F=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new z(t,o,le)},Pe=(o,e)=>{if(te)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=ee.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},de=te?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ee(t)})(o):o;var{is:Xe,defineProperty:Ze,getOwnPropertyDescriptor:et,getOwnPropertyNames:tt,getOwnPropertySymbols:it,getPrototypeOf:st}=Object,ie=globalThis,Re=ie.trustedTypes,ot=Re?Re.emptyScript:"",nt=ie.reactiveElementPolyfillSupport,j=(o,e)=>o,pe={toAttribute(o,e){switch(e){case Boolean:o=o?ot:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},De=(o,e)=>!Xe(o,e),Me={attribute:!0,type:String,converter:pe,reflect:!1,useDefault:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),ie.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ze(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=et(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let d=s?.call(this);n?.call(this,r),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Me}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;let e=st(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){let t=this.properties,i=[...tt(t),...it(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(de(s))}else e!==void 0&&t.push(de(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:pe).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:pe;this._$Em=s;let d=r.fromAttribute(t,n.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(e!==void 0){let r=this.constructor;if(s===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??De)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,d=this[s];r!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,n,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[j("elementProperties")]=new Map,_[j("finalized")]=new Map,nt?.({ReactiveElement:_}),(ie.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,Le=o=>o,se=ye.trustedTypes,Ue=se?se.createPolicy("lit-html",{createHTML:o=>o}):void 0,ze="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,Fe="?"+k,rt=`<${Fe}>`,T=document,q=()=>T.createComment(""),K=o=>o===null||typeof o!="object"&&typeof o!="function",ve=Array.isArray,at=o=>ve(o)||typeof o?.[Symbol.iterator]=="function",ce=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Oe=/>/g,A=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,Ie=/"/g,je=/^(?:script|style|textarea|title)$/i,$e=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),l=$e(1),At=$e(2),Ct=$e(3),E=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Be=new WeakMap,C=T.createTreeWalker(T,129);function We(o,e){if(!ve(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(e):e}var lt=(o,e)=>{let t=o.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",r=W;for(let d=0;d<t;d++){let a=o[d],c,m,p=-1,u=0;for(;u<a.length&&(r.lastIndex=u,m=r.exec(a),m!==null);)u=r.lastIndex,r===W?m[1]==="!--"?r=Ne:m[1]!==void 0?r=Oe:m[2]!==void 0?(je.test(m[2])&&(s=RegExp("</"+m[2],"g")),r=A):m[3]!==void 0&&(r=A):r===A?m[0]===">"?(r=s??W,p=-1):m[1]===void 0?p=-2:(p=r.lastIndex-m[2].length,c=m[1],r=m[3]===void 0?A:m[3]==='"'?Ie:He):r===Ie||r===He?r=A:r===Ne||r===Oe?r=W:(r=A,s=void 0);let g=r===A&&o[d+1].startsWith("/>")?" ":"";n+=r===W?a+rt:p>=0?(i.push(c),a.slice(0,p)+ze+a.slice(p)+k+g):a+k+(p===-2?d:g)}return[We(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},V=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0,d=e.length-1,a=this.parts,[c,m]=lt(e,t);if(this.el=o.createElement(c,i),C.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=C.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(ze)){let u=m[r++],g=s.getAttribute(p).split(k),x=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:x[2],strings:g,ctor:x[1]==="."?ge:x[1]==="?"?ue:x[1]==="@"?he:L}),s.removeAttribute(p)}else p.startsWith(k)&&(a.push({type:6,index:n}),s.removeAttribute(p));if(je.test(s.tagName)){let p=s.textContent.split(k),u=p.length-1;if(u>0){s.textContent=se?se.emptyScript:"";for(let g=0;g<u;g++)s.append(p[g],q()),C.nextNode(),a.push({type:2,index:++n});s.append(p[u],q())}}}else if(s.nodeType===8)if(s.data===Fe)a.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(k,p+1))!==-1;)a.push({type:7,index:n}),p+=k.length-1}n++}}static createElement(e,t){let i=T.createElement("template");return i.innerHTML=e,i}};function D(o,e,t=o,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,n=K(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=D(o,s._$AS(o,e.values),s,i)),e}var me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??T).importNode(t,!0);C.currentNode=s;let n=C.nextNode(),r=0,d=0,a=i[0];for(;a!==void 0;){if(r===a.index){let c;a.type===2?c=new Y(n,n.nextSibling,this,e):a.type===1?c=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(c=new fe(n,this,e)),this._$AV.push(c),a=i[++d]}r!==a?.index&&(n=C.nextNode(),r++)}return C.currentNode=T,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Y=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),K(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):at(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=V.createElement(We(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new me(s,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=Be.get(e.strings);return t===void 0&&Be.set(e.strings,t=new V(e)),t}k(e){ve(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new o(this.O(q()),this.O(q()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Le(e).nextSibling;Le(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},L=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,s){let n=this.strings,r=!1;if(n===void 0)e=D(this,e,t,0),r=!K(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let d=e,a,c;for(e=n[0],a=0;a<n.length-1;a++)c=D(this,d[i+a],t,a),c===E&&(c=this._$AH[a]),r||=!K(c)||c!==this._$AH[a],c===h?e=h:e!==h&&(e+=(c??"")+n[a+1]),this._$AH[a]=c}r&&!s&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ge=class extends L{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},ue=class extends L{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},he=class extends L{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=D(this,e,t,0)??h)===E)return;let i=this._$AH,s=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},fe=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}};var dt=ye.litHtmlPolyfillSupport;dt?.(V,Y),(ye.litHtmlVersions??=[]).push("3.3.3");var qe=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let n=t?.renderBefore??null;i._$litPart$=s=new Y(e.insertBefore(q(),n),n,void 0,t??{})}return s._$AI(o),s};var _e=globalThis,$=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=qe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};$._$litElement$=!0,$.finalized=!0,_e.litElementHydrateSupport?.({LitElement:$});var pt=_e.litElementPolyfillSupport;pt?.({LitElement:$});(_e.litElementVersions??=[]).push("4.2.2");var ct=new Set(["unknown","unavailable",""]);function be(o){return o!==void 0&&!ct.has(o.state)}function P(o){if(typeof o!="string")return;let e=new Date(o);return Number.isNaN(e.getTime())?void 0:e}function Q(o){let e=typeof o=="number"?o:typeof o=="string"?Number(o):NaN;return Number.isFinite(e)?e:void 0}function Se(o){return typeof o=="string"&&o!==""?o:void 0}function mt(o,e){let t={};for(let i of Object.values(o.entities))i.device_id===e&&i.platform==="piyolog"&&i.translation_key&&(t[i.translation_key]=i.entity_id);return t}function xe(o){let e=new Set;for(let t of Object.values(o.entities))t.platform==="piyolog"&&t.device_id&&e.add(t.device_id);return[...e]}function gt(o,e){let t=o.devices[e];return t?.name_by_user||t?.name||"PiyoLog"}function ut(o){if(!be(o))return;let e=o.attributes,t=P(e.today_start),i=P(e.today_end);if(!t||!i)return;let s=[];for(let r of Array.isArray(e.records)?e.records:[]){let d=r,a=P(d.time),c=Se(d.type);if(!a||!c)continue;let m=d.details&&typeof d.details=="object"?d.details:void 0;s.push({time:a,type:c,amountMl:Q(d.amount_ml),details:m})}let n=[];for(let r of Array.isArray(e.sleep_intervals)?e.sleep_intervals:[]){let d=r,a=P(d.start),c=P(d.end);a&&c&&n.push({start:a,end:c})}return{start:t,end:i,records:s,sleepIntervals:n,openSleepSince:P(e.open_sleep_since)}}function Ke(o,e,t){let i=mt(o,e),s=B=>{let w=i[B];return w?o.states[w]:void 0},n=B=>{let w=s(B);return be(w)?P(w.state):void 0},r=B=>{let w=s(B);return be(w)?Q(w.state):void 0},d=n("last_formula"),a=n("last_breastfeeding"),c=n("last_pee"),m=n("last_poop"),p=n("last_sleep"),u=n("last_wake_up"),g;p&&(!u||p>u)?g={kind:"sleep",time:p}:u&&(g={kind:"wake",time:u});let x=s("last_formula")?.attributes??{},Ae=s("last_breastfeeding")?.attributes??{},Ce=s("last_poop")?.attributes??{},Je=r("sleep_today");return{name:t||gt(o,e),lastUpdated:n("last_updated"),formula:d?{time:d,ml:Q(x.amount_ml)}:void 0,breastfeeding:a?{time:a,leftSeconds:Q(Ae.left_seconds),rightSeconds:Q(Ae.right_seconds)}:void 0,pee:c?{time:c}:void 0,poop:m?{time:m,hardness:Se(Ce.hardness),color:Se(Ce.color)}:void 0,sleepEvent:g,today:{formulaMl:r("formula_today"),breastfeedings:r("breastfeeding_count_today"),diapers:r("diaper_count_today"),sleepSeconds:Je},timeline:ut(s("timeline"))}}var ht={noDevice:"PiyoLog \u306E\u30C7\u30D0\u30A4\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",pickDevice:"\u30AB\u30FC\u30C9\u306E\u8A2D\u5B9A\u3067\u30C7\u30D0\u30A4\u30B9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044",noRecord:"\u8A18\u9332\u306A\u3057",justNow:"\u305F\u3063\u305F\u4ECA",agoSuffix:"\u524D",updated:o=>`\u66F4\u65B0 ${o}`,sleptSince:(o,e)=>`\u5C31\u5BDD ${o} \u304B\u3089 ${e}`,wokeSince:(o,e)=>`\u8D77\u5E8A ${o} \u304B\u3089 ${e}`,lastFormula:"\u6700\u5F8C\u306E\u30DF\u30EB\u30AF",lastBreastfeeding:"\u6700\u5F8C\u306E\u6388\u4E73",lastPee:"\u304A\u3057\u3063\u3053",lastPoop:"\u3046\u3093\u3061",today:"\u4ECA\u65E5",formula:"\u30DF\u30EB\u30AF",breastfeeding:"\u6388\u4E73",diapers:"\u304A\u3080\u3064",sleepConfirmed:"\u7761\u7720",sleepRow:"\u7761\u7720",milkRow:"\u30DF\u30EB\u30AF",diaperRow:"\u6392\u6CC4",legendSleep:"\u7761\u7720\uFF08\u8D77\u5E8A\u307E\u3067\u8A18\u9332\u6E08\u307F\uFF09",legendOpenSleep:"\u5C31\u5BDD\uFF08\u8D77\u5E8A\u304C\u672A\u8A18\u9332\uFF09",legendMilk:"\u30DF\u30EB\u30AF\u30FB\u6388\u4E73",legendPee:"\u304A\u3057\u3063\u3053",legendPoop:"\u3046\u3093\u3061",left:"\u5DE6",right:"\u53F3",minutesShort:"\u5206",hours:"\u6642\u9593",minutes:"\u5206",days:"\u65E5",editorDevice:"\u30C7\u30D0\u30A4\u30B9",editorName:"\u540D\u524D\uFF08\u7701\u7565\u3059\u308B\u3068\u30C7\u30D0\u30A4\u30B9\u540D\uFF09",editorKind:"\u8868\u793A\u5185\u5BB9",editorTiles:"\u6700\u5F8C\u306E\u8A18\u9332\uFF08\u4E26\u3073\u9806\u3069\u304A\u308A\u306B\u8868\u793A\uFF09",editorTotals:"\u4ECA\u65E5\u306E\u5408\u8A08\uFF08\u4E26\u3073\u9806\u3069\u304A\u308A\u306B\u8868\u793A\uFF09",editorRows:"\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3\u306E\u884C\uFF08\u4E26\u3073\u9806\u3069\u304A\u308A\u306B\u8868\u793A\uFF09",editorLegend:"\u51E1\u4F8B\u3092\u8868\u793A",editorLog:"\u6700\u8FD1\u306E\u8A18\u9332\u3092\u8868\u793A",editorQuick:"\u4E0B\u6BB5\u306E\u9805\u76EE\uFF08\u4E26\u3073\u9806\u3069\u304A\u308A\u306B\u8868\u793A\uFF09",editorItems:"\u8868\u793A\u3059\u308B\u9805\u76EE\uFF08\u4E26\u3073\u9806\u3069\u304A\u308A\u306B\u8868\u793A\uFF09",todayFormula:"\u4ECA\u65E5\u306E\u30DF\u30EB\u30AF",todayBreastfeeding:"\u4ECA\u65E5\u306E\u6388\u4E73",todayDiapers:"\u4ECA\u65E5\u306E\u304A\u3080\u3064",todaySleep:"\u4ECA\u65E5\u306E\u7761\u7720",kindFormula:"\u30DF\u30EB\u30AF",kindSleep:"\u7761\u7720",sleepStartedAt:"\u5C31\u5BDD",poopSince:"\u3046\u3093\u3061\u304B\u3089",recordedSleep:"\u8A18\u9332\u6E08\u307F\u7761\u7720",todayTotal:"\u4ECA\u65E5\u306E\u5408\u8A08",hardness:{diarrhea:"\u4E0B\u75E2",soft:"\u8EDF\u3089\u304B\u3044",normal:"\u666E\u901A",hard:"\u786C\u3044"},color:{white:"\u767D",yellow:"\u9EC4\u8272",orange:"\u30AA\u30EC\u30F3\u30B8",brown:"\u8336\u8272",green:"\u7DD1",red:"\u8D64",black:"\u9ED2"},types:{Formula:"\u30DF\u30EB\u30AF",BreastFeeding:"\u6388\u4E73",ExpressedBreastMilk:"\u643E\u6BCD\u4E73",Pumping:"\u643E\u4E73",Sleep:"\u5C31\u5BDD",WakeUp:"\u8D77\u5E8A",Pee:"\u304A\u3057\u3063\u3053",Poop:"\u3046\u3093\u3061",Temperature:"\u4F53\u6E29",Weight:"\u4F53\u91CD",Height:"\u8EAB\u9577",Solid:"\u96E2\u4E73\u98DF",Snack:"\u9593\u98DF",Meal:"\u98DF\u4E8B",Drink:"\u98F2\u307F\u7269",Bath:"\u304A\u98A8\u5442",Medicine:"\u6295\u85AC",Hospital:"\u901A\u9662",Walking:"\u6563\u6B69"}},ft={noDevice:"No PiyoLog device found",pickDevice:"Choose a device in the card settings",noRecord:"No record",justNow:"just now",agoSuffix:" ago",updated:o=>`Updated ${o}`,sleptSince:(o,e)=>`Bedtime ${o} \xB7 ${e}`,wokeSince:(o,e)=>`Woke ${o} \xB7 ${e}`,lastFormula:"Last formula",lastBreastfeeding:"Last breastfeeding",lastPee:"Pee",lastPoop:"Poop",today:"Today",formula:"Formula",breastfeeding:"Feeds",diapers:"Diapers",sleepConfirmed:"Sleep",sleepRow:"Sleep",milkRow:"Milk",diaperRow:"Diaper",legendSleep:"Sleep (wake-up recorded)",legendOpenSleep:"Bedtime (no wake-up yet)",legendMilk:"Formula / breastfeeding",legendPee:"Pee",legendPoop:"Poop",left:"L",right:"R",minutesShort:"min",hours:"h",minutes:"m",days:"d",editorDevice:"Device",editorName:"Name (defaults to the device name)",editorKind:"Show",editorTiles:"Last records (shown in this order)",editorTotals:"Today's totals (shown in this order)",editorRows:"Timeline rows (shown in this order)",editorLegend:"Show legend",editorLog:"Show recent records",editorQuick:"Bottom items (shown in this order)",editorItems:"Items (shown in this order)",todayFormula:"Formula today",todayBreastfeeding:"Breastfeedings today",todayDiapers:"Diapers today",todaySleep:"Sleep today",kindFormula:"Formula",kindSleep:"Sleep",sleepStartedAt:"Bedtime",poopSince:"since poop",recordedSleep:"Recorded sleep",todayTotal:"Today",hardness:{diarrhea:"Diarrhea",soft:"Soft",normal:"Normal",hard:"Hard"},color:{white:"White",yellow:"Yellow",orange:"Orange",brown:"Brown",green:"Green",red:"Red",black:"Black"},types:{Formula:"Formula",BreastFeeding:"Breastfeeding",ExpressedBreastMilk:"Expressed milk",Pumping:"Pumping",Sleep:"Bedtime",WakeUp:"Wake-up",Pee:"Pee",Poop:"Poop",Temperature:"Temperature",Weight:"Weight",Height:"Height",Solid:"Solid food",Snack:"Snack",Meal:"Meal",Drink:"Drink",Bath:"Bath",Medicine:"Medicine",Hospital:"Hospital",Walking:"Walk"}};function G(o){return o?.toLowerCase().startsWith("ja")?"ja":"en"}function b(o){return o==="ja"?ht:ft}var ke=6e4,we=60*ke,J=24*we;function y(o,e){let t=b(e),i=Math.max(0,Math.floor(o/ke)),s=Math.floor(i/1440),n=Math.floor(i%1440/60),r=i%60,d=e==="ja"?"":" ",a=[];return s>0&&a.push(`${s}${t.days}`),(s>0||n>0)&&a.push(`${n}${t.hours}`),s===0&&(r>0||n===0)&&a.push(`${r}${t.minutes}`),s>0&&n===0&&r===0&&a.pop(),a.join(d).trim()}function R(o,e){let t=b(e);if(o<ke)return t.justNow;if(o>=J){let i=Math.floor(o/J),s=Math.floor(o%J/we);return`${s>0?y(i*J+s*we,e):y(i*J,e)}${t.agoSuffix}`}return`${y(o,e)}${t.agoSuffix}`}function Ve(o,e){return new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:e}).format(o)}function Ye(o,e,t){let i=b(t),s=(n,r)=>r&&r>0?`${n} ${Math.round(r/60)}${i.minutesShort}`:void 0;return[s(i.left,o),s(i.right,e)].filter(Boolean).join(" / ")}var oe=F`
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
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
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
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
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
`;var yt=3e4;function S(o){let e=o.split(/(\d+)/).filter(t=>t!=="");return l`${e.map(t=>/^\d+$/.test(t)?l`${t}`:l`<span class="unit">${t}</span>`)}`}var v=class extends ${constructor(){super();this.compactCard=!1;this._now=Date.now()}setConfig(t){this._config={...t}}connectedCallback(){super.connectedCallback(),this._now=Date.now(),this._timer=window.setInterval(()=>this._now=Date.now(),yt)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer)}getCardSize(){return 4}get uiLang(){return G(this.hass?.language)}get s(){return b(this.uiLang)}clock(t){return Ve(t,this.hass?.config.time_zone??"UTC")}deviceId(){if(!this.hass)return;if(this._config?.device_id)return this._config.device_id;let t=xe(this.hass);return t.length===1?t[0]:void 0}render(){if(!this.hass||!this._config)return h;let t=this.deviceId();if(!t){let s=xe(this.hass).length===0;return l`<ha-card><div class="message">${s?this.s.noDevice:this.s.pickDevice}</div></ha-card>`}let i=Ke(this.hass,t,this._config.name);return l`<ha-card class=${this.compactCard?"compact":""}>${this.renderCard(i)}</ha-card>`}renderSleepPill(t){let i=t.sleepEvent;if(!i)return h;let s=(i.kind==="sleep"?this.s.sleptSince:this.s.wokeSince)(this.clock(i.time),y(this._now-i.time.getTime(),this.uiLang));return l`<div class="pill">${s}</div>`}};v.properties={hass:{attribute:!1},_config:{state:!0},_now:{state:!0}},v.styles=oe;var U=["formula","breastfeeding","pee","poop"],N=["formula","breastfeeding","diapers","sleep"],O=["sleep","milk","diaper"],M=["breastfeeding","diapers","poop_since"],H=["breastfeeding","pee","poop","sleep","formula","today_formula","today_breastfeeding","today_diapers","today_sleep"],I=["breastfeeding","pee","poop","sleep"];function f(o,e,t,i=e){if(o==null)return[...i];if(!Array.isArray(o))throw new Error(`${t} must be a list`);let s=new Set;for(let n of o){if(!e.includes(n))throw new Error(`Unknown ${t} item "${String(n)}". Use: ${e.join(", ")}`);s.add(n)}return[...s]}var ne=class extends v{constructor(){super(...arguments);this.compactCard=!0}setConfig(t){f(t.quick,M,"quick"),super.setConfig(t)}icon(t,i){return l`<div class="ico" style="background:color-mix(in srgb, var(${i}) 18%, transparent)">
      <ha-icon icon=${t} style="color:var(${i})"></ha-icon>
    </div>`}renderFormula(t){let i=this.s,s=t.formula,n=s?[this.clock(s.time),s.ml!==void 0?`${s.ml}ml`:void 0].filter(Boolean).join(" \xB7 "):"",r=t.poop?y(this._now-t.poop.time.getTime(),this.uiLang):"\u2013",d={breastfeeding:l`<div><span class="v">${t.today.breastfeedings??"\u2013"}</span>${i.breastfeeding}</div>`,diapers:l`<div><span class="v">${t.today.diapers??"\u2013"}</span>${i.diapers}</div>`,poop_since:l`<div><span class="v">${r}</span>${i.poopSince}</div>`},a=f(this._config?.quick,M,"quick");return l`
      <div class="line">
        ${this.icon("mdi:baby-bottle-outline","--piyolog-milk")}
        <div class="txt"><b>${i.lastFormula}</b><span class="num">${s?n:i.noRecord}</span></div>
        ${s?l`<div class="big">
              <span class="v" style="color:var(--piyolog-milk)"
                >${S(R(this._now-s.time.getTime(),this.uiLang))}</span
              >
              ${t.today.formulaMl!==void 0?l`<span class="d num">${i.todayTotal} ${t.today.formulaMl}ml</span>`:""}
            </div>`:""}
      </div>
      ${a.length?l`<div class="quick">${a.map(c=>d[c])}</div>`:""}
    `}renderSleep(t){let i=this.s,s=t.sleepEvent;if(!s)return l`<div class="line">
        ${this.icon("mdi:sleep","--piyolog-sleep")}
        <div class="txt"><b>${i.sleepConfirmed}</b><span>${i.noRecord}</span></div>
      </div>`;let n=t.today.sleepSeconds;return l`<div class="line">
      ${this.icon("mdi:sleep","--piyolog-sleep")}
      <div class="txt">
        <b>${s.kind==="sleep"?i.types.Sleep:i.types.WakeUp}</b><span class="num">${this.clock(s.time)}</span>
      </div>
      <div class="big">
        <span class="v" style="color:var(--piyolog-sleep)"
          >${S(R(this._now-s.time.getTime(),this.uiLang))}</span
        >
        ${n!==void 0?l`<span class="d num">${i.recordedSleep} ${y(n*1e3,this.uiLang)}</span>`:""}
      </div>
    </div>`}renderCard(t){return this._config?.kind==="sleep"?this.renderSleep(t):this.renderFormula(t)}getCardSize(){return this._config?.kind==="sleep"?1:f(this._config?.quick,M,"quick").length?2:1}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{kind:"formula"}}};var X=class extends v{setConfig(e){f(e.items,H,"items",I),super.setConfig(e)}line(e,t,i,s){return l`<div class="li">
      <i class="dot" style="background:var(${e})"></i>
      <span class="lab">${t}</span>
      <span class="at">${s?this.clock(s):""}</span>
      ${i===void 0?l`<span class="val empty">${this.s.noRecord}</span>`:l`<span class="val">${i}</span>`}
    </div>`}since(e){return e?S(R(this._now-e.getTime(),this.uiLang)):void 0}total(e,t=""){return e===void 0?void 0:l`${e}${t?l`<span class="unit">${t}</span>`:""}`}renderCard(e){let t=this.s,i=e.sleepEvent,s=e.today.sleepSeconds,n={breastfeeding:()=>this.line("--piyolog-milk",t.breastfeeding,this.since(e.breastfeeding?.time),e.breastfeeding?.time),pee:()=>this.line("--piyolog-pee",t.lastPee,this.since(e.pee?.time),e.pee?.time),poop:()=>this.line("--piyolog-poop",t.lastPoop,this.since(e.poop?.time),e.poop?.time),sleep:()=>this.line("--piyolog-sleep",i?i.kind==="sleep"?t.types.Sleep:t.types.WakeUp:t.sleepConfirmed,this.since(i?.time),i?.time),formula:()=>this.line("--piyolog-milk",t.formula,this.since(e.formula?.time),e.formula?.time),today_formula:()=>this.line("--piyolog-milk",t.todayFormula,this.total(e.today.formulaMl,"ml")),today_breastfeeding:()=>this.line("--piyolog-milk",t.todayBreastfeeding,this.total(e.today.breastfeedings)),today_diapers:()=>this.line("--piyolog-pee",t.todayDiapers,this.total(e.today.diapers)),today_sleep:()=>this.line("--piyolog-sleep",t.todaySleep,s===void 0?void 0:S(y(s*1e3,this.uiLang)))},r=f(this._config?.items,H,"items",I);return l`<div class="list-title">${e.name}</div>
      ${r.map(d=>n[d]())}`}getGridOptions(){let e=f(this._config?.items,H,"items",I).length;return{columns:3,min_columns:3,rows:3+Math.ceil(Math.max(0,e-4)/2),min_rows:2}}getCardSize(){return 3}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{}}};X.styles=[oe,F`
      :host {
        height: 100%;
      }
      ha-card {
        height: 100%;
        box-sizing: border-box;
        padding: 12px 14px;
        gap: 6px;
        align-content: start;
      }
      .list-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li {
        display: grid;
        grid-template-columns: 8px minmax(0, 1fr) 3.4em auto;
        align-items: baseline;
        gap: 0 8px;
        min-height: 28px;
        align-content: center;
        font-size: 14px;
      }
      .li .dot {
        align-self: center;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .li .lab {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li .at {
        text-align: right;
        font-size: 12px;
        color: var(--piyolog-dim);
        font-variant-numeric: tabular-nums;
      }
      .li .val {
        font-weight: 500;
        text-align: right;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .li .val.empty {
        color: var(--piyolog-dim);
        font-weight: 400;
      }
      .li .val .unit {
        font-size: 11px;
        font-weight: 400;
        color: var(--piyolog-dim);
      }
    `];var re=class extends v{tile(e,t,i,s){let n=l`<i class="dot" style="background:var(${t})"></i>`;return i?l`<div class="tile">
      <div class="k">${n}${e}</div>
      <div class="v">${S(R(this._now-i.getTime(),this.uiLang))}</div>
      <div class="d num">${[this.clock(i),s].filter(Boolean).join(" \xB7 ")}</div>
    </div>`:l`<div class="tile">
        <div class="k">${n}${e}</div>
        <div class="v empty">${this.s.noRecord}</div>
        <div class="d"></div>
      </div>`}setConfig(e){f(e.tiles,U,"tiles"),f(e.totals,N,"totals"),super.setConfig(e)}count(e,t=""){return e===void 0?l`<span class="v">–</span>`:l`<span class="v">${e}${t?l`<span class="unit">${t}</span>`:""}</span>`}renderCard(e){let t=this.s,i=[e.poop?.hardness?t.hardness[e.poop.hardness]??e.poop.hardness:void 0,e.poop?.color?t.color[e.poop.color]??e.poop.color:void 0].filter(Boolean).join(" \xB7 "),s=e.breastfeeding?Ye(e.breastfeeding.leftSeconds,e.breastfeeding.rightSeconds,this.uiLang):void 0,n=e.today.sleepSeconds,r={formula:this.tile(t.lastFormula,"--piyolog-milk",e.formula?.time,e.formula?.ml!==void 0?`${e.formula.ml}ml`:void 0),breastfeeding:this.tile(t.lastBreastfeeding,"--piyolog-milk",e.breastfeeding?.time,s),pee:this.tile(t.lastPee,"--piyolog-pee",e.pee?.time,void 0),poop:this.tile(t.lastPoop,"--piyolog-poop",e.poop?.time,i||void 0)},d={formula:l`<div>${this.count(e.today.formulaMl,"ml")}<span class="k">${t.formula}</span></div>`,breastfeeding:l`<div>${this.count(e.today.breastfeedings)}<span class="k">${t.breastfeeding}</span></div>`,diapers:l`<div>${this.count(e.today.diapers)}<span class="k">${t.diapers}</span></div>`,sleep:l`<div>
        <span class="v"
          >${n===void 0?"\u2013":S(y(n*1e3,this.uiLang))}</span
        ><span class="k">${t.sleepConfirmed}</span>
      </div>`},a=f(this._config?.tiles,U,"tiles"),c=f(this._config?.totals,N,"totals");return l`
      <div class="head">
        <div style="min-width:0">
          <div class="name">${e.name}</div>
          <div class="sub num">${e.lastUpdated?t.updated(this.clock(e.lastUpdated)):""}</div>
        </div>
        ${this.renderSleepPill(e)}
      </div>
      ${a.length?l`<div class="tiles">${a.map(m=>r[m])}</div>`:""}
      ${c.length?l`<div class="today">${c.map(m=>d[m])}</div>`:""}
    `}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{}}};function vt(o){return Math.min(100,Math.max(0,o))}function Qe(o,e){let t=o.start.getTime(),i=o.end.getTime()-t,s=p=>vt((p-t)/i*100),n=[];for(let p of o.sleepIntervals){let u=s(p.start.getTime()),g=s(p.end.getTime());g>u&&n.push({left:u,width:g-u})}let r=[],d=[];for(let p of o.records){let u=s(p.time.getTime());p.type==="Formula"||p.type==="BreastFeeding"?r.push({left:u,kind:"milk"}):p.type==="Pee"?d.push({left:u,kind:"pee"}):p.type==="Poop"&&d.push({left:u,kind:"poop"})}let a=o.openSleepSince,c=a&&a.getTime()>=t&&a.getTime()<t+i?{left:s(a.getTime()),kind:"open-sleep"}:void 0,m=e>=t&&e<t+i;return{sleepBars:n,milkMarks:r,diaperMarks:d,openSleepMark:c,now:m?s(e):void 0}}var $t=[0,6,12,18,24],_t=4,ae=class extends v{setConfig(e){f(e.rows,O,"rows"),super.setConfig(e)}marks(e){return e.map(t=>l`<div class="mark ${t.kind}" style="left:${t.left}%"></div>`)}recordDetail(e){let t=this.s;return e.type==="Poop"&&e.details?[e.details.hardness?t.hardness[e.details.hardness]??e.details.hardness:void 0,e.details.color?t.color[e.details.color]??e.details.color:void 0].filter(Boolean).join(" \xB7 "):e.amountMl!==void 0?`${e.amountMl}ml`:""}renderCard(e){let t=this.s,i=e.timeline,s=l`<div class="head">
      <div style="min-width:0">
        <div class="name">${e.name} · ${t.today}</div>
        <div class="sub num">0:00 – 24:00</div>
      </div>
      ${this.renderSleepPill(e)}
    </div>`;if(!i)return l`${s}<div class="message">${t.noRecord}</div>`;let n=Qe(i,this._now),r=n.now===void 0?"":l`<div class="now" style="left:${n.now}%"></div>`,d=(g,x)=>l`<div class="row">
      <div class="lab">${g}</div>
      <div class="track">${x}${r}</div>
    </div>`,a=[...i.records].reverse().slice(0,_t),c={sleep:d(t.sleepRow,l`${n.sleepBars.map(g=>l`<div class="bar" style="left:${g.left}%;width:${g.width}%"></div>`)}${n.openSleepMark?this.marks([n.openSleepMark]):""}`),milk:d(t.milkRow,this.marks(n.milkMarks)),diaper:d(t.diaperRow,this.marks(n.diaperMarks))},m=f(this._config?.rows,O,"rows"),p=this._config?.legend!==!1,u=this._config?.log!==!1;return l`
      ${s}
      ${m.length?l`<div class="tl">${m.map(g=>c[g])}</div>`:""}
      ${m.length?l`<div class="axis">
            <span></span>
            <div class="ticks">${$t.map(g=>l`<span style="left:${g/24*100}%">${g}:00</span>`)}</div>
          </div>`:""}
      ${p&&m.length?l`<div class="legend">
            ${m.includes("sleep")?l`<span><i style="background:var(--piyolog-sleep)"></i>${t.legendSleep}</span>
                  <span><i style="border:2px solid var(--piyolog-sleep)"></i>${t.legendOpenSleep}</span>`:""}
            ${m.includes("milk")?l`<span><i style="background:var(--piyolog-milk)"></i>${t.legendMilk}</span>`:""}
            ${m.includes("diaper")?l`<span><i style="background:var(--piyolog-pee)"></i>${t.legendPee}</span>
                  <span><i style="background:var(--piyolog-poop)"></i>${t.legendPoop}</span>`:""}
          </div>`:""}
      ${u?l`<div class="log">
            ${a.map(g=>l`<div class="item">
                <span class="t">${this.clock(g.time)}</span>
                <span>${t.types[g.type]??g.type}</span>
                <span class="r">${this.recordDetail(g)}</span>
              </div>`)}
          </div>`:""}
    `}getCardSize(){return 6}static getConfigElement(){return document.createElement("piyolog-card-editor")}static getStubConfig(){return{}}};var Z=class extends ${constructor(){super(...arguments);this.label=t=>{let i=b(G(this.hass?.language));return{device_id:i.editorDevice,name:i.editorName,kind:i.editorKind,tiles:i.editorTiles,totals:i.editorTotals,rows:i.editorRows,legend:i.editorLegend,log:i.editorLog,quick:i.editorQuick,items:i.editorItems}[t.name]??t.name}}setConfig(t){this._config=t}multi(t,i){return{select:{multiple:!0,reorder:!0,mode:"list",options:t.map(s=>({value:s,label:i[s]??s}))}}}schema(){let t=b(G(this.hass?.language)),i=this._config?.type??"",s=[{name:"device_id",selector:{device:{integration:"piyolog"}}},{name:"name",selector:{text:{}}}];return i.endsWith("piyolog-summary-card")?s.push({name:"tiles",selector:this.multi(U,{formula:t.lastFormula,breastfeeding:t.lastBreastfeeding,pee:t.lastPee,poop:t.lastPoop})},{name:"totals",selector:this.multi(N,{formula:t.formula,breastfeeding:t.breastfeeding,diapers:t.diapers,sleep:t.sleepConfirmed})}):i.endsWith("piyolog-timeline-card")?s.push({name:"rows",selector:this.multi(O,{sleep:t.sleepRow,milk:t.milkRow,diaper:t.diaperRow})},{name:"legend",selector:{boolean:{}}},{name:"log",selector:{boolean:{}}}):i.endsWith("piyolog-list-card")?s.push({name:"items",selector:this.multi(H,{breastfeeding:t.breastfeeding,pee:t.lastPee,poop:t.lastPoop,sleep:t.sleepConfirmed,formula:t.formula,today_formula:t.todayFormula,today_breastfeeding:t.todayBreastfeeding,today_diapers:t.todayDiapers,today_sleep:t.todaySleep})}):i.endsWith("piyolog-compact-card")&&(s.push({name:"kind",selector:{select:{mode:"dropdown",options:[{value:"formula",label:t.kindFormula},{value:"sleep",label:t.kindSleep}]}}}),this._config?.kind!=="sleep"&&s.push({name:"quick",selector:this.multi(M,{breastfeeding:t.breastfeeding,diapers:t.diapers,poop_since:t.poopSince})})),s}formData(){return{tiles:[...U],totals:[...N],rows:[...O],legend:!0,log:!0,quick:[...M],items:[...I],...this._config}}changed(t){t.stopPropagation();let i=t.detail.value,s={};for(let{name:n}of this.schema())s[n]=i[n];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,...s}},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?h:l`<ha-form
      .hass=${this.hass}
      .data=${this.formData()}
      .schema=${this.schema()}
      .computeLabel=${this.label}
      @value-changed=${this.changed}
    ></ha-form>`}};Z.properties={hass:{attribute:!1},_config:{state:!0}};var Ge=[{tag:"piyolog-summary-card",ctor:re,name:"PiyoLog summary",description:"Last feeding, diaper changes and today's totals."},{tag:"piyolog-timeline-card",ctor:ae,name:"PiyoLog timeline",description:"Sleep, feeding and diaper records across today."},{tag:"piyolog-list-card",ctor:X,name:"PiyoLog list",description:"A narrow card listing the latest records, sized for the sections view."},{tag:"piyolog-compact-card",ctor:ne,name:"PiyoLog compact",description:"A one-line card for formula or sleep."}];for(let o of Ge)customElements.get(o.tag)||customElements.define(o.tag,o.ctor);customElements.get("piyolog-card-editor")||customElements.define("piyolog-card-editor",Z);var bt=window.customCards??=[];for(let o of Ge)bt.push({type:o.tag,name:o.name,description:o.description,preview:!1});

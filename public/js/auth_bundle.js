(()=>{var t={7228:t=>{t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.default=t.exports,t.exports.__esModule=!0},2858:t=>{t.exports=function(t){if(Array.isArray(t))return t},t.exports.default=t.exports,t.exports.__esModule=!0},3646:(t,e,r)=>{var n=r(7228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},8926:t=>{function e(t,e,r,n,o,a,i){try{var u=t[a](i),s=u.value}catch(t){return void r(t)}u.done?e(s):Promise.resolve(s).then(n,o)}t.exports=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,a){var i=t.apply(r,n);function u(t){e(i,o,a,u,s,"next",t)}function s(t){e(i,o,a,u,s,"throw",t)}u(void 0)}))}},t.exports.default=t.exports,t.exports.__esModule=!0},5318:t=>{t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.default=t.exports,t.exports.__esModule=!0},6860:t=>{t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},3884:t=>{t.exports=function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a=[],i=!0,u=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(t){u=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(u)throw o}}return a}},t.exports.default=t.exports,t.exports.__esModule=!0},521:t=>{t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},8206:t=>{t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},3038:(t,e,r)=>{var n=r(2858),o=r(3884),a=r(379),i=r(521);t.exports=function(t,e){return n(t)||o(t,e)||a(t,e)||i()},t.exports.default=t.exports,t.exports.__esModule=!0},319:(t,e,r)=>{var n=r(3646),o=r(6860),a=r(379),i=r(8206);t.exports=function(t){return n(t)||o(t)||a(t)||i()},t.exports.default=t.exports,t.exports.__esModule=!0},379:(t,e,r)=>{var n=r(7228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},7757:(t,e,r)=>{t.exports=r(5666)},8629:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.useFormValidation=function(){(0,n.useRegisterFormValidation)()};var n=r(2271)},2271:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.useRegisterFormValidation=function(){var t=document.querySelector("#btn-submit");t&&(t.disabled=!0);var e=c("firstname"),r=(0,u.default)(e,2),n=r[0],o=r[1],a=c("lastname"),i=(0,u.default)(a,2),p=i[0],d=i[1],h=c("email"),v=(0,u.default)(h,2),y=v[0],m=v[1],g=c("username"),x=(0,u.default)(g,2),w=x[0],b=x[1],E=(0,s.getEmailRegex)(),_=(0,s.getUsernameRegex)(),L=[String(null==y?void 0:y.name),String(null==w?void 0:w.name)];l(n,o),l(p,d),f({input:w,errorElement:b,regex:_,uniqueElements:L}),f({input:y,errorElement:m,regex:E,uniqueElements:L})},e.getInputAndErorrElement=c,e.handleInputValueError=l,e.handleInputWithRegexValueError=f,e.checkInputsValidity=h;var o=n(r(7757)),a=n(r(319)),i=n(r(8926)),u=n(r(3038)),s=r(4814);function c(t){return[document.querySelector("#".concat(t)),document.querySelector("#".concat(t," ~ .invalid-feedback"))]}function l(t,e){var r=t.getAttribute("placeholder"),n=function(){var n=(0,i.default)(o.default.mark((function n(){var a;return o.default.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(0,s.isEmpty)(t.value)){n.next=5;break}a="".concat(r," is invalid and is required"),v(t,e,a),n.next=7;break;case 5:return n.next=7,y(t,e);case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();["input","blur"].forEach((function(e){return t.addEventListener(e,n)}))}function f(t){var e=t.input,r=t.errorElement,n=t.regex,o=t.uniqueElements,a=void 0===o?["username"]:o,i=[];a&&(i=(0,s.isString)(a)?[a]:a);var u={input:e,errorElement:r,regex:n,watchList:i};[p,d].forEach((function(t){return t(u)}))}function p(t){var e=t.input,r=t.errorElement,n=t.regex,a=t.watchList,u=e.getAttribute("placeholder");e.addEventListener("input",(0,i.default)(o.default.mark((function t(){var i,c,l,f;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=(0,s.removeExtraSpaces)(e.value),!(0,s.isEmpty)(i)){t.next=6;break}c="".concat(u," is invalid and is required"),v(e,r,c),t.next=14;break;case 6:if(n.test(i)){t.next=11;break}l="Invalid ".concat(u),v(e,r,l),t.next=14;break;case 11:return f=a.includes(e.name),t.next=14,y(e,r,f);case 14:case"end":return t.stop()}}),t)}))))}function d(t){var e=t.input,r=t.errorElement,n=t.regex,a=t.watchList,u=e.getAttribute("placeholder");e.addEventListener("blur",(0,i.default)(o.default.mark((function t(){var i,c,l;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=(0,s.removeExtraSpaces)(e.value),!(0,s.isEmpty)(i)&&n.test(i)){t.next=6;break}c="".concat(u," is invalid and is required"),v(e,r,c),t.next=9;break;case 6:return l=a.includes(e.name),t.next=9,y(e,r,l);case 9:case"end":return t.stop()}}),t)}))))}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"form-control:not(.optional)",e=document.querySelectorAll(".".concat(t)),r=function(t){return""!==(0,s.strip)(t.value).trim()&&t.classList.contains("is-valid")};return(0,a.default)(e).every(r)}function v(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"btn-submit";t.classList.remove("is-valid"),t.classList.add("is-invalid"),r&&(e&&(e.textContent=r),t.setCustomValidity(r));var o=document.querySelector("#".concat(n));o&&(o.disabled=!0)}function y(t,e){return m.apply(this,arguments)}function m(){return(m=(0,i.default)(o.default.mark((function t(e,r){var n,a,i=arguments;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=i.length>2&&void 0!==i[2]&&i[2],t.prev=1,t.t0=n,!t.t0){t.next=7;break}return t.next=6,g(e);case 6:t.t0=t.sent;case 7:if(!t.t0){t.next=11;break}return a="".concat(e.value," is already taken"),v(e,r,a),t.abrupt("return");case 11:w(e,r),b(),t.next=18;break;case 15:t.prev=15,t.t1=t.catch(1),console.log(t.t1);case 18:case"end":return t.stop()}}),t,null,[[1,15]])})))).apply(this,arguments)}function g(t){return x.apply(this,arguments)}function x(){return(x=(0,i.default)(o.default.mark((function t(e){var r,n,a,i;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(0,s.removeExtraSpaces)(e.value),n="/api/users/verify/".concat(e.name,"/").concat(r),t.next=4,(0,s.getData)({url:n});case 4:return a=t.sent,i=a.data,t.abrupt("return",!!i);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t,e){t.classList.remove("is-invalid"),t.classList.add("is-valid"),e&&(e.textContent="✔"),t.setCustomValidity("")}function b(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"btn-submit",e=h();if(e){var r=document.querySelector("#".concat(t));r&&(r.disabled=!1)}}},4814:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.getFullName=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{first:"",last:""};return"".concat(t.first," ").concat(t.last)},e.postData=function(t){return u.apply(this,arguments)},e.getData=function(t){return s.apply(this,arguments)},e.newElement=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=document.createElement(t),o=Object.getOwnPropertyNames(e);return o.forEach((function(t){n.setAttribute("".concat(t),e["".concat(t)])})),n.append.apply(n,(0,a.default)(r)),n},e.isValidPassword=e.isValidName=e.isValidUsername=e.isValidEmail=e.isNotEmpty=e.isEmpty=e.isArrayOfStrings=e.isAnArray=e.isString=e.removeExtraSpaces=e.stripAll=e.strip=e.getPasswordRegex=e.getNameRegex=e.getUsernameRegex=e.getEmailRegex=e.capitalizeAll=e.capitalize=e.reloadPage=e.redirectTo=e.decodeCookie=e.getDataFromCookie=void 0;var o=n(r(7757)),a=n(r(319)),i=n(r(8926));function u(){return(u=(0,i.default)(o.default.mark((function t(e){var r,n,a,i,u,s,c;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.url,n=void 0===r?"":r,a=e.data,i=void 0===a?{}:a,u=e.stringify,s=void 0===u||u,t.next=3,fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:s?JSON.stringify(i):i});case 3:return c=t.sent,t.abrupt("return",c.json());case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function s(){return(s=(0,i.default)(o.default.mark((function t(e){var r,n,a;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.url,n=void 0===r?"":r,t.next=3,fetch(n);case 3:return a=t.sent,t.abrupt("return",a.json());case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e.getDataFromCookie=function(t){return document.cookie.split("; ").find((function(e){return e.startsWith(t)})).split("=")[1]},e.decodeCookie=function(t){return decodeURIComponent(t)},e.redirectTo=function(t){window.location.href=t},e.reloadPage=function(){return window.location.reload()};var c=function(t){return t.charAt(0).toUpperCase()+t.slice(1)};e.capitalize=c,e.capitalizeAll=function(t){return t.replace(/\w\S*/g,c)};e.getEmailRegex=function(){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/};e.getUsernameRegex=function(){return/^[a-z][a-z0-9_]{3,}$/};e.getNameRegex=function(){return/^[a-zA-Z](\.?\s?\w+)+$/};e.getPasswordRegex=function(){return/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w@#%^$!%*?&]{7,}/};var l=function(t){return String(t).replace(/\s+/g," ")};e.strip=l,e.stripAll=function(t){return String(t).replace(/\s+/g,"")};var f=function(t){return l(t).trim()};e.removeExtraSpaces=f;var p=function(t){return"string"==typeof t};e.isString=p;var d=function(t){return Array.isArray(t)};e.isAnArray=d,e.isArrayOfStrings=function(t){return d(t)&&t.every((function(t){return p(t)}))};var h=function(t){return!t||!l(t).trim()};e.isEmpty=h,e.isNotEmpty=function(t){return!h(t)},e.isValidEmail=function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(f(t))},e.isValidUsername=function(t){return/^[a-z][a-z0-9_]{3,}$/.test(f(t))},e.isValidName=function(t){return/^[a-zA-Z](\.?\s?\w+)+$/.test(f(t))},e.isValidPassword=function(t){return/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w@#%^$!%*?&]{7,}/.test(f(t))}},5666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new j(n||[]);return a._invoke=function(t,e,r){var n=f;return function(o,a){if(n===d)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return P()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var u=A(i,r);if(u){if(u===v)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?h:p,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=h,r.method="throw",r.arg=s.arg)}}}(t,r,i),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",v={};function y(){}function m(){}function g(){}var x={};s(x,a,(function(){return this}));var w=Object.getPrototypeOf,b=w&&w(w(O([])));b&&b!==r&&n.call(b,a)&&(x=b);var E=g.prototype=y.prototype=Object.create(x);function _(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,a,i,u){var s=l(t[o],t,a);if("throw"!==s.type){var c=s.arg,f=c.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,u)}),(function(t){r("throw",t,i,u)})):e.resolve(f).then((function(t){c.value=t,i(c)}),(function(t){return r("throw",t,i,u)}))}u(s.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function A(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,A(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=g,s(E,"constructor",g),s(g,"constructor",m),m.displayName=s(g,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},_(L.prototype),s(L.prototype,i,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new L(c(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(E),s(E,u,"Generator"),s(E,a,(function(){return this})),s(E,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}(()=>{"use strict";(0,r(8629).useFormValidation)()})()})();
(()=>{var t={7228:t=>{t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.default=t.exports,t.exports.__esModule=!0},2858:t=>{t.exports=function(t){if(Array.isArray(t))return t},t.exports.default=t.exports,t.exports.__esModule=!0},3646:(t,e,r)=>{var n=r(7228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},8926:t=>{function e(t,e,r,n,o,a,i){try{var s=t[a](i),l=s.value}catch(t){return void r(t)}s.done?e(l):Promise.resolve(l).then(n,o)}t.exports=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,a){var i=t.apply(r,n);function s(t){e(i,o,a,s,l,"next",t)}function l(t){e(i,o,a,s,l,"throw",t)}s(void 0)}))}},t.exports.default=t.exports,t.exports.__esModule=!0},6358:t=>{t.exports=function(t,e){return e.get?e.get.call(t):e.value},t.exports.default=t.exports,t.exports.__esModule=!0},8625:t=>{t.exports=function(t,e,r){if(e.set)e.set.call(t,r);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=r}},t.exports.default=t.exports,t.exports.__esModule=!0},4575:t=>{t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.default=t.exports,t.exports.__esModule=!0},3486:t=>{t.exports=function(t,e,r){if(!e.has(t))throw new TypeError("attempted to "+r+" private field on non-instance");return e.get(t)},t.exports.default=t.exports,t.exports.__esModule=!0},1226:(t,e,r)=>{var n=r(6358),o=r(3486);t.exports=function(t,e){var r=o(t,e,"get");return n(t,r)},t.exports.default=t.exports,t.exports.__esModule=!0},5962:(t,e,r)=>{var n=r(8625),o=r(3486);t.exports=function(t,e,r){var a=o(t,e,"set");return n(t,a,r),r},t.exports.default=t.exports,t.exports.__esModule=!0},3913:t=>{function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t},t.exports.default=t.exports,t.exports.__esModule=!0},9713:t=>{t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.default=t.exports,t.exports.__esModule=!0},5318:t=>{t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.default=t.exports,t.exports.__esModule=!0},6860:t=>{t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},3884:t=>{t.exports=function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(t){s=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}},t.exports.default=t.exports,t.exports.__esModule=!0},521:t=>{t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},8206:t=>{t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},3038:(t,e,r)=>{var n=r(2858),o=r(3884),a=r(379),i=r(521);t.exports=function(t,e){return n(t)||o(t,e)||a(t,e)||i()},t.exports.default=t.exports,t.exports.__esModule=!0},319:(t,e,r)=>{var n=r(3646),o=r(6860),a=r(379),i=r(8206);t.exports=function(t){return n(t)||o(t)||a(t)||i()},t.exports.default=t.exports,t.exports.__esModule=!0},379:(t,e,r)=>{var n=r(7228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},7757:(t,e,r)=>{t.exports=r(5666)},2828:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.useActivationForm=function(){return d.apply(this,arguments)};var o=n(r(7757)),a=n(r(8926)),i=n(r(4575)),s=n(r(3913)),l=r(7907),u=r(4814),c=function(){function t(){var e,r,n=this;(0,i.default)(this,t),this.form=document.querySelector("#activation-form"),this.dialogParent=document.querySelector(".right-side"),this.submitButton=document.querySelector("#btn-submit"),this.spinner=null===(e=this.dialogParent)||void 0===e?void 0:e.querySelector(".spinner_preloader"),this.spinner.classList.add("hidden"),null===(r=this.submitButton)||void 0===r||r.addEventListener("click",function(){var t=(0,a.default)(o.default.mark((function t(e){return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",n.attachEventToSubmitBtn(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}var e,r;return(0,s.default)(t,[{key:"attachEventToSubmitBtn",value:(r=(0,a.default)(o.default.mark((function t(e){var r,n,a,i;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),this.spinner.classList.remove("hidden"),t.next=4,this.sendDataToServer();case 4:r=t.sent,n=r.error,a=r.ok,i=r.rdr,this.spinner.classList.add("hidden"),a?(0,l.showSuccessDialog)({modalTitle:"Activation link sent",modalText:a,parentEl:this.dialogParent,btnEventCallback:function(){return(0,u.redirectTo)("/")}}):(0,l.showErrorDialog)({modalTitle:"Activation Error",modalText:n,parentEl:this.dialogParent,btnEventCallback:i?function(){return(0,u.redirectTo)(i)}:null});case 10:case"end":return t.stop()}}),t,this)}))),function(t){return r.apply(this,arguments)})},{key:"sendDataToServer",value:(e=(0,a.default)(o.default.mark((function t(){var e,r,n,a,i;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.readFormData(),t.next=3,(0,u.postData)({url:"/api/activate/request",data:e});case 3:return r=t.sent,n=r.error,a=r.data,i=r.redirectTo,t.abrupt("return",{error:n,ok:a,rdr:i});case 6:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"readFormData",value:function(){var t=this.form;if(!t)return(0,l.showErrorDialog)({modalTitle:"Activation Error",modalText:"An error occured, please contact a developer to resolve it!",parentEl:this.dialogParent});var e=new FormData(t),r={};return e.forEach((function(t,e){r[e]=(0,u.removeExtraSpaces)(t)})),r}}]),t}();function d(){return(d=(0,a.default)(o.default.mark((function t(){return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new c);case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},8629:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.useFormValidation=function(){try{(0,n.useRegisterFormValidation)();var t=document.title;null!=t&&t.includes("Registration")||(0,o.useActivationForm)()}catch(t){console.log(t.message)}};var n=r(2271),o=r(2828)},2271:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.useRegisterFormValidation=function(){var t=document.querySelector("#btn-submit");t&&(t.disabled=!0),E("btn-submit");var e=u("firstname"),r=(0,s.default)(e,2),n=r[0],o=r[1],a=u("lastname"),i=(0,s.default)(a,2),f=i[0],p=i[1],h=u("email"),v=(0,s.default)(h,2),m=v[0],g=v[1],y=u("username"),x=(0,s.default)(y,2),b=x[0],w=x[1],k=u("password"),T=(0,s.default)(k,2),_=T[0],O=T[1],A=u("cin"),S=(0,s.default)(A,2),L=S[0],P=S[1],j=[(0,l.getEmailRegex)(),(0,l.getUsernameRegex)()],C=j[0],M=j[1],D=[(0,l.getCINRegex)(),(0,l.getPasswordRegex)()],B=D[0],N=D[1],R=[null==m?void 0:m.name,null==b?void 0:b.name,null==L?void 0:L.name].filter((function(t){return t})),q=[null==m?void 0:m.name,null==L?void 0:L.name].filter((function(t){return t}));n&&c(n,o),f&&c(f,p),L&&d({input:L,errorElement:P,regex:B,uniqueElements:R,isOkExistEl:q}),m&&d({input:m,errorElement:g,regex:C,uniqueElements:R,isOkExistEl:q}),b&&d({input:b,errorElement:w,regex:M,uniqueElements:R}),_&&d({input:_,errorElement:O,regex:N})},e.getInputAndErorrElement=u,e.handleInputValueError=c,e.handleInputWithRegexValueError=d,e.checkInputsValidity=v;var o=n(r(7757)),a=n(r(319)),i=n(r(8926)),s=n(r(3038)),l=r(4814);function u(t){return[document.querySelector("#".concat(t)),document.querySelector("#".concat(t," ~ .invalid-feedback"))]}function c(t,e){var r,n=(null===(r=t.dataset)||void 0===r?void 0:r.name)||"",a=function(){var r=(0,i.default)(o.default.mark((function r(){var a;return o.default.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(0,l.isEmpty)(t.value)){r.next=5;break}a="".concat(n," is invalid and is required"),m(t,e,a),r.next=7;break;case 5:return r.next=7,g(t,e);case 7:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();["input","blur"].forEach((function(e){return t.addEventListener(e,a)}))}function d(t){var e=t.input,r=t.errorElement,n=t.regex,o=t.uniqueElements,a=void 0===o?["username"]:o,i=t.isOkExistEl,s=void 0===i?[]:i,u=[];a&&(u=(0,l.isString)(a)?[a]:a);var c={input:e,errorElement:r,regex:n,watchList:u,isOk:!1};c.isOk=u.every((function(t){return s.includes(t)})),[f,h].forEach((function(t){return t(c)}))}function f(t){var e,r=t.input,n=t.errorElement,a=t.regex,s=t.watchList,u=t.isOk,c=(null===(e=r.dataset)||void 0===e?void 0:e.name)||"";r.addEventListener("input",(0,i.default)(o.default.mark((function t(){var e,i,d,f;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=(0,l.removeExtraSpaces)(r.value),!(0,l.isEmpty)(e)){t.next=6;break}i="".concat(c," is invalid and is required"),m(r,n,i),t.next=15;break;case 6:if(a.test(e)){t.next=12;break}"Invalid ".concat(c),d="password"===(null==c?void 0:c.toLocaleLowerCase())?p(e):"Invalid ".concat(c),m(r,n,d),t.next=15;break;case 12:return f=s.includes(r.name),t.next=15,g(r,n,f,u);case 15:case"end":return t.stop()}}),t)}))))}function p(t){var e=(0,l.newElement)("p",{},["The password must contain : "]),r=[],n=["@","#","%","^","$","!","%","*","?","&"];t.length<7&&r.push((0,l.newElement)("li",{},["at last 7 characters"])),t.search(/[a-z]/)<0&&r.push((0,l.newElement)("li",{},["at least 1 lowercase letter"])),t.search(/[A-Z]/)<0&&r.push((0,l.newElement)("li",{},["at least 1 uppercase letter"])),t.search(/[0-9]/)<0&&r.push((0,l.newElement)("li",{},["at least 1 number"])),t.search(RegExp("[".concat(n.join(""),"]")))<0&&r.push((0,l.newElement)("li",{},["at least 1 special character in : ".concat(n.join(" "))]));var o=(0,l.newElement)("ul",{class:"list-msg"},r);return(0,l.newElement)("div",{},[e,o])}function h(t){var e,r=t.input,n=t.errorElement,a=t.regex,s=t.watchList,u=t.isOk,c=(null===(e=r.dataset)||void 0===e?void 0:e.name)||"";r.addEventListener("blur",(0,i.default)(o.default.mark((function t(){var e,i,d;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=(0,l.removeExtraSpaces)(r.value),!(0,l.isEmpty)(e)&&a.test(e)){t.next=7;break}"".concat(c," is invalid and is required"),i="password"===(null==c?void 0:c.toLocaleLowerCase())?p(e):"Invalid ".concat(c),m(r,n,i),t.next=10;break;case 7:return d=s.includes(r.name),t.next=10,g(r,n,d,u);case 10:case"end":return t.stop()}}),t)}))))}function v(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"form-control:not(.optional)",e=document.querySelectorAll(".".concat(t)),r=function(t){return t.classList.contains("is-valid")||!t.classList.contains("is-invalid")},n=function(t){return!(0,l.isEmpty)(t.value)&&r(t)};return(0,a.default)(e).every(n)}function m(t,e,r){var n,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"btn-submit";t.classList.remove("is-valid"),t.classList.add("is-invalid"),r&&(null==e||e.replaceChildren(r),t.setCustomValidity(r)),null===(n=document.querySelector(".root"))||void 0===n||n.classList.add("root_error");var a=document.querySelector("#".concat(o));a&&(a.disabled=!0)}function g(t,e){return y.apply(this,arguments)}function y(){return(y=(0,i.default)(o.default.mark((function t(e,r){var n,a,i,s=arguments;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=s.length>2&&void 0!==s[2]&&s[2],a=s.length>3&&void 0!==s[3]&&s[3],t.prev=2,t.t1=n,!t.t1){t.next=8;break}return t.next=7,x(e);case 7:t.t1=t.sent;case 8:if(t.t0=t.t1,!t.t0){t.next=11;break}t.t0=!a;case 11:if(!t.t0){t.next=15;break}return i="".concat(e.value," is already taken"),m(e,r,i),t.abrupt("return");case 15:w(e,r),E(),t.next=22;break;case 19:t.prev=19,t.t2=t.catch(2),console.log(t.t2);case 22:case"end":return t.stop()}}),t,null,[[2,19]])})))).apply(this,arguments)}function x(t){return b.apply(this,arguments)}function b(){return(b=(0,i.default)(o.default.mark((function t(e){var r,n,a,i;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(0,l.removeExtraSpaces)(e.value),n="/api/users/verify/".concat(e.name,"/").concat(r),t.next=4,(0,l.getData)({url:n});case 4:return a=t.sent,i=a.data,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t,e){var r;t.classList.remove("is-invalid"),t.classList.add("is-valid"),null===(r=document.querySelector(".root"))||void 0===r||r.classList.remove("root_error"),e&&(e.textContent="✔"),t.setCustomValidity("")}function E(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"btn-submit",e=v();if(e){var r=document.querySelector("#".concat(t));r&&(r.disabled=!1)}}},2667:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.AlertDialog=e.argsFormat=void 0;var o=n(r(4575)),a=n(r(3913)),i=n(r(1226)),s=n(r(5962)),l=r(4814);function u(t,e,r){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return r}var c={modalType:"error",modalTitle:"",modalText:"",modalOkBtnText:"OK",modalCancelBtnText:"Cancel",hasCancelBtn:!1,dialogParent:null};e.argsFormat=c;var d=new WeakMap,f=new WeakMap,p=new WeakMap,h=new WeakMap,v=new WeakSet,m=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c;if((0,o.default)(this,t),v.add(this),d.set(this,{writable:!0,value:void 0}),f.set(this,{writable:!0,value:void 0}),p.set(this,{writable:!0,value:void 0}),h.set(this,{writable:!0,value:void 0}),this.allTypes=["error","success","warning","info"],!this.allTypes.includes(e.modalType)){var r="modalType must be one of '".concat(this.allTypes.join(", "),"'");throw new Error(r)}this.config=e,(0,s.default)(this,d,"alert-dialog-btn"),(0,s.default)(this,f,"alert-dialog"),(0,s.default)(this,p,"".concat((0,i.default)(this,d)," btn-").concat(this.config.modalType)),(0,s.default)(this,h,"".concat((0,i.default)(this,d)," btn-cancel")),this.createDialog(),this.config.dialogParent?this.config.dialogParent.classList.add("alert-dialog-parent"):this.config.dialogParent=(0,l.newElement)("div",{class:"alert-dialog-parent"}),this.config.dialogParent.append(this.dialog),this.elements=[this.dialog,this.btnOk,this.btnCancel],this.events={dialog:[],btnOk:[],btnCancel:[]}}return(0,a.default)(t,[{key:"getDialog",value:function(){return this.dialog}},{key:"getDialogWithParent",value:function(){return this.config.dialogParent}},{key:"getButtonOk",value:function(){return this.btnOk}},{key:"getButtonCancel",value:function(){return this.btnCancel}},{key:"attachEventsTo",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[""],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[function(){}],o=u(this,v,g).call(this,e,r,n),a=o.eventsArr,i=o.callbackArr;a.forEach((function(r,n){t[e].addEventListener(r,i[n]),t.events[e].push(r)})),console.log("Events attached to ".concat(e))}},{key:"removeEventsFrom",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[""],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[function(){}],o=u(this,v,g).call(this,e,r,n),a=o.eventsArr,i=o.callbackArr;0!==this.events[e].length?(a.forEach((function(r,n){t[e].removeEventListener(r,i[n]),t.events[e].splice(t.events[e].indexOf(r))})),console.log("Events removed from ".concat(e))):console.log("No events attached to ".concat(e))}},{key:"createDialog",value:function(){return this.createTitle(),this.createBody(),this.createButtonContainer(),this.dialog=(0,l.newElement)("div",{class:(0,i.default)(this,f)},[this.title,this.body,this.btnContainer]),this.dialog}},{key:"createTitle",value:function(){this.title=(0,l.newElement)("h2",{class:"alert-dialog-title"},[this.config.modalTitle])}},{key:"createBody",value:function(){this.createBodyText(),this.body=(0,l.newElement)("div",{class:"alert-dialog-body"},[this.text])}},{key:"createButtonContainer",value:function(){this.createButtonOk();var t=[this.btnOk];this.config.hasCancelBtn&&(this.createButtonCancel(),t.push(this.btnCancel)),this.btnContainer=(0,l.newElement)("div",{class:"alert-dialog-btn-container"},t)}},{key:"createBodyText",value:function(){this.text=(0,l.newElement)("p",{class:"alert-dialog-text"},[this.config.modalText])}},{key:"createButtonOk",value:function(){this.btnOk=(0,l.newElement)("button",{class:(0,i.default)(this,p)},[this.config.modalOkBtnText])}},{key:"createButtonCancel",value:function(){this.btnCancel=(0,l.newElement)("button",{class:(0,i.default)(this,h)},[this.config.modalCancelBtnText])}}]),t}();function g(t,e,r){var n;if(!t)throw n="Expecting elementName to be one of "+"'".concat(this.elements.join(", "),"', but got '").concat(t,"'"),new Error(n);if(!e)throw n="Expecting event to be a string or an array of event, but got '".concat(e,"'"),new Error(n);if(!r)throw n="Expecting callback to be a function or an array of function, but got '".concat(r,"'"),new Error(n);var o=Array.isArray(e)?e:[e],a=Array.isArray(r)?r:[r];if(o.length!==a.length)throw n="Expecting events and callback to have the same length, but got ".concat(o.length," and ").concat(a.length),new Error(n);return{eventsArr:o,callbackArr:a}}e.AlertDialog=m},7907:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.showDialog=s,e.showSuccessDialog=function(t){var e=t.modalText,r=t.modalOkBtnText,n=void 0===r?"Close":r,o=t.modalTitle,a=void 0===o?"User added":o,i=t.parentEl,l=void 0===i?document.body:i,u=t.btnEventCallback;s({modalType:"success",modalOkBtnText:n,modalTitle:a,modalText:e,parentEl:l,btnEventCallback:void 0===u?null:u})},e.showErrorDialog=function(t){var e=t.modalTitle,r=void 0===e?"Error":e,n=t.modalOkBtnText,o=void 0===n?"Ok":n,a=t.modalText,i=void 0===a?"An error occured, please retry!":a,l=t.parentEl,u=void 0===l?document.body:l,c=t.btnEventCallback;s({modalType:"error",modalTitle:r,modalOkBtnText:o,modalText:i,parentEl:u,btnEventCallback:void 0===c?null:c})};var o=n(r(9713)),a=r(2667);function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){var e,r=t.modalType,n=void 0===r?"success":r,s=t.modalTitle,l=void 0===s?"Success":s,u=t.modalOkBtnText,c=void 0===u?"Done":u,d=t.modalText,f=void 0===d?"Success":d,p=t.parentEl,h=void 0===p?document.body:p,v=t.forceNewParent,m=void 0!==v&&v,g=t.btnEventCallback,y=void 0===g?null:g,x={modalType:n,modalTitle:l,modalOkBtnText:c,modalText:f},b=new a.AlertDialog(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){(0,o.default)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},x)),w=b.getDialogWithParent();b.attachEventsTo("btnOk","click",(function(){w.remove(w),y&&y()}));var E=document.querySelector(".main-content");m?h.append(w):(E||h).append(w),null===(e=w.querySelector("button"))||void 0===e||e.focus()}},4814:(t,e,r)=>{"use strict";var n=r(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.getFullName=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{first:"",last:""};return"".concat(t.first," ").concat(t.last)},e.postData=function(t){return s.apply(this,arguments)},e.getData=function(t){return l.apply(this,arguments)},e.newElement=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=document.createElement(t),o=Object.getOwnPropertyNames(e);return o.forEach((function(t){n.setAttribute("".concat(t),e["".concat(t)])})),n.append.apply(n,(0,a.default)(r)),n},e.isValidPassword=e.isValidName=e.isValidUsername=e.isValidEmail=e.isNotEmpty=e.isEmpty=e.isArrayOfStrings=e.isAnArray=e.isString=e.removeExtraSpaces=e.stripAll=e.strip=e.getPasswordRegex=e.getCINRegex=e.getNameRegex=e.getUsernameRegex=e.getEmailRegex=e.capitalizeAll=e.capitalize=e.reloadPage=e.redirectTo=e.decodeCookie=e.getDataFromCookie=void 0;var o=n(r(7757)),a=n(r(319)),i=n(r(8926));function s(){return(s=(0,i.default)(o.default.mark((function t(e){var r,n,a,i,s,l,u;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.url,n=void 0===r?"":r,a=e.data,i=void 0===a?{}:a,s=e.stringify,l=void 0===s||s,t.next=3,fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:l?JSON.stringify(i):i});case 3:return u=t.sent,t.abrupt("return",u.json());case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function l(){return(l=(0,i.default)(o.default.mark((function t(e){var r,n,a;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.url,n=void 0===r?"":r,t.next=3,fetch(n);case 3:return a=t.sent,t.abrupt("return",a.json());case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e.getDataFromCookie=function(t){return document.cookie.split("; ").find((function(e){return e.startsWith(t)})).split("=")[1]},e.decodeCookie=function(t){return decodeURIComponent(t)},e.redirectTo=function(t){window.location.href=t},e.reloadPage=function(){return window.location.reload()};var u=function(t){return t.charAt(0).toUpperCase()+t.slice(1)};e.capitalize=u,e.capitalizeAll=function(t){return t.replace(/\w\S*/g,u)};e.getEmailRegex=function(){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/};e.getUsernameRegex=function(){return/^[a-zA-Z][a-zA-Z0-9_]{4,}$/};e.getNameRegex=function(){return/^[a-zA-Z](\.?\s?\w+)+$/},e.getCINRegex=function(){return/^[0-9]{5,}$/};e.getPasswordRegex=function(){return/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w\W@#%^$!%*?&]{7,}/};var c=function(t){return String(t).replace(/\s+/g," ")};e.strip=c,e.stripAll=function(t){return String(t).replace(/\s+/g,"")};var d=function(t){return c(t).trim()};e.removeExtraSpaces=d;var f=function(t){return"string"==typeof t};e.isString=f;var p=function(t){return Array.isArray(t)};e.isAnArray=p,e.isArrayOfStrings=function(t){return p(t)&&t.every((function(t){return f(t)}))};var h=function(t){return!t||!c(t).trim()};e.isEmpty=h,e.isNotEmpty=function(t){return!h(t)},e.isValidEmail=function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(d(t))},e.isValidUsername=function(t){return/^[a-zA-Z][a-zA-Z0-9_]{4,}$/.test(d(t))},e.isValidName=function(t){return/^[a-zA-Z](\.?\s?\w+)+$/.test(d(t))},e.isValidPassword=function(t){return/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w\W@#%^$!%*?&]{7,}/.test(d(t))}},5666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,a=Object.create(o.prototype),i=new S(n||[]);return a._invoke=function(t,e,r){var n=d;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return P()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=_(i,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var l=c(t,e,r);if("normal"===l.type){if(n=r.done?h:f,l.arg===v)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=h,r.method="throw",r.arg=l.arg)}}}(t,r,i),a}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",v={};function m(){}function g(){}function y(){}var x={};l(x,a,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(L([])));w&&w!==r&&n.call(w,a)&&(x=w);var E=y.prototype=m.prototype=Object.create(x);function k(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function r(o,a,i,s){var l=c(t[o],t,a);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(d).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,s)}))}s(l.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function _(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,_(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=c(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function L(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return g.prototype=y,l(E,"constructor",y),l(y,"constructor",g),g.displayName=l(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},k(T.prototype),l(T.prototype,i,(function(){return this})),t.AsyncIterator=T,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new T(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(E),l(E,s,"Generator"),l(E,a,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(l&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:L(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}(()=>{"use strict";(0,r(8629).useFormValidation)()})()})();
//# sourceMappingURL=auth_bundle.js.map
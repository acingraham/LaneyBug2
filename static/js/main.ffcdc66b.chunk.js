(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{42:function(e,n,t){},70:function(e,n,t){},76:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t.n(o),r=t(17),s=t.n(r),a=t(18),i=t(31),u=t(1),l=c.a.createContext(),h=function(e){var n=e.children,t=Object(i.useGoogleLogin)({clientId:"934914015863-16l8d98h298c138eqca115cf2l587k3a.apps.googleusercontent.com"});return Object(u.jsx)(l.Provider,{value:t,children:n})},j=function(){return c.a.useContext(l)},f=(t(42),t(13)),g=t.n(f),d=t(19),p=t(35),b=t(9),O=t(20),m=t.n(O),x=t(32),v=t(2),y=(t(69),t(70),"https://xrkgyvv5tk.execute-api.us-east-1.amazonaws.com/prod"),w="".concat(y,"/view"),S=("".concat(y,"/favorite"),"".concat(y,"/group")),k="".concat(y,"/aggregategroups");function C(e){var n=e.list,t=Object(o.useState)(0),c=Object(b.a)(t,2),r=c[0],s=c[1],a=function(e,n){for(var t=new Set;t.size<n&&n<e.length;){var o=Math.floor(Math.random()*e.length);t.add(e[o])}return Array.from(t)}(n,20),i=Object(o.useState)(a),l=Object(b.a)(i,2),h=l[0],f=l[1],g=function(e,n){"error"===e.type&&f((function(e){var t=Object(p.a)(e),o=t.indexOf(n);return t.splice(o,1),t}))},d=function(e,n){return function(t,o){console.log("recording view of",e,n,t,o),fetch(w,{headers:{"Content-type":"application/json"},method:"PUT",mode:"cors",body:JSON.stringify({groupId:e,userId:o,url:t})}).then((function(e){return e.json()})).then((function(e){return console.log("SUCCESS",e)})).catch((function(e){return console.log("ERROR",e)}))}}("laney","andrew"),O=j(),m=(O.isInitialized,O.isSignedIn),v=(O.signIn,O.signOut,O.googleUser);if(!m){var y=localStorage.getItem("laneybugemail");console.log("laneybugemail",y),y&&(m=!0,v={profileObj:{email:y}})}return console.log("data",O),Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(x.Carousel,{onChange:s,showThumbs:!1,useKeyboardArrows:!0,showStatus:!1,autoFocus:!0,children:h.slice(0,10).map((function(e,n){return Object(u.jsxs)("div",{className:"login-wrapper",children:[!1,!1,Object(u.jsx)(E,{isSignedIn:m,url:e,playing:n===r,onError:g,recordView:d,googleUser:v})]},e)}))})})}function E(e){var n=e.url,t=e.playing,c=e.onError,r=e.recordView,s=e.googleUser,a=e.isSignedIn;return console.log("isSignedIn",a),console.log("googleUser",s),Object(o.useEffect)((function(){t&&a&&r(n,s.profileObj.email)}),[t,a]),Object(u.jsx)(m.a,{url:"https://laneybug.s3.amazonaws.com/videos/".concat(n),controls:!0,loop:!0,height:"auto",width:"auto",playing:t,onError:function(e){return c(e,n)}})}function I(e){return function(n){console.log("recording group of",e,n),fetch(S,{headers:{"Content-type":"application/json"},method:"PUT",mode:"cors",body:JSON.stringify({group:e,url:n})}).then((function(e){return e.json()})).then((function(e){return console.log("SUCCESS",e)})).catch((function(e){return console.log("ERROR",e)}))}}function z(){var e=Object(o.useState)(0),n=Object(b.a)(e,2),t=n[0],c=n[1],r=I("main"),s=I("skip"),a=I("other"),i=Object(o.useState)([]),l=Object(b.a)(i,2),h=l[0],j=l[1];if(Object(o.useEffect)((function(){function e(){return(e=Object(d.a)(g.a.mark((function e(){var n,t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://laneybug.s3.amazonaws.com/group/new/data.json");case 2:return n=e.sent,e.next=5,n.json();case 5:t=e.sent,console.log("vidoelist.length",t.length),j(t);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),!h.length||t>=h.length)return Object(u.jsx)("div",{className:"no-videos",children:"No videos to process"});var f=function(){r(h[t]),c((function(e){return e+1}))},p=function(){s(h[t]),c((function(e){return e+1}))},O=function(){c((function(e){return e-1}))},x=function(){a(h[t]),c((function(e){return e+1}))};return Object(u.jsxs)("div",{onKeyPress:function(e){console.log("keypress")," "===e.key?f():"o"===e.key?x():"b"===e.key&&O()},children:[Object(u.jsxs)("div",{children:[t," / ",h.length]}),Object(u.jsxs)("div",{className:"button-section",children:[Object(u.jsx)("button",{onClick:f,children:"LaneyBug"}),Object(u.jsx)("button",{onClick:p,children:"Skip"}),Object(u.jsx)("button",{onClick:O,children:"Back"}),Object(u.jsx)("button",{onClick:x,children:"Other"}),Object(u.jsx)("button",{onClick:function(){fetch(k,{headers:{"Content-type":"application/json"},method:"POST",mode:"cors"}).then((function(e){return e.json()})).then((function(e){return console.log("SUCCESS",e)})).catch((function(e){return console.log("ERROR",e)}))},children:"Process"})]}),Object(u.jsx)(m.a,{url:"https://laneybug.s3.amazonaws.com/videos/".concat(h[t]),controls:!0,loop:!0,height:"auto",width:"auto",playing:!0,onError:function(e){return function(e,n){"error"===e.type&&p()}(e,h[t])},className:"admin-player"})]})}function U(e){var n=e.file,t=Object(o.useState)([]),c=Object(b.a)(t,2),r=c[0],s=c[1],a=j(),i=a.isSignedIn,l=a.googleUser;return Object(o.useEffect)((function(){function e(){return(e=Object(d.a)(g.a.mark((function e(){var t,o,c,r,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(n);case 2:return t=e.sent,e.next=5,t.json();case 5:if(o=e.sent,!i||!l){e.next=21;break}return e.prev=7,e.next=10,fetch("https://laneybug.s3.amazonaws.com/events/".concat(l.profileObj.email,"/view/summary.json"));case 10:return c=e.sent,e.next=13,c.json();case 13:r=e.sent,a=new Set(r),o=o.filter((function(e){return!a.has(e)})),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(7),console.log("Error occurred trying to fetch previously viewed videos",e.t0);case 21:s(o);case 22:case"end":return e.stop()}}),e,null,[[7,18]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[n,i,l]),r.length?Object(u.jsx)(C,{list:r}):null}var R=function(){return Object(u.jsxs)(v.c,{children:[Object(u.jsx)(v.a,{path:"/admin",children:Object(u.jsx)(z,{})}),Object(u.jsx)(v.a,{path:"/other",children:Object(u.jsx)(U,{file:"https://laneybug.s3.amazonaws.com/group/other/data.json"})}),Object(u.jsx)(v.a,{path:"/skip",children:Object(u.jsx)(U,{file:"https://laneybug.s3.amazonaws.com/group/skip/data.json"})}),Object(u.jsx)(v.a,{path:"/",children:Object(u.jsx)(U,{file:"https://laneybug.s3.amazonaws.com/group/main/data.json"})})]})},N=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,77)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,r=n.getLCP,s=n.getTTFB;t(e),o(e),c(e),r(e),s(e)}))};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(a.a,{children:Object(u.jsx)(h,{children:Object(u.jsx)(R,{})})})}),document.getElementById("root")),N()}},[[76,1,2]]]);
//# sourceMappingURL=main.ffcdc66b.chunk.js.map
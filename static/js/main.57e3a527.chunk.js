(this.webpackJsonptypequiz=this.webpackJsonptypequiz||[]).push([[0],{12:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(4),r=n.n(c),a=n(5),s=n(2),i=n(1),o=n.n(i),u=n(6),j=n.n(u),l=(n(12),n(13),{FIRE:"fire",WATER:"water",GRASS:"grass",ELECTRIC:"electric",ROCK:"rock",GROUND:"ground",NORMAL:"normal",ICE:"ice",FIGHTING:"fighting",POISON:"poison",PSYCHIC:"psychic",GHOST:"ghost",BUG:"bug",FLYING:"flying",DRAGON:"dragon",DARK:"dark",STEEL:"steel",FAIRY:"fairy"}),b=n(0);function d(e){return Object(b.jsx)("div",{children:Object(b.jsxs)("h1",{children:["Correct Answers: ",e.score]})})}function h(e){return Object(b.jsx)("button",{type:"button",className:"btn btn-primary typeButton",value:e.type,onClick:e.onClick,children:e.type})}function f(e){return Object(b.jsx)("button",{className:"btn btn-secondary resetButton",onClick:e.onClick,children:"Reset"})}function O(e){var t="Your target type: ".concat(e.types[0]);return e.types.length>1&&(t+="/ ".concat(e.types[1])),Object(b.jsx)("div",{children:Object(b.jsx)("h1",{children:t})})}function p(e){return Object(b.jsx)("div",{children:Object(b.jsx)("h1",{children:e.status})})}function x(){var e=Object(i.useState)(0),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(i.useState)(0),u=Object(s.a)(o,2),j=u[0],x=u[1],m=Object(i.useState)([]),y=Object(s.a)(m,2),g=y[0],S=y[1],k=Object(i.useState)(null),C=Object(s.a)(k,2),E=C[0],N=C[1],R=Object(i.useState)(!1),I=Object(s.a)(R,2),_=I[0],A=I[1],G=Object(i.useState)([]),w=Object(s.a)(G,2),Y=w[0],q=w[1],B=Object(i.useState)([]),L=Object(s.a)(B,2),M=L[0],T=L[1],z=Object(i.useState)(""),F=Object(s.a)(z,2),D=F[0],H=F[1];function J(){return K.apply(this,arguments)}function K(){return(K=Object(a.a)(r.a.mark((function e(){var t,n,c,a,s,i,o,u,j,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],n=[],c=[],a=[],s=v(18)+1,i=v(18)+1,o=v(5),e.prev=7,e.next=10,fetch("https://pokeapi.co/api/v2/type/".concat(s,"/"));case 10:return u=e.sent,e.next=13,u.json();case 13:if(U(e.sent,t,n,c,a),!(o>1&&i!==s)){e.next=25;break}return e.next=18,fetch("https://pokeapi.co/api/v2/type/".concat(i,"/"));case 18:return j=e.sent,e.next=21,j.json();case 21:U(e.sent,t,n,c,a),Q(c,n),Q(a,n);case 25:q(n),S(t),l=V(n[v(n.length)]),T(l),A(!0),e.next=35;break;case 32:e.prev=32,e.t0=e.catch(7),P(e.t0);case 35:case"end":return e.stop()}}),e,null,[[7,32]])})))).apply(this,arguments)}function P(e){e&&(A(!0),N(e))}function U(e,t,n,c,r){t.push(e.name),W(e.damage_relations.double_damage_from,n),W(e.damage_relations.half_damage_from,c),W(e.damage_relations.no_damage_from,r)}function W(e,t){for(var n in e)t.includes(n)||t.push(e[n].name)}function Q(e,t){e.forEach((function(e){t.includes(e)&&t.splice(t.indexOf(e),1)}))}function V(e){for(var t=[],n=0;n<3;){var c=v(17)+1,r=Object.values(l)[c];r===e||t.includes(r)||(t.push(r),n++)}return t.push(e),function(e){for(var t=e.length-1;t>0;t--){var n=v(t+1),c=[e[n],e[t]];e[t]=c[0],e[n]=c[1]}return e}(t)}function X(e){x(j+1),Y.includes(e.target.value)?(J(),H("Correct!"),function(){var e=n+1;if(c(e),e>=10){var t=Math.floor(n/j*100);document.querySelectorAll(".typeButton").forEach((function(e){return e.disabled=!0})),H("You have completed the quiz! You got ".concat(t,"%!"))}}()):(J(),H("Incorrect!"))}function Z(e){return Object(b.jsx)(h,{type:e,onClick:X,children:e})}return Object(i.useEffect)((function(){J()}),[]),E?Object(b.jsxs)("div",{children:["Error: ",E.message]}):_?Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("div",{className:"text",children:"Reach 10 points to finish the quiz."}),Object(b.jsx)(p,{status:D}),Object(b.jsx)(O,{types:g}),Object(b.jsx)(d,{score:n}),Object(b.jsx)("div",{className:"text",children:"Select the type your target is weak to!"}),Object(b.jsxs)("div",{className:"buttons",children:[Z(M[0]),Z(M[1]),Z(M[2]),Z(M[3])]}),Object(b.jsx)("div",{children:Object(b.jsx)(f,{onClick:function(){c(0),x(0),H(""),J()}})})]}):Object(b.jsx)("div",{children:"Loading..."})}function v(e){return Math.floor(Math.random()*e)}j.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.57e3a527.chunk.js.map
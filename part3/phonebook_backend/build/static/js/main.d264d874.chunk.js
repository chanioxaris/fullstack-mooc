(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(2),i=n(3),s=n(4),l=n.n(s),m="/api/persons",f=function(){return l.a.get(m).then((function(e){return e.data}))},d=function(e){return l.a.post(m,e).then((function(e){return e.data}))},b=function(e){return l.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},g=function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},h=function(e){var t=e.onClick,n=e.text;return r.a.createElement("button",{onClick:t},n)},v=function(e){var t=e.person,n=e.onClick;return r.a.createElement("div",null,r.a.createElement("p",null,t.name," ",t.number),r.a.createElement(h,{onClick:function(){return n(t)},text:"Delete"}))},p=function(e){var t=e.persons,n=e.handleDeletePerson;return t.map((function(e){return r.a.createElement(v,{key:e.id,person:e,onClick:n})}))},E=function(e){var t=e.onChange,n=e.value;return r.a.createElement("div",null,"Filter shown with ",r.a.createElement("input",{onChange:t,value:n}))},j=function(e){var t=e.onSubmit,n=e.onChangeName,a=e.valueName,o=e.onChangeNumber,c=e.valueNumber;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"Name ",r.a.createElement("input",{onChange:n,value:a})),r.a.createElement("div",null,"Number ",r.a.createElement("input",{onChange:o,value:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},O=function(e,t){var n=Object(u.a)(Object(u.a)({},t),{},{color:"green"});return r.a.createElement("div",{style:n},e)},C=function(e,t){var n=Object(u.a)(Object(u.a)({},t),{},{color:"red"});return r.a.createElement("div",{style:n},e)},k=function(e){var t=e.message,n=e.isError,a={fontStyle:"italic",fontSize:20,background:"lightgrey",borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return""===t?null:n?C(t,a):O(t,a)},w=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),l=s[0],m=s[1],h=Object(a.useState)(""),v=Object(i.a)(h,2),O=v[0],C=v[1],w=Object(a.useState)(""),y=Object(i.a)(w,2),S=y[0],N=y[1],_=Object(a.useState)([]),T=Object(i.a)(_,2),D=T[0],x=T[1],P=Object(a.useState)({message:""}),A=Object(i.a)(P,2),B=A[0],F=A[1];Object(a.useEffect)((function(){f().then((function(e){o(e),x(e)})).catch((function(e){F({message:"failed to get persons",is_error:!0}),setTimeout((function(){F({message:""})}),3e3)}))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(k,{message:B.message,isError:B.is_error}),r.a.createElement(E,{onChange:function(e){var t=e.target.value,a=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));N(t),x(a)},value:S}),r.a.createElement("h3",null,"Add new"),r.a.createElement(j,{onSubmit:function(e){if(e.preventDefault(),n.some((function(e){return e.name===l}))){if(!window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?")))return;var t=n.find((function(e){return e.name===l})),a=Object(u.a)(Object(u.a)({},t),{},{number:O});b(a).then((function(e){var t=n.map((function(t){return t.id!==e.id?t:e}));o(t),x(t),m(""),C(""),F({message:"".concat(l," number successfully updated"),is_error:!1}),setTimeout((function(){F({message:""})}),3e3)})).catch((function(e){F({message:e.response.data.error,is_error:!0}),setTimeout((function(){F({message:""})}),3e3)}))}else{var r={name:l,number:O};d(r).then((function(e){o(n.concat(e)),x(D.concat(e)),m(""),C(""),F({message:"".concat(r.name," successfully created"),is_error:!1}),setTimeout((function(){F({message:""})}),3e3)})).catch((function(e){F({message:e.response.data.error,is_error:!0}),setTimeout((function(){F({message:""})}),3e3)}))}},onChangeName:function(e){return m(e.target.value)},valueName:l,onChangeNumber:function(e){return C(e.target.value)},valueNumber:O}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(p,{persons:D,handleDeletePerson:function(e){var t=e.id,a=e.name;window.confirm("Delete ".concat(a))&&g(e.id).then((function(a){var r=n.filter((function(e){return e.id!==t}));o(r),x(r),F({message:"".concat(e.name," successfully deleted"),is_error:!1}),setTimeout((function(){F({message:""})}),3e3)})).catch((function(e){F({message:"failed to delete ".concat(a),is_error:!0}),setTimeout((function(){F({message:""})}),3e3)}))}}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d264d874.chunk.js.map
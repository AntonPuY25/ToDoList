(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{100:function(t,e,a){},127:function(t,e,a){},130:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),c=a(9),o=a.n(c);a(100),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,s,u=a(16),l=a(14),d=a.n(l),f=a(23),p=a(24),b=a(44),m=a(7),O=a(74),k=a.n(O).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"c9a11d0b-1bf4-4a0d-8b85-3f35229d5cc6"}});!function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={})),function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(s||(s={}));var v={getTodoLists:function(){return k.get("todo-lists").then((function(t){return t.data}))},setTodolist:function(t){return k.post("todo-lists",{title:t})},removeTodolist:function(t){return k.delete("todo-lists/".concat(t))},updateTodolist:function(t,e){return k.put("todo-lists/".concat(t),{title:e})},reorderTodolist:function(t,e){return k.put("/todo-lists/".concat(t,"/reorder"),{putAfterItemId:e})},getTasks:function(t){return k.get("todo-lists/".concat(t,"/tasks?count=10&page=1"))},createTask:function(t,e){return k.post("todo-lists/".concat(t,"/tasks"),{title:e})},deleteTask:function(t,e){return k.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},updateTask:function(t,e,a){return k.put("/todo-lists/".concat(t,"/tasks/").concat(e),a)},reorderTask:function(t,e,a){return k.put("/todo-lists/".concat(t,"/tasks/").concat(e),{putAfterItemId:a})}},E={status:"free",error:null},T=function(t){return{type:"appReducer/SET_STATUS",status:t}},j=function(t){return{type:"appReducer/SET_ERROR",error:t}},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"appReducer/SET_ERROR":return Object(m.a)(Object(m.a)({},t),{},{error:e.error});case"appReducer/SET_STATUS":return Object(m.a)(Object(m.a)({},t),{},{status:e.status});default:return t}},S=function(t){return{type:"ADD-TASK",task:t}},g=function(t){return{type:"CHANGE_TASK",task:t}},I=function(t,e,a){return{type:"CHANGE_DISABLED",taskId:t,todoListId:e,disabled:a}},w=function(t,e){return{type:"GET-TASKS",todoListId:t,tasks:e}},x={};var y=function(t,e,a){if(0!==t.resultCode)throw a(T("error")),a(_(e,!1)),new Error(t.messages[0]);a(C(e)),a(T("succeeded")),a(_(e,!1))},L=function(t,e,a){e(j(t.toString())),e(_(a,!1)),e(T("error"))},C=function(t){return{type:"REMOVE-TODOLIST",id:t}},D=function(t,e){return{type:"CHANGE_TODOLIST_TITLE",id:t,title:e}},A=function(t,e){return{type:"CHANGE_TODOLIST_FILTER",id:t,filter:e}},_=function(t,e){return{type:"/todolistReducer/SET_DISABLED_STATUS",todolistId:t,disabled:e}},R=[];var N=a(36),H=a(75),K=Object(N.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.todoListId,Object(b.a)(t[e.todoListId].filter((function(t){return t.id!==e.taskId})))));case"ADD-TASK":return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.task.todoListId,[e.task].concat(Object(b.a)(t[e.task.todoListId]))));case"CHANGE_TASK":var a=Object(m.a)({},t),r=a[e.task.todoListId].map((function(t){return t.id===e.task.id?t=e.task:t}));return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.task.todoListId,r));case"CHANGE_DISABLED":var n=Object(m.a)({},t),c=n[e.todoListId].map((function(t){return t.id===e.taskId?(t.disabledStatus=e.disabled,t):t}));return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.todoListId,c));case"ADD-TODOLIST":return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":return Object(m.a)({delete:t[e.id]},t);case"todolist_reducer/SET_TODOLISTS":var o=Object(m.a)({},t);return e.todolists.forEach((function(t){o[t.id]=[]})),o;case"GET-TASKS":return Object(m.a)(Object(m.a)({},t),{},Object(p.a)({},e.todoListId,e.tasks.map((function(t){return t}))));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":var a=e.todolist;return a.filter="all",[a].concat(Object(b.a)(t));case"CHANGE_TODOLIST_TITLE":return t.map((function(t){return t.id===e.id?Object(m.a)(Object(m.a)({},t),{},{title:e.title}):t}));case"CHANGE_TODOLIST_FILTER":return t.map((function(t){return t.id===e.id?Object(m.a)(Object(m.a)({},t),{},{filter:e.filter}):t}));case"todolist_reducer/SET_TODOLISTS":return e.todolists.map((function(t){return Object(m.a)(Object(m.a)({},t),{},{filter:"all",disabledStatus:!1})}));case"/todolistReducer/SET_DISABLED_STATUS":return t.map((function(t){return t.id===e.todolistId?Object(m.a)(Object(m.a)({},t),{},{disabledStatus:e.disabled}):t}));default:return t}},app:h}),G=Object(N.d)(K,Object(N.a)(H.a));window.store=G;a(127);var B=a(38),U=a(167),M=a(176),z=n.a.memo((function(t){var e=Object(r.useState)(""),a=Object(B.a)(e,2),c=a[0],o=a[1],i=Object(r.useState)(null),s=Object(B.a)(i,2),u=s[0],l=s[1],d=function(){var e=c.trim();e?(t.addItems(e),o("")):l("Title is Required")};return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement(M.a,{label:"Enter text",error:!!u,className:u?"error":"",value:c,onChange:function(t){o(t.currentTarget.value),u&&l(null)},onKeyPress:function(t){"Enter"===t.key&&d()},helperText:u}),n.a.createElement(U.a,{disabled:t.disabledButton,color:"primary",variant:"contained",size:"small",onClick:d},"+")))})),F=a(170),V=a(171),P=a(168),J=a(173),W=a(174),q=a(175),X=a(169),Y=a(172),$=a(131),Q=n.a.memo((function(t){var e=Object(r.useState)(!1),a=Object(B.a)(e,2),c=a[0],o=a[1],i=Object(r.useState)(t.title),u=Object(B.a)(i,2),l=u[0],d=u[1];return c?n.a.createElement(M.a,{value:l,size:"small",onChange:function(t){d(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),l.trim()&&t.changeTaskTitle(l.trim())}}):n.a.createElement("span",{onDoubleClick:function(){o(!0)},className:t.status===s.Completed?"is-done":""},t.title)})),Z=a(85),tt=a.n(Z),et=a(56),at=a.n(et),rt=a(178),nt=a(84),ct=a.n(nt),ot=n.a.memo((function(t){var e=Object(u.b)(),a=Object(r.useCallback)((function(){var a,r;e((a=t.todolistId,r=t.task.id,function(t){t(T("loading")),t(I(r,a,!0)),v.deleteTask(a,r).then((function(e){if(0!==e.data.resultCode)throw t(T("error")),t(I(r,a,!1)),new Error(e.data.messages[0]);t(function(t,e){return{type:"REMOVE-TASK",taskId:t,todoListId:e}}(r,a)),t(T("succeeded")),t(I(r,a,!1))})).catch((function(e){t(j(e.toString())),t(T("error"))}))}))}),[e,t.task.id,t.todolistId]),c=Object(r.useCallback)((function(a){e(function(t,e,a){return function(){var r=Object(f.a)(d.a.mark((function r(n,c){var o,i,s,u;return d.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=c().tasks,!(i=o[t].find((function(t){return t.id===e})))){r.next=22;break}return s={title:a,description:i.description,completed:i.completed,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},r.prev=4,n(T("loading")),r.next=8,v.updateTask(i.todoListId,i.id,s);case 8:if(0!==(u=r.sent).data.resultCode){r.next=14;break}n(g(u.data.data.item)),n(T("succeeded")),r.next=16;break;case 14:throw n(T("error")),new Error(u.data.messages[0]);case 16:r.next=22;break;case 18:r.prev=18,r.t0=r.catch(4),n(j(r.t0.toString())),n(T("error"));case 22:case"end":return r.stop()}}),r,null,[[4,18]])})));return function(t,e){return r.apply(this,arguments)}}()}(t.todolistId,t.task.id,a))}),[e,t.task.id,t.todolistId]),o=Object(r.useCallback)((function(a){var r,n,c;e((r=t.todolistId,n=t.task.id,c=a.currentTarget.checked?2:0,function(){var t=Object(f.a)(d.a.mark((function t(e,a){var o,i,s,u;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=a().tasks,!(i=o[r].find((function(t){return t.id===n})))){t.next=22;break}return s={title:i.title,description:i.description,completed:i.completed,status:c,priority:i.priority,startDate:i.startDate,deadline:i.deadline},t.prev=4,e(T("loading")),t.next=8,v.updateTask(i.todoListId,i.id,s);case 8:if(0!==(u=t.sent).data.resultCode){t.next=14;break}e(g(u.data.data.item)),e(T("succeeded")),t.next=16;break;case 14:throw e(T("error")),new Error(u.data.messages[0]);case 16:t.next=22;break;case 18:t.prev=18,t.t0=t.catch(4),e(j(t.t0.toString())),e(T("error"));case 22:case"end":return t.stop()}}),t,null,[[4,18]])})));return function(e,a){return t.apply(this,arguments)}}()))}),[e,t.task.id,t.todolistId]);return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement(rt.a,{color:"primary",onChange:o,checked:0!==t.task.status}),n.a.createElement(Q,{title:t.task.title,changeTaskTitle:c,status:t.task.status}),n.a.createElement("span",null,n.a.createElement(P.a,{onClick:a,disabled:t.task.disabledStatus},n.a.createElement(ct.a,null)))))})),it=n.a.memo((function(t){var e=t.todolist,a=Object(u.c)((function(t){return t.tasks})),c=Object(u.b)();Object(r.useEffect)((function(){var t;c((t=e.id,function(){var e=Object(f.a)(d.a.mark((function e(a){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(T("loading")),e.next=3,v.getTasks(t);case 3:if(r=e.sent,e.prev=4,r.data.error){e.next=10;break}a(w(t,r.data.items)),a(T("succeeded")),e.next=11;break;case 10:throw new Error("Some Error");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(4),a(T("error")),a(j(e.t0));case 17:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t){return e.apply(this,arguments)}}()))}),[c,e.id]);var o=a[e.id];"active"===e.filter&&(o=a[e.id].filter((function(t){return t.status===s.New}))),"completed"===e.filter&&(o=a[e.id].filter((function(t){return t.status===s.Completed})));var i=Object(r.useCallback)((function(){c(A(e.id,"all"))}),[c,e.id]),l=Object(r.useCallback)((function(){c(A(e.id,"active"))}),[c,e.id]),p=Object(r.useCallback)((function(){c(A(e.id,"completed"))}),[c,e.id]),b=Object(r.useCallback)((function(t){c(function(t,e){return function(){var a=Object(f.a)(d.a.mark((function a(r){var n;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r(T("loading")),a.next=4,v.createTask(t,e);case 4:if(0!==(n=a.sent).data.resultCode){a.next=10;break}r(S(n.data.data.item)),r(T("succeeded")),a.next=12;break;case 10:throw r(T("error")),new Error(n.data.messages[0]);case 12:a.next=18;break;case 14:a.prev=14,a.t0=a.catch(0),r(j(a.t0.toString())),r(T("error"));case 18:case"end":return a.stop()}}),a,null,[[0,14]])})));return function(t){return a.apply(this,arguments)}}()}(e.id,t))}),[c,e.id]),m=Object(r.useCallback)((function(t){c(function(t,e){return function(){var a=Object(f.a)(d.a.mark((function a(r){var n;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r(T("loading")),a.next=4,v.updateTodolist(t,e);case 4:if(0!==(n=a.sent).data.resultCode){a.next=10;break}r(T("succeeded")),r(D(t,e)),a.next=12;break;case 10:throw r(T("error")),new Error(n.data.messages[0]);case 12:a.next=18;break;case 14:a.prev=14,a.t0=a.catch(0),r(T("error")),r(j(a.t0.toString()));case 18:case"end":return a.stop()}}),a,null,[[0,14]])})));return function(t){return a.apply(this,arguments)}}()}(e.id,t))}),[c,e.id]);return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:at.a.delete},n.a.createElement(P.a,{disabled:e.disabledStatus,onClick:function(){return c((t=e.id,function(){var e=Object(f.a)(d.a.mark((function e(a){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(T("loading")),a(_(t,!0)),e.next=5,v.removeTodolist(t);case 5:r=e.sent,y(r.data,t,a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),L(e.t0,a,t);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()));var t}},n.a.createElement(tt.a,null))),n.a.createElement("h3",{className:at.a.test,style:{textAlign:"center"}},n.a.createElement(Q,{title:e.title,changeTaskTitle:m})),n.a.createElement(z,{addItems:b,disabledButton:e.disabledStatus}),o.map((function(t){return n.a.createElement(ot,{todolistId:e.id,task:t,key:t.id})})),n.a.createElement("div",null,n.a.createElement(U.a,{size:"small",color:"default",variant:"all"===e.filter?"outlined":"text",onClick:i},"All"),n.a.createElement(U.a,{color:"primary",size:"small",variant:"active"===e.filter?"outlined":"text",onClick:l},"Active"),n.a.createElement(U.a,{color:"secondary",size:"small",variant:"completed"===e.filter?"outlined":"text",onClick:p},"Completed"))))})),st=function(){var t=Object(u.c)((function(t){return t.todolists}));return n.a.createElement(n.a.Fragment,null,t.map((function(t){return n.a.createElement(X.a,{style:{padding:"10px"},key:t.id,item:!0,xs:3},n.a.createElement($.a,{elevation:5,style:{padding:"10px"}},n.a.createElement(it,{todolist:t})))})))},ut=a(180),lt=a(177);function dt(t){return n.a.createElement(lt.a,Object.assign({elevation:6,variant:"filled"},t))}function ft(){var t=Object(u.c)((function(t){return t.app.error})),e=Object(u.b)(),a=function(t,a){"clickaway"!==a&&e(j(null))};return n.a.createElement(ut.a,{open:null!==t,autoHideDuration:4e3,onClose:a},n.a.createElement(dt,{onClose:a,severity:"error"},t))}var pt=n.a.memo((function(){var t=Object(u.b)(),e=Object(u.c)((function(t){return t.app.status})),a=Object(r.useCallback)((function(e){var a;t((a=e,function(){var t=Object(f.a)(d.a.mark((function t(e){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(T("loading")),t.next=4,v.setTodolist(a);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}e({type:"ADD-TODOLIST",todolist:r.data.data.item}),e(T("succeeded")),t.next=12;break;case 10:throw e(T("error")),new Error(r.data.messages[0]);case 12:t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),e(T("error")),e(j(t.t0.toString()));case 18:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(e){return t.apply(this,arguments)}}()))}),[t]);return Object(r.useEffect)((function(){t(function(){var t=Object(f.a)(d.a.mark((function t(e){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(T("loading")),t.next=3,v.getTodoLists();case 3:a=t.sent,e({type:"todolist_reducer/SET_TODOLISTS",todolists:a}),e(T("succeeded"));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[t]),n.a.createElement("div",null,n.a.createElement(F.a,{position:"static"},n.a.createElement(V.a,null,n.a.createElement(P.a,{edge:"start",color:"inherit","aria-label":"menu"},n.a.createElement(Y.a,null)),n.a.createElement(J.a,{variant:"h6"},"News"),n.a.createElement(U.a,{color:"inherit"},"Login"))),"loading"===e?n.a.createElement(W.a,null):"",n.a.createElement(q.a,null,n.a.createElement(X.a,{container:!0}," ",n.a.createElement(z,{addItems:a})),n.a.createElement(X.a,{container:!0},n.a.createElement(st,null)),n.a.createElement(ft,null)))}));o.a.render(n.a.createElement(u.a,{store:G},n.a.createElement(pt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},56:function(t,e,a){t.exports={delete:"todolist_delete__3KUky",test:"todolist_test__2Xzk0"}},95:function(t,e,a){t.exports=a(130)}},[[95,1,2]]]);
//# sourceMappingURL=main.00c603e6.chunk.js.map
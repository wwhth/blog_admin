import{z as h,H as I,d as x,r as L,D as V,o as c,G as S,a as y,c as E,x as p,g as t,h as s,I as b,B as u,n as B,u as d,J as N,K as C,j as q,L as M,M as U,k as z,l as F,p as R,_ as j}from"./index-C35omCHH.js";/* empty css                     */function D(o){return h.post({url:"api/v1/login",data:o})}const G=I("login",{state:()=>({token:localStorage.getItem("userId")||void 0,userId:void 0,isLogin:!!localStorage.getItem("token")}),actions:{login(o){this.token=o,this.isLogin=!0}}}),H=o=>(M("data-v-af3c9c6d"),o=o(),U(),o),J={class:"login-view"},K={class:"login-form"},T=H(()=>p("div",{class:"title"},"请登录",-1)),A=x({__name:"LoginView",setup(o){const m=G(),_=b(),a=L({name:"admin",password:"123456"}),f=V({name:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}),{login:g}=v();c(()=>{});function v(){const n=()=>{console.log("%c Line:50 🌽","color:#3f7cff"),D(a.value).then(e=>{e.code===0?(u.success(e.message),localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.id+""),m.login(e.data.token),_.push("/")):e.status===-1002&&u.error(e.message)}).catch(e=>{console.log(e)})};return c(()=>{document.addEventListener("keyup",e=>{e.key==="Enter"&&n()},!1)}),S(()=>{document.removeEventListener("keyup",n)}),{login:n}}return(n,e)=>{const l=z,r=F,k=R,w=B;return y(),E("div",J,[p("div",K,[T,t(w,{model:a.value,"label-width":"1px",style:{"max-width":"600px"},rules:f},{default:s(()=>[t(r,{prop:"name"},{default:s(()=>[t(l,{modelValue:a.value.name,"onUpdate:modelValue":e[0]||(e[0]=i=>a.value.name=i),placeholder:"请输入用户名","prefix-icon":d(N),clearable:""},null,8,["modelValue","prefix-icon"])]),_:1}),t(r,{prop:"password"},{default:s(()=>[t(l,{modelValue:a.value.password,"onUpdate:modelValue":e[1]||(e[1]=i=>a.value.password=i),type:"password","prefix-icon":d(C),placeholder:"请输入密码",clearable:"","show-password":""},null,8,["modelValue","prefix-icon"])]),_:1}),t(r,null,{default:s(()=>[t(k,{type:"primary",onClick:d(g)},{default:s(()=>[q("登录")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model","rules"])])])}}}),Q=j(A,[["__scopeId","data-v-af3c9c6d"]]);export{Q as default};

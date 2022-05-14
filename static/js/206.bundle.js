"use strict";(self.webpackChunkabtr_front=self.webpackChunkabtr_front||[]).push([[206],{8206:function(e,n,t){t.r(n),t.d(n,{default:function(){return l}});var r=t(7294),a=t(1508),i=t(2658),o=t(3505);function l(e){return r.createElement(o.Z,null,r.createElement(a.Z,{sx:{m:"auto",pb:"15%",minWidth:"300px",flex:"0 1 auto",width:"350px"}},r.createElement(i.Z,{variant:"h1",noWrap:!0,color:"primary",sx:{m:2}},"The sample project")))}},3505:function(e,n,t){t.d(n,{Z:function(){return j}});var r=t(7294),a=t(9602),i=t(1298),o=t(1508),l=t(7049),s=t(789),d=t(3926),c=t(4386),m=t(3461),x=t(6131);let p;function g(e){p=(0,m.h_)();const n=s.SB&&s.SB.drawer||{css:{}};return r.createElement(h,{drawerConfig:n,...e})}function h(e){const{drawerBody:n,drawerConfig:t}=e,a=((0,x.o)(p.listeners,"refresh",["drawer"]),p.isDrawerOpen);return r.createElement(r.Fragment,null,r.createElement(d.Z,{onClickAway:()=>{p.toggleDrawerOpen(!1)}},r.createElement(l.ZP,{variant:"permanent",PaperProps:{sx:{backgroundColor:"usertest.extraLight",background:"linear-gradient(160deg, rgba(243,240,238,1) 0%, rgba(255,239,221,1) 40%, rgba(193,208,232,1) 100%)",boxShadow:"0 0 4px 2px #bbb",transition:"margin 500ms ease",overflowX:"hidden",justifyContent:"flex-start",alignContent:"flex-start",width:"215px",marginLeft:{xs:a?0:"-215px",md:0},...t.css||{}}}},r.createElement(c.Z,{sx:{zIndex:1}}),n)),r.createElement(o.Z,{sx:{transition:"width 500ms ease",alignSelf:"stretch",width:{xs:0,md:"215px",flex:"none"}}}))}var u=t(802),f=t(6272),w=t(6867),b=t(7109),B=t(2761),E=t(326),Z=t(3540),y=t(9123),v=t(2658);let S;const k=(0,a.ZP)("div")`
  padding-left: 23px;
  margin: 0;
  z-index: 1205;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-grow: 0;
  position: fixed;
  box-sizing: border-box;
  color: ${s.SB?.header?.css?.color||"#5D6D97"};
  box-shadow: ${s.SB?.header?.css?.boxShadow||"0 0 5px 2px #999"};
  background-color: ${s.SB?.header?.css?.backgroundColor||"white"}
  @media (max-width: 500px) {
    padding-left: 0
  }
`,C=(0,a.ZP)("div")((({theme:e})=>`\n  display: flex;\n  margin-left: 50px;\n  margin-right: 16px;\n  padding: 0 8px;\n  width: 100%;\n  height: 28px;\n  background: #FFFFFF;\n  border: 1px solid;\n  border-color: transparent;\n  border-radius: 20px;\n  color: #BBBBBB;\n  transition: margin 500ms ease-out;\n  tabindex: 999;\n  @media (max-width: 350px) {\n    display: none;\n  };\n  @media (max-width: 500px) {\n    margin-left: 8px;\n    margin-right: 8px;\n    transition: margin 200ms ease-out;\n  };\n  :hover, :active, :focus {\n    border-color:  ${e.palette.primary.main};\n  };\n`)),F=(0,a.ZP)("span")`
  height: 100%;
  pointer-events: none;
  flex:none;
  padding: 2px 0;
  @media (max-width: 450px) {
    display: none;
  }
`,P=(0,a.ZP)("input")((({theme:e})=>`\n  width: 276px;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 16px;\n  transition: width 500ms ease;\n  background: transparent;\n  color: #BBBBBB;\n  border: none;\n  tabindex: 1;\n  ::placeholder {color: #BBBBBB};\n  :hover {\n    color: ${e.palette.primary.main};\n  };\n  :focus {\n    color: ${e.palette.primary.main};\n    outline: none;\n    width: 450px;\n    transition: width 200ms ease-out;\n  };\n  @media (max-width: 700px) {\n    width: 120px\n  }\n  `)),_=(0,a.ZP)("div")((({theme:e})=>({display:"inline-flex",alignItems:"center",flexDirection:"row",...e.mixins.toolbar}))),$=(0,a.ZP)("span")`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0
`;function z(e){const{onClose:n,subTitle:t}=e,a="AB Test Real";S=(0,m.h_)();const i=s.SB&&s.SB.header||{css:{}};(0,x.o)(S.listeners,"refresh",["header"]);return r.createElement(r.Fragment,null,r.createElement(k,{sx:{...i.css||{}}},r.createElement(_,null,r.createElement(w.Z,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:e=>{e.preventDefault(),e.stopPropagation(),S.toggleDrawerOpen()},tabIndex:1,sx:{m:0,display:{xs:e.drawerBody?"flex":"none",md:"none"}}},r.createElement(E.Z,null)),t&&S.is_logged?r.createElement(o.Z,{sx:{flex:"none",position:"relative"}},r.createElement(v.Z,{variant:"h1",noWrap:!0,color:"primary"},a),r.createElement(o.Z,{sx:{position:"absolute",whiteSpace:"nowrap",bottom:"-12px",opacity:"0.7",fontWeight:"normal",fontSize:14,lineHeight:"14px"}},t)):r.createElement(v.Z,{variant:"h1",noWrap:!0,sx:{flex:"none"},color:"primary"},a),r.createElement(C,null,r.createElement(F,null,r.createElement(B.Z,{sx:{color:"#BBBBBB"}})),r.createElement(P,{placeholder:"Поиск…",tabIndex:2}))),r.createElement($,null,S.is_logged&&r.createElement(b.Z,{alt:"Nice User",src:"/img/face01.png",sx:{"@media (max-width:450px)":{display:"none"}}}),r.createElement(f.Z,{title:S.is_logged?"Выйти":"Войти",arrow:!0},r.createElement(u.Fg,{to:S.is_logged?"/":"/login",tabIndex:-1},r.createElement(w.Z,{edge:"start",onClick:S.is_logged?e=>{S.is_logged&&S.db2_abtr.logout()}:()=>{},"aria-label":"close",tabIndex:3,sx:{color:"primary.main",ml:{xs:.5,sm:1,md:3},mr:{xs:.5,sm:1,md:2}}},S.is_logged?r.createElement(Z.Z,{fontSize:"medium"}):r.createElement(y.Z,{fontSize:"medium"})))))),r.createElement(c.Z,{sx:{zIndex:1,m:0}}))}var I=t(6501);const D=(0,a.ZP)("main")`
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: 0;
  transition: padding 500ms ease-out;
  background-color: ${s.SB?.body?.css?.backgroundColor||"#E8F1FF"};
  box-shadow: ${s.SB?.body?.css?.boxShadow||"none"}
`,W=(0,a.ZP)(I.Z)((({theme:e})=>({textAlign:"center",width:"802px",maxWidth:"802px",minWidth:"350px",margin:e.spacing(2,"auto"),padding:e.spacing(2),display:"flex",flexFlow:"column wrap",flexGrow:1,boxSizing:"border-box",alignSelf:"stretch",backgroundColor:s.SB?.paper?.css?.backgroundColor||"white",minHeight:`calc(100vh - ${Number("58")+32}px )`,"@media (max-width:802px)":{margin:0,minHeight:`calc(100vh - ${Number("58")}px )`}})));function j(e){return r.createElement(r.Fragment,null,r.createElement(z,{...e}),r.createElement(o.Z,{sx:{display:"flex",alignItems:"stretch"}},e.drawerBody&&r.createElement(g,{...e}),r.createElement(i.$B,{style:{width:"100vw",height:"calc(100vh - 58px)"}},r.createElement(D,null,r.createElement(W,{elevation:5},e.children)))))}},802:function(e,n,t){t.d(n,{Fg:function(){return i}});t(7294);var r=t(9602),a=t(9711);const i=(0,r.ZP)(a.rU)`
     text-decoration: none;
`}}]);
//# sourceMappingURL=206.bundle.js.map
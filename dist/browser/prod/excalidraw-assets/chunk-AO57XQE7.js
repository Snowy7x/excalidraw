import{b as F,i as q}from"./chunk-IAUN3XBX.js";import{a as M}from"./chunk-SC3GCAO4.js";import{a as P}from"./chunk-BZYWAROE.js";import{A as z,B as V,Ca as E,Da as L,Ka as H,da as p,fa as R,h as T,ha as N,i as G,na as _,pa as U,v as $}from"./chunk-B7LZIDS3.js";import{a as I}from"./chunk-M2JW2GFW.js";I();var W={},K=function(t){let s=Object.keys(t);for(let y of s)W[y]=t[y]},X=function(t,s,y,n,i,b){let w=n.select(`[id="${y}"]`);Object.keys(t).forEach(function(c){let l=t[c],k="default";l.classes.length>0&&(k=l.classes.join(" ")),k=k+" flowchart-label";let u=L(l.styles),e=l.text!==void 0?l.text:l.id,o;if(p.info("vertex",l,l.labelType),l.labelType==="markdown")p.info("vertex",l,l.labelType);else if(R(_().flowchart.htmlLabels)){let m={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,g=>`<i class='${g.replace(":"," ")}'></i>`)};o=q(w,m).node(),o.parentNode.removeChild(o)}else{let m=i.createElementNS("http://www.w3.org/2000/svg","text");m.setAttribute("style",u.labelStyle.replace("color:","fill:"));let g=e.split(N.lineBreakRegex);for(let C of g){let v=i.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),v.setAttribute("dy","1em"),v.setAttribute("x","1"),v.textContent=C,m.appendChild(v)}o=m}let d=0,r="";switch(l.type){case"round":d=5,r="rect";break;case"square":r="rect";break;case"diamond":r="question";break;case"hexagon":r="hexagon";break;case"odd":r="rect_left_inv_arrow";break;case"lean_right":r="lean_right";break;case"lean_left":r="lean_left";break;case"trapezoid":r="trapezoid";break;case"inv_trapezoid":r="inv_trapezoid";break;case"odd_right":r="rect_left_inv_arrow";break;case"circle":r="circle";break;case"ellipse":r="ellipse";break;case"stadium":r="stadium";break;case"subroutine":r="subroutine";break;case"cylinder":r="cylinder";break;case"group":r="rect";break;case"doublecircle":r="doublecircle";break;default:r="rect"}s.setNode(l.id,{labelStyle:u.labelStyle,shape:r,labelText:e,labelType:l.labelType,rx:d,ry:d,class:k,style:u.style,id:l.id,link:l.link,linkTarget:l.linkTarget,tooltip:b.db.getTooltip(l.id)||"",domId:b.db.lookUpDomId(l.id),haveCallback:l.haveCallback,width:l.type==="group"?500:void 0,dir:l.dir,type:l.type,props:l.props,padding:_().flowchart.padding}),p.info("setNode",{labelStyle:u.labelStyle,labelType:l.labelType,shape:r,labelText:e,rx:d,ry:d,class:k,style:u.style,id:l.id,domId:b.db.lookUpDomId(l.id),width:l.type==="group"?500:void 0,type:l.type,dir:l.dir,props:l.props,padding:_().flowchart.padding})})},J=function(t,s,y){p.info("abc78 edges = ",t);let n=0,i={},b,w;if(t.defaultStyle!==void 0){let a=L(t.defaultStyle);b=a.style,w=a.labelStyle}t.forEach(function(a){n++;let c="L-"+a.start+"-"+a.end;i[c]===void 0?(i[c]=0,p.info("abc78 new entry",c,i[c])):(i[c]++,p.info("abc78 new entry",c,i[c]));let l=c+"-"+i[c];p.info("abc78 new link id to be used is",c,l,i[c]);let k="LS-"+a.start,u="LE-"+a.end,e={style:"",labelStyle:""};switch(e.minlen=a.length||1,a.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",a.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let o="",d="";switch(a.stroke){case"normal":o="fill:none;",b!==void 0&&(o=b),w!==void 0&&(d=w),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(a.style!==void 0){let r=L(a.style);o=r.style,d=r.labelStyle}e.style=e.style+=o,e.labelStyle=e.labelStyle+=d,a.interpolate!==void 0?e.curve=E(a.interpolate,$):t.defaultInterpolate!==void 0?e.curve=E(t.defaultInterpolate,$):e.curve=E(W.curve,$),a.text===void 0?a.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType=a.labelType,e.label=a.text.replace(N.lineBreakRegex,`
`),a.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=l,e.classes="flowchart-link "+k+" "+u,s.setEdge(a.start,a.end,e,n)})},Q=function(t,s){p.info("Extracting classes"),s.db.clear();try{return s.parse(t),s.db.getClasses()}catch{return}},Y=async function(t,s,y,n){p.info("Drawing flowchart"),n.db.clear(),F.setGen("gen-2"),n.parser.parse(t);let i=n.db.getDirection();i===void 0&&(i="TD");let{securityLevel:b,flowchart:w}=_(),a=w.nodeSpacing||50,c=w.rankSpacing||50,l;b==="sandbox"&&(l=T("#i"+s));let k=b==="sandbox"?T(l.nodes()[0].contentDocument.body):T("body"),u=b==="sandbox"?l.nodes()[0].contentDocument:document,e=new P({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:a,ranksep:c,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),o,d=n.db.getSubGraphs();p.info("Subgraphs - ",d);for(let f=d.length-1;f>=0;f--)o=d[f],p.info("Subgraph - ",o),n.db.addVertex(o.id,{text:o.title,type:o.labelType},"group",void 0,o.classes,o.dir);let r=n.db.getVertices(),m=n.db.getEdges();p.info("Edges",m);let g=0;for(g=d.length-1;g>=0;g--){o=d[g],G("cluster").append("text");for(let f=0;f<o.nodes.length;f++)p.info("Setting up subgraphs",o.nodes[f],o.id),e.setParent(o.nodes[f],o.id)}X(r,e,s,k,u,n),J(m,e);let C=k.select(`[id="${s}"]`),v=k.select("#"+s+" g");if(await M(v,e,["point","circle","cross"],"flowchart",s),H.insertTitle(C,"flowchartTitleText",w.titleTopMargin,n.db.getDiagramTitle()),U(e,C,w.diagramPadding,w.useMaxWidth),n.db.indexNodes("subGraph"+g),!w.htmlLabels){let f=u.querySelectorAll('[id="'+s+'"] .edgeLabel .label');for(let x of f){let S=x.getBBox(),h=u.createElementNS("http://www.w3.org/2000/svg","rect");h.setAttribute("rx",0),h.setAttribute("ry",0),h.setAttribute("width",S.width),h.setAttribute("height",S.height),x.insertBefore(h,x.firstChild)}}Object.keys(r).forEach(function(f){let x=r[f];if(x.link){let S=T("#"+s+' [id="'+f+'"]');if(S){let h=u.createElementNS("http://www.w3.org/2000/svg","a");h.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),h.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),h.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),b==="sandbox"?h.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&h.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);let A=S.insert(function(){return h},":first-child"),B=S.select(".label-container");B&&A.append(function(){return B.node()});let D=S.select(".label");D&&A.append(function(){return D.node()})}}})},ie={setConf:K,addVertices:X,addEdges:J,getClasses:Q,draw:Y},Z=(t,s)=>{let y=V,n=y(t,"r"),i=y(t,"g"),b=y(t,"b");return z(n,i,b,s)},j=t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span,p {
    color: ${t.titleColor};
  }

  .label text,span,p {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${Z(t.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span,p {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
`,ce=j;export{ie as a,ce as b};

import{Ka as oe,Na as ce,b as Se,c as Ce,d as Ht,da as ht,e as Xt,f as qt,g as Ut,h as ct,ha as Kt,j as Zt,m as Qt,n as vt,na as nt,o as Tt,oa as $t,p as bt,q as xt,qa as te,r as _t,ra as ee,s as wt,sa as ie,t as Jt,ta as ne,ua as se,va as re,wa as ae,z as Ee}from"./chunk-B7LZIDS3.js";import{a as tt}from"./chunk-M2JW2GFW.js";import{d as pt,f as st}from"./chunk-SXMPUQ6M.js";var le=pt((Dt,St)=>{tt();(function(t,l){typeof Dt=="object"&&typeof St<"u"?St.exports=l():typeof define=="function"&&define.amd?define(l):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=l()})(Dt,function(){"use strict";var t="day";return function(l,n,e){var s=function(p){return p.add(4-p.isoWeekday(),t)},d=n.prototype;d.isoWeekYear=function(){return s(this).year()},d.isoWeek=function(p){if(!this.$utils().u(p))return this.add(7*(p-this.isoWeek()),t);var D,M,A,z,H=s(this),g=(D=this.isoWeekYear(),M=this.$u,A=(M?e.utc:e)().year(D).startOf("year"),z=4-A.isoWeekday(),A.isoWeekday()>4&&(z+=7),A.add(z,t));return H.diff(g,"week")+1},d.isoWeekday=function(p){return this.$utils().u(p)?this.day()||7:this.day(this.day()%7?p:p-7)};var h=d.startOf;d.startOf=function(p,D){var M=this.$utils(),A=!!M.u(D)||D;return M.p(p)==="isoweek"?A?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):h.bind(this)(p,D)}}})});var ue=pt((Et,Mt)=>{tt();(function(t,l){typeof Et=="object"&&typeof Mt<"u"?Mt.exports=l():typeof define=="function"&&define.amd?define(l):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=l()})(Et,function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},l=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,e=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,d={},h=function(g){return(g=+g)+(g>68?1900:2e3)},p=function(g){return function(b){this[g]=+b}},D=[/[+-]\d\d:?(\d\d)?|Z/,function(g){(this.zone||(this.zone={})).offset=function(b){if(!b||b==="Z")return 0;var y=b.match(/([+-]|\d\d)/g),S=60*y[1]+(+y[2]||0);return S===0?0:y[0]==="+"?-S:S}(g)}],M=function(g){var b=d[g];return b&&(b.indexOf?b:b.s.concat(b.f))},A=function(g,b){var y,S=d.meridiem;if(S){for(var W=1;W<=24;W+=1)if(g.indexOf(S(W,0,b))>-1){y=W>12;break}}else y=g===(b?"pm":"PM");return y},z={A:[s,function(g){this.afternoon=A(g,!1)}],a:[s,function(g){this.afternoon=A(g,!0)}],S:[/\d/,function(g){this.milliseconds=100*+g}],SS:[n,function(g){this.milliseconds=10*+g}],SSS:[/\d{3}/,function(g){this.milliseconds=+g}],s:[e,p("seconds")],ss:[e,p("seconds")],m:[e,p("minutes")],mm:[e,p("minutes")],H:[e,p("hours")],h:[e,p("hours")],HH:[e,p("hours")],hh:[e,p("hours")],D:[e,p("day")],DD:[n,p("day")],Do:[s,function(g){var b=d.ordinal,y=g.match(/\d+/);if(this.day=y[0],b)for(var S=1;S<=31;S+=1)b(S).replace(/\[|\]/g,"")===g&&(this.day=S)}],M:[e,p("month")],MM:[n,p("month")],MMM:[s,function(g){var b=M("months"),y=(M("monthsShort")||b.map(function(S){return S.slice(0,3)})).indexOf(g)+1;if(y<1)throw new Error;this.month=y%12||y}],MMMM:[s,function(g){var b=M("months").indexOf(g)+1;if(b<1)throw new Error;this.month=b%12||b}],Y:[/[+-]?\d+/,p("year")],YY:[n,function(g){this.year=h(g)}],YYYY:[/\d{4}/,p("year")],Z:D,ZZ:D};function H(g){var b,y;b=g,y=d&&d.formats;for(var S=(g=b.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(R,m,a){var c=a&&a.toUpperCase();return m||y[a]||t[a]||y[c].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(u,r,k){return r||k.slice(1)})})).match(l),W=S.length,P=0;P<W;P+=1){var X=S[P],j=z[X],V=j&&j[0],B=j&&j[1];S[P]=B?{regex:V,parser:B}:X.replace(/^\[|\]$/g,"")}return function(R){for(var m={},a=0,c=0;a<W;a+=1){var u=S[a];if(typeof u=="string")c+=u.length;else{var r=u.regex,k=u.parser,i=R.slice(c),_=r.exec(i)[0];k.call(m,_),R=R.replace(_,"")}}return function(o){var C=o.afternoon;if(C!==void 0){var L=o.hours;C?L<12&&(o.hours+=12):L===12&&(o.hours=0),delete o.afternoon}}(m),m}}return function(g,b,y){y.p.customParseFormat=!0,g&&g.parseTwoDigitYear&&(h=g.parseTwoDigitYear);var S=b.prototype,W=S.parse;S.parse=function(P){var X=P.date,j=P.utc,V=P.args;this.$u=j;var B=V[1];if(typeof B=="string"){var R=V[2]===!0,m=V[3]===!0,a=R||m,c=V[2];m&&(c=V[2]),d=this.$locale(),!R&&c&&(d=y.Ls[c]),this.$d=function(i,_,o){try{if(["x","X"].indexOf(_)>-1)return new Date((_==="X"?1e3:1)*i);var C=H(_)(i),L=C.year,q=C.month,f=C.day,v=C.hours,T=C.minutes,x=C.seconds,w=C.milliseconds,I=C.zone,E=new Date,et=f||(L||q?1:E.getDate()),Y=L||E.getFullYear(),G=0;L&&!q||(G=q>0?q-1:E.getMonth());var O=v||0,it=T||0,U=x||0,$=w||0;return I?new Date(Date.UTC(Y,G,et,O,it,U,$+60*I.offset*1e3)):o?new Date(Date.UTC(Y,G,et,O,it,U,$)):new Date(Y,G,et,O,it,U,$)}catch{return new Date("")}}(X,B,j),this.init(),c&&c!==!0&&(this.$L=this.locale(c).$L),a&&X!=this.format(B)&&(this.$d=new Date("")),d={}}else if(B instanceof Array)for(var u=B.length,r=1;r<=u;r+=1){V[1]=B[r-1];var k=y.apply(this,V);if(k.isValid()){this.$d=k.$d,this.$L=k.$L,this.init();break}r===u&&(this.$d=new Date(""))}else W.call(this,P)}}})});var fe=pt((At,Lt)=>{tt();(function(t,l){typeof At=="object"&&typeof Lt<"u"?Lt.exports=l():typeof define=="function"&&define.amd?define(l):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=l()})(At,function(){"use strict";return function(t,l){var n=l.prototype,e=n.format;n.format=function(s){var d=this,h=this.$locale();if(!this.isValid())return e.bind(this)(s);var p=this.$utils(),D=(s||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(M){switch(M){case"Q":return Math.ceil((d.$M+1)/3);case"Do":return h.ordinal(d.$D);case"gggg":return d.weekYear();case"GGGG":return d.isoWeekYear();case"wo":return h.ordinal(d.week(),"W");case"w":case"ww":return p.s(d.week(),M==="w"?1:2,"0");case"W":case"WW":return p.s(d.isoWeek(),M==="W"?1:2,"0");case"k":case"kk":return p.s(String(d.$H===0?24:d.$H),M==="k"?1:2,"0");case"X":return Math.floor(d.$d.getTime()/1e3);case"x":return d.$d.getTime();case"z":return"["+d.offsetName()+"]";case"zzz":return"["+d.offsetName("long")+"]";default:return M}});return e.bind(this)(D)}}})});tt();var he=st(Ce(),1),N=st(Se(),1),me=st(le(),1),ke=st(ue(),1),ye=st(fe(),1);var xi=st(Ee(),1);var It=function(){var t=function(m,a,c,u){for(c=c||{},u=m.length;u--;c[m[u]]=a);return c},l=[1,3],n=[1,5],e=[7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],s=[1,15],d=[1,16],h=[1,17],p=[1,18],D=[1,19],M=[1,20],A=[1,21],z=[1,22],H=[1,23],g=[1,24],b=[1,25],y=[1,26],S=[1,27],W=[1,29],P=[1,31],X=[1,34],j=[5,7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],V={trace:function(){},yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,dateFormat:12,inclusiveEndDates:13,topAxis:14,axisFormat:15,tickInterval:16,excludes:17,includes:18,todayMarker:19,title:20,acc_title:21,acc_title_value:22,acc_descr:23,acc_descr_value:24,acc_descr_multiline_value:25,section:26,clickStatement:27,taskTxt:28,taskData:29,openDirective:30,typeDirective:31,closeDirective:32,":":33,argDirective:34,click:35,callbackname:36,callbackargs:37,href:38,clickStatementDebug:39,open_directive:40,type_directive:41,arg_directive:42,close_directive:43,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",12:"dateFormat",13:"inclusiveEndDates",14:"topAxis",15:"axisFormat",16:"tickInterval",17:"excludes",18:"includes",19:"todayMarker",20:"title",21:"acc_title",22:"acc_title_value",23:"acc_descr",24:"acc_descr_value",25:"acc_descr_multiline_value",26:"section",28:"taskTxt",29:"taskData",33:":",35:"click",36:"callbackname",37:"callbackargs",38:"href",40:"open_directive",41:"type_directive",42:"arg_directive",43:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[27,2],[27,3],[27,3],[27,4],[27,3],[27,4],[27,2],[39,2],[39,3],[39,3],[39,4],[39,3],[39,4],[39,2],[30,1],[31,1],[34,1],[32,1]],performAction:function(a,c,u,r,k,i,_){var o=i.length-1;switch(k){case 2:return i[o-1];case 3:this.$=[];break;case 4:i[o-1].push(i[o]),this.$=i[o-1];break;case 5:case 6:this.$=i[o];break;case 7:case 8:this.$=[];break;case 9:r.setDateFormat(i[o].substr(11)),this.$=i[o].substr(11);break;case 10:r.enableInclusiveEndDates(),this.$=i[o].substr(18);break;case 11:r.TopAxis(),this.$=i[o].substr(8);break;case 12:r.setAxisFormat(i[o].substr(11)),this.$=i[o].substr(11);break;case 13:r.setTickInterval(i[o].substr(13)),this.$=i[o].substr(13);break;case 14:r.setExcludes(i[o].substr(9)),this.$=i[o].substr(9);break;case 15:r.setIncludes(i[o].substr(9)),this.$=i[o].substr(9);break;case 16:r.setTodayMarker(i[o].substr(12)),this.$=i[o].substr(12);break;case 17:r.setDiagramTitle(i[o].substr(6)),this.$=i[o].substr(6);break;case 18:this.$=i[o].trim(),r.setAccTitle(this.$);break;case 19:case 20:this.$=i[o].trim(),r.setAccDescription(this.$);break;case 21:r.addSection(i[o].substr(8)),this.$=i[o].substr(8);break;case 23:r.addTask(i[o-1],i[o]),this.$="task";break;case 27:this.$=i[o-1],r.setClickEvent(i[o-1],i[o],null);break;case 28:this.$=i[o-2],r.setClickEvent(i[o-2],i[o-1],i[o]);break;case 29:this.$=i[o-2],r.setClickEvent(i[o-2],i[o-1],null),r.setLink(i[o-2],i[o]);break;case 30:this.$=i[o-3],r.setClickEvent(i[o-3],i[o-2],i[o-1]),r.setLink(i[o-3],i[o]);break;case 31:this.$=i[o-2],r.setClickEvent(i[o-2],i[o],null),r.setLink(i[o-2],i[o-1]);break;case 32:this.$=i[o-3],r.setClickEvent(i[o-3],i[o-1],i[o]),r.setLink(i[o-3],i[o-2]);break;case 33:this.$=i[o-1],r.setLink(i[o-1],i[o]);break;case 34:case 40:this.$=i[o-1]+" "+i[o];break;case 35:case 36:case 38:this.$=i[o-2]+" "+i[o-1]+" "+i[o];break;case 37:case 39:this.$=i[o-3]+" "+i[o-2]+" "+i[o-1]+" "+i[o];break;case 41:r.parseDirective("%%{","open_directive");break;case 42:r.parseDirective(i[o],"type_directive");break;case 43:i[o]=i[o].trim().replace(/'/g,'"'),r.parseDirective(i[o],"arg_directive");break;case 44:r.parseDirective("}%%","close_directive","gantt");break}},table:[{3:1,4:2,5:l,30:4,40:n},{1:[3]},{3:6,4:2,5:l,30:4,40:n},t(e,[2,3],{6:7}),{31:8,41:[1,9]},{41:[2,41]},{1:[2,1]},{4:30,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:s,13:d,14:h,15:p,16:D,17:M,18:A,19:z,20:H,21:g,23:b,25:y,26:S,27:28,28:W,30:4,35:P,40:n},{32:32,33:[1,33],43:X},t([33,43],[2,42]),t(e,[2,8],{1:[2,2]}),t(e,[2,4]),{4:30,10:35,12:s,13:d,14:h,15:p,16:D,17:M,18:A,19:z,20:H,21:g,23:b,25:y,26:S,27:28,28:W,30:4,35:P,40:n},t(e,[2,6]),t(e,[2,7]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),t(e,[2,17]),{22:[1,36]},{24:[1,37]},t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),{29:[1,38]},t(e,[2,24]),{36:[1,39],38:[1,40]},{11:[1,41]},{34:42,42:[1,43]},{11:[2,44]},t(e,[2,5]),t(e,[2,18]),t(e,[2,19]),t(e,[2,23]),t(e,[2,27],{37:[1,44],38:[1,45]}),t(e,[2,33],{36:[1,46]}),t(j,[2,25]),{32:47,43:X},{43:[2,43]},t(e,[2,28],{38:[1,48]}),t(e,[2,29]),t(e,[2,31],{37:[1,49]}),{11:[1,50]},t(e,[2,30]),t(e,[2,32]),t(j,[2,26])],defaultActions:{5:[2,41],6:[2,1],34:[2,44],43:[2,43]},parseError:function(a,c){if(c.recoverable)this.trace(a);else{var u=new Error(a);throw u.hash=c,u}},parse:function(a){var c=this,u=[0],r=[],k=[null],i=[],_=this.table,o="",C=0,L=0,q=2,f=1,v=i.slice.call(arguments,1),T=Object.create(this.lexer),x={yy:{}};for(var w in this.yy)Object.prototype.hasOwnProperty.call(this.yy,w)&&(x.yy[w]=this.yy[w]);T.setInput(a,x.yy),x.yy.lexer=T,x.yy.parser=this,typeof T.yylloc>"u"&&(T.yylloc={});var I=T.yylloc;i.push(I);var E=T.options&&T.options.ranges;typeof x.yy.parseError=="function"?this.parseError=x.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function et(){var J;return J=r.pop()||T.lex()||f,typeof J!="number"&&(J instanceof Array&&(r=J,J=r.pop()),J=c.symbols_[J]||J),J}for(var Y,G,O,it,U={},$,Z,Gt,dt;;){if(G=u[u.length-1],this.defaultActions[G]?O=this.defaultActions[G]:((Y===null||typeof Y>"u")&&(Y=et()),O=_[G]&&_[G][Y]),typeof O>"u"||!O.length||!O[0]){var gt="";dt=[];for($ in _[G])this.terminals_[$]&&$>q&&dt.push("'"+this.terminals_[$]+"'");T.showPosition?gt="Parse error on line "+(C+1)+`:
`+T.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[Y]||Y)+"'":gt="Parse error on line "+(C+1)+": Unexpected "+(Y==f?"end of input":"'"+(this.terminals_[Y]||Y)+"'"),this.parseError(gt,{text:T.match,token:this.terminals_[Y]||Y,line:T.yylineno,loc:I,expected:dt})}if(O[0]instanceof Array&&O.length>1)throw new Error("Parse Error: multiple actions possible at state: "+G+", token: "+Y);switch(O[0]){case 1:u.push(Y),k.push(T.yytext),i.push(T.yylloc),u.push(O[1]),Y=null,L=T.yyleng,o=T.yytext,C=T.yylineno,I=T.yylloc;break;case 2:if(Z=this.productions_[O[1]][1],U.$=k[k.length-Z],U._$={first_line:i[i.length-(Z||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(Z||1)].first_column,last_column:i[i.length-1].last_column},E&&(U._$.range=[i[i.length-(Z||1)].range[0],i[i.length-1].range[1]]),it=this.performAction.apply(U,[o,L,C,x.yy,O[1],k,i].concat(v)),typeof it<"u")return it;Z&&(u=u.slice(0,-1*Z*2),k=k.slice(0,-1*Z),i=i.slice(0,-1*Z)),u.push(this.productions_[O[1]][0]),k.push(U.$),i.push(U._$),Gt=_[u[u.length-2]][u[u.length-1]],u.push(Gt);break;case 3:return!0}}return!0}},B=function(){var m={EOF:1,parseError:function(c,u){if(this.yy.parser)this.yy.parser.parseError(c,u);else throw new Error(c)},setInput:function(a,c){return this.yy=c||this.yy||{},this._input=a,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var c=a.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var c=a.length,u=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),u.length-1&&(this.yylineno-=u.length-1);var k=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:u?(u.length===r.length?this.yylloc.first_column:0)+r[r.length-u.length].length-u[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[k[0],k[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),c=new Array(a.length+1).join("-");return a+this.upcomingInput()+`
`+c+"^"},test_match:function(a,c){var u,r,k;if(this.options.backtrack_lexer&&(k={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(k.yylloc.range=this.yylloc.range.slice(0))),r=a[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length},this.yytext+=a[0],this.match+=a[0],this.matches=a,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(a[0].length),this.matched+=a[0],u=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),u)return u;if(this._backtrack){for(var i in k)this[i]=k[i];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,c,u,r;this._more||(this.yytext="",this.match="");for(var k=this._currentRules(),i=0;i<k.length;i++)if(u=this._input.match(this.rules[k[i]]),u&&(!c||u[0].length>c[0].length)){if(c=u,r=i,this.options.backtrack_lexer){if(a=this.test_match(u,k[i]),a!==!1)return a;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(a=this.test_match(c,k[r]),a!==!1?a:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var c=this.next();return c||this.lex()},begin:function(c){this.conditionStack.push(c)},popState:function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},pushState:function(c){this.begin(c)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(c,u,r,k){switch(r){case 0:return this.begin("open_directive"),40;case 1:return this.begin("type_directive"),41;case 2:return this.popState(),this.begin("arg_directive"),33;case 3:return this.popState(),this.popState(),43;case 4:return 42;case 5:return this.begin("acc_title"),21;case 6:return this.popState(),"acc_title_value";case 7:return this.begin("acc_descr"),23;case 8:return this.popState(),"acc_descr_value";case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 38;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 36;case 26:this.popState();break;case 27:return 37;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 35;case 31:return 5;case 32:return 12;case 33:return 13;case 34:return 14;case 35:return 15;case 36:return 16;case 37:return 18;case 38:return 17;case 39:return 19;case 40:return"date";case 41:return 20;case 42:return"accDescription";case 43:return 26;case 44:return 28;case 45:return 29;case 46:return 33;case 47:return 7;case 48:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],inclusive:!0}}};return m}();V.lexer=B;function R(){this.yy={}}return R.prototype=V,V.Parser=R,new R}();It.parser=It;var Me=It;N.default.extend(me.default);N.default.extend(ke.default);N.default.extend(ye.default);var Q="",Ot="",Vt,Wt="",lt=[],ut=[],Pt={},Nt=[],yt=[],at="",Bt="",ge=["active","done","crit","milestone"],Rt=[],ft=!1,jt=!1,Yt=0,Ae=function(t,l,n){ce.parseDirective(this,t,l,n)},Le=function(){Nt=[],yt=[],at="",Rt=[],mt=0,zt=void 0,kt=void 0,F=[],Q="",Ot="",Bt="",Vt=void 0,Wt="",lt=[],ut=[],ft=!1,jt=!1,Yt=0,Pt={},te()},Ie=function(t){Ot=t},Ye=function(){return Ot},Fe=function(t){Vt=t},ze=function(){return Vt},Oe=function(t){Wt=t},Ve=function(){return Wt},We=function(t){Q=t},Pe=function(){ft=!0},Ne=function(){return ft},Be=function(){jt=!0},Re=function(){return jt},je=function(t){Bt=t},Ge=function(){return Bt},He=function(){return Q},Xe=function(t){lt=t.toLowerCase().split(/[\s,]+/)},qe=function(){return lt},Ue=function(t){ut=t.toLowerCase().split(/[\s,]+/)},Ze=function(){return ut},Qe=function(){return Pt},Je=function(t){at=t,Nt.push(t)},Ke=function(){return Nt},$e=function(){let t=de(),l=10,n=0;for(;!t&&n<l;)t=de(),n++;return yt=F,yt},pe=function(t,l,n,e){return e.includes(t.format(l.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(l.trim()))},ve=function(t,l,n,e){if(!n.length||t.manualEndTime)return;let s;t.startTime instanceof Date?s=(0,N.default)(t.startTime):s=(0,N.default)(t.startTime,l,!0),s=s.add(1,"d");let d;t.endTime instanceof Date?d=(0,N.default)(t.endTime):d=(0,N.default)(t.endTime,l,!0);let[h,p]=ti(s,d,l,n,e);t.endTime=h.toDate(),t.renderEndTime=p},ti=function(t,l,n,e,s){let d=!1,h=null;for(;t<=l;)d||(h=l.toDate()),d=pe(t,n,e,s),d&&(l=l.add(1,"d")),t=t.add(1,"d");return[l,h]},Ft=function(t,l,n){n=n.trim();let s=/^after\s+([\d\w- ]+)/.exec(n.trim());if(s!==null){let h=null;if(s[1].split(" ").forEach(function(p){let D=ot(p);D!==void 0&&(h?D.endTime>h.endTime&&(h=D):h=D)}),h)return h.endTime;{let p=new Date;return p.setHours(0,0,0,0),p}}let d=(0,N.default)(n,l.trim(),!0);if(d.isValid())return d.toDate();{ht.debug("Invalid date:"+n),ht.debug("With date format:"+l.trim());let h=new Date(n);if(h===void 0||isNaN(h.getTime())||h.getFullYear()<-1e4||h.getFullYear()>1e4)throw new Error("Invalid date:"+n);return h}},Te=function(t){let l=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return l!==null?[Number.parseFloat(l[1]),l[2]]:[NaN,"ms"]},be=function(t,l,n,e=!1){n=n.trim();let s=(0,N.default)(n,l.trim(),!0);if(s.isValid())return e&&(s=s.add(1,"d")),s.toDate();let d=(0,N.default)(t),[h,p]=Te(n);if(!Number.isNaN(h)){let D=d.add(h,p);D.isValid()&&(d=D)}return d.toDate()},mt=0,rt=function(t){return t===void 0?(mt=mt+1,"task"+mt):t},ei=function(t,l){let n;l.substr(0,1)===":"?n=l.substr(1,l.length):n=l;let e=n.split(","),s={};De(e,s,ge);for(let h=0;h<e.length;h++)e[h]=e[h].trim();let d="";switch(e.length){case 1:s.id=rt(),s.startTime=t.endTime,d=e[0];break;case 2:s.id=rt(),s.startTime=Ft(void 0,Q,e[0]),d=e[1];break;case 3:s.id=rt(e[0]),s.startTime=Ft(void 0,Q,e[1]),d=e[2];break}return d&&(s.endTime=be(s.startTime,Q,d,ft),s.manualEndTime=(0,N.default)(d,"YYYY-MM-DD",!0).isValid(),ve(s,Q,ut,lt)),s},ii=function(t,l){let n;l.substr(0,1)===":"?n=l.substr(1,l.length):n=l;let e=n.split(","),s={};De(e,s,ge);for(let d=0;d<e.length;d++)e[d]=e[d].trim();switch(e.length){case 1:s.id=rt(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:e[0]};break;case 2:s.id=rt(),s.startTime={type:"getStartDate",startData:e[0]},s.endTime={data:e[1]};break;case 3:s.id=rt(e[0]),s.startTime={type:"getStartDate",startData:e[1]},s.endTime={data:e[2]};break}return s},zt,kt,F=[],xe={},ni=function(t,l){let n={section:at,type:at,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:l},task:t,classes:[]},e=ii(kt,l);n.raw.startTime=e.startTime,n.raw.endTime=e.endTime,n.id=e.id,n.prevTaskId=kt,n.active=e.active,n.done=e.done,n.crit=e.crit,n.milestone=e.milestone,n.order=Yt,Yt++;let s=F.push(n);kt=n.id,xe[n.id]=s-1},ot=function(t){let l=xe[t];return F[l]},si=function(t,l){let n={section:at,type:at,description:t,task:t,classes:[]},e=ei(zt,l);n.startTime=e.startTime,n.endTime=e.endTime,n.id=e.id,n.active=e.active,n.done=e.done,n.crit=e.crit,n.milestone=e.milestone,zt=n,yt.push(n)},de=function(){let t=function(n){let e=F[n],s="";switch(F[n].raw.startTime.type){case"prevTaskEnd":{let d=ot(e.prevTaskId);e.startTime=d.endTime;break}case"getStartDate":s=Ft(void 0,Q,F[n].raw.startTime.startData),s&&(F[n].startTime=s);break}return F[n].startTime&&(F[n].endTime=be(F[n].startTime,Q,F[n].raw.endTime.data,ft),F[n].endTime&&(F[n].processed=!0,F[n].manualEndTime=(0,N.default)(F[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),ve(F[n],Q,ut,lt))),F[n].processed},l=!0;for(let[n,e]of F.entries())t(n),l=l&&e.processed;return l},ri=function(t,l){let n=l;nt().securityLevel!=="loose"&&(n=(0,he.sanitizeUrl)(l)),t.split(",").forEach(function(e){ot(e)!==void 0&&(we(e,()=>{window.open(n,"_self")}),Pt[e]=n)}),_e(t,"clickable")},_e=function(t,l){t.split(",").forEach(function(n){let e=ot(n);e!==void 0&&e.classes.push(l)})},ai=function(t,l,n){if(nt().securityLevel!=="loose"||l===void 0)return;let e=[];if(typeof n=="string"){e=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let d=0;d<e.length;d++){let h=e[d].trim();h.charAt(0)==='"'&&h.charAt(h.length-1)==='"'&&(h=h.substr(1,h.length-2)),e[d]=h}}e.length===0&&e.push(t),ot(t)!==void 0&&we(t,()=>{oe.runFunc(l,...e)})},we=function(t,l){Rt.push(function(){let n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){l()})},function(){let n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){l()})})},oi=function(t,l,n){t.split(",").forEach(function(e){ai(e,l,n)}),_e(t,"clickable")},ci=function(t){Rt.forEach(function(l){l(t)})},li={parseDirective:Ae,getConfig:()=>nt().gantt,clear:Le,setDateFormat:We,getDateFormat:He,enableInclusiveEndDates:Pe,endDatesAreInclusive:Ne,enableTopAxis:Be,topAxisEnabled:Re,setAxisFormat:Ie,getAxisFormat:Ye,setTickInterval:Fe,getTickInterval:ze,setTodayMarker:Oe,getTodayMarker:Ve,setAccTitle:ee,getAccTitle:ie,setDiagramTitle:re,getDiagramTitle:ae,setDisplayMode:je,getDisplayMode:Ge,setAccDescription:ne,getAccDescription:se,addSection:Je,getSections:Ke,getTasks:$e,addTask:ni,findTaskById:ot,addTaskOrg:si,setIncludes:Xe,getIncludes:qe,setExcludes:Ue,getExcludes:Ze,setClickEvent:oi,setLink:ri,getLinks:Qe,bindFunctions:ci,parseDuration:Te,isInvalidDate:pe};function De(t,l,n){let e=!0;for(;e;)e=!1,n.forEach(function(s){let d="^\\s*"+s+"\\s*$",h=new RegExp(d);t[0].match(h)&&(l[s]=!0,t.shift(1),e=!0)})}var ui=function(){ht.debug("Something is calling, setConf, remove the call")},fi=(t,l)=>{let n=[...t].map(()=>-1/0),e=[...t].sort((d,h)=>d.startTime-h.startTime||d.order-h.order),s=0;for(let d of e)for(let h=0;h<n.length;h++)if(d.startTime>=n[h]){n[h]=d.endTime,d.order=h+l,h>s&&(s=h);break}return s},K,di=function(t,l,n,e){let s=nt().gantt,d=nt().securityLevel,h;d==="sandbox"&&(h=ct("#i"+l));let p=d==="sandbox"?ct(h.nodes()[0].contentDocument.body):ct("body"),D=d==="sandbox"?h.nodes()[0].contentDocument:document,M=D.getElementById(l);K=M.parentElement.offsetWidth,K===void 0&&(K=1200),s.useWidth!==void 0&&(K=s.useWidth);let A=e.db.getTasks(),z=[];for(let m of A)z.push(m.type);z=R(z);let H={},g=2*s.topPadding;if(e.db.getDisplayMode()==="compact"||s.displayMode==="compact"){let m={};for(let c of A)m[c.section]===void 0?m[c.section]=[c]:m[c.section].push(c);let a=0;for(let c of Object.keys(m)){let u=fi(m[c],a)+1;a+=u,g+=u*(s.barHeight+s.barGap),H[c]=u}}else{g+=A.length*(s.barHeight+s.barGap);for(let m of z)H[m]=A.filter(a=>a.type===m).length}M.setAttribute("viewBox","0 0 "+K+" "+g);let b=p.select(`[id="${l}"]`),y=Jt().domain([Xt(A,function(m){return m.startTime}),Ht(A,function(m){return m.endTime})]).rangeRound([0,K-s.leftPadding-s.rightPadding]);function S(m,a){let c=m.startTime,u=a.startTime,r=0;return c>u?r=1:c<u&&(r=-1),r}A.sort(S),W(A,K,g),$t(b,g,K,s.useMaxWidth),b.append("text").text(e.db.getDiagramTitle()).attr("x",K/2).attr("y",s.titleTopMargin).attr("class","titleText");function W(m,a,c){let u=s.barHeight,r=u+s.barGap,k=s.topPadding,i=s.leftPadding,_=Qt().domain([0,z.length]).range(["#00B9FA","#F95002"]).interpolate(Zt);X(r,k,i,a,c,m,e.db.getExcludes(),e.db.getIncludes()),j(i,k,a,c),P(m,r,k,i,u,_,a),V(r,k),B(i,k,a,c)}function P(m,a,c,u,r,k,i){let o=[...new Set(m.map(f=>f.order))].map(f=>m.find(v=>v.order===f));b.append("g").selectAll("rect").data(o).enter().append("rect").attr("x",0).attr("y",function(f,v){return v=f.order,v*a+c-2}).attr("width",function(){return i-s.rightPadding/2}).attr("height",a).attr("class",function(f){for(let[v,T]of z.entries())if(f.type===T)return"section section"+v%s.numberSectionStyles;return"section section0"});let C=b.append("g").selectAll("rect").data(m).enter(),L=e.db.getLinks();if(C.append("rect").attr("id",function(f){return f.id}).attr("rx",3).attr("ry",3).attr("x",function(f){return f.milestone?y(f.startTime)+u+.5*(y(f.endTime)-y(f.startTime))-.5*r:y(f.startTime)+u}).attr("y",function(f,v){return v=f.order,v*a+c}).attr("width",function(f){return f.milestone?r:y(f.renderEndTime||f.endTime)-y(f.startTime)}).attr("height",r).attr("transform-origin",function(f,v){return v=f.order,(y(f.startTime)+u+.5*(y(f.endTime)-y(f.startTime))).toString()+"px "+(v*a+c+.5*r).toString()+"px"}).attr("class",function(f){let v="task",T="";f.classes.length>0&&(T=f.classes.join(" "));let x=0;for(let[I,E]of z.entries())f.type===E&&(x=I%s.numberSectionStyles);let w="";return f.active?f.crit?w+=" activeCrit":w=" active":f.done?f.crit?w=" doneCrit":w=" done":f.crit&&(w+=" crit"),w.length===0&&(w=" task"),f.milestone&&(w=" milestone "+w),w+=x,w+=" "+T,v+w}),C.append("text").attr("id",function(f){return f.id+"-text"}).text(function(f){return f.task}).attr("font-size",s.fontSize).attr("x",function(f){let v=y(f.startTime),T=y(f.renderEndTime||f.endTime);f.milestone&&(v+=.5*(y(f.endTime)-y(f.startTime))-.5*r),f.milestone&&(T=v+r);let x=this.getBBox().width;return x>T-v?T+x+1.5*s.leftPadding>i?v+u-5:T+u+5:(T-v)/2+v+u}).attr("y",function(f,v){return v=f.order,v*a+s.barHeight/2+(s.fontSize/2-2)+c}).attr("text-height",r).attr("class",function(f){let v=y(f.startTime),T=y(f.endTime);f.milestone&&(T=v+r);let x=this.getBBox().width,w="";f.classes.length>0&&(w=f.classes.join(" "));let I=0;for(let[et,Y]of z.entries())f.type===Y&&(I=et%s.numberSectionStyles);let E="";return f.active&&(f.crit?E="activeCritText"+I:E="activeText"+I),f.done?f.crit?E=E+" doneCritText"+I:E=E+" doneText"+I:f.crit&&(E=E+" critText"+I),f.milestone&&(E+=" milestoneText"),x>T-v?T+x+1.5*s.leftPadding>i?w+" taskTextOutsideLeft taskTextOutside"+I+" "+E:w+" taskTextOutsideRight taskTextOutside"+I+" "+E+" width-"+x:w+" taskText taskText"+I+" "+E+" width-"+x}),nt().securityLevel==="sandbox"){let f;f=ct("#i"+l);let v=f.nodes()[0].contentDocument;C.filter(function(T){return L[T.id]!==void 0}).each(function(T){var x=v.querySelector("#"+T.id),w=v.querySelector("#"+T.id+"-text");let I=x.parentNode;var E=v.createElement("a");E.setAttribute("xlink:href",L[T.id]),E.setAttribute("target","_top"),I.appendChild(E),E.appendChild(x),E.appendChild(w)})}}function X(m,a,c,u,r,k,i,_){let o=k.reduce((x,{startTime:w})=>x?Math.min(x,w):w,0),C=k.reduce((x,{endTime:w})=>x?Math.max(x,w):w,0),L=e.db.getDateFormat();if(!o||!C)return;let q=[],f=null,v=(0,N.default)(o);for(;v.valueOf()<=C;)e.db.isInvalidDate(v,L,i,_)?f?f.end=v:f={start:v,end:v}:f&&(q.push(f),f=null),v=v.add(1,"d");b.append("g").selectAll("rect").data(q).enter().append("rect").attr("id",function(x){return"exclude-"+x.start.format("YYYY-MM-DD")}).attr("x",function(x){return y(x.start)+c}).attr("y",s.gridLineStartPadding).attr("width",function(x){let w=x.end.add(1,"day");return y(w)-y(x.start)}).attr("height",r-a-s.gridLineStartPadding).attr("transform-origin",function(x,w){return(y(x.start)+c+.5*(y(x.end)-y(x.start))).toString()+"px "+(w*m+.5*r).toString()+"px"}).attr("class","exclude-range")}function j(m,a,c,u){let r=Ut(y).tickSize(-u+a+s.gridLineStartPadding).tickFormat(wt(e.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d")),i=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(e.db.getTickInterval()||s.tickInterval);if(i!==null){let _=i[1];switch(i[2]){case"minute":r.ticks(vt.every(_));break;case"hour":r.ticks(Tt.every(_));break;case"day":r.ticks(bt.every(_));break;case"week":r.ticks(xt.every(_));break;case"month":r.ticks(_t.every(_));break}}if(b.append("g").attr("class","grid").attr("transform","translate("+m+", "+(u-50)+")").call(r).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),e.db.topAxisEnabled()||s.topAxis){let _=qt(y).tickSize(-u+a+s.gridLineStartPadding).tickFormat(wt(e.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));if(i!==null){let o=i[1];switch(i[2]){case"minute":_.ticks(vt.every(o));break;case"hour":_.ticks(Tt.every(o));break;case"day":_.ticks(bt.every(o));break;case"week":_.ticks(xt.every(o));break;case"month":_.ticks(_t.every(o));break}}b.append("g").attr("class","grid").attr("transform","translate("+m+", "+a+")").call(_).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function V(m,a){let c=0,u=Object.keys(H).map(r=>[r,H[r]]);b.append("g").selectAll("text").data(u).enter().append(function(r){let k=r[0].split(Kt.lineBreakRegex),i=-(k.length-1)/2,_=D.createElementNS("http://www.w3.org/2000/svg","text");_.setAttribute("dy",i+"em");for(let[o,C]of k.entries()){let L=D.createElementNS("http://www.w3.org/2000/svg","tspan");L.setAttribute("alignment-baseline","central"),L.setAttribute("x","10"),o>0&&L.setAttribute("dy","1em"),L.textContent=C,_.appendChild(L)}return _}).attr("x",10).attr("y",function(r,k){if(k>0)for(let i=0;i<k;i++)return c+=u[k-1][1],r[1]*m/2+c*m+a;else return r[1]*m/2+a}).attr("font-size",s.sectionFontSize).attr("class",function(r){for(let[k,i]of z.entries())if(r[0]===i)return"sectionTitle sectionTitle"+k%s.numberSectionStyles;return"sectionTitle"})}function B(m,a,c,u){let r=e.db.getTodayMarker();if(r==="off")return;let k=b.append("g").attr("class","today"),i=new Date,_=k.append("line");_.attr("x1",y(i)+m).attr("x2",y(i)+m).attr("y1",s.titleTopMargin).attr("y2",u-s.titleTopMargin).attr("class","today"),r!==""&&_.attr("style",r.replace(/,/g,";"))}function R(m){let a={},c=[];for(let u=0,r=m.length;u<r;++u)Object.prototype.hasOwnProperty.call(a,m[u])||(a[m[u]]=!0,c.push(m[u]));return c}},hi={setConf:ui,draw:di},mi=t=>`
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`,ki=mi,_i={parser:Me,db:li,renderer:hi,styles:ki};export{_i as diagram};

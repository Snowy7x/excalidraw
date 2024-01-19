import{Na as Rt,b as Mt,c as Xt,da as it,ea as Lt,h as ht,ia as Ct,ja as L,m as mt,na as dt,oa as Dt,qa as zt,ra as Et,sa as It,ta as Vt,ua as wt,va as Bt,wa as Tt,z as Ot}from"./chunk-B7LZIDS3.js";import{a as Pt}from"./chunk-M2JW2GFW.js";import{f as _t}from"./chunk-SXMPUQ6M.js";Pt();var pe=_t(Mt(),1),ye=_t(Xt(),1),qe=_t(Ot(),1);var bt=function(){var e=function(Z,n,r,d){for(r=r||{},d=Z.length;d--;r[Z[d]]=n);return r},a=[1,3],c=[1,5],f=[1,6],g=[1,7],x=[1,8],h=[1,10],p=[1,5,14,16,18,20,21,26,28,29,30,31,32,38,39,40,41,47,48,50,51,52,53,54,55,56,57,58,59,60],s=[1,5,7,14,16,18,20,21,26,28,29,30,31,32,38,39,40,41,47,48,50,51,52,53,54,55,56,57,58,59,60],l=[38,39,40],y=[2,8],V=[1,19],W=[1,23],C=[1,24],D=[1,25],N=[1,26],M=[1,27],X=[1,29],z=[1,30],at=[1,31],nt=[1,32],rt=[1,33],st=[1,34],H=[1,37],U=[1,38],m=[1,39],_=[1,40],t=[1,41],T=[1,42],b=[1,43],A=[1,44],S=[1,45],v=[1,46],k=[1,47],F=[1,48],P=[1,49],St=[1,52],O=[1,67],Y=[1,68],E=[5,23,27,38,39,40,50,51,52,53,54,55,56,57,58,59,60,61],ut=[5,7,38,39,40,41],xt={trace:function(){},yy:{},symbols_:{error:2,start:3,eol:4,SPACE:5,directive:6,QUADRANT:7,document:8,line:9,statement:10,axisDetails:11,quadrantDetails:12,points:13,title:14,title_value:15,acc_title:16,acc_title_value:17,acc_descr:18,acc_descr_value:19,acc_descr_multiline_value:20,section:21,text:22,point_start:23,point_x:24,point_y:25,"X-AXIS":26,"AXIS-TEXT-DELIMITER":27,"Y-AXIS":28,QUADRANT_1:29,QUADRANT_2:30,QUADRANT_3:31,QUADRANT_4:32,openDirective:33,typeDirective:34,closeDirective:35,":":36,argDirective:37,NEWLINE:38,SEMI:39,EOF:40,open_directive:41,type_directive:42,arg_directive:43,close_directive:44,alphaNumToken:45,textNoTagsToken:46,STR:47,MD_STR:48,alphaNum:49,PUNCTUATION:50,AMP:51,NUM:52,ALPHA:53,COMMA:54,PLUS:55,EQUALS:56,MULT:57,DOT:58,BRKT:59,UNDERSCORE:60,MINUS:61,$accept:0,$end:1},terminals_:{2:"error",5:"SPACE",7:"QUADRANT",14:"title",15:"title_value",16:"acc_title",17:"acc_title_value",18:"acc_descr",19:"acc_descr_value",20:"acc_descr_multiline_value",21:"section",23:"point_start",24:"point_x",25:"point_y",26:"X-AXIS",27:"AXIS-TEXT-DELIMITER",28:"Y-AXIS",29:"QUADRANT_1",30:"QUADRANT_2",31:"QUADRANT_3",32:"QUADRANT_4",36:":",38:"NEWLINE",39:"SEMI",40:"EOF",41:"open_directive",42:"type_directive",43:"arg_directive",44:"close_directive",47:"STR",48:"MD_STR",50:"PUNCTUATION",51:"AMP",52:"NUM",53:"ALPHA",54:"COMMA",55:"PLUS",56:"EQUALS",57:"MULT",58:"DOT",59:"BRKT",60:"UNDERSCORE",61:"MINUS"},productions_:[0,[3,2],[3,2],[3,2],[3,2],[8,0],[8,2],[9,2],[10,0],[10,2],[10,1],[10,1],[10,1],[10,2],[10,2],[10,2],[10,1],[10,1],[10,1],[13,4],[11,4],[11,3],[11,2],[11,4],[11,3],[11,2],[12,2],[12,2],[12,2],[12,2],[6,3],[6,5],[4,1],[4,1],[4,1],[33,1],[34,1],[37,1],[35,1],[22,1],[22,2],[22,1],[22,1],[49,1],[49,2],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[46,1],[46,1],[46,1]],performAction:function(n,r,d,o,q,i,et){var u=i.length-1;switch(q){case 13:this.$=i[u].trim(),o.setDiagramTitle(this.$);break;case 14:this.$=i[u].trim(),o.setAccTitle(this.$);break;case 15:case 16:this.$=i[u].trim(),o.setAccDescription(this.$);break;case 17:o.addSection(i[u].substr(8)),this.$=i[u].substr(8);break;case 19:o.addPoint(i[u-3],i[u-1],i[u]);break;case 20:o.setXAxisLeftText(i[u-2]),o.setXAxisRightText(i[u]);break;case 21:i[u-1].text+=" \u27F6 ",o.setXAxisLeftText(i[u-1]);break;case 22:o.setXAxisLeftText(i[u]);break;case 23:o.setYAxisBottomText(i[u-2]),o.setYAxisTopText(i[u]);break;case 24:i[u-1].text+=" \u27F6 ",o.setYAxisBottomText(i[u-1]);break;case 25:o.setYAxisBottomText(i[u]);break;case 26:o.setQuadrant1Text(i[u]);break;case 27:o.setQuadrant2Text(i[u]);break;case 28:o.setQuadrant3Text(i[u]);break;case 29:o.setQuadrant4Text(i[u]);break;case 35:o.parseDirective("%%{","open_directive");break;case 36:o.parseDirective(i[u],"type_directive");break;case 37:i[u]=i[u].trim().replace(/'/g,'"'),o.parseDirective(i[u],"arg_directive");break;case 38:o.parseDirective("}%%","close_directive","quadrantChart");break;case 39:this.$={text:i[u],type:"text"};break;case 40:this.$={text:i[u-1].text+""+i[u],type:i[u-1].type};break;case 41:this.$={text:i[u],type:"text"};break;case 42:this.$={text:i[u],type:"markdown"};break;case 43:this.$=i[u];break;case 44:this.$=i[u-1]+""+i[u];break}},table:[{3:1,4:2,5:a,6:4,7:c,33:9,38:f,39:g,40:x,41:h},{1:[3]},{3:11,4:2,5:a,6:4,7:c,33:9,38:f,39:g,40:x,41:h},{3:12,4:2,5:a,6:4,7:c,33:9,38:f,39:g,40:x,41:h},{3:13,4:2,5:a,6:4,7:c,33:9,38:f,39:g,40:x,41:h},e(p,[2,5],{8:14}),e(s,[2,32]),e(s,[2,33]),e(s,[2,34]),{34:15,42:[1,16]},{42:[2,35]},{1:[2,1]},{1:[2,2]},{1:[2,3]},e(l,y,{33:9,9:17,10:18,11:20,12:21,13:22,6:28,22:35,45:36,1:[2,4],5:V,14:W,16:C,18:D,20:N,21:M,26:X,28:z,29:at,30:nt,31:rt,32:st,41:h,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P}),{35:50,36:[1,51],44:St},e([36,44],[2,36]),e(p,[2,6]),{4:53,38:f,39:g,40:x},e(l,y,{33:9,11:20,12:21,13:22,6:28,22:35,45:36,10:54,5:V,14:W,16:C,18:D,20:N,21:M,26:X,28:z,29:at,30:nt,31:rt,32:st,41:h,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P}),e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{15:[1,55]},{17:[1,56]},{19:[1,57]},e(l,[2,16]),e(l,[2,17]),e(l,[2,18]),{22:58,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{22:59,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{22:60,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{22:61,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{22:62,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{22:63,45:36,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P},{5:O,23:[1,64],45:66,46:65,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y},e(E,[2,39]),e(E,[2,41]),e(E,[2,42]),e(E,[2,45]),e(E,[2,46]),e(E,[2,47]),e(E,[2,48]),e(E,[2,49]),e(E,[2,50]),e(E,[2,51]),e(E,[2,52]),e(E,[2,53]),e(E,[2,54]),e(E,[2,55]),e(ut,[2,30]),{37:69,43:[1,70]},e(ut,[2,38]),e(p,[2,7]),e(l,[2,9]),e(l,[2,13]),e(l,[2,14]),e(l,[2,15]),e(l,[2,22],{46:65,45:66,5:O,27:[1,71],50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,25],{46:65,45:66,5:O,27:[1,72],50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,26],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,27],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,28],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,29],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),{24:[1,73]},e(E,[2,40]),e(E,[2,56]),e(E,[2,57]),e(E,[2,58]),{35:74,44:St},{44:[2,37]},e(l,[2,21],{45:36,22:75,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P}),e(l,[2,24],{45:36,22:76,47:H,48:U,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P}),{25:[1,77]},e(ut,[2,31]),e(l,[2,20],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,23],{46:65,45:66,5:O,50:m,51:_,52:t,53:T,54:b,55:A,56:S,57:v,58:k,59:F,60:P,61:Y}),e(l,[2,19])],defaultActions:{10:[2,35],11:[2,1],12:[2,2],13:[2,3],70:[2,37]},parseError:function(n,r){if(r.recoverable)this.trace(n);else{var d=new Error(n);throw d.hash=r,d}},parse:function(n){var r=this,d=[0],o=[],q=[null],i=[],et=this.table,u="",lt=0,vt=0,Nt=2,kt=1,Ut=i.slice.call(arguments,1),I=Object.create(this.lexer),J={yy:{}};for(var gt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,gt)&&(J.yy[gt]=this.yy[gt]);I.setInput(n,J.yy),J.yy.lexer=I,J.yy.parser=this,typeof I.yylloc>"u"&&(I.yylloc={});var pt=I.yylloc;i.push(pt);var Ht=I.options&&I.options.ranges;typeof J.yy.parseError=="function"?this.parseError=J.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Qt(){var G;return G=o.pop()||I.lex()||kt,typeof G!="number"&&(G instanceof Array&&(o=G,G=o.pop()),G=r.symbols_[G]||G),G}for(var R,$,Q,yt,tt={},ot,j,Ft,ct;;){if($=d[d.length-1],this.defaultActions[$]?Q=this.defaultActions[$]:((R===null||typeof R>"u")&&(R=Qt()),Q=et[$]&&et[$][R]),typeof Q>"u"||!Q.length||!Q[0]){var qt="";ct=[];for(ot in et[$])this.terminals_[ot]&&ot>Nt&&ct.push("'"+this.terminals_[ot]+"'");I.showPosition?qt="Parse error on line "+(lt+1)+`:
`+I.showPosition()+`
Expecting `+ct.join(", ")+", got '"+(this.terminals_[R]||R)+"'":qt="Parse error on line "+(lt+1)+": Unexpected "+(R==kt?"end of input":"'"+(this.terminals_[R]||R)+"'"),this.parseError(qt,{text:I.match,token:this.terminals_[R]||R,line:I.yylineno,loc:pt,expected:ct})}if(Q[0]instanceof Array&&Q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+$+", token: "+R);switch(Q[0]){case 1:d.push(R),q.push(I.yytext),i.push(I.yylloc),d.push(Q[1]),R=null,vt=I.yyleng,u=I.yytext,lt=I.yylineno,pt=I.yylloc;break;case 2:if(j=this.productions_[Q[1]][1],tt.$=q[q.length-j],tt._$={first_line:i[i.length-(j||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(j||1)].first_column,last_column:i[i.length-1].last_column},Ht&&(tt._$.range=[i[i.length-(j||1)].range[0],i[i.length-1].range[1]]),yt=this.performAction.apply(tt,[u,vt,lt,J.yy,Q[1],q,i].concat(Ut)),typeof yt<"u")return yt;j&&(d=d.slice(0,-1*j*2),q=q.slice(0,-1*j),i=i.slice(0,-1*j)),d.push(this.productions_[Q[1]][0]),q.push(tt.$),i.push(tt._$),Ft=et[d[d.length-2]][d[d.length-1]],d.push(Ft);break;case 3:return!0}}return!0}},Wt=function(){var Z={EOF:1,parseError:function(r,d){if(this.yy.parser)this.yy.parser.parseError(r,d);else throw new Error(r)},setInput:function(n,r){return this.yy=r||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var r=n.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var r=n.length,d=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var o=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var q=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===o.length?this.yylloc.first_column:0)+o[o.length-d.length].length-d[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[q[0],q[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),r=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+r+"^"},test_match:function(n,r){var d,o,q;if(this.options.backtrack_lexer&&(q={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(q.yylloc.range=this.yylloc.range.slice(0))),o=n[0].match(/(?:\r\n?|\n).*/g),o&&(this.yylineno+=o.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-o[o.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],d=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var i in q)this[i]=q[i];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,r,d,o;this._more||(this.yytext="",this.match="");for(var q=this._currentRules(),i=0;i<q.length;i++)if(d=this._input.match(this.rules[q[i]]),d&&(!r||d[0].length>r[0].length)){if(r=d,o=i,this.options.backtrack_lexer){if(n=this.test_match(d,q[i]),n!==!1)return n;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(n=this.test_match(r,q[o]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var r=this.next();return r||this.lex()},begin:function(r){this.conditionStack.push(r)},popState:function(){var r=this.conditionStack.length-1;return r>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(r){return r=this.conditionStack.length-1-Math.abs(r||0),r>=0?this.conditionStack[r]:"INITIAL"},pushState:function(r){this.begin(r)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(r,d,o,q){switch(o){case 0:return this.begin("open_directive"),41;case 1:return this.begin("type_directive"),42;case 2:return this.popState(),this.begin("arg_directive"),36;case 3:return this.popState(),this.popState(),44;case 4:return 43;case 5:break;case 6:break;case 7:return 38;case 8:break;case 9:return this.begin("title"),14;case 10:return this.popState(),"title_value";case 11:return this.begin("acc_title"),16;case 12:return this.popState(),"acc_title_value";case 13:return this.begin("acc_descr"),18;case 14:return this.popState(),"acc_descr_value";case 15:this.begin("acc_descr_multiline");break;case 16:this.popState();break;case 17:return"acc_descr_multiline_value";case 18:return 26;case 19:return 28;case 20:return 27;case 21:return 29;case 22:return 30;case 23:return 31;case 24:return 32;case 25:this.begin("md_string");break;case 26:return"MD_STR";case 27:this.popState();break;case 28:this.begin("string");break;case 29:this.popState();break;case 30:return"STR";case 31:return this.begin("point_start"),23;case 32:return this.begin("point_x"),24;case 33:this.popState();break;case 34:this.popState(),this.begin("point_y");break;case 35:return this.popState(),25;case 36:return 7;case 37:return 53;case 38:return"COLON";case 39:return 55;case 40:return 54;case 41:return 56;case 42:return 56;case 43:return 57;case 44:return 59;case 45:return 60;case 46:return 58;case 47:return 51;case 48:return 61;case 49:return 52;case 50:return 5;case 51:return 39;case 52:return 50;case 53:return 40}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n\r]+)/i,/^(?:%%[^\n]*)/i,/^(?:title\b)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?: *x-axis *)/i,/^(?: *y-axis *)/i,/^(?: *--+> *)/i,/^(?: *quadrant-1 *)/i,/^(?: *quadrant-2 *)/i,/^(?: *quadrant-3 *)/i,/^(?: *quadrant-4 *)/i,/^(?:["][`])/i,/^(?:[^`"]+)/i,/^(?:[`]["])/i,/^(?:["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\s*:\s*\[\s*)/i,/^(?:(1)|(0(.\d+)?))/i,/^(?:\s*\] *)/i,/^(?:\s*,\s*)/i,/^(?:(1)|(0(.\d+)?))/i,/^(?: *quadrantChart *)/i,/^(?:[A-Za-z]+)/i,/^(?::)/i,/^(?:\+)/i,/^(?:,)/i,/^(?:=)/i,/^(?:=)/i,/^(?:\*)/i,/^(?:#)/i,/^(?:[\_])/i,/^(?:\.)/i,/^(?:&)/i,/^(?:-)/i,/^(?:[0-9]+)/i,/^(?:\s)/i,/^(?:;)/i,/^(?:[!"#$%&'*+,-.`?\\_/])/i,/^(?:$)/i],conditions:{point_y:{rules:[35],inclusive:!1},point_x:{rules:[34],inclusive:!1},point_start:{rules:[32,33],inclusive:!1},acc_descr_multiline:{rules:[16,17],inclusive:!1},acc_descr:{rules:[14],inclusive:!1},acc_title:{rules:[12],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},title:{rules:[10],inclusive:!1},md_string:{rules:[26,27],inclusive:!1},string:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,11,13,15,18,19,20,21,22,23,24,25,28,31,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],inclusive:!0}}};return Z}();xt.lexer=Wt;function ft(){this.yy={}}return ft.prototype=xt,xt.Parser=ft,new ft}();bt.parser=bt;var Yt=bt,B=Ct(),At=class{constructor(){this.config=this.getDefaultConfig(),this.themeConfig=this.getDefaultThemeConfig(),this.data=this.getDefaultData()}getDefaultData(){return{titleText:"",quadrant1Text:"",quadrant2Text:"",quadrant3Text:"",quadrant4Text:"",xAxisLeftText:"",xAxisRightText:"",yAxisBottomText:"",yAxisTopText:"",points:[]}}getDefaultConfig(){var a,c,f,g,x,h,p,s,l,y,V,W,C,D,N,M,X,z;return{showXAxis:!0,showYAxis:!0,showTitle:!0,chartHeight:((a=L.quadrantChart)==null?void 0:a.chartWidth)||500,chartWidth:((c=L.quadrantChart)==null?void 0:c.chartHeight)||500,titlePadding:((f=L.quadrantChart)==null?void 0:f.titlePadding)||10,titleFontSize:((g=L.quadrantChart)==null?void 0:g.titleFontSize)||20,quadrantPadding:((x=L.quadrantChart)==null?void 0:x.quadrantPadding)||5,xAxisLabelPadding:((h=L.quadrantChart)==null?void 0:h.xAxisLabelPadding)||5,yAxisLabelPadding:((p=L.quadrantChart)==null?void 0:p.yAxisLabelPadding)||5,xAxisLabelFontSize:((s=L.quadrantChart)==null?void 0:s.xAxisLabelFontSize)||16,yAxisLabelFontSize:((l=L.quadrantChart)==null?void 0:l.yAxisLabelFontSize)||16,quadrantLabelFontSize:((y=L.quadrantChart)==null?void 0:y.quadrantLabelFontSize)||16,quadrantTextTopPadding:((V=L.quadrantChart)==null?void 0:V.quadrantTextTopPadding)||5,pointTextPadding:((W=L.quadrantChart)==null?void 0:W.pointTextPadding)||5,pointLabelFontSize:((C=L.quadrantChart)==null?void 0:C.pointLabelFontSize)||12,pointRadius:((D=L.quadrantChart)==null?void 0:D.pointRadius)||5,xAxisPosition:((N=L.quadrantChart)==null?void 0:N.xAxisPosition)||"top",yAxisPosition:((M=L.quadrantChart)==null?void 0:M.yAxisPosition)||"left",quadrantInternalBorderStrokeWidth:((X=L.quadrantChart)==null?void 0:X.quadrantInternalBorderStrokeWidth)||1,quadrantExternalBorderStrokeWidth:((z=L.quadrantChart)==null?void 0:z.quadrantExternalBorderStrokeWidth)||2}}getDefaultThemeConfig(){return{quadrant1Fill:B.quadrant1Fill,quadrant2Fill:B.quadrant2Fill,quadrant3Fill:B.quadrant3Fill,quadrant4Fill:B.quadrant4Fill,quadrant1TextFill:B.quadrant1TextFill,quadrant2TextFill:B.quadrant2TextFill,quadrant3TextFill:B.quadrant3TextFill,quadrant4TextFill:B.quadrant4TextFill,quadrantPointFill:B.quadrantPointFill,quadrantPointTextFill:B.quadrantPointTextFill,quadrantXAxisTextFill:B.quadrantXAxisTextFill,quadrantYAxisTextFill:B.quadrantYAxisTextFill,quadrantTitleFill:B.quadrantTitleFill,quadrantInternalBorderStrokeFill:B.quadrantInternalBorderStrokeFill,quadrantExternalBorderStrokeFill:B.quadrantExternalBorderStrokeFill}}clear(){this.config=this.getDefaultConfig(),this.themeConfig=this.getDefaultThemeConfig(),this.data=this.getDefaultData(),it.info("clear called")}setData(a){this.data={...this.data,...a}}addPoints(a){this.data.points=[...a,...this.data.points]}setConfig(a){it.trace("setConfig called with: ",a),this.config={...this.config,...a}}setThemeConfig(a){it.trace("setThemeConfig called with: ",a),this.themeConfig={...this.themeConfig,...a}}calculateSpace(a,c,f,g){let x=this.config.xAxisLabelPadding*2+this.config.xAxisLabelFontSize,h={top:a==="top"&&c?x:0,bottom:a==="bottom"&&c?x:0},p=this.config.yAxisLabelPadding*2+this.config.yAxisLabelFontSize,s={left:this.config.yAxisPosition==="left"&&f?p:0,right:this.config.yAxisPosition==="right"&&f?p:0},l=this.config.titleFontSize+this.config.titlePadding*2,y={top:g?l:0},V=this.config.quadrantPadding+s.left,W=this.config.quadrantPadding+h.top+y.top,C=this.config.chartWidth-this.config.quadrantPadding*2-s.left-s.right,D=this.config.chartHeight-this.config.quadrantPadding*2-h.top-h.bottom-y.top,N=C/2,M=D/2;return{xAxisSpace:h,yAxisSpace:s,titleSpace:y,quadrantSpace:{quadrantLeft:V,quadrantTop:W,quadrantWidth:C,quadrantHalfWidth:N,quadrantHeight:D,quadrantHalfHeight:M}}}getAxisLabels(a,c,f,g){let{quadrantSpace:x,titleSpace:h}=g,{quadrantHalfHeight:p,quadrantHeight:s,quadrantLeft:l,quadrantHalfWidth:y,quadrantTop:V,quadrantWidth:W}=x,C=this.data.points.length===0,D=[];return this.data.xAxisLeftText&&c&&D.push({text:this.data.xAxisLeftText,fill:this.themeConfig.quadrantXAxisTextFill,x:l+(C?y/2:0),y:a==="top"?this.config.xAxisLabelPadding+h.top:this.config.xAxisLabelPadding+V+s+this.config.quadrantPadding,fontSize:this.config.xAxisLabelFontSize,verticalPos:C?"center":"left",horizontalPos:"top",rotation:0}),this.data.xAxisRightText&&c&&D.push({text:this.data.xAxisRightText,fill:this.themeConfig.quadrantXAxisTextFill,x:l+y+(C?y/2:0),y:a==="top"?this.config.xAxisLabelPadding+h.top:this.config.xAxisLabelPadding+V+s+this.config.quadrantPadding,fontSize:this.config.xAxisLabelFontSize,verticalPos:C?"center":"left",horizontalPos:"top",rotation:0}),this.data.yAxisBottomText&&f&&D.push({text:this.data.yAxisBottomText,fill:this.themeConfig.quadrantYAxisTextFill,x:this.config.yAxisPosition==="left"?this.config.yAxisLabelPadding:this.config.yAxisLabelPadding+l+W+this.config.quadrantPadding,y:V+s-(C?p/2:0),fontSize:this.config.yAxisLabelFontSize,verticalPos:C?"center":"left",horizontalPos:"top",rotation:-90}),this.data.yAxisTopText&&f&&D.push({text:this.data.yAxisTopText,fill:this.themeConfig.quadrantYAxisTextFill,x:this.config.yAxisPosition==="left"?this.config.yAxisLabelPadding:this.config.yAxisLabelPadding+l+W+this.config.quadrantPadding,y:V+p-(C?p/2:0),fontSize:this.config.yAxisLabelFontSize,verticalPos:C?"center":"left",horizontalPos:"top",rotation:-90}),D}getQuadrants(a){let{quadrantSpace:c}=a,{quadrantHalfHeight:f,quadrantLeft:g,quadrantHalfWidth:x,quadrantTop:h}=c,p=[{text:{text:this.data.quadrant1Text,fill:this.themeConfig.quadrant1TextFill,x:0,y:0,fontSize:this.config.quadrantLabelFontSize,verticalPos:"center",horizontalPos:"middle",rotation:0},x:g+x,y:h,width:x,height:f,fill:this.themeConfig.quadrant1Fill},{text:{text:this.data.quadrant2Text,fill:this.themeConfig.quadrant2TextFill,x:0,y:0,fontSize:this.config.quadrantLabelFontSize,verticalPos:"center",horizontalPos:"middle",rotation:0},x:g,y:h,width:x,height:f,fill:this.themeConfig.quadrant2Fill},{text:{text:this.data.quadrant3Text,fill:this.themeConfig.quadrant3TextFill,x:0,y:0,fontSize:this.config.quadrantLabelFontSize,verticalPos:"center",horizontalPos:"middle",rotation:0},x:g,y:h+f,width:x,height:f,fill:this.themeConfig.quadrant3Fill},{text:{text:this.data.quadrant4Text,fill:this.themeConfig.quadrant4TextFill,x:0,y:0,fontSize:this.config.quadrantLabelFontSize,verticalPos:"center",horizontalPos:"middle",rotation:0},x:g+x,y:h+f,width:x,height:f,fill:this.themeConfig.quadrant4Fill}];for(let s of p)s.text.x=s.x+s.width/2,this.data.points.length===0?(s.text.y=s.y+s.height/2,s.text.horizontalPos="middle"):(s.text.y=s.y+this.config.quadrantTextTopPadding,s.text.horizontalPos="top");return p}getQuadrantPoints(a){let{quadrantSpace:c}=a,{quadrantHeight:f,quadrantLeft:g,quadrantTop:x,quadrantWidth:h}=c,p=mt().domain([0,1]).range([g,h+g]),s=mt().domain([0,1]).range([f+x,x]);return this.data.points.map(y=>({x:p(y.x),y:s(y.y),fill:this.themeConfig.quadrantPointFill,radius:this.config.pointRadius,text:{text:y.text,fill:this.themeConfig.quadrantPointTextFill,x:p(y.x),y:s(y.y)+this.config.pointTextPadding,verticalPos:"center",horizontalPos:"top",fontSize:this.config.pointLabelFontSize,rotation:0}}))}getBorders(a){let c=this.config.quadrantExternalBorderStrokeWidth/2,{quadrantSpace:f}=a,{quadrantHalfHeight:g,quadrantHeight:x,quadrantLeft:h,quadrantHalfWidth:p,quadrantTop:s,quadrantWidth:l}=f;return[{strokeFill:this.themeConfig.quadrantExternalBorderStrokeFill,strokeWidth:this.config.quadrantExternalBorderStrokeWidth,x1:h-c,y1:s,x2:h+l+c,y2:s},{strokeFill:this.themeConfig.quadrantExternalBorderStrokeFill,strokeWidth:this.config.quadrantExternalBorderStrokeWidth,x1:h+l,y1:s+c,x2:h+l,y2:s+x-c},{strokeFill:this.themeConfig.quadrantExternalBorderStrokeFill,strokeWidth:this.config.quadrantExternalBorderStrokeWidth,x1:h-c,y1:s+x,x2:h+l+c,y2:s+x},{strokeFill:this.themeConfig.quadrantExternalBorderStrokeFill,strokeWidth:this.config.quadrantExternalBorderStrokeWidth,x1:h,y1:s+c,x2:h,y2:s+x-c},{strokeFill:this.themeConfig.quadrantInternalBorderStrokeFill,strokeWidth:this.config.quadrantInternalBorderStrokeWidth,x1:h+p,y1:s+c,x2:h+p,y2:s+x-c},{strokeFill:this.themeConfig.quadrantInternalBorderStrokeFill,strokeWidth:this.config.quadrantInternalBorderStrokeWidth,x1:h+c,y1:s+g,x2:h+l-c,y2:s+g}]}getTitle(a){if(a)return{text:this.data.titleText,fill:this.themeConfig.quadrantTitleFill,fontSize:this.config.titleFontSize,horizontalPos:"top",verticalPos:"center",rotation:0,y:this.config.titlePadding,x:this.config.chartWidth/2}}build(){let a=this.config.showXAxis&&!!(this.data.xAxisLeftText||this.data.xAxisRightText),c=this.config.showYAxis&&!!(this.data.yAxisTopText||this.data.yAxisBottomText),f=this.config.showTitle&&!!this.data.titleText,g=this.data.points.length>0?"bottom":this.config.xAxisPosition,x=this.calculateSpace(g,a,c,f);return{points:this.getQuadrantPoints(x),quadrants:this.getQuadrants(x),axisLabels:this.getAxisLabels(g,a,c,x),borderLines:this.getBorders(x),title:this.getTitle(f)}}},jt=dt();function K(e){return Lt(e.trim(),jt)}var w=new At;function Gt(e){w.setData({quadrant1Text:K(e.text)})}function Kt(e){w.setData({quadrant2Text:K(e.text)})}function Zt(e){w.setData({quadrant3Text:K(e.text)})}function Jt(e){w.setData({quadrant4Text:K(e.text)})}function $t(e){w.setData({xAxisLeftText:K(e.text)})}function te(e){w.setData({xAxisRightText:K(e.text)})}function ee(e){w.setData({yAxisTopText:K(e.text)})}function ie(e){w.setData({yAxisBottomText:K(e.text)})}function ae(e,a,c){w.addPoints([{x:a,y:c,text:K(e.text)}])}function ne(e){w.setConfig({chartWidth:e})}function re(e){w.setConfig({chartHeight:e})}function se(){let e=dt(),{themeVariables:a,quadrantChart:c}=e;return c&&w.setConfig(c),w.setThemeConfig({quadrant1Fill:a.quadrant1Fill,quadrant2Fill:a.quadrant2Fill,quadrant3Fill:a.quadrant3Fill,quadrant4Fill:a.quadrant4Fill,quadrant1TextFill:a.quadrant1TextFill,quadrant2TextFill:a.quadrant2TextFill,quadrant3TextFill:a.quadrant3TextFill,quadrant4TextFill:a.quadrant4TextFill,quadrantPointFill:a.quadrantPointFill,quadrantPointTextFill:a.quadrantPointTextFill,quadrantXAxisTextFill:a.quadrantXAxisTextFill,quadrantYAxisTextFill:a.quadrantYAxisTextFill,quadrantExternalBorderStrokeFill:a.quadrantExternalBorderStrokeFill,quadrantInternalBorderStrokeFill:a.quadrantInternalBorderStrokeFill,quadrantTitleFill:a.quadrantTitleFill}),w.setData({titleText:Tt()}),w.build()}var le=function(e,a,c){Rt.parseDirective(this,e,a,c)},oe=function(){w.clear(),zt()},ce={setWidth:ne,setHeight:re,setQuadrant1Text:Gt,setQuadrant2Text:Kt,setQuadrant3Text:Zt,setQuadrant4Text:Jt,setXAxisLeftText:$t,setXAxisRightText:te,setYAxisTopText:ee,setYAxisBottomText:ie,addPoint:ae,getQuadrantData:se,parseDirective:le,clear:oe,setAccTitle:Et,getAccTitle:It,setDiagramTitle:Bt,getDiagramTitle:Tt,getAccDescription:wt,setAccDescription:Vt},he=(e,a,c,f)=>{var g,x,h;function p(t){return t==="top"?"hanging":"middle"}function s(t){return t==="left"?"start":"middle"}function l(t){return`translate(${t.x}, ${t.y}) rotate(${t.rotation||0})`}let y=dt();it.debug(`Rendering quadrant chart
`+e);let V=y.securityLevel,W;V==="sandbox"&&(W=ht("#i"+a));let D=(V==="sandbox"?ht(W.nodes()[0].contentDocument.body):ht("body")).select(`[id="${a}"]`),N=D.append("g").attr("class","main"),M=((g=y.quadrantChart)==null?void 0:g.chartWidth)||500,X=((x=y.quadrantChart)==null?void 0:x.chartHeight)||500;Dt(D,X,M,((h=y.quadrantChart)==null?void 0:h.useMaxWidth)||!0),D.attr("viewBox","0 0 "+M+" "+X),f.db.setHeight(X),f.db.setWidth(M);let z=f.db.getQuadrantData(),at=N.append("g").attr("class","quadrants"),nt=N.append("g").attr("class","border"),rt=N.append("g").attr("class","data-points"),st=N.append("g").attr("class","labels"),H=N.append("g").attr("class","title");z.title&&H.append("text").attr("x",0).attr("y",0).attr("fill",z.title.fill).attr("font-size",z.title.fontSize).attr("dominant-baseline",p(z.title.horizontalPos)).attr("text-anchor",s(z.title.verticalPos)).attr("transform",l(z.title)).text(z.title.text),z.borderLines&&nt.selectAll("line").data(z.borderLines).enter().append("line").attr("x1",t=>t.x1).attr("y1",t=>t.y1).attr("x2",t=>t.x2).attr("y2",t=>t.y2).style("stroke",t=>t.strokeFill).style("stroke-width",t=>t.strokeWidth);let U=at.selectAll("g.quadrant").data(z.quadrants).enter().append("g").attr("class","quadrant");U.append("rect").attr("x",t=>t.x).attr("y",t=>t.y).attr("width",t=>t.width).attr("height",t=>t.height).attr("fill",t=>t.fill),U.append("text").attr("x",0).attr("y",0).attr("fill",t=>t.text.fill).attr("font-size",t=>t.text.fontSize).attr("dominant-baseline",t=>p(t.text.horizontalPos)).attr("text-anchor",t=>s(t.text.verticalPos)).attr("transform",t=>l(t.text)).text(t=>t.text.text),st.selectAll("g.label").data(z.axisLabels).enter().append("g").attr("class","label").append("text").attr("x",0).attr("y",0).text(t=>t.text).attr("fill",t=>t.fill).attr("font-size",t=>t.fontSize).attr("dominant-baseline",t=>p(t.horizontalPos)).attr("text-anchor",t=>s(t.verticalPos)).attr("transform",t=>l(t));let _=rt.selectAll("g.data-point").data(z.points).enter().append("g").attr("class","data-point");_.append("circle").attr("cx",t=>t.x).attr("cy",t=>t.y).attr("r",t=>t.radius).attr("fill",t=>t.fill),_.append("text").attr("x",0).attr("y",0).text(t=>t.text.text).attr("fill",t=>t.text.fill).attr("font-size",t=>t.text.fontSize).attr("dominant-baseline",t=>p(t.text.horizontalPos)).attr("text-anchor",t=>s(t.text.verticalPos)).attr("transform",t=>l(t.text))},de={draw:he},_e={parser:Yt,db:ce,renderer:de,styles:()=>""};export{_e as diagram};

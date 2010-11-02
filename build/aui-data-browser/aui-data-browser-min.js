AUI.add("aui-data-browser",function(J){var o=J.Lang,O=o.isArray,G=o.isString,e=o.isNull,K=o.isFunction,j=J.ClassNameManager.getClassName,X="databrowser",b="bindUI",V="icon",H="search",R="folder-open",E="image",U="renderUI",Q="search",h="text",d="tree",S=X+"-"+Q+"-ui",D=X+"-"+d+"-ui",i=function(p){for(var A in p){if(p[A].children||(p[A].leaf!=undefined&&!p[A].leaf)){i(p[A].children);}else{p[A].cssClass=(p[A].cssClass?" ":"")+k;}}},T=function(A){return A.hasClass(k);},C=function(A){return(A instanceof J.TreeView);},k=j(X,"results","item"),P=j(X,Q),Z=j(X,Q,"list"),L=j(X,Q,"list","item"),B=j(X,d),g=j(d,"node","leaf"),F='<div class="'+P+'"></div>',n='<ul class="'+Z+'"></ul>',a='<li class="'+k+" "+L+'-{1}">{0}</li>',N='<img src="{2}" title="{1}" alt="" /><div>{0}</div>',M='<span class="{2}" title="{1}"></span><div>{0}</div>',Y='<div title="{1}">{0}</div>',c='<div class="'+B+'"></div>';var W=function(){var A=this;J.after(A._renderUISearchBrowserView,A,U);J.after(A._bindUISearchBrowserView,A,b);};W.ATTRS={displayName:{value:false},matchKey:{value:""}};W.prototype={_renderUISearchBrowserView:function(){var A=this;var p=J.Node.create(F);A.get("contentBox").append(p);A._viewNode=p;},_bindUISearchBrowserView:function(){var A=this;A.on("handleResponse",A._populateResultView,A);},hideView:function(){var A=this;A._viewNode.hide();},showView:function(){var A=this;A._viewNode.show();},_populateResultView:function(y){var AD=this;var p=y.response;var v=AD.doBeforeLoadData(y);if(v&&!y.error){AD.fire("dataReturn",y);var AA=p.results;var r=AD.get("displayName");var s=AD.get("matchKey");var A=[];if(s){var u=[];var AE=[];var t=0;for(var z=0;z<AA.length;z++){var AH=AA[z][s];if(AH!=null){if(u[AH]!=null){A[u[AH]].data.push(AA[z]);}else{u[AH]=t;A[t]={name:AH,data:[AA[z]]};t++;}}else{AE.push(AA[z]);}}A.sort(function(AJ,AI){return(AJ.data.length==AI.data.length?0:(AJ.data.length>AI.data.length?-1:1));});if(AE.length>0){A.push({name:"",data:AE});}}else{A.push({name:"",data:AA});}AD._viewNode.html("");for(var z=0;z<A.length;z++){var w=J.Node.create(n);for(var x=0;x<A[z].data.length;x++){var AF=A[z].data[x];var AG;var AB;var q;if(AF.imageUri){AG=N;AB=AF.imageUri;q=E;}else{if(AF.iconCss){AG=M;AB=AF.iconCss;q=V;}else{AG=Y;q=h;}}AG=o.sub(a,[o.sub(AG,[(r?AF.name:""),AF.title||"",AB||""]),q]);var AC=J.Node.create(AG);AC.setData(X,AF);w.append(AC);}if(s){new J.Panel({collapsible:true,collapsed:(AD._viewNode.html()!=""),headerContent:A[z].name,bodyContent:w}).render(AD._viewNode);}else{AD._viewNode.append(w);}}}},_uiSetHeight:function(s){var p=this;var A=parseInt(s);var q=p._viewNode;if(A){var r=q.getBorderWidth("tb")+q.getPadding("tb");q.setStyle("height",(A-r));}else{q.setStyle("height","");}}};var l=J.Base.build(S,J.Component,[J.DataSourceControl,J.InputTextControl,W]);var m=function(){var A=this;J.after(A._renderUITreeBrowserView,A,U);J.after(A._bindUITreeBrowserView,A,b);};m.ATTRS={rootLabel:{value:""}};m.prototype={_renderUITreeBrowserView:function(){var A=this;var q=A.get("contentBox");var s=A.get("dataSource");var p=J.Node.create(c);q.append(p);var r=new J.TreeView().render(p);r.on("expand",function(v){var t=this;var u=v.tree.node;t._expandNode(u,s);},A);A._treeView=r;A._viewNode=p;},_bindUITreeBrowserView:function(){var A=this;A._expandNode(A._treeView,A.get("dataSource"));},doBeforeLoadData:function(A){return true;},hideView:function(){var A=this;A._viewNode.hide();},showView:function(){var A=this;A._viewNode.show();},_expandNode:function(q,r){var A=this;if(q&&!q.hasChildNodes()){var p={cfg:(!C(q)?q._originalConfig:null),callback:{success:function(s){A._populateResultView(J.mix(s,{node:q}));}}};A.fire("dataRequest",null,p);r.sendRequest(p);}},_populateResultView:function(v){var p=this;var s=v.response;var u=v.node;var t=p.doBeforeLoadData(v);if(t&&!v.error&&u){p.fire("dataReturn",v);var A=s.results;if(A.length>0){var q=p.get("rootLabel");if(q&&C(u)){var r=new J.TreeNode({label:q,children:A});u.appendChild(r);}else{J.each(A,function(w){var x=u.createNode.apply(p,[w]);u.appendChild(x);});}}}else{p.fire("dataError",v);}},_uiSetHeight:function(s){var p=this;var A=parseInt(s);var q=p._viewNode;if(A){var r=q.getBorderWidth("tb")+q.getPadding("tb");q.setStyle("height",(A-r));}else{q.setStyle("height","");}}};var I=J.Base.build(D,J.Component,[J.DataSourceControl,m]);var f=J.Component.create({NAME:X,ATTRS:{currentView:{value:Q},searchView:{value:null},treeView:{value:null}},prototype:{renderUI:function(){var A=this;var p=A.get("contentBox");var v=A.get("searchView");var r=A.get("treeView");if(v){var q=new l(J.mix({iconButton:"circle-triangle-r"},v)).render(p);A._searchBrowser=q;}if(r){var u=new I(r).render(p);A._treeBrowser=u;}if(v&&r){var t=A._searchBrowser.comboBox;var s=new J.Toolbar({children:[{icon:H,handler:{fn:function(){var w=this;w.set("currentView",Q);w._updateViews();},context:A}},{icon:R,handler:{fn:function(){var w=this;w.set("currentView",d);w._updateViews();},context:A}}]}).render(t.get("boundingBox"));}},bindUI:function(){var A=this;A.get("contentBox").delegate("click",function(q){var p=q.currentTarget;var r;if(T(p)){r=p.getData(X);}else{p=J.Widget.getByNode(p);if(p){r=p._originalConfig;}}if(r){A.fire("itemSelected",{item:r,node:p});}else{A.fire("itemError",q);}},"."+k+", ."+g);},syncUI:function(){var A=this;A._syncDimensions();A._updateViews();},_syncDimensions:function(){var t=this;var v=t.get("height");if(v){var p=t.get("boundingBox");var s=t._searchBrowser;var A=t._treeBrowser;var q=0;if(s){var r=s.comboBox;if(r){var u=r.get("boundingBox");q+=u.getBorderWidth("tb")+u.getMargin("tb")+u.get("offsetHeight");}}var w=parseInt(t.get("height"),10)-q;if(s){s.set("height",w);}if(A){A.set("height",w);}}},_updateViews:function(){var A=this;var r=A.get("currentView");var p=A._searchBrowser;var q=A._treeBrowser;if(p&&q){if(r==Q){q.hideView();p.showView();}else{if(r==d){p.hideView();q.showView();}}}}}});J.DataBrowser=f;},"@VERSION@",{requires:["aui-base","aui-datasource-control-base","aui-input-text-control","aui-tree","aui-panel"],skinnable:true});
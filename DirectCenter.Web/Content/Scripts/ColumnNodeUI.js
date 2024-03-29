/*
 * Ext JS Library 2.0 RC 1 Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
	lines : false,
	borderWidth : Ext.isBorderBox ? 0 : 2, // the combined left/right border
	// for each cell
	cls : 'x-column-tree',
	collapsible : false,

	onRender : function() {
		Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);
		this.headers = this.body.createChild({
			cls : 'x-tree-headers'
		}, this.innerCt.dom);

		var cols = this.columns, c;
		var totalWidth = 0;

		for (var i = 0, len = cols.length; i < len; i++) {
			c = cols[i];
			totalWidth += c.width;
			this.headers.createChild({
				cls : 'x-tree-hd ' + (c.cls ? c.cls + '-hd' : ''),
				cn : {
					cls : 'x-tree-hd-text',
					html : c.header
				},
				style : 'width:' + (c.width - this.borderWidth) + 'px;'
			});
		}
		this.headers.createChild({
			cls : 'x-clear'
		});
		// prevent floats from wrapping when clipped
		this.headers.setWidth(totalWidth);
		this.innerCt.setWidth(totalWidth);
	}
});

Ext.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	focus : Ext.emptyFn, // prevent odd scrolling behavior

	renderElements : function(n, a, targetNode, bulkRender) {
		this.indentMarkup = n.parentNode
				? n.parentNode.ui.getChildIndent()
				: '';

		var t = n.getOwnerTree();
		var cols = t.columns;
		var bw = t.borderWidth;
		var c = cols[0];

		n.cols = new Array();

		var text = n.text
				|| (c.renderer
						? c.renderer(a[c.dataIndex], n, a)
						: a[c.dataIndex]);
		n.cols[cols[0].dataIndex] = text;

		var buf = [
				'<li class="x-tree-node" unselectable="on"><div ext:tree-node-id="',
				n.id, '" class="x-tree-node-el x-tree-node-leaf ', a.cls,
				'" unselectable="on">',
				'<div class="x-tree-col" style="width:', c.width - bw,
				'px;" unselectable="on">',
				'<span class="x-tree-node-indent" unselectable="on">',
				this.indentMarkup, "</span>", '<img src="', this.emptyIcon,
				'" class="x-tree-ec-icon x-tree-elbow" unselectable="on">',
				'<img src="', a.icon || this.emptyIcon,
				'" class="x-tree-node-icon',
				(a.icon ? " x-tree-node-inline-icon" : ""),
				(a.iconCls ? " " + a.iconCls : ""), '" unselectable="on">',
				'<a hidefocus="on" class="x-tree-node-anchor" href="',
				a.href ? a.href : "#", '" tabIndex="1" ',
				a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "",
				' unselectable="on">', '<span unselectable="on">', text,
				"</span></a>", "</div>"];
		for (var i = 1, len = cols.length; i < len; i++) {
			c = cols[i];
			var text = (c.renderer
					? c.renderer(a[c.dataIndex], n, a)
					: a[c.dataIndex]);
			n.cols[cols[i].dataIndex] = text;
			buf.push('<div class="x-tree-col ', (c.cls ? c.cls : ''),
					'" style="width:', c.width - bw, 'px;" unselectable="on">',
					'<div class="x-tree-col-text" unselectable="on">', text,
					"</div>", "</div>");
		}
		buf
				.push(
						'<div class="x-clear" unselectable="on"></div></div>',
						'<ul class="x-tree-node-ct" style="display:none;" unselectable="on"></ul>',
						"</li>");

		if (bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
					n.nextSibling.ui.getEl(), buf.join(""));
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf
					.join(""));
		}

		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var cs = this.elNode.firstChild.childNodes;
		this.indentNode = cs[0];
		this.ecNode = cs[1];
		this.iconNode = cs[2];
		this.anchor = cs[3];
		this.textNode = cs[3].firstChild;
	}
});
Ext.tree.ColumnTreeEditor = function(tree, config) {
	config = config || {};
	var field = config.events ? config : new Ext.form.TextField(config);
	Ext.tree.TreeEditor.superclass.constructor.call(this, field);

	this.tree = tree;

	if (!tree.rendered) {
		tree.on('render', this.initEditor, this);
	} else {
		this.initEditor(tree);
	}
};

Ext.extend(Ext.tree.ColumnTreeEditor, Ext.Editor, {

	alignment : "l-l",
	autoSize : false,

	hideEl : false,

	cls : "x-small-editor x-tree-editor",

	shim : false,
	shadow : "frame",

	maxWidth : 250,

	editDelay : 0,

	initEditor : function(tree) {
		tree.on('beforeclick', this.beforeNodeClick, this);
		this.on('complete', this.updateNode, this);
		this.on('beforestartedit', this.fitToTree, this);
		this.on('startedit', this.bindScroll, this, {
			delay : 10
		});
		this.on('specialkey', this.onSpecialKey, this);
	},

	fitToTree : function(ed, el) {
		var td = this.tree.getTreeEl().dom, nd = el.dom;
		if (td.scrollLeft > nd.offsetLeft) {
			td.scrollLeft = nd.offsetLeft;
		}
		var w = Math.min(this.maxWidth, (td.clientWidth > 20
				? td.clientWidth
				: td.offsetWidth)
				- Math.max(0, nd.offsetLeft - td.scrollLeft) - 5);
		this.setSize(w, '');
	},

	triggerEdit : function(node, e) {
		var obj = e.target;
		if (Ext.select(".x-tree-node-anchor", false, obj).getCount() == 1) {
			obj = Ext.select(".x-tree-node-anchor", false, obj).elements[0].firstChild;
		} else if (obj.nodeName == 'SPAN' || obj.nodeName == 'DIV') {
			obj = e.target;
		} else {
			return false;
		}

		var colIndex = 0;
		for (var i in node.cols) {
			if (node.cols[i] == obj.innerHTML) {
				colIndex = i;
			}
		}
		this.completeEdit();
		this.editNode = node;
		this.editCol = obj;
		this.editColIndex = colIndex;
		this.startEdit(obj);
		if (obj.nodeName == 'DIV') {
			var width = obj.offsetWidth;
			this.setSize(width);
		}
	},

	bindScroll : function() {
		this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
	},

	beforeNodeClick : function(node, e) {
		var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
		this.lastClick = new Date();
		if (sinceLast > this.editDelay
				&& this.tree.getSelectionModel().isSelected(node)) {
			e.stopEvent();
			this.triggerEdit(node, e);
			return false;
		} else {
			this.completeEdit();
		}
	},

	updateNode : function(ed, value) {
		this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
		this.editNode.cols[this.editColIndex] = value; // for internal use only
		this.editNode.attributes[this.editColIndex] = value;// duplicate into
		// array of node
		// attributes
		this.editCol.innerHTML = value;
	},

	onHide : function() {
		Ext.tree.TreeEditor.superclass.onHide.call(this);
		if (this.editNode) {
			this.editNode.ui.focus();
		}
	},

	onSpecialKey : function(field, e) {
		var k = e.getKey();
		if (k == e.ESC) {
			e.stopEvent();
			this.cancelEdit();
		} else if (k == e.ENTER && !e.hasModifier()) {
			e.stopEvent();
			this.completeEdit();
		}
	}
});

/**
 * ColumnTree的相关扩展
 */
/**
 * TreeRoot
 */
Ext.Ebc.ColumnTreeNode = Ext.extend(Ext.tree.AsyncTreeNode, {
	allowChildren : true,
	defaults : {
		uiProvider : 'col'
	}
})

/**
 * TreeLoad
 */
Ext.Ebc.ColumnTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
	uiProviders : {
		'col' : Ext.tree.ColumnNodeUI
	},
	preloadChildren : true,
	baseAttrs : {
		uiProvider : 'col'
	}
})

/**
 * ColumnTree扩展
 */
/** 参数：treeNodeID， */
/** 参数：dataUrl， */
Ext.Ebc.ColumnTree = Ext.extend(Ext.tree.ColumnTree, {
	treeNodeID : '',
	dataUrl : '',

	nbtns : null,
	autoScroll : true,
	rootVisible : false,
	expandable : false,
	enableDD : false,
	border : false,
	initComponent : function() {
		this.loader = this.createLoader();
		Ext.Ebc.ColumnTree.superclass.initComponent.call(this);
		this.createTBar();
	},
	createNbtns : function() {
		return this.nbtns;
	},
	createTBar : function() {
		this.topToolbar = ['-', {
			text : btn_ExpandAll,
			iconCls : 'btnexpandall',
			handler : this.expandAll.createDelegate(this)
		}, '-', {
			text : btn_CollapseAll,
			iconCls : 'btncollapseall',
			handler : this.collapseAll.createDelegate(this)
		}, '-'];
		var nbtns = this.createNbtns();
		if (nbtns != null)
			for (var i = 0; i < nbtns.length; i++) {
				this.topToolbar.push(nbtns[i]);
			}
		this.elements += ',tbar';
	},
	createLoader : function() {
		var dataUrl = this.dataUrl;
		var treeNodeID = this.treeNodeID;
		return new Ext.Ebc.ColumnTreeLoader({
			dataUrl : dataUrl,
			listeners : {
				'beforeload' : function(treeLoader, node) {
					treeLoader.baseParams[treeNodeID] = node.attributes[treeNodeID];
				}
			}
		})
	}
})
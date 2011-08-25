/*
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	Author: Sam Tsvilik
	Version: 4.0 Beta
	Last Modified: 08/29/2009
*/
(function($) {
	//Converts XML DOM to JSON				
	//Helper functions
	var TOSTR = Object.prototype.toString,
		util = {
		isIE: function(){ return (+"\0"===0); },
		isStr: function(o) { return TOSTR.call(o) === "[object String]"; },
		isFn: function(o) { return TOSTR.call(o) === "[object Function]"; },
		isDef: function(o) {return (typeof(o) !== "undefined");	},
		isArr: function(o) { return TOSTR.call(o) === "[object Array]"; },
		isNum: function(s) {
			var out = false;					
			if(util.isStr(s)) { 
				var pattern = /^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/;
				out = pattern.test(s);
			}
			return out;
		},
		isXNode: function(o) { return (typeof(o) === "object" && this.isDef(o.nodeName)); },
		isNodeSet: function(o) { return o instanceof INodeSet; },
		//Alters attribute and collection names to comply with JS
		trim: function(str) {
			var out = str;
			if(this.isStr(str)) {
				out = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			}
			return out;
		},
		formatName: function(name) {					
			var tName = this.trim(String(name));
			return tName;
		},
		inherit: function(subclass, superclass) {
			subclass.prototype = new superclass();
			subclass.prototype.constructor = subclass;
		},
		//Adds a method to the object
		method: function(){
			var aLen = arguments.length, to, method, fn, map;			
			switch(aLen) {
				case 2: to =  arguments[0]; 
						map = arguments[1];
						for(method in map) {
							fn = map[method];
							to[method] = fn;
						}
						break;
				case 3: to =  arguments[0]; 
						map = arguments[1];
						fn = arguments[2];
						if(util.isFn(fn) && util.isStr(method)) {
							to[method] = fn;	
						}
						break;
			}
		}
	};
	
	var XMLSerializer = {
		//Creates an XMLDomDocument instance
		newDocument: function(rootTagName, namespaceURL) {
		  if (!rootTagName) rootTagName = "";
		  if (!namespaceURL) namespaceURL = "";
		  if (document.implementation && document.implementation.createDocument) {
			// This is the W3C standard way to do it
			return document.implementation.createDocument(namespaceURL, rootTagName, null);
		  } else { // This is the IE way to do it
			// Create an empty document as an ActiveX object
			// If there is no root element, this is all we have to do
			var doc = new ActiveXObject("MSXML2.DOMDocument");
			// If there is a root tag, initialize the document
			if (rootTagName) {
			  // Look for a namespace prefix
			  var prefix = "";
			  var tagname = rootTagName;
			  var p = rootTagName.indexOf(':');
			  if (p !== -1) {
				prefix = rootTagName.substring(0, p);
				tagname = rootTagName.substring(p+1);
			  }
			  // If we have a namespace, we must have a namespace prefix
			  // If we don't have a namespace, we discard any prefix
			  if (namespaceURL) {
				if (!prefix) prefix = "a0"; // What Firefox uses
			  } else prefix = "";
			  // Create the root element (with optional namespace) as a
			  // string of text
			  var text = "<" + (prefix?(prefix+":"):"") +  tagname +
				  (namespaceURL
				   ?(" xmlns:" + prefix + '="' + namespaceURL +'"')
				   :"") +
				  "/>";
			  // And parse that text into the empty document
			  doc.loadXML(text);
			}
			return doc;
		  }
		},
		//Recursively converts JSON object to an XML node
		objToNode: function(curNode, obj) {
			var subElement, val, newNode;
			if(util.isDef(curNode) && util.isDef(obj)) {
				for(subElement in obj) {
					if(obj.hasOwnProperty && obj.hasOwnProperty(subElement)) {
						val = obj[subElement];
						if(subElement.indexOf("@") !== -1) {
							curNode.setAttribute(subElement.replace('@',''), val);
						} else if(subElement === "$comments") {
							if(!!val.length) {
								var c = 0, clen = val.length-1, cc;									
								do {
									cc = val[c];
									curNode.appendChild(this.createComment(cc));
								} while(c++ < clen); 
							}
						} else if(util.isNodeSet(val)) {
							var n = 0, nlen = val.length-1, nn;
							do {
								nn = val[n];
								if(!!nn.ns) {
									if(util.isDef(this.createElementNS)) {
										newNode = curNode.appendChild(this.createElementNS(nn.ns, subElement));
									} else {										
										newNode = curNode.appendChild(this.createNode(1, subElement, nn.ns));
									}
								} else {
									newNode = curNode.appendChild(this.createElement(subElement));
								}								
								if(!!nn.Text) {	newNode.appendChild(util.isDef(nn.hasCDATA)?this.createCDATASection(nn.Text):this.createTextNode(nn.Text)); }
								XMLSerializer.objToNode.call(this, newNode, nn);
							} while(n++ < nlen);																		
						}
					}
				}
			}
		}
	};
	//Base child element
	var IChild = function(parent) {
		this.parent = parent || null;
	};
	//Root Node Class
	var IRoot = function(name) {				
		this.nodeName = name || "";
		this.ns = "";				
	};	
	//Node Class
	var INode = function() {
		var parent = null, name = null, value = null;
		switch(arguments.length) {
			case 1: name = arguments[0]; break;
			case 2: parent = arguments[0]; name = arguments[1]; break;
			case 3: parent = arguments[0]; name = arguments[1]; value = arguments[2]; break;
			default: name = "noname";
		}
		IRoot.apply(this, [name]);
		IChild.apply(this, [parent]);
		this.Text = value || "";
	};
	//Node Object - can have children
	function INodeSet(){};
	util.inherit(INodeSet, Array);
	util.method(INodeSet.prototype, {
		getNodesByAttribute: function(attr, obj){
			var out = [];
			if(!!this.length && util.isStr(attr) && util.isDef(obj)) {
				var n = this.length, node, aval;
				while(n--) {
					node = this[n]; aval = node[attr];
					if(util.isDef(aval) && aval === obj) { out.unshift(node); }
				}
			}
			return (!out.length)?null:out;
		},
		getNodesByValue: function(obj){
			var out = [];
			if(!!this.length && util.isDef(obj)) {
				var n = this.length, node;
				while(n--) {
					node = this[n];
					if(node.Text === obj) { out.unshift(node); }
				}
			}
			return (!out.length)?null:out;
		},
		contains: function(attr, obj){
			var out = false;
			if(!!this.length && util.isStr(attr) && util.isDef(obj)) {
				var n = this.length, node, aval;
				while(n--) {
					node = this[n]; aval = node[attr];
					if(util.isDef(aval) && aval === obj) { out = true; break; }
				}
			}
			return out;
		},
		indexOf: function(){
			var out = -1, attr, obj;
			if(!!this.length) {
				var n = this.length, node, val;
				switch(arguments.length) {
					case 1: obj = arguments[0];
						while(n--) {
							node = this[n]; val = node.val();
							if(util.isDef(val) && val === obj) { out = n; break; }
						}
						break;
					case 2: attr = arguments[0]; obj = arguments[1];
						while(n--) {
							node = this[n]; val = node[attr];
							if(util.isDef(val) && val === obj) { out = n; break; }
						}
						break;
				}						
			}
			return out;	
		},
		sortByAttribute: function(attr, dir){
			if(!!this.length && util.isStr(attr)) {
				this.sort(function(a,b) {
					var _a = (a.attr(attr)), 
						_b = (b.attr(attr));
					_a = util.isNum(_a)?parseFloat(_a):_a;
					_b = util.isNum(_b)?parseFloat(_b):_b;
					var _out = (_a<_b)?-1:(_b<_a)?1:0;
						_out = (util.isDef(dir) && dir.toLowerCase() === "desc")?(0-_out):_out;
					return _out;
				});
			}
		},	
		sortByValue: function(dir){
			if(!!this.length) {
				this.sort(function(a,b) {
					var _a = (a.Text), 
						_b = (b.Text);
					_a = util.isNum(_a)?parseFloat(_a):_a;
					_b = util.isNum(_b)?parseFloat(_b):_b;
					var _out = (_a<_b)?-1:(_b<_a)?1:0;
						_out = (util.isDef(dir) && dir.toLowerCase() === "desc")?(0-_out):_out;
					return _out;
				});
			}	
		},
		sortByChildNode: function(nodeName, dir){
			if(!!this.length && util.isStr(nodeName)) {
				this.sort(function(a,b) {
					var _a = a[nodeName],
						_b = b[nodeName];
					_a = (util.isDef(_a) && !!_a.length)?_a[0].Text:null;
					_b = (util.isDef(_b) && !!_b.length)?_b[0].Text:null;
					//---------------------------------------------------//
					_a = util.isNum(_a)?parseFloat(_a):_a;
					_b = util.isNum(_b)?parseFloat(_b):_b;
					var _out = (_a<_b)?-1:(_b<_a)?1:0;
						_out = (util.isDef(dir) && dir.toLowerCase() === "desc")?(0-_out):_out;
					return _out;
				});
			}	
		},	
		first: function() {
			var out = null;
			if(!!this.length) { out = this[0]; }
			return out;
		},
		last: function() {
			var out = null;
			if(!!this.length) { out = this[this.length-1]; }
			return out;
		}	
	});
	//Engine Factory
	var XMLObjectifierEngine = (function() {				
		var _public = {
			makeNodeSet: function() {
				var node = new INodeSet();				
				return node;
			},
			makeNode: function(parent, obj)	{
				var name = obj.localName||obj.baseName;
					name = util.formatName(name);
				var node = new INode(parent, name);
					node.ns = obj.prefix || "";							
					this.setAttributes(node, obj);
				return node;
			},
			setAttributes: function(obj, xnode) {
				if(util.isDef(xnode) && !!xnode.attributes.length) {							
					var a = xnode.attributes.length-1, attName = null, objParent = null;
					do { //Order is irrelevant (speed-up)
						attName = "@"+xnode.attributes[a].name;							
						obj.attr(attName, xnode.attributes[a].value);
					} while(a--);
				}
			},
			run: function(parent, xobj) {
				var curChild, newNode;
				if(util.isDef(parent) && util.isDef(xobj)) {
					if(xobj.hasChildNodes()) {
						var nodesLen = xobj.childNodes.length-1, n = 0;
						do {
							curChild = xobj.childNodes[n];
							switch(curChild.nodeType) {
								case 1: //Node										
									//Create a single node
									newNode = _public.makeNode(parent, curChild);
									if(util.isFn(this.decorator)) {
										var _dout = this.decorator.call(newNode);
										//Skip node if decorator returns false
										if(_dout === false) { continue; }
									}
									if(!!newNode) {
										//Add child node to parent
										parent.appendChild(newNode);
										//Recursive call if node contains children
										if(curChild.hasChildNodes()){ _public.run.apply(this, [newNode, curChild]); }												
									}
									break;
								case 3: //Text Value (This method gets executed regardless of CDATA present so we combine Text value)
									if(!parent.Text) {
										parent.val(util.trim(curChild.nodeValue));
									} else {
										parent.Text += util.trim(curChild.nodeValue);
									}
									break;
								case 4: //CDATA										
									parent.hasCDATA = true;
									parent.val(util.isDef(curChild.text)?util.trim(curChild.text):util.trim(curChild.nodeValue));												
									break;
								case 8: //Comments
									if(!util.isDef(this.noComments) || !this.noComments) {
										if(!util.isDef(parent.$comments)) { parent.$comments = []; }
										parent.$comments.push(util.trim(curChild.nodeValue));
									}
									break;											
							}
						} while(n++ < nodesLen);
					}
				}
			},
			init: function(xobj, opt) {
				opt = opt || {noComments: true};
				if(util.isStr(xobj)){
					xobj = this.textToXML(xobj);
				} else if(util.isXNode(xobj)){ xobj = xobj;
				} else { xobj = null; }
				//If invalid xml object - abort
				if(!xobj){ return null; }
				//Determine a document root node
				var xroot = (xobj.nodeType === 9)?xobj.documentElement:(xobj.nodeType === 11)?xobj.firstChild:xobj;
				//Root Node
				var root = new IRoot(xroot.nodeName);
				if(util.isFn(opt.decorator)) {
					opt.decorator.call(root);
				}
				//If init argument is just a text or CDATA return value
				if(xobj.nodeType === 3 || xobj.nodeType === 4) {
					return xobj.nodeValue;
				}
				//Begins a recursive process to build out a JSON structure						
				this.run.apply(opt, [root, xroot]);
				this.setAttributes(root, xroot);
				return root;
			},
			textToXML: function(strXML) {
				var xmlDoc = null;
				try {
					xmlDoc = (util.isIE())?new ActiveXObject("MSXML2.DOMDocument"):new DOMParser();
					xmlDoc.async = false;
				} catch(e) {throw new Error("XML Parser could not be instantiated");}
				var out = null, isParsed = true;
				if(util.isIE()) {
					isParsed = xmlDoc.loadXML(strXML);
					out = (isParsed)?xmlDoc:false;
				} else {
					out = xmlDoc.parseFromString(strXML, "text/xml");
					isParsed = (out.documentElement.tagName !== "parsererror");
				}
				if(!isParsed){throw new Error("Error parsing XML string");}
				return out;
			}
		};
		
		return _public;				 
	})();
	IRoot.prototype = {
		typeOf: "xmlObjectifier",
		attr: function() {
			var out, attr, val;
			if(!!arguments.length) {
				switch(arguments.length) {
					case 1:	attr = util.formatName(arguments[0]);
							val = this["@"+attr]||this[attr];
							if(util.isDef(val) && !util.isArr(val)) { out = val; } break;
					case 2: attr = util.formatName(arguments[0]);
							val = arguments[1];
							if(util.isStr(attr)) { this[(/^@/.test(attr))?attr:"@"+attr] = val; out = this;} break;
				}
			}
			return out;
		},
		find: function(sel) {
			var out = null, tokens, token, tokenOnly;
			if(util.isStr(sel)) {
				var curMatch, subNode;
				var condMatch = /\[(\d+|@\w+(=\w+)?)\]/, conditionStr, parts, partA, partB;
				var rx = /(?=\.)?([A-Za-z\-]+(\[(\d+|@\w+(=\w+)?)\])?)/g;
				var attrMatch = /^@\w+/, attr;
				//If selector is an attribute, then just find attribute and return it
				if(sel.match(attrMatch)) {
					attr = sel.match(attrMatch)[0];
					return this.attr(attr);
				}
				tokens = sel.match(rx);
				if(!!tokens.length) {
					var t = 0, tLen = tokens.length-1;
					do {								
						token = tokens[t];
						tokenOnly = token.match(/[A-Za-z\-]+/)[0];
						curMatch = !!curMatch?(util.isArr(curMatch)?curMatch[0]:curMatch)[tokenOnly]:this[tokenOnly];
						if(!curMatch) { break; }
						conditionStr = !!token.match(condMatch) && token.match(condMatch)[0].replace("[","").replace("]","");
						if(conditionStr && !!conditionStr.length) {
							if(conditionStr.indexOf("=")!==-1) {
								parts = conditionStr.split("=");
								partA = util.trim(parts[0]); partB = util.trim(parts[1]);
								if(partA.indexOf("@")!==-1) {
									attr = partA;
									curMatch = curMatch.getNodesByAttribute(attr, partB);
								} else {
									subNode = util.trim(curMatch[partA]);
									if(subNode) {
										curMatch = subNode.getNodesByValue(partB);
									}
								}
							} else if(util.isNum(conditionStr)){ 
								curMatch = curMatch[~~+conditionStr];
							}
						}								
					} while(t++ < tLen);
					out = curMatch;
				}
			}
			return out;
		},
		addComment: function(comment) {
			if(util.isStr(comment)) {
			if(!util.isDef(this.$comments)) { this.$comments = []; }
				this.$comments.push(comment);
			}
			return this;
		},
		val: function(v) {
			var out = this;
			if(util.isDef(v)) {
				this.Text = v;
			} else { out = this.Text; }
			return out;
		},
		toXML: function() {
			var root = XMLSerializer.newDocument(this.nodeName, this.ns);
			XMLSerializer.objToNode.call(root, root.documentElement, this);
			return root;
		},
		toString: function() {
			var root = this.toXML();
			var out = "";
			if(util.isDef(root.xml)) {
				out = root.xml;
			} else if(util.isDef(XMLSerializer)){
				var serializer = new window.XMLSerializer();
				out = serializer.serializeToString(root);
			}
			return out;
		},
		appendChild: function(nodeClassInst) {
			if(util.isDef(nodeClassInst) && nodeClassInst instanceof INode) {
				nodeClassInst.parent = this;
				if(!util.isDef(this[nodeClassInst.nodeName])) { this[nodeClassInst.nodeName] = XMLObjectifierEngine.makeNodeSet(); }
				this[nodeClassInst.nodeName].push(nodeClassInst);
			}
		}
	};
	INode.prototype = {
		attr: IRoot.prototype.attr,
		val: IRoot.prototype.val,
		find: IRoot.prototype.find,
		addComment: IRoot.prototype.addComment,
		appendChild: IRoot.prototype.appendChild
	};
	//All Public members
	var _publicMapping = {
		xmlToJSON: function(xdoc, opt) {
			return XMLObjectifierEngine.init(xdoc, opt);
		},
		//Converts Text to XML DOM
		textToXML: XMLObjectifierEngine.textToXML,
		//Classes exposed for prototype extensibility
		xmlObjectifier: {
			RootClass: IRoot, //Root node only
			NodeClass: INode,  //Node element
			NodeSetClass: INodeSet //NodeSet class
		}
	};

	if(util.isDef($)) {
		$.extend ( _publicMapping );
	} else {
		window.XMLObjectifier = _publicMapping;
	}
})((typeof(jQuery) !== "undefined") && jQuery || undefined);
var MenuBuilder, jbone, view;

jbone = require("jbone");
view = require("backbone-viewj");

module.exports = MenuBuilder = view.extend({
  initialize: function(opts){
    this._nodes = [];
    this.name = opts.name || "";
    this.el.className += "smenubar";
  },
  render: function(){

    // remove all childs
    var fc = this.el.firstChild;
    while( fc ) {
      this.el.removeChild( fc );
      fc = this.el.firstChild;
    }
  
    // replace child
    this.el.appendChild(this.buildDOM());
  },
  setName: function(name) {
    this.name = name;
  },
  addNode: function(label, callback, opts) {
    var style;
    if (opts != null) {
      style = opts.style;
    }
    if (this._nodes == null) {
      this._nodes = [];
    }
    this._nodes.push({
      label: label,
      callback: callback,
      style: style
    });
  },

  getNode: function(label){
    var rNode = undefined;
    this._nodes.forEach(function(el){
      if(el.label === label){
        rNode = el;
      }
    });
    return rNode;
  },

  modifyNode: function(label,callback,opts){
   var node = this.getNode(label);
   node.callback = callback || node.callback;
   opts = opts || {};
   node.style = opts.style || node.style;
  },

  renameNode: function(label,newLabel){
   var node = this.getNode(label);
   node.label = newLabel || node.label;
  },

  removeNode: function(label){
   var node = this.getNode(label);
   this._nodes.splice(this._nodes.indexOf(node),1);
  },

  buildDOM: function() {
    return this._buildM({
      nodes: this._nodes,
      name: this.name
    });
  },
  _buildM: function(data) {
    var displayedButton, frag, key, li, menu, menuUl, name, node, nodes, style, _i, _len, _ref;
    nodes = data.nodes;
    name = data.name;
    menu = document.createElement("div");
    menu.className = "smenu-dropdown smenu-dropdown-tip";
    menu.style.display = "none";

    menuUl = document.createElement("ul");
    menuUl.className = "smenu-dropdown-menu";

    // currently we support one-level
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      li = document.createElement("li");
      li.textContent = node.label;
      _ref = node.style;
      for (key in _ref) {
        style = _ref[key];
        li.style[key] = style;
      }
      li.addEventListener("click", node.callback);
      this.trigger("new:node", li);
      menuUl.appendChild(li);
    }
    this.trigger("new:menu", menuUl);
    menu.appendChild(menuUl);

    displayedButton = document.createElement("a");
    displayedButton.textContent = name;
    displayedButton.className = "smenubar_alink";
    this.trigger("new:button", displayedButton);

    // HACK to be able to hide the submenu
    // listens globally for click events
    jbone(displayedButton).on("click", (function(_this) {
      return function(e) {
        _this._showMenu(e, menu, displayedButton);
        return window.setTimeout(function() {
          return jbone(document.body).one("click", function(e) {
            return menu.style.display = "none";
          });
        }, 5);
      };
    })(this));

    frag = document.createDocumentFragment();
    frag.appendChild(menu);
    frag.appendChild(displayedButton);
    return frag;
  },

  // internal method to display the lower menu on a click
  _showMenu: function(e, menu, target) {
    var rect;
    menu.style.display = "block";
    menu.style.position = "absolute";
    rect = target.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = (rect.top + target.offsetHeight) + "px";
  }
});

require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Get or set element’s style, prefix-agnostic.
 *
 * @module  mucss/css
 */
var fakeStyle = require('./fake-element').style;
var prefix = require('./prefix').lowercase;


/**
 * Apply styles to an element.
 *
 * @param    {Element}   el   An element to apply styles.
 * @param    {Object|string}   obj   Set of style rules or string to get style rule.
 */
module.exports = function(el, obj){
	if (!el || !obj) return;

	var name, value;

	//return value, if string passed
	if (typeof obj === 'string') {
		name = obj;

		//return value, if no value passed
		if (arguments.length < 3) {
			return el.style[prefixize(name)];
		}

		//set style, if value passed
		value = arguments[2] || '';
		obj = {};
		obj[name] = value;
	}

	for (name in obj){
		//convert numbers to px
		if (typeof obj[name] === 'number' && /left|right|bottom|top|width|height/i.test(name)) obj[name] += 'px';

		value = obj[name] || '';

		el.style[prefixize(name)] = value;
	}
};


/**
 * Return prefixized prop name, if needed.
 *
 * @param    {string}   name   A property name.
 * @return   {string}   Prefixed property name.
 */
function prefixize(name){
	var uName = name[0].toUpperCase() + name.slice(1);
	if (fakeStyle[name] !== undefined) return name;
	if (fakeStyle[prefix + uName] !== undefined) return prefix + uName;
	return '';
}

},{"./fake-element":2,"./prefix":7}],2:[function(require,module,exports){
/** Just a fake element to test styles
 * @module mucss/fake-element
 */

module.exports = document.createElement('div');
},{}],3:[function(require,module,exports){
/**
 * Window scrollbar detector.
 *
 * @module mucss/has-scroll
 */

//TODO: detect any element scroll, not only the window
exports.x = function () {
	return window.innerHeight > document.documentElement.clientHeight;
};
exports.y = function () {
	return window.innerWidth > document.documentElement.clientWidth;
};
},{}],4:[function(require,module,exports){
/**
 * Detect whether element is placed to fixed container or is fixed itself.
 *
 * @module mucss/is-fixed
 *
 * @param {(Element|Object)} el Element to detect fixedness.
 *
 * @return {boolean} Whether element is nested.
 */
module.exports = function (el) {
	var parentEl = el;

	//window is fixed, btw
	if (el === window) return true;

	//unlike the doc
	if (el === document) return false;

	while (parentEl) {
		if (getComputedStyle(parentEl).position === 'fixed') return true;
		parentEl = parentEl.offsetParent;
	}
	return false;
};
},{}],5:[function(require,module,exports){
/**
 * Calculate absolute offsets of an element, relative to the document.
 *
 * @module mucss/offsets
 *
 */
var win = window;
var doc = document;
var Rect = require('./rect');
var hasScroll = require('./has-scroll');
var scrollbar = require('./scrollbar');
var isFixedEl = require('./is-fixed');
var getTranslate = require('./translate');


/**
 * Return absolute offsets of any target passed
 *
 * @param    {Element|window}   el   A target. Pass window to calculate viewport offsets
 * @return   {Object}   Offsets object with trbl.
 */
module.exports = offsets;

function offsets (el) {
	if (!el) throw Error('Bad argument');

	//calc client rect
	var cRect, result;

	//return vp offsets
	if (el === win) {
		result = Rect(
			win.pageXOffset,
			win.pageYOffset
		);

		result.width = win.innerWidth - (hasScroll.y() ? scrollbar : 0),
		result.height = win.innerHeight - (hasScroll.x() ? scrollbar : 0)
		result.right = result.left + result.width;
		result.bottom = result.top + result.height;

		return result;
	}

	//return absolute offsets if document requested
	else if (el === doc) {
		var res = offsets(doc.documentElement);
		res.bottom = Math.max(window.innerHeight, res.bottom);
		res.right = Math.max(window.innerWidth, res.right);
		res.height = Math.max(window.innerHeight, res.height);
		res.width = Math.max(window.innerHeight, res.width);
		if (hasScroll.y(doc.documentElement)) res.right -= scrollbar;
		if (hasScroll.x(doc.documentElement)) res.bottom -= scrollbar;
		return res;
	}

	//FIXME: why not every element has getBoundingClientRect method?
	try {
		cRect = el.getBoundingClientRect();
	} catch (e) {
		cRect = Rect(
			el.clientLeft,
			el.clientTop
		);
	}

	//whether element is or is in fixed
	var isFixed = isFixedEl(el);
	var xOffset = isFixed ? 0 : win.pageXOffset;
	var yOffset = isFixed ? 0 : win.pageYOffset;

	result = Rect(
		cRect.left + xOffset,
		cRect.top + yOffset,
		cRect.left + xOffset + el.offsetWidth,
		cRect.top + yOffset + el.offsetHeight
	);

	return result;
};
},{"./has-scroll":3,"./is-fixed":4,"./rect":8,"./scrollbar":9,"./translate":10}],6:[function(require,module,exports){
/**
 * Returns parsed css value.
 *
 * @module mucss/parse-value
 *
 * @param {string} str A string containing css units value
 *
 * @return {number} Parsed number value
 */
module.exports = function (str){
	str += '';
	return parseFloat(str.slice(0,-2)) || 0;
};

//FIXME: add parsing units
},{}],7:[function(require,module,exports){
/**
 * Vendor prefixes
 * Method of http://davidwalsh.name/vendor-prefix
 * @module mucss/prefix
 */

var styles = getComputedStyle(document.documentElement, '');

if (!styles) {
	module.exports = {
		dom: '', lowercase: '', css: '', js: ''
	};
}

else {
	var pre = (Array.prototype.slice.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	)[1];

	var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

	module.exports = {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
}

},{}],8:[function(require,module,exports){
/**
 * Simple rect constructor.
 * It is just faster and smaller than constructing an object.
 *
 * @module mucss/rect
 *
 * @param {number} l left
 * @param {number} t top
 * @param {number} r right
 * @param {number} b bottom
 *
 * @return {Rect} A rectangle object
 */
module.exports = function Rect (l,t,r,b) {
	if (!(this instanceof Rect)) return new Rect(l,t,r,b);

	this.left=l||0;
	this.top=t||0;
	this.right=r||0;
	this.bottom=b||0;
	this.width=Math.abs(this.right - this.left);
	this.height=Math.abs(this.bottom - this.top);
};
},{}],9:[function(require,module,exports){
/**
 * Calculate scrollbar width.
 *
 * @module mucss/scrollbar
 */

// Create the measurement node
var scrollDiv = document.createElement("div");

var style = scrollDiv.style;

style.width = '100px';
style.height = '100px';
style.overflow = 'scroll';
style.position = 'absolute';
style.top = '-9999px';

document.documentElement.appendChild(scrollDiv);

// the scrollbar width
module.exports = scrollDiv.offsetWidth - scrollDiv.clientWidth;

// Delete fake DIV
document.documentElement.removeChild(scrollDiv);
},{}],10:[function(require,module,exports){
/**
 * Parse translate3d
 *
 * @module mucss/translate
 */

var css = require('./css');
var parseValue = require('./parse-value');

module.exports = function (el) {
	var translateStr = css(el, 'transform');

	//find translate token, retrieve comma-enclosed values
	//translate3d(1px, 2px, 2) → 1px, 2px, 2
	//FIXME: handle nested calcs
	var match = /translate(?:3d)?\s*\(([^\)]*)\)/.exec(translateStr);

	if (!match) return [0, 0];
	var values = match[1].split(/\s*,\s*/);

	//parse values
	//FIXME: nested values are not necessarily pixels
	return values.map(function (value) {
		return parseValue(value);
	});
};
},{"./css":1,"./parse-value":6}],11:[function(require,module,exports){
//camel-case → CamelCase
module.exports = function(str){
	return str && str.replace(/-[a-z]/g, function(match, position){
		return match[1].toUpperCase();
	})
}
},{}],12:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],"connection-line":[function(require,module,exports){
/**
 * Connection-line element controller
 *
 * @module connection-line
 */

var extend = require('xtend/mutable');
var offset = require('mucss/offset');
var camel = require('mustring/camel');
var Rect = require('mucss/rect');


/**
 * Create connection-line element controller
 *
 * @constructor
 *
 * @param {Object} properties Options to init
 */
function Connector (properties) {
	if (!(this instanceof Connector)) return new Connector(properties);

	//read attributes of an element once
	if (properties.element) {
		for (var i = 0, l = properties.element.attributes.length; i < l; i++) {
			var attribute = properties.element.attributes[i];
			var name = camel(attribute.name);
			if (properties[name] === undefined) {
				properties[name] = attribute.value;
			}
		}
	}

	//take over options
	extend(this, properties);

	this.ns = 'http://www.w3.org/2000/svg';

	//ensure element
	if (!this.element) {
		//FIXME: this element may fail in IE etc
		this.element = document.createElement('connection-line');
	}

	//create path
	this.svg = document.createElementNS(this.ns, 'svg');
	this.path = document.createElementNS(this.ns, 'path');
	this.path.style.stroke = this.lineColor;
	this.path.style.fill = 'transparent';
	this.path.style.strokeWidth = this.lineWidth;

	//create marks
	this.lineEndEl = document.createElement('div');
	this.lineStartEl = document.createElement('div');
	this.lineMiddleEl = document.createElement('div');
	this.lineEndEl.className = 'connection-line-end';
	this.lineStartEl.className = 'connection-line-start';
	this.lineMiddleEl.className = 'connection-line-mark';
	this.lineEndEl.innerHTML = this.lineEnd;
	this.lineStartEl.innerHTML = this.lineStart;
	this.lineMiddleEl.innerHTML = this.lineMiddle;

	this.svg.appendChild(this.path);
	this.element.appendChild(this.svg);
	this.element.appendChild(this.lineEndEl);
	this.element.appendChild(this.lineStartEl);
	this.element.appendChild(this.lineMiddleEl);

	//set proper connector attributes
	this.update();
}


/**
 * Source/target element or coordinates
 */
Connector.prototype.from = [0, 0];
Connector.prototype.to = [100, 100];


/**
 * Display labels on top of the connector, e. g. →, ✘ or ✔
 */
Connector.prototype.lineEnd = '➤';
Connector.prototype.lineStart = '';
Connector.prototype.lineMiddle = '';


/**
 * Line style options
 */
Connector.prototype.lineWidth = 1;
Connector.prototype.lineColor = 'black';


/**
 * Curvature displays style of rendering
 * 1 - smooth curve
 * 0 - straight line
 */
Connector.prototype.smoothness = 1;


/**
 * Padding - the area around the target
 * to let connections with the opposite directions take place
 */
Connector.prototype.padding = 20;


/**
 * Initial directions, by default undefined
 */
Connector.prototype.fromDirection;
Connector.prototype.toDirection;


/**
 * Update position, according to the selectors, if any
 */
Connector.prototype.update = function () {
	var self = this;

	//no sense to update detached element
	if (!this.element.parentNode) return;

	//get target offsets
	var from = getOffset(this.from);
	var to = getOffset(this.to);


	//absolute size rect, covering both from and to
	//FIXME: add margins
	var size = Rect(
		Math.min(to.left, from.left) - this.padding,
		Math.min(to.top, from.top) - this.padding,
		Math.max(to.right, from.right) + this.padding,
		Math.max(to.bottom, from.bottom) + this.padding
	);

	//FIXME: set z-index lower than the both targets

	//ensure element size
	this.svg.setAttribute('width', Math.max(size.width, this.lineWidth));
	this.svg.setAttribute('height', Math.max(size.height, this.lineWidth));

	//calculate needed parent offsets
	var parentOffset = Rect();
	if (this.element.offsetParent && (this.element.offsetParent !== document.body) && this.element.offsetParent !== document.documentElement) {
		parentOffset = offset(this.element.offsetParent);
	}

	//place self so to fit space between source and target
	this.element.style.top = size.top - parentOffset.top + 'px';
	this.element.style.left = size.left - parentOffset.left + 'px';

	//centers of masses - relative coords
	var fromCenter = [
		from.left + from.width/2 - size.left,
		from.top + from.height/2 - size.top
	];
	var toCenter = [
		to.left + to.width/2 - size.left,
		to.top + to.height/2 - size.top
	];

	//detect dominant direction vector based on centers of masses
	var mainV = [
		toCenter[0] - fromCenter[0],
		toCenter[1] - fromCenter[1]
	];

	var angle = Math.atan2(-mainV[1], mainV[0]);
	var Pi = Math.PI;
	if (angle < 0) {
		angle += Pi*2;
	}

	//if initial directions are not specified - detect based on angle
	var fromDirection = this.fromDirection || (
		angle < Pi/4 ? 'right' :
		angle < 3*Pi/4 ? 'top' :
		angle < 5*Pi/4 ? 'left' :
		angle < 7*Pi/4 ? 'bottom' : 'right');
	var toDirection = this.toDirection || (
		angle < Pi/4 ? 'left' :
		angle < 3*Pi/4 ? 'bottom' :
		angle < 5*Pi/4 ? 'right' :
		angle < 7*Pi/4 ? 'top' : 'left');

	//calculate start/end points from base directions
	//express in relative coords
	var start0 = getDirectionCoords(fromDirection, from, size);
	var end0 = getDirectionCoords(toDirection, to, size);
	var center = [
		(end0[0] + start0[0]) / 2,
		(end0[1] + start0[1]) / 2
	];

	//direction coefs
	var dirCoef = {
		top: -1,
		bottom: 1,
		left: -1,
		right: 1
	};

	//form path from 3-parts (most difficult case)
	//at first align initial directions around the targets
	//then - draw through the central point
	var start1 = [
		toUnit(start0[0] - fromCenter[0]) * this.padding + start0[0],
		toUnit(start0[1] - fromCenter[1]) * this.padding + start0[1]
	];
	var end1 = [
		toUnit(end0[0] - toCenter[0]) * this.padding + end0[0],
		toUnit(end0[1] - toCenter[1]) * this.padding + end0[1]
	];

	//if in/out directions are over the corner - ensure that corner
	var start2;

	//form path
	var path = 'M ' + start0[0] + ' ' + start0[1] + ' ' +
	'C ' + start1[0] + ' ' + start1[1] + ' ' +
	end1[0] + ' ' + end1[1] + ' ' +
	end0[0] + ' ' + end0[1];

	//set path coords
	this.path.setAttribute('d', path);

	//correct position of marks

	var leSize = [this.lineEndEl.clientWidth, this.lineEndEl.clientHeight];
	var lsSize = [this.lineStartEl.clientWidth, this.lineStartEl.clientHeight];
	var lmSize = [this.lineMiddleEl.clientWidth, this.lineMiddleEl.clientHeight];
	this.lineEndEl.style.left = end0[0] - leSize[0]/2 + 'px';
	this.lineEndEl.style.top = end0[1] - leSize[1]/2 + 'px';
	this.lineStartEl.style.left = start0[0] - lsSize[0]/2 + 'px';
	this.lineStartEl.style.top = start0[1] - lsSize[1]/2 + 'px';
	this.lineMiddleEl.style.left = center[0] - lmSize[0]/2 + 'px';
	this.lineMiddleEl.style.top = center[1] - lmSize[1]/2 + 'px';

	//rotate the marks properly
	var len = this.path.getTotalLength();
	var start = this.path.getPointAtLength(0);
	var startNext = this.path.getPointAtLength(lsSize[0]/2);
	var end = this.path.getPointAtLength(len);
	var endNext = this.path.getPointAtLength(len-leSize[0]/2);
	var startAngle = Math.atan2(startNext.y - start.y, startNext.x - start.x);
	var endAngle = Math.atan2(-endNext.y + end.y, -endNext.x + end.x);
	this.lineEndEl.style.transform = 'rotate(' + endAngle.toFixed(2) + 'rad)';
	this.lineStartEl.style.transform = 'rotate(' + startAngle.toFixed(2) + 'rad)';


	//map diff to a 0..1 coef
	function toUnit (value) {
		return value > 0 ? 1 : value < 0 ? -1 : 0;
	}

	//return coords from the direction
	function getDirectionCoords (direction, rect, size) {
		var coords = [0,0];

		switch (direction) {
			case 'top':
				coords[0] = rect.left + rect.width/2 - size.left;
				coords[1] = rect.top - size.top;
				break;
			case 'bottom':
				coords[0] = rect.left + rect.width/2 - size.left;
				coords[1] = rect.bottom - size.top;
				break;
			case 'left':
				coords[0] = rect.left - size.left;
				coords[1] = rect.top + rect.height/2 - size.top;
				break;
			case 'right':
				coords[0] = rect.right - size.left;
				coords[1] = rect.top + rect.height/2 - size.top;
				break;
		}

		return coords;
	}

	//return absolute offset for a target
	function getOffset (target) {
		if (target instanceof Array) {
			return Rect(target[0], target[1], target[2]||target[0], target[3]||target[1]);
		}

		if (typeof target === 'string') {
			//`100, 200` - coords relative to offsetParent
			if ((coords = target.split(/\s*,\s*/)).length === 2) {
				return Rect(parseInt(coords[0]), parseInt(coords[1]));
			}

			//`.selector` - calc selected target coords relative to offset parent
			target = document.querySelector(target);
		}

		if (!target) {
			return Rect();
		}

		return offset(target);
	}
};


module.exports = Connector;
},{"mucss/offset":5,"mucss/rect":8,"mustring/camel":11,"xtend/mutable":12}]},{},[]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Connection = __webpack_require__(5)

function Node(x,y,name){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0;
  this.lastState = 0;
  this.threshold = 1;
  this.x = x;
  this.y = y;
  this.name = name;
}

Node.prototype.assess = function(){
  value = 0;
  for (let connection of this.connections.to){
    value += (connection.transmission());
  }
  if (value >= this.threshold){ return true }
  return false
}

Node.prototype.on = function(){
  this.state = 1;
}

Node.prototype.off = function(){
  this.state = 0;
}

Node.prototype.remember = function(){
  this.lastState = this.state;
}

Node.prototype.update = function(){
  this.assess() ? this.on() : this.off();
}

Node.prototype.pointFrom = function(otherNode){
  new Connection(otherNode, this);
}

Node.prototype.addToConnection = function(connection){
  this.connections.to.add(connection);
}

Node.prototype.allConnectedNodes = function(){
  const allConn = new Set();
  for (const connection of this.connections.to){
    allConn.add(connection.toNode);
    allConn.add(connection.fromNode);
  }
  for (const connection of this.connections.from){
    allConn.add(connection.toNode);
    allConn.add(connection.fromNode);
  }
  return allConn;
}

Node.prototype.addFromConnection = function(connection){
  this.connections.from.add(connection);
}

Node.prototype.pointTo = function(otherNode){
  new Connection(this, otherNode);
}

Node.prototype.pointsTo = function(otherNode){
  for (const connection of this.connections.from){
    if(connection.toNode == otherNode){
      return true
    }
  }
  return false
}

Node.prototype.removeConnectionsWith = function(otherNode){
  for (const connection of this.connections.to){
    if(connection.toNode == otherNode){
      connection.remove();
    }
  }
  for (let connection of this.connections.to){
    if(connection.fromNode == otherNode){
      connection.remove();
    }
  }
}

Node.prototype.removeConnection = function(connection){
    this.connections.to.delete(connection);
    this.connections.from.delete(connection);
}

Node.prototype.removeAllConnections = function(){
  for (const connection of this.connections.to){ connection.remove(); }
  for (const connection of this.connections.from){ connection.remove(); }
}

Node.prototype.toObj = function(){
  return {
    type: this.constructor.name,
    state: this.state,
    lastState: this.lastState,
    threshold: this.threshold,
    x: this.x,
    y: this.y,
    name: this.name
  }
}

Node.fromObj = function(obj){
  const node = new Node(obj.x, obj.y, obj.name);
  node.assignBasicProps(obj);
  return node
}

Node.prototype.assignBasicProps = function(obj){
  this.state = obj.state || 0;
  this.lastState = obj.lastState || 0;
  this.threshold = obj.threshold || 1;
}

Node.prototype.convertTo = function(className){
  newNode = new className(this.x, this.y, this.name)
  for (prop in this){
    if (newNode[prop] && this.hasOwnProperty(prop)){ newNode[prop] = this[prop] }
  }
  for (const connection of this.connections.from ){ 
    connection.fromNode = newNode;
    newNode.addFromConnection( connection );
  }
  for (const connection of this.connections.to ){ 
    connection.toNode = newNode;
    newNode.addToConnection( connection );
  }
  return newNode;
}

module.exports = Node


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const FunctionalNode = __webpack_require__(3);
const NoisyNode = __webpack_require__(4);
const Network = __webpack_require__(6);

window.network = Network.fromJSON('{"nodesList":[{"type":"Node","state":0,"lastState":0,"threshold":1,"x":734,"y":327,"name":"fctrl"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":894,"y":190,"name":"dy1"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":617,"y":182,"name":"dy3"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":1,"x":730,"y":550,"name":"Fwd","func":"Move!"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":572,"y":395,"name":"#6"},{"type":"NoisyNode","state":0,"lastState":0,"threshold":1,"x":462,"y":411,"name":"rl control","prob":"0.5"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":2,"x":445,"y":550,"name":"Right","func":"Right!"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":3,"x":581,"y":531,"name":"Left","func":"Left!"},{"type":"NoisyNode","state":0,"lastState":0,"threshold":1,"x":277,"y":357,"name":"initiator","prob":"0.71"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":744,"y":140,"name":"dy2"}],"connectionsList":[{"fromNode":"initiator","toNode":"fctrl","strength":1},{"fromNode":"dy3","toNode":"fctrl","strength":-2},{"fromNode":"fctrl","toNode":"fctrl","strength":1},{"fromNode":"fctrl","toNode":"dy1","strength":1},{"fromNode":"dy1","toNode":"dy1","strength":-2},{"fromNode":"dy2","toNode":"dy3","strength":1},{"fromNode":"fctrl","toNode":"Fwd","strength":1},{"fromNode":"dy3","toNode":"#6","strength":1},{"fromNode":"initiator","toNode":"Right","strength":1},{"fromNode":"#6","toNode":"Right","strength":1},{"fromNode":"rl control","toNode":"Right","strength":-1},{"fromNode":"initiator","toNode":"Left","strength":1},{"fromNode":"#6","toNode":"Left","strength":1},{"fromNode":"rl control","toNode":"Left","strength":1},{"fromNode":"dy1","toNode":"dy2","strength":1}]}');

module.exports = network;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Node = __webpack_require__(0);
var FuncStore = __webpack_require__(27);

function FunctionalNode(x,y,name,func){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
  this.func = ( func || console.log.bind(null, "no function") )
}

FunctionalNode.prototype = new Node();

FunctionalNode.prototype.setFunc = function(func){ this.func = func; };

FunctionalNode.prototype.toObj = function(){
  let basicProps = Node.prototype.toObj.call(this);
  return Object.assign(basicProps, { func: this.func.tagName });
};

FunctionalNode.fromObj = function(obj){
  const node = new FunctionalNode(obj.x, obj.y, obj.name);
  node.assignBasicProps(obj);
  node.setFunc(FuncStore.getFunc(obj.func));
  return node
};

FunctionalNode.prototype.constructor = FunctionalNode;

FunctionalNode.prototype.on = function(){ this.state = 1; this.func(); }

module.exports = FunctionalNode;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Node = __webpack_require__(0)

function NoisyNode(x,y,name,prob){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
  this.prob = prob || .25
}
NoisyNode.prototype = new Node();
NoisyNode.prototype.constructor = NoisyNode;

NoisyNode.prototype.toObj = function(){
  const basicProps = Node.prototype.toObj.call(this);
  return Object.assign(basicProps, { prob: this.prob });
};

NoisyNode.fromObj = function(obj){
  const node = new NoisyNode(obj.x, obj.y, obj.name);
  node.assignBasicProps(obj);
  node.prob = obj.prob;
  return node
};

NoisyNode.prototype.assess = function(){
  randomNumber = Math.random();
  if (randomNumber < this.prob) { return true }
  value = 0;
  for (let connection of this.connections.to){
    value += (connection.transmission());
  }
  if (value >= this.threshold){ return true }
  return false
}

module.exports = NoisyNode


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function Connection(fromNode, toNode, strength) {
  this.fromNode = fromNode;
  this.toNode = toNode;
  this.strength = (strength || 1);
  this.toNode.addToConnection(this);
  this.fromNode.addFromConnection(this);
}

Connection.prototype.remove = function(){
  this.toNode.removeConnection(this);
  this.fromNode.removeConnection(this);
}

Connection.prototype.increaseStrength = function(){
  if (this.strength == -1) {this.strength = 1}
  else { this.strength++ }
}

Connection.prototype.decreaseStrength = function(){
  if (this.strength == 1) {this.strength = -1}
  else { this.strength-- }
}

Connection.prototype.transmission = function(){
  return this.fromNode.lastState * this.strength
}

Connection.prototype.toSelf = function(){
  return this.fromNode == this.toNode
}

Connection.prototype.toObj = function(){
  return { fromNode: this.fromNode.name, toNode: this.toNode.name, strength: this.strength }
}

Connection.fromObj = function(obj){
  connection = new Connection(obj.fromNode, obj.toNode, obj.strength)
  return connection
}

module.exports = Connection

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const NoisyNode = __webpack_require__(4);
const FunctionalNode = __webpack_require__(3);
// const FunctionalNode = require('./functional_node.js')
// const FunctionalNode = require('./noisy_node.js')
const Connection = __webpack_require__(5);

function Network (){
  this.nodes = new Set();
}

// Basic

Network.prototype.include = function(node, name){
  this.nodes.add(node)
  node.name || (node.name = "#" + this.nodes.size++)
};

Network.prototype.exclude = function(node){
  this.nodes.delete(node)
};

// Updating

Network.prototype.updateAll = function(){
  this.callOnNodes(Node.prototype.update)
}

Network.prototype.rememberAll = function(){
  this.callOnNodes(Node.prototype.remember)
}

Network.prototype.reset = function(){
  this.nodes = new Set();
}

Network.prototype.updateState = function(){
  this.updateAll()
  this.rememberAll()
}


// Utility

Network.prototype.callOnNodes = function(func){
  for (node of this.nodes){
    func.call(node)
  }
}

Network.prototype.callWithNodes = function(func){
  for (node of this.nodes){
    func.call(null, node)
  }
}

// Saving

Network.prototype.toObj = function(){
  const nodesList = [];
  const connectionsList = [];
  for (const node of this.nodes) {
    nodesList.push(node.toObj())
    for (const connection of node.connections.to){
      connectionsList.push(connection.toObj())
    }
  }
  return { nodesList: nodesList, connectionsList: connectionsList }
};

Network.prototype.toJSON = function(){
  return JSON.stringify(this.toObj());
};

Network.prototype.getNodeByName = function(name) {
  for (const node of this.nodes){
    if (node.name == name) { return node }
  }
};

getClass = function(obj){
  if (obj.type == "Node") return Node;
  if (obj.type == "NoisyNode") return NoisyNode;
  if (obj.type == "FunctionalNode") return FunctionalNode;
};

Network.fromJSON = function(string){
  const obj = JSON.parse(string);
  const network = new Network();
  for (const listedNode of obj.nodesList ) {
    const newNode = getClass(listedNode).fromObj(listedNode);
    network.include(newNode)
  };
  for (const listedCon of obj.connectionsList ) {
    listedCon.fromNode = network.getNodeByName(listedCon.fromNode);
    listedCon.toNode = network.getNodeByName(listedCon.toNode);
    const newCon = Connection.fromObj(listedCon);
  };
  return network;
};

module.exports = Network


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Organizes deployment of drawer methods

const Drawer = __webpack_require__(24);
const PanelDrawer = __webpack_require__(25);

const CanvasManager = {
  stateCanvas: null,
  nodeCanvas: null,
  selectionCanvas: null,
  offsetter: Drawer.offsetter
}

PanelDrawer.initialize(CanvasManager);

const nav = function (offsetX, offsetY){
  CanvasManager.offsetter.changeOffset(offsetX,offsetY);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.navUp     = nav.bind(null,  0, 40);
CanvasManager.navDown   = nav.bind(null,  0,-40);
CanvasManager.navLeft   = nav.bind(null, 40,  0);
CanvasManager.navRight  = nav.bind(null,-40,  0);

CanvasManager.zoomIn = function(){
  CanvasManager.offsetter.changeProportion(0.2);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.zoomOut = function(){
  CanvasManager.offsetter.changeProportion(-0.2);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.resetZoom = function(){
  CanvasManager.offsetter.resetOffset();
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.create = function(id){
  const canvas = document.createElement("canvas");
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  if (id) { canvas.setAttribute("id", id); }
  document.querySelector('body').appendChild(canvas);
  return canvas
}

CanvasManager.buildNodeCanvas = function(){
  CanvasManager.nodeCanvas = CanvasManager.create("network")
}

CanvasManager.buildStateCanvas = function(){
  CanvasManager.stateCanvas = CanvasManager.create("states")
}

CanvasManager.buildSelectionCanvas = function(){
  CanvasManager.selectionCanvas = CanvasManager.create("selection")
}

var clearNodeCanvas = function(){
  if (!CanvasManager.nodeCanvas){ return }
  CanvasManager.nodeCanvas.remove();
  CanvasManager.buildNodeCanvas();
}

var clearSelectionCanvas = function(){
  if (!CanvasManager.selectionCanvas){ return }
  CanvasManager.selectionCanvas.remove();
  CanvasManager.buildSelectionCanvas();
}

var clearStateCanvas = function(){
  if (!CanvasManager.stateCanvas){ return }
  CanvasManager.stateCanvas.remove();
  CanvasManager.buildStateCanvas();
}

CanvasManager.draw = function(){
  CanvasManager.nodeCanvas = CanvasManager.create("network")
  network.nodes.forEach(function(node){
    Drawer.drawNode(CanvasManager.nodeCanvas, node)
  }) 
}

var drawConnectedNodeNames = function(){
  Drawer.drawNodeName(CanvasManager.selectionCanvas, window.focusedNode)
  for (const node of window.focusedNode.allConnectedNodes()) {
    Drawer.drawNodeName(CanvasManager.selectionCanvas, node)
  }

}

var highlightSelection = function(){
  clearSelectionCanvas();
  if(window.focusedNode){
    Drawer.highlight(CanvasManager.selectionCanvas, window.focusedNode);
    drawConnectedNodeNames();
  }
}

CanvasManager.redraw = function(){
  CanvasManager.nodeCanvas.remove()
  CanvasManager.draw();
  clearSelectionCanvas();
  highlightSelection();
}

CanvasManager.clearStates = function(){
  CanvasManager.stateCanvas.remove()
  CanvasManager.buildStateCanvas()
}

CanvasManager.reColor = function(){
  CanvasManager.clearStates()
  network.callWithNodes( Drawer.fillInNode.bind(null, CanvasManager.stateCanvas) )
}

CanvasManager.shadowNode = function(x,y){
  highlightSelection();
  Drawer.drawNodeShadow(CanvasManager.selectionCanvas,x,y)
}

CanvasManager.drawArrowFromNode = function(node, coords){
  clearSelectionCanvas();
  Drawer.drawArrowFromNode(CanvasManager.selectionCanvas, node, coords)
}

CanvasManager.update = function(){
  network.updateAll();
  network.rememberAll();
  CanvasManager.reColor();
}

CanvasManager.focusNode = function(){
  highlightSelection();
  if (window.focusedNode){
    PanelDrawer.updatePanel(window.focusedNode);
  }
  else {
    PanelDrawer.clearPanel();
  }
}

window.addEventListener('resize', CanvasManager.redraw)

module.exports = CanvasManager;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const canvas = __webpack_require__(17)

const CritterWatcher = {
  initialize: function(critter){
      this.critter = critter;
      canvas.buildCam();
      canvas.drawCritter(window.critter);
      setInterval(checkForUpdate, 50);
  }
};

function handleUpdate(i){
  if ( !i ) { i = 0; CritterWatcher.critter.startAction();  }
  if (i < 5) { setTimeout( function(){canvas.drawCritter( CritterWatcher.critter, i ); handleUpdate(i + 1) }, 100 ) }
  else { CritterWatcher.critter.endAction(); }
};

function needsRerender(){
  return CritterWatcher.critter.ready();
};

function checkForUpdate(){
  if (needsRerender()){ handleUpdate() }
}

module.exports = CritterWatcher;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Handles click events

const Controllers = new Set ([
                            __webpack_require__(11),
                            __webpack_require__(16),
                            __webpack_require__(12),
                            __webpack_require__(14),
                            __webpack_require__(15),
                            __webpack_require__(13)
                           ])
var Canvas;

function initializeInterface(canvasManager){
  Canvas = canvasManager;
  for (controller of Controllers) { controller.initialize(Canvas) }
}

module.exports = {
  initialize: initializeInterface,
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function Critter(){
  this.position = { x: 0, y: 0 }
  this.facing = {x: 1, y: 0}
  this.ongoingAction = null;
  this.actionQueue = [];
};

Critter.prototype.addToQueue = function(func){
  if (this.actionQueue.length > 3) { return  }
  this.actionQueue.push(func);
};

Critter.prototype.ready = function(){
  return !this.ongoingAction && (this.actionQueue.length > 0)
}

Critter.prototype.startAction = function(){
  if (!this.ongoingAction) { this.ongoingAction = this.actionQueue.shift() };
};

Critter.prototype.endAction = function(){
  if (this.ongoingAction) { this.ongoingAction.call(this); }
  this.ongoingAction = null;
}

const performStepForward = function(){
  this.position = addPositions(this.position, this.facing);
};

Critter.prototype.stepForward = function(){
  func = performStepForward;
  func.tagName = "stepForward";
  this.addToQueue(func);
};

const performTurnLeft = function(){
  this.facing = {x: this.facing.y, y: -1 * this.facing.x};
}

Critter.prototype.turnLeft = function(){
  func = performTurnLeft;
  func.tagName = "turnLeft";
  this.addToQueue(func);
}

const performTurnRight = function(){
  this.facing = {x: -1 * this.facing.y, y: this.facing.x};
}

Critter.prototype.turnRight = function(){
  func = performTurnRight;
  func.tagName = "turnRight";
  this.addToQueue(func);
}

function addPositions(pos1, pos2){
  return {x: pos1.x + pos2.x, y: pos1.y + pos2.y};
}

module.exports = Critter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0)
var Canvas;

function inNode(absCoords,node) {
  return inRadius(absCoords, node, 20)
}

function inRadius(absCoords, node, radius) {
  const xDiff =  absCoords.x - node.x;
  const yDiff =  absCoords.y - node.y;
  if (Math.sqrt((xDiff ** 2) + (yDiff ** 2)) < radius) { return true }
}

function getNode(absCoords){
  for (node of network.nodes){
    if ( inNode(absCoords, node) ) { return node }
  }
  return null
};

function adjoinNode(absCoords){
  for (node of network.nodes){
    if ( inRadius(absCoords, node, 40) ) { return true }
  }
  return false
};

function eToAbsCoords(e){
  return Canvas.offsetter.reset({ x: e.offsetX, y: e.offsetY})
}

function eToCoords(e){
  return { x: e.offsetX, y: e.offsetY }
}

function focusOnSelection(node){
  if (node) {
    window.focusedNode = node;
    Canvas.focusNode(node);
  }
}

function connect(node, e){
  const otherNode = getNode(eToAbsCoords(e));
  if (otherNode && !node.pointsTo(otherNode)){
    node.pointTo(otherNode);
    Canvas.redraw();
  }
  focusOnSelection(otherNode);
  document.removeEventListener(e.type, window.mouseUpHandler);
  document.removeEventListener("mousemove", window.mouseMoveHandler);
}

function place(node, e){
  if (e.target.tagName == "CANVAS" && !adjoinNode(eToAbsCoords(e))){
    const coords = eToAbsCoords(e);
    node.x = coords.x;
    node.y = coords.y;
    Canvas.redraw();
    Canvas.reColor();
  }
  document.removeEventListener(e.type, window.mouseUpHandler);
  document.removeEventListener("mousemove", window.mouseMoveHandler);
}

function handleSelectMouseup(e){
  const node = getNode(eToAbsCoords(e));
  focusOnSelection(node);
};

function handleMoveMouseup(e){
  const node = getNode(eToAbsCoords(e));
  focusOnSelection(node);
  if (!node) { return }
  window.mouseUpHandler = place.bind(this, node);
  document.addEventListener("mouseup", window.mouseUpHandler);
};

function shadowMouse(node, e){
  if (!node) { return }
  const coords = eToAbsCoords(e);
  node.x = coords.x;
  node.y = coords.y;
  Canvas.redraw();
  Canvas.reColor();
  // Canvas.shadowNode(coords.x, coords.y);
};

function drawArrow(node, e){
  Canvas.drawArrowFromNode(node, eToCoords(e));
};

function handleMoveMousemove(e){
  const node = getNode(eToAbsCoords(e));
  window.mouseMoveHandler = shadowMouse.bind(this, node);
  document.addEventListener("mousemove", window.mouseMoveHandler);

}

function handlePlaceMouseup(e){
  const node = getNode(eToAbsCoords(e));
  if (!node && !adjoinNode(eToAbsCoords(e))) {
    newCoords = eToAbsCoords(e);
    const node = new Node(newCoords.x, newCoords.y);
    window.focusedNode = node;
    network.include(node);
    Canvas.focusNode();
    Canvas.redraw();
  }
}

function handleToggleMouseup(e){
  const node = getNode(eToAbsCoords(e));
  focusOnSelection(node);
  if (!node) { return }
  node.lastState ? node.off() : node.on()
  node.remember();
  Canvas.reColor();
}

function handleDeleteMouseup(e){
  node = getNode(eToAbsCoords(e))
  if (!node) { return }
  else if (node == window.focusedNode) { window.focusedNode = null; Canvas.focusNode();}
  network.nodes.delete(node);
  node.removeAllConnections();
  Canvas.redraw();
  Canvas.reColor();
}

function selectNewModeHandler(e) {
  for (liElement of document.querySelectorAll('#action_menu li')){
    liElement.classList = liElement.classList.value.replace("selected", "");
  }
  e.currentTarget.classList += 'selected';
  document.querySelector('body').classList = e.currentTarget.getAttribute('data-mode');
  window.editMode = e.currentTarget.getAttribute('data-mode');
}

function assignEditModeHandlers(){
  for ( liElement of document.querySelectorAll('#action_menu li')) {
    liElement.addEventListener("click", selectNewModeHandler);
  };
}

function handleConnectMouseup(e){
  node = getNode(eToAbsCoords(e));
  if (!node) { return }
  focusOnSelection(node);
  window.mouseUpHandler = connect.bind(this, node);
  document.addEventListener("mouseup", window.mouseUpHandler);
}

function handleConnectMousemove(e){
  node = getNode(eToAbsCoords(e));
  if (!node) { return }
  window.mouseMoveHandler = drawArrow.bind(this, node);
  document.addEventListener("mousemove", window.mouseMoveHandler);
}

function handleClear(){
  if (!confirm("Clearing all nodes, connections, and states...")){ return }
  network.reset();
  Canvas.clearStates();
  window.focusedNode = null;
  Canvas.redraw();
};

function assignMouseHandlers(){
  document.addEventListener("mousedown", function(e){
    if (e.target.tagName == "CANVAS" && window.editMode) {
      switch (window.editMode) {
        case "select": 
          handleSelectMouseup(e); break;
        case "move":
          handleMoveMouseup(e);
          handleMoveMousemove(e); break;
        case "place":
          handlePlaceMouseup(e); break;
        case "toggle":
          handleToggleMouseup(e); break;
        case "delete":
          handleDeleteMouseup(e); break;
        case "connect":
          handleConnectMouseup(e);
          handleConnectMousemove(e); break;
      }
    }
  })
  // document.addEventListener("mouseout", handleMouseOut)
}

const ActionController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#clear_button").addEventListener("click", handleClear);
    assignEditModeHandlers();
    assignMouseHandlers();
  }
}

module.exports = ActionController


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Canvas;
const Network = __webpack_require__(6)


function saveNetwork(){
  const blob = new Blob([network.toJSON()], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "network.txt");
}

function loadFile(){
  let file = document.querySelector("input").files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
    const jsonString = reader.result;
    network = Network.fromJSON(jsonString);
    Canvas.redraw();
  };
  reader.readAsText(file);
}


const FileController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#save_button").addEventListener("click", saveNetwork);
    document.querySelector("#load_button").addEventListener("click", function(){document.querySelector("#upload_file").click()});
    document.querySelector("#upload_file").addEventListener("change", loadFile);
  },
}

module.exports = FileController


/***/ }),
/* 13 */
/***/ (function(module, exports) {


function toggleMenuVisibility(menu_id){
  const menu = document.querySelector("#" + menu_id);
  const menuSelector = document.querySelector("#" + menu_id + "_selector");
  menu.classList.toggle("hidden");
  menuSelector.classList.toggle("active_selection");
}

function assignMenuTogglers(){
  for (const li of document.querySelectorAll("#menu_menu li[data-menu]")) {
    li.addEventListener("click", toggleMenuVisibility.bind(this, li.getAttribute('data-menu')));
  }
}

function assignMenuClosers(){
  for (const closer of document.querySelectorAll('[data-close-menu]')) {
    closer.addEventListener('click', toggleMenuVisibility.bind(null, closer.getAttribute('data-close-menu')));
  }
}

function handleMouseMove(menu, startTime, origX, origY, e){
  const curTime = (new Date()).getTime();
  if (curTime - startTime > 700) { 
    menu.style.top = e.clientY - origY + "px";
    menu.style.left = e.clientX - origX + "px";
  }
}

function dragMenu(e){
  const origX = e.offsetX;
  const origY = e.offsetY;
  const startTime = (new Date()).getTime();
  const moveHandler = handleMouseMove.bind(null, e.currentTarget, startTime, origX, origY)
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", document.removeEventListener.bind(document, "mousemove", moveHandler));
}

function assignMenuMovers(){
  for (const menu of document.querySelectorAll(".menu")) {
    menu.addEventListener("mousedown", dragMenu)
  }
}

module.exports = {
  initialize: doEach(assignMenuTogglers, assignMenuMovers, assignMenuClosers)
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var Canvas;

const NavigationController = {
  initialize: function (canvasManager){
    Canvas = canvasManager;
    const handleNavUp = Canvas.navUp;
    const handleNavDown = Canvas.navDown;
    const handleNavLeft = Canvas.navLeft;
    const handleNavRight = Canvas.navRight;
    const handleZoomIn = Canvas.zoomIn;
    const handleZoomOut = Canvas.zoomOut;
    const handleResetZoom = Canvas.resetZoom;
    document.querySelector("#up_button").addEventListener("click", handleNavUp);
    document.querySelector("#down_button").addEventListener("click", handleNavDown);
    document.querySelector("#left_button").addEventListener("click", handleNavLeft);
    document.querySelector("#right_button").addEventListener("click", handleNavRight);
    document.querySelector("#zoom_in_button").addEventListener("click", handleZoomIn);
    document.querySelector("#zoom_out_button").addEventListener("click", handleZoomOut);
    document.querySelector("#reset_zoom_button").addEventListener("click", handleResetZoom);
  }
}

module.exports = NavigationController;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Canvas;
var FuncStore = __webpack_require__(27);

const NodeTypes = {
  Node: __webpack_require__(0),
  FunctionalNode: __webpack_require__(3),
  NoisyNode: __webpack_require__(4)
}

function raiseThreshold(){
  window.focusedNode.threshold++;
  Canvas.redraw();
};

function lowerThreshold(){
  if(window.focusedNode && window.focusedNode.threshold > 1) {
    window.focusedNode.threshold--;
    Canvas.redraw();
  }
};

function changeNodeType(){
  const newNodeTypeName = document.querySelector('#node_type').value;
  const newNodeType = NodeTypes[newNodeTypeName];
  const newNode = window.focusedNode.convertTo(newNodeType);
  window.network.exclude(window.focusedNode);
  window.network.include(newNode);
  window.focusedNode = newNode;
  Canvas.focusNode();
};

function changeNodeFunc(){
  const newNodeFuncName = document.querySelector('#node_func_select').value;
  const newNodeFunc = FuncStore.getFunc(newNodeFuncName);
  window.focusedNode.func = newNodeFunc;
};

function adjustNodeProbabilityRange(e){
  const probability = document.querySelector('#prob_range').value;
  document.querySelector('#prob_value').innerText = probability;
  window.focusedNode.prob = probability;
  e.stopPropagation();
};

function initialize(canvasManager){
  Canvas = canvasManager;
  document.querySelector("#raise_threshold").onclick = doBoth(raiseThreshold, Canvas.focusNode);
  document.querySelector("#lower_threshold").onclick = doBoth(lowerThreshold, Canvas.focusNode);
  document.querySelector("#node_type").onchange = changeNodeType;
  document.querySelector("#node_func_select").onchange = changeNodeFunc;
  document.querySelector("#prob_range").onchange = adjustNodeProbabilityRange;
  document.querySelector("#prob_range").onmousedown = adjustNodeProbabilityRange;
};

const NodePanelController = {
  initialize: initialize
};

module.exports = NodePanelController;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var Canvas;

function handlePlay(){
  if (window.interval){
    clearInterval(window.interval);
    window.interval = undefined;
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
  }
  else {
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-stop" aria-hidden="true"></i>'
    window.interval = setInterval(Canvas.update.bind(null), 1000)
  }
}

const TimeController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#play_button").addEventListener("click", handlePlay )
    document.querySelector("#advance_button").addEventListener("click", Canvas.update);
  }
}

module.exports = TimeController;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const Drawer = __webpack_require__(26);

const CritterCanvasManager = {
  critterCamCanvas: null,
}

CritterCanvasManager.buildCam = function(){
  canvas = document.getElementById("critter_cam");
  canvas.setAttribute('width', 300);
  canvas.setAttribute('height', 300);
  this.critterCamCanvas = canvas;
}

CritterCanvasManager.drawCritter = function(critter, offset){
  Drawer.drawCritter(critter, offset, this.critterCamCanvas);
};

module.exports = CritterCanvasManager;


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


const Canvas = __webpack_require__(7);
__webpack_require__(1);
const Interface = __webpack_require__(9);
const Critter = __webpack_require__(10);
window.critter = new Critter();
__webpack_require__(1);
var CritterWatcher = __webpack_require__(8)

document.addEventListener("DOMContentLoaded", function(){
  Canvas.draw();
  Canvas.buildStateCanvas();
  Canvas.buildSelectionCanvas();
  Canvas.update();
  CritterWatcher.initialize(window.critter);
  Interface.initialize(Canvas);
})


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

const Offsetter = {
  x: 0,
  y: 0,
  proportion: 1
};

function aj(num){
  return Offsetter.proportion * num
}

function rj(num){
  return num / Offsetter.proportion
}

Offsetter.changeOffset = function(x, y){
  Offsetter.x += x;
  Offsetter.y += y;
}

Offsetter.changeProportion = function(diff){
  if (Offsetter.proportion + diff <= .1) { return }
  const oldProp = Offsetter.proportion;
  Offsetter.proportion += diff;
  Offsetter.x += (1000 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / oldProp)) / 2;
  Offsetter.y += (500 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / oldProp)) / 2;
}

Offsetter.resetOffset = function(){
  Offsetter.x = 0;
  Offsetter.y = 0;
  Offsetter.proportion = 1;
}

Offsetter.offset = function(positionable){
  return {
           x: aj(positionable.x + Offsetter.x),
           y: aj(positionable.y + Offsetter.y)
         }
}

Offsetter.reset = function(positionable){
  return {
           x: rj(positionable.x) - Offsetter.x,
           y: rj(positionable.y) - Offsetter.y
         }
}

module.exports = Offsetter;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// Manipulates canvas context

const Drawer = { offsetter: __webpack_require__(23)}

function aj(num){ return (Drawer.offsetter.proportion * num) }

Drawer.drawNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  drawNodeCircle(ctx, node);
  for (let connection of node.connections.to) {
    drawConnection(ctx, connection);
  }
}

Drawer.drawNodeName = function(canvas, node) {
  if (Drawer.offsetter.proportion <= .5) { return }
  const ctx = canvas.getContext('2d');
  const coords = Drawer.offsetter.offset(node);
  ctx.beginPath();
  ctx.fillText(node.name.slice(0,3), coords.x - 5, coords.y + 3);
  ctx.stroke();
  ctx.closePath();
}

const offset = Drawer.offsetter.offset;

Drawer.drawNodeShadow = function(canvas, x, y){
  const ctx = canvas.getContext('2d');
  const coords = Drawer.offsetter.offset({x: x, y: y});
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, aj(10), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawNodeCircle(ctx, node){
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.lineWidth = node.threshold * 3 - 2;
  const coords = offset(node);
  ctx.arc(coords.x, coords.y, aj(20), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawSelfConnection(ctx, connection){
  const toCoords = offset(connection.toNode);
  const connectionMagnitude = connection.strength > 0 ? aj(connection.strength) : aj(-1 * connection.strength);
  const startCoords = {
    x: toCoords.x + radius(connection.toNode) * Math.cos(Math.PI/6),
    y: arcStartY = toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/6)
  } 
  const endCoords = {
    x: toCoords.x - 2 + radius(connection.toNode) * Math.sin(Math.PI/6),
    y: toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/6)
  }
  ctx.arc(startCoords.x, startCoords.y, aj(10), 1.5 * Math.PI, Math.PI);
  drawArrowHead({ x: endCoords.x - (Drawer.offsetter.proportion - 1) * 2.4, y: endCoords.y}, .4, aj(6));
  ctx.stroke();
}

function drawArrowHead(startCoords, angle, length){
  ctx.moveTo(startCoords.x, startCoords.y);
  ctx.lineTo(startCoords.x + length * Math.cos((angle + .2) * Math.PI), startCoords.y + length * Math.sin((angle + .2) * Math.PI));
  ctx.moveTo(startCoords.x, startCoords.y);
  ctx.lineTo(startCoords.x + length * Math.cos((angle - .2) * Math.PI), startCoords.y + length * Math.sin((angle - .2) *  Math.PI));
}

function radius(node){
  return aj(20 + (3 * node.threshold)/2);
}

function drawOtherConnection(ctx, connection){
  const toCoords = offset(connection.toNode);
  const fromCoords = offset(connection.fromNode);
  const connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength);
  const bCoords = getBetweenCoords(fromCoords, toCoords);
  drawArrowFrom(bCoords.fromCoords, bCoords.toCoords, aj(connectionMagnitude));
}

function getBetweenCoords(fromCoords, toCoords){
  const angle = getAngle(fromCoords, toCoords);
  const length = getLength(fromCoords, toCoords);
  const xterminas = toCoords.x + (radius(connection.toNode)) * Math.cos(angle);
  const yterminas = toCoords.y + (radius(connection.toNode)) * Math.sin(angle);
  const xinitiatus = toCoords.x + ((length - radius(connection.fromNode)) * Math.cos(angle));
  const yinitiatus = toCoords.y + ((length - radius(connection.fromNode)) * Math.sin(angle));
  return { fromCoords: {x: xinitiatus, y: yinitiatus}, toCoords: {x: xterminas, y: yterminas} }
}

function drawConnection(ctx, connection){
  ctx.beginPath();
  const connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength);
  ctx.lineWidth = connectionMagnitude;
  ctx.strokeStyle = connection.strength > 0 ? 'black' : 'red';
  if (connection.toSelf()){
    drawSelfConnection(ctx, connection);
  }
  else {
    drawOtherConnection(ctx, connection);
  }
  ctx.strokeStyle = "black";
  ctx.closePath();
}

Drawer.drawArrowFromNode = function(canvas, node, coords){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  const toCoords = coords;
  const fromCoords = offset(node);
  const angle = getAngle(fromCoords, toCoords);
  const length = getLength(fromCoords, toCoords);
  offsetFromCoords = {
          x: toCoords.x + ((length - radius(node)) * Math.cos(angle)),
          y: toCoords.y + ((length - radius(node)) * Math.sin(angle))
  }
  drawArrowFrom(offsetFromCoords, toCoords, 1);
  ctx.closePath();
}

function getAngle(fromCoords, toCoords){
  const xdiff = fromCoords.x - toCoords.x;
  const ydiff = fromCoords.y - toCoords.y;
  const angle = Math.atan2((ydiff),(xdiff));
  return angle
}

function getLength(fromCoords, toCoords){
  const xdiff = fromCoords.x - toCoords.x;
  const ydiff = fromCoords.y - toCoords.y;
  const length = Math.sqrt(ydiff ** 2 + xdiff ** 2);
  return length;
}

function drawArrowFrom(fromCoords, toCoords, width){
  const angle = getAngle(fromCoords, toCoords)
  ctx.moveTo(fromCoords.x, fromCoords.y);
  ctx.lineTo(toCoords.x, toCoords.y);
  drawArrowHead(toCoords, angle / Math.PI, aj(3) + 3 * width);
  ctx.stroke();
  ctx.strokeStyle = 'black';
}

Drawer.highlight = function(canvas, node){
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.arc(offset(node).x,offset(node).y, radius(node) + 3, 0,2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function fillNode(color){
  ctx.arc(offset(node).x,offset(node).y,aj(18),0,2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

Drawer.fillInNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  const color = node.lastState ? "orange" : "white"
  fillNode(color);
  ctx.closePath();
}

module.exports = Drawer


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const FuncStore = __webpack_require__(27)
const PanelDrawer = {
  canvas: null,
}

function writeConnectionDetails(connection, list){
  const listTag = document.createElement("li");
  listTag.innerHTML = `${connection.fromNode.name} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> ${connection.toNode.name}`;
  // listTag.innerHTML = `${connection.fromNode.name} → ${connection.toNode.name}`;
  const raiseButton = document.createElement("button");
  const lowerButton = document.createElement("button");
  const removeButton = document.createElement("button");
  const strength = document.createElement("span");
  const buttonBox = document.createElement("div");
  buttonBox.classList += "button_box";
  strength.innerHTML = connection.strength;
  raiseButton.innerHTML = "<i class='fa fa-plus' aria-hidden='true'></i>";
  lowerButton.innerHTML = "<i class='fa fa-minus' aria-hidden='true'></i>";
  removeButton.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
  raiseButton.addEventListener("click", function(e){connection.increaseStrength(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  lowerButton.addEventListener("click", function(e){connection.decreaseStrength(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  removeButton.addEventListener("click", function(e){connection.remove(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  buttonBox.appendChild(strength);
  buttonBox.appendChild(raiseButton);
  buttonBox.appendChild(lowerButton);
  buttonBox.appendChild(removeButton);
  listTag.appendChild(buttonBox);
  document.querySelector(list).appendChild(listTag);
}

function drawRange(node){
  if (node.constructor.name == 'NoisyNode') {
    document.querySelector('.row.probability').classList.remove('hidden')
    const nodeRange = document.querySelector(`input[type="range"`);
    const nodeRangeValue = document.querySelector(`#prob_value`);
    nodeRange.value = nodeRangeValue.innerHTML = node.prob || 0.5;
  }
  else {
    document.querySelector('.row.probability').classList.add('hidden')
  }
}

function drawNodeType(node){
  const nodeType = document.querySelector(`#node_type [value='${node.constructor.name}']`);
  nodeType.selected = true;
}

function drawNodeFunc(node){
  if (node.constructor.name == "FunctionalNode") {
    document.querySelector('.row.function').classList.remove('hidden');
    const nodeFuncSelect = document.querySelector('#node_func_select');
    buildFuncOptions();
    const nodeFuncOption = document.querySelector(`#node_func_select [value='${node.func.tagName}']`);
    nodeFuncOption.selected = true;
 }
 else {
   document.querySelector('.row.function').classList.add('hidden');
 }
}

function buildFuncOptions(){
  const select = document.querySelector('#node_func_select');
  select.innerHTML = "";
  for ( funcOption of FuncStore.funcs ){
    const newOption = document.createElement('option');
    newOption.name = funcOption.name;
    newOption.innerText = funcOption.name;
    newOption.value = funcOption.name;
    select.appendChild(newOption);
  }
}

function drawConnections(node){
  document.querySelector("#afferent_connection_list").innerHTML = "";
  document.querySelector("#efferent_connection_list").innerHTML = "";
  for (const connection of node.connections.to){
    writeConnectionDetails(connection, "#afferent_connection_list");
  }
  for (const connection of node.connections.from){
    writeConnectionDetails(connection, "#efferent_connection_list");
  }
}

function drawNodeName(node){
  const nodeName = document.querySelector("#node_name");
  nodeName.value = node.name
  nodeName.oninput = function(){ node.name = document.querySelector("#node_name").value; PanelDrawer.canvas.redraw();}
}

function drawNodeThreshold(node){
  document.querySelector("#node_threshold").innerHTML = node.threshold;
}

PanelDrawer.updatePanel = function(node){
  for (el of document.querySelectorAll('#node_menu > *')){ el.classList.remove('hidden')}
  drawNodeName(node);
  drawNodeThreshold(node);
  drawNodeType(node);
  drawRange(node);
  drawNodeFunc(node);
  drawConnections(node);
}

PanelDrawer.clearPanel = function(){
  for (el of document.querySelectorAll('#node_menu > *')){ el.classList.add('hidden')}
}

PanelDrawer.initialize = function(canvas){
  this.canvas = canvas;
}
module.exports = PanelDrawer;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

const CritterDrawer = {};

function getBillyImage(critter){
  var billyImage = new Image();
  billyImage.src = getImage(critter);
  billyImage.height = 100;
  billyImage.width = 100;
  billyImage.style.background = "grey"
  return billyImage
};

function getImage(critter){
  if (forward(critter)) { return "images/billy.png"; }
  else { return "images/billyturn.png"; }
}

function adjustContextForFacing(ctx, critter, i){
  if (critter.facing.x != 0) { ctx.rotate( critter.facing.x * Math.PI / 2); }
  if (critter.facing.y != 0) { ctx.rotate( (critter.facing.y + 1) / 2 * Math.PI ); }
  if (turnRight(critter)) { ctx.rotate( Math.PI * centerWeight(i) / 8) }
  if (turnLeft(critter)) { ctx.rotate( -1 * Math.PI * centerWeight(i) / 8) }
}

function centerWeight(i){
  if (i == 0) return 0
  if (i == 1) return 2
  if (i >= 2) return 4
}

function adjustContextForPosition(ctx, critter, i, canvas){
  ctx.translate(canvas.width/2, canvas.height/2);
  translate = getActionTranslate(critter, i);
  ctx.translate(translate.x, translate.y);
}

function getTranslateForward(critter, i) {
  return {
    x: critter.position.x * 8 + i * 2 * critter.facing.x,
    y: critter.position.y * 8 + i * 2 * critter.facing.y
  }
}

function forward(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "stepForward";
};

function turnRight(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "turnRight";
};

function turnLeft(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "turnLeft";
};

function getActionTranslate(critter, i){
  if (forward(critter)) { return getTranslateForward(critter, i) }
  else { return getTranslateForward(critter, 0) }
}

const drawFrame = function(ctx, critter, billyImage, i, canvas){
  adjustContextForPosition(ctx, critter, i, canvas);
  adjustContextForFacing(ctx, critter, i);
  ctx.drawImage( billyImage, 100 * (i % 4), 0, 100, 100, -20, -20, 40, 40);
};

CritterDrawer.drawCritter = function(critter, i, canvas){
  ctx = canvas.getContext('2d');
  var billyImage = getBillyImage(critter);
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(ctx, critter, billyImage, i, canvas);
  ctx.restore();
};

module.exports = CritterDrawer;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

const funcs =  [
  { name: "None", func: function(){} },
  { name: "Move!", func: function(){window.critter.stepForward()} },
  { name: "Right!", func: function(){window.critter.turnRight()} },
  { name: "Left!", func: function(){window.critter.turnLeft()} }
];

for (funcData of funcs) {
  funcData.func.tagName = funcData.name;
};

const FuncStore = {
  funcs: funcs
};

FuncStore.getFunc = function(funcName){
  for (funcData of funcs){
    if (funcName == funcData.name) { return funcData.func; }
  }
  return funcs[0].func
};

module.exports = FuncStore;


/***/ })
/******/ ]);
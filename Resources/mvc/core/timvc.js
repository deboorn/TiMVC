/**
 * @fileoverview This file contains the core framework class TiMVC.
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


var mainSpace = this;//save main namespace for reference

/**
 * TiMVC Framework Class
 * @class This is the core TiMVC framework class
 * @param {Object} config appliation config data
 * @author Daniel Boorn info@timvc.com
 * @version 1.2.1.1 (1.2 beta 1)
 */
var TiMVC = function(config){
	/**
	 * default config settings
	 * @type Object
	 */
	this.config = config;
	/**
	 * relative base path
	 * @type String
	 */
	this.relBasePath = "../../";
	/**
	 * util object for utility function storage
	 * @type Object
	 */
	this.util = {};//util storage
	/**
	 * stores current activity indicator (if needed)
	 * @type Titanium.UI.ActivityIndicator
	 */
	this.actInd = null;
	/**
	 * saves reference to this
	 * @type Pointer
	 */
	var self = this;
	

	/**
	 * Calc distance in miles between two lat/lng ponts.
	 * @param {Number} lat1
	 * @param {Number} lng1
	 * @param {Number} lat2
	 * $param {Number} lng2
	 * @returns the distance between the two points
	 */
	this.util.distanceTwoPoints = function(lat1,lng1,lat2,lng2){
		var R = 3959; // mi
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lng2-lng1) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
		        Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return R * c;		
	}
	
	/**
	 * Creates activity indicator with message
	 * @param {String} message
	 * @returns an styled Titanium.UI.ActivityIndicator with supplied message
	 */
	this.util.createActInd = function(message){
		
		var actInd = Titanium.UI.createActivityIndicator({
		    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		    bottom:self.util.dP(100),
		    height:self.util.dP(100),
		    width:self.util.dP(200),
		    "message":message,
		    color:'white'
		});
		if(self.iPhone){
			self.window.add(actInd);
		}
		return actInd;
	}	
	
	/**
	 * Show activity indicator
	 * @param {String} message
	 */
	this.util.showActInd = function(message){
		self.actInd = self.util.createActInd(message);
		self.actInd.show();
	}
		
	/**
	 * Hide actity indicator
	 */
	this.util.hideActInd = function(){
		if(self.actInd) self.actInd.hide();
	}
	
	/**
	 * Attempt to obtain current location lat/lng
	 * @param {Function} onFix function to be called to handle fix event
	 * @param {Function} onError function to be call to handle error event
	 */
	this.util.currentPosition = function(onFix,onError){
		Titanium.Geolocation.purpose = "Sort Items by Distance";
		
		Titanium.Geolocation.getCurrentPosition(function(e){
			if(e.error){
				onError(e);
				return;
			}
			onFix(e);//e.g. e.coords.latitide;
		});
	}
	
	/**
	 * Get px from densityPixels
	 * @param {Number} densityPixels
	 * @returns an adjusted pixel value based on supplied density pixels and a medium dpi of 160
	 */
	this.util.dP = function (densityPixels) {
		//medium dpi is 160, this will scale to medium
        var px = densityPixels*Ti.Platform.displayCaps.dpi/160;
        return px;
    }
    
    /**
     * Ajax Get Request with JSON parse on responce data
     * @param {String} url
     * @param {Object} data
     * $param {Function} onload function to be called for a good load event
     */
    this.util.getJSON = function(url,data,onload){
    	
    	//debug
    	self.sysDebug('timvc: attempting to fetch data via ajax.')
    	self.sysDebug(url);
    	self.sysDebug(data);
    	
    	var xhr = Titanium.Network.createHTTPClient();
    	xhr.onload = function(){
			var jsonStr = this.responseText;
    		try{
    			var data = JSON.parse(jsonStr);
    			onload(data);
    		}catch(e){
    			alert(this.responseText);
    			self.debug(e);
			}
    	}
    	xhr.onerror = function(){
    		self.notice('Failed to connect to internet. Are you connect to a network?');
    	}
    	xhr.open('GET',url);
    	xhr.send(data);
    }
    
    /**
     * Trim string
     * @param {String} str
     * @returns a trim string
     * @author http://blog.stevenlevithan.com/archives/faster-trim-javascript
     */
    this.util.trim = function (str) {//http://blog.stevenlevithan.com/archives/faster-trim-javascript
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	}
		
	/**
	 * Uppercase first letter in string
	 * @param {String} str
	 * @returns an ucfirst string
	 * @author http://phpjs.org/functions/ucfirst:568
	 */
	this.util.ucFirst = function(str) {//http://phpjs.org/functions/ucfirst:568
	    str += '';
	    var f = str.charAt(0).toUpperCase();
	    return f + str.substr(1);
	}
	
	/**
	 * Creates new application window
	 * @param {String} title new window title
	 * @param {String} route controller/action route string
	 * @param {Object} data json data to be passed to route (new window)
	 * @returns Titanium.UI.Window
	 */
	this.util.createWindow = function(title,route,data){
		var win = Titanium.UI.createWindow({
			"title":title,url:self.config.resDir + 'app.js',"route":route,request:JSON.stringify(data)
		});
		win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT];
		return win;
	}
	
	/**
	 * Return Relative Path
	 * @param {String} path
	 * @returns an relative path string
	 */
	this.util.getRelPath = function(path){
		return self.relBasePath + path;
	}
	
	/**
	 * Display Notice Message 
	 * @param {Object} s 
	 */
	this.notice = function(s){
		alert(s);
	}
	
	/**
	 * System Debug Output
	 * @param {Object} s 
	 */
	this.sysDebug = function(s){
		Titanium.API.info(s);
	}
	
	/**
	 * General Debug Output
	 * @param {Object} s 
	 */
	this.debug = function(s){
		//alert(s);
		Titanium.API.info(s);
	}
	
	/**
	 * Execute controller call via route. 
	 * @param {String} title new window title
	 * @param {String} route controller/action route string
	 * @param {Object} data json data to be passed to route (new window)	 
	 */
	this.loadRoute = function(title,route,data){
		var window = Titanium.UI.createWindow({
			"title":title,url:self.config.resDir + 'app.js',"route":route,request:JSON.stringify(data),backgroundColor:'#000',navBarHidden:false
		});
		self.openWindow(window);
	}
	
	/**
	 * Close all non root windows
	 */
	this.closeNonRootWindows = function(){
		while(self.window._parent){
			self.closeWindow(self.window);
			self.window = self.window._parent;
		}
	}
	
	/**
	 * Opens new window that has route information
	 * @param {Titanium.UI.Window} window requires window with route and json data
	 * @requires window created with TiMVC class that contains route and json data
	 */
	this.openWindow = function(window){
		window._parent = self.window;

		if(self.iPhone){
			window.navGroup = self.window.navGroup;
			self.window.navGroup.open(window,{animated:true});
		}else{
			
			window.open();
		}
	}
	
	/**
	 * Closes current window
	 */
	this.closeWindow = function(){
		if(self.iPhone){
			self.window.navGroup.close(self.window,{animated:false});
			return;
		}
		self.window.close();
	}
	
	
	/**
	 * Opens root application window and/or navigation group on iOS
	 */
	this.openRootWindow = function(){
		self.window = Titanium.UI.createWindow({
			title:self.config.appName,navBarHidden:true,exitOnClose:true,url:self.config.resDir + 'app.js',route:'main/home',request:"{}",backgroundColor:'#000'
		});
		self.window.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT];
		if(self.iPhone){
			self.rootWindow = Titanium.UI.createWindow();
			self.window.navGroup = Titanium.UI.iPhone.createNavigationGroup({window: self.window});
			self.rootWindow.add(self.window.navGroup);
			self.rootWindow.open();
		}else{
			self.window.open();
			var activity = Ti.Android.currentActivity;
			activity.onCreateOptionsMenu = function(e){
				var menu = e.menu;
				var menuItem = menu.add({
					title: "Exit"
				});
				menuItem.addEventListener("click", function(e){
					self.window.close();
				});
			}
		}
		
	}
	
	/**
	 * Load model from file by name
	 * @param {String} name model name based on model path in config (usally /mvc/models/)
	 * @returns boolean with load status
	 */
	this.loadModel = function(name){
		var path = self.config.modelPath + name + ".js";
		var r = self.includeFile(path);
		if(!r) return false;
		mainSpace[self.util.ucFirst(name)].prototype = new Model(self);
		return true;
	}
	
	/**
	 * Load componet from file by name
	 * @param {String} name componet name based on component path in config (usally /mvc/components)
	 * @returns boolean with load status
	 */
	this.loadComponent = function(name){
		var path = self.config.componentPath + name + ".js";
		var r = self.includeFile(path);
		if(!r) return false;
		return true;
	}
	
	/**
	 * Includes JavaScript file into application. Used by TiMVC class. Use load functions instead to load model or component.
	 * @param {String} path path to javascript file
	 * @returns boolean with load status
	 * @private
	 */
	this.includeFile = function(path){
		try{
			Titanium.include(self.config.resDir + path);
			return true;
		}catch(e){
			self.notice('Cannot Include File: ' + path);
			self.debug(self.config.resDir + path);
			return false;
		}
	}
	
	/**
	 * Parses route path string into controller and action
	 * @param {String} routePath route string for example "controller/action"
	 * @returns object route path
	 * @private
	 */
	this.parseRoutePath = function(routePath){
		var parts = routePath.split('/');
		//validate parts: 0 => controller, 1 => action
		if(parts.length!=2){
			self.notice('Invalid Route!');
			self.debug(routePath);
			return false;
		}
		return {controller:parts[0],action:parts[1]};
	}
	
	/**
	 * Creates request data object with route and request json from routed window
	 * @private
	 * @returns data object or boolean on fail
	 */
	this.getRequestData = function(){
		var data = {};
		try{ 
			data.routePath = self.window.route;
			data.requestJson = self.window.request;
			return data;
		}catch(e){
			self.notice('Invalid Route Request');
			self.debug(e);
			return false;
		}
	}
	
	/**
	 * Process route request
	 * @param {String} route
	 * @param {String} json json stringified
	 * @private
	 * @returns boolean with result status
	 */
	this.processRequest = function(route,jsonStr){
		try{//parse json data
			var data = JSON.parse(jsonStr);
		}catch(e){
			self.notice('Cannot parse window request json.');
			self.debug(jsonStr);
			self.debug(e);
			return false;
		}
		var cPath = self.config.resDir + self.config.controllerPath + route.controller + ".js";
		self.sysDebug("timvc: attempting to fetch controller: " + cPath);
		
		try{//include controller
			Titanium.include(cPath);
		}catch(e){
			self.notice('Cannot find controller ' + route.controller);
			self.debug(cPath);
			return false;
		}
		try{//execute action
			mainSpace[self.util.ucFirst(route.controller)].prototype = new Controller;
			self.activeController = new mainSpace[self.util.ucFirst(route.controller)]();
			self.activeController.setName(route.controller);
			self.activeController.setApp(self);
			self.activeController[route.action](data);
		}catch(e){
			self.notice('Cannot execute controller action ' + route.action);
			self.debug(e);
			return false;
		}
		
	}
	
	/**
	 * Route window to requested controller and action
	 * @private
	 * @returns boolean on fail
	 */
	this.routeWindow = function(){
		var data = self.getRequestData();
		self.debug(data);
		if(!data) return false;
		var route = self.parseRoutePath(data.routePath);
		self.debug(route);
		if(!route) return false;
		self.processRequest(route,data.requestJson);
	}
	
	/**
	 * Update current window with route and request object (stringified)
	 * @param {String} route
	 * @param {Object} request
	 * @private
	 */
	this.setWindowRoute = function(route,request){
		self.window.route = route;
		self.window.request = JSON.stringify(request);
	}
	
	/**
	 * Sets route to default in active window
	 * @private
	 */
	this.setRouteDefault = function(){
		self.window.route = "main/home";
		self.window.request = "{}";
	}
	
	/**
	 * Set current active window
	 * @private
	 * @returns boolean with result status
	 */
	this.setCurrentWindow = function(){
		if(Titanium.UI.currentWindow!=null){
			self.window = Titanium.UI.currentWindow;
			return true;
		}else{//or, create root window
			return false;
		}
	}
	
	/**
	 * Include base component javascript classes
	 * @private
	 */
	this.includeBaseComponents = function(){
		Titanium.include(self.config.resDir + self.config.componentPath + "controller.js");//required!!
		Titanium.include(self.config.resDir + self.config.componentPath + "view.js");//required!!
		Titanium.include(self.config.resDir + self.config.componentPath + "database.js");//required!!
		Titanium.include(self.config.resDir + self.config.componentPath + "model.js");//required!!
	}
	
	/**
	 * Detect Platform
	 * @private
	 */
	this.detectPlatform = function(){
		if(Titanium.Platform.name == 'iPhone OS'){
			self.iPhone = true;		
		}else{
			self.iPhone = false;
		}
	}
	
	/**
	 * Connect to databse (if needed)
	 * @private
	 */
	this.invokeDatabase = function(){
		if(self.config.database.name){
			try{
				var path =  self.config.databasePath + self.config.database.name;
				self.sysDebug('timvc: attempting to install database from path ' + path);
				self.Db = new Database(path,self.config.database.name);
			}catch(e){
				self.notice('Cannot connect/install database ' + self.config.database.name);
				self.debug(e);
			}
		}
	}
	
	/**
	 *  Init Call (construct)
	 * @constructor
	 * @private
	 */
	this._init = function(){
		self.includeBaseComponents();
		self.invokeDatabase();
		self.detectPlatform();
		var r = self.setCurrentWindow();
		if(!r){
			self.openRootWindow();
		}else{
			self.routeWindow();
		}
	}
	
	this._init();//construct
}

//invoke main application
this.App = new TiMVC(CONFIG);

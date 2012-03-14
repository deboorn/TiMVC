/**
 * @fileoverview This file contains base controll class for mvc
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var mainSpace = this;//save main namespace

/**
 * Controller Class base controller class
 * @class This is the base Controller class
 */
var Controller = function(){
	/**
	 * Default layout to be used. Usally set to "default" to use layout /mvc/views/layouts/default.js
	 * @type String
	 */
	this.layout = "default";//default main layout file, this can be used to change layouts on the fly, e.g. tablet vs small screen, override this in inheritied classes
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * place you base controller methods here to be inherited
	 */	
	
	/**
	 * Set Appliation Class Reference
	 * @param {TiMVC} set main app TiMVC class refernce used by TiMVC
	 */
	this.setApp = function(a){
		self.App = a;
	}
	
	/**
	 * Set Layout string
	 * @param {String} set layout name string
	 */
	this.setLayout = function(l){
		self.layout = l;
	}
	
	/**
	 * Render View Class with Layout Class
	 * @param {View} activeView active view class
	 * @private
	 */
	this.renderWithLayout = function(activeView){
		self.App.includeFile(self.App.config.viewPath + "layouts/" + self.layout + ".js");
		self.layout = new Layout(activeView,self.App,self);
	}
	
	/**
	 * Render View Class
	 * @param {View} view name of view file for controller located in the /mvc/views/<controller_name>/ folder or //<controller_name>/viewfile
	 * @param {Object} data object data to be sent to view
	 * @returns boolean on fail
	 */
	this.render = function(view,data){
		if(view.replace("//","")!=view){//allow for double forward slash path
			self.App.includeFile(self.App.config.viewPath + view.replace("//","") + ".js");
			view = view.replace("//","").split("/");
			view = view[view.length-1];
		}else{//relative path to current controller
			self.App.includeFile(self.App.config.viewPath + self.namePath + view + ".js");
		}
		try{//assign vars
			mainSpace[self.App.util.ucFirst(view)].prototype = new View;
			self.activeView = new mainSpace[self.App.util.ucFirst(view)](self.App,self,data);
			//render in main layout
			self.renderWithLayout(self.activeView);
		}catch(e){
			self.App.notice('Cannot load view: ' + view);
			self.App.debug(e);
			return false;
		}
	}
	
	/**
	 * Set controller class name
	 * @param {String} controller name
	 */
	this.setName = function(str){
		self.name = str;
		self.namePath = str + "/";
	}
	
	/**
	 * Show inheritance example
	 */
	this.showInherit = function(){
		alert('Hello from parent base controller!');
	}
	
	/**
	 * Class init (construct)
	 * @constructor
	 */
	this._init = function(){
		//optional construct call
		//self.showInherit();
	}
	
	this._init();//construct
}
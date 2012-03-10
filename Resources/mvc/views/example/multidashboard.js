/**
 * @fileoverview This file contains the Multidashboard View class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Mutlidashboard View Class
 * @class This is the Multidashboard View class, inherits from View.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller Controller class object
 * @param {Object} data object data
 */
var Multidashboard = function(app,controller,data){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * @type Controller
	 */
	this.Controller = controller;
	/**
	 * @type Object
	 */
	this.data = data;
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/view.js
	 */
	
	/**
	 * add content to view for use by layout
	 */
	this.addContent = function(){
		var settings = {width:self.App.util.dP(75),height:self.App.util.dP(85),margin:self.App.util.dP(10),padding:self.App.util.dP(6)};
		var clickHandler = function(e){
			self.App.loadRoute(e.source.label,e.source.route,e.source.request);
		}
		self.App.loadComponent('scrollablegridview');
		var dashboard = new createScrollableGridView(self.data.items,settings,clickHandler);
		this.rootView = dashboard;
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}
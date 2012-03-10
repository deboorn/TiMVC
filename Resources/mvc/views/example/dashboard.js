/**
 * @fileoverview This file contains the Dashboard View class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Dashboard View Class
 * @class This is the Dashboard View class, inherits from View.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller Controller class object
 * @param {Object} data object data
 */
var Dashboard = function(app,controller,data){
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
	 * generate dashboard items
	 * @returns array of items
	 */
	this.genDashboardItems = function(){
		var list = [];
		for(var i=0;i<self.data.items.length;i++){
			list.push(
				Titanium.UI.createDashboardItem({
					label:self.data.items[i].label,
					image:self.data.items[i].image,
					selectedImage:self.data.items[i].selectedImage,
					route:self.data.items[i].route,
					request:self.data.items[i].request
				})
			);
		}	
		return list;
	}
	
	/**
	 * please note that self.rootView is required by controller layout for rendering
	 */
	
	/**
	 * add content to view for use by layout
	 */
	this.addContent = function(){
		var items = self.genDashboardItems();
		var dashboardView = Titanium.UI.createDashboardView({
			data:items,id:'dashboard1'
		});
		dashboardView.addEventListener('click',function(e){
			self.App.loadRoute(e.item.label,e.item.route,e.item.request);
		});
		
		self.rootView = dashboardView;
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}
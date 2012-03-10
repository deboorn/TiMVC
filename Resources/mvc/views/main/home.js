/**
 * @fileoverview This file contains the Home View class. This is an example of a view class.
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Home View Class
 * @class This is the Home View class, inherits from View. This is an example of a view class.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller active controller object
 * @param {Object} data object passed from active controller action 
 */
var Home = function(app,controller,data){
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
		self.rootView = Titanium.UI.createTableView({
			data:self.data.list
		});
		self.rootView.addEventListener('click',function(e){
			if(e.rowData.newWindow){
				self.App.loadRoute(e.rowData.title,e.rowData.route,e.rowData.request);
			}else{
				self.App.setWindowRoute(e.rowData.route,e.rowData.request);
				self.App.routeWindow();
			}
		});
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}
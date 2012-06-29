/**
 * @fileoverview This file contains the Example controller class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Example Controller Class
 * @class This is the Example controller class, inherits from Controller
 */
var Example = function(){
	/**
	 * @type Pointer
	 */
	var self = this;
	//this.layout = "default";//override default layout
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * Place your actions here...
	 */
	
	/**
	 * tabgroup action -- loads a tab group ui with the default layout 
	 * @param {Object} r json request object sent by routing window
	 */
	this.tabgroup = function(r){
		
		var tabs = [];
		
		var tabWin1 = self.App.util.createWindow('Tab Window 1','tab/window1',{});
		tabs.push({title:"Tab 1",window:tabWin1});
		
		var tabWin2 = self.App.util.createWindow('Tab Window 2','tab/window2',{});
		tabs.push({title:"Tab 2",window:tabWin2});
		
		var tabWin3 = self.App.util.createWindow('Tab Window 3','tab/window3',{});
		tabs.push({title:"Tab 3",window:tabWin3});
		
		var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});
		for(var i=0;i<tabs.length;i++){
			tabGroup.addTab(Titanium.UI.createTab({
				title:tabs[i].title,
				window:tabs[i].window
			}));
		}
		
		tabGroup.setActiveTab(1);
		tabGroup.open();
		Ti.App.addEventListener('closeTabs',function(e){
			tabGroup.close();
		});
		
	}

	/**
	 * dashboard action -- loads a dashboard ui with the default layout and /mvc/views/example/dashboard.js view file
	 * @param {Object} r json request object sent by routing window
	 */
	this.dashboard = function(r){
		var labels = ['account','cases','calls','contacts','emps','leads','meetings','opps','tasks'];
		var items = [];
		for(var i=0;i<labels.length;i++){
			items.push({
				label:labels[i],
				image:self.App.config.resDir + self.App.config.imagePath + "dashboard/" + labels[i] + "_off.png",
				selectedImage:self.App.config.resDir + self.App.config.imagePath + "dashboard/" + labels[i] + "_on.png",
				route:'dashboard/test',
				request:{name:labels[i]}
			});
		}
		//render with /mvc/views/example/dashboard.js, send data to view
		self.render('dashboard',{"items":items});
	}
	
	/**
	 * multidashboard action -- loads a dashboard ui with the default layout and /mvc/views/example/multidashboard.js view file
	 * @param {Object} r json request object sent by routing window
	 */
	this.multidashboard = function(r){
		var labels = ['account','cases','calls','contacts','emps','leads','meetings','opps','tasks'];
		var items = [];
		for(var c=0;c<2;c++){//send enouph for paging
			for(var i=0;i<labels.length;i++){
				items.push({
					label:labels[i],
					image:self.App.config.resDir + self.App.config.imagePath + "dashboard/" + labels[i] + "_off.png",
					selectedImage:self.App.config.resDir + self.App.config.imagePath + "dashboard/" + labels[i] + "_on.png",
					route:'dashboard/test',
					request:{name:labels[i]}
				});
			}
		}
		//render with /mvc/views/example/dashboard.js, send data to view
		self.render('multidashboard',{"items":items});
	}

	/**
	 * database action -- loads example model that uses a database
	 * @param {Object} r json request object sent by routing window 
	 */
	this.database = function(r){
		
		self.App.loadModel('setting');//load setting model (/mvc/models/setting.js)
		
		var setting = new Setting(self.App);
		
		alert("Setting 'Test' current value: " + setting.getSetting('test'));
		alert("Saving 'Test' to value: " + r.message);
		setting.setSetting('test',r.message);
		alert("Setting 'Test' new saved value: " + setting.getSetting('test'));		

		//self.App.closeWindow();
		
	}
	
	
}
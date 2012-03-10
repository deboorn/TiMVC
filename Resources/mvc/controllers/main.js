/**
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Main Controller Class
 * @class This is the Main controller class, inherits from Controller. Main.home will be called by TiMVC by default.
 */
var Main = function(){
	 /**
	  * @type Pointer
	  */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * place your actions here...
	 */
	
	/**
	 * home action -- DEFAULT ACTION OF APPLICATION
	 * @param {Object} r json request object sent by routing window
	 */
	this.home = function(r){
		//build table data to be used in table ui
		var list = [];
		list.push({title:"Tab Example",route:"example/tabgroup",request:{},hasChild:true,newWindow:false,height:self.App.util.dP(50)});
		if(self.App.iPhone){
			list.push({title:"iPhone Only Dashboard Example",route:"example/dashboard",request:{},hasChild:true,newWindow:true,height:self.App.util.dP(50)});
		}
		list.push({title:"Multi-Dashboard Example",route:"example/multidashboard",request:{},hasChild:true,newWindow:true,height:self.App.util.dP(50)});
		list.push({title:"Database Example",route:"example/database",request:{message:'Hello from the database!'},hasChild:true,newWindow:true,height:self.App.util.dP(50)});
		
		//render /mvc/views/main/home.js view file with data
		self.render('home',{"list":list});
	}

	
}
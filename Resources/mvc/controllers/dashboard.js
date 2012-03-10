/**
 * @fileoverview This file contains the Dashboard controller class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Dashboard Controller -- Example Controller Class
 * @class This is the Dashboard controller class, inherits from Controller
 */
var Dashboard = function(){
	/**
	 * @type Poitner
	 */
	var self = this;
	
	//this.layout = "default";//override default layout
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * place your action functions here...
	 */
	
	/**
	 * test action example that renders a hello world style message from the /mvc/views/dashboard/simplewindow.js view file
	 * @param {Object} r json request object sent by routing window
	 */
	this.test = function(r){
		//self.layout = "altlayout";//override default layout (if needed)
		
		/*
		 * alternativly you can specify the path to the view
		 * self.render('//tabs/simplewindow',{labelText:"Hello from "+r.name+" window!"});
		 */
		
		self.render('simplewindow',{labelText:"Hello from "+r.name+" window!"});
		
	}
	
}
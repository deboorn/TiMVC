/**
 * @fileoverview This file contains the Tab controller class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Tab Controller Class
 * @class This is the Tab controller class, inherits from Controller.
 */
var Tab = function(){
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * Place your actions here...
	 */
	
	/**
	 * window1 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window1 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window one!"});
	}
	
	/**
	 * window2 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window2 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window two!"});
	}
	
	/**
	 * window3 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window3 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window three!"});
	}
	
	
}
/**
 * @fileoverview This file contains base view class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * View Class
 * @class This is the View base class
 * @param {TiMVC} app class app object for TiMVC
 * @param {Controller} controller controller class object
 */
var View = function(app,controller,data){
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	/**
	 * root view used by layout. eg. Titanium.UI.View, required by layout
	 * @type Titanium.UI.View
	 */
	this.rootView = null;
	
	/**
	 * place you base view methods here to be inherited
	 */
	
	/**
	 * Returns root view object, called by layout class
	 * @returns self.rootView of View class
	 */
	this.getContent = function(){
		return this.rootView;
	}
	
	/**
	 * Start object (construct)
	 * @constructor
	 */
	this._start = function(){
		//do something....
	}
	
	this._start();//(construct)
	
}
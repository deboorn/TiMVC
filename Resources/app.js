/**
 * @fileoverview This file contains the main application config file used by the TiMVC class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * CONFIG object required by TiMVC class. 
 * @type Object 
 */
var CONFIG = {
	/**
	 * Main application name to be displayed in main application window title (if needed)
	 * @type String
	 */
	appName: "TiMVC Framework Demo",//main appliation window title
	/**
	 * Path to resources directory
	 * @type String
	 */
	resDir: Titanium.Filesystem.resourcesDirectory,
	/**
	 * Base path to MVC 
	 * @type string
	 */
	basePath: "mvc/",
	/**
	 * Core path to MVC
	 * @type String
	 */
	corePath: "mvc/core/",
	/**
	 * Controller path
	 * @type String
	 */
	controllerPath: "mvc/controllers/",
	/**
	 * Model path
	 * @type String
	 */
	modelPath: "mvc/models/",
	/**
	 * View path
	 * @Type String
	 */
	viewPath: "mvc/views/",
	/**
	 * Component path
	 * @type String
	 */
	componentPath: "mvc/components/",
	/**
	 * Asset path
	 * @type String
	 */
	assetPath: "mvc/assets/",
	/**
	 * Image path
	 * @type String
	 */
	imagePath: "mvc/assets/images/",
	/**
	 * Database folder path
	 * @type String
	 */
	databasePath: "mvc/assets/databases/",
	 /**
	 * Database filename object
	 * @type {Object}
	 */
	database: {
		/**
		 * filename of database
		 * @type String
		 */
		name: "app.sqlite",//database name
	},
	/**
	 * Optional params to global use in App class files (e.g. self.App.config.params)
	 * @type {Object}
	 */
	params: {
		fooBar1: 'store you global params here',
		fooBar2: 'store your global params here'
	},
}

/**
 * Where to go from here? Try the default controller file /mvc/controllers/main.js. The Main.home function is the default action.
 */


//bootstrap TiMVC framework!
Titanium.include(CONFIG.resDir + CONFIG.corePath + "timvc.js");


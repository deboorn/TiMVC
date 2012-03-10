/**
 * @fileoverview This file contains the simple database class used by TiMVC class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Database Class
 * @class This is the simple database class
 * @param {String} path database path, usally this is passed by TiMVC class
 * @param {Name} database filename, usally this is passed by TiMVC class
 */
function Database(path,name){
	/**
	 * database object
	 * @type Object
	 */
	this.conn;//database object
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	
	
	/**
	 * Invoke database installation and/or connection
	 * @param {String} path path to database
	 * @param {String} name name of database
	 */
	this.open = function(path,name){
		this.connectInstallDatabase(path,name);
	}

	/**
	 * Install and connect database
	 * @param {String} path path to database
	 * @param {String} name name of database
	 * @private
	 */
	this.connectInstallDatabase = function(path,name){
		this.conn = Titanium.Database.install(path,name);
	}
	
	/**
	 * Close active database connection
	 */
	this.close = function(){
		this.conn.close();
	}
	
	/**
	 * Execute begin transaction statement
	 */
	this.beginTrans = function(){
		this.conn.execute('BEGIN IMMEDIATE TRANSACTION');
	}
	
	/**
	 * Execute end transaction statement
	 */
	this.endTrans = function(){
		this.conn.execute('END TRANSACTION');
	}
	
	/**
	 * @constructor
	 */
	this.open(path,name);//(construct)
	
}
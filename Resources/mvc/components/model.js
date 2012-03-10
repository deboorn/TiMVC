/**
 * @fileoverview This file contains the base model class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


var mainSpace = this;//save main namespace

/**
 * Model Class -- base controller class
 * @class This is the base Model class
 * @param {TiMVC} app TiMVC class object, usally this is passsed by the TiMVC class
 */
var Model = function(app){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * save reference to this
	 * @type Pointer
	 */	
	var self = this;
	
	/**
	 * place you base model methods here to be inherited
	 */	
	
	
	/**
	 * Set Appliation Database Reference
	 * Database Class
	 * @param {Database} db database class object
	 */
	this.setDb = function(db){
		self.Db = db;
	}
	
	/**
	 * Show inheritance example
	 */
	this.showInherit = function(){
		alert('Hello from parent base model!');
	}
	
	/**
	 * Find Record by Primary Key
	 * @param {String} keyValue primary key
	 */
	this.findByPk = function(keyValue){
		var sql = "select * from " + this.dbTableName + " where " + this.primaryKey + " = ? ";
		return this.Db.conn.execute(sql,keyValue);
	}

	/**
	 * Delete Record by Primary Key
	 * @param {String} keyValue primary key
	 */	
	this.delByPk = function(keyValue){
		var sql = "delete from " + this.dbTableName + " where " + this.primaryKey + " = ? ";
		return this.Db.conn.execute(sql,keyValue);
	}
	
	/**
	 * Find All Records in Db table
	 * @param {Number} limit
	 */
	this.findAll = function(limit){ 
		var sql = "select * from " + this.dbTableName + " limit ?"
		return this.Db.conn.execute(sql,limit);
	}
	
	/**
	 * Class init (construct)
	 * @constructor
	 */
	this._init = function(){
		if(this.App.Db) this.setDb(this.App.Db);
		//this.showInherit();
	}
	
	this._init();//construct
}
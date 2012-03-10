/**
 * @fileoverview This file contains the Setting Model class
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Setting Model Class, this is an example of a model class
 * @class This is the setting Model class, inherits from Model.
 * @param {TiMVC} app TiMVC class object
 */
var Setting = function(app){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * @type string
	 */
	this.dbTableName = 'setting';
	/**
	 * @type Array
	 */	
	this.attributeNames = ['key','value'];
	/**
	 * @String
	 */
	this.primaryKey = 'key';
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/model.js
	 */
	
	/**
	 * get value from setting table by key
	 * @param {String} key
	 * @returns value from setting table or null if not found
	 */
	this.getSetting = function(key){
		var r = self.findByPk(key);
		var value =  r.rowCount>0 ? r.fieldByName('value') : null;
		r.close();
		return value;
	}

	/**
	 * set value from setting table by key
	 * @param {String} key
	 * @param {String} value
	 */
	this.setSetting = function(key,value){
		if(self.getSetting(key)==null){//insert as new setting
			var sql = "insert into " + self.dbTableName + " (key,value) values (?,?)";
			self.Db.conn.execute(sql,key,value);
			return;
		}
		var sql = "update " + self.dbTableName + " set value = ? where key = ?";
		self.Db.conn.execute(sql,value,key);
	}
	
	/**
	 * Deletes value from setting table by key
	 * @param {String} key
	 */
	this.delSetting = function(key){
		self.delByPk(key);
	}
}
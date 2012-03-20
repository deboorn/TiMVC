/**
 * @fileoverview This file contains the scrollable grid view component
 * @author Daniel Boorn info@timvc.com
 * @copyright Daniel Boorn info@timvc.com
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @disclaimer THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * createScrollableGridView - still under developement, needs to take into account screen dpi, screen rotation and needs refactored
 * @class This class is for creating a scrollable Grid View. 
 * @param {Array} data
 * @param {Object} settings
 * @param {Function} clickHandler
 * @returns scrollable grid view
 */
var createScrollableGridView = function(data,settings,clickHandler){
	/**
	 * @type Function
	 */
	this.clickHandler = clickHandler;
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * creates view (page) for scroll-view (dashboard) with icons
	 * @param {Array} rows
	 * @param {Object} settings
	 * @returns Titanium.UI.View as page
	 */
	this.createPage = function(rows,settings){
		var table = Titanium.UI.createView({id:'mutidashboard',layout:'vertical'});
		table.add(Titanium.UI.createView({height:settings.padding}));
		for(var i=0;i<rows.length;i++){//for each row
			var topPx = i * settings.height + settings.padding;
			var rowView = Titanium.UI.createView({//create row view container
				height:settings.height,layout:'horizontal'
			});
			for(var k=0;k<rows[i].length;k++){//add each icon to row
				//rows[i][k].left = (k * settings.width) + settings.margin;
				var cellWidth = Titanium.Platform.displayCaps.platformWidth / settings.maxPerRow;
				var cell = Titanium.UI.createView({width:cellWidth,height:settings.height});
				cell.add(rows[i][k]);
				rowView.add(cell);
			}
			table.add(rowView);
			table.add(Titanium.UI.createView({height:(settings.padding*2)}));
		}
		return table;
	}
	
	/**
	 * create dashboard grid (scroll-view) from rows
	 * @param {Array} rows
	 * @param {Object} settings
	 * @returns array of pages
	 */
	this.createGrid = function(rows,settings){
		
		var pages = Titanium.UI.createScrollableView({							  
							  //dont display paging under 3 rows or 9 items
							  //change for your need
			showPagingControl: (rows.length > 3) ? true : false
		});
		var maxPerPage = self.getMaxRowsPerPage(settings.height,settings.padding);
		var pageRowList = [];
		var list = [];
		for(var i=0;i<rows.length;i++){
			list.push(rows[i]);
			//alert("i:"+(i+1)+":"+maxPerPage);
			if((i+1)%maxPerPage==0){
				pageRowList.push(list);
				list = [];
			}
		}
		if(list.length>0){
			pageRowList.push(list);
		}
		//alert('Total Rows:'+rows.length);
		//alert('Pages:'+pageRowList.length);
		
		var views = [];
		for(var i=0;i<pageRowList.length;i++){
			views.push(self.createPage(pageRowList[i],settings));
		}
		pages.views = views;
		
		return pages;
	}
	
	/**
	 * create rows from data
	 * @param {Array} data
	 * @param {Object} settings
	 * @returns array of rows
	 */
	this.createRowsFromData = function(data,settings){
		var rowList = []; var row = [];
		for(var i=0;i<data.length;i++){
			var img = Titanium.UI.createImageView({"image":data[i].image,width:settings.width,height:settings.height,selectedImage:data[i].selectedImage});
			try{
				img.route = data[i].route;
				img.request = data[i].request;
				img.label = data[i].label;
			}catch(e){
				//do nothing...
			}
			//add select image
			img.addEventListener('touchstart',function(e){
				e.source.regImage = e.source.image;
				e.source.image = e.source.selectedImage;
				var img = e.source;
				setTimeout(function(){
					img.image = img.regImage;
				},1000);
			});
			img.addEventListener('touchcancel',function(e){
				e.source.image = e.source.regImage;
			});
			img.addEventListener('touchend',function(e){
				e.source.image = e.source.regImage;
				if(e.type!='swipe'){
					self.clickHandler(e);
				}
			});
			
			row.push(img);
			if((i+1)%settings.maxPerRow==0){
				rowList.push(row);
				row = [];
			}
		}
		if(row.length>0){
			rowList.push(row);
		}
		return rowList;
	}
	
	/**
	 * returns max rows per page based on screen height
	 * @param {Number} iconHeight
	 * @param {Number} padding
	 * @returns max rows per page number
	 */
	this.getMaxRowsPerPage = function(iconHeight,padding){
		var screenHeight = Titanium.Platform.displayCaps.platformHeight;
		return (Math.floor(screenHeight / (iconHeight+padding))-2);
		 
	}
	
	/**
	 * get max icons per row based on screen width
	 * @param {Number} iconWidth
	 * @param {Number} padding
	 * @returns max per row number
	 */
	this.getMaxPerRow = function(iconWidth,padding){
		var screenWidth = Titanium.Platform.displayCaps.platformWidth;
		return Math.floor(screenWidth / (iconWidth+padding));
	}
	
	/**
	 * start (construct)
	 * @constructor
	 */
	this._init = function(data,settings){
		settings.maxPerRow = self.getMaxPerRow(settings.width,settings.padding);
		var rows = self.createRowsFromData(data,settings);
		var dashboard = self.createGrid(rows,settings);
		return dashboard;
	}
		
	return this._init(data,settings);//construct and return dashboard view
}
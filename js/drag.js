

(function() {

	"use strict"

	var userX = 0; 
	var userY = 0;
	var permitMovement = false;
	var listItems = document.querySelectorAll('.list-item'); 
	var listItemsArray = [null, null, null, null]

	document.addEventListener('DOMContentLoaded', function() {

		
		var listSpots = document.querySelectorAll('.list-spot'); 
		// the pixel boundaries of our list spots.
		var lSDims = {
				first: {
					top: 98,
					bottom: 217,
					left: 482,
					right: 1036,
				}, 
				second: {
					top: 218,
					bottom: 318,
				}, 
				third: {
					top: 319,
					bottom: 419,
				},
				fourth: {
					top: 420,
					bottom: 540,
				},
		}

		listItems.forEach(function(listItem) {	

			listItem.addEventListener('mousedown', initDrag); 
			listItem.addEventListener('mouseup', endDrag); 

		});

		function initDrag(mouseEvent) {

			var listItem = mouseEvent.target; 

			permitMovement = true;

			listItem.classList.add('dragged');
			listItem.classList.remove('in-list');

			movementMethods.positionItemOnCursor(mouseEvent, listItem);
			movementMethods.displayMouseCoordinates();

			movementMethods.addMovementListener(listItem);		
		}

		function endDrag(mouseUp) {

			var listItem = mouseUp.target;

			listItem.classList.remove('dragged');
			listItem.setAttribute('style', 'top: unset; left: unset;');

			permitMovement = false;
			movementMethods.trackUserMousePosition(mouseUp);
			checkWherePositionedOnList(listItem);
		}

		function checkWherePositionedOnList(listItem) {

			var pageY = (userY + window.scrollY);

			listItemsArray = virtualListEditing.cleanItemFromList(listItem);

			if (userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.first.top && pageY <= lSDims.first.bottom) {

				listItemsArray = virtualListEditing.addItemForRendering(listItem, 0);

			} else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.second.top && pageY <= lSDims.second.bottom) {

				listItemsArray = virtualListEditing.addItemForRendering(listItem, 1);

			}
			else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.third.top && pageY <= lSDims.third.bottom) {

				listItemsArray = virtualListEditing.addItemForRendering(listItem, 2);

			}
			else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.fourth.top && pageY <= lSDims.fourth.bottom) {

				listItemsArray = virtualListEditing.addItemForRendering(listItem, 3);

			}
			else {

				virtualListEditing.putItemBack(listItem);
			}

			renderList();
		}
		

		function renderList() {
			listItemsArray.forEach(function (listItem, i) {
				if (listItem) {
					listItem.classList.add('in-list');
					listItem.classList.remove('dragged');

					listSpots[i].appendChild(listItem);
				}
				
			});
		}
		

		
		
	});

	var virtualListEditing = (function (listItemsArray) {

		function putItemBack(listItem) {

			var unorderedSpots = document.querySelectorAll('.holster');
			listItem.classList.remove('in-list');

			for (var i = 0; i < unorderedSpots.length; i++) {
				var currentSpot = unorderedSpots[i];

				if (listItem.parentNode === currentSpot) {break;}

				if (!currentSpot.hasChildNodes()) {
					currentSpot.appendChild(listItem);
					break;
				}
			}
		}

		function addItemForRendering(listItem, index) {
			var slotAbove = index-1;
			if (listItemsArray[index] && !listItemsArray[slotAbove] && index !== 0){
				listItemsArray[slotAbove] = listItemsArray[index];
				listItemsArray[index] = listItem;
			} else if (listItemsArray[index]) {
				listItemsArray.splice(index, 0, listItem);
				trimEmptyFromIndex(index);
				trimItemsArray();
			} else {
				listItemsArray[index] = listItem;
			}

			return listItemsArray;
		}

		function trimEmptyFromIndex(index) {
			for(index; index < listItemsArray.length; index++) {
				if(!listItemsArray[index]) {
					listItemsArray.splice(index, 1);
					break;
				}
			}
			return listItemsArray;
		}

		function trimItemsArray() {
			if (listItemsArray[4]) {
				console.log(listItemsArray[4]);
				putItemBack(listItemsArray[4]);
			}

			listItemsArray.splice(4);

			return listItemsArray;
		}

		function cleanItemFromList(listItem) {
			listItemsArray.forEach(function (existingItem, i) {
				if (listItem === existingItem) {
					listItemsArray[i] = null;
				}
			});

			return listItemsArray;
		}

		return {
			cleanItemFromList: cleanItemFromList,
			addItemForRendering: addItemForRendering,
			putItemBack: putItemBack,


		}
	})(listItemsArray);

	var movementMethods = (function () {

		function trackUserMousePosition(mouseEvent) {
			userX = mouseEvent.clientX;
			userY = mouseEvent.clientY;
		}

		function displayMouseCoordinates() {
			document.getElementById('x-coord').textContent = userX + 'px';
			document.getElementById('y-coord').textContent = Math.trunc(userY + window.scrollY) + 'px';
		}

		function addMovementListener(listItem) {

			listItem.addEventListener( 'mousemove', function(moveEvent) {
				if (permitMovement) {
					displayMouseCoordinates();
					positionItemOnCursor(moveEvent, listItem);
				}
			} );
		}

		function positionItemOnCursor(mouseEvent, listItem) {

			var offsetX = listItem.offsetWidth / 2;
			var offsetY = listItem.offsetHeight / 2;

			trackUserMousePosition(mouseEvent);

			if (window.scrollY) {offsetY -= window.scrollY;}

			var positionStyles = 'top: ' + (userY - offsetY) + "px; left: " + (userX - offsetX) + "px;";

			listItem.setAttribute('style', positionStyles);
		}

		return {
			trackUserMousePosition: trackUserMousePosition,
			displayMouseCoordinates: displayMouseCoordinates,
			addMovementListener: addMovementListener,
			positionItemOnCursor: positionItemOnCursor,
		}
	})();

})();


(function() {

	"use strict"

	var userX = 0; 
	var userY = 0;
	var permitMovement = false;
	var listItems = document.querySelectorAll('.list-item'); 
	var listItemsArray = [null, null, null, null, null]

	document.addEventListener('DOMContentLoaded', function() {

		var listSpots = document.querySelectorAll('.list-spot'); 

		listItems.forEach(function(listItem) {	

			listItem.addEventListener('mousedown', initDrag); 
			listItem.addEventListener('mouseup', endDrag); 

		});

		/* Fires when a list item is clicked. Prepares element 
			to be dragged and positions it over cursor */

		function initDrag(mouseEvent) {

			var listItem = this; 

			permitMovement = true;

			listItem.classList.add('dragged');
			listItem.classList.remove('in-list');

			movementMethods.positionItemOnCursor(mouseEvent, listItem);
			movementMethods.removeFromUnrankedPool(listItem);
			movementMethods.displayMouseCoordinates();

			movementMethods.addMovementListener(listItem);		
		}

		/* Runs when the mouse is unclicked. Then, places list item in spot
			on listItemsArray or returns it to the pool of unranked items */

		function endDrag(mouseUp) {

			var listItem = this;

			listItem.classList.remove('dragged');
			listItem.setAttribute('style', 'top: unset; left: unset;');

			permitMovement = false;
			movementMethods.trackUserMousePosition(mouseUp);
			listItemsArray = virtualListEditing.checkWherePositionedOnList(listItem);
			renderList();
		}

		/* Renders the list depending on the order of the elements in the
			listItemsArray */

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

	/* Module  with methods for updating an element's position in the listItemsArray.
		Methods will return a new array to update the listItemsArray. */

	var virtualListEditing = (function (listItemsArray) {

		// the pixel boundaries of our list spots.
		var lSDims = {
				first: {
					top: 108,
					bottom: 227,
					left: 482,
					right: 1036,
				}, 
				second: {
					top: 228,
					bottom: 328,
				}, 
				third: {
					top: 329,
					bottom: 429,
				},
				fourth: {
					top: 430,
					bottom: 530,
				},
				fifth: {
					top: 531,
					bottom: 650,
				},
		}

		/* Check the current position of the cursor and compare it with the coordinates of
			the list boxes. Insert the current list item into the LIA depending on its position */

		function checkWherePositionedOnList(listItem) {

			var pageY = (userY + window.scrollY);
			var listSpot;

			listItemsArray = cleanItemFromList(listItem);

			if (userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.first.top && pageY <= lSDims.first.bottom) {

				listSpot = 0;
				listItemsArray = virtualListEditing.addItemForRendering(listItem, listSpot);

			} else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.second.top && pageY <= lSDims.second.bottom) {

				listSpot = 1;
				listItemsArray = virtualListEditing.addItemForRendering(listItem, listSpot);

			}
			else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.third.top && pageY <= lSDims.third.bottom) {

				listSpot = 2;
				listItemsArray = virtualListEditing.addItemForRendering(listItem, listSpot);

			}
			else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.fourth.top && pageY <= lSDims.fourth.bottom) {

				listSpot = 3;
				listItemsArray = virtualListEditing.addItemForRendering(listItem, listSpot);

			} else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.fifth.top && pageY <= lSDims.fifth.bottom) {

				listSpot = 4;
				listItemsArray = virtualListEditing.addItemForRendering(listItem, listSpot);

			}
			else {

				putItemBack(listItem);
			}

			return listItemsArray;

		}

		/* If item is not within the boundaries of a list spot, add it back
			to the pool of unordered items */

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

		/* Item is within boundaries potential list spots, place it at the appropriate array
			position. */

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

		/* If an empty spot exists after the index where the new item is added to the array,
			delete it. This assists trimItemsArray, which trims the fifth item from the array.
			trimEmptyFromIndex ensures a list item doesn't get trimmed when there is an empty space that can
			be removed instead */

		function trimEmptyFromIndex(index) {
			for(index; index < listItemsArray.length; index++) {
				if(!listItemsArray[index]) {
					listItemsArray.splice(index, 1);
					break;
				}
			}
			return listItemsArray;
		}

		/* Removes the fifth item from the LIA, as we only have 4 spots for rendering items */

		function trimItemsArray() {
			if (listItemsArray[5]) {
				putItemBack(listItemsArray[5]);
			}

			listItemsArray.splice(5);

			return listItemsArray;
		}

		/* Remove currently selected list item from LIA before adding it back in. This is to
			eliminate potential conflicts if it is added back to the same list spot */

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
			checkWherePositionedOnList: checkWherePositionedOnList,

		}
	})(listItemsArray);

	/* Methods relating to moving the currently selected list item across the screen */

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

		/* Put moving items in "limbo", as opposed to remaining in the unordered pool.
			The listItemsArray is updated before the list is rendered, which also means 
			any item bumped off the LIA will be bumped before the selected item is appended 
			ranked list. Therefore, we must put the selected item in limbo so its not still occupying
			an unranked spot when the last element is bumped off the list. */

		function removeFromUnrankedPool(listItem) {

			var limbo = document.getElementById('limbo');
			limbo.appendChild(listItem);
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
			removeFromUnrankedPool: removeFromUnrankedPool,

		}
	})();

})();


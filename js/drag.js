"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var userX = 0; 
	var userY = 0; 
	var permitMovement = false; 
	var listItems = document.querySelectorAll('.list-item'); 
	var listItemsArray = [null, null, null, null]
	var listSpots = document.querySelectorAll('.list-spot'); 
	// the pixel boundaries of our list spots.
	var lSDims = {
			first: {
				top: 62,
				bottom: 181,
				left: 482,
				right: 1036,
			}, 
			second: {
				top: 182,
				bottom: 282,
			}, 
			third: {
				top: 283,
				bottom: 383,
			},
			fourth: {
				top: 384,
				bottom: 505,
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

		positionItemOnCursor(mouseEvent, listItem);
		displayMouseCoordinates();

		addMovementListener(listItem);		
	}

	function endDrag(mouseUp) {

		var listItem = mouseUp.target;

		listItem.classList.remove('dragged');
		listItem.setAttribute('style', 'top: unset; left: unset;');

		permitMovement = false;
		trackUserMousePosition(mouseUp);
		checkWherePositionedOnList(listItem);
	}

	function checkWherePositionedOnList(listItem) {

		var pageY = (userY + window.scrollY);

		cleanItemFromList(listItem);

		if (userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.first.top && pageY <= lSDims.first.bottom) {

			addItemForRendering(listItem, 0);

		} else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.second.top && pageY <= lSDims.second.bottom) {

			addItemForRendering(listItem, 1);

		}
		else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.third.top && pageY <= lSDims.third.bottom) {

			addItemForRendering(listItem, 2);

		}
		else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.fourth.top && pageY <= lSDims.fourth.bottom) {

			addItemForRendering(listItem, 3);

		}
		else {

			putItemBack(listItem);
		}

		renderList();
	}

	function addItemForRendering(listItem, index) {
		var slotAbove = index-1;
		if (listItemsArray[index] && !listItemsArray[slotAbove]){
			listItemsArray[slotAbove] = listItemsArray[index];
			listItemsArray[index] = listItem;
		} else if (listItemsArray[index]) {
			listItemsArray.splice(index, 0, listItem);
			trimEmptyFromIndex(index);
			trimItemsArray();
		} else {
			listItemsArray[index] = listItem;
		}
	}

	function cleanItemFromList(listItem) {
		listItemsArray.forEach(function (existingItem, i) {
			if (listItem === existingItem) {
				listItemsArray[i] = null;
			}
		});
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

	function trimEmptyFromIndex(index) {
		for(index; index < listItemsArray.length; index++) {
			if(!listItemsArray[index]) {
				listItemsArray.splice(index, 1);
				break;
			}
		}
		console.log(listItemsArray);
	}

	function trimItemsArray() {
		if (listItemsArray[4]) {
			console.log(listItemsArray[4]);
			putItemBack(listItemsArray[4]);
		}

		listItemsArray.splice(4);
	}

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

	function positionItemOnCursor(mouseEvent, listItem) {

		var offsetX = listItem.offsetWidth / 2;
		var offsetY = listItem.offsetHeight / 2;

		trackUserMousePosition(mouseEvent);

		if (window.scrollY) {offsetY -= window.scrollY;}

		var positionStyles = 'top: ' + (userY - offsetY) + "px; left: " + (userX - offsetX) + "px;";

		listItem.setAttribute('style', positionStyles);
	}

	function addMovementListener(listItem) {

		listItem.addEventListener( 'mousemove', function(moveEvent) {
			if (permitMovement) {
				displayMouseCoordinates();
				positionItemOnCursor(moveEvent, listItem);
			}
		} );
	}

	function trackUserMousePosition(mouseEvent) {
		userX = mouseEvent.clientX;
		userY = mouseEvent.clientY;
	}

	function displayMouseCoordinates() {
		document.getElementById('x-coord').textContent = userX + 'px';
		document.getElementById('y-coord').textContent = (userY + window.scrollY) + 'px';
	}
});

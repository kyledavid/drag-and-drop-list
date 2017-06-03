"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var userX = 0; 
	var userY = 0; 
	var permitMovement = false; 
	var listItems = document.querySelectorAll('.list-item'); 
	var listSpots = document.querySelectorAll('.list-spot'); 
	// the dimensional boundaries of our list
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

		if (userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.first.top && pageY <= lSDims.first.bottom) {

			listItem.classList.add('in-list');
			listSpots[0].appendChild(listItem);

		} else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.second.top && pageY <= lSDims.second.bottom) {

			listItem.classList.add('in-list');
			listSpots[1].appendChild(listItem);

		}
		else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.third.top && pageY <= lSDims.third.bottom) {

			listItem.classList.add('in-list');
			listSpots[2].appendChild(listItem);

		}
		else if(userX >= lSDims.first.left && userX <= lSDims.first.right && pageY >= lSDims.fourth.top && pageY <= lSDims.fourth.bottom) {

			listItem.classList.add('in-list');
			listSpots[3].appendChild(listItem);

		}
		else {

			putItemBack(listItem);
		}
	}

	function putItemBack(listItem) {

		var unorderedSpots = document.querySelectorAll('.holster');

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

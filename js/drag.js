"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var userX = 0; 
	var userY = 0; 
	var permitMovement = false; 
	var listItems = document.querySelectorAll('.list-item'); 
	var listSpots = document.querySelectorAll('.list-spot'); 

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

		var xOffset = listItem.offsetWidth / 2;
		var yOffset = listItem.offsetHeight / 2;

		trackUserMousePosition(mouseEvent);

		if (window.scrollY) {yOffset -= window.scrollY;}

		var pos = 'top: ' + (userY - yOffset) + "px; left: " + (userX - xOffset) + "px;";

		listItem.setAttribute('style', pos);
	}

	function checkWherePositionedOnList(listItem) {

		var pageY = (userY + window.scrollY);

		if (userX >= 482 && userX <= 1036 && pageY >= 62 && pageY <= 181) {

			listItem.classList.add('in-list');
			listSpots[0].appendChild(listItem);

		} else if(userX > 482 && userX < 1036 && pageY >= 182 && pageY <= 282){

			listItem.classList.add('in-list');
			listSpots[1].appendChild(listItem);

		}
		else if(userX >= 482 && userX <= 1036 && pageY >= 283 && pageY <= 383){

			listItem.classList.add('in-list');
			listSpots[2].appendChild(listItem);

		}
		else if(userX >= 482 && userX <= 1036 && pageY >= 384 && pageY <= 505){

			listItem.classList.add('in-list');
			listSpots[3].appendChild(listItem);

		}
		else {

			putItemBack(listItem);
		}
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

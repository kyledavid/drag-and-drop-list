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

		listItem.addEventListener('mousemove', function(moveEvent) {

			if (permitMovement) {
				positionItemOnCursor(moveEvent, listItem);
			}

		});
	}

	function trackUserMousePosition(mouseEvent) {
		userX = mouseEvent.clientX;
		userY = mouseEvent.clientY;
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
		
		if (userX >= 482 && userX <= 1036 && userY >= 62 && userY <= 181) {

			listItem.classList.add('in-list');
			listSpots[0].appendChild(listItem);

		} else if(userX > 482 && userX < 1036 && userY >= 182 && userY <= 282){

			listItem.classList.add('in-list');
			listSpots[1].appendChild(listItem);

		}
		else if(userX >= 482 && userX <= 1036 && userY >= 283 && userY <= 383){

			listItem.classList.add('in-list');
			listSpots[2].appendChild(listItem);

		}
		else if(userX >= 482 && userX <= 1036 && userY >= 384 && userY <= 505){

			listItem.classList.add('in-list');
			listSpots[3].appendChild(listItem);

		}
		else {
			
			putItemBack(listItem);
		}
	}

	function positionItemOnCursor(event, block) {
		// account for the dimensions of our box, divied them by 2 so box will be centered on cursor
		var xOffset = block.offsetWidth / 2;
		var yOffset = block.offsetHeight / 2;
		// get the position of the cursor relative to the viewport
		userX = event.clientX;
		userY = event.clientY;
		// if scrolled, add the vertical scroll to the y coordinate to allow absolute positioning to work correctly
		if (window.scrollY) {userY += window.scrollY;}
		// display our coordinates for testing
		document.getElementById('x-coord').textContent = userX + 'px';
		document.getElementById('y-coord').textContent = userY + 'px';
		// subtract offsets from cursor to center box over cursor
		userY = userY - yOffset;
		userX = userX - xOffset;
		// create inline styles for positioning box
		var pos = 'top: ' + userY + "px; left: " + userX + "px;";
		// set inline styles for box
		block.setAttribute('style', pos);
	}

	function putItemBack(block) {
		// query all holsters
		var spots = document.querySelectorAll('.holster');
		// cycle over holsters to find empty one
		for (var i = 0; i < spots.length; i++) {
			var element = spots[i];
			// if it already belongs to a holster just let it be
			if (block.parentNode === element) {break;}
			// stop the loop if we find an empty holster and place block within empty element
			if (!element.hasChildNodes()) {
				element.appendChild(block);
				break;
			}
		}
	}

});

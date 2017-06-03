"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var userX = 0; 
	var userY = 0; 
	var permitMovement = false; 
	var listItems = document.querySelectorAll('.list-item'); 
	var listSpots = document.querySelectorAll('.snap-to-me'); 

	listItems.forEach(function(listItem) {	

		listItem.addEventListener('mousedown', initDrag); 
		listItem.addEventListener('mouseup', endDrag); 

	});


	function initDrag(mouseEvent) {

		var listItem = mouseEvent.target; 

		permitMovement = true;

		listItem.classList.add('dragged');

		positionItemOnCursor(mouseEvent, listItem);

		listItem.classList.remove('in-list');

		listItem.addEventListener('mousemove', function(moveEvent) {

			if (permitMovement) {
				positionItemOnCursor(moveEvent, listItem);
			}
		});
	}

	// run on mouseup
	function endDrag(event) {
		// put box back to original z index
		var selection = event.target;
		selection.classList.remove('dragged');
		// mouse is up so we should no longer allow movement
		permitMovement = false;
		userX = event.clientX;
		userY = event.clientY;
		// check if coordinates are within range 
		if (userX >= 482 && userX <= 1036 && userY >= 62 && userY <= 181) {
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			listSpots[0].appendChild(selection);
		} else if(userX > 482 && userX < 1036 && userY >= 182 && userY <= 282){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			listSpots[1].appendChild(selection);
		}
		else if(userX >= 482 && userX <= 1036 && userY >= 283 && userY <= 383){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			listSpots[2].appendChild(selection);
		}
		else if(userX >= 482 && userX <= 1036 && userY >= 384 && userY <= 505){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			listSpots[3].appendChild(selection);
		}
		else {
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');	
			// put item back
			putItemBack(selection);
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

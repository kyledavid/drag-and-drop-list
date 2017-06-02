"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var xCord = 0; // current cursor x position
	var yCord = 0; // current cursor y position
	var moving = false; // enables/disables box movement
	var draggables = document.querySelectorAll('.draggable'); // get all our draggable items
	var listSlots = [[1],[2],[3],[4]];
	var spotsToSnap = document.querySelectorAll('.snap-to-me');

	draggables.forEach(function(box) {	
		// initiate drag function when draggable item is clicked
		box.addEventListener('mousedown', initDrag); 
		// stop drag of item on mouseup
		box.addEventListener('mouseup', endDrag); 
	});

	// begin dragging when item is clicked
	function initDrag(event) {
		// select target to be dragged
		var block = event.target; 
		// because the mouse was clicked, allow movement
		moving = true;
		// give dragged item higest z index so others aren't accidentally selected
		block.classList.add('dragged');
		// initial positioning of dragged item
		positionItemOnCursor(event, block);
		// remove in-list class
		block.classList.remove('in-list');
		// update the position of the block when client mouse moves
		block.addEventListener('mousemove', function(event) {
			// run if movement is allowed
			if (moving) {
				positionItemOnCursor(event, block);
			}
		});
	}

	// run on mouseup
	function endDrag(event) {
		// put box back to original z index
		var selection = event.target;
		selection.classList.remove('dragged');
		// mouse is up so we should no longer allow movement
		moving = false;
		xCord = event.clientX;
		yCord = event.clientY;
		// check if coordinates are within range 
		if (xCord >= 482 && xCord <= 1036 && yCord >= 62 && yCord <= 181) {
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			spotsToSnap[0].appendChild(selection);
		} else if(xCord > 482 && xCord < 1036 && yCord >= 182 && yCord <= 282){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			spotsToSnap[1].appendChild(selection);
		}
		else if(xCord >= 482 && xCord <= 1036 && yCord >= 283 && yCord <= 383){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			spotsToSnap[2].appendChild(selection);
		}
		else if(xCord >= 482 && xCord <= 1036 && yCord >= 384 && yCord <= 505){
			// unset positioning
			selection.setAttribute('style', 'top: unset; left: unset;');
			// stylu it for sitting in list
			selection.classList.add('in-list');
			// append it to the appropriate spot
			spotsToSnap[3].appendChild(selection);
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
		xCord = event.clientX;
		yCord = event.clientY;
		// if scrolled, add the vertical scroll to the y coordinate to allow absolute positioning to work correctly
		if (window.scrollY) {yCord += window.scrollY;}
		// display our coordinates for testing
		document.getElementById('x-coord').textContent = xCord + 'px';
		document.getElementById('y-coord').textContent = yCord + 'px';
		// subtract offsets from cursor to center box over cursor
		yCord = yCord - yOffset;
		xCord = xCord - xOffset;
		// create inline styles for positioning box
		var pos = 'top: ' + yCord + "px; left: " + xCord + "px;";
		// set inline styles for box
		block.setAttribute('style', pos);
	}

	function putItemBack(block) {
		var spots = document.querySelectorAll('.holster');

		for (var i = 0; i < spots.length; i++) {
			var element = spots[i];
			// stop the loop if we find an empty holster
			if (!element.hasChildNodes()) {
				element.appendChild(block);
				break;
			}
		}
	}

});

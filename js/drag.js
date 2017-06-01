"use strict"

document.addEventListener('DOMContentLoaded', function() {

	var xCord = 0; // current cursor x position
	var yCord = 0; // current cursor y position
	var moving = false; // enables/disables box movement
	var draggables = document.querySelectorAll('.draggable'); // get all our draggable items

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
		// update the position of the block when client mouse moves
		block.addEventListener('mousemove', function(event) {
			// run if movement is allowed
			if (moving) {
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
		});
	}

	// run on mouseup
	function endDrag(event) {
		// put box back to original z index
		event.target.classList.remove('dragged');
		// mouse is up so we should no longer allow movement
		moving = false;
	}

});

// Event listeners for mouse/touch input
function isInsideAirplane(x, y) {
  return (
    x >= airplane.x &&
    x <= airplane.x + airplane.width &&
    y >= airplane.y &&
    y <= airplane.y + airplane.height
  );
}

function handleStart(event) {
  event.preventDefault(); // Prevent unintended scrolling on mobile

  let x, y;
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  const rect = canvas.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;

  if (isInsideAirplane(x, y)) {
    airplane.isDragging = true;
  }
}

function handleMove(event) {
  if (!airplane.isDragging) return;
  event.preventDefault();

  let x;
  if (event.touches) {
    x = event.touches[0].clientX;
  } else {
    x = event.clientX;
  }

  const rect = canvas.getBoundingClientRect();
  x -= rect.left;

  airplane.x = x - airplane.width / 2;
  if (airplane.x < 0) airplane.x = 0;
  if (airplane.x + airplane.width > canvas.width) {
    airplane.x = canvas.width - airplane.width;
  }
}

function handleEnd(event) {
  event.preventDefault();
  airplane.isDragging = false;
}

// Add event listeners for both mouse and touch
canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('mouseup', handleEnd);
canvas.addEventListener('mouseleave', handleEnd);
canvas.addEventListener('touchstart', handleStart, { passive: false });
canvas.addEventListener('touchmove', handleMove, { passive: false });
canvas.addEventListener('touchend', handleEnd);

const $cards = document.querySelectorAll('.card');

function rotateToMouse(card, e) {
    const bounds = card.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
    };

    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
            ${center.y / 100},
            ${-center.x / 100},
            0,
            ${Math.log(distance) * 5}deg
        )
    `;
}

// Define a function to handle mousemove
function handleMouseMove(card) {
    return (e) => rotateToMouse(card, e);
}

$cards.forEach(card => {
    const mouseMoveHandler = handleMouseMove(card);
    
    card.addEventListener('mouseenter', () => {
        document.addEventListener('mousemove', mouseMoveHandler);
    });

    card.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        card.style.transform = '';
    });
});

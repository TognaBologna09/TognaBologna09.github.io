document.addEventListener("DOMContentLoaded", function () {
    const screenshots = document.querySelectorAll(".screenshot-container");

    window.addEventListener("scroll", function () {
        screenshots.forEach(function (screenshot) {
            const screenshotRect = screenshot.getBoundingClientRect();
            const screenHeight = window.innerHeight;

            // Calculate the distance from the screenshot to the center of the screen
            const distanceToCenter = Math.abs(screenshotRect.top + screenshotRect.height / 2 - screenHeight / 2);

            // Adjust the size based on distance from center (you can adjust the scale factor)
            const scale = 1 + (1 - distanceToCenter / screenHeight) * 0.2;

            // Apply the scale transform
            screenshot.style.transform = `scale(${scale})`;
        });
    });
    screenshots.forEach(function (screenshot) {
        screenshot.addEventListener("mouseenter", function () {
            // Add a class to the hovered image container
            screenshot.classList.add("highlighted");
        });

        screenshot.addEventListener("mouseleave", function () {
            // Remove the class from the image container when the mouse leaves
            screenshot.classList.remove("highlighted");
        });
    });
});
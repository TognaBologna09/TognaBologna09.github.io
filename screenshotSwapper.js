const fossilImageArray = ["fossilFuryMainView.png", "fossilEvolution.png", "fossilBoss.png"]
const fDA = ["Fossil Fury: Top-Down Wave Shooter", "Choose: Evolve your weaponry and increase your stats.", "Battle challenging dinosaurs!"];

const birdImageArray = ["IMGmain.PNG","IMGfour.PNG","IMGsix.PNG","IMGover.PNG","IMGscoreboard.PNG","IMGsettings.PNG","PrivacyPolicy_i_bird.PNG","PrivacyPolicy_ii_bird.PNG","PrivacyPolicy_iii_bird.PNG"]
const birdDescriptionArray = ["Melody Mockingbird for iOS main screen.","Practice your memory, repeat the sequenced tones and buttons.","Four too easy? Try six-mode!", "After running out of lives, view your score.","Track your progress and add your name to the scoreboard.","Control game options in the settings menu.","Privacy Policy i.","Privacy Policy ii.","Privacy Policy iii."];

let currentIndex = 0;

window.addEventListener("load", myInit, true); function myInit()
{
  changeImage(1, fossilImageArray, fDA, 'fossil-image', 'fossil-description');
  changeImage(0, birdImageArray, birdDescriptionArray, 'bird-image', 'bird-description');
};

function changeImage(direction, imageArray, descriptionArray, imageID, descriptionID) {
  // Calculate the new index based on the direction
  currentIndex += direction;

  // Wrap around if the index goes beyond the array bounds
  if (currentIndex < 0) {
    currentIndex = imageArray.length - 1;
  } else if (currentIndex >= imageArray.length) {
    currentIndex = 0;
  }

  // Get the image element and update its source
  const imageElement = document.getElementById(imageID);
  imageElement.src = imageArray[currentIndex];

  // Get the description element and update its text
  const descriptionElement = document.getElementById(descriptionID);
  descriptionElement.textContent = descriptionArray[currentIndex];
  
}
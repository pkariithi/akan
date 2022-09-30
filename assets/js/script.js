$(document).ready(function() {

  // names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const maleNames = ["Kwasi", "Kudwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
  const genders = ["Boy", "Girl"];

  // generate a random akan name on load
  generateRandomAkanName();

  // when user clicks the view random akan name button
  $('#random-button').on('click', function() {
    generateRandomAkanName();
    return false;
  });

  // when user clicks the view all akan names button
  $('#all-button').on('click', function() {
    showLoader();
    hideLoader("all");
    return false;
  });

  /*
   * functions
   */

  function generateRandomAkanName() {

    // show loader and hide other elements
    showLoader();

    // random name - choose a random number between 0 and 6
    const randomDay = randomNumber(0,6);
    const randomGender = randomNumber(0,1);

    $('#rand-gender').text(genders[randomGender]);
    $('#rand-day').text(days[randomDay]);
    $('#rand-akan-name').text(randomGender ? femaleNames[randomDay] : maleNames[randomDay]);

    hideLoader("random");
  }

  // show the loading animation
  function showLoader() {
    $('.content-main-random, .content-main-all, .content-main-results, .content-main-buttons').hide();
    if($('.content-main-loading').is(":hidden")) {
      $('.content-main-loading').show();
    }
  }

  // hide the loading animation
  function hideLoader(elementToshow) {
    $('.content-main-all, .content-main-results, .content-main-buttons').hide();
    if($('.content-main-loading').is(":visible")) {
      // show relevant
      if(elementToshow === "random") {
        $('.content-main-random').show();
      }
      if(elementToshow === "all") {
        $('.content-main-all').show();
      }
      if(elementToshow === "results") {
        $('.content-main-results').show();
      }
      $('.content-main-buttons').show();
      $('.content-main-loading').hide();
    }
  }

  // this function retuns a random number between min (inclusive) and max (inclusive)
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
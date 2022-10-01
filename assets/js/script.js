$.fn.showFlex = function(){ this.css({'display':'flex'}); }
$(document).ready(function() {

  // names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const maleNames = ["Kwasi", "Kudwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
  const genderNames = ["Boy", "Girl"];

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

  // on form submit
  $('#akanform').submit(function(e) {
    e.preventDefault();
    $('#akanform ul.alert').remove();

    // get values
    let dob = $('#dob').val();
    let gender = $("#akanform input[type=radio]:checked").val();

    // instantiate dob and gender to empty strings if they are undefined
    if(typeof dob == 'undefined') { dob = ""; }
    if(typeof gender == 'undefined') { gender = ""; }

    // validation
    let validationErrors = [];
    if(dob.trim().length === 0) {
      validationErrors.push("The date of birth is required");
    } else {
      if(dob.trim().length !== 0 && !isValidDate(dob)) {
        validationErrors.push("The date of birth is invalid");
      }
    }
    if(gender.trim().length === 0) {
      validationErrors.push("Select your gender");
    } else {
      if(gender !== 'male' && gender !== 'female') {
        validationErrors.push("The gender is invalid");
      }
    }

    // validation errors alert
    if(validationErrors.length !== 0) {
      let alert = '<ul class="alert alert-error">';
      validationErrors.forEach(function(validationError) {
        alert = alert + '<li>' + validationError +'</li>';
      });
      alert = alert + '</ul>';
      $('#akanform').prepend(alert);
      return;
    }

    // validation passed

    // get day from date
    const dayIndex = getDayIndex(dob);

    // get akan name from dayIndex per gender
    const akanName = gender === 'male' ? maleNames[dayIndex] : femaleNames[dayIndex];
    console.log([dayIndex, akanName]);

    // build response
    showLoader();
    $('#result-akan-gender').text(gender);
    $('#result-akan-day').text(days[dayIndex]);
    $('#result-akan-name').text(akanName);

    hideLoader("results");
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

    $('#rand-gender').text(genderNames[randomGender]);
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
      if(elementToshow === "random") {
        $('.content-main-random').show();
      }
      if(elementToshow === "all") {
        $('.content-main-all').show();
      }
      if(elementToshow === "results") {
        $('.content-main-results').show();
      }
      $('.content-main-buttons').showFlex();
      $('.content-main-loading').hide();
    }
  }

  // this function retuns a random number between min (inclusive) and max (inclusive)
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // check if a date is valid. It takes a date in the format yyyy-mm-dd
  function isValidDate(date) {
    const dateArray = date.split('-');
    if(dateArray.length !== 3) {
      return false;
    }

    const year = dateArray[0];
    const month = dateArray[1] - 1;
    const day = dateArray[2];

    var dateObj = new Date(year, month, day);
    if (
      dateObj.getFullYear() == year &&
      dateObj.getMonth() == month &&
      dateObj.getDate() == day
    ) {
        return true;
    } else {
        return false;
    }
  }

  // get name of day from date. It takes a date in the format yyyy-mm-dd
  function getDayIndex(date) {
    const dateArray = date.split('-');
    if(dateArray.length !== 3) {
      return false;
    }

    const year = dateArray[0];
    const month = dateArray[1] - 1;
    const day = dateArray[2];

    var dateObj = new Date(year, month, day);
    return dateObj.getDay();
  }

});
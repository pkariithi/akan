$(document).ready(function() {

  // names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const maleNames = ["Kwasi", "Kudwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

  // random name - choose a random number between 0 and 6
  const randomDay = randomNumber(0,6);
  const randomGender = randomNumber(0,2);

  /*
   * functions
   */

  // this function retuns a random number between min (inclusive) and max (inclusive)
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
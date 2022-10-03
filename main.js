// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


//Validates credit cards using the Luhn algorithm
function validateCred(arr) {
  //Keeps track for the sum modulo later on
  let totalSum = 0;
  //Keeps track of place to later double every other digit
  let iterater = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (iterater % 2 === 0) {
      let doubledAmnt = arr[i] * 2;
      if (doubledAmnt > 9) {
        totalSum += (doubledAmnt - 9);
      } else {
        totalSum += doubledAmnt;
      }
    //Adds the digit if it does not need to be doubled  
    } else {
      totalSum += arr[i];
    };
    iterater++
  };



//Checks if the total sum is divisible by 10 to return true or false
  if (totalSum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

//Finds invalid card numbers by calling a previous function within the function
let invalidCards = [];
function findInvalidCards(arrBatch) {
  arrBatch.forEach(card => {
    if (validateCred(card) === false) {
      invalidCards.push(card);
    };
  })
  return invalidCards;
}

//Returns a list of all companies who have given a faulty card number
let companies = [];
function idInvalidCardCompanies(nestedArr) {
  nestedArr.forEach(card => {
    if (card[0] === 3 && !companies.includes('American Express')) {
      companies.push(`American Express`);
    } else if (card[0] === 4 && !companies.includes('Visa')) {
      companies.push(`Visa`);
    } else if (card[0] === 5 && !companies.includes('Mastercard')) {
      companies.push(`Mastercard`);
    } else if (card[0] === 6 && !companies.includes('Discover')) {
      companies.push(`Discover`);
    } else if (companies.includes(`American Express`) || companies.includes('Visa') || companies.includes('Mastercard') || companies.includes('Discover')) {

    } else {
      console.log(`Company not found`);
    };
/*
Alternative Method
    switch(card[0]) {
      case 3 && !companies.includes('American Express'):
      companies.push(`American Express`);
      break;
      case 4 && !companies.includes('Visa'):
      companies.push(`Visa`);
      break;
      case 5 && !companies.includes('Mastercard'):
      companies.push(`Mastercard`);
      break;
      case 6 && !companies.includes('Discover'):
      companies.push(`Discover`);
      break;
      case companies.includes(`American Express`) || companies.includes('Visa') || companies.includes('Mastercard') || companies.includes('Discover'):

      break;
      default:
      console.log(`Company not found`)
    }*/
  });
  return companies;
}


/**
 * Converts a length from feet to feet and inches.
 * 
 * @param {number} feet - The length in feet.
 * @returns {object} An object containing the whole number of feet and the remaining inches.
 */
function convertFeetToFeetAndInches(feet:number) {
  const wholeFeet = Math.floor(feet);

  const remainingInches = (feet - wholeFeet) * 12;

  const inches = Math.round(remainingInches);

  return {
    feet: wholeFeet,
    inches: inches
  };
}

/**
 * Converts a length from feet and inches to feet.
 * 
 * @param {number} feet - The number of whole feet.
 * @param {number} inches - The number of inches.
 * @returns {number} The length in feet.
 */

function convertFeetAndInchesToFeet(feet:number, inches: number) {
  const totalFeet = feet + (inches / 12);
  
  return totalFeet;
}

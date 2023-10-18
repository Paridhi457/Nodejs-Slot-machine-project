//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet amount 
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

//function deposit() {
//     return 1
//}

const prompt = require("prompt-sync")(); //done to get user input
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
    while(true){
       const depositAmount = prompt("enter a deposit amount: ");
       const numberDepositAmount = parseFloat(depositAmount); //will convert a valid number string value to float
       if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
           console.log("invalid deposit amount, try again.")
       }
       else{
        return numberDepositAmount;
       }
}
};

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("enter number of lines between (1-3): ");
        const numberOfLines = parseFloat(lines); //will convert a valid number string value to float
        if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3){
            console.log("invalid number of lines, try again.")
        }
        else{
         return numberOfLines;
        }
 }
}

const getBet = (balance, lines) => {
    while (true) {
      const bet = prompt("Enter the bet per line: ");
      const numberBet = parseFloat(bet);
  
      if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
        console.log("Invalid bet, try again.");
      } else {
        return numberBet;
      }
    }
  };

  const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { //will loop through the symbol counts and return the symbol and count shown above
      for (let i = 0; i < count; i++) {
        symbols.push(symbol); //storing it in the symbols array, A will be printed 2 times B will be printed 4 times etc. 
      }
    }

const reels = []; //randomly select an exisiting sy,bol, remove it from the array, push it into the reel
for (let i = 0; i < COLS; i++) {
  reels.push([]); 
  const reelSymbols = [...symbols]; //copy the symbols we have to choose for each reel into another array 
  for (let j = 0; j < ROWS; j++) { //Math.random rounds down a floating-point number to the nearest integer
    const randomIndex = Math.floor(Math.random() * reelSymbols.length); //multiplies the random number by the length of the array, giving you a random floating-point number in the range [0, reelSymbols.length)
    const selectedSymbol = reelSymbols[randomIndex]; 
    reels[i].push(selectedSymbol);
    reelSymbols.splice(randomIndex, 1); //remove this symbol so we cant select this again so we remove this reel, 1 means remove 1 element only
  }
}

return reels;
  };

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
}; 

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) { //if i not equal to max possible values
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}; 

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();



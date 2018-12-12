var history = [
  {
    event: "MOT",
    date: "2018-3-10T00:00:00.000Z",
    data: {
      mileage: 69383,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2017-3-10T00:00:00.000Z",
    data: {
      mileage: 58385,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2016-4-10T00:00:00.000Z",
    data: {
      mileage: 46275,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2016-4-10T00:00:00.000Z",
    data: {
      mileage: 46275,
      passed: false
    }
  },
  {
    event: "MOT",
    date: "2015-4-10T00:00:00.000Z",
    data: {
      mileage: 37375,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2014-4-10T00:00:00.000Z",
    data: {
      mileage: 28646,
      passed: true
    }
  }
];

history = reformatAllDates(history);
let numberOfDataPoints = history.length;

let arrayOfAverageNumberOfMilesAddedPerDay = [];
calculateAverageNumberOfMilesAddedPerDay(history);

let averageAnnualMilage = calculateAverageAnnualMilage(arrayOfAverageNumberOfMilesAddedPerDay);
console.log(averageAnnualMilage);

let averageMilagePerDay = arrayOfAverageNumberOfMilesAddedPerDay.reduce(add, 0)/arrayOfAverageNumberOfMilesAddedPerDay.length

let today = new Date();
let dateOfLastMOT = new Date(history[0].date);

let numberOfDaysSinceLastMOT = calculateDaysBetweenTwoDates(dateOfLastMOT, today);
let projectedMilage = history[0].data.mileage + (averageMilagePerDay * numberOfDaysSinceLastMOT);
console.log(projectedMilage);

function calculateAverageAnnualMilage(arrayOfAverageNumberOfMilesAddedPerDay) {
    let arrayOfAverageAnnualMileage = [];
    for (let i = 0; i < arrayOfAverageNumberOfMilesAddedPerDay.length; i++) {
        arrayOfAverageAnnualMileage.push(arrayOfAverageNumberOfMilesAddedPerDay[i] * 365);
    }
    
     return arrayOfAverageAnnualMileage.reduce(add, 0)/arrayOfAverageAnnualMileage.length;
}

function calculateAverageNumberOfMilesAddedPerDay(history) {
    for (let i = 0; i < 4; i++) {
      let date1 = new Date(history[5 - i].date);
      let date2 = new Date(history[5 - i - 1].date);
      let numberOfDaysBetweenTwoDates = calculateDaysBetweenTwoDates(date1, date2);
    
      let mileage1 = history[5 - i].data.mileage;
      let mileage2 = history[5 - i - 1].data.mileage;
      let numberOfMilesDrivenSinceLastMOT = mileage2 - mileage1;
    
      let averageNumberOfMilesAddedPerDay;
      if(numberOfMilesDrivenSinceLastMOT == 0) {
        averageNumberOfMilesAddedPerDay = 0;
      } else {
        averageNumberOfMilesAddedPerDay = (mileage2 - mileage1) / numberOfDaysBetweenTwoDates;
      }
      arrayOfAverageNumberOfMilesAddedPerDay.push(averageNumberOfMilesAddedPerDay);
    }
}



function add(a, b) {
    return a + b;
}

function reformatAllDates(history) {
  for (let i = 0; i < history.length; i++) {
    history[i].date = reformatDate(history[i].date);
  }

  return history;
}

function reformatDate(date) {
  //getting date in yyyy-m-dd format
  date = date.split("T")[0];
  let splitUpDateArray = date.split("-");
  let year = splitUpDateArray[0];
  let month = formatMonth(splitUpDateArray[1]);
  let days = splitUpDateArray[2];

  let formattedDate = `${year}-${month}-${days}`;
  return formattedDate;
}

function formatMonth(month) {
  if (month.length === 1) {
    month = "0" + month;
  }

  return month;
}

function calculateDaysBetweenTwoDates(date1, date2) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms / one_day);
}

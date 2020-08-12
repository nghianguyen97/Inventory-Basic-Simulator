$(document).ready(function () {
  //-------------------chart-------------------//
  // var ctx = document.getElementById('chart').getContext('2d');
  // var chart = new Chart(ctx, {
  //   // The type of chart we want to create
  //   type: 'line',

  //   // The data for our dataset
  //   data: {
  //     labels: [
  //       'January',
  //       'February',
  //       'March',
  //       'April',
  //       'May',
  //       'June',
  //       'July',
  //     ],
  //     datasets: [
  //       {
  //         label: 'My First dataset',
  //         backgroundColor: 'rgb(255, 99, 132)',
  //         borderColor: 'rgb(255, 99, 132)',
  //         data: [0, 10, 5, 2, 20, 30, 45],
  //       },
  //     ],
  //   },

  //   // Configuration options go here
  //   options: {},
  // });

  //-----------------end----------------------//
  //---------------initial weeks map-----------//
  var currentWeek = 0;
  var inputInitialInventory,
    inputStockoutPenality,
    inputDemandMean,
    inputDemandStdDev,
    inputHoldingCost,
    inputOrderingCost;

  var weeksToGenerate = 12;
  var weeks = {};

  for (let index = 0; index < weeksToGenerate; index++) {
    let object = {
      week: index + 1,
      inventoryLevelBeginningOfWeek: 0,
      inventoryLevelAfterUnloading: 0,
      customerDemand: 0,
      inventoryLevelEndOfWeek: 0,
      quantityOrdered: 0,
      orderCosts: 0,
      holdingCosts: 0,
      totalCostIncludeStockoutPenality: 0,
      totalCummulativeCost: 0,
    };

    weeks[index + 1] = object;
  }

  //-----------------end----------------------//
  var inputObj = {};
  var isSaved = false;
  var isRunning = false;
  //----------initial page--------------------//
  $('#homePage').show(1000);
  $('#setupSimulatorPage').hide();
  $('#simulatePage').hide();
  $('#howToPlayPage').hide();

  //-----simulate--------//
  $('#truckAnimation').hide();
  $('#personOrder').hide();
  $('#userDemandMessage').hide();
  $('#finishSimulation').hide();

  //-------end-----------//

  //----------hide the side bar---------//
  $('#simulate').hide();
  $('#howToPlay').hide();
  //----------end---------------------//

  //----------initial page--------------------//

  //------------Set up simulator-------------//
  $('#setupSimulator').click(function () {
    $('#setupSimulatorPage').show(500);
    $('#homePage').hide();
    $('#simulatePage').hide();
    $('#howToPlayPage').hide();
    //----------set active--------//
    $(`#setupSimulator`).css('background-color', '#4caf50');
    $(`#setupSimulator`).css('color', 'white');
    $(`.sidebar`)
      .find('a')
      .each(function () {
        if (this.id !== 'setupSimulator' && this.id !== 'eiuLogo') {
          $(`#${this.id}`).css('background-color', '#f1f1f1');
          $(`#${this.id}`).css('color', 'black');
        }
      });
    //----------end-------------//
  });

  $('#buttonSave').click(function () {
    //------check the button--------//
    inputInitialInventory = $('#inputInitialInventory').val();
    inputStockoutPenality = $('#inputStockoutPenality').val();
    inputDemandMean = $('#inputDemandMean').val();
    inputDemandStdDev = $('#inputDemandStdDev').val();
    inputHoldingCost = $('#inputHoldingCost').val();
    inputOrderingCost = $('#inputOrderingCost').val();

    for (let e in inputObj) {
      if (inputObj[e] === '') {
        alert(`All fields must be filled👇👇👇!`);
        return;
      }
    }

    inputObj = {
      inputInitialInventory: Number(inputInitialInventory),
      inputStockoutPenality: Number(inputStockoutPenality),
      inputDemandMean: Number(inputDemandMean),
      inputDemandStdDev: Number(inputDemandStdDev),
      inputHoldingCost: Number(inputHoldingCost),
      inputOrderingCost: Number(inputOrderingCost),
    };

    isSaved = true;
    for (let e in inputObj) {
      $(`#${e.toString()}`).attr('readonly', true);
    }

    var EOQ = Math.ceil(
      Math.sqrt((2 * inputDemandMean * inputOrderingCost) / inputHoldingCost)
    );
    var estimatedNumberOfOrders = Math.ceil((inputDemandMean * 12) / EOQ);
    var estimatedNumberOfRounds = Math.ceil(EOQ / inputDemandMean - 1);

    console.log('EOQ', EOQ);
    console.log('estimatedNumberOfOrders ', estimatedNumberOfOrders);
    console.log('estimatedNumberOfRounds ', estimatedNumberOfRounds);

    $('#estimatedNumberOfOrders').text(estimatedNumberOfOrders);
    $('#estimatedNumberOfRounds').text(estimatedNumberOfRounds);
    $('#EOQ').text(EOQ);
    $('#buttonEdit').attr('disabled', false);
    $('#buttonSave').attr('disabled', true);
    console.log('inputObj', inputObj);
  });

  $('#buttonEdit').click(function () {
    $('#buttonEdit').attr('disabled', true);
    $('#buttonSave').attr('disabled', false);

    for (let e in inputObj) {
      $(`#${e.toString()}`).attr('readonly', false);
    }
  });
  console.log('is running ', isRunning);
  $('#buttonRun').click(function () {
    //------------show the side bar-------------//
    if (isRunning) {
      alert('The Sumilation is already running🏃🏃🏃!');
    }
    if (isSaved) {
      isRunning = true;
      $('#howToPlay').show(1000);
      $('#simulate').show(1000);
      $('#finishSimulation').show();
    } else {
      alert(`Please click the 'Save' button to continue👊👊👊!`);
    }
    console.log('is running ', isRunning);
    //--------------end-----------------------//
  });
  //---------------------end-----------------//

  //------------------Home-------------------//
  $('#home').click(function () {
    $('#setupSimulatorPage').hide();
    $('#homePage').show(500);
    $('#simulatePage').hide();
    $('#howToPlayPage').hide();
    //----------set active--------//
    $(`#home`).css('background-color', '#4caf50');
    $(`#home`).css('color', 'white');
    $(`.sidebar`)
      .find('a')
      .each(function () {
        if (this.id !== 'home' && this.id !== 'eiuLogo') {
          $(`#${this.id}`).css('background-color', '#f1f1f1');
          $(`#${this.id}`).css('color', 'black');
        }
      });
    //----------end-------------//
  });

  //---------------------end-----------------//

  //------------------Ho to Play---------------//
  $('#howToPlay').click(function () {
    $('#setupSimulatorPage').hide();
    $('#homePage').hide();
    $('#simulatePage').hide();
    $('#howToPlayPage').show(500);
    //----------set active--------//
    $(`#howToPlay`).css('background-color', '#4caf50');
    $(`#howToPlay`).css('color', 'white');
    $(`.sidebar`)
      .find('a')
      .each(function () {
        if (this.id !== 'howToPlay' && this.id !== 'eiuLogo') {
          $(`#${this.id}`).css('background-color', '#f1f1f1');
          $(`#${this.id}`).css('color', 'black');
        }
      });
    //----------end-------------//
  });

  //---------------------end-----------------//

  //------------------Simulate---------------//
  $('#simulate').click(function () {
    $('#setupSimulatorPage').hide();
    $('#homePage').hide();
    $('#simulatePage').show(500);
    $('#howToPlayPage').hide();
    //----------set active--------//
    $(`#simulate`).css('background-color', '#4caf50');
    $(`#setupSimulator`).css('color', 'white');
    $(`.sidebar`)
      .find('a')
      .each(function () {
        if (this.id !== 'simulate' && this.id !== 'eiuLogo') {
          $(`#${this.id}`).css('background-color', '#f1f1f1');
          $(`#${this.id}`).css('color', 'black');
        }
      });

    var inputHoldingCostSimulate = $('#inputHoldingCost').val()
      ? $('#inputHoldingCost').val()
      : 0;

    var inputOrderingCostSimulate = $('#inputOrderingCost').val()
      ? $('#inputOrderingCost').val()
      : 0;

    var initialMeanDemandSimulate = $('#inputInitialInventory').val()
      ? $('#inputInitialInventory').val()
      : 0;

    var lastWeekDemandSimulate = 0;

    $('#holdingCostSimulate').text(inputHoldingCostSimulate);
    $('#orderingCostSimulate').text(inputOrderingCostSimulate);
    $('#initialMeanDemandSimulate').text(inputDemandMean);
    $('#lastWeekDemandSimulate').text(lastWeekDemandSimulate);

    //----------end-------------//
  });

  //----------submit order button------------//
  $('#submitOrder').click(function () {
    if ($('#inputUnit').val() === '') {
      alert('please fill the input units !!!');
      return;
    }

    if (currentWeek < 12) {
      currentWeek++;
      if (currentWeek > 1) {
        $('#lastWeekDemandSimulate').text(
          weeks[currentWeek - 1].customerDemand
        );
      }

      $('#truckAnimation').show();
      $('#personOrder').show(2000);
      $('#userDemandMessage').show(2000);
      $('#animationClass').addClass('truckAnimation');

      //----reset------//

      setTimeout(() => {
        $('#truckAnimation').hide(1000);
        $('#personOrder').hide(1000);
        $('#userDemandMessage').hide(1000);
        $('#animationClass').removeClass('truckAnimation');
      }, 3000);
      //----end-------//
      if (currentWeek === 1) {
        weeks[
          currentWeek
        ].inventoryLevelBeginningOfWeek = inputInitialInventory;
        weeks[currentWeek].inventoryLevelAfterUnloading = inputInitialInventory;

        var customerDemand = [19, 20, 21];
        var random = randomIntFromInterval(0, 2);
        weeks[currentWeek].customerDemand = customerDemand[random];
        weeks[currentWeek].inventoryLevelEndOfWeek =
          weeks[currentWeek].inventoryLevelBeginningOfWeek -
          weeks[currentWeek].customerDemand;

        weeks[currentWeek].quantityOrdered = Number($('#inputUnit').val());
        weeks[currentWeek].orderCosts =
          weeks[currentWeek].quantityOrdered > 0 ? inputOrderingCost : 0;
        weeks[currentWeek].holdingCosts = Math.ceil(
          weeks[currentWeek].quantityOrdered * inputHoldingCost
        );

        weeks[currentWeek].totalCostIncludeStockoutPenality =
          weeks[currentWeek].orderCosts +
          weeks[currentWeek].holdingCosts +
          (weeks[currentWeek].inventoryLevelEndOfWeek > 0
            ? 0
            : inputStockoutPenality);
        weeks[currentWeek].totalCummulativeCost =
          weeks[currentWeek].totalCostIncludeStockoutPenality;
      } else {
        weeks[currentWeek].inventoryLevelBeginningOfWeek =
          weeks[currentWeek - 1].inventoryLevelEndOfWeek;

        weeks[currentWeek].inventoryLevelAfterUnloading =
          weeks[currentWeek - 1].inventoryLevelEndOfWeek +
          weeks[currentWeek - 1].quantityOrdered;

        weeks[currentWeek].inventoryLevelEndOfWeek =
          weeks[currentWeek].inventoryLevelBeginningOfWeek -
          weeks[currentWeek].customerDemand;

        weeks[currentWeek].quantityOrdered = Number($('#inputUnit').val());
        weeks[currentWeek].orderCosts =
          weeks[currentWeek].quantityOrdered > 0 ? inputOrderingCost : 0;
        weeks[currentWeek].holdingCosts = Math.ceil(
          weeks[currentWeek].quantityOrdered * inputHoldingCost
        );

        weeks[currentWeek].totalCostIncludeStockoutPenality =
          weeks[currentWeek].orderCosts +
          weeks[currentWeek].holdingCosts +
          (weeks[currentWeek].inventoryLevelEndOfWeek > 0
            ? 0
            : inputStockoutPenality);

        weeks[currentWeek].totalCummulativeCost = Math.ceil(
          weeks[currentWeek].totalCostIncludeStockoutPenality +
            weeks[currentWeek - 1].totalCummulativeCost
        );
      }

      var inventoryLevelBeginningOfWeek = $(
        '#inventoryLevelBeginningOfWeek'
      ).children();
      var inventoryLevelAfterUnloading = $(
        '#inventoryLevelAfterUnloading'
      ).children();

      var customerDemand = $('#customerDemand').children();
      var inventoryLevelEndOfWeek = $('#inventoryLevelEndOfWeek').children();
      var quantityOrdered = $('#quantityOrdered').children();
      var orderCosts = $('#orderCosts').children();
      var holdingCosts = $('#holdingCosts').children();
      var totalCostIncludeStockoutPenality = $(
        '#totalCostIncludeStockoutPenality'
      ).children();
      var totalCummulativeCost = $('#totalCummulativeCost').children();

      inventoryLevelBeginningOfWeek[currentWeek].innerText =
        weeks[currentWeek].inventoryLevelBeginningOfWeek;
      inventoryLevelAfterUnloading[currentWeek].innerText =
        weeks[currentWeek].inventoryLevelAfterUnloading;
      customerDemand[currentWeek].innerText = weeks[currentWeek].customerDemand;
      inventoryLevelEndOfWeek[currentWeek].innerText =
        weeks[currentWeek].inventoryLevelEndOfWeek;
      quantityOrdered[currentWeek].innerText =
        weeks[currentWeek].quantityOrdered;
      orderCosts[currentWeek].innerText = weeks[currentWeek].orderCosts;
      holdingCosts[currentWeek].innerText = weeks[currentWeek].holdingCosts;
      totalCostIncludeStockoutPenality[currentWeek].innerText =
        weeks[currentWeek].totalCostIncludeStockoutPenality;

      totalCummulativeCost[currentWeek].innerText =
        weeks[currentWeek].totalCummulativeCost;

      $('#week').text(currentWeek);
      $('#inputUnit').text('');
      console.log(weeks);
    } else {
      $('submitOrder').prop('disabled', true);
    }
  });
  //----------------------------------------//

  //--------------Finish the simulation---------//

  $('#finishSimulation').click(function () {
    if (
      confirm(
        'Are you sure you want to finish the simulation? Your work will be lost.'
      )
    ) {
      // Save it!
      window.location.href =
        'https://eiu-inventory-basics-simulator.netlify.app/';
    } else {
      // Do nothing!
      console.log('Do nothing');
    }
  });

  //------------end---------------------------//
  //---------------------end-----------------//
});

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

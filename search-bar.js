define(function (require, exports) {
  'use strict';

  require('highlight.js');
  
  var $ = require('jquery');

  exports.init = function () {
    $('body').scrollspy();
    $('#glossary-nav').enhancedFixedPosition();

    // Variables scoped outside of functions to keep track of results and previous
    // search so repeated enter key searching works
    var index = 0
      , previous_search= "";

    // frequently used jquery selectors
    var message = $("#search_message");
    var nextButton = $("#search_next");
    var prevButton = $("#search_prev");
    var $results;

    // submit function for main search button
    $("#search_box").on("submit", function(e) {
      // Prevent default function and remove previous highlights
      e.preventDefault();

      // Term that user searched for
      var text = $("#search_box input").val();

      // If search is same as last submit then iterate instead of a new search
      // and return false to exit
      if (text == previous_search) {
        if ($results.eq(index+1)) 
          nextButton.click();
        return false;
      }

      // otherwise reset index and get new previous search value
      index = 0;
      previous_search = text;

      // remove all highlights from previous searches
      $(".highlight").removeClass("highlight");
      $(".highlighted").removeClass("highlighted");

      // highlight all matches in main div then set results object equal to the highlighted
      // function currently does not return the highlighted
      $(".span13 *").highlight(text,"highlight");

      $results = $(".highlight");

      if ($results.length){
        // Animate through to each one as the user clicks next and add the class highlighted
        $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
        $results.eq(index).removeClass("highlight");
        $results.eq(index).addClass("highlighted");

        // Take action based on how many more results are available
        if ($results[index+1]) {
          // show how many results if > 1
          message.text("Result 1 of "+$results.length);
          // and make next button clickable
          nextButton.on("click",nextClicked);
          nextButton.addClass("button_background");
        } else {
          // If there were no results after the first show that there was 1 result
          message.text("Result 1 of "+$results.length);
        }
      } else {
        // If we didnt get results say so
        message.text("No result found");
      }
    });

    // If we had more than one result then we need the next button
    var nextClicked = function () {
      index++;
      // remove previous highlight and reset it to passive highlight
      $(".highlighted").removeClass("highlighted").addClass("highlight");
      
      // we know whenever this button is able to be clicked that there is a result.
      // so animate to it and highlight it and update count
      $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
      $results.eq(index).removeClass("highlight");
      $results.eq(index).addClass("highlighted");
      message.text("Result "+(index+1)+" of "+$results.length);

      // then do same logic to see if we should show next button again or end search
      if ((index+1) == $results.length){
        nextButton.off("click",nextClicked);
        nextButton.removeClass("button_background");
      }

      // will always be able to go backwards since we just went forwards
      // but attaching another handler without checking results in multiple
      // handlers that all fire when it is clicked
      if (!prevButton.data('events')){
        prevButton.on("click",prevClicked);
        prevButton.addClass("button_background");
      }

    };

    // handler function for previous button
    var prevClicked = function () {
      index--;
      // remove previous highlight and reset it to passive highlight
      $(".highlighted").removeClass("highlighted").addClass("highlight");
      // we know whenever this button is able to be clicked that there is a result.
      // so animate to it and highlight it and update count
      $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
      $results.eq(index).removeClass("highlight");
      $results.eq(index).addClass("highlighted");
      message.text("Result "+(index+1)+" of "+$results.length);

      // will always be able to go forwards since we just went backwards
      // but attaching another handler without checking results in multiple
      // handlers that all fire when it is clicked
      if (!$("#search_next").data('events')){
        nextButton.on("click",nextClicked);
        nextButton.addClass("button_background");
      }
      // then do same logic to see if we should show prev button again or end search
      console.log()
      if ((index-1) == -1){
        prevButton.off("click",prevClicked);
        prevButton.removeClass("button_background");
      }
    };
    //quick handler so that user can click search button repeatedly as well as hit enter to progress
    $("#search_submit").click(function () {
      $("#search_box").trigger("submit");
    });

  };

});

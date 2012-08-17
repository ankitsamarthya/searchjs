(function($) {

  $.searchBox = function(element, options) {

  // variables with global scope
  var plugin = this;

  plugin.settings = {}

  var $element = $(element),
       element = element;

  var defaults = {
    //$searchArea:  this
    $searchArea:  $element
    , message:    "#search_message"
    , nextButton: "#search_next"
    , prevButton: "#search_prev"
    , searchBox:  "#search_box"
    , searchHTML: 
      '<div id="search_box_div" >'
      + '<form id="search_box">'
      +   '<input id="search_query" type="text" name: "search_query" />'
      +   '<input id="search_submit" type="button" value="Search"/>'
      +   '<input id="search_next" type="button" value="Next"/>'
      +   '<input id="search_prev" type="button" value="Prev"/>'
      +   '<p id="search_message"></p>'
      + '</div>'
    }

  // constructor for plugin
  plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      
      // attach search box html to body
      $('body').prepend(defaults.searchHTML);

      // instantiate variables
      plugin.settings.previous_search =  "";
      plugin.settings.index           =  0;
      plugin.settings.$results        =  {}

      // get values from defaults where appropriate, later allow user to override
      plugin.settings.$searchBox   = $(defaults.searchBox);
      plugin.settings.$nextButton  = $(defaults.nextButton);
      plugin.settings.$prevButton  = $(defaults.prevButton);
      plugin.settings.$message  = $(defaults.message);

      // attach JS to search box html
      attachSearch();
  }

  // private function attaches search JS to proper elements
  var attachSearch = function() {

     $searchBox  = plugin.settings.$searchBox;
     $searchArea = plugin.settings.$searchArea;
     $nextButton = plugin.settings.$nextButton;
     $prevButton = plugin.settings.$prevButton;
     $message    = plugin.settings.$message; 
     var index   = plugin.settings.index;

    plugin.settings.$searchBox.on("submit", function (e) {
      e.preventDefault();

      // Term that user searched for
      var text = $searchBox.find('input').val();

      // If search is same as last submit then iterate instead of a new search
      // and return false to exit
      if (text === plugin.settings.previous_search) {
        if (plugin.settings.$results.eq(index + 1)) { 
          $nextButton.click();
        }
        return false;
      }

      // otherwise reset index and get new previous search value
      index = plugin.settings.index = 0;
      plugin.settings.previous_search = text;

      // restore to original HTML before new search
      $searchArea.removeHighlight();

      // wrap all matches in class of "highlight"
      $searchArea.highlight(text,"highlight");
      
      var $results = plugin.settings.$results = $(".highlight");

      if ($results.length) {
        $message.text("Result " + (index+1) + " of " + $results.length );

        // Animate through to each one as the user clicks next and add the class highlighted
        $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
        $results.eq(index).removeClass("highlight").addClass("highlighted");

        // Take action based on how many more results are available
        if ($results[index + 1]) {
          // show how many results if > 1
          $message.text("Result " + (index+1) + " of " + $results.length );
          // and make next button clickable
          if (!$nextButton.data('events')) {
            $nextButton.on("click", nextClicked).addClass("button_background");
          }
        } else {
          // If there were no results after the first show that there was 1 result
          $message.text("1 result found");
        }
      } else {
        // If we didnt get results say so
        $message.text("No results found");
      }
    });
  };

  // private handler function for nextclicked button
  var nextClicked = function () {
     // locals
     $nextButton = plugin.settings.$nextButton;
     $prevButton = plugin.settings.$prevButton;
     $message = plugin.settings.$message; 
     var index = ++plugin.settings.index;
     $results = plugin.settings.$results;

    // remove previous highlight and reset it to passive highlight
    $(".highlighted").removeClass("highlighted").addClass("highlight");
    
    // we know whenever this button is able to be clicked that there is a result.
    // so animate to it and highlight it and update count
    $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
    $results.eq(index).removeClass("highlight").addClass("highlighted");
    $message.text("Result " + (index + 1) + " of " + $results.length );

    // then do same logic to see if we should show next button again or end search
    if ( (index+1) === $results.length) {
      $nextButton.off("click",nextClicked).removeClass("button_background");
    }

    // will always be able to go backwards since we just went forwards
    // but attaching another handler if one exists results in multiple
    // handlers that all fire when it is clicked
    if (!$prevButton.hasClass("button_background")){
      $prevButton.on("click",prevClicked).addClass("button_background");
    }

  };

  // private handler function for previous button
  var prevClicked = function () {
    // locals
    $nextButton = plugin.settings.$nextButton;
    $prevButton = plugin.settings.$prevButton;
    $message    = plugin.settings.$message; 
    var index   = --plugin.settings.index;
    $results    = plugin.settings.$results;
  
    // remove previous highlight and reset it to passive highlight
    $(".highlighted").removeClass("highlighted").addClass("highlight");
    
    // we know whenever this button is able to be clicked that there is a result.
    // so animate to it and highlight it and update count
    $('html, body').animate({ scrollTop: $results.eq(index).offset().top-5}, 0);
    $results.eq(index).removeClass("highlight").addClass("highlighted");
    $message.text("Result " + (index + 1) + " of " + $results.length );

    // will always be able to go forwards since we just went backwards
    // but attaching another handler without checking results in multiple
    // handlers that all fire when it is clicked
    if (!$prevButton.hasClass("button_background")){
      $nextButton.on("click",nextClicked).addClass("button_background");
    }

    // then do same logic to see if we should show prev button again or end search
    if ( (index-1) === -1 ){
      $prevButton.off("click",prevClicked).removeClass("button_background");
    }
  };

  // call plugin init() when everything is defined
  plugin.init();
}

// create searchbox plugin with all its data
$.fn.searchBox = function(options) {
  return this.each(function() {
      if (undefined == $(this).data('searchBox')) {
          var plugin = new $.searchBox(this, options);
          $(this).data('searchBox', plugin);
      }
  });
}

})(jQuery)
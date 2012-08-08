(function($){
  // jQuery function to wrap in span tags with the passed in class any text that
  // matches the passed in text. Will only occur within the element we called the
  // function on.
  $.fn.highlight = function (str, className) {     
    // Setup regular expression with options gi to match all searches and be case insensitive     
    var regex = new RegExp(str, "gi");
    this.data('previousHtml',this.html());
    // Get all elements (this and children) of the calling object
    return this.find('*').andSelf().each(function () {
        // Get the contents of the element, which means all children including text nodes. then filter...
        $(this).contents().filter(function () {
           // Only perform the next operation on an element if it is type 3 (text), and matches our regex
            return this.nodeType === 3 && regex.test(this.nodeValue);
        })
          // If we passed then replace all occurences of the matching text with a span class = "highlighted"
          .replaceWith(function () {
            return (this.nodeValue).replace(regex, "<span class=\"" + className + "\">$&</span>");
        });
    });  
  };
  
  // simple restore of previous html
  $.fn.removeHighlight = function () {
    this.html(this.data('previousHtml'));
  };

})(jQuery);

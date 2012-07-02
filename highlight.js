  // jQuery function to wrap in span tags with the passed in class any text that
  // matches the passed in text. Will only occur within the element we called the
  // function on.
  jQuery.fn.highlight = function (str, className) {     
    //  setup regular expression with options gi to match all searches and be case insensitive     
    var regex = new RegExp(str, "gi");
    //  loop through all instances of object that we were called on
    return this.each(function () {
        //  get the contents of the element, which means all children including text nodes. then filter...
        $(this).contents().filter(function () {
           //only perform the next operation on an element if it is type 3 (text), and matches our regex
            return this.nodeType == 3 && regex.test(this.nodeValue);
        })
          //  if we passed then replace all occurences of the matching text with a span class = "highlighted"
          .replaceWith(function () {
            return (this.nodeValue).replace(regex, "<span class=\"" + className + "\">" + str + "</span>");
        });
    });  
  };
});
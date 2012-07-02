  
  // jQuery function to wrap in span tags with the passed in class any text that
  // matches the passed in text. Will only occur within the element we called the
  // function on.
  jQuery.fn.highlight = function (str, className) {     
    //  setup regular expression with options gi to match all searches and be case insensitive     
    var regexNoCase = new RegExp(str, "gi");
    //  loop through all instances of object that we were called on
    return this.each(function () {
        //  get the contents of the element, which means all children including text nodes. then filter...
        $(this).contents().filter(function () {
           //only perform the next operation on an element if it is type 3 (text), and matches our regex
            return this.nodeType == 3 && regexNoCase.test(this.nodeValue);
        })
          .replaceWith(function () {
            
            // get all of the unique matches to then search for globally with case
            var matches = $.unique(this.nodeValue.match(regexNoCase));
            var replacements = [];

            //get a proper regex replacement string to match each case of the word found
            for (var val in matches){
              replacements[val] = "<span class=\"" + className + "\">" + matches[val] + "</span>";
            }            
            
            // for each unique case, replace all of its occurences case sensitively
            for( var val in matches){
                var regexCase = new RegExp(matches[val], "g");
                (this.nodeValue) = (this.nodeValue).replace(regexCase, replacements[val]);
            }

            return this.nodeValue;

            //var x =(this.nodeValue).replace(regex, "<span class=\"" + className + "\">" + str + "</span>");
            //return x;
        });
    });  
  };
});

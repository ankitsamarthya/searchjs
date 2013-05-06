*SearchBox.js*
==============

Jquery plugin to automatically add search features to a webpage. highlight.js is a plugin to automatically wrap or unwrap any text on a page in a span of a chosen class. searchBox.js leverages this functionality to create an automated fixed search box in the top right of the page.

Check out highlight.js for some DOM traversal fun. 

Open sample.html to see the plugin in action. All that is needed is a few lines of include statements in the html, and it will inject the rest of the code from there. The css for the searchbox itself is kept in searchBox.css for easy customization. Just make sure it is accessible from the html and path you give it. 

Note that the highlight.js file and jquery are included manually in the html. I wanted to avoid the overhead of requiring the user to also have requirejs or something similar. So feel free to include the files in a more efficient way. 

A sample page can be accessed here 

http://htmlpreview.github.io/?https://github.com/bcliffor/searchjs/blob/master/sample.html

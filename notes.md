# Unit 1 Notes
## Git
+ Git allows you to track files file versions in a directory
+ "git status" tells you what files have been changed on in the git directory
+ "git add ." stages and makes changes ready to be commited
+ "git commit -am" you always need to include a message when you commit your work. Adding the A allows means you don't have to add the changes before commiting.
+ "git log" shows every version after each commit. It provides a record.
+ Branching Sequence: "git branch A", "git checkout A", make changes to either, "git checkout master", "git merge A"
+ Use fork to make a copy of a repository.

## Simon -HTML
+ HTML is all about the structure. We are not concerned about style or interactivity.
+ Start with a file called "index.html" which will be the starting page for your application.
+ Each page has a header, body and footer which should have the link to the github repository.
+ I need to make sure that my startup has the rubric points.
+ HTML is a markdown language.
+ use "\<form>" for the login button.
+ Things to use: "\<table>", "<\button>", "\<svg>"
+ Install "Live Server Extension for VSCode
+ When I'm ready to deploy my script, I will use a .sh file called "deployFiles.sh"

How to connect to my webserver via ssh: ssh -i garrett422.pem ubuntu@18.209.80.42
I can use a Domain name using a Domain Name System \(DNS) server to navigate to my web application. The domain name I'm using for my application is musclegenius.link
Caddy service acts like a middleman for my web server.

## HTML
+ When writing in HTML I always need to include the "\<!DOCTYPE html>" at the top
+ I should use the "\<Table>" element when creating my calendar. For rows use "\<tr>"
+ How to include links: "\<a href="https://www.byu.edu/">BYU\</a>"
+ How to include images: "\<img src="link_to_image">
+ I should use the "\<select>" and "\<optgroup>" input for categorizing the different exercises available for selection.
+ div is a block element that allows me to divide sections of html into groups

## Useful CSS commands
Property	Value	Example	Discussion
+ background-color	color	red	Fill the background color
+ border	color width style	#fad solid medium	Sets the border using shorthand where any or all of the values may be provided
+ border-radius	unit	50%	The size of the border radius
+ box-shadow	x-offset y-offset blu-radius color	2px 2px 2px gray	Creates a shadow
+ columns	number	3	Number of textual columns
+ column-rule	color width style	solid thin black	Sets the border used between columns using border shorthand
+ color	color	rgb(128, 0, 0)	Sets the text color
+ cursor	type	grab	Sets the cursor to display when hovering over the element
+ display	type	none	Defines how to display the element and its children
+ filter	filter-function	grayscale(30%)	Applies a visual filter
+ float	direction	right	Places the element to the left or right in the flow
+ flex			Flex layout. Used for responsive design
+ font	family size style	Arial 1.2em bold	Defines the text font using shorthand
+ grid			Grid layout. Used for responsive design
+ height	unit	.25em	Sets the height of the box
+ margin	unit	5px 5px 0 0	Sets the margin spacing
+ max-\[width/height]	unit	20%	Restricts the width or height to no more than the unit
+ min-\[width/height]	unit	10vh	Restricts the width or height to no less than the unit
+ opacity	number	.9	Sets how opaque the element is
+ overflow	\[visible/hidden/scroll/auto]	scroll	Defines what happens when the content does not fix in its box
+ position	\[static/relative/absolute/sticky]	absolute	Defines how the element is positioned in the document
+ padding	unit	1em 2em	Sets the padding spacing
+ left	unit	10rem	The horizontal value of a positioned element
+ text-align	\[start/end/center/justify]	end	Defines how the text is aligned in the element
+ top	unit	50px	The vertical value of a positioned element
+ transform	transform-function	rotate(0.5turn)	Applies a transformation to the element
+ width	unit	25vmin	Sets the width of the box
+ z-index	number	100	Controls the positioning of the element on the z axis
+ Animation commands: use ease-in-out for transitioning. TranlateX and Translate Y can be used for moving objects. I can make popups with by changing size of elements in from and to.

## Javascript
+ 
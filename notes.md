# Unit 1 Notes
## Git
+ Git allows you to track files file versions in a directory
+ "git status" tells you what files have been changed on in the git directory
+ "git add ." stages and makes changes ready to be commited
+ "git commit -am" you always need to include a message when you commit your work. Adding the A allows means you don't have to add the changes before commiting.
+ "git log" shows every version after each commit. It provides a record.
+ Branching Sequence: "git branch A", "git checkout A", make changes to either, "git checkout master", "git merge A"
+ Use fork to make a copy of a repository.
+ the following command makes a script executable: chmod +x deploy.sh
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
+ @import url('quicksand'); import fonts
+ column-reverse will reverse the display of elements.
+ regex: /i character insensitive, 
+ use @media queries for responsive design.

## Javascript
+ Timer: console.time\('demo time'); some code that takes a long time. console.timeEnd\('demo time');
+ Proper syntax for adding javascript to html: \<script src="javascript.js"></script> or \<button onclick="let i=1;i++;console.log(i)">press me</button>
+ Ternary operator a === 1 ? console.log(1) : console.log('not 1')
+ for loop syntax: for \(let i = 0; i < 2; i++) \{
  console.log(i);
}
+ use for \(const key in obj) \{} for keys and for \(const value of obj) for values
+ string literal: console.log\(`string ${l + (1 + 1)} text`);
+ String functions: 
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
+ sort function: a.sort((v1, v2) => v1 - v2);
+ arrow functions inherit the this pointer from the scope of where it is created.
+ Important function syntax: function testAll(input, tester) \{
  return input.every(tester);
}

const result = testAll\(\["abc", "bbbbb"], \(i) => i.length > 3);
+ List functions:
values	Creates an iterator for use with a for of loop	for \(i of a.values()) \{...}
find	Find the first item satisfied by a test function	a.find(i => i < 2)
forEach	Run a function on each array item	a.forEach(console.log)
reduce	Run a function to reduce each array item to a single item	a.reduce((a, c) => a + c)
map	Run a function to map an array to a new array	a.map(i => i+i)
filter	Run a function to remove items	a.filter(i => i%2)
every	Run a function to test if all items match	a.every(i => i < 3)
some	Run a function to test if any items match	a.some(i => 1 < 1)
+ JSON format: \{"a":2, "b":"crockford"}
+ Any function that returns an object is considered a constructor and can be invoked with the new operator.
+ You can make properties and functions of classes private by prefixing them with a #
+ the extends keyword defines inheritance. Parents function can be accessed with super()
+ Regex: const literalRegex = /ab*/i;
+ Destructuring: 
const a = \[1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const \[b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
+ local storage functions:
setItem(name, value)	Sets a named item's value into local storage
getItem(name)	Gets a named item's value from local storage
removeItem(name)	Removes a named item from local storage
clear()	Clears all items in local storage
+ Promise syntax: 
const coinToss = \() => \{
  return new Promise((resolve, reject) => \{
    setTimeout(() => \{
      if \(Math.random() > 0.1) \{
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else \{
        reject('fell off table');
      }
    }, 1000);
  });
};
try \{
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) \{
  console.error(`Error: ${err}`);
} finally \{
  console.log(`Toss completed`);
}
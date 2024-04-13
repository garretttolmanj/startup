# Muscle Genius - A Lifter's App
## Description Deliverable
### Elevator Pitch
Muscle Genius is a lifting app designed for people who love working out. The main feature is the interactive calendar which allows you to plan workouts and track your progress seamlessly. To start, simply select a day on the calendar and choose from a list of exercises. When an exercise has been chosen, enter how many sets and reps you plan to do. Capture every set, rep, and weight while working out to share your achievements and workout plans with your lifting buddies. Your heaviest weight lifted will be recorded in your personal stats! Get ready to lift some weights!
### Design
<img src="https://github.com/garretttolmanj/startup/assets/135668991/a15c7556-80dc-4cf7-8668-73da52949681" width="500"> 

### Key Features
+ Secure login over HTTPS
+ Interactive Calendar
+ Ability to select from a list of exercises
+ Ability for user to add new exercises to their list of exercises
+ Ability to enter and change information about the user's workout such as sets and reps
+ Ability to copy workout plans from one day to another day on the calendar
+ Database that stores calendar information as well as user stats automatically collected from workouts
+ Ability to view the user's stats \(Example: Max weight lifted on Bench Press)
+ Ability to view realtime data input from friends including their stats and workout-calendar \(users may only view not edit their friend's calendars)
### Technologies
+ HTML - I will use HTML to create the structure/backbone of my calendar application. There should be two HTML pages, one for login and one for the workout-calendar.
+ CSS - I will use CSS to style my calendar, title, tables, pop-ups, and dropdowns.
+ JavaScript - I will use JavaScript to make the entire workout calendar interactive including dropdown tables, pop-ups, and other icons.
+ Web service - I will use a web service to store and retrieve login information, workout data for the user's calendar and stats, list and interact with the user's friends. 
+ Authentication - I will use authentication technology for creating user accounts and logging in.
+ Database persistence - I will use database technology for storing user and friend's calendar data and for saving login information. I will also use a database for default exercises and a user's added personal exercises.
+ WebSocket - As each user inputs information, their stats and workout information are displayed to other users/friends.
+ Web framework - I will set up my app to use the React web framework. I want to make my application compatible with a laptop or a smartphone.

## HTML Deliverable
In this deliverable I used HTML to build the structure of my startup application
+ **HTML Pages**- I created 5 HTML pages that represent the following: Logging in, the main page/interactive calendar, the stats database, interacting with friends, viewing friends' workout calendar.
+ **HTML tags**- On each page I used HTML tags including BODY, NAV, MAIN, HEADER, FOOTER.
+ **Links**- In the NAV section of each page I inculded links between the different HTML pages. The Login button links directly to the main calendar page. Clicking on the friend placeholders directs the users to the friend_view html page.
+ **Application textual content**- Each page includes textual content including the header and placeholder text for the other technologies.
+ **3rd party service calls**- The quote on the login index.html is a placeholder for 3rd party service calls that will provide motivational quotes.
+ **Images**- I included a Muscle Genius Logo image on each html page as well as an image of some weights on the the login page.
+ **Login**- On the index.html page I included a login placeholder with both username and password inputs. 
+ **Database**- The login placeholder, the interactive calendar, exercise selection, and the personal record information on the stats page represent where database will be used.
+ **WebSocket**- the friends_view.html contains a placeholder message center that will be used for realtime messaging between users. To navigate to this placeholder select one of the friends on the friends.html page.

## CSS Deliverable
+ -done- Simon CSS deployed to the production environment.
+ -done- A link to this GitHub startup repository prominently display on the application's home page.
+ -done- Notes in this startup Github repository README.md.
+ -done- 30% Header, fotter, and main content body. I used flex to layout each section.
+ -done- 20% Navigation elements. I used Bootstrap to create a navbar on each page.
+ -done- 10% Responsive design. Each page resizes for according to the screen size. I used some @media queries to shift elements around on phone screens.
+ -done- 20% Application elements: I used bootstrap grid to create the calendar as well as style all the input sections.
+ -done- 10% Application text content: The text is displayed using the Impact font.
+ -done- 10% Application images. I added a new logo designed by my sister Lauren Johnson. I rounded the images' edges in the Navbar.

[NOTES](https://github.com/garretttolmanj/startup/blob/main/notes.md)

## Javascript Deliverable
+ -done- Simon Javascript deployed to the production environment
+ -done- A link to this GitHub startup repository prominently display on the application's home page.
+ -done- Notes in this startup Github repository README.md.
+ -done- More than 10 commits spread consistently through the assignment period.
+ -done- 20% JavaScript support for future login. Username is displayed in the header and is used to access a user's data from previous use.
+ -done- 20% JavaScript support for future database data. I created a User class that stores important data for each user including their username, password, exercise list, friend list, and calendar data.
+ -done- 20% JavaScript support for future WebSocket. I implemented some placeholders in the friends.html page that will allow users to accept or decline incoming friend requests. The user is also able to view the calendar of each friend.
+ -done- 40% JavaScript support for your application's interaction logic. The calendar is now completely interactive with the ability to toggle between months, add workouts to each calendar day, and log completed sets. The exercise list can be updated by pressing the Exercises button in the header and selecting the Add Exercise button. The javascript used in the stats file finds the user's highest weight used in a set for each exercise and adds it to the stats table.

## Service Deliverable
+ -done- Simon service deployed to the production environment
+ -done- A link to this Github startup repository prominently displayed on the application home page.
+ -done- Notes in this startup Github repository README.md.
+ -done- More than 10 commits spread consistently through the assignment period.
+ -done- 40% Created an HTTP service using Node.js and Express
+ -done- 10% Frontend served up using Express static middleware
+ -done- 10% The frontend calls third party service endpoints as displayed by the motivational quotes on the main page.
+ -done- 20% The backend provides service endpoints. I still need to add some more functionality to the friends page but everything else is working smoothly. 
+ -done- 20% The frontend calls service endpoints.

## Login Deliverable
+ -done- Simon Login deployed to the production environment
+ -done- A link to this GitHub startup repository prominently displayed on your application's home page
+ -done- Notes in this startup Git repository README.md file.
+ -done- 10 git commits spread consistently throughout the assignment period.
+ -done- 20% Supports new user registration
+ -done- 20% Supports existing user authentication
+ -done- 20% Stores application data in MongoDB
+ -done- 20% Stores and retrieves credentials in MongoDB
+ -done- 20% Restricts application functionality based upon authentication

## WebSocket Deliverable
+ -done- Simon WebSocket deployed to the production environment
+ -done- A link to this GitHub startup repository prominently displayed on the application's home page
+ -done- Prerequisite: Notes in this startup Git repository README.md file.
+ -done- 20% Backend listens for WebSocket connection in the peerProxy.js file.
+ -done- 20% Frontend makes WebSocket connection in the calendar.js, friend_view.js, and friends.js.
+ -done 30% Data sent over WebSocket connection: Friend Request events and calendar updates are sent over the WebSocket connection.
+ -done- 30%  WebSocket data displayed in the application interface: When friend requests are sent over the webSocket connection and the recipient of the request is connected via the webSocket, the request is displayed their screen. The same thing works with the calendar and the friend view. 

## React Deliverable

+ -done- Prerequisite: Simon React deployed to the production environment
+ -done- Prerequisite: A link to this GitHub startup repository prominently displayed on theapplication's home page
+ -done- Prerequisite: Notes in this startup Git repository README.md file
+ -done- Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ -done- Application converted to use React
+ -done- 10% The application is bundled using Vite and runs React completely.
+ -done- 30% Multiple functional react components. There are functional components for logging in, creating an Account, the calendar, modals, stats, and others.
+ -done- 30% React router. I used BrowswerRouter, NavLinks, and Routes to make navigation on my application quick and simple.
+ -done 30% React hooks. I heavily relied on hooks for the the Calendar component and the CalendarModal component.
+ -note- for some reason my logo was not being render after deploying and I wasn't able to figure out what was going on.
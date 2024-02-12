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
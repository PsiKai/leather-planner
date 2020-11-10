A full stack application using React framework, and Node.js express server backend.

This app features full desktop and mobile responsiveness,
and has the elegant, classic design of an old-school leather planner.

Users will be directed to the list for the current day when landing on the first page.  
From there, they can use the calendar date picker to see the lists for any other
day and make changes to them.

List items are saved immediately to the database,
and are crossed off upon clicking on the text.  
The items are not deleted, but are saved with their crossed off state to give users
the ability to look into the past to see which items were or weren't completed on
any given day.

Global app state is managed with context API.  
Data is persisted with MongoDB.  
This app includes a weather widget that does a simple IP trace to get the weather
for the local area and display it with OWFont iconography.

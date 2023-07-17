# Community Ali Website Contributing Guide
## Github
Add a comment prefix to your commits and keep them short

Fix: (Very brief explaination of the problem, if people want to know more they can always look at the code) <br>
ex: Fix: Inconsistent link hover behaviour

Feature: (Verb like add or implement) (The feature you implemented)<br>
ex: Feature: Change footer text color to match the default<br>
ex: Feature: Implement categories filter clear button

Chore: (Verb like rework or remove) (What code you refactored) <br>
ex: Chore: Drop unused buttons

## Node.js
### File Organization
controllers: contains javascript files that hold all the modification, addition, or requisition of mongoDB documents of a certain model<br>
routes: contains javascript files the hold the routes for a certain model

## React.js
### Practices
Don't copy code for the same element more two times, if you see your self using the same element over and over again please turn it into a component so that it is easier to modify those elements later on. <br>
Please make use of arrays and their functions for repeating the same element over and over again, javascript's array.map is very usefull and if you are working on frontend react please have a basic understanding of it. Proper use of arrays will save backend developers a lot of trouble connecting frontend to backend, as more likely than not we will have to refactor you code to use arrays anyway.
### Naming variables and functions
Don't use arbitrary names that only you would understand please, you are working on a team and if someone else needs to work on a part that you have worked on and they can't understand what something does by its variable name or function name this hurts productivity. We have auto correct so don't be afraid of making long descriptive names instead of short undescriptive names. Don't go over board with this you can rely on an amount of context to assist with your naming, such as in loops, function input variables, and var variables in functions.

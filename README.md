# craving-saving-gr5

Instructions:
* Run "npm install".
* Install mongodb, and have the database server running. (Refer to mongoDB manual)
* Run with "node server.js"
* If you want to have the server update the resources as you go,
* "npm install -g nodemon" and then "nodemon server.js"

* MongoDB: the database we're using. MongoDB uses "Scheme"s as displayed in app/models/user.js.

Packages:
* express : server-side logic
* ejs : templating tool for reusing html, as well as passing in variable values to html
* mongoose : use to access mongoDB
* passport : handles user authentication
* connect-flash : allows passing in flash messages (such as login errors, etc)
* bcrypt : hashes passwords

Directories:
* app : server-side handling
	* models : Schemas
		* user.js : describes the database user entry
	* routes.js : routing requests server-side
* config : configuration
	* database.js : the database URI
	* passport.js : authentication, login, signup
* public : javascripts, css, images, other static files to be served
* views : EJS views 
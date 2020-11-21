# How to set up our project

## Prerequisites

Node.js / npm

MySQL

## Setting up the database

1. Open mysql in your terminal (for me, I do `mysql -u root -p`)
2. Create a new database in your mysql named `hallett_kashyap_tanzillo_database`
3. Exit out of mysql in your terminal
4. Run the command ` mysql -u root -p hallett_kashyap_tanzillo_database < hallett_kashyap_tanzillo_sqldump.sql` (using your credentials instead of root if necessary)
5. On lines 14 and 15 of the `server.js` file, replace the strings for user and password with your mysql credentials.

## Setting up the node server

6. Run `npm install` in the 411Project directory
7. Once that has finished installing, run the server using `npm start`
8. Visit `localhost:8080` in your web browser to see the results!

You should end up seeing a picture something like this:

![Image of our Census Project](https://imgur.com/qMw7KBK.png)

Please enjoy our project, and feel free to reach out to me at `peyton.tanzillo@huskers.unl.edu` if you have any questions.

Thanks, and have a great day! 

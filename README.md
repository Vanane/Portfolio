# Portfolio
My personal portfolio code, hosted on a VPS.
## What ?
## Why ?
## Installation
### Installing the app
This application is using Node JS, and therefore Node package manager. In order to install it, you will need the latest Node JS and NPM versions. You also need PostGreSQL v11 or Better.

After you installed every prerequisite, you can clone the repository in the folder you want your Portfolio to be installed.

	$ git -clone https://github.com/Vanane/Portfolio.git
	
You can then install all of NPM required packages with the following command, after you have `cd Portfolio`'d into the project's root folder :

	$ npm install
	
Every module should download and install automatically. In the case of an error related to a specific package or NPM itself, you may reach their docs.

### Initiating the database
The default configuration for PostGreSQL creates a Unix user called `postgres`, which is the only user allowed to connect to the database through ident (aka you connect with your Unix login, and no password).

#### Using another user than postgres to start the application

If you're planning on using another user to launch the application, you will have to configure PostGreSQL, and allow for your user to connect to the database by using a password instead. This configuration is located in a folder.
To login as `postgres`, you can use `su`. __Note that you need to be super user in order to do so !__ :

	# su postgres

To find this folder, open PostGreSQL with the user `postgres` :

	$ psql

The PSQL terminal will open. You can therefore write SQL to manipulate the database. In our case we need to retrieve the config file location, this can be done with :

	=# SHOW hba_file;

This command should display the location of the file. You can therefore open and edit it.

TODO : add a guide to add a line in the file

#### Importing SQL files

	$ psql your_database < /path/to/file.sql

In order to store projects, users and sessions, you need to import two SQL files. The first one contains the table creation scripts for Project and WebUser, and is located under `./bin/sql/portfolio.sql`. The second one is specific to the session storing system that is used : connect-pg-simple. The script is located under `./node_modules/connect-pg-simple/table.sql`. You will need to import both files.
	
#### Creating SQL account
- with postgres : create extension
- create user
- grant all privileges on portfolio database
- grant all privileges on portfolio tables
- grant ownership on all tables
- use this user to import your scripts, and access your database
	

# Fullstack-Profile-Model
Full-stack web app using Angular 18, Django REST API, and MySQL.

## 1.First of all need to setup
1.Open terminal and my sql 
   1. mysql -u root -p and enter the password
1.Open the terminal and setup git 
1.Open the editor and run the virtual environment. 
   1.source .venv/bin/activate
1.Open the git and create branch called dev for working

## 2.Start the building Web App 
2.Install the package (can see these libraries under the lib folder)
  2.django 
  2.djangoframework
  2.pymysql
2.Start the working on project 
  2.django -admin startproject profile_1 (name of the project)
   _after that created profile_1 file and manage.py file _
2.change the directry to profile_1 
   - cd profile_1  
2.create the api file - run,
   - python manage.py startapp api (name)

## 3.Create the Database 
3.Open the terminal and run 
  3.CREATE DATABASE profile_master;
3.Check the database
  3.SHOW DATABASES;
3.To change the database ( work on the database)
  3.USE profile_master;

## 4.Work on the settings.py file
Open the settings.py file
- inside the settings.py edit the infomations under installed app
    - add :
      'rest_framework',
      'api',

- inside the Databases:
      - add:
         NAME:'Profile_master',
         USER:'Root',
         PASSWORD:'',
         HOST:'Localhost',
         PORT:3306,

        
    
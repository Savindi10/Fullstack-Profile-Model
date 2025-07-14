# Fullstack-Profile-Model
Full-stack web app using Angular 18, Django REST API, and MySQL.



A full-stack web application using ***Angular 18***, ***Django REST Framework***, and ***MySQL.***

---

## >>> Initial Setup

### 1. MySQL Setup
```bash
mysql -u root -p
Enter your MySQL password when prompted.


### 2. Git Setup
```bash
git init
git checkout -b dev
Create a new branch called dev for working.


### 3. Virtual Environment
Activate the virtual environment:
```bash
source .venv/bin/activate


----

## >>> Build the Web App

### 1. Install Required Packages
Install the necessary packages (you can also see them under the lib folder):

```bash
pip install django djangorestframework pymysql


### 2. Create the Django Project
Start the Django project:
```bash
django-admin startproject profile_1

After this, the **profile_1 folder** and **manage.py** file will be created.

Navigate into the project directory:
```bash
cd profile_1


###3. Create the API App
Create a new app named api:
```bash
python manage.py startapp api


----

## >>> Create the Database
1. Open MySQL and Run:
```sql
CREATE DATABASE profile_master;
SHOW DATABASES;
USE profile_master;


----

Configure settings.py
Open the **profile_1/settings.py** file.

1. Add Installed Apps
Inside the **INSTALLED_APPS** section, add:
```python
'rest_framework',
'api',
```

2. Configure Database
Replace the DATABASES section with the following:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'profile_master',
        'USER': 'root',
        'PASSWORD': '',  # Enter your MySQL password here
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

Notes

   -Always activate your virtual environment before running commands:

source .venv/bin/activate

    -Ensure MySQL server is running before starting the Django project.

    -Work on the dev branch and merge with main when the project is stable.


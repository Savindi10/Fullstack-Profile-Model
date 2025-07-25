# Fullstack-Profile-Model




A full-stack web application using ***Angular 18***, ***Django REST Framework***, and ***MySQL.***

---

> ## >>> 1.Initial Setup


#### 1.1 > MySQL Setup
```bash
mysql -u root -p
Enter your MySQL password when prompted.
```

#### 1.2 > Git Setup
```bash
git init
git checkout -b dev
Create a new branch called dev for working.
```

#### 1.3 > Virtual Environment Setup
Activate the virtual environment:
```bash
source .venv/bin/activate
```
 
 ---
 
 ##     IMPORTANT NOTE

- Always activate your virtual environment before running commands:

  ```bash
  source .venv/bin/activate


    Ensure MySQL server is running before starting the Django project.

    Work on the dev branch, and merge with main only when the project is stable.



----

## >>> 2.Build the Web App

#### 2.1 > Install Required Packages
Install the necessary packages (you can also see them under the lib folder):
```shell
pip install django djangorestframework pymysql
```

#### 2.2 > Create the Django Project
Start the Django project:
```bash
django-admin startproject profile_1
```

After this, the ***profile_1 folder*** and ***manage.py*** file will be created.

Navigate into the project directory:
```bash
cd profile_1
```

#### 2.3 > Create the API App
Create a new app named api:
```bash
python manage.py startapp api
```

----

## >>> 3.Create the Database
#### 3.1 > Open MySQL and Run:
```sql
CREATE DATABASE profile_master;
SHOW DATABASES;
USE profile_master;
```
----

#### 3.2 > Configure settings.py
Open the ***profile_1/settings.py*** file.

        1. Add Installed Apps
         Inside the ***INSTALLED_APPS*** section, add:
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


---


## >>> 4.Configur the URL
+ Need to create file under the ***api Folder*** as ***urls.py***
```python
from django.urls import path,include
from rest_framework import DefaultRouter
from .views import ProfileViewSet

router=DefaultRouter()
router.register(r'profiles',ProfileViewSet)

urlpatterns=[
    path('api/',include(router.urls))
]
```

+ Next on the ***urls.py*** on ***profile_1*** file
```python
   from django.urls import path,include
   path('',include('api.urls')),
```

+ Next step is run the server 
```python
      python manage.py runserver
```

+ Now you got the message and link like this :
```shell
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
July 14, 2025 - 20:40:12
Django version X.X.X, using settings 'profile_1.settings'
Starting development server at (http://127.0.0.1:8000/)
Quit the server with CONTROL-C.
```

+ You can get the Django Rest framework by this link :
      (http://127.0.0.1:8000/api/profiles/)

+ You can add your records in there and click post button 

+ Check the Database and get the records 
```sql
     SELECT * FROM profiles;
```

---

## >>> 5.AVOIDE CORS ORIGIN ISSUE
 * NOTE : QUITE FROM SERVER BY :
   ```shell
   ENTER CTRL+C 
   ```
+ Change the path for ***profile_1*** and install _django-cors-headers_
```python
    cd profile_1
    pip3 install django-cors-headers
 ```

+ Next go to ***settings.py***
  - At the ININSTALLED_APPS section add:
```python
          INSTALLED_APPS = 
            'corsheaders',
```
   - At the MIDDLEWARE section add:
```python
MIDDLEWARE = 
    'corsheaders.middleware.CorsMiddleware',  
    'django.middleware.security.SecurityMiddleware',
```

 - At the End of **settings.py** section add:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]
```

---

##  ~  FrontEnd Development Process ~

## >>> 1. Angular Project Initialization

  - Open new Terminal on VS code (code Editor)
  - Run the command - in here folder name is _**profile_web**_:
     ```shell
     ng new profile_web
     ```
  - Select the stylesheet format as _**CSS**_
  - It created folder of _**profile_web**_ on VS code under the app folder .

---

## >>> 2. Run the Angular App Locally.

  - Change the path to folder _**profile_web**_
     ```shell
         cd profile_web
         ng serve -o
     ```
  - Choose Yes/No for sharing usage data (first time only).
  - The server will compile the app and open  URL :

     ("http://localhost:4200/")   in your browser.
  - Copy and paste the URL on browser.

---

## >>> 3. Connect Angular Frontend to Django Backend (Proxy Setup)
    To allow the Angular app (running on port 4200) to communicate with the   
    Django backend (running on port 8000) without CORS issues, 
    we use a proxy configuration.

         1. Create **`proxy.config.json`** in the Angular root folder
   ```shell 
           profile_web/src/proxy.config.json
   ```
         2. Edit the  **`proxy.config.json`** file 
   ```json
            {
               "/api": {
               "target": "http://127.0.0.1:8000",
               "secure": false,
               "changeOrigin": true
             }
           }
   ```
         3. Update _**`angular.json`**_ to Use the Proxy (aslo on the src folder)
              Inside the _**"serve":**_ section  :
   ```json 
            "options": {
            "proxyConfig": "src/proxy.config.json"
          },
   ```
          4. Create **Environments** Folder and Files (For Angular)
  ```shell
                mkdir src/app/environments
                touch src/app/environments/environments.ts
                 touch src/app/environments/environments.development.ts
  ``` 
          5. Edit the **Environments** Files 
            Inside the environments.ts :
  ```ts 
             export const environment = {
              production: true,
              // apiUrl: "https://myapp.prod.com"
            };
  ``` 
             Inside the environments.development.ts:
  ```ts
              export const environment = {
              production: false,
              apiUrl: "http://localhost:4200"
            };
```

---

## >>> 4. Setup for Profile CRUD Operations (Add / Delete / Update)
To structure the app and build all CRUD operations inside a dedicated profile feature module:

        1. Generate the main profile module:
  ```shell
              ng g module profile
  ```
        2. Generate a submodule inside the profile folder:
```shell
              ng g module profile/profile
```
        3. Create a standalone component named home for the Profile UI:
```shell
              ng g c profile/home --standalone
``` 
        4. Generate a TypeScript interface to define the profile model:
```shell
              ng g i profile/profile
```

         Purpose of Each Step:

          * profile.module.ts: Main feature module to hold related components/services.

          * home.component.ts: UI for listing, adding, editing, deleting profiles.

          * profile.ts: Interface that defines the structure of a profile (e.g., id, name, email).


        5. Edit the _**profile.ts**_ file as follows:
```typescript
        export interface Profile {
           id: Number;
           name: string;
           email: string;
           address: string;
      }
```
        6. Next, update your -**app.routes.ts**_ file to add routing for the profile feature:
```typescript
            import { Routes } from '@angular/router';
            import { HomeComponent } from './profile/home/home.component';

            export const routes: Routes = [
              { path: "profile/home", component: HomeComponent },
              { path: "profile", redirectTo: "profile/home", pathMatch: "full" },
              { path: "", redirectTo: "profile/home", pathMatch: "full" }
];
```
        7. Then open _**app.component.html**_ remove all existing text, and replace it with:
```html
          <router-outlet></router-outlet>     
```
        8. Finally, open _**home.component.html**_ — you should see the tag:
```html
          <p>home works!</p>
```
        9.Finally in the browser, it will display:
```arduino
         home works!
```

## >>> 5. Integrate Angular Material UI Components
  
         1. Open the terminal and navigate to your Angular project root:
```shell
               cd profile_web
```
         2. Add Angular Material to your project:
```shell 
              ng add @angular/material
```
         3.     When prompted during installation:

                  + Choose the default theme (Azure Blue)

                  + Enable global typography styles → Yes

                  + Enable browser animations → Yes
         
         4. Once installed, check _**package.json**_ to confirm Angular Material dependencies were added:


---
 
## >>> 6. Update home.component.ts to Use Angular Material
       
         1. Open the _**home.component.ts**_ and Edit like this :
```typescript
        import { Component } from '@angular/core';
        import { MatFormFieldModule } from '@angular/material/form-field';
        import { MatInputModule } from '@angular/material/input';
        import { MatIconModule } from '@angular/material/icon';
        import { MatButtonModule } from '@angular/material/button';

            @Component({
              selector: 'app-home',
              standalone: true,
              imports: [
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatButtonModule
                   ],
              templateUrl: './home.component.html',
              styleUrl: './home.component.css'
            })
        export class HomeComponent { }
```
         2. search and go to Angular material table and click the <> and select html code part and copy it end of the home.component.html 
```html   
         <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

         <!-- Position Column -->
       <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
      </ng-container>

         <!-- Name Column -->
       <ng-container matColumnDef="name">
       <th mat-header-cell *matHeaderCellDef> Name </th>
       <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

        <!-- Weight Column -->
      <ng-container matColumnDef="weight">
       <th mat-header-cell *matHeaderCellDef> Weight </th>
       <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
      </ng-container>

        <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
       <th mat-header-cell *matHeaderCellDef> Symbol </th>
       <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
      </ng-container>

       <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
       <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
```
       3. Next go to **ts file** section copy the same webpage.Copy and edit it on home.component.ts
```typescript 
          export class HomeComponent {
             displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
             dataSource = new MatTableDataSource<Profile>();
}
```

        4. Edit the _**HomeComponent.ts file**_ to Show headers :
```typescript
         export class HomeComponent {
        // Edit the strings as we want 
        displayedColumns: string[] = ['id', 'name', 'email', 'address'];
        dataSource = new MatTableDataSource<Profile>();

        profiles: Profile[] = [];
  

       profile:Profile={
        id:0,
        name:'',
        email:'',
        address:''
       }
     }
```

        5. Next Edit the   _**home.component.html**_  to update the webapp 
```typescript
        <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> Profile ID </th>
        <td mat-cell *matCellDef="let element"> {{profile.id}} </td>
        </ng-container>
  
        <!-- Name Column -->
       <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{profile.name}} </td>
       </ng-container>
  
       <!-- Weight Column -->
       <ng-container matColumnDef="email">
       <th mat-header-cell *matHeaderCellDef> Email </th>
       <td mat-cell *matCellDef="let element"> {{profile.email}} </td>
      </ng-container>
  
       <!-- Symbol Column -->
       <ng-container matColumnDef="address">
       <th mat-header-cell *matHeaderCellDef> Address </th>
       <td mat-cell *matCellDef="let element"> {{profile.address}} </td>
      </ng-container>
  
       <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
       <tr mat-row *matRowDef="let profiles; columns: displayedColumns;"></tr>
      </table>
```

--- 

## >>> 7. Display the Profile Records in the Web App
        Now we will connect the frontend to backend, fetch data from the   API, and display profile records inside the Angular Material Table.

  #### 7.1.   Update app.config.ts
         To use HTTP methods like GET, POST, etc., we must include the HttpClient in the application config.

           - Open the file: app.config.ts

           - Update the appConfig like this:
```typecript 
          import { provideHttpClient } from '@angular/common/http';

          export const appConfig: ApplicationConfig = {
          providers: [
            provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(routes),
            provideAnimationsAsync(),
            provideHttpClient() // Add this line to enable HTTP
           ]
       };
```
  #### 7.2 Create or Update profile.service.ts  
        This service will make an HTTP GET request to fetch profile records from the backend.

          - Open or create the file: profile.service.ts

          - Add the following code:
```typecript 
            import { HttpClient } from '@angular/common/http';
            import { Injectable } from '@angular/core';
            import { Profile } from './profile';
            import { Observable } from 'rxjs';
            mport { environment } from '../environments/environments.development';

           @Injectable({
           providedIn: 'root'
         })
           export class ProfileService {
             constructor(private _httpClient: HttpClient) { }

            // base URL for backend API
           private baseUrl: string = "/api/profiles";

           // fetch profile list from backend
           getProfiles(): Observable<Profile[]> {
             return this._httpClient.get<Profile[]>(`${environment.apiUrl}${this.baseUrl}`);
  }
}
```
 ####   7.3 Edit home.component.ts to Display Data from API

          Inject the ProfileService and fetch records using ngAfterViewInit.

           - Open the file: home.component.ts

           - Update the HomeComponent class like this:
```typescript
     import { AfterViewInit } from '@angular/core';
     import { MatTableDataSource } from '@angular/material/table';
     import { ProfileService } from '../profile.service';
     import { Profile } from '../profile';

    export class HomeComponent implements AfterViewInit {
      displayedColumns: string[] = ['id', 'name', 'email', 'address'];
      dataSource = new MatTableDataSource<Profile>();
      profiles: Profile[] = [];

      profile: Profile = {
         id: 0,
         name: '',
         email: '',
         address: ''
      };

          constructor(private profileService: ProfileService) { }

       // Fetch profiles after the view is initialized
      ngAfterViewInit(): void {
      this.profileService.getProfiles().subscribe((data) => {
        console.log('Fetched Profiles:', data); // For debugging
        this.profiles = data;
        this.dataSource = new MatTableDataSource<Profile>(data);
     });
   }
 }
```
#### 7.4 Update home.component.html to Show Profile Records

    Replace the old demo table with real data-binding using {{row.id}}, {{row.name}}, etc.

```html 
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- ID Column -->
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> Profile ID </th>
    <td mat-cell *matCellDef="let row"> {{row.id}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let row"> {{row.name}} </td>
  </ng-container>

  <!-- Email Column -->
  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef> Email </th>
    <td mat-cell *matCellDef="let row"> {{row.email}} </td>
  </ng-container>

  <!-- Address Column -->
  <ng-container matColumnDef="address">
    <th mat-header-cell *matHeaderCellDef> Address </th>
    <td mat-cell *matCellDef="let row"> {{row.address}} </td>
  </ng-container>

  <!-- Render rows -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

</table>

```

---

## >>>8. Add or Update Profile via WebApp (Form Binding + API Integration)

      This step allows users to add or update profile data from the frontend using form inputs. Once the data is submitted, the table automatically updates to reflect the changes.

#### 8.1 Update home.component.ts
```typecsipt
      import { FormsModule } from '@angular/forms';
      import { CommonModule } from '@angular/common';

      imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatTableModule, FormsModule],
```
```typescript
addUpdateProfile(profile: Profile) {
  if (profile.id !== 0) {
    // update profile logic here
  } else {
    // create profile
    this.profileService.createProfiles(profile).subscribe({
      next: (data) => {
        console.log("New Profile Created Successfully");
        window.location.reload(); // reload to reflect changes
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
```
 #### 8.2 Update home.component.html
```html
<!-- Name -->
<mat-form-field style="width:220px; margin-top: 20px;">
  <input matInput type="text" name="name" placeholder="Enter Your Name" [(ngModel)]="profile.name">
  <mat-icon fontIcon="person" matSuffix></mat-icon>
</mat-form-field>

<!-- Email -->
<mat-form-field style="width:220px; margin-top: 20px; margin-left: 15px;">
  <input matInput type="text" name="email" placeholder="Enter Your E-mail" [(ngModel)]="profile.email">
  <mat-icon fontIcon="email" matSuffix></mat-icon>
</mat-form-field>

<!-- Address -->
<mat-form-field style="width:230px; margin-top: 20px; margin-left: 15px;">
  <input matInput type="text" name="address" placeholder="Enter Your Address" [(ngModel)]="profile.address">
  <mat-icon fontIcon="home" matSuffix></mat-icon>
</mat-form-field>
```

#### 8.3 Add Submit Button
```html
<button mat-flat-button 
  style="background-color: rgb(0, 106, 255); 
         margin-left: 45px; 
         padding: 10px 24px; 
         font-size: 16px; 
         color: white;"
  (click)="addUpdateProfile(profile)">
  Add
</button>
```

#### 8.4 Update profile.service.ts
```typecsript
createProfiles(data: Profile) {
  return this._httpClient.post<Profile[]>(`${environment.apiUrl}${this.baseUrl}/`, data);
}
```  
         Now your Angular WebApp will:

         1.  Accept user input for name, email, and address

         2. Send data to the backend API

         3. Reload and display the updated profile list automatically


---
## >>>>  9. Add Edit and Delete Buttons to Profile Table 

#### 9.1 Update home.component.ts
```typescript
displayedColumns: string[] = ['id', 'name', 'email', 'address', 'edit', 'delete'];

setProfile(profile: Profile) {
  this.profile.id = profile.id;
  this.profile.name = profile.name;
  this.profile.email = profile.email;
  this.profile.address = profile.address;
}

addUpdateProfile(profile: Profile) {
  if (profile.id !== 0) {
    // update profile
    this.profileService.updateProfiles(profile).subscribe({
      next: (data) => {
        console.log("Profile Updated Successfully");
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {
    // create profile
    this.profileService.createProfiles(profile).subscribe({
      next: (data) => {
        console.log("New Profile Created Successfully");
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
```
#### 9.1 Update home.component.html
```html
<!-- Edit Column -->
<ng-container matColumnDef="edit">
  <th mat-header-cell *matHeaderCellDef> Edit </th>
  <td mat-cell *matCellDef="let row">
    <button mat-flat-button 
            style="height:25px; background-color: rgb(0, 0, 255); color: white;"
            (click)="setProfile(row)">
      Edit
    </button>
  </td>
</ng-container>

<!-- Delete Column -->
<ng-container matColumnDef="delete">
  <th mat-header-cell *matHeaderCellDef> Delete </th>
  <td mat-cell *matCellDef="let row">
    <button mat-flat-button 
            style="height:25px; background-color: rgb(255, 0, 34); color: white;">
      Delete
    </button>
  </td>
</ng-container>
```

#### 9.3Update profile.service.ts
```typescript
updateProfiles(modifiedData: Profile) {
  return this._httpClient.put<Profile>(`${environment.apiUrl}${this.baseUrl}/${modifiedData.id}/`, modifiedData);
}
```
        Now your Angular WebApp can:

        1. Display Edit and Delete buttons in the profile table

        2. Load selected row data into the form when clicking "Edit"

        3. Submit updates to the backend via PUT method

        4. Refresh the table to show the updated result

---

## >>>10.Add Delete Functionality to WebApp

#### 10.1 Update home.component.html  
```html
<!-- Delete Column -->
<ng-container matColumnDef="delete">
  <th mat-header-cell *matHeaderCellDef> Delete </th>
  <td mat-cell *matCellDef="let row">
    <button mat-flat-button 
            style="height:25px; background-color: rgb(255, 0, 34); color: white;"
            (click)="deleteProfile(row.id)">
      Delete
    </button>
  </td>
</ng-container>
```

#### 10.2 Update home.component.ts
```typecsript
deleteProfile(id: Number) {
  const isConfirm = window.confirm("Are you sure you want to delete this data?");
  if (isConfirm) {
    this.profileService.deleteProfiles(id).subscribe({
      next: () => {
        // Update profiles array
        this.profiles = this.profiles.filter(item => item.id !== id);

        // Update the table's data source
        this.dataSource.data = this.profiles;

        console.log('Deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting profile:', err);
      }
    });
  }
}

```

#### 10.3 profile.service.ts
```typescript
deleteProfiles(id: Number) {
  return this._httpClient.delete<Profile>(`${environment.apiUrl}${this.baseUrl}/${id}/`);
}
```

      Now your Angular WebApp can:

          1. Display Edit and Delete buttons in the profile table

          2. Load selected row data into the form when clicking Edit

          3. Submit updates to the backend via PUT method

          4. Remove records from the table and backend via DELETE method

          5. Refresh the table after delete without page reload

---

## >>> 12  Add Sorting and Pagination to the Profile Table

#### 12.1 Enable Sorting in home.component.html
```html
<!-- Table with Sorting -->
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>

  <!-- Profile ID Column -->
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Profile ID </th>
    <td mat-cell *matCellDef="let row"> {{row.id}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
    <td mat-cell *matCellDef="let row"> {{row.name}} </td>
  </ng-container>

  <!-- Email Column -->
  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
    <td mat-cell *matCellDef="let row"> {{row.email}} </td>
  </ng-container>

  <!-- Address Column -->
  <ng-container matColumnDef="address">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Address </th>
    <td mat-cell *matCellDef="let row"> {{row.address}} </td>
  </ng-container>
```
#### 12.2 Enable Sorting in home.component.ts
```typescript
import { MatSort, MatSortModule } from '@angular/material/sort';

imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatTableModule, FormsModule, MatSortModule]

@ViewChild(MatSort) sort: any; // for sorting

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}
```
#### 12.3 Enable Pagination in home.component.html
```html
<br>

<!-- Pagination -->
<mat-paginator [pageSizeOptions]="[5, 10, 20]"
               showFirstLastButtons
               aria-label="Select page of profile list">
</mat-paginator>
```
#### 12.4 Enable Pagination in home.component.ts
```typescript
mport { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

imports: [ ..., MatPaginatorModule ]

@ViewChild(MatPaginator) paginator: any; // for pagination

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
```
          Now your Angular WebApp table supports:

          1. Sorting by column headers (ID, Name, Email, Address)

          2. Pagination with page size options (5, 10, 20)

          3. Navigating between pages using next/prev/first/last buttons


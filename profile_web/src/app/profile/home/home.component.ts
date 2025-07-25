import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Profile} from '../profile'
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {ProfileService } from '../profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSort ,MatSortModule } from '@angular/material/sort';
import { MatPaginator ,MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule, MatButtonModule,MatTableModule,FormsModule,MatSortModule,MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  // Edit the strings as we want 
  displayedColumns: string[] = ['id', 'name', 'email', 'address','edit','delete'];
  dataSource = new MatTableDataSource<Profile>();
  
  //filteredprofiles for store the values on shearch funtion
  filteredprofiles: Profile[] = [];
  profiles: Profile[] = [];
  @ViewChild(MatSort) sort: any;    // from angular matirial table for sorting
  @ViewChild(MatPaginator) paginator: any;   // from angular matirial table for pegination

  constructor(private profileService:ProfileService){}
  

  profile:Profile={
    id:0,
    name:'',
    email:'',
    address:''
  }
// for display datarecords on webapp
  ngAfterViewInit(): void{
    this.profileService.getProfiles().subscribe((data)=>{
      console.log('Fetched Profiles:', data); //
      this.profiles=data;
      this.dataSource = new MatTableDataSource<Profile>(data);
      this.dataSource.sort = this.sort  // for sorting (angular matirial table )
      this.dataSource.paginator = this.paginator; // for pegination (angular matirial table )
      
    })

    }
    addUpdateProfile(profile:Profile){
      if(profile.id!==0){
        //update profile
        this.profileService.updateProfiles(profile).subscribe({
          next:(data)=>{
            console.log("New Profile Updated Successfully");
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })

      }else{
        //create profile
        this.profileService.createProfiles(profile).subscribe({
          next:(data)=>{
            console.log("New Profile Created Successfully");
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }
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
    


    setProfile(profile:Profile){
      this.profile.id = profile.id;
      this.profile.address = profile.address;
      this.profile.email = profile.email;
      this.profile.name = profile.name;
    }

    searchProfile(input:String){
      this.filteredprofiles = this.profiles.filter(item => item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.email.toLowerCase().includes(input.toLowerCase()) ||
      item.address.toLowerCase().includes(input.toLowerCase()));
      this.dataSource = new MatTableDataSource<Profile>(this.filteredprofiles)
      
    }

  }



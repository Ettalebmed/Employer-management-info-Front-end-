import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { FormsModule }   from '@angular/forms';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public employees?:Employee[]; 
  public editEmployee ?:Employee|null;
  public deleteEmployee ?:Employee|null;
  public Id?:number ;
  


  constructor(private employeeservice:EmployeeService){}
  ngOnInit(): void {
    this.getEmployees();
  }

 

  public onOpenModal(employee: Employee|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      console.log(employee);
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      this.Id=employee?.id;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public getEmployees():void{
    this.employeeservice.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees=response;
      }
,      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  // 

  public onAddEmployee(addForm:NgForm):void{
    document.getElementById('add-employee-form')?.click();
    
    this.employeeservice.addEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees;
        location.reload();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )

  }
  public onUpdateEmployee(employee: Employee): void {
    this.employeeservice.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmployee(employeeId:number):void{
    this.employeeservice.deleteEmployee(employeeId).subscribe(
      (response:void)=>{
        
        this.getEmployees();
        
      },
      
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onSearchEmployee(key :string):void{
    const result :Employee[]=[];
    this.employees?.forEach(employee => {
      if(employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||employee.employeeCode.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1){
          result.push(employee);
          this.employees=result;
      }
      else{
         this.employees=result;

  }});

  
    if(result.length==0){
    this.employees=[];
  }
  if(!key){
    this.getEmployees();
  }

  }
  
  

}


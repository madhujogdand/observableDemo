import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { DepartmentComponent } from '../department/department.component';
import { DepartmentService } from '../department/department.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  employeeList: any = [];
  departmentList:any=[];
  empForms!: FormGroup;
  isUpdatebtn!: boolean;
  queryValue:string|unknown;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
     private empService:EmployeeService, private deptService:DepartmentService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();

    this.empForms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      salary: [, Validators.required],
      deptid: [, Validators.required]
    });

    //read the query parameter value using paramMap observable
      this.route.paramMap.subscribe( x=>{
        this.queryValue=x.get('id');
      })
      if(this.queryValue!=" " && this.queryValue!=null)
      {
        alert(this.queryValue);
      }

    this.isUpdatebtn = false;
    
  }

  get id() {
    return this.empForms.get('id');
  }

  get name() {
    return this.empForms.get('name');
  }

  get salary() {
    return this.empForms.get('salary');
  }
  get deptid() {
    return this.empForms.get('deptid');
  }

  getEmployees() {
    this.empService.getEmployees().subscribe(result => {
      this.employeeList = result;
      console.log(this.employeeList);
    });


  }

  getDepartments() {
    this.deptService.getDepartments().subscribe(result => {
      this.departmentList = result;
      console.log(this.departmentList);
    });


  }

  editEmployees(e: any) {
    this.isUpdatebtn = true;
    this.empForms.setValue({
      id: e.id,
      name: e.name,
      salary: e.salary,
      deptid:e.deptid
    });

  }

  //delete the data
  deleteEmployees(id: any) {
    let response = confirm('Do you want to delete id ' + id + ' ?');
    if (response == true) {
      this.empService.deleteEmployees(id).subscribe(result => {
        this.getEmployees();
      });


    }
  }

  clearForm() {
    this.empForms.reset();
    this.isUpdatebtn = false;
  }

  saveEmployee() {
    let employee = this.empForms.value;
    if (!this.isUpdatebtn) {
      this.empService.saveEmployees(employee).subscribe(result => {

      });
    }
    else {
      let id = parseInt(this.empForms.value.id);
      this.empService.updateEmployees(id, employee).subscribe(result => {

      });
      this.getEmployees();
      this.empForms.reset();
      this.isUpdatebtn = false;
    }
    //  this.productForms.reset();
    //  this.getProducts();
  }
  //query parameter
  infoEmployees(id:number) {
    this.router.navigate(['/product-details',id])
  }


}

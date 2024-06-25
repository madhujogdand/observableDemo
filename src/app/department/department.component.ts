import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  departmentList: any = [];
  deptForms!: FormGroup;
  isUpdatebtn!: boolean;
  queryValue: string | unknown;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
     private deptService: DepartmentService) { }

     ngOnInit(): void {
      this.getDepartments();
  
      this.deptForms = this.fb.group({
        deptid: [],
        deptname: ['', Validators.required],
        
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
      this.getDepartments();
    }
  
    get deptid() {
      return this.deptForms.get('id');
    }
  
    get deptname() {
      return this.deptForms.get('name');
    }
  
  
  
    getDepartments() {
      this.deptService.getDepartments().subscribe(result => {
        this.departmentList = result;
        console.log(this.departmentList);
      });
  
  
    }
  
   
  
    editDepartments(e: any) {
      this.isUpdatebtn = true;
      this.deptForms.setValue({
        deptid: e.deptid,
        deptname: e.deptname,
       
      });
  
    }
  
    //delete the data
    deleteDepartments(id: any) {
      let response = confirm('Do you want to delete id ' + id + ' ?');
      if (response == true) {
        this.deptService.deleteDepartments(id).subscribe(result => {
          this.getDepartments();
        });
  
  
      }
    }
  
    clearForm() {
      this.deptForms.reset();
      this.isUpdatebtn = false;
    }
  
    saveDepartment() {
      let department = this.deptForms.value;
      if (!this.isUpdatebtn) {
        this.deptService.saveDepartments(department).subscribe(result => {
  
        });
      }
      else {
        let id = parseInt(this.deptForms.value.id);
        this.deptService.updateDepartments(id, department).subscribe(result => {
  
        });
        this.getDepartments();
        this.deptForms.reset();
        this.isUpdatebtn = false;
      }
      //  this.productForms.reset();
      //  this.getProducts();
    }
    //query parameter
    infoDepartments(id:number) {
      this.router.navigate(['/product-details',id])
    }
  

}

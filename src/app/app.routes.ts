import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';

export const routes: Routes = [

    {path:'',redirectTo:'employee',pathMatch:'full'},
    {path:'product-details/:id',component:ProductDetailsComponent},
    {path:'product',component:ProductComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'department',component:DepartmentComponent},
];

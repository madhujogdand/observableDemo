import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productService: ProductService = inject(ProductService);
  productList: any = [];
  productForms!: FormGroup;
  isUpdatebtn!: boolean;
  queryValue:string|unknown;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();

    this.productForms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      price: [, Validators.required]
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
    this.getProducts();
  }

  get id() {
    return this.productForms.get('id');
  }

  get name() {
    return this.productForms.get('name');
  }

  get price() {
    return this.productForms.get('price');
  }

  getProducts() {
    this.productService.getProducts().subscribe(result => {
      this.productList = result;
      console.log(this.productList);
    });


  }

  editProducts(p: any) {
    this.isUpdatebtn = true;
    this.productForms.setValue({
      id: p.id,
      name: p.name,
      price: p.price
    });

  }

  //delete the data
  deleteProducts(id: any) {
    let response = confirm('Do you want to delete id ' + id + ' ?');
    if (response == true) {
      this.productService.deleteProducts(id).subscribe(result => {
        this.getProducts();
      });


    }
  }

  clearForm() {
    this.productForms.reset();
    this.isUpdatebtn = false;
  }

  saveProduct() {
    let product = this.productForms.value;
    if (!this.isUpdatebtn) {
      this.productService.saveProducts(product).subscribe(result => {

      });
    }
    else {
      let id = parseInt(this.productForms.value.id);
      this.productService.updateProducts(id, product).subscribe(result => {

      });
      this.getProducts();
      this.productForms.reset();
      this.isUpdatebtn = false;
    }
    //  this.productForms.reset();
    //  this.getProducts();
  }
  //query parameter
  infoProducts(id:number) {
    this.router.navigate(['/product-details',id])
  }
}

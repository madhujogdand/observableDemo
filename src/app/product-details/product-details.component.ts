import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  productid:string|unknown;
  constructor(private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
   this.productid=this.route.snapshot.paramMap.get('id');
   if(this.productid!='')
     alert(this.productid);
  }

  //optional parameter
  goBack()
  {
      this.router.navigate(['/product',{id:this.productid}]);
  }

}

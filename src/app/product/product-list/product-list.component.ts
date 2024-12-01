import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[]=[]
  filteredproducts: Product[]=[]
  sortOrder: string = ""

  constructor(private productService: ProductService, private cartservice: CartService, private snackbar:MatSnackBar){}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
      this.filteredproducts=data;
    });
  }

  addtoCart(product:Product): void{
    this.cartservice.addToCart(product).subscribe({
      next:()=>{
          this.snackbar.open("Added to cart","",{
            duration: 2000,
            horizontalPosition : 'right',
            verticalPosition: 'top'
          })
      }
    });
  }

  applyFilter(event:Event):void{
    let search=(event.target as HTMLInputElement).value; search=search.toLowerCase();
    this.filteredproducts=this.products.filter(
      product => product.name.toLowerCase().includes(search)
    )
    this.sortproducts(this.sortOrder)
  }

  sortproducts(sortvalue:string){
    this.sortOrder=sortvalue;

    if(this.sortOrder === "priceLowHigh"){
      this.filteredproducts.sort((a,b) => a.price - b.price)
    } else if(this.sortOrder === "priceHighLow"){
      this.filteredproducts.sort((a,b) => b.price - a.price)
    }
  }
}

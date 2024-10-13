import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  loading: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        tap(() => {
            this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data: ProductType[]) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

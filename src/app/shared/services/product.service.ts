import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private products: ProductType[] = [];

  // private products: ProductType[] = [
  //   {
  //     id: 1,
  //     image: 'product1.png',
  //     title: 'Мясная Делюкс',
  //     description: 'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус чили, ананасы',
  //     datetime: '2022-12-31 15:00:00'
  //   },
  //   {
  //     id: 2,
  //     image: 'product2.png',
  //     title: 'Морская Премиум',
  //     description: 'Перец, сыр, креветки, кальмары, мидии, лосось',
  //     datetime: '2022-12-31 15:00:00'
  //   },
  //   {
  //     id: 3,
  //     image: 'product3.png',
  //     title: 'Бекон и Сосиски',
  //     description: 'Бекон, сыр, сосиски, ананас, томатная паста',
  //     datetime: '2022-12-31 10:00:00'
  //   },
  //   {
  //     id: 4,
  //     image: 'product4.png',
  //     title: 'Куриная Делюкс',
  //     description: 'Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста',
  //     datetime: '2022-01-31 15:00:00'
  //   },
  //   {
  //     id: 5,
  //     image: 'product5.png',
  //     title: 'Барбекю Премиум',
  //     description: 'Свинина BBQ, соус Барбкею, сыр, курица, соус для пиццы, соус чили',
  //     datetime: '2022-12-31 15:00:00'
  //   },
  //   {
  //     id: 6,
  //     image: 'product6.png',
  //     title: 'Пепперони Дабл',
  //     description: 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная',
  //     datetime: '2021-10-31 15:00:00'
  //   },
  //   {
  //     id: 7,
  //     image: 'product7.png',
  //     title: 'Куриное трио',
  //     description: 'Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для пиццы',
  //     datetime: '2021-12-21 15:00:00'
  //   },
  //   {
  //     id: 8,
  //     image: 'product8.png',
  //     title: 'Сырная',
  //     description: 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный',
  //     datetime: '2022-12-31 15:00:00'
  //   },
  // ];
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${environment.apiURL}pizzas`);
  }

  // getProducts(): Observable<ProductType[]> {
  //   let params = new HttpParams();
  //   params = params.set('extraField', 1);
  //   return this.http.get<{ data: ProductType[] }>('https://testologia.ru/pizzas', {
  //     observe: 'response', // full response object
  //     // responseType: "json",
  //     // headers: new HttpHeaders({
  //     //   Authorization: 'auth-token'
  //     // }),
  //     params: params // query params
  //   })
  //     .pipe(
  //       tap(result => console.log(result)),
  //       map(result => result.body ? result.body.data : [])
  //     )
  // }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${environment.apiURL}pizzas?id=${id}`);
  }

  createOrder(data: {product: string, address: string, phone: string}) {
    return this.http.post<{ success: boolean, message?: string }>(`${environment.apiURL}order-pizza`, data);
  }
}

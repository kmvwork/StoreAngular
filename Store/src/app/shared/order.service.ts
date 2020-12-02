import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {map} from "rxjs/operators";
import {FbResponse, Product} from "./interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date)
          }
        })
      )
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        }))
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }
}

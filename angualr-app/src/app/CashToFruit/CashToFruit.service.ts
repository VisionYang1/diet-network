/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { CashToFruit } from '../org.diet.network';

import { User } from '../org.diet.network';
import { Market } from '../org.diet.network';
import { Supplier } from '../org.diet.network';
import { Cash } from '../org.diet.network';
import { Fruit } from '../org.diet.network';
import { Vegetable } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CashToFruitService {

  private CASH_TO_FRUIT: string = 'CashToFruit';
  private USER: string = 'User';
  private MARKET: string = 'Market';
  private SUPPLIER: string = 'Supplier';
  private CASH: string = 'Cash';
  private FRUIT: string = 'Fruit';
  private VEGETABLE: string = 'Vegetable';

  constructor(private dataService: DataService<CashToFruit>, private cashService: DataService<Cash>, private fruitService: DataService<Fruit>, private vegetableService: DataService<Vegetable>
    , private userService: DataService<User>, private marketService: DataService<Market>, private supplierService: DataService<Supplier>) {
  };

  public getAll(): Observable<CashToFruit[]> {
      return this.dataService.getAll(this.CASH_TO_FRUIT);
  }

  public getTransaction(id: any): Observable<CashToFruit> {
    return this.dataService.getSingle(this.CASH_TO_FRUIT, id);
  }

  public addTransaction(itemToAdd: any): Observable<CashToFruit> {
    return this.dataService.add(this.CASH_TO_FRUIT, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<CashToFruit> {
    return this.dataService.update(this.CASH_TO_FRUIT, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<CashToFruit> {
    return this.dataService.delete(this.CASH_TO_FRUIT, id);
  }

  // get all users
  public getAllUsers(): Observable<User[]> {
    return this.userService.getAll(this.USER);
  }

  // get all markets
  public getAllMarkets(): Observable<Market[]> {
    return this.marketService.getAll(this.MARKET);
  }

  // get all suppliers
  public getAllSuppliers(): Observable<Supplier[]> {
    return this.supplierService.getAll(this.SUPPLIER);
  }

  // get cash by id
  public getCash(id: any): Observable<Cash> {
    return this.cashService.getSingle(this.CASH, id);
  }

  // get fruit by id
  public getFruit(id: any): Observable<Fruit> {
    return this.fruitService.getSingle(this.FRUIT, id);
  }

  // get vegetable by id
  public getVegetable(id: any): Observable<Fruit> {
    return this.vegetableService.getSingle(this.VEGETABLE, id);
  }
}


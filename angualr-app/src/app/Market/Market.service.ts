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
import { Market } from '../org.diet.network';

import { Cash } from '../org.diet.network';
import { Fruit } from '../org.diet.network';
import { Vegetable } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class MarketService {

  private Market: string = 'Market';
  private CASH: string = 'Cash';
  private FRUIT: string = 'Fruit';
  private VEGETABLE: string = 'Vegetable';

  constructor(private dataService: DataService<Market>, private cashService: DataService<Cash>, private fruitService: DataService<Fruit>, private vegetableService: DataService<Vegetable>) {
  };

  public getAllMarkets(): Observable<Market[]> {
    return this.dataService.getAll(this.Market);
  }

  public getMarket(id: any): Observable<Market> {
    return this.dataService.getSingle(this.Market, id);
  }

  public addMarket(itemToAdd: any): Observable<Market> {
    return this.dataService.add(this.Market, itemToAdd);
  }

  public updateMarket(id: any, itemToUpdate: any): Observable<Market> {
    return this.dataService.update(this.Market, id, itemToUpdate);
  }

  public deleteMarket(id: any): Observable<Market> {
    return this.dataService.delete(this.Market, id);
  }

  // opearations of Cash
  public getAllCash(): Observable<Cash[]> {
    return this.cashService.getAll(this.CASH);
  }

  public getCash(id: any): Observable<Cash> {
    return this.cashService.getSingle(this.CASH, id);
  }

  public addCash(itemToAdd: any): Observable<Cash> {
    return this.cashService.add(this.CASH, itemToAdd);
  }

  public updateCash(id: any, itemToUpdate: any): Observable<Cash> {
    return this.cashService.update(this.CASH, id, itemToUpdate);
  }

  public deleteCash(id: any): Observable<Cash> {
    return this.cashService.delete(this.CASH, id);
  }

  // opearations of Fruit
  public getAllFruit(): Observable<Fruit[]> {
    return this.fruitService.getAll(this.FRUIT);
  }

  public getFruit(id: any): Observable<Fruit> {
    return this.fruitService.getSingle(this.FRUIT, id);
  }

  public addFruit(itemToAdd: any): Observable<Fruit> {
    return this.fruitService.add(this.FRUIT, itemToAdd);
  }

  public updateFruit(id: any, itemToUpdate: any): Observable<Fruit> {
    return this.fruitService.update(this.FRUIT, id, itemToUpdate);
  }

  public deleteFruit(id: any): Observable<Fruit> {
    return this.fruitService.delete(this.FRUIT, id);
  }

  // opearations of Vegetable
  public getAllVegetable(): Observable<Vegetable[]> {
    return this.vegetableService.getAll(this.VEGETABLE);
  }

  public getVegetable(id: any): Observable<Vegetable> {
    return this.vegetableService.getSingle(this.VEGETABLE, id);
  }

  public addVegetable(itemToAdd: any): Observable<Vegetable> {
    return this.vegetableService.add(this.VEGETABLE, itemToAdd);
  }

  public updateVegetable(id: any, itemToUpdate: any): Observable<Vegetable> {
    return this.vegetableService.update(this.VEGETABLE, id, itemToUpdate);
  }

  public deleteVegetable(id: any): Observable<Vegetable> {
    return this.vegetableService.delete(this.VEGETABLE, id);
  }

}

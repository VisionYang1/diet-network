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
import { Apples } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class MarketService {

  private MARKET: string = 'Market';
  private CASH: string = 'Cash';
  private APPLES: string = 'Apples';

  constructor(private dataService: DataService<Market>, private cashService: DataService<Cash>, private appleService: DataService<Apples>) {
  };

  // get market
  public getAllMarket(): Observable<Market[]> {
    return this.dataService.getAll(this.MARKET);
  }

  public getMarket(id: any): Observable<Market> {
    return this.dataService.getSingle(this.MARKET, id);
  }

  public addMarket(itemToAdd: any): Observable<Market> {
    return this.dataService.add(this.MARKET, itemToAdd);
  }

  public updateMarket(id: any, itemToUpdate: any): Observable<Market> {
    return this.dataService.update(this.MARKET, id, itemToUpdate);
  }

  public deleteMarket(id: any): Observable<Market> {
    return this.dataService.delete(this.MARKET, id);
  }

  // get cash
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

  // get apple
  public getAllApples(): Observable<Apples[]> {
    return this.appleService.getAll(this.APPLES);
  }

  public getApple(id: any): Observable<Apples> {
    return this.appleService.getSingle(this.APPLES, id);
  }

  public addApple(itemToAdd: any): Observable<Apples> {
    return this.appleService.add(this.APPLES, itemToAdd);
  }

  public updateApple(id: any, itemToUpdate: any): Observable<Apples> {
    return this.appleService.update(this.APPLES, id, itemToUpdate);
  }

  public deleteApple(id: any): Observable<Apples> {
    return this.appleService.delete(this.APPLES, id);
  }

}

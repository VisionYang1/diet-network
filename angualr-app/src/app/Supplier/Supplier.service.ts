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
import { Supplier } from '../org.diet.network';

import { Cash } from '../org.diet.network';
import { Apples } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SupplierService {

  private SUPPLIER: string = 'Supplier';
  private CASH: string = 'Cash';
  private APPLES: string = 'Apples';

  constructor(private dataService: DataService<Supplier>, private cashService: DataService<Cash>, private appleService: DataService<Apples>) {
  };

  public getAllSuppliers(): Observable<Supplier[]> {
    return this.dataService.getAll(this.SUPPLIER);
  }

  public getparticipant(id: any): Observable<Supplier> {
    return this.dataService.getSingle(this.SUPPLIER, id);
  }

  public addParticipant(itemToAdd: any): Observable<Supplier> {
    return this.dataService.add(this.SUPPLIER, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Supplier> {
    return this.dataService.update(this.SUPPLIER, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Supplier> {
    return this.dataService.delete(this.SUPPLIER, id);
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

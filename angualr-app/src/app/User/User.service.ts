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
import { User } from '../org.diet.network';

import { Cash } from '../org.diet.network';
import { Apples } from '../org.diet.network';
import { Rewards } from '../org.diet.network';
import { CashToApples } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UserService {

  private USER: string = 'User';
  private CASH: string = 'Cash';
  private APPLES: string = 'Apples';
  private REWARDS: string = 'Rewards';
  private CASH_TO_APPLES = 'CashToApples';

  constructor(private dataService: DataService<User>, private cashService: DataService<Cash>, private appleService: DataService<Apples>, private rewardService: DataService<Rewards>, private transactionService: DataService<CashToApples>) {
  };

  // operations of User
  public getAllUsers(): Observable<User[]> {
    return this.dataService.getAll(this.USER);
  }

  public getUser(id: any): Observable<User> {
    return this.dataService.getSingle(this.USER, id);
  }

  public addUser(itemToAdd: any): Observable<User> {
    return this.dataService.add(this.USER, itemToAdd);
  }

  public updateUser(id: any, itemToUpdate: any): Observable<User> {
    return this.dataService.update(this.USER, id, itemToUpdate);
  }

  public deleteUser(id: any): Observable<User> {
    return this.dataService.delete(this.USER, id);
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

  // opearations of Apples
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

  // opearations of Rewards
  public getAllRewards(): Observable<Rewards[]> {
    return this.rewardService.getAll(this.REWARDS);
  }

  public getReward(id: any): Observable<Rewards> {
    return this.rewardService.getSingle(this.REWARDS, id);
  }

  public addReward(itemToAdd: any): Observable<Rewards> {
    return this.rewardService.add(this.REWARDS, itemToAdd);
  }

  public updateReward(id: any, itemToUpdate: any): Observable<Rewards> {
    return this.rewardService.update(this.REWARDS, id, itemToUpdate);
  }

  public deleteReward(id: any): Observable<Rewards> {
    return this.rewardService.delete(this.REWARDS, id);
  }

  // get all transaction
  public getAllTransactions(): Observable<CashToApples[]> {
    return this.transactionService.getAll(this.CASH_TO_APPLES);
  }

}

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
import { Fruit } from '../org.diet.network';
import { Vegetable } from '../org.diet.network';
import { Rewards } from '../org.diet.network';
import { CashToFruit } from '../org.diet.network';
import { CashToVegetable } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UserService {

  private USER: string = 'User';
  private CASH: string = 'Cash';
  private FRUIT: string = 'Fruit';
  private VEGETABLE: string = 'Vegetable';
  private REWARDS: string = 'Rewards';
  private CASH_TO_FRUIT = 'CashToFruit';
  private CASH_TO_VEGETABLE = 'CashToVegetable';

  constructor(private dataService: DataService<User>, private cashService: DataService<Cash>, private fruitService: DataService<Fruit>, private vegetableService: DataService<Vegetable>, private rewardService: DataService<Rewards>, private fruitTranService: DataService<CashToFruit>, private vegetableTranService: DataService<CashToVegetable>) {
  };

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
    return this.fruitService.getAll(this.VEGETABLE);
  }

  public getVegetable(id: any): Observable<Vegetable> {
    return this.fruitService.getSingle(this.VEGETABLE, id);
  }

  public addVegetable(itemToAdd: any): Observable<Vegetable> {
    return this.fruitService.add(this.VEGETABLE, itemToAdd);
  }

  public updateVegetable(id: any, itemToUpdate: any): Observable<Vegetable> {
    return this.fruitService.update(this.VEGETABLE, id, itemToUpdate);
  }

  public deleteVegetable(id: any): Observable<Vegetable> {
    return this.fruitService.delete(this.VEGETABLE, id);
  }

  // get all fruit transaction
  public getAllFruitTransactions(): Observable<CashToFruit[]> {
    return this.fruitTranService.getAll(this.CASH_TO_FRUIT);
  }

  // get all vegetable transaction
  public getAllVegetableTransactions(): Observable<CashToVegetable[]> {
    return this.vegetableTranService.getAll(this.CASH_TO_VEGETABLE);
  }

}

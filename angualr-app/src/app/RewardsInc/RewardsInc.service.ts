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
import { RewardsInc } from '../org.diet.network';

import { User } from '../org.diet.network';
import { Rewards } from '../org.diet.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RewardsIncService {

  private NAMESPACE = 'RewardsInc';
  private USER: string = 'User';
  private REWARDS: string = 'Rewards';

  constructor(private dataService: DataService<RewardsInc>, private userService: DataService<User>, private rewardService: DataService<Rewards>) {
  };

  public getAll(): Observable<RewardsInc[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

// get all users
public getAllUsers(): Observable<User[]> {
  return this.userService.getAll(this.USER);
}

// get user by id
public getUser(id: any): Observable<User> {
  return this.userService.getSingle(this.USER, id);
}

// get reward by id
public getReward(id: any): Observable<Rewards> {
  return this.rewardService.getSingle(this.REWARDS, id);
}

  public getTransaction(id: any): Observable<RewardsInc> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RewardsInc> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RewardsInc> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RewardsInc> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}


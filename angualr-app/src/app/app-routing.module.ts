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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CashComponent } from './Cash/Cash.component';
import { FruitComponent } from './Fruit/Fruit.component';
import { VegetableComponent } from './Vegetable/Vegetable.component';
import { RewardsComponent } from './Rewards/Rewards.component';

import { UserComponent } from './User/User.component';
import { MarketComponent } from './Market/Market.component';
import { SupplierComponent } from './Supplier/Supplier.component';

import { CashToFruitComponent } from './CashToFruit/CashToFruit.component';
import { CashToVegetableComponent } from './CashToVegetable/CashToVegetable.component';
import { RewardsDecComponent } from './RewardsDec/RewardsDec.component';
import { RewardsIncComponent } from './RewardsInc/RewardsInc.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Cash', component: CashComponent },
  { path: 'Fruit', component: FruitComponent },
  { path: 'Vegetable', component: VegetableComponent },
  { path: 'Rewards', component: RewardsComponent },
  { path: 'User', component: UserComponent },
  { path: 'Market', component: MarketComponent },
  { path: 'Supplier', component: SupplierComponent },
  { path: 'CashToFruit', component: CashToFruitComponent },
  { path: 'CashToVegetable', component: CashToVegetableComponent },
  { path: 'RewardsDec', component: RewardsDecComponent },
  { path: 'RewardsInc', component: RewardsIncComponent },
  { path: 'Alltransactions', component: AllTransactionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }

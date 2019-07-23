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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// import { ChartModule } from 'angular-highcharts';

import { CashComponent } from './Cash/Cash.component';
import { ApplesComponent } from './Apples/Apples.component';
import { RewardsComponent } from './Rewards/Rewards.component';

import { UserComponent } from './User/User.component';
import { MarketComponent } from './Market/Market.component';
import { SupplierComponent } from './Supplier/Supplier.component';

import { CashToApplesComponent } from './CashToApples/CashToApples.component';
import { RewardsDecComponent } from './RewardsDec/RewardsDec.component';
import { RewardsIncComponent } from './RewardsInc/RewardsInc.component';


  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CashComponent,
    ApplesComponent,
    RewardsComponent,
    UserComponent,
    MarketComponent,
    SupplierComponent,
    CashToApplesComponent,
    RewardsDecComponent,
    RewardsIncComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
    // ChartModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

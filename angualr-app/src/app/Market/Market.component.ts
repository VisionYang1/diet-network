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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MarketService } from './Market.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-market',
  templateUrl: './Market.component.html',
  styleUrls: ['./Market.component.css'],
  providers: [MarketService]
})
export class MarketComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  private cashOJ;
  private fruitOJ;
  private vegetableOJ;

  marketID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  fruit = new FormControl('', Validators.required);
  vegetable = new FormControl('', Validators.required);
  cash = new FormControl('', Validators.required);


  constructor(public serviceMarket: MarketService, fb: FormBuilder) {
    this.myForm = fb.group({
      marketID: this.marketID,
      firstName: this.firstName,
      lastName: this.lastName,
      fruit: this.fruit,
      vegetable: this.vegetable,
      cash: this.cash
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMarket.getAllMarkets()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
    })
    .then(() => {

      //get asset
      for (let participant of tempList) {

        // get cash
        var splitted_cashID = participant.cash.split("#",2)
        var cashID = String(splitted_cashID[1]);

        // call service to get the cash
        this.serviceMarket.getCash(cashID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //update participant
          if(result.value){
            participant.cash = result.value;
          }else{
            participant.cash = result.value;
          }
        });

        // get fruit
        var splitted_fruitID = participant.fruit.split("#",2);
        var fruitID = String(splitted_fruitID[1]);

        // call service to get the apple asset
        this.serviceMarket.getFruit(fruitID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //update user
          if(result.value){
            participant.fruit = result.value;
          }else{
            participant.fruit = result.value;
          }
        });

        // get vegetable
        var splitted_vegetableID = participant.vegetable.split("#",2);
        var vegetableID = String(splitted_vegetableID[1]);

        // call service to get the apple asset
        this.serviceMarket.getVegetable(vegetableID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //update user
          if(result.value){
            participant.vegetable = result.value;
          }else{
            participant.vegetable = result.value;
          }
        });

      }

      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {


    return this.createAllAssetsMarket()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'marketID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'fruit': null,
        'vegetable': null
      });
      // this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  //create other assets associated with the user
  createAllAssetsMarket(): Promise<any>{
    
    //create cash
    this.cashOJ = {
      $class: "org.diet.network.Cash",
          "cashID":"CA_" + this.marketID.value,
          "currency":'Pound',
          "value":this.cash.value,
          "ownerID":this.marketID.value,
          "ownerEntity":'Market'
    };

    this.fruitOJ = {
      $class: "org.diet.network.Fruit",
          "fruitID":"FR_" + this.marketID.value,
          "value":this.fruit.value,
          "ownerID":this.marketID.value,
          "ownerEntity":'Market'
    };

    this.vegetableOJ = {
      $class: "org.diet.network.Vegetable",
          "vegetableID":"VE_" + this.marketID.value,
          "value":this.vegetable.value,
          "ownerID":this.marketID.value,
          "ownerEntity":'Market'
    };

    this.participant = {
      $class: 'org.diet.network.Market',
      'marketID': this.marketID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'cash': "CA_" + this.marketID.value,
      'fruit': "FR_" + this.marketID.value,
      'vegetable': "VE_" + this.marketID.value
    };

    //add Cash
    return this.serviceMarket.addCash(this.cashOJ)
    .toPromise()
    .then(() => {
      
      //add fruit
      this.serviceMarket.addFruit(this.fruitOJ)
      .toPromise()
      .then(() => {

        //add vegetable
        this.serviceMarket.addVegetable(this.vegetableOJ)
        .toPromise()
        .then(() => {

          this.serviceMarket.addMarket(this.participant)
          .toPromise()
          .then(() => {
            //reload
            this.loadAll();
          })
        });
      });
    });
  }
  
   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.diet.network.Market',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'fruit': this.fruit.value,
      'vegetable': this.vegetable.value,
      'cash': this.cash.value
    };

    return this.serviceMarket.updateMarket(form.get('marketID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceMarket.deleteMarket(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMarket.getMarket(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'marketID': null,
        'firstName': null,
        'lastName': null,
        'fruit': null,
        'vegetable': null,
        'cash': null
      };

      if (result.marketID) {
        formObject.marketID = result.marketID;
      } else {
        formObject.marketID = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.fruit) {
        formObject.fruit = result.fruit;
      } else {
        formObject.fruit = null;
      }

      if (result.vegetable) {
        formObject.vegetable = result.vegetable;
      } else {
        formObject.vegetable = null;
      }

      if (result.cash) {
        formObject.cash = result.cash;
      } else {
        formObject.cash = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'marketID': null,
      'firstName': null,
      'lastName': null,
      'fruit': null,
      'vegetable': null,
      'cash': null
    });
  }
}

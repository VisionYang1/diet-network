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
import { SupplierService } from './Supplier.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-supplier',
  templateUrl: './Supplier.component.html',
  styleUrls: ['./Supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  private cashOJ
  private appleOJ

  supplierID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  cash = new FormControl('', Validators.required);
  apple = new FormControl('', Validators.required);


  constructor(public serviceSupplier: SupplierService, fb: FormBuilder) {
    this.myForm = fb.group({
      supplierID: this.supplierID,
      firstName: this.firstName,
      lastName: this.lastName,
      cash: this.cash,
      apple: this.apple
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSupplier.getAllSuppliers()
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
        this.serviceSupplier.getCash(cashID)
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

        // get apple
        var splitted_appleID = participant.apple.split("#",2)
        var appleID = String(splitted_appleID[1]);

        // call service to get the cash
        this.serviceSupplier.getApple(appleID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          // update participant
          if(result.value){
            participant.apple = result.value;
          }else{
            participant.cash = result.value;
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

    // this.myForm.setValue({
    //   'supplierID': null,
    //   'firstName': null,
    //   'lastName': null,
    //   'cash': null,
    //   'apple': null
    // });

    return this.createAllAssetsMarket()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'supplierID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'apple': null
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
          "cashID":"CA_" + this.supplierID.value,
          "currency":'Pound',
          "value":this.cash.value,
          "ownerID":this.supplierID.value,
          "ownerEntity":'Supplier'
    };

    this.appleOJ = {
      $class: "org.diet.network.Apples",
          "appleID":"AP_" + this.supplierID.value,
          "value":this.apple.value,
          "ownerID":this.supplierID.value,
          "ownerEntity":'Supplier'
    };

    this.participant = {
      $class: 'org.diet.network.Supplier',
      'supplierID': this.supplierID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'cash': "CA_" + this.supplierID.value,
      'apple': "AP_" + this.supplierID.value
    };

    //add Cash
    return this.serviceSupplier.addCash(this.cashOJ)
    .toPromise()
    .then(() => {
      
      //add apple
      this.serviceSupplier.addApple(this.appleOJ)
      .toPromise()
      .then(() => {

        //add market
        this.serviceSupplier.addParticipant(this.participant)
        .toPromise()
        .then(() => {
            //reload
            this.loadAll()
        });
      });
    });
  }

   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.diet.network.Supplier',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'cash': this.cash.value,
      'apple': this.apple.value
    };

    return this.serviceSupplier.updateParticipant(form.get('supplierID').value, this.participant)
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

    return this.serviceSupplier.deleteParticipant(this.currentId)
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

    return this.serviceSupplier.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'supplierID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'apple': null
      };

      if (result.supplierID) {
        formObject.supplierID = result.supplierID;
      } else {
        formObject.supplierID = null;
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

      if (result.cash) {
        formObject.cash = result.cash;
      } else {
        formObject.cash = null;
      }

      if (result.apple) {
        formObject.apple = result.apple;
      } else {
        formObject.apple = null;
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
      'supplierID': null,
      'firstName': null,
      'lastName': null,
      'cash': null,
      'apple': null
    });
  }
}

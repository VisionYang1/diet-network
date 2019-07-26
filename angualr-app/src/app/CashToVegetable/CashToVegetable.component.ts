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
import { CashToVegetableService } from './CashToVegetable.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cashtovegetable',
  templateUrl: './CashToVegetable.component.html',
  styleUrls: ['./CashToVegetable.component.css'],
  providers: [CashToVegetableService]
})
export class CashToVegetableComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  buyerID = new FormControl('', Validators.required);
  vegetableValue = new FormControl('', Validators.required);
  cashRate = new FormControl('', Validators.required);
  cashValue = new FormControl('', Validators.required);
  vegetableInc = new FormControl('', Validators.required);
  vegetableDec = new FormControl('', Validators.required);
  cashInc = new FormControl('', Validators.required);
  cashDec = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCashToVegetable: CashToVegetableService, fb: FormBuilder) {
    this.myForm = fb.group({
      buyerID: this.buyerID,
      vegetableValue: this.vegetableValue,
      cashRate: this.cashRate,
      cashValue: this.cashValue,
      vegetableInc: this.vegetableInc,
      vegetableDec: this.vegetableDec,
      cashInc: this.cashInc,
      cashDec: this.cashDec,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCashToVegetable.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.diet.network.CashToVegetable',
      'buyerID': this.buyerID.value,
      'vegetableValue': this.vegetableValue.value,
      'cashRate': this.cashRate.value,
      'cashValue': this.cashValue.value,
      'vegetableInc': this.vegetableInc.value,
      'vegetableDec': this.vegetableDec.value,
      'cashInc': this.cashInc.value,
      'cashDec': this.cashDec.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'buyerID': null,
      'vegetableValue': null,
      'cashRate': null,
      'cashValue': null,
      'vegetableInc': null,
      'vegetableDec': null,
      'cashInc': null,
      'cashDec': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCashToVegetable.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'buyerID': null,
        'vegetableValue': null,
        'cashRate': null,
        'cashValue': null,
        'vegetableInc': null,
        'vegetableDec': null,
        'cashInc': null,
        'cashDec': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.diet.network.CashToVegetable',
      'buyerID': this.buyerID.value,
      'vegetableValue': this.vegetableValue.value,
      'cashRate': this.cashRate.value,
      'cashValue': this.cashValue.value,
      'vegetableInc': this.vegetableInc.value,
      'vegetableDec': this.vegetableDec.value,
      'cashInc': this.cashInc.value,
      'cashDec': this.cashDec.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCashToVegetable.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceCashToVegetable.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceCashToVegetable.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'buyerID': null,
        'vegetableValue': null,
        'cashRate': null,
        'cashValue': null,
        'vegetableInc': null,
        'vegetableDec': null,
        'cashInc': null,
        'cashDec': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.buyerID) {
        formObject.buyerID = result.buyerID;
      } else {
        formObject.buyerID = null;
      }

      if (result.vegetableValue) {
        formObject.vegetableValue = result.vegetableValue;
      } else {
        formObject.vegetableValue = null;
      }

      if (result.cashRate) {
        formObject.cashRate = result.cashRate;
      } else {
        formObject.cashRate = null;
      }

      if (result.cashValue) {
        formObject.cashValue = result.cashValue;
      } else {
        formObject.cashValue = null;
      }

      if (result.vegetableInc) {
        formObject.vegetableInc = result.vegetableInc;
      } else {
        formObject.vegetableInc = null;
      }

      if (result.vegetableDec) {
        formObject.vegetableDec = result.vegetableDec;
      } else {
        formObject.vegetableDec = null;
      }

      if (result.cashInc) {
        formObject.cashInc = result.cashInc;
      } else {
        formObject.cashInc = null;
      }

      if (result.cashDec) {
        formObject.cashDec = result.cashDec;
      } else {
        formObject.cashDec = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'buyerID': null,
      'vegetableValue': null,
      'cashRate': null,
      'cashValue': null,
      'vegetableInc': null,
      'vegetableDec': null,
      'cashInc': null,
      'cashDec': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}

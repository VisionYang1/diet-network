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
import { RewardsIncService } from './RewardsInc.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-rewardsinc',
  templateUrl: './RewardsInc.component.html',
  styleUrls: ['./RewardsInc.component.css'],
  providers: [RewardsIncService]
})
export class RewardsIncComponent implements OnInit {

  myForm: FormGroup;

  private allUsers;

  private successTransaction;
  private transactionID;

  private user;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  private rewardsRate = 1;

  // rewardsRate = new FormControl('', Validators.required);
  // rewardsDec = new FormControl('', Validators.required);
  // transactionId = new FormControl('', Validators.required);
  // timestamp = new FormControl('', Validators.required);

  formUserID = new FormControl('', Validators.required);

  constructor(private serviceRewardsInc: RewardsIncService, fb: FormBuilder) {
    this.myForm = fb.group({
      formUserID: this.formUserID

      // rewardsRate: this.rewardsRate,
      // rewardsDec: this.rewardsDec,
      // transactionId: this.transactionId,
      // timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.successTransaction = false;
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRewardsInc.getAllUsers()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      //get all users
      result.forEach(user => {
        tempList.push(user);
      });
      this.allUsers = tempList;
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
    // this.Transaction = {
    //   $class: 'org.diet.network.RewardsInc',
    //   'rewardsRate': this.rewardsRate.value,
    //   'rewardsDec': this.rewardsDec.value,
    //   'transactionId': this.transactionId.value,
    //   'timestamp': this.timestamp.value
    // };

    // this.myForm.setValue({
    //   'rewardsRate': null,
    //   'rewardsDec': null,
    //   'transactionId': null,
    //   'timestamp': null
    // });

    //get the given user
    for(let user of this.allUsers){
      if(user.userID == this.formUserID.value){
        this.user = user;
      }
    }

    var splitted_rewardID = this.user.reward.split("#", 2);
    var rewardID = String(splitted_rewardID[1]);

    console.log("id:"+this.user.reward);

    this.Transaction = {
      $class: 'org.diet.network.RewardsInc',
      'rewardsRate': this.rewardsRate,
      'rewardsInc': this.user.reward
    }

    return this.serviceRewardsInc.getReward(rewardID)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      // this.myForm.setValue({
      //   'rewardsRate': null,
      //   'rewardsDec': null,
      //   'transactionId': null,
      //   'timestamp': null
      // });

      if(result.value){
        if((result.value - this.rewardsRate) < 0){
          this.errorMessage = "Insufficient Reward!";
          return false;
        }
        return true;
      }
    })
    .then((checkReward) => {
      if(checkReward){

        this.serviceRewardsInc.addTransaction(this.Transaction)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          this.transactionID = result.transactionId;
          console.log(result)
        })
        .catch((error) => {
          if (error === 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
          } else {
            this.errorMessage = error;
          }
        })
        .then(() => {
          this.successTransaction = true;
        })
      }
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
    // this.Transaction = {
    //   $class: 'org.diet.network.RewardsInc',
    //   'rewardsRate': this.rewardsRate.value,
    //   'rewardsDec': this.rewardsDec.value,
    //   'timestamp': this.timestamp.value
    // };

    return this.serviceRewardsInc.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.serviceRewardsInc.deleteTransaction(this.currentId)
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

    return this.serviceRewardsInc.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'rewardsRate': null,
        'rewardsDec': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.rewardsRate) {
        formObject.rewardsRate = result.rewardsRate;
      } else {
        formObject.rewardsRate = null;
      }

      if (result.rewardsDec) {
        formObject.rewardsDec = result.rewardsDec;
      } else {
        formObject.rewardsDec = null;
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
      'rewardsRate': null,
      'rewardsDec': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}

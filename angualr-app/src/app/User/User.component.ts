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
import { UserService } from './User.service';
// import { Chart } from 'angular-highcharts';
import 'rxjs/add/operator/toPromise';

let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-user',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  private cashOJ
  private appleOJ
  private rewardOJ

  userID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  cash = new FormControl('', Validators.required);
  apple = new FormControl('', Validators.required);
  reward = new FormControl('', Validators.required);
  selectTime = new FormControl('', Validators.required);


  constructor(public serviceUser: UserService, fb: FormBuilder) {
    this.myForm = fb.group({
      selectTime: this.selectTime,
      userID: this.userID,
      firstName: this.firstName,
      lastName: this.lastName,
      cash: this.cash,
      apple: this.apple,
      reward: this.reward
    });
  };

  ngOnInit(): void {

    // this.myForm.get('selectTime').setValue("perDay");

    this.myForm.get('selectTime').valueChanges.subscribe(res=>{
      if (res=='perDay')
      {
        let perDay = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        this.loadGraph(perDay);
      }
  
      if (res=='perWeek')
      {
        let perWeek = ['First Week', 'Second Week', 'Thrid Week', 'Fourth Week'];
        this.loadGraph(perWeek);
      }
      if (res=='perMonth')
      {
        let perMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.loadGraph(perMonth);
      }
    });
    this.loadAll();
  }

  loadGraph(time): void {
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Average Intake of Fruit and Vegetable'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: time,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Grams (g)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} g</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Fruit',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    
      }, {
        name: 'New Vegetable',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    
      }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    
      }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    
      }]
    });
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUser.getAllUsers()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });

    })
    .then(() => {

      //get the other assets
      for (let participant of tempList) {
        
        // get cash
        var splitted_cashID = participant.cash.split("#",2);
        var cashID = String(splitted_cashID[1]);

        // call service to get the cash asset
        this.serviceUser.getCash(cashID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //update user
          if(result.value){
            participant.cash = result.value;
          }else{
            participant.cash = result.value;
          }
        });

        // get apple
        var splitted_appleID = participant.apple.split("#",2);
        var appleID = String(splitted_appleID[1]);

        // call service to get the apple asset
        this.serviceUser.getApple(appleID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //update user
          if(result.value){
            participant.apple = result.value;
          }else{
            participant.apple = result.value;
          }
        });

        // get reward
        var splitted_rewardID = participant.reward.split("#",2);
        var rewardID = String(splitted_rewardID[1]);

        // call service to get the reward asset
        this.serviceUser.getReward(rewardID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          // update user
          if(result.value){
            participant.reward = result.value;
          }else{
            participant.reward = result.value;
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


    this.participant = {
      $class: 'org.diet.network.User',
      'userID': this.userID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'cash': "CA_" + this.userID.value,
      'apple': "AP_" + this.userID.value,
      'reward': "RW_" + this.userID.value,
    };

    // this.myForm.setValue({
    //   'userID': null,
    //   'firstName': null,
    //   'lastName': null,
    //   'cash': null,
    //   'apple': null,
    //   'reward': null
    // });



    //create all assests associated with user
    return this.createAllAssetsUser()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'selectTime': null,
        'userID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'apple': null,
        'reward': null
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
  createAllAssetsUser(): Promise<any>{
    
    //create cash
    this.cashOJ = {
      $class: "org.diet.network.Cash",
          "cashID":"CA_" + this.userID.value,
          "currency":'Pound',
          "value":this.cash.value,
          "ownerID":this.userID.value,
          "ownerEntity":'User'
    };

    this.appleOJ = {
      $class: "org.diet.network.Apples",
          "appleID":"AP_" + this.userID.value,
          "value":this.apple.value,
          "ownerID":this.userID.value,
          "ownerEntity":'User'
    };

    this.rewardOJ = {
      $class: "org.diet.network.Rewards",
          "rewardID":"RW_" + this.userID.value,
          "value":this.reward.value,
          "ownerID":this.userID.value,
          "ownerEntity":'User'
    };

    //add Cash
    return this.serviceUser.addCash(this.cashOJ)
    .toPromise()
    .then(() => {
      
      //add apple
      this.serviceUser.addApple(this.appleOJ)
      .toPromise()
      .then(() => {

        //add Reward
        this.serviceUser.addReward(this.rewardOJ)
        .toPromise()
        .then(() => {

          //add User
          this.serviceUser.addUser(this.participant)
          .toPromise()
          .then(() => {
            //reload
            this.loadAll()
          });
        });
      });
    });
  }

   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.diet.network.User',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'cash': this.cash.value,
      'apple': this.apple.value,
      'reward': this.reward.value
    };

    return this.serviceUser.updateUser(form.get('userID').value, this.participant)
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

    return this.serviceUser.deleteUser(this.currentId)
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

    return this.serviceUser.getUser(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'userID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'apple': null,
        'reward': null
      };

      if (result.userID) {
        formObject.userID = result.userID;
      } else {
        formObject.userID = null;
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

      if (result.reward) {
        formObject.reward = result.reward;
      } else {
        formObject.reward = null;
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
      'selectTime': 'perDay',
      'userID': null,
      'firstName': null,
      'lastName': null,
      'cash': null,
      'apple': null,
      'reward': null
    });
  }
}

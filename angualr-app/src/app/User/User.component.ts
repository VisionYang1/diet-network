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
import 'rxjs/add/operator/toPromise';

declare global {
  interface Date {
      getWeek ()
      // getWeek ()
  }
}

// Date.prototype.getWeek = function(start)
// {
//     start = start || 0;
//     var today = new Date(this.setHours(0, 0, 0, 0));
//     console.log("today.getDay():" + today.getDay());
//     var day = today.getDay() - start;
//     var date = today.getDate() - day;

//     var StartDate = new Date(today.setDate(date));
//     var EndDate = new Date(today.setDate(date + 6));
//     return [StartDate, EndDate];
// }

Date.prototype.getWeek = function()
{

    let weekOJ={
      'first': [],
      'second': [],
      'third': [],
      'fourth': []
    };

    var today = new Date(this.setHours(0, 0, 0, 0));
    console.log("today.getDate():" + today.getFullYear());
    var fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-";
    var days = 1;
    var judge = true;
    var month = today.getMonth() + 1;

    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
      while(judge){
        if(days <= 7 && days > 0){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.first.push(fullMonthDays);
          days++;
        }
        if(days <= 14 && days > 7){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.second.push(fullMonthDays);
          days++;
        }
        if(days <= 21 && days > 14){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.third.push(fullMonthDays);
          days++;
        }
        if(days > 21){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.fourth.push(fullMonthDays);
          days++;
        }
        if(days == 32){
          judge = false;
        }
      }
    }

    if(month == 10 || month == 12){
      while(judge){
        if(days <= 7 && days > 0){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.first.push(fullMonthDays);
          days++;
        }
        if(days <= 14 && days > 7){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.second.push(fullMonthDays);
          days++;
        }
        if(days <= 21 && days > 14){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.third.push(fullMonthDays);
          days++;
        }
        if(days > 21){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.fourth.push(fullMonthDays);
          days++;
        }
        if(days == 32){
          judge = false;
        }
      }
    }

    if(month == 11){
      while(judge){
        if(days <= 7 && days > 0){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.first.push(fullMonthDays);
          days++;
        }
        if(days <= 14 && days > 7){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.second.push(fullMonthDays);
          days++;
        }
        if(days <= 21 && days > 14){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.third.push(fullMonthDays);
          days++;
        }
        if(days > 21){
          fullMonthDays = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + days;
          weekOJ.fourth.push(fullMonthDays);
          days++;
        }
        if(days == 31){
          judge = false;
        }
      }
    }
    if(month == 4 || month == 6 || month == 9 || month == 11){
      while(judge){
        if(days <= 7 && days > 0){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.first.push(fullMonthDays);
          days++;
        }
        if(days <= 14 && days > 7){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.second.push(fullMonthDays);
          days++;
        }
        if(days <= 21 && days > 14){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.third.push(fullMonthDays);
          days++;
        }
        if(days > 21){
          fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
          weekOJ.fourth.push(fullMonthDays);
          days++;
        }
        if(days == 31){
          judge = false;
        }
      }
    }

    // judge February
    if((today.getMonth() + 1) == 2){
      if(((today.getFullYear()%4==0)&&(today.getFullYear()%100!=0))||(today.getFullYear()%400==0)){
        while(judge){
          if(days <= 7 && days > 0){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.first.push(fullMonthDays);
            days++;
          }
          if(days <= 14 && days > 7){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.second.push(fullMonthDays);
            days++;
          }
          if(days <= 21 && days > 14){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.third.push(fullMonthDays);
            days++;
          }
          if(days <= 29 && days > 21){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.fourth.push(fullMonthDays);
            days++;
          }
          if(days == 30){
            judge = false;
          }
        }
      }else{
        while(judge){
          if(days <= 7 && days > 0){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.first.push(fullMonthDays);
            days++;
          }
          if(days <= 14 && days > 7){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.second.push(fullMonthDays);
            days++;
          }
          if(days <= 21 && days > 14){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.third.push(fullMonthDays);
            days++;
          }
          if(days <= 28 && days > 21){
            fullMonthDays = today.getFullYear() + "-" + "0" + (today.getMonth()+1) + "-" + days;
            weekOJ.fourth.push(fullMonthDays);
            days++;
          }
          if(days == 29){
            judge = false;
          }
        }
      }
    }

    console.log("weekOJ first:" + weekOJ.first);
    console.log("weekOJ second:" + weekOJ.second);
    console.log("weekOJ third:" + weekOJ.third);
    console.log("weekOJ fourth:" + weekOJ.fourth);

    return weekOJ;
}

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

  private dayArray: Array<any> = [];
  private dayArray2: Array<any> = [];
  private weekOJ={
    'first': null,
    'second': null,
    'thrid': null,
    'fourth': null
  };
  private monthArray;

  private dayFruitData;
  private weekFruitData;
  private monthFruitData;

  private dayVegetableData;
  private weekVegetableData;
  private monthVegetableData;

  private cashOJ;
  private fruitOJ;
  private vegetableOJ;
  private rewardOJ;

  userID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  fruit = new FormControl('', Validators.required);
  vegetable = new FormControl('', Validators.required);
  cash = new FormControl('', Validators.required);
  reward = new FormControl('', Validators.required);
  selectTime = new FormControl('', Validators.required);


  constructor(public serviceUser: UserService, fb: FormBuilder) {
    this.myForm = fb.group({
      selectTime: this.selectTime,
      userID: this.userID,
      firstName: this.firstName,
      lastName: this.lastName,
      fruit: this.fruit,
      vegetable: this.vegetable,
      cash: this.cash,
      reward: this.reward
    });
  };

  ngOnInit(): void {

    this.myForm.get('selectTime').valueChanges.subscribe(res=>{

      if (res=='perDay')
      {
        let perDay = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        let day = "Daliy";

        //get date of array
        this.loadGraphDate("day");
        // console.log("all day:" + this.dayArray);

        // console.log("myForm, user ID:" + this.myForm.get('userID').value);
        
        // get given day data
        this.getUserFruitTransaction(this.myForm, this.dayArray, "day");

        //load graph according to fruit data
        this.loadGraph(day, perDay, this.dayFruitData, this.dayVegetableData);

      }
  
      if (res=='perWeek')
      {
        let perWeek = ['First Week', 'Second Week', 'Thrid Week', 'Fourth Week'];
        let week = "Weekly";

        // get week date of array
        this.loadGraphDate("week");

        console.log("outside week oj:"+ this.weekOJ.first)
        // get given day data
        this.getUserFruitTransaction(this.myForm, this.weekOJ, "week");

        this.loadGraph(week, perWeek, this.weekFruitData, this.weekVegetableData);
      }
      if (res=='perMonth')
      {
        let perMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = "Monthly";
        this.loadGraph(month, perMonth, this.monthFruitData, this.monthVegetableData);
      }
    });

    this.loadAll();
  }

  loadGraph(title, time, fruitData, vegetableData): void {
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: title + ' Average Intake of Fruit and Vegetable'
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
        data: fruitData
    
      }, {
        name: 'Vegetable',
        data: vegetableData
    
      }]
    });
  }

  loadGraphDate(type?:string): any {
    if(type == "day"){
      let today = new Date().toString();
      switch(today.slice(0,3)){
        case "Mon":
          this.dayArray = this.getRangeDate(6, this.dayArray, "more");
          break;
        case "Tue":
          this.dayArray = this.getRangeDate(-1,this.dayArray, "more");
          // this.dayArray.splice(1,1);
          this.dayArray2 = this.getRangeDate(5,this.dayArray2, "more");
          this.dayArray = this.dayArray.concat(this.dayArray2);
          break;
        case "Wed":
          this.dayArray = this.getRangeDate(-2,this.dayArray, "more");
          // this.dayArray.splice(2,1);
          this.dayArray2 = this.getRangeDate(4,this.dayArray2, "more");
          this.dayArray = this.dayArray.concat(this.dayArray2);
            break;
        case "Thu":
          this.dayArray = this.getRangeDate(-3,this.dayArray, "more");
          // this.dayArray.splice(3,1);
          this.dayArray2 = this.getRangeDate(3,this.dayArray2, "more");
          this.dayArray = this.dayArray.concat(this.dayArray2);
            break;
        case "Fri":
          this.dayArray = this.getRangeDate(-4,this.dayArray, "more");
          // this.dayArray.splice(4,1);
          this.dayArray2 = this.getRangeDate(2,this.dayArray2, "more");
          this.dayArray = this.dayArray.concat(this.dayArray2);
            break;
        case "Sat":
          this.dayArray = this.getRangeDate(-5,this.dayArray, "more");
          // this.dayArray.splice(5,1);
          this.dayArray2 = this.getRangeDate(1,this.dayArray2, "more");
          this.dayArray = this.dayArray.concat(this.dayArray2);
            break;
        case "Sun":
          this.dayArray = this.getRangeDate(-6,this.dayArray, "more");
            break;
      }
    }
    else if(type == "week"){
      this.weekOJ = new Date().getWeek();
    }
    else if(type == "month"){

    }
  }

  getAllDaysInMonth(){
    
  }

  getRangeDate( range: number, arr: Array<any>, type?: string) {

    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate( new Date().getTime() ); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if ( range ) {
      if ( type ) {
        if ( type === 'one' ) {
          changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
          console.log( changeDate );
        }
        if ( type === 'more' ) {
          if ( range < 0 ) {
            for ( let i = Math.abs( range ); i >= 0; i-- ) {
              resultArr.push( formatDate( new Date().getTime() + ( -1000 * 3600 * 24 * i ) ) );
              arr = resultArr;
              console.log( resultArr );
              console.log( arr );
            }
          } else {
            for ( let i = 1; i <= range; i++ ) {
              resultArr.push( formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * i ) ) );
              arr = resultArr;
              console.log( resultArr );
              console.log( arr );
            }
          }
          return arr;
        }
      } else {
        changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
        console.log( changeDate );
      }
    }
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
      this.allParticipants = tempList;
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

        // get fruit
        var splitted_fruitID = participant.fruit.split("#",2);
        var fruitID = String(splitted_fruitID[1]);

        // call service to get the apple asset
        this.serviceUser.getFruit(fruitID)
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
        this.serviceUser.getVegetable(vegetableID)
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

  getUserFruitTransaction(form: any, dateRange, dateType?: string): Promise<any> {


    //retrieve all users in the tempList array
    let tempList = [];
    let userAllFruitTransaction = [];

    // call transaction
    return this.serviceUser.getAllFruitTransactions()
    .toPromise()
    .then((allFruitTransactions) => {
      
      this.errorMessage = null;

      allFruitTransactions.forEach(transaction => {
        tempList.push(transaction);
      });

      let len = 0;
      // get the given user's fruit transaction
      let userFruitID = "resource:org.diet.network.Fruit#FR_" + form.get('userID').value;
      console.log("user fruit id:" + userFruitID);
      for(let transaction of tempList){
        if(transaction.fruitInc == userFruitID){
          len++;
          // console.log("test fruit transaction date:" + transaction.toString().slice(0,11))
          userAllFruitTransaction.push(transaction);
        }
      }

      console.log("len :" + len);

      // load per day data
      if(dateType == "day"){
        let dayTotalData = [];
        //get given day transaction
        for(let day of dateRange){
          //caculate per day all data
          let perDayData = 0;
          for(let fruitTransaction of userAllFruitTransaction){
            console.log("test fruit transaction date inside day:" + fruitTransaction.timestamp.slice(0,10))
            if(day == fruitTransaction.timestamp.slice(0,10)){
              console.log("successful day if" + day);
              perDayData = perDayData + fruitTransaction.fruitValue;
            }
          }
          if(perDayData){
            dayTotalData.push(perDayData);
          }else{
            dayTotalData.push(0);
          }
          // console.log("test day array:" + day);
        }
        this.dayFruitData = dayTotalData;
        console.log("test day array data:" + dayTotalData);
      }

      // load week data
      if(dateType == "week"){

        let weekTotalData = [];
        let firstWeek = 0;
        let secondWeek = 0;
        let thirdWeek = 0;
        let fourthWeek = 0;

        console.log("week begin");

        // caculate first week data
        for(let weekday of dateRange.first){
          console.log("first is comming");
          //caculate per day all data
          let perDayData = 0;
          for(let fruitTransaction of userAllFruitTransaction){
            
            if(weekday == fruitTransaction.timestamp.slice(0,10)){
              console.log("successful day if" + weekday);
              perDayData = perDayData + fruitTransaction.fruitValue;
            }
          }

          firstWeek = firstWeek + perDayData;
        }

        weekTotalData.push(firstWeek);

        for(let weekday of dateRange.second){
          console.log("second is comming");
          //caculate per day all data
          let perDayData = 0;
          for(let fruitTransaction of userAllFruitTransaction){
            
            if(weekday == fruitTransaction.timestamp.slice(0,10)){
              console.log("successful day if" + weekday);
              perDayData = perDayData + fruitTransaction.fruitValue;
            }
          }

          secondWeek = secondWeek + perDayData;
        }

        weekTotalData.push(secondWeek);

        for(let weekday of dateRange.third){
          console.log("third is comming");
          //caculate per day all data
          let perDayData = 0;
          for(let fruitTransaction of userAllFruitTransaction){
            
            if(weekday == fruitTransaction.timestamp.slice(0,10)){
              console.log("successful day if" + weekday);
              perDayData = perDayData + fruitTransaction.fruitValue;
            }
          }

          thirdWeek = thirdWeek + perDayData;
        }

        weekTotalData.push(thirdWeek);

        for(let weekday of dateRange.fourth){
          console.log("fourth is comming");
          //caculate per day all data
          let perDayData = 0;
          for(let fruitTransaction of userAllFruitTransaction){
            console.log("fourth weekday:" + weekday + ", transaction:" + fruitTransaction.timestamp.slice(0,10));
            if(weekday == fruitTransaction.timestamp.slice(0,10)){
              console.log("successful day if" + weekday);
              perDayData = perDayData + fruitTransaction.fruitValue;
            }
          }

          fourthWeek = fourthWeek + perDayData;
        }

        weekTotalData.push(fourthWeek);
        
        this.weekFruitData = weekTotalData;
        console.log("test week array data:" + weekTotalData);
      }
    })
    .catch((error) => {
      if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      }
      else if(error == '404 - Not Found'){
      this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else{
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
      'fruit': "FR_" + this.userID.value,
      'vegetable': "VE_" + this.userID.value,
      'reward': "RW_" + this.userID.value
    };

    //create all assests associated with user
    return this.createAllAssetsUser()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'selectTime': "perDay",
        'userID': null,
        'firstName': null,
        'lastName': null,
        'cash': null,
        'fruit': null,
        'vegetable': null,
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

    this.fruitOJ = {
      $class: "org.diet.network.Fruit",
          "fruitID":"FR_" + this.userID.value,
          "value":this.fruit.value,
          "ownerID":this.userID.value,
          "ownerEntity":'User'
    };

    this.vegetableOJ = {
      $class: "org.diet.network.Vegetable",
          "vegetableID":"VE_" + this.userID.value,
          "value":this.vegetable.value,
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
      
      //add fruit
      this.serviceUser.addFruit(this.fruitOJ)
      .toPromise()
      .then(() => {

        //add Reward
        this.serviceUser.addReward(this.rewardOJ)
        .toPromise()
        .then(() => {

          //add vegetable
          this.serviceUser.addVegetable(this.vegetableOJ)
          .toPromise()
          .then(() => {

            //add user 
            this.serviceUser.addUser(this.participant)
            .toPromise()
            .then(() => {
              //reload
              this.loadAll();
            })
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
      'fruit': this.fruit.value,
      'vegetable': this.vegetable.value,
      'cash': this.cash.value,
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
        'selectTime': "perDay",
        'userID': null,
        'firstName': null,
        'lastName': null,
        'fruit': null,
        'vegetable': null,
        'cash': null,
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

      if (result.reward) {
        formObject.reward = result.reward;
      } else {
        formObject.reward = null;
      }

      this.myForm.setValue(formObject);
      this.loadGraph("", "", this.dayFruitData, this.dayVegetableData);
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
      'selectTime': "perDay",
      'userID': null,
      'firstName': null,
      'lastName': null,
      'fruit': null,
      'vegetable': null,
      'cash': null,
      'reward': null
    });
  }
}

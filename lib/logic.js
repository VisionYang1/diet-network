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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.diet.network.CashToApples} UpdateValues
 * @transaction
 */
function CashToApples(UpdateValues) {

    //determine change in cash value from the rate
    var appleWeightValue = (UpdateValues.cashRate * UpdateValues.cashValue);

    //update values of the assets
    UpdateValues.cashInc.value = UpdateValues.cashInc.value + UpdateValues.cashValue;
    UpdateValues.cashDec.value = UpdateValues.cashDec.value - UpdateValues.cashValue;
    UpdateValues.appleInc.value = UpdateValues.appleInc.value + appleWeightValue;
    UpdateValues.appleDec.value = UpdateValues.appleDec.value - appleWeightValue;

    //get asset registry for cash and apple, and update on the ledger
    return getAssetRegistry('org.diet.network.Cash')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
        })                
        .then(function () {
            return  getAssetRegistry('org.diet.network.Apples')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.appleInc,UpdateValues.appleDec]);
            });            
        });        
   
}

function RewardsInc(UpdateValues) {

    UpdateValues.rewardsInc.value = UpdateValues.rewardsInc.value + UpdateValues.rewardsRate;

    //get asset registry for Rewards, and update on the ledger
    return getAssetRegistry('org.diet.network.Rewards')
        .then(function (assetRegistry) {
	    return assetRegistry.updateAll([UpdateValues.rewardsInc]);
	})
}

function RewardsDec(UpdateValues) {

    UpdateValues.rewardsDec.value = UpdateValues.rewardsDec.value - UpdateValues.rewardsRate;

    //get asset registry for Rewards, and update on the ledger
    return getAssetRegistry('org.diet.network.Rewards')
        .then(function (assetRegistry) {
	    return assetRegistry.updateAll([UpdateValues.rewardsDec]);
	})
}

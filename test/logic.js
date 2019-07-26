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
 * Sample transaction
 * @param {org.diet.network.CashToFruit} UpdateValues
 * @transaction
 */
function CashToFruit(UpdateValues) {

    //update values of the assets
    UpdateValues.cashInc.value = UpdateValues.cashInc.value + UpdateValues.cashValue;
    UpdateValues.cashDec.value = UpdateValues.cashDec.value - UpdateValues.cashValue;
    UpdateValues.fruitInc.value = UpdateValues.fruitInc.value + UpdateValues.fruitValue;
    UpdateValues.fruitDec.value = UpdateValues.fruitDec.value - UpdateValues.fruitValue;

    //get asset registry for cash and apple, and update on the ledger
    return getAssetRegistry('org.diet.network.Cash')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
        })                
        .then(function () {
            return  getAssetRegistry('org.diet.network.Fruit')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.fruitInc,UpdateValues.fruitDec]);
            });            
        });        
   
}

/**
 * Sample transaction
 * @param {org.diet.network.CashToVegetable} UpdateValues
 * @transaction
 */
function CashToVegetable(UpdateValues) {

    //update values of the assets
    UpdateValues.cashInc.value = UpdateValues.cashInc.value + UpdateValues.cashValue;
    UpdateValues.cashDec.value = UpdateValues.cashDec.value - UpdateValues.cashValue;
    UpdateValues.vegetableInc.value = UpdateValues.vegetableInc.value + UpdateValues.vegetableValue;
    UpdateValues.vegetableDec.value = UpdateValues.vegetableDec.value - UpdateValues.vegetableValue;

    //get asset registry for cash and apple, and update on the ledger
    return getAssetRegistry('org.diet.network.Cash')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
        })                
        .then(function () {
            return  getAssetRegistry('org.diet.network.Vegetable')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.vegetableInc,UpdateValues.vegetableDec]);
            });            
        });        
   
}

/**
 * Sample transaction
 * @param {org.diet.network.RewardsInc} UpdateValues
 * @transaction
 */
function RewardsInc(UpdateValues) {

    UpdateValues.rewardsInc.value = UpdateValues.rewardsInc.value + UpdateValues.rewardsRate;

    //get asset registry for Rewards, and update on the ledger
    return getAssetRegistry('org.diet.network.Rewards')
        .then(function (assetRegistry) {
	    return assetRegistry.updateAll([UpdateValues.rewardsInc]);
	})
}

/**
 * Sample transaction
 * @param {org.diet.network.RewardsDec} UpdateValues
 * @transaction
 */
function RewardsDec(UpdateValues) {

    UpdateValues.rewardsDec.value = UpdateValues.rewardsDec.value - UpdateValues.rewardsRate;

    //get asset registry for Rewards, and update on the ledger
    return getAssetRegistry('org.diet.network.Rewards')
        .then(function (assetRegistry) {
	    return assetRegistry.updateAll([UpdateValues.rewardsDec]);
	})
}



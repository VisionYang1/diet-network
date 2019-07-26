import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.diet.network{
   export class User extends Participant {
      userID: string;
      firstName: string;
      lastName: string;
      cash: Cash;
      reward: Rewards;
   }
   export class Market extends Participant {
      marketID: string;
      firstName: string;
      lastName: string;
      cash: Cash;
   }
   export class Supplier extends Participant {
      supplierID: string;
      firstName: string;
      lastName: string;
      cash: Cash;
   }
   export enum OwnerEntity {
      Supplier,
      Market,
      User,
   }
   export class Cash extends Asset {
      cashID: string;
      currency: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Fruit extends Asset {
      fruitID: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Vegetable extends Asset {
      vegetableID: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Rewards extends Asset {
      rewardID: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class CashToFruit extends Transaction {
      buyerID: string;
      fruitValue: number;
      cashRate: number;
      cashValue: number;
      fruitInc: Fruit;
      fruitDec: Fruit;
      cashInc: Cash;
      cashDec: Cash;
   }
   export class CashToVegetable extends Transaction {
      buyerID: string;
      vegetableValue: number;
      cashRate: number;
      cashValue: number;
      vegetableInc: Vegetable;
      vegetableDec: Vegetable;
      cashInc: Cash;
      cashDec: Cash;
   }
   export class RewardsDec extends Transaction {
      rewardsRate: number;
      rewardsDec: Rewards;
   }
   export class RewardsInc extends Transaction {
      rewardsRate: number;
      rewardsDec: Rewards;
   }
// }

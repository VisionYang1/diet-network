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
      apple: Apples;
      reward: Rewards;
   }
   export class Market extends Participant {
      marketID: string;
      firstName: string;
      lastName: string;
      cash: Cash;
      apple: Apples;
   }
   export class Supplier extends Participant {
      supplierID: string;
      firstName: string;
      lastName: string;
      cash: Cash;
      apple: Apples;
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
   export class Apples extends Asset {
      appleID: string;
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
   export class CashToApples extends Transaction {
      cashRate: number;
      cashValue: number;
      appleInc: Apples;
      appleDec: Apples;
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

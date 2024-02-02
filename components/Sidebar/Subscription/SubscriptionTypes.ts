export interface ISubscriptionTypes{
    title:string;
    description: string;
    prices:{
      monthly:number;
      quarterly:number;
      halfYearly:number;
      yearly:number;
    },
    tokenSize:number;
    actionButton:string;
}

export const subscriptions:ISubscriptionTypes[] = [
    { title: "Premium", description: "Token limit extended upto 8192.", prices:{monthly:3, quarterly:10, halfYearly:14, yearly: 24},tokenSize:8192, actionButton:"Buy now"},
    { title: "Super", description: "Token limit extended upto 6144.", prices:{monthly:2, quarterly:7, halfYearly:10, yearly: 18},tokenSize:6144, actionButton:"Buy now"},
    { title: "basic", description: "Token limit extended upto 4096.", prices:{monthly:1, quarterly:3, halfYearly:8, yearly: 14},tokenSize:4096, actionButton:"Buy now"}
  ]
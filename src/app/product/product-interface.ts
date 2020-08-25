export interface IProduct {
    key:number;
    name: string;
    botanicalname:string;
    price: number;
    size: string;
    stock: number;
    productdetail: string;
    productspecs: string;
    careinstructions: string;
    family: string;
    vining: string;
    airpurifying: string;
    easycare: string;
    lowlight: string;
    urlImage1: string;
    urlImage2: string;
    urlImage3: string;
    potsize : number;
    reviewCount : number;
    totalScore : number;
    petfriendly : string;
    reviews: IReview [];
}


export interface IReview {
    comment: string;
    dateCreated: string;
    key: string;
    rating: string;
    userFirstname: string;
    userLastname: string;
    userKey: string;  
}
import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { ProductService } from './product.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import { of, from, Observable } from 'rxjs';
import { IProduct, IReview } from '../product-interface';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

const DummyReviews : IReview [] = [
{  
    comment : "\nIncantat de plantele comandate de mine. Site excelent, îndrumare și livrare rapidă.",
    dateCreated : "2-Iul-2020",
    rating : "4",
    userFirstname : "Tudor",
    userKey : "vOV6uBMwwyQfuVc3DG7JJXQ1XxY2",
    userLastname : "Pop",
    key : "-MBBTG_QS7MEOGXO4o6X" 
  },
 {
    comment : "Foarte multumit de comanda!",
    dateCreated : "2-Iul-2020",
    rating : "5",
    userFirstname : "Tudor",
    userKey : "vOV6uBMwwyQfuVc3DG7JJXQ1XxY2",
    userLastname : "Pop",
    key:"-MBBZDNg1CgLn63PDG7s"
  }
]

const DummyProduct : IProduct[] = [ { 
  key:1,
  airpurifying : "yes",
  botanicalname : "Senecio rowleyanus",
  careinstructions : "Lumina: lumină indirectă\nApa: scăzut până la mediu\nTemperatura: medie\nUmiditate: medie\nAnimale de companie: Nu",
  easycare : "no",
  family : "succulent",
  lowlight : "no",
  name : "String of Pearls",
  petfriendly : "no",
  potsize : 12,
  price : 120,
  productdetail : "Acest Senecio rowleyanus este favoritul iubitorului de plante! Frunzele sferice ale acestui suculent delicat vor adăuga textură colecției tale de plante și îți vor face camera să pară ca și cum ar fi împodobită cu margele agățate. Mai mult, frunzișul său dens împachetat poate produce flori mici care emit un parfum dulce, de scorțișoară, făcând ca această plantă să miroasă la fel de minunat.",
  productspecs : "Senecio Rowleyanus poate fi un pic temperamental, așa că asigurați-vă că găsiți locul perfect și acordați în mod constant acestei plante atenția de care are nevoie. Această plantă agățatoare iubește căldura și lumina indirectă, dar îi plac condițiile mai răcoroase în timpul iernii. Dacă li se oferă condițiile potrivite, aceste vițe suculente se vor răsplăti prin creșterea din ce în ce mai lungă, făcând, în cele din urmă, contactul cu podeaua. Sunt plante cu o durată de viață relativ scurtă, care se propagă ușor.\n\nImportant! Șirurile de perle sunt otrăvitoare dacă sunt ingerate, așa că fiți foarte atenți dacă aveți animale de companie și / sau copii mici.",
  reviewCount : 2,
  size : "medium",
  stock : 5,
  totalScore : 4.5,
  urlImage1: "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-String-of-Pearls-Grow-Extra-Large_1000x10001.jpg?alt=media&token=6bdc5e85-3fa2-4f4d-a1cc-a691826a3250",
  urlImage2: "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FString-of-Pearls_1000x10002.jpg?alt=media&token=0d0cf68b-865e-4683-be5f-be5520fa6cb6",
  urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-String-of-Pearls-1_1000x10003.png?alt=media&token=a63bdd8d-e284-4be1-bafa-5462aee1ed46",
  vining : "yes",
  reviews: [] },

]
const DummyProductList: IProduct []= [
  { 
    key : 0,
    name : "Hoya Exotica",
    airpurifying: "yes",
    botanicalname: "Hoya carnosa 'Exotica'",
    careinstructions : "Lumina: lumină indirectă\nApa: scăzut până la mediu\nTemperatura: medie\nUmiditate: medie\nSigură pentru animale de companie: Da",
    easycare : "no",
    family : "hoya",
    lowlight : "no",
    petfriendly : "yes",
    potsize : 12,
    price : 45,
    productdetail : "\nUneori, nuanțele din natură sunt cele mai profunde. Această plantă de interior este modul naturii de a ne aminti să nu renunțăm, deoarece ne străduim să ne atingem obiectivele. Lăsați acestă Hoya să vă inspire în timp ce o urmăriți urcând încet și atașîndu-se de ceea ce este mai aproape, ajungând tot mai sus.",
    productspecs : "Familie: Apocynaceae\n\nDenumire comună: plantă de ceară, floare de ceară, floare de porțelan sau doar Hoya\n\nNume botanic: Hoya carnosa 'Exotica'\n\nFiecare Hoya este selectată manual din seră, ambalată cu atenție și livrată direct la tine! Ocazional plantele se pot mișca în timpul expedierii și pot ajunge cu o parte din solul deplasat. Vă rugăm să eliminați ambalajul cu atenție, să înlocuiți solul deplasat, apa, apoi să scurgeți planta. NU o replantați la primire.",
    reviewCount : 2,
    size : "medium",
    stock : 10,
    totalScore : 4.5,
    urlImage1 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FDetail-Hoya-exotica-large_1000x10003.jpg?alt=media&token=8d24be96-c25c-4e5a-a0c8-10e0766847a5",
    urlImage2 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-Hoya-Exotica-small-1_1000x10002jpg.jpg?alt=media&token=9edd338e-426a-410e-98ed-79731e40b269",
    urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FHoya-Exotica-Grow-Pot-Large_1000x1000.png?alt=media&token=a08475b5-b578-480b-9f0c-dfdfc7ab9d7a",
    vining: "yes",
    reviews: [] 
  },
  { 
    key:1,
    airpurifying : "yes",
    botanicalname : "Senecio rowleyanus",
    careinstructions : "Lumina: lumină indirectă\nApa: scăzut până la mediu\nTemperatura: medie\nUmiditate: medie\nAnimale de companie: Nu",
    easycare : "no",
    family : "succulent",
    lowlight : "no",
    name : "String of Pearls",
    petfriendly : "no",
    potsize : 12,
    price : 120,
    productdetail : "Acest Senecio rowleyanus este favoritul iubitorului de plante! Frunzele sferice ale acestui suculent delicat vor adăuga textură colecției tale de plante și îți vor face camera să pară ca și cum ar fi împodobită cu margele agățate. Mai mult, frunzișul său dens împachetat poate produce flori mici care emit un parfum dulce, de scorțișoară, făcând ca această plantă să miroasă la fel de minunat.",
    productspecs : "Senecio Rowleyanus poate fi un pic temperamental, așa că asigurați-vă că găsiți locul perfect și acordați în mod constant acestei plante atenția de care are nevoie. Această plantă agățatoare iubește căldura și lumina indirectă, dar îi plac condițiile mai răcoroase în timpul iernii. Dacă li se oferă condițiile potrivite, aceste vițe suculente se vor răsplăti prin creșterea din ce în ce mai lungă, făcând, în cele din urmă, contactul cu podeaua. Sunt plante cu o durată de viață relativ scurtă, care se propagă ușor.\n\nImportant! Șirurile de perle sunt otrăvitoare dacă sunt ingerate, așa că fiți foarte atenți dacă aveți animale de companie și / sau copii mici.",
    reviewCount : 2,
    size : "medium",
    stock : 5,
    totalScore : 4.5,
    urlImage1: "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-String-of-Pearls-Grow-Extra-Large_1000x10001.jpg?alt=media&token=6bdc5e85-3fa2-4f4d-a1cc-a691826a3250",
    urlImage2: "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FString-of-Pearls_1000x10002.jpg?alt=media&token=0d0cf68b-865e-4683-be5f-be5520fa6cb6",
    urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-String-of-Pearls-1_1000x10003.png?alt=media&token=a63bdd8d-e284-4be1-bafa-5462aee1ed46",
    vining : "yes",
    reviews: []  },
  { 
    key:2,
    airpurifying : "yes",
    botanicalname : "Hoya Waxvine",
    careinstructions : "Lumină: Lumină indirectă\nApă: Scăzută- Medie\nTemperatură: Medie\nUmiditate: Medie\nSigură pentru animale de companie: Da",
    easycare : "no",
    family : "hoya",
    lowlight : "no",
    name : "Hoya Australis",
    petfriendly : "yes",
    potsize : 12,
    price : 50,
    productdetail : "\nAceste frunze lucioase, rotunde, ceroase, doresc cu adevărat să-și găsească drumul în jurul camerei tale. Această plantă de ceară este un cultivator rapid și, în condiții potrivite, va începe să se simtă drept acasă, prinzând totul cu vițele sale curioase. Aceste plante ușoare de îngrijire sunt excelente pentru camerele pline de lumină!",
    productspecs : "Familie: Apocynaceae\n\nDenumire comună: plantă de ceară, floare de ceară, floare de porțelan sau doar Hoya\n\nNume botanic: Wax Vine\n\nFiecare Hoya este selectată manual din seră, ambalată cu atenție și livrată direct la tine! Ocazional plantele se pot mișca în timpul expedierii și pot ajunge cu o parte din solul deplasat. Vă rugăm să eliminați ambalajul cu atenție, să înlocuiți solul deplasat, apa, apoi să scurgeți planta. NU o replantați la primire",
    size : "small",
    stock : 5,
    urlImage1 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FHoya-Australis-Living-1_1000x10001.jpg?alt=media&token=3d3accad-5c1b-4d90-a337-ea323b2f045a",
    urlImage2 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-Hoya-Australis-Small-1_1000x10002.jpg?alt=media&token=a9d00b7e-47c4-4881-a2c8-32cacc5c4520",
    urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FHoya-Australis-Grow-Pot-Long-Small_1000x10003.jpg?alt=media&token=8dfb39f3-8239-495f-ad39-7519ac9a55a9",
    vining : "yes",
    reviewCount : null,
    totalScore : null,
    reviews: []  },
  { 
  key:3,
  airpurifying : "yes",
  botanicalname : "Hoya pubicalyx",
  careinstructions : "Lumină: Lumină indirectă\nApă: Scăzută- Medie\nTemperatură: Medie\nUmiditate: Medie\nSigură pentru animale de companie: Da",
  easycare : "no",
  family : "hoya",
  lowlight : "no",
  name : "Hoya pubicalyx",
  petfriendly : "yes",
  potsize : 12,
  price : 50,
  productdetail : "\nUneori, nuanțele din natură sunt cele mai profunde. Această plantă de interior este modul naturii de a ne aminti să nu renunțăm, deoarece ne străduim să ne atingem obiectivele. Lăsați acestă Hoya să vă inspire în timp ce o urmăriți urcând încet și atașîndu-se de ceea ce este mai aproape, ajungând tot mai sus.",
  productspecs : "Familie: Apocynaceae\n\nDenumire comună: plantă de ceară, floare de ceară, floare de porțelan sau doar Hoya\n\nNume botanic: Wax Vine\n\nFiecare Hoya este selectată manual din seră, ambalată cu atenție și livrată direct la tine! Ocazional plantele se pot mișca în timpul expedierii și pot ajunge cu o parte din solul deplasat. Vă rugăm să eliminați ambalajul cu atenție, să înlocuiți solul deplasat, apa, apoi să scurgeți planta. NU o replantați la primire.",
  size : "small",
  stock : 10,
  urlImage1 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FHoya-Pubicalyx-Living-2_1000x10001.jpg?alt=media&token=0cb33df5-4c4c-4290-a1c2-5675cdeca54c",
  urlImage2 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-hoya-pubicalyx-1_1000x10002.png?alt=media&token=67f22928-1b4a-47be-b4ed-b61b1c03b154",
  urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-hoya-pubicalyx-2_1000x10003.png?alt=media&token=39b306aa-e9ea-4285-9ad2-0b42f2756498",
  vining: "yes",
  reviewCount : null,
  totalScore : null,
  reviews: []  },
  { 
  key:4,
  airpurifying : "yes",
  botanicalname : "Scindapsus pictus 'Silver Satin'",
  careinstructions : "Lumină: scăzută până la lumină indirectă\nApa: mediu\nTemperatura: medie\nUmiditate: medie\nAnimale de companie: Nu",
  easycare: "yes",
  family : "pothos",
  lowlight : "yes",
  name : "Pothos Silver Satin",
  petfriendly : "no",
  potsize : 12,
  price : 35,
  productdetail : "Nu veți dori să acoperiți griul acestei plante! Vă vor plăcea frunzele în formă de inimă din satinul de argint Pothos, care sunt modelate unic cu secțiuni mari de argint în relief. Aceste vițe de argint atârnă cu grație de la o bază cu corp complet și pot fi încurajați să crească până la lungimea dorită.",
  productspecs : "Familie: Araceae\nDenumire comună: Pothos de Aur, Plantă de bani, Ivy Diavolul, Vița Diavolului, Vița de Argint, Vița Taro, Potoșii de Argint\nDenumirea botanică: Scindapsus pictus\n\nDacă ești un începător care iubește plantele frumoase, dar îți este frică de angajament, acest luxuriant cu frunze tropicale pe tot parcursul anului este perfect pentru tine. Frunzele sale în formă de inimă te vor cuceri, fără îndoială, iar plasarea ei în vârful listei cu plante ușor de îngrijit te va face să te îndrăgostești. De asemenea, ajută la curățarea aerului! Există câteva specii diferite care sunt considerate Pothos, Epipremnum și Scindapsus. Aceste vițe de interior au ambele o rezistență incredibilă și o capacitate de a crește acolo unde multe plante de casă nu pot, ca în colțurile mai întunecate ale casei sau biroului tău. Pot fi ghidate să urce șalotele și stâlpii sau pot fi lăsate să se plimbe Peste  marginile meselor, rafturilor și blaturilor. Potoșii nu sunt doar plante ușor de îngrijire, dar frumusețea și harul lor nu trebuie trecute cu vederea.",
  size : "small",
  stock : 10,
  urlImage1 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FPothos-Silver-Satin_1000x10001.jpg?alt=media&token=eb1b3899-93e1-494c-9f22-2bdb5a836e54",
  urlImage2 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2FPothos-Silver-Satin-Large-11_1000x10002.jpg?alt=media&token=6ed33884-8a1a-4bf7-b616-42128e08c0b2",
  urlImage3 : "https://firebasestorage.googleapis.com/v0/b/lucrare-licenta-31977.appspot.com/o/plante%2Fdetail-Pothos-Silver-Satin-2_1000x10003.png?alt=media&token=99a382f4-9dbc-4048-860b-8d94b027e14e",
  vining : "yes",
  reviewCount : null,
  totalScore : null,
  reviews: []  },
];

const productsStub = {
  valueChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of(DummyProductList))
}

const productStub = {
  valueChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of(DummyProduct))
}

const angularFirestoreStub = {
  list: jasmine.createSpy('list').and.returnValue(of(productsStub))
}

fdescribe('ProductService', () => {

  let service: ProductService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({

        imports: [ 
          AngularFireModule.initializeApp(environment.firebase),        
          AngularFireDatabaseModule,
        ],
        providers:[ ProductService, {AngularFireDatabase, useValue: angularFirestoreStub} ]

    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return one product', () => {

      spyOn(service, "getProduct").and.returnValues(of(DummyProduct));

      service.getProduct('').subscribe(product =>{
      expect(product).toEqual(DummyProduct);
      expect(product.length).toEqual(1);
      });         
  });

  it('getNewInProducts should return a list of products', () => {

    //spyOn(service.db, "list").and.returnValue(DummyProductList);

    service.getNewInProducts().subscribe(products=>{
    const results : IProduct[] = products;
    console.warn(results);
    expect(results).toEqual(DummyProductList);
    });

  });

  it('getProductReviews should return a list of product reviews', () => {
    
    spyOn(service, "getProductReviews").and.returnValues(of(DummyReviews));
  
    service.getProductReviews("").subscribe(reviews =>{
      expect(reviews).toEqual(DummyReviews);     
    });
  });

  it('getAllProducts should return a list of products', () => {
    
   // spyOn(service, "getAllProducts").and.returnValues(of(DummyProductList));
    service.getAllProducts().subscribe(products=>{
    
    expect(products).toEqual(DummyProductList);
    });
  });

  
  it('getFilteredProductsByOptionFlag should return a list of products', () => {
    
    let spy = spyOn(service, "getFilteredProductsByOptionFlag").and.returnValues(of(DummyProductList));
    service.getFilteredProductsByOptionFlag("").subscribe(products=>{
      expect(products).toEqual(DummyProductList);
    });
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('getSuggestedProducts should return a list of products', () => {
   
    spyOn(service, "getSuggestedProducts").and.returnValues(of(DummyProductList));

    service.getSuggestedProducts("").subscribe(products=>{
      expect(products).toEqual(DummyProductList);
    });
  });
});

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { Routes, ExtraOptions, RouterModule } from '@angular/router';
import { UsersService } from '../users/users.service';
import { UsersComponent } from '../users/users.component';
import { AngularUiModule } from '../shared/angularmaterial/angular-ui.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const routes: Routes = [
  {path: 'profile', component: UsersComponent },
  {path:'', redirectTo:'welcome', pathMatch:'full'},
];

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [ ReactiveFormsModule,
                  FormsModule,
                  AngularFireAuthModule,
                  AngularFireModule.initializeApp(environment.firebase),
                  RouterModule.forRoot(routes),
                  AngularUiModule
                  ],
      providers: [LoginService, UsersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when initialized', ()=>{
    expect(component.loginForm.valid).toBeFalsy();
  })

  it('email field should be invalid when initialized', () => {
    let email = component.loginForm.controls['email']; 
    expect(email.valid).toBeFalsy(); 
  });

  it('email field should have required validator invalid when initialized', () => {
    let email = component.loginForm.controls['email'];
    expect(email.errors['required']).toBeTruthy(); 
  });

  it('email field shoould have pattern validator invalid when set to an invalid value', () => {
    let email = component.loginForm.controls['email'];
    email.setValue("test");
    expect(email.errors['pattern']).toBeTruthy(); 
    email.setValue("test@yahoo");
    expect(email.errors['pattern']).toBeTruthy(); 
    email.setValue("testyahoo.com");
    expect(email.errors['pattern']).toBeTruthy(); 
    email.setValue("test@yahoo.com");
    let errors = email.errors || {};
    expect(errors['pattern']).toBeFalsy();    
  });

  it('email maxlength validator should be invalid when set to an invalid value', () => {
    let email = component.loginForm.controls['email'];
    email.setValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@yahoo.com");
    expect(email.errors['maxlength']).toBeTruthy(); 

    email.setValue("test@yahoo.com");
    let errors = email.errors || {};
    expect(errors['maxlength']).toBeFalsy();    
  });

  it('form should be invalid when given invalid input', ()=>{
    component.loginForm.controls['email'].setValue("test@yahoo.com");
    component.loginForm.controls['password'].setValue("1234");
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['email'].setValue("testyahoo.com");
    component.loginForm.controls['password'].setValue("1234567");
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['email'].setValue("test@yahoo.com");
    component.loginForm.controls['password'].setValue("1234567");
    expect(component.loginForm.valid).toBeTruthy();
  })

  
  it ('error message should be shown when invalid email input is entered ', ()=>{

    component.ngOnInit();

    component.componentViewLogin = true;
    component.seeLoginValidations = true;

    component.loginForm.controls['password'].setValue("123456667");
    component.loginForm.controls['email'].setValue("lorecardosyahoo.com");
    component.loginForm.get('email').errors.required = false;

    console.warn("email value",component.loginForm.controls['email'].value);
    console.warn("error required value", component.loginForm.controls['email'].hasError('required'));
    console.warn("get error required value ", component.loginForm.get('email').errors.required);
    console.warn("error pattern value", component.loginForm.controls['email'].hasError('pattern'));
    console.warn("error maxlength value", component.loginForm.controls['email'].hasError('maxlength'));
    
    fixture.detectChanges();

     el = fixture.debugElement.query(By.css('#test2'));
   
    //let el2 = document.getElementsByClassName('new');
    //console.warn("el2 = ", el2.length);

    //component.onSubmitLogin(component.loginForm);

    //fixture.detectChanges();
   // console.warn(el);
    //console.warn("el2 = ", el2.length);
    
    //expect(el.nativeElement.textContent.trim()).toBe('Introduceti o adresa de email valida!');
  });
  
});

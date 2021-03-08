import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { RpaShopFormServiceService } from 'src/app/services/rpa-shop-form-service.service';
import { RpaShopValidators } from 'src/app/validators/rpa-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
    private rpaShopFormServiceService: RpaShopFormServiceService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                                [Validators.required, 
                                 Validators.minLength(2), 
                                 RpaShopValidators.notOnlyWhiteSpace]),

        lastName: new FormControl('', 
                                [Validators.required, 
                                Validators.minLength(2),
                                RpaShopValidators.notOnlyWhiteSpace]),

        email: new FormControl('',
                                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });


    // populate credit card months
    // + 1 because the getMonth() method returns the month in the specified date according to local time, as a zero-based
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.rpaShopFormServiceService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.rpaShopFormServiceService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card year: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate countries
    this.rpaShopFormServiceService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )
  }

  // those will be used by html template to get access to the form control and to check the status of the form control to see if it's valid
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

        // bug fix for states
        this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
  }


  onSubmit() {
    console.log("Handling the submit button");

    // check if checkoutFormGroup is invalid
    // if yes, then mark all as touched
    if (this.checkoutFormGroup.invalid){

      // markAllAsTouched - touching all fields triggers the display of the error messages
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is:" + this.checkoutFormGroup.get('customer').value.email);

    console.log("The shipping address country is:" + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is:" + this.checkoutFormGroup.get('shippingAddress').value.state.name);


  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();

    // Read the selected year from the form
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // Check if the selected year is equal with current year
    // then start with the current month
    // else start with first month => 1

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    // Get credit card months
    this.rpaShopFormServiceService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;

    // country name is not required, but use this for debugging purposes
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName } country code: ${countryCode}`);
    console.log(`${formGroupName } country name: ${countryName}`);

    this.rpaShopFormServiceService.getStates(countryCode).subscribe(
      data => {

        // check for which formgroup we're making the assignment
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}

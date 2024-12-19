import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-signin',
  standalone: false,

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  @HostBinding('class') class: string = 'flx--all flx--c';

  signInForm: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {}

  // submit() {
  //   const formData = this.signInForm.value;
  //   this.dataService
  //     .signin({
  //       email: formData.email,
  //       password: formData.password,
  //     })
  //     .subscribe({
  //       next: async (response: any) => {
  //         console.log('Signin successful', response.message);
  //         this.dialogService.open(response.message, 'success');
  //         this.dataService.userSubject.next(response.user);
  //         await this.dataService.loadData();
  //         setTimeout(() => {
  //           this.router.navigate(['/app/dashboard']);
  //         }, 1000);
  //       },
  //       error: (error) => {
  //         console.error('Signin failed', error);
  //         this.dialogService.open('Sign-in failed. Please check your credentials.', 'error');
  //       },
  //     });
  // }
}

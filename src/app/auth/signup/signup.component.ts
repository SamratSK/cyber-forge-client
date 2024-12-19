import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  @HostBinding('class') class: string = 'flx--all flx--c';

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  submit() {}

  //   submit() {
  //     const formData = this.signUpForm.value;
  //     this.dataService
  //       .signup({
  //         id: this.getRandomArbitrary(2, 20),
  //         name: formData.name,
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //         completedCourses: [],
  //         activeCourses: [],
  //         certificates: [],
  //         progress: []
  //       })
  //       .subscribe({
  //         next: async (response: any) => {
  //           console.log('Signup successful', response.message);
  //           this.dialogService.open(response.message, 'success');
  //           setTimeout(() => {
  //             this.router.navigate(['/auth/signin']);
  //           }, 1000);
  //         },
  //         error: (error) => {
  //           console.error('Signup failed', error);
  //           this.dialogService.open('Sign-up failed.', 'error');
  //         },
  //       });
  //   }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, this.cnkEmailValidator]],
      age: [null, [Validators.required, Validators.min(18)]],
      subjects: this.fb.array([]) // FormArray dinámico
    });
  }

  get subjects(): FormArray {
    return this.studentForm.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjects.push(this.fb.control('', Validators.required));
  }

  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }

  cnkEmailValidator(control: any) {
    const value = control.value;
    if (value && !value.endsWith('@cnkcore.edu')) {
      return { cnkEmail: true };
    }
    return null;
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.http.post('http://localhost:3000/students', this.studentForm.value)
        .subscribe({
          next: res => console.log('Guardado en backend:', res),
          error: err => console.error('Error:', err)
        });
    }
  }
}

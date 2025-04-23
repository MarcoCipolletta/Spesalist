import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { iItem, unit } from './../../interfaces/interfaces';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  constructor(private firestoreSvc: FirestoreService) {
    console.log(this.form.valid);
  }
  units = Object.values(unit);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormGroup({
      unit: new FormControl(this.units[0], [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(1)]),
    }),
    checked: new FormControl(false),
  });

  addItem() {
    if (this.form.invalid) return;
    this.firestoreSvc.addItem(this.form.value as Partial<iItem>);
    this.form.reset();
  }
}

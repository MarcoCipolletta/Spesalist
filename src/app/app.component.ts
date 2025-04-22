import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  constructor(private firestoreService: FirestoreService) {}
  title = 'spesaList';
  ngOnInit() {
    // this.firestoreService.addItem({});
  }
}

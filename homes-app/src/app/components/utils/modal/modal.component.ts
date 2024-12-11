import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isModalOpen = false;

  openModal(){
    this.isModalOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeModal(){
    this.isModalOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}

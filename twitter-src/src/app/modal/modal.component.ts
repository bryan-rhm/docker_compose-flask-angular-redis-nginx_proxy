import { Component, OnInit,Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  closeResult: string;
  @Input() title = 'Information';
  @Input() message= '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}

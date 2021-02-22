import { Component, OnInit } from '@angular/core';
import { MessageServicesService } from '../Services/message-services.service';
import { Message } from '../model/message.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  currentMessage : Message;
  name: string;
  closeResult: string;

  constructor( public service: MessageServicesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.route.snapshot.paramMap.get('name'));
    
    this.service.setUser(this.name);
    this.service.refreshList();
  }

  onView(id: number, content) {
    message: Message;
    this.service.getMessage(id)
      .subscribe(
        (resp:any) => {
          this.currentMessage = resp;
          //this.currentMessage.sent = this.currentMessage.sent.slice(0,10);
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

          this.service.refreshList();
        },
        err => { console.log(err) }
      )
    
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.messageId == 0)
      this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.formData = form.value;
    this.service.postMessage().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Message sent successfully', 'User Message');
        this.modalService.dismissAll(); 
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Message();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

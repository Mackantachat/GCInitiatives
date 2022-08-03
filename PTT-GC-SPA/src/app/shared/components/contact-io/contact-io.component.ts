import { Component, OnInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '@services/contact/contact.service';
import { AuthService } from '@services/authentication/auth.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact-io',
  templateUrl: './contact-io.component.html',
  styleUrls: ['./contact-io.component.css']
})
export class ContactIoComponent implements OnInit, OnChanges {

  @ViewChild('CommentText') el: ElementRef;

  @Input() id;

  @Output() modelClose = new EventEmitter();

  constructor(
    private initiativeService: InitiativeService,
    private fb: FormBuilder,
    private authService: AuthService,
    private contactService: ContactService,
    public bsModalRef: BsModalRef
  ) { }

  contact = this.fb.group({ contactIO: '', contactIOBy: '' });

  ngOnInit(): void {
    this.id = this.initiativeService.id;
  }

  ngOnChanges(): void {
    setTimeout(() => this.el.nativeElement.focus(), 200);
  }

  CloseModal() {
    this.contact.patchValue({ contactIO: '', contactIOBy: '' });
    this.bsModalRef.hide();
  }

  Save() {
    this.authService.getMsalUser().subscribe((user) => {
      this.contact.patchValue({ contactIOBy: user.mail });
      this.contactService.ContactIO(this.id, this.contact.value).subscribe(() => { });
      this.bsModalRef.hide();
    });
  }

}

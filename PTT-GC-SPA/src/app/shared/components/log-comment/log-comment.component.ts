import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@services/authentication/auth.service';
import { CommentService } from '@services/comment/comment.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-log-comment',
  templateUrl: './log-comment.component.html',
  styleUrls: ['./log-comment.component.css']
})
export class LogCommentComponent implements OnInit, OnChanges {

  @ViewChild('CommentText') el: ElementRef;

  @Input() id;
  @Input() currentPage;
  @Output() modelClose = new EventEmitter();
  @Output() refresh = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private initiativeService: InitiativeService,
    private commentService: CommentService,
    public bsModalRef: BsModalRef
  ) { }

  comment = this.fb.group({ commentDetail: '', commentBy: '', commentByName: '' });

  params: any = {};

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    setTimeout(() => this.el.nativeElement.focus(), 200);
  }

  CloseModal() {
    this.comment.patchValue({ commentDetail: '' });
    this.bsModalRef.hide();
  }

  Save() {
    this.auth.getUser().subscribe(user => {
      this.params.text = user.username;
      this.initiativeService.GetOwnerEmail(this.params).subscribe(owner => {
        this.comment.patchValue({ commentBy: user.username, commentByName: owner.ownerName });
        this.commentService.LogComment(this.id, this.comment.value).subscribe(() => { });
        this.comment.patchValue({ commentDetail: '', commentBy: null, commentByName: null });
        this.refresh.emit(this.currentPage);
        this.bsModalRef.hide();
      });
    });
  }

}

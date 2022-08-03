import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { InterfaceserviceService } from '@services/interfaceservice/interfaceservice.service';
import { SwalTool } from '@tools/swal.tools';

@Component({
  selector: 'app-initiative-generate-app-wbs',
  templateUrl: './initiative-generate-app-wbs.component.html',
  styleUrls: ['./initiative-generate-app-wbs.component.css']
})
export class InitiativeGenerateAppWbsComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private interfaceService: InterfaceserviceService,
    private swalTool: SwalTool,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  createType: string;

  textToShow: string = '';
  isCreating: boolean = true;
  isCreatedSuccess: boolean = true;
  user;
  register;
  username: string;
  loginForm = this.fb.group({ username: [''], password: [''] });
  initiativeId: number;
  registerForm = this.fb.group({ username: [''], password: [''] });
  async ngOnInit(): Promise<void> {

    await this.CheckLogin().then(resolve => {
      if (resolve != true) {
        this.swalTool.WarningText('Login Failed', 'Please try open link again. ');        
        return;
      }
    },
      reject => {
        this.swalTool.WarningText('Login Failed', 'Please try open link again. ');        
        return;
      }
    );
    // if ( != true) {
    //   this.swalTool.WarningText('Login Failed', 'Please Try Again. ');
    //   return;
    // }

    await this.GetParamValue();

    if (this.createType == "APP") {

      this.swalTool.Loading('Loading', 'Creating ' + this.createType + ' Request ...')
      this.textToShow = 'Creating ' + this.createType + ' Request ...';

      this.interfaceService.CreateRequestAPP_WBS(this.initiativeId, 'SendAppRequest').subscribe(res => {

        if (res == 0) {
          this.swalTool.SuccessText('Success', this.createType + ' Request Was Sent.');
          this.textToShow = this.createType + ' Request Was Sent.';
        } else {
          this.swalTool.SuccessText('Success', this.createType + ' Request Created Successfully. now can close this page.');
          this.textToShow = this.createType + ' Request Created Successfully. now can close this page.'
        }

      }, err => {
        this.swalTool.WarningText('Failed', this.createType + ' Request Created Failed. Please Try Again. ');
        this.textToShow = this.createType + ' Request Created Failed. Please Try Again. '
      });

    } else if (this.createType == "WBS") {

      this.textToShow = 'Validating ' + this.createType + ' Data ...';

      var isValidDataWBS = await this.ValidateWBSData();  // return true/false   //get Id by initiativeCode 15 digits

      if (isValidDataWBS != true) {  // false reponse Error!!!
        this.swalTool.WarningText('Data is not valid', this.createType + ' data is not valid. Please contact Admin.');
        this.textToShow = this.createType + ' data is not valid. Please contact Admin.';
      } else {

        this.swalTool.Loading('Loading', 'Creating ' + this.createType + ' Request ...')
        this.textToShow = 'Creating ' + this.createType + ' Request ...';

        // exec sp IF_WBS, IF_DAT, IF_POC, IF_PLA
        this.interfaceService.CreateRequestAPP_WBS(this.initiativeId, 'SendWbsRequest').subscribe(res => {

          if (res == 0) {
            this.swalTool.SuccessText('Success', this.createType + ' Request Was Sent.');
            this.textToShow = this.createType + ' Request Was Sent.';
          } else {
            this.swalTool.SuccessText('Success', this.createType + ' Request Created Successfully. now can close this page.');
            this.textToShow = this.createType + ' Request Created Successfully. now can close this page.'
          }

        }, err => {
          this.swalTool.WarningText('Failed', this.createType + ' Request Created Failed. Please Try Again. ');
          this.textToShow = this.createType + ' Request Created Failed. Please Try Again. '
        });
      }
    }
  }

  ValidateWBSData(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.interfaceService.ValidateWBSData(this.initiativeId).subscribe(res => {
        resolve(res);
      },
        err => {
          reject(false);
        })
    });
  }

  GetParamValue(): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      this.route.queryParams.subscribe(async params => {
        this.initiativeId = await this.GetInitiativeIdFromCode(params.id);
        this.createType = params.createType; //APP  //WBS
        resolve(true);
      }, err => {
        reject();
      });

    });

  }
  GetInitiativeIdFromCode(initiativeCode: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {

      this.interfaceService.GetInitiativeId(initiativeCode).subscribe(res => {
        resolve(res);
      },
        err => {
          reject(0);
        });
    });
  }

  CheckLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
        this.authService.getMsalUser().subscribe((response) => {
          this.user = response;
          this.authService.UserExists({ username: this.user.mail }).subscribe((result) => {
            if (result) {
              this.loginForm.patchValue({ username: this.user.mail, password: 'password' });
              this.authService.Login(this.loginForm.value).subscribe(() => {
                if (!this.authService.loggedIn()) {
                  resolve(false);
                } else {
                  resolve(true);
                }
              });
            } else {
              this.registerForm.patchValue({ username: this.user.mail, password: 'password' });
              this.authService.Register(this.registerForm.value).subscribe((user) => {
                this.register = user;
                this.loginForm.patchValue({ username: this.register.username, password: 'password' });
                this.authService.Login(this.loginForm.value).subscribe(() => {
                  if (!this.authService.loggedIn()) {
                    resolve(false);
                  } else {
                    resolve(true);
                  }
                });
              });
            }
          });
        }, err=>{
          reject(false);
        });
        
    });

  }
}

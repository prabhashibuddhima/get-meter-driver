import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera/ngx';
import { HTTP } from '@ionic-native/http/ngx';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  imageURI: any;
  imageFileName: any;
  regform: FormGroup;

  constructor(public userService: UserService, public router: Router, public formBuilder: FormBuilder, public alertController: AlertController, private transfer: FileTransfer,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: HTTP) {

    this.regform = formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      religion: ['', Validators.required],
      //country: ['', Validators.required],
      middlename: [''],
      land_phone: [''],
      nic_issue_date: [''],
      permanent_address: [''],
      dob: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      email: ['', Validators.required],
      nic: ['', Validators.required],
      billing_address: ['', Validators.required],
      password: ['', Validators.required],
      //language: ['', Validators.required],
      //ccno: ['', Validators.required],
      //ccv: ['', Validators.required],
      //ccmonth: ['', Validators.required],
      //postcode: ['', Validators.required],
      //promocode: ['', Validators.required]
    });
  }

  ngOnInit() {
  }



  registerform(form) {

    if (this.regform.invalid) {
      console.log(form.value);
      this.presentAlert();

    }
    else {
      this.userService.register(form).then(data => {

        if (data.status === 200) {
          this.successAlert();
          this.router.navigateByUrl('/login');
          form.reset();
        } else {
          this.failureAlert();
        }
      }).catch(err => {
        this.failureAlert();
      });

    }



  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Empty Fields',
      message: 'Enter Required Fields!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Successfully Registered',

      message: 'You have registered to  GET-METER successfully!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async failureAlert() {
    const alert = await this.alertController.create({
      header: 'Registered Unsuccessful',

      message: 'Try Again!!',
      buttons: ['OK']
    });

    await alert.present();
  }
  //profile photo upload
  /*
    getImage() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    
      this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
      }, (err) => {
        console.log(err);
       // this.presentAlert();
      });
    }
  
  
    uploadFile() {
      let loader = this.loadingCtrl.create({
       // content: "Uploading "
      });
      //loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
    
      let options: FileUploadOptions = {
        fileKey: 'ionicfile',
        fileName: 'ionicfile',
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
    
      fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
        .then((data) => {
        console.log(data+" Uploaded Successfully");
        this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
       // loader.dismiss();
        //this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
       // loader.dismiss();
       // this.presentToast(err);
      });
    }
  */
  //until this
}

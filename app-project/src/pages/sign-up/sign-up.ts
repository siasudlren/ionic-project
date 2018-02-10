import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user = {
    email: '',
    username: '',
    password: '',
    gender: 'female',
    city: 'Bei Jing',
    age: ''
  };

  constructor(public toastCtrl:ToastController, public alertCtrl:AlertController, public httpClient: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }

  signUp(): void {
    let url = '/signUp';
    this.httpClient.post(url, {
      user: this.user
    }).subscribe(res => {
      let statues=res['statues'];
      if (statues == 'exist') {
        this.alertCtrl.create({
          title:'Error',
          subTitle:'Email is already exist.',
          buttons:['OK']
        }).present();
      } else if (statues == 'err') {
        this.toastCtrl.create({
          message:'服务器错误',
          duration:1000,
          position:'middle'
        }).present();
      } else {
        this.navCtrl.push('TestPage')
      }
    }, err => {
      console.log(err);
    })
  }
}

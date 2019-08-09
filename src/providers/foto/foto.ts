import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";

class Foto {
  data: any;
}

@Injectable()
export class FotoProvider {
  public fotos: Foto[] = [];

  constructor(
    private camera: Camera,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {}

  loadSaved() {
    this.storage.get("fotos").then(fotos => {
      this.fotos = fotos || [];
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 720,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    let loading = this.presentLoadingDefault();
    loading.present();

    this.camera.getPicture(options).then(
      imageData => {
        this.fotos.unshift({
          data: "data:image/jpeg;base64," + imageData
        });

        this.storage.set("fotos", this.fotos);
        loading.dismiss();
      },
      err => {
        console.log("Camera error:" + err);
        loading.dismiss();
      }
    );
  }

  galleryPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    let loading = this.presentLoadingDefault();
    loading.present();

    this.camera.getPicture(options).then(
      imageData => {
        this.fotos.unshift({
          data: "data:image/jpeg;base64," + imageData
        });

        this.storage.set("fotos", this.fotos);
        loading.dismiss();
      },
      err => {
        console.log("Camera error:" + err);
        loading.dismiss();
      }
    );
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: "Salvando a foto..."
    });

    return loading;
  }
}

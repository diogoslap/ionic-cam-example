import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { FotoProvider } from "../../providers/foto/foto";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public current: any;
  public fotos: any;

  constructor(
    public navCtrl: NavController,
    public fotoService: FotoProvider
  ) {}

  ngOnInit() {
    this.fotoService.loadSaved();
  }
}

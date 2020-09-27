import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-egg[clicksOnEgg][easterEnabled]',
  templateUrl: './egg.component.html',
  styleUrls: ['./egg.component.scss']
})
export class EggComponent implements OnChanges {

  imgSrc: string = "assets/images/egg.png"

  @Input() easterEnabled: boolean = false;

  @Output() clicksOnEgg: EventEmitter<any> = new EventEmitter();

  ngOnChanges(): void {
    this.imgSrc = this.easterEnabled
      ? "assets/images/egg-open.png"
      : "assets/images/egg.png"
  }

  onEggClick() {
    this.clicksOnEgg.emit();
  }

}

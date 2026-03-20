import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import {Arabic} from '../../../../Core/Database/Arabic';
import {CharType, DiacriticType} from "../../../../Core/Models";
import {QuranService} from '../../../../Core/quran.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  Characters = Arabic.Characters();
  CharType = CharType;
  DiacriticType = DiacriticType;

  constructor(private quranService: QuranService) {

  }

  ngOnInit(): void {
    this.quranService.Info();

    console.log(this.Characters);
    // await setTimeout(3000); // 3 sec
    // fetch('./assets/JSON/source.json').then(res => res.json())
    //   .then(console.log); // do something with data
  }
}

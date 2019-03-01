import { Component,Input, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-rate',
  templateUrl: './customer-rate.page.html',
  styleUrls: ['./customer-rate.page.scss'],
})
export class CustomerRatePage implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();


  isRatingOne:boolean;
  isRatingTwo:boolean;
  isRatingThree:boolean;
  isRatingFour:boolean;
  isRatingFive:boolean;
  inputName: string;
  
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.isRatingOne = false;
    this.isRatingTwo = false;
    this.isRatingThree = false;
    this.isRatingFour = false;
    this.isRatingFive = false;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
    if (rating === 1) {
      this.isRatingOne = true;
       
     
    } else if ( rating === 2) {
      this.isRatingTwo = true;
    }else if ( rating === 3) {
      this.isRatingThree = true;
    }else if ( rating === 4) {
      this.isRatingFour = true;
    }else if ( rating === 5) {
      this.isRatingFive = true;
    }
  }
  
  constructor() { }
   
  

}

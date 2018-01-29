import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { constants } from '../common/constants';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Output() fullAddressFromAutoComplete: EventEmitter<any> = new EventEmitter<any>();
  @Input() existingPostalAddress;

  private url = constants.googleApiUrl + constants.API_KEY + constants.googleApiParams;

  constructor() {
  }

  ngOnInit() {
  }

    autoCompleteCallback1(selectedData: any) {
      this.fullAddressFromAutoComplete.emit(selectedData);
    }
}

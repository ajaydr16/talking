import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import { HitApiService } from '../hit-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DownloadService } from '../download.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  firstName:any;
  lastName:any;
  email:any;
  apiData:any;
  dataSource  = [];
  closeResult: string;
  tableColumns  :  string[] = ['firstName','userEmailId','id'];
  constructor(private papa: Papa, private service: HitApiService, private modalService: NgbModal, private downloadSercvice: DownloadService
    ) { }

  ngOnInit() {
    
  }

  open(content, type, modalDimension) {
    this.ConvertCSVtoJSON();
    if (modalDimension === 'sm' && type === 'modal-mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'xl', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', size: 'xl', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ size: 'xl',centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
  manualGenerate(manualKey: NgForm){

    let orderDetails = [{
      firstName: manualKey.value.firstName,
      lastName: manualKey.value.lastName,
      userEmailId: manualKey.value.userEmailId
    }];
    this.apiData=orderDetails;

    this.service.sendkeys(this.apiData).subscribe((data:any) => 
      {
        {
          console.log(data);
          this.dataSource=data;
        };
      }
    );

    manualKey.reset();
    
    
      
    
  }


  ConvertCSVtoJSON() {
    console.log(this.apiData);
    // let csvData = '"Hello","World!"';
    // this.papa.parse(csvData, {
    //   complete: (results) => {
    //     console.log('Parsed  : ', results.data[0][1]);
    //     // console.log(results.data.length);
    //   }
    // });
    // this.service.sendkeys(this.apiData).subscribe((data:any) => {
    //   //console.log(data);
    //   {
    //     // this.message = data;
    //     // this.service.from_api=data;
    //   console.log(data);
  
    // };
    this.service.sendkeys(this.apiData).subscribe((data:any)=>{{
      console.log(data);
      this.dataSource=data;
      //this.downloadFile();
    }});
    
    
  }
  test = [];
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            let orderDetails = {
              first: results.data[i].firstName,
              last: results.data[i].lastName,
              mail: results.data[i].userEmailId
            };
           this.test.push(orderDetails);
          }
          // console.log(this.test);
          this.apiData=results.data;
          console.log('Parsed: k', results.data);
        }
      });
    }
  }
  downloadFile() {
    this.downloadSercvice.downloadFile(this.dataSource, 'doenloadedKeys');
  }

}

import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  


@Component({
    selector: 'mdb-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: []

})

export class HomeComponent implements OnInit {


    ngOnInit() {
    
    }


    public captureScreen()  
    {  
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 50;   
        var pageHeight = 73;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
      
        const contentDataURL = canvas.toDataURL('pdf')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'pdf', 0, position, imgWidth, imgHeight)  
        pdf.save('ProjectReport.pdf'); // Generated PDF   
      });  

      
    }  
    

}
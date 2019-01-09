import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketsService } from '../../services/websocket.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Sales'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor( private httpClient: HttpClient,
               private wsService: WebsocketsService) { }

  ngOnInit() {
    this.listenSocket();
    this.getDataGraphics();
  }

  getDataGraphics () {
    this.httpClient.get('http://localhost:5000/graphic')
      .subscribe( (data: any) => {
        console.log(data);
        this.lineChartData = data.graphic;
      });
  }

  listenSocket(){
    this.wsService.listen( 'change-data' )
      .subscribe( (data: any) => {
        console.log('socket', data);
        this.lineChartData = data;
      });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderOffline } from 'app/model/order.offline';
import { OrderOfflineService } from './order-offline.service';

@Component({
  selector: 'app-order-offline',
  templateUrl: './order-offline.component.html',
  styleUrls: ['./order-offline.component.scss']
})
export class OrderOfflineComponent implements OnInit {

  dataSource: MatTableDataSource<OrderOffline>
  displayedColumns: string[] = ["orderNumber", "amount", "charge", "cash", "options"];
  
  constructor(private orderService: OrderOfflineService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator
  
  ngOnInit(): void {
    this.orderService.orders$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

}

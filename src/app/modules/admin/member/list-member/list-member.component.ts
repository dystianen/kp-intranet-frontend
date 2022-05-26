import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberModel } from 'app/model/member.model';
import { Observable } from 'rxjs';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss']
})
export class ListMemberComponent implements OnInit {

  constructor(private memberService: MemberService) { }

  dataSource = new MatTableDataSource<MemberModel>([])

  displayedColumns: string[] = ['name', 'email','phone'];

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.memberService.members$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}

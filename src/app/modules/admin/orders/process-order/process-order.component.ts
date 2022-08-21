import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OrderModel } from 'app/model/order.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CourierService } from '../../courier/courier.service';
import { Courier } from '../../courier/courier.types';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  order$: Observable<OrderModel>;
  couriers$: Observable<Courier[]>;

  formApp: FormGroup

  alert_title = "";

  @ViewChild('notifAlert') public readonly notifAlert: SwalComponent;

  constructor(private orderService: OrderService, private dialogRef: MatDialogRef<any>, private courierService: CourierService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.order$ = this.orderService.order;
    this.couriers$ = this.courierService.couriers$;

    this.formApp = this.formBuilder.group({
      courierId: '',
      shippingNumber: '',
      notes: '',
    })
  }

  testSwal() {
    this.notifAlert.fire()
  }

  processOrderConfirm() {
    this.notifAlert.close();
  }

  reloadRoute() {
    // const currentUrl = this.router.url;
    // this.router.navigate([currentUrl]);
    // document.location.href = "";
  }

  /**
   * Confirmation Order
   * @param order 
   */
  confirmOrder(order: OrderModel) {
    Swal.fire({
      title: 'Update Order?',
      text: "Status order akan dirubah menjadi  di konfirmasi",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(order.orderNumber, {
          order: {
            orderStatusId: 202
          }
        }).subscribe((res) => {
          if (res.orderStatusId === 201) {
            this.orderService.getOrders(201).subscribe()
            this.dialogRef.close();
            Swal.fire(
              'Berhasil',
              'Order berhasil di update',
              'success'
            )
            this.reloadRoute();
          }

        })
      }
    })
  }

  /**
   * Process Order
   * @param order 
   */
  processOrder(order: OrderModel) {
    Swal.fire({
      title: 'Update Order?',
      text: "Order akan dirubah menjadi Sedang di proses",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(order.orderNumber, {
          order: {
            orderStatusId: 203
          }
        }).subscribe((res) => {
          if (res.orderStatusId === 202) {
            this.orderService.getOrders(202).subscribe()
            this.dialogRef.close();
            Swal.fire(
              'Berhasil',
              'Order berhasil di update',
              'success'
            )
            this.reloadRoute();
          }

        })
      }
    })
  }

  /**
   * Prepare shipping
   * @param order 
   */
  prepareShipping(order: OrderModel) {
    Swal.fire({
      title: 'Update Order?',
      text: "Order Sedang di disiapkan untuk dikirim",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(order.orderNumber, {
          order: {
            orderStatusId: 204
          }
        }).subscribe((res) => {
          if (res.orderStatusId === 203) {
            this.orderService.getOrders(203).subscribe()
            this.dialogRef.close();
            Swal.fire(
              'Berhasil',
              'Order berhasil di update',
              'success'
            )
            this.reloadRoute();
          }

        })
      }
    })
  }

  /**
   * shipping
   * @param order 
   */
  shipping(order: OrderModel, f: NgForm) {
    Swal.fire({
      title: 'Update Order?',
      text: "Kirim pesanan",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(order.orderNumber, {
          order: {
            orderStatusId: 205
          },
          shipping: { ...f.value, shippingStatusId: 202 }
        }).subscribe((res) => {

          if (res.orderStatusId === 204) {
            this.orderService.getOrders(204).subscribe()
            this.dialogRef.close();
            Swal.fire(
              'Berhasil',
              'Order berhasil di update',
              'success'
            )
            this.reloadRoute();
          }

        })
      }
    })
  }

  /**
   * Order selesai
   * @param order 
   */
  orderEnd(order: OrderModel) {
    Swal.fire({
      title: 'Update Order?',
      text: "Order Selesai",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(order.orderNumber, {
          order: {
            orderStatusId: 200
          },
          shipping: {
            shippingStatusId: 200
          }
        }).subscribe((res) => {

          if (res.orderStatusId === 205) {
            this.orderService.getOrders(205).subscribe()
            this.dialogRef.close();
            Swal.fire(
              'Berhasil',
              'Order berhasil di update',
              'success'
            )
            this.reloadRoute();
          }

        })
      }
    })
  }

}

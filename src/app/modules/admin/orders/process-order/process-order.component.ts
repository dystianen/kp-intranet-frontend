import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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


  constructor(private orderService: OrderService, private dialogRef: MatDialogRef<any>, private courierService: CourierService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.order$ = this.orderService.order;
    this.couriers$ = this.courierService.couriers$;

    this.formApp = this.formBuilder.group({
      courierId: '',
      shippingNumber: '',
      notes: '',
    })
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
          this.orderService.getOrders(201).subscribe()
          this.dialogRef.close();
          Swal.fire(
            'Berhasil',
            'Order berhasil di update',
            'success'
          )
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
          this.orderService.getOrders(203).subscribe()
          this.dialogRef.close();
          Swal.fire(
            'Berhasil',
            'Order berhasil di update',
            'success'
          )
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
          this.orderService.getOrders(203).subscribe()
          this.dialogRef.close();
          Swal.fire(
            'Berhasil',
            'Order berhasil di update',
            'success'
          )
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
          this.orderService.getOrders(204).subscribe()
          this.dialogRef.close();
          Swal.fire(
            'Berhasil',
            'Order berhasil di update',
            'success'
          )
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
          shipping:{
            shippingStatusId: 200
          }
        }).subscribe((res) => {
          this.orderService.getOrders(203).subscribe()
          this.dialogRef.close();
          Swal.fire(
            'Berhasil',
            'Order berhasil di update',
            'success'
          )
        })
      }
    })
  }

}

import { Route } from "@angular/router";

export const HistoryRoute: Route[] = [
    {
        path: 'input-stock',
        loadChildren: () => import('./input-stock/input-stock.module').then(m => m.InputStockModule)
    }
]
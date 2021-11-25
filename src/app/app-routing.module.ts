import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { ProductsResolverService } from "./products-resolver.service";
import { StatsComponent } from "./stats/stats.component";

const appRoutes : Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'admin', component: AdminComponent, resolve: [ProductsResolverService]},
    {path: 'home', component: HomeComponent, resolve: [ProductsResolverService]},
    {path: 'stats', component: StatsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillSearchPageComponent } from './skill-search-page/skill-search-page.component';


const routes: Routes = [
    { path: '', component: SkillSearchPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SkillSearchRoutingModule { }         
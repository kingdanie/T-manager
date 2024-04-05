import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { InternallayoutComponent } from './internallayout/internallayout.component';
import { MembersComponent } from './components/members/members.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Set Login as default
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: InternallayoutComponent,
        canActivate: [ /* Auth Guard here */ ],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'tasks', component: KanbanBoardComponent },
          { path: 'members', component: MembersComponent }, // Assuming you have a MembersComponent
          { path: 'settings', component: SettingsComponent } // Assuming you have a SettingsComponent
        ]
      },
];

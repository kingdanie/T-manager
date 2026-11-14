import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { KanbanBoard } from './components/kanban-board/kanban-board';
import { Internallayout } from './internallayout/internallayout';
import { Members } from './components/members/members';
import { Settings } from './components/settings/settings';
import { authGuard } from './auth-guard-guard';
import { loginGuardGuard } from './login-guard-guard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Set Login as default
    { path: 'login', component: Login, canActivate: [ loginGuardGuard ] },
    {
        path: 'dashboard',
        component: Internallayout,
        canActivate: [ authGuard ],
        children: [
          { path: '', component: Dashboard },
          { path: 'tasks', component: KanbanBoard },
          { path: 'members', component: Members }, 
          { path: 'settings', component: Settings } 
        ]
      },
];

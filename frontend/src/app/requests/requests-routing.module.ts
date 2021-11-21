import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { IncidentRequestComponent } from './components/incident-request/incident-request.component';
import { FeedbackRequestComponent } from './components/feedback-request/feedback-request.component';
import { BugRequestComponent } from './components/bug-request/bug-request.component';
import { FeatureRequestComponent } from './components/feature-request/feature-request.component';
import { EmailRequestComponent } from './components/email-request/email-request.component';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';

const routes: Routes = [
  {
    path: routerPaths.requests.incident,
    component: IncidentRequestComponent,
  },
  {
    path: routerPaths.requests.feedback,
    component: FeedbackRequestComponent,
  },
  {
    path: routerPaths.requests.bug,
    component: BugRequestComponent,
  },
  {
    path: routerPaths.requests.feature,
    component: FeatureRequestComponent,
  },
  {
    path: routerPaths.requests.email,
    component: EmailRequestComponent,
  },
  {
    path: routerPaths.requests.view,
    component: ViewRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}

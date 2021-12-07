import { NgModule } from '@angular/core';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestComponent } from './components/request/request.component';
import { IncidentRequestComponent } from './components/incident-request/incident-request.component';
import { FeedbackRequestComponent } from './components/feedback-request/feedback-request.component';
import { BugRequestComponent } from './components/bug-request/bug-request.component';
import { FeatureRequestComponent } from './components/feature-request/feature-request.component';
import { EmailRequestComponent } from './components/email-request/email-request.component';
import { SharedModule } from '../shared/shared.module';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';
import { ViewRequestsTableComponent } from './components/view-requests-table/view-requests-table.component';
import { ViewRequestsBoardComponent } from './components/view-requests-board/view-requests-board.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RequestDialogComponent } from './components/request-dialog/request-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    RequestComponent,
    IncidentRequestComponent,
    FeedbackRequestComponent,
    BugRequestComponent,
    FeatureRequestComponent,
    EmailRequestComponent,
    ViewRequestsComponent,
    ViewRequestsTableComponent,
    ViewRequestsBoardComponent,
    RequestDialogComponent,
  ],
  imports: [
    SharedModule,
    RequestsRoutingModule,
    InputNumberModule,
    CheckboxModule,
    DialogModule,
    FieldsetModule,
    AvatarModule,
    TableModule,
    TabViewModule,
  ],
})
export class RequestsModule {}

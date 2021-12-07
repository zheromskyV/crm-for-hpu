import { NgModule } from '@angular/core';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { StdDatePipe } from './pipes/std-date.pipe';
import { TableCaptionComponent } from './components/table-caption/table-caption.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [PageContainerComponent, StdDatePipe, EllipsisPipe, TableCaptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    PageContainerComponent,
    CalendarModule,
    RatingModule,
    StdDatePipe,
    EllipsisPipe,
    TableCaptionComponent,
  ],
})
export class SharedModule {}

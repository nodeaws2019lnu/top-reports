import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Report } from '../../models/report';
import { ReportsService } from '../../services/reports.service';
import { DropdownOption } from '../../models/dropdown-option';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit  {

  execTime: any;
  periodModes: DropdownOption[];

  registerForm: FormGroup;

  constructor(
    private reportsService: ReportsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report
  ) { 
    if (this.data && this.data.startDate) {
      this.onStartDateChanged(new Date(this.data.startDate));
    }
    
    if (this.data && this.data.execTime) {
      this.data.execTime = this.data.execTime.replace(/:/g, '-');
      const timeParts = this.data.execTime.split('-');
      this.execTime = { hour: +timeParts[0], minute: +timeParts[1], meriden: 'PM', format: 24 };
    } else {
      this.execTime = { hour: 0, minute: 0, meriden: 'PM', format: 24 };
    }
  }
  
  ngOnInit(): void {
    this.periodModes = [
      { value: 'o', description: 'once' },
      { value: 'd', description: 'daily' },
      { value: 'w', description: 'weekly' },
      { value: 'm', description: 'monthly' }
    ]

    this.registerForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      query: [this.data.query, Validators.required],
      startDate: [this.data.startDate, [Validators.required]],
      periodMode: [this.data.periodMode, Validators.required]
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClicked() {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.isEdit()) {
      this.reportsService.edit(this.data).subscribe(result => this.dialogRef.close(result));
    } else {
      this.reportsService.add(this.data).subscribe(result => this.dialogRef.close(result));
    }
  }

  isEdit() : boolean {
    return this.data && this.data.id > 0;
  }

  onExecTimeChanged(event) {
    this.data.execTime = (event.hour || '00') + '-' + (event.minute || '00') + '-00';
  }
  
  onStartDateChanged(d: Date) {
    if (d) {
      const dateString = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      this.data.startDate = dateString;
    } else {
      this.data.startDate = null;
    }
  }
}

import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import { SurveyModule } from "survey-angular-ui";

import { Model } from "survey-core";
import * as surveyModelJson from "./data/survey.json";

import { StylesManager } from 'survey-core';
StylesManager.applyTheme("defaultV2");

// const SURVEY_ID = 1;

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Enter your first name:",
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  }]
};

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,
    SurveyModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <survey [model]="surveyModel"></survey>

  <div><pre>{{surveyModel.data | json}}</pre></div>
  `,
})
export class App {
  name = 'Angular';
  surveyModel!: Model;
  alertResults (sender: { data: any; }) {
    const results = JSON.stringify(sender.data);
    alert(results);
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }
  ngOnInit() {    
    const survey = new Model(surveyModelJson /* surveyJson */);
    survey.onComplete.add(this.alertResults);
    this.surveyModel = survey;
  }
}

bootstrapApplication(App);

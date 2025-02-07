// services/types.ts
export interface StudentInfo {
    name: string;
    age: string;
    academicInfo: string;
    interests: string;
    achievements?: string;
  }
  
  export interface TopicReport {
    title: string;
    content: string;
  }
export interface ReportStatus {
    status: 'Analyzing' | 'Successful' | 'Final Report Successful';
    downloadUrl?: string;
  }


export interface QuestionResponse {

  questionId: string;

  answer: string;

}

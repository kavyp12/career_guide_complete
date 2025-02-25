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


export interface Question {
  id: number;
  text: string;
  options: string[];
  type: 'single' | 'multiple';
}

export interface Subject {
  id: number;
  name: string;
  marksObtained: number;
  totalMarks: number;
}

export interface UserState {
  currentQuestionIndex: number;
  answers: Record<number, string[]>;
  subjects: Subject[];
  name: string;
  reportGenerated: boolean;
  setAnswer: (questionId: number, answer: string[]) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  removeSubject: (id: number) => void;
  setName: (name: string) => void;
  setReportGenerated: (value: boolean) => void;
}
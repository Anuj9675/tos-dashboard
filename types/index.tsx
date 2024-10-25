//types/faq.ts
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

// types/CareerItem.ts

export interface CareerItem {
    jobTitle: string;
    jobDescription: string;
    responsibilities?: string[] | undefined; 
    skillsAndQualifications?: string[] | undefined; 
    employmentType: string;
    experience: string;
    salary: string;
    jobLocation: string;
  }
  
  
  
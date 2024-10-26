
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface CareerItem {
    jobTitle: string;
    jobDescription: string;
    jobCategory: string;
    responsibilities?: string; 
    skillsAndQualifications?: string; 
    employmentType: string;
    experience: string;
    salary: string;
    jobLocation: string;
  }
  

export interface Message {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  export interface JobCategoryItem {
    id: number;
    jobCategory: string;
  }
  
  export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    image?: string; 
}


export interface AboutItem {
  title: string;
  description: string;
  image: string; 
}


  
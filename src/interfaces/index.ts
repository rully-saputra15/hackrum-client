export interface Question {
  id: string;
  title: string;
  description: string;
  type: ProblemType;
  status: string;
  imgUrl: string;
  user: {
    email: string
  };
  answer: string;
  phase: string;
}

export interface ProblemType {
  title: string;
  color: string;
}

export interface CreateQuestionParams{
  title:string;
  description:string;
  problemType: number;
  phase:number;
}

export interface UpdateQuestionParams{
  id:string;
  answer: string,
}


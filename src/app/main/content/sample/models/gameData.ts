export interface GameData{

  description?: string;
  isPublic?: boolean;
  name?: string;
  questions: [
    {
      question: string;
      answers: [
        {
        answer: string;
        isCorrect: boolean;
        }
      ]
    }

  ];
}

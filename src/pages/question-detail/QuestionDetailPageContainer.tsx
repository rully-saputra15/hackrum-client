import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import QuestionDetailPage from "./QuestionDetailPage";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { useQuery } from "react-query";
import api from "../../http";
import { Question } from "../../interfaces";
import Loading from "../../components/Loading";

const QuestionDetailPageContainer = () => {
  const [answer, setAnswer] = useState<EditorState>(EditorState.createEmpty());
  const [question, setQuestion] = useState<Question>({
    id: "",
    title: "",
    description: "",
    type: {
      title: "",
      color: "",
    },
    status: "",
    answer: "",
    user: {
      email: "",
    },
    imgUrl: "",
    phase: "",
  });
  const { id } = useParams();
  const role = Cookies.get("role");
  const navigate = useNavigate();

  const { isLoading } = useQuery(
    "question",
    () => api.getQuestionById(id ?? ""),
    {
      onSuccess: ({ data }) => {
        setQuestion(data.message);
        setAnswer(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(data.message.answer)
            )
          )
        );
      },
    }
  );
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAnswerChange = useCallback((answer: EditorState) => {
    setAnswer(answer);
  }, []);
  if (isLoading) return <Loading />;
  return (
    <QuestionDetailPage
      answer={answer}
      question={question}
      role={role ? role : "student"}
      handleGoBack={handleGoBack}
      handleAnswerChange={handleAnswerChange}
    />
  );
};

export default QuestionDetailPageContainer;

import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import QuestionDetailPage from "./QuestionDetailPage";
import { EditorState, convertToRaw } from "draft-js";
import { useMutation, useQuery } from "react-query";
import api from "../../http";
import { Question } from "../../interfaces";
import Loading from "../../components/Loading";
import draftToHtml from "draftjs-to-html";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

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
      },
      onError: ({ response }) => {
        showErrorToast(response?.data?.message);
      },
    }
  );

  const { mutate: createAnswer } = useMutation(api.answerQuestion, {
    onSuccess: () => {
      showSuccessToast("Answer created successfully!");
    },
    onError: ({ response }) => {
      showErrorToast(response?.data?.message);
    },
  });

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAnswerChange = useCallback((answer: EditorState) => {
    setAnswer(answer);
  }, []);

  const handleSubmitAnswer = useCallback(() => {
    createAnswer({
      id: question.id,
      answer: draftToHtml(convertToRaw(answer.getCurrentContent())),
    });
    setAnswer(EditorState.createEmpty());
    navigate("/dashboard");
  }, [question, answer, navigate]);

  if (isLoading) return <Loading />;
  return (
    <QuestionDetailPage
      answer={answer}
      question={question}
      role={role ? role : "student"}
      handleGoBack={handleGoBack}
      handleAnswerChange={handleAnswerChange}
      handleSubmitAnswer={handleSubmitAnswer}
    />
  );
};

export default QuestionDetailPageContainer;

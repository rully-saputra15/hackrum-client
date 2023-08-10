import { useQuery } from "react-query";
import { useCallback, useState } from "react";
import { Question } from "../../interfaces";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import DashboardPage from "./DashboardPage";
import api from "../../http";

const DashboardPageContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const { isLoading } = useQuery("allQuestions", api.getAll, {
    onSuccess: ({ data }) => {
      setQuestions(data.message);
    },
  });

  const handleNavigateQuestionDetail = useCallback(
    (id: string) => {
      navigate(`/question/${id}`);
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    navigate("/");
    Cookies.remove("access_token");
  }, [navigate]);

  return (
    <DashboardPage
      data={questions}
      isLoading={isLoading}
      handleNavigateQuestionDetail={handleNavigateQuestionDetail}
      handleLogout={handleLogout}
    />
  );
};

export default DashboardPageContainer;

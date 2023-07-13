import { useQuery } from "react-query";
import DashboardPage from "./DashboardPage";
import api from "../../http";
import { useState } from "react";

const DashboardPageContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const { data: _data } = useQuery("allQuestions", api.getAll, {
    onSuccess: ({ data }) => {
      setQuestions(data.message);
    },
  });

  return <DashboardPage data={questions} />;
};

export default DashboardPageContainer;

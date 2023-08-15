import { useMutation, useQuery } from "react-query";
import { useCallback, useState } from "react";
import { CreateQuestionParams, Question } from "../../interfaces";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import DashboardPage from "./DashboardPage";
import api from "../../http";
import Modal from "../../components/Modal";
import { primaryColor, secondaryColor } from "../../styles";
import Input from "../../components/Input";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Select from "../../components/Select";

const DashboardPageContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [filteredPhase, setFilteredPhase] = useState("");

  const navigate = useNavigate();

  const { isLoading, refetch: refetchQuestions } = useQuery(
    "allQuestions",
    api.getAll,
    {
      cacheTime: 0,
      onSuccess: ({ data }) => {
        setQuestions(data.message);
      },
      onError: ({ response }) => {
        if (response.status === 429) {
          showErrorToast(response?.data);
        } else {
          showErrorToast(response?.data?.message);
        }
      },
    }
  );

  const { mutate: createQuestion, isLoading: isLoadingCreateQuestion } =
    useMutation(api.createQuestion, {
      onSuccess: () => {
        handleShowModal();
        refetchQuestions();
        showSuccessToast("Question created successfully!");
      },
      onError: ({ response }) => {
        showErrorToast(response?.data?.message);
      },
    });

  const { data, refetch } = useQuery("types", api.getTypes, {
    enabled: false,
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

  const handleShowModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
    setDescription(EditorState.createEmpty());
    if (!isModalOpen) refetch();
  }, [isModalOpen]);

  const handleDescriptionChange = useCallback((description: EditorState) => {
    setDescription(description);
  }, []);

  const handleSubmitNewQuestion = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        title: { value: string };
        phase: { value: string };
        type: { value: string };
      };

      const newQuestion: CreateQuestionParams = {
        title: target.title.value,
        description: draftToHtml(convertToRaw(description.getCurrentContent())),
        phase: +target.phase.value,
        problemType: +target.type.value,
      };
      createQuestion(newQuestion);
    },
    [description, refetchQuestions]
  );

  const handleFilterQuestions = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      setFilteredPhase(ev.target.value);
    },
    []
  );

  return (
    <>
      {isModalOpen && (
        <Modal handleCloseModal={handleShowModal}>
          <form
            className="flex flex-col justify-start grow gap-3"
            onSubmit={handleSubmitNewQuestion}
          >
            <Input
              label="Title"
              name="title"
              placeholder="Ex: Title"
              required
            />
            <div className="flex flex-row justify-between gap-3">
              <div className="basis-20">
                <Select label="Phase" required>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Select>
              </div>
              <div className="basis-full">
                <Select label="Type" required>
                  {data?.data.message.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.title}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <Editor
              editorState={description}
              onEditorStateChange={handleDescriptionChange}
              wrapperClassName="border border-gray-300 rounded-md p-2 mt-2"
              editorClassName="border border-gray-300 rounded-md p-2"
              toolbarClassName="border border-gray-300 rounded-md p-2"
              toolbar={{
                image: {
                  uploadEnabled: false,
                  alt: {
                    present: false,
                    mandatory: false,
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={isLoadingCreateQuestion}
              className={`inline-flex w-full justify-center rounded-md bg-[${primaryColor}] px-3 py-2 text-sm font-semibold transition-all duration-300 text-white shadow-sm hover:bg-[${secondaryColor}] sm:w-auto grow`}
            >
              {isLoadingCreateQuestion ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </Modal>
      )}
      <DashboardPage
        data={questions}
        isLoading={isLoading}
        filteredPhase={filteredPhase}
        handleNavigateQuestionDetail={handleNavigateQuestionDetail}
        handleLogout={handleLogout}
        handleShowModal={handleShowModal}
        handleFilterQuestions={handleFilterQuestions}
      />
    </>
  );
};

export default DashboardPageContainer;

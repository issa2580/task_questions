import { GlobalContext } from "@/components/GlobalContext";
import { FormTask } from "@/components/Task1/FormTask";
import axios from "axios";
import { format } from "date-fns"; // fix import
import router from "next/router";
import { useContext, useState } from "react";

export default function Home() {
  const [taskData, setTaskData] = useState(null);
  const { formData, setFormData } = useContext(GlobalContext);
  const [name, setName] = useState(formData?.name || "");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [activeStatus, setActiveStatus] = useState(
    formData?.activeStatus || false
  );
  const [editorContent, setEditorContent] = useState("");

  const handleSubmit = async () => {
    try {
      const formattedDate = format(birthdate, "yyyy-MM-dd");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("birthdate", formattedDate);
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }
      formData.append("active_status", activeStatus.toString());
      formData.append("editor_content", editorContent);

      const response = await axios.post(
        "https://tasks.vitasoftsolutions.com/userdata/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      router.push("/tasks");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <FormTask initialData={taskData} onSubmit={handleSubmit} />
    </>
  );
}

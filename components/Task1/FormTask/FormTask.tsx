"use client";

import { GlobalContext } from "@/components/GlobalContext/GlobalContext";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import "../../../styles/Home.module.css";

export interface TaskDataProps {
  id: number;
  name: string;
  birthdate: Date;
  profilePicture: File | null;
  activeStatus: boolean;
  editorContent: string;
}

interface FormTaskProps {
  initialData: TaskDataProps;
  onSubmit: (updatedData: TaskDataProps) => void;
}

const FormTask = ({ initialData, onSubmit }: FormTaskProps) => {
  const { formData, setFormData } = useContext(GlobalContext);
  const [name, setName] = useState(formData?.name || "");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [activeStatus, setActiveStatus] = useState(
    formData?.activeStatus || false
  );
  const [editorContent, setEditorContent] = useState("");

  const router = useRouter();

  const handleDrop = (acceptedFiles: File[]) => {
    setProfilePicture(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    onDrop: handleDrop,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
  };

  const handleDateChange = (date: Date) => {
    setBirthdate(date);
  };

  const handleEditorChange = (event: any) => {
    const newContent = event.editor.getData();
    setEditorContent(newContent);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveStatus(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const formattedDate = format(birthdate || new Date(), "yyyy-MM-dd");
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
    <div className="form-task">
      <div>
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="birthdate">Date de naissance :</label>
        <DatePicker
          id="birthdate"
          name="birthdate"
          dateFormat="MM-dd-yyyy"
          selected={birthdate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="profile-picture">Photo de profil :</label>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>
      <div>
        <label htmlFor="active-status">Statut actif :</label>
        <input
          type="checkbox"
          id="active-status"
          name="active_status"
          onChange={handleCheckboxChange}
          checked={activeStatus}
        />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        {/* <RichTextEditor
          initialData={editorContent}
          onChange={handleEditorChange}
        /> */}
      </div>
      <div>
        <button className="btnStyle" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormTask;

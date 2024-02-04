import React, { createContext, useState } from "react";

interface UserData {
  name: string;
  birthdate: Date;
  phoneNumber: string | null;
  activeStatus: boolean;
  editorContent: string;
}

interface ContextType {
  formData: UserData | null;
  setFormData: (data: UserData | null) => void;
}

const GlobalContext = createContext<ContextType>({
  formData: null,
  setFormData: () => {},
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<UserData | null>({
    name: "",
    birthdate: new Date(),
    phoneNumber: null,
    activeStatus: false,
    editorContent: "",
  });

  return (
    <GlobalContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };

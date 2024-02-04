"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ListTask = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const router = useRouter();

  const displayUsers: JSX.Element[] = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(
      (user: {
        id: number;
        name: string;
        profilePicture: string;
        birthdate: Date;
        joiningDate: Date;
        activeStatus: boolean;
      }) => (
        <div className="card" key={user.id}>
          <div className="userInfo">
            <div className="userImage">
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={100}
                height={100}
              />
            </div>
            <div className="userInfo">
              <p>Nom : {user.name}</p>
              <p>
                Date de naissance :{" "}
                {new Date(user.birthdate).toLocaleDateString("fr-FR")}
              </p>
              <p>
                Date d&apos;adhésion :{" "}
                {new Date(user.joiningDate).toLocaleDateString("fr-FR")}
              </p>
              <p>Statut actif : {user.activeStatus ? "Actif" : "Inactif"}</p>
              <button
                className="updateButton"
                onClick={() => handleUpdate(user.id)}
              >
                Update
              </button>
              <button
                className="deleteButton"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    );

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const handleUpdate = (userId: number) => {
    router.push(`/tasks/edit/${userId}`);
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(
        `https://tasks.vitasoftsolutions.com/userdata/${userId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tasks.vitasoftsolutions.com/userdata"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="cardContainer">{displayUsers}</div>
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous"}
          nextLinkClassName={"next"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default ListTask;

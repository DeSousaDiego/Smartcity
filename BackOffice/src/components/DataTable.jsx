// DataTable.js
import '../stylesheet/backoffice.css'
import {Link} from 'react-router-dom'
import DeleteButton from './DeleteButton'
import ModifyButton from './ModifyButton'
import { Popover, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar';
import { FaLink } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { loadUserData, loadBookData, loadReviewData, loadRoleData, loadActorData, loadCommentData } from '../store/dataBaseLoader';
import { clearActors } from '../store/slice/actorSlice';
import { clearBooks } from '../store/slice/bookSlice';
import { clearReviews } from '../store/slice/reviewSlice';
import { clearRoles } from '../store/slice/roleSlice';
import { clearUsers } from '../store/slice/userSlice';
import { clearComments } from '../store/slice/commentSlice';
import { useDispatch } from 'react-redux';
import { set } from 'zod';

function DataTable() {
  const params = useParams();
  const elementsPerPage = 7;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [headers, setHeaders] = useState([]);
  console.log("params.name: ", params.name);
  const dispatch = useDispatch();
  const [dataRows, setDataRows] = useState([]);
  const users = useSelector(state => state.users);
  const books = useSelector(state => state.books);
  const reviews = useSelector(state => state.reviews);
  const comments = useSelector(state => state.comments);
  const roles = useSelector(state => state.roles);
  const actors = useSelector(state => state.actors);
  console.log("users 1: ", users);
  // const books = useSelector(state => state.books.books);
  // const reviews = useSelector(state => state.reviews.reviews);
  // const roles = useSelector(state => state.roles.roles);
  // const actors = useSelector(state => state.actors.actors);
  const token = useSelector(state => state.auth.token);
  const userHeaders = ['ID', 'USERNAME', 'EMAIL', 'ROLE', 'COUNTRY', 'PHONE', 'NEWSLETTER', 'DELETE', 'MODIFY'];
  const bookHeaders = ['ISBN', 'TITLE', 'DESCRIPTION', 'COUNTRY', 'GENRE', 'YEAR', 'NB PAGES', 'EDITOR', 'IMAGE', 'DELETE', 'MODIFY'];
  const bestBookHeaders = ['ISBN', 'TITLE', 'DESCRIPTION', 'COUNTRY', 'GENRE', 'YEAR', 'NB PAGES', 'EDITOR', 'IMAGE'];
  const reviewHeaders = ['ID', 'RATING', 'TITLE', 'CONTENT', 'LIKES', 'COMMENTS', 'USER', 'BOOK', 'DELETE', 'MODIFY'];
  const roleHeaders = ['BOOK ISBN', 'NAME', 'TITLE'];
  const actorHeaders = ['ID', 'NAME'];
  const commentHeaders = ['ID', 'CONTENT', 'LIKES', 'USER', 'DELETE', 'MODIFY'];


  useEffect(() => {
    console.log("useEffect A");
    const loadData = async () => {
      switch (params.name) {
        case 'users':
          await loadUserData(dispatch, token);
          break;
        case 'books':
          await loadBookData(dispatch, token);
          break;
        case 'comments':
          await loadCommentData(dispatch, params.id, token);
          break;
        case 'reviews':
          console.log("loadReviewData");
          await loadReviewData(dispatch, token);
          break;
        case 'roles':
          await loadRoleData(dispatch, token);
          break;
        case 'actors':
          await loadActorData(dispatch, token);
          break;
        default:
          break;
      }
    };
    loadData();
    console.log("useEffect");
    setPage(1);
  }, [params.name, users.status, books.status, reviews.status, comments.status, roles.status, actors.status]);

  useEffect(() => {
    console.log("useEffect B");
    switch (params.name) {
      case 'users':
        console.log("users");
        setHeaders(userHeaders);
        setDataRows(users.users);
        console.log("User set: ", users.users);
        break;
      case 'books':
        setHeaders(bookHeaders);
        setDataRows(books.books);
        break;
      case 'comments':
        setHeaders(commentHeaders);
        setDataRows(comments.comments);
        break;
      case 'reviews':
        setHeaders(reviewHeaders);
        setDataRows(reviews.reviews);
        console.log("Reviews set: ", reviews.reviews);

        break;
      case 'roles':
        setHeaders(roleHeaders);
        setDataRows(roles.roles);
        break;
      case 'actors':
        setHeaders(actorHeaders);
        setDataRows(actors.actors);
        break;
      default:
        setDataRows([]);
        break;
    }
  }, [params.name, users.users, books.books, reviews.reviews, comments.comments, roles.roles, actors.actors]);

//   switch (params.name) {
//     case 'users':
//       setHeaders(userHeaders);
//       setDataRows(users.users);
//       break;
//     case 'books':
//       setHeaders(bookHeaders);
//       setDataRows(books.books);
//       break;
//     case 'comments':
//       break;
//     case 'reviews':
//       setDataRows(reviews.reviews);
//       break;
//     case 'roles':
//       setDataRows(roles.roles);
//       break;
//     case 'actors':
//       setDataRows(actors.actors);
//       break;
//     default:
//       setDataRows([]);
//       break;
//   }

// useEffect(() => {
//   switch (params.name) {
//     case 'users':
//       loadUserData(dispatch, token);
//       clearBooks();
//       clearReviews();
//       clearRoles();
//       clearActors();
//       setDataRows(users.users);
//       console.log("DataRows: ", dataRows);
//       console.log("books", books);
//       console.log("users 2: ", users);
//       break;
//     case 'books':
//       loadBookData(dispatch, token);
//       clearUsers();
//       clearUsers();
//       clearReviews();
//       clearRoles();
//       setDataRows(books.books);
//       break;
//     case 'comments':
//       break;
//     case 'reviews':
//       loadReviewData(dispatch, token);
//       clearUsers();
//       clearBooks();
//       clearRoles();
//       clearActors();
//       setDataRows(reviews.reviews);
//       break;
//     case 'roles':
//       loadRoleData(dispatch, token);
//       clearUsers();
//       clearBooks();
//       clearReviews();
//       clearActors();
//       setDataRows(roles.roles);
//       break;
//     case 'actors':
//       loadActorData(dispatch, token);
//       clearUsers();
//       clearBooks();
//       clearReviews();
//       clearRoles();
//       setDataRows(actors.actors);
//       break;
//     default:
//       console.log("default");
//       setDataRows([]);
//       break;
//   }
//   setPage(1);
// }, [params.name, users.status, books.status, reviews.status, roles.status, actors.status]);

console.log("dataRows: ", dataRows);

  const handleSearch = (term) => {
    setSearchTerm(term ? term : "");
    setPage(1);
  };


  const filteredRows = dataRows.filter((row) => {
    return row.some((cell) => {
      return cell.content.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  console.log("filteredRows: ", filteredRows);

  const totalPages = Math.ceil(filteredRows.length / elementsPerPage);
  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = page * elementsPerPage;
  const rowsPerPage = filteredRows.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className='tableContainer'>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <table className="dataTable">
          <thead>
            <tr>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {rowsPerPage.map((dataRow) => (
              <tr key={dataRow[0].content}>
                {dataRow.map((dr, index) => (
                  <td key={index}>
                    {dr.type === "text" ? (
                      dr.content
                    ) : dr.type === "deleteButton" ? (
                      <DeleteButton id={dataRow[0].content} />
                    ) : dr.type === "modifyButton" ? (
                      <ModifyButton id={dataRow[0].content} />
                    ) : dr.type === "infosButton" ? (
                      <>
                        <Popover content={dr.content} trigger="click">
                          <Button>
                            <FaCommentAlt />
                          </Button>
                        </Popover>
                      </>
                    ) : dr.type === "commentsButton" ? (
                      <Link to={'/comments/add/' + dataRow[0].content} ><FaLink /></Link>
                    ) : dr.type === "image" ? (
                      dr.content ? 
                        dr.content : 
                          "none" 
                    ) : dr.type === "boolean" ? (
                      dr.content ? (
                      <FaRegCheckCircle />
                    ) : (
                      <FaRegCircle />
                    )) : <></>
                  }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} currentPage={page} goToPage={goToPage} />
      </div>
    </>
  );
}

export default DataTable;

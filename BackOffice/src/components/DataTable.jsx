// DataTable.jss
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadUserData, loadBookData, loadReviewData, loadRoleData, loadActorData, loadCommentData, loadBestBookData } from '../store/dataBaseLoader';
import TableRow from './TableRow'

function DataTable() {
  const params = useParams();
  const elementsPerPage = 7;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [headers, setHeaders] = useState([]);
  const dispatch = useDispatch();
  const [dataRows, setDataRows] = useState([]);
  const users = useSelector(state => state.users);
  const books = useSelector(state => state.books);
  const reviews = useSelector(state => state.reviews);
  const comments = useSelector(state => state.comments);
  const roles = useSelector(state => state.roles);
  const actors = useSelector(state => state.actors);
  const token = useSelector(state => state.auth.token);
  const userHeaders = ['ID', 'NOM D\'UTILISATEUR', 'EMAIL', 'RÔLE', 'PAYS', 'TÉLÉPHONE', 'NEWSLETTER', 'IMAGE', 'MODIFIER', 'SUPPRIMER'];
  const bookHeaders = ['ISBN', 'TITRE', 'AUTEUR', 'ILLUSTRATEUR', 'ÉVALUATION', 'DESCRIPTION', 'PAYS', 'GENRE', 'ANNÉE', 'PAGES', 'ÉDITEUR', 'IMAGE'];
  const reviewHeaders = ['ID', 'ÉVALUATION', 'TITRE', 'CONTENU', 'J\'AIME', 'COMMENTAIRES', 'UTILISATEUR', 'LIVRE', 'MODIFIER', 'SUPPRIMER'];
  const roleHeaders = ['ID', 'LIVRE', 'NOM', 'TITRE'];
  const actorHeaders = ['ID', 'NOM'];
  const commentHeaders = ['ID', 'CONTENU', 'RATIO', 'UTILISATEUR', 'MODIFIER', 'SUPPRIMER'];  


  useEffect(() => {
    const loadData = async () => {
      switch (params.name) {
        case 'users':
          await loadUserData(dispatch, token);
          break;
        case 'books':
          await loadBookData(dispatch, token);
          break;
        case 'comments':
          await loadCommentData(dispatch, (params.type === "add" ? 
          parseInt(params.id) : parseInt(params.review_id)) , token);
          break;
        case 'reviews':
          await loadReviewData(dispatch, token);
          break;
        case 'roles':
          await loadRoleData(dispatch, token);
          break;
        case 'actors':
          await loadActorData(dispatch, token);
          break;
          case 'best':
            await loadBestBookData(dispatch, token);
            break;
        default:
          break;
      }
    };
    loadData();
    setPage(1);
  }, [params.name, users.status, books.status, reviews.status, comments.status, roles.status, actors.status]);

  useEffect(() => {
    switch (params.name) {
      case 'users':
        setHeaders(userHeaders);
        setDataRows(users.users);
        break;
      case 'books':
        setHeaders([...bookHeaders, 'MODIFY','DELETE']);
        setDataRows(books.books);
        break;
      case 'comments':
        setHeaders(commentHeaders);
        setDataRows(comments.comments);
        break;
      case 'reviews':
        setHeaders(reviewHeaders);
        setDataRows(reviews.reviews);

        break;
      case 'roles':
        setHeaders(roleHeaders);
        setDataRows(roles.roles);
        break;
      case 'actors':
        setHeaders(actorHeaders);
        setDataRows(actors.actors);
        break;
      case 'best':
        setHeaders(bookHeaders);
        setDataRows(books.books);
        break;
      default:
        setDataRows([]);
        break;
    }
  }, [params.name, users.users, books.books, reviews.reviews, comments.comments, roles.roles, actors.actors]);

  const handleSearch = (term) => {
    setSearchTerm(term ? term : "");
    setPage(1);
  };


  const filteredRows = dataRows.filter((row) => {
    return row.some((cell) => {
      return cell.content.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });


  const totalPages = Math.ceil(filteredRows.length / elementsPerPage);
  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = page * elementsPerPage;
  const rowsPerPage = filteredRows.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {rowsPerPage.length > 0 && (
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
                <TableRow dataRow={dataRow} />
              ))}
            </tbody>
          </table>
          <Pagination totalPages={totalPages} currentPage={page} goToPage={goToPage} />
        </div>
      )}
    </>
  );
}

export default DataTable;
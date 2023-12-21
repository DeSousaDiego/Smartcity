// TableRow.js
import React from 'react';
import { Button, Popover } from 'antd';
import { FaCommentAlt, FaLink, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import DeleteButton from './DeleteButton';
import ModifyButton from './ModifyButton';
import { Link } from 'react-router-dom';

function TableRow({ dataRow }) {
  return (
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
            <Link to={'/v1.0.0/comments/add/' + dataRow[0].content}><FaLink /></Link>
          ) : dr.type === "image" ? (
            dr.content ?
              dr.content :
              null
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
  );
}

export default TableRow;

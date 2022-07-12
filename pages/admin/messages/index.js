import React from 'react';
import Backend from '@/components/admin/Backend';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import { adminMenu } from '@/data/adminMenu';
import { getShortDate } from '@/utils/date-helpers';
import { filterMessages } from '@/utils/filters';

const Messages = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/contacts'}
      pageName="Message"
      DataComponent={MessagesRowList}
      PageIcon={adminMenu['Messages']}
      sort="createdAt:desc"
      filterFields={filterMessages}
    />
  </Backend>
);

export default Messages;

export const MessagesRowList = ({ results, offset, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th colSpan="6">From the Contact us Form</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <MessagesSingleRow
                  key={index}
                  query={query}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const MessagesSingleRow = ({
  number,
  name,
  email,
  phone,
  subject,
  message,
  createdAt,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {name}
        <span>{email}</span>
      </td>
      <td>{phone}</td>
      <td className="td-block">
        {subject}
        <span>{message}</span>
      </td>
      <td>{getShortDate(createdAt)}</td>
    </tr>
  );
};

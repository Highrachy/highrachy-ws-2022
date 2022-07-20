import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';
import { LocalImage } from '@/components/common/Image';
import ProcessButton from '@/components/utils/ProcessButton';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';

const Teams = () => {
  return (
    <Backend>
      <PaginatedContent
        addNewUrl={'/admin/team/new'}
        endpoint={'api/teams'}
        pageName="Team"
        DataComponent={TeamsRowList}
        PageIcon={adminMenu['Team']}
        sort="priority:desc"
      />
    </Backend>
  );
};

const TeamsRowList = ({ results, offset, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Position</th>
                <th className="text-center">Priority</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <TeamsSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                  query={query}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const TeamsSingleRow = ({
  number,
  fullName,
  position,
  priority,
  publish,
  image,
  id,
  query,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={image}
          name={`${fullName}-${number}`}
          className="img-md2 me-2"
          rounded
        />
        {fullName}
      </td>
      <td>
        <strong>{position}</strong>
      </td>
      <td className="text-center">
        <strong className="badge bg-dark rounded">{priority}</strong>
      </td>
      <td className="text-center">
        <span className={`text-${publish ? 'success' : 'secondary'}`}>
          {publish ? <RiCheckboxCircleFill /> : <RiCloseCircleFill />}
        </span>
      </td>
      <td>
        {priority < 20 && (
          <ProcessButton
            afterSuccess={() => query.mutate()}
            api={`teams/${id}`}
            buttonClassName="me-3 btn-outline-info"
            buttonColor="none"
            buttonText="Increase Priority"
            buttonSizeClassName="btn-xs"
            data={{ priority: priority + 1 }}
            modalContent={`Are you sure you want to increase ${fullName}'s priority?`}
            modalTitle={`Increase ${fullName}'s Priority`}
            successMessage={`${fullName}'s priority has been increased`}
          >
            <BsCaretUpFill />
          </ProcessButton>
        )}
        {priority > 0 && (
          <ProcessButton
            afterSuccess={() => query.mutate()}
            api={`teams/${id}`}
            buttonClassName="me-3 btn-outline-warning"
            buttonColor="none"
            buttonText="Decrease Priority"
            buttonSizeClassName="btn-xs"
            data={{ priority: priority - 1 }}
            modalContent={`Are you sure you want to decrease ${fullName}'s priority?`}
            modalTitle={`Decrease ${fullName}'s Priority`}
            successMessage={`${fullName}'s priority has been decreased`}
          >
            <BsCaretDownFill />
          </ProcessButton>
        )}
        <Button
          color="none"
          className="btn-xs btn-outline-dark me-3"
          href={{
            pathname: '/admin/team/new',
            query: { id, action: 'edit' },
          }}
        >
          <FaUserEdit />
        </Button>
        <ProcessButton
          afterSuccess={() => query.mutate()}
          api={`teams/${id}`}
          buttonColor="none"
          buttonClassName={`${
            publish ? 'btn-outline-danger' : 'btn-outline-success'
          } me-3`}
          buttonSizeClassName="btn-xs btn-outline-success"
          buttonText={publish ? 'Unpublish Team Member' : 'Publish Team Member'}
          data={{ publish: !publish }}
          modalContent={`Are you sure you want to ${
            publish ? `unpublish` : 'publish'
          } ${fullName}'s information on the website?`}
          modalTitle={`${publish ? 'Unpublish' : 'Publish'}  Application`}
          successMessage={`${fullName}'s information has been ${
            !publish ? `published` : 'unpublished'
          } on the website`}
        >
          {publish ? <MdVisibilityOff /> : <MdVisibility />}
        </ProcessButton>
      </td>
    </tr>
  );
};

export default Teams;

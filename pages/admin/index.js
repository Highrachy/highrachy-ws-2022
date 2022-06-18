import Sidebar from '@/components/admin/Sidebar';
import Button from '@/components/forms/Button';
import Overlay from '@/components/common/Overlay';
import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { FiSettings, FiYoutube } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

const Dashboard = () => (
  <Container>
    <PaginatedContent
      addNewUrl="/admin/badges/new"
      endpoint="jobs"
      pageName="Badge"
      pluralPageName="Badges"
      DataComponent={BadgesRowList}
      PageIcon={<FiYoutube />}
    />
  </Container>
);

const BadgesRowList = ({ results, offset }) => {
  console.log('resussss', results);
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <BadgesRow
                  key={index}
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

const BadgesRow = ({ number, title }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
    </tr>
  );
};

const Container = ({ children }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;

  const [isFolded, setIsFolded] = React.useState(!isDesktop);

  React.useEffect(() => {
    setIsFolded(!isDesktop);
  }, [isDesktop]);

  return (
    <section className="admin-container">
      {!isDesktop && !isFolded && <Overlay />}
      <Sidebar
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
      />
      <Content
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
      >
        {children}
      </Content>
    </section>
  );
};

const Content = ({ isFolded, setIsFolded, isDesktop, children }) => (
  <div className={`content-wrapper ${isFolded ? 'content-folded' : ''}`}>
    {!isDesktop && <Button onClick={() => setIsFolded(!isFolded)}>Menu</Button>}
    {children}
  </div>
);

export default Dashboard;

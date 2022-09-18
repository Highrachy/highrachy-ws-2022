import React from 'react';
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';
import { getDate, getMonthYear } from '@/utils/date-helpers';
import Humanize from 'humanize-plus';
const tenantTestData = {
  dependantName1: 'Haruna Popoola',
  dependantAge1: '19',
  dependantRelationship1: 'Dependant',
  dependantOccupation1: 'None',
  dependantIdentification1: '',
  dependantName2: 'Oladayo Popoola',
  dependantAge2: '1',
  dependantRelationship2: 'Brother',
  dependantOccupation2: '',
  dependantIdentification2: '',
  dependantName3: '',
  dependantAge3: '',
  dependantRelationship3: '',
  dependantOccupation3: '',
  dependantIdentification3: '',
  dependantName4: 'Aremu Popoola',
  dependantAge4: '8',
  dependantRelationship4: 'Brother',
  dependantOccupation4: '',
  dependantIdentification4: '',
  dependantName5: '',
  dependantAge5: '',
  dependantRelationship5: '',
  dependantOccupation5: '',
  dependantIdentification5: '',
};

const TenantPDFDocument = ({ tenant, showPreview }) => {
  const Doc = <TenantInfoDocument tenant={tenant} />;

  return (
    <>
      {showPreview && (
        <PDFViewer width="500" height="800">
          {Doc}
        </PDFViewer>
      )}
      <PDFDownloadLink
        document={Doc}
        fileName={`${tenant.firstName}-${tenant.lastName}-information.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <div className="btn btn-secondary btn-wide mt-5">
            {loading ? 'Loading document...' : 'Download as PDF'}
          </div>
        )}
      </PDFDownloadLink>
    </>
  );
};

export default TenantPDFDocument;

const TenantInfoDocument = ({ tenant }) => (
  <Document>
    <Page style={styles.body}>
      <Image alt="" style={styles.logo} src="/logo.png" fixed />
      <Text style={styles.header}>
        The content of this document is confidential, privileged and only for
        the information of the intended recipient. It is strictly forbidden to
        use or share any part of this message with any third party. If you
        received this message by mistake, kindly contact us and follow with its
        deletion, so that we can ensure such a mistake does not occur in the
        future.
      </Text>
      <Image
        alt=""
        style={styles.image}
        src={`https://images.weserv.nl/?url=${tenant.tenantProfileImage}`}
      />
      <TenantInformation tenant={tenant} />
      <View style={{ display: 'flex', flexDirection: 'row' }} fixed>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            ` ~ Tenant Information ${pageNumber} / ${totalPages} ~`
          }
        />
      </View>
    </Page>
  </Document>
);

const TenantInformation = ({ tenant }) => (
  <Table>
    <TableRow label="Tenant Full Name">
      {tenant.title} {tenant.firstName} {tenant.middleName} {tenant.lastName}
    </TableRow>
    <TableRow label="Current Address">{tenant.currentAddress}</TableRow>
    <TableRow label="State of Origin">{tenant.stateOfOrigin}</TableRow>
    <TableRow label="Marital Status">{tenant.maritalStatus}</TableRow>
    <TableRow label="Date of Birth">
      {getDate(tenant.dateOfBirth?.date || tenant.dateOfBirth)}
    </TableRow>
    <TableRow label="Previous Employment">{tenant.previousEmployment}</TableRow>
    <TableRow label="Company Name">{tenant.employmentCompanyName}</TableRow>
    <TableRow label="Position">
      {tenant.employmentPositionTitle} - {tenant.employmentContractType}
    </TableRow>
    <TableRow label="Start Date">
      {getMonthYear(
        tenant.employmentStartDate?.date || tenant.employmentStartDate
      )}
    </TableRow>
    <TableRow label="Company Address">{tenant.employmentAddress}</TableRow>
    <DependantInfoRow tenant={tenant} />
  </Table>
);

const DependantInfoRow = ({ tenant }) => {
  const dependantArray = Array.from(Array(5).keys());
  return dependantArray.map((dependant, index) => {
    const dependantName = tenant[`dependantName${index + 1}`];
    const dependantAge = tenant[`dependantAge${index + 1}`];
    if (dependantName && dependantAge) {
      return (
        <TableRow label={`Dependant ${index + 1}`}>
          {dependantName} - {dependantAge}{' '}
          {Humanize.pluralize(dependantAge, 'year')} old
        </TableRow>
      );
    }
  });
};

const Table = ({ children }) => <View style={styles.table}>{children}</View>;
const TableRow = ({ label, children }) => (
  <View style={styles.row} wrap={true}>
    <Text style={styles.tableLabelColumn}>{label}:</Text>
    <Text style={styles.tableValueColumn}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 35,
  },
  header: {
    marginBottom: 5,
    color: '#666',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  logo: {
    marginVertical: 5,
    width: 85,
    height: 25,
    marginBottom: 15,
  },

  image: {
    marginVertical: 10,
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    border: '5px solid #ddd',
    objectFit: 'cover',
  },

  pageNumber: {
    marginTop: 15,
    fontSize: 9,
    width: '100%',
    color: '#aaa',
    textAlign: 'center',
  },

  table: {
    width: '100%',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 15,
    paddingBottom: 15,
  },

  tableHeader: {
    borderTop: 'none',
  },

  tableLabelColumn: {
    width: '40%',
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableValueColumn: {
    width: '60%',
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },
});

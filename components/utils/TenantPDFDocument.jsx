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
      <Text style={styles.header} fixed>
        ~ Tenant Information ~
      </Text>

      <Image
        alt=""
        style={styles.image}
        src={`https://images.weserv.nl/?url=${tenant.tenantProfileImage}`}
      />
      <TenantInformation tenant={tenant} />

      <Image alt="" style={styles.logo} src="/logo.png" />
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
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
  </Table>
);

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
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 24,
    margin: 12,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },

  logo: {
    marginVertical: 5,
    width: 85,
    height: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 20,
    paddingBottom: 20,
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
  },
});

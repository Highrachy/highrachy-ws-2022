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
import {
  emergencyInfo,
  employmentInfo,
  landlordInfo,
  personalInformation,
} from 'pages/admin/tenants/[id]';
import { camelToSentence, processData } from '@/utils/helpers';

const TenantFullPDFDocument = ({ tenant, showPreview }) => {
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
        fileName={`${tenant.firstName}-${tenant.lastName}-internal-info.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <div className="btn btn-danger btn-wide ms-5 mt-5">
            {loading ? 'Loading document...' : 'Download Full (Internal)'}
          </div>
        )}
      </PDFDownloadLink>
    </>
  );
};

export default TenantFullPDFDocument;

const TenantInfoDocument = ({ tenant }) => (
  <Document>
    <Page style={styles.body}>
      <Image alt="" style={styles.logo} src="/logo.png" fixed />
      <Text style={styles.header}>
        ~ Confidential - Internal Use Only; Do not share with external parties ~
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

const TenantInformation = ({ tenant }) => {
  const data = [
    ...personalInformation,
    ...emergencyInfo,
    ...landlordInfo,
    ...employmentInfo,
  ];
  return (
    <Table>
      <TableRow label="Tenant Full Name">
        {tenant.title} {tenant.firstName} {tenant.middleName} {tenant.lastName}
      </TableRow>
      {data.map((item, index) => (
        <TableRow key={index} label={camelToSentence(item)}>
          {processData(tenant[item])}
        </TableRow>
      ))}
      <DependantInfoRow tenant={tenant} />
    </Table>
  );
};

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
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 15,
    color: '#555',
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.4,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 4,
  },

  logo: {
    marginVertical: 5,
    width: 85,
    height: 25,
    marginBottom: 15,
  },

  image: {
    marginVertical: 10,
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    border: '5px solid #ddd',
    objectFit: 'cover',
    objectPosition: 'top',
  },

  pageNumber: {
    marginTop: 15,
    fontSize: 9,
    width: '100%',
    color: '#bbb',
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
    fontSize: 10,
  },

  tableValueColumn: {
    width: '60%',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
});

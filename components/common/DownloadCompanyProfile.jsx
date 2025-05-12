import React from 'react';
import Button from '../forms/Button';

const DownloadCompanyProfile = () => {
  return (
    <Button
      color="primary"
      href="assets/pdf/highrachy-company-profile.pdf"
      className="mb-6 mt-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download our Profile
    </Button>
  );
};

export default DownloadCompanyProfile;

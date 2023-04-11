/* eslint-disable @next/next/no-img-element */
import Backend from '@/components/admin/Backend';
import React from 'react';

const steps = [
  'Open your Gmail account and click on the gear icon in the top right corner.',
  'Click on `See All Settings`.',
  'Scroll down to the Signature section and Click on `Create New`.',
  'Enter a name for your signature, for example, `My Signature`',
  <>
    Copy the current version of our signature line the official source.{' '}
    <a
      href="https://highrachy.github.io/signature-line/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Click here
    </a>
  </>,
  'Edit and enter your own contact information - name, email, department, phone number.',
  'Update your `Signature defaults` dropdown field to the new signature line.',
  'Scroll down to the bottom of the page and click on the`Save Changes` button.',
];

const CreateSignature = () => {
  return (
    <Backend>
      <h4 className="mb-3">Creating a Signature Line</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p>To create a signature line, follow the steps below:</p>
            <ol>
              {steps.map((step, index) => (
                <Step key={index} image={index + 1}>
                  {step}
                </Step>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Backend>
  );
};

const Step = ({ image, children }) => (
  <li className="mb-5">
    {children}
    {image && (
      <>
        <br />
        <img
          src={`/assets/img/scribes/create-signature/${image}.png`}
          alt="1"
          className="img-fluid"
        />
      </>
    )}
  </li>
);

export default CreateSignature;

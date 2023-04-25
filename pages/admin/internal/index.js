import React from 'react';
import Backend from '@/components/admin/Backend';
import { Accordion } from 'react-bootstrap';
import Link from 'next/link';
import CreateSignature from './create-signature';

const Internal = () => {
  return (
    <Backend>
      <h4 className="mb-3">Internal Resources</h4>
      <InternalAccordion />
    </Backend>
  );
};

const content = [
  {
    header: 'Onboarding Documents',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1hSIlkrd-zLzOm7X0IdbMHsLQFgjqzolvlR0tGyacRws"
            rel="noopener noreferrer"
          >
            Onboarding Checklist
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1u7-q8WFAlawiCydIh-Jr4subte4NwuHRS98JGBnEP3Q/edit#heading=h.pu6bmdcz1d6o"
            rel="noopener noreferrer"
          >
            Laptop Handling Policy
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1s9opfwXrN5dyL-F7-VqH4JxFp3bMGSqmvnZ5UujYLiU/edit?pli=1#heading=h.pdd8wt8ls9ve"
            rel="noopener noreferrer"
          >
            Laptop and Policy Acceptance Form
          </a>
        </li>
      </ul>
    ),
  },
  {
    header: 'Managing your Highrachy Email Signature Line',
    content: (
      <ul>
        <li>
          <Link href="/admin/internal/create-signature">
            Creating and managing your Highrachy Signature Line
          </Link>
        </li>
        <li>
          <a
            target="_blank"
            href="https://highrachy.github.io/signature-line"
            rel="noopener noreferrer"
          >
            Current Signature Line
          </a>
        </li>
      </ul>
    ),
  },
  {
    header: 'Our Templates',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1-50E6uoT0fMzSFmszhQgQLZITYwQAVTE8hMOgEmLVKE/edit"
            rel="noopener noreferrer"
          >
            Monthly Report Template
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1OtznopjLjaEDGzXcXmGiQH0H0Mr0bcAnzDOfGsfeqYI/edit#gid=80577250"
            rel="noopener noreferrer"
          >
            Social Media Content Calendar Template
          </a>
        </li>
      </ul>
    ),
  },
];

const InternalAccordion = () => (
  <Accordion>
    {content.map(({ header, content }, index) => (
      <Accordion.Item key={index} eventKey={index} className="py-2">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>{content}</Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default Internal;

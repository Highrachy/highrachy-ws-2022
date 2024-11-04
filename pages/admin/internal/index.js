import React from 'react';
import Backend from '@/components/admin/Backend';
import { Accordion } from 'react-bootstrap';
import Link from 'next/link';
import CreateSignature from './create-signature';

export const internalContent = [
  {
    header: 'Learning and Development',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1T3UdANFps-99CSqpSMhFZlyQ1pPDb1Bn?usp=sharing"
            rel="noopener noreferrer"
          >
            Learning and Development (All Resources)
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/11m0Zh5_30jqi3-AVvCcHg_f8zBUgnFLB"
            rel="noopener noreferrer"
          >
            Worksheets
          </a>
        </li>
      </ul>
    ),
  },
  {
    header: 'Monthly Planning and Reporting Guide',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1-50E6uoT0fMzSFmszhQgQLZITYwQAVTE8hMOgEmLVKE/edit"
            rel="noopener noreferrer"
          >
            Monthly Report Document
          </a>
        </li>
        <li>
          <Link href="/admin/internal/monthly-report">
            Step-by-Step Guide for Using the Monthly Report Document
          </Link>
        </li>
      </ul>
    ),
  },
  {
    header: 'Logos and Templates',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1SDXr41u626fI1tefEZ9-hOVl7xw_istL"
            rel="noopener noreferrer"
          >
            Our Logos
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
    header: 'Ballers Resources',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/presentation/d/16B6L_BlQxgLnQkbNZaBhC_afne46g2d8JjvRIDsYP0M/edit"
            rel="noopener noreferrer"
          >
            BALLERS - Website Testing Bug Template
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1ToJvkMkLXP8cw2ARQPqiCInMvHnnKO6e/edit"
            rel="noopener noreferrer"
          >
            BALLERS - Offer Letter Template
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1gsomOY9qclUz9RzadN3ztJH4Y0ryGT-fukNBFLhJAIU/edit"
            rel="noopener noreferrer"
          >
            Ballers - Search Result Calculator
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1oR5_bhClwX08aA-CPePocZ6WZpWt0LC1Lbnoa-x3sWg/edit"
            rel="noopener noreferrer"
          >
            BALLERS - Value added services
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1UDdqi4tH-wqUFHrS-UcqHzQw-ZtYt0SYij6Tf9PPi5M/edit#heading=h.ddo8e4w4294z"
            rel="noopener noreferrer"
          >
            BALLERS - Term of Use
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1kicljW_JDF9bj-uwKHB6NCsoFXVJe8K-ZhZNAQF5_FE/edit#heading=h.i67ji34ryzgr"
            rel="noopener noreferrer"
          >
            BALLERS - Preventing Users from boycotting (Brainstorming Docs)
          </a>
        </li>
      </ul>
    ),
  },
];

const Internal = () => {
  return (
    <Backend>
      <h4 className="mb-3">Internal Resources</h4>
      <InternalAccordion content={internalContent} />
    </Backend>
  );
};

export const InternalAccordion = ({ content }) => (
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

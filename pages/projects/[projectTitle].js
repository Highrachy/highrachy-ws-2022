import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import projects from '@/data/projects';
import Image from 'next/image';
import { projects as projectNav } from '@/data/navigation';
import React from 'react';
import Sharer from '@/components/utils/Sharer';
import { NextSeo } from 'next-seo';
import LightboxGallery from '@/components/common/LightboxGallery';

const SingleProject = ({ project }) => {
  const breadcrumb = [
    { title: 'Projects', url: 'projects' },
    { title: project.title },
  ];

  return (
    <>
      <NextSeo
        title={`Project | ${project.title}`}
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrachy.com/about-us"
      />
      <Navigation parentPage={projectNav.url} />
      <PageHeader
        title={project.title}
        breadcrumb={breadcrumb}
        bgImage="/assets/img/bg/projects.jpg"
      />
      <Project {...project} />
      <Footer />
    </>
  );
};

const Project = ({
  content,
  image,
  title,
  status,
  gallery,
  externalLink,
  externalLinkText,
  externalLink2,
  externalLinkText2,
}) => {
  const paragraphs = content.trim().split('\n\n');

  return (
    <Section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ShareContent title={title} />
            <SectionHeader className="mb-4">
              {title} {status && <span>({status})</span>}
            </SectionHeader>
            <Image
              src={image}
              alt={title}
              className="img-fluid project-img rounded shadow-sm"
              height="1000"
              width="1200"
            />
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="project-content">
                <div dangerouslySetInnerHTML={{ __html: paragraph }} />
              </p>
            ))}

            {externalLink && (
              <Button color="primary" href={externalLink} className="mt-3 mb-6">
                {externalLinkText || 'More Details'}
              </Button>
            )}
            {externalLink2 && (
              <Button
                color="info"
                href={externalLink2}
                className="mt-3 mb-6 ms-3"
              >
                {externalLinkText2 || 'Invest Now'}
              </Button>
            )}

            <LightboxGallery images={gallery || []} />
          </div>
        </div>
      </div>
    </Section>
  );
};

const ShareContent = ({ title }) => (
  <div className="share-content text-end">
    <Sharer
      shareText={<p className="text-muted">Share Project: </p>}
      shareUrl={`https://highrachy.com/projects/${title}`}
    />
  </div>
);

export async function getStaticProps({ params }) {
  const projectList = Object.values(projects);
  const project = projectList.find((p) => p.title === params.projectTitle);
  return { props: { project }, revalidate: 10 };
}

export async function getStaticPaths() {
  const projectLists = Object.values(projects);
  return {
    paths: projectLists.map((projectList) => {
      return {
        params: {
          projectTitle: projectList.title,
        },
      };
    }),
    fallback: false,
  };
}

export default SingleProject;

import { FacebookIcon } from '@/components/common/Icons';
import { LinkedInIcon } from '@/components/common/Icons';
import { InstagramIcon } from '@/components/common/Icons';
import { TwitterIcon } from '@/components/common/Icons';
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
        canonical="https://www.highrahcy.com/about-us"
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

const Project = ({ content, image, title, externalLink }) => (
  <Section>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ShareContent title={title} />
          <SectionHeader className="mb-4">{title}</SectionHeader>
          <Image
            src={image}
            alt={title}
            className="img-fluid"
            height="800"
            width="1200"
          />
          <p className="">{content}</p>
          {externalLink && (
            <Button color="primary" href={externalLink} className="mt-3 mb-6">
              More Details
            </Button>
          )}
        </div>
      </div>
    </div>
  </Section>
);

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
  return { props: { project } };
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

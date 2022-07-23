import React from 'react';

const ExternalLink: React.FC<{ children: React.ReactNode; link: string }> = ({
  children,
  link
}) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;

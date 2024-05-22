import React from 'react';

interface ElectionCandidatePageProps {
    params: {id: string}
}
const ElectionCandidatePage = ({params}:ElectionCandidatePageProps) => {
    const id = params.id;
  return (
    <div className='text-center'>
      Election Candidate ID#{id}
    </div>
  );
}

export default ElectionCandidatePage;

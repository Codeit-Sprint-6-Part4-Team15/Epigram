'use client';

import { useState } from 'react';

import EpigramsContainer from '../epigrams/EpigramsContainer';
import CommentsContainer from './CommentContainer';

export default function MyContents() {
  const [activeTab, setActiveTab] = useState(1);
  const [epigramsCount, setEpigramsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] xl:gap-[48px]">
      <div
        className="typo-lg-semibold flex gap-[16px] text-gray-300 xl:typo-2xl-semibold xl:gap-[24px]"
        role="tablist"
      >
        <button
          type="button"
          id="tab-1"
          role="tab"
          aria-controls="tabpanel-1"
          aria-selected={activeTab === 1}
          className="aria-selected:text-black-600"
          onClick={() => setActiveTab(1)}
        >
          내 에피그램({epigramsCount ?? 0})
        </button>
        <button
          type="button"
          id="tab-2"
          role="tab"
          aria-controls="tabpanel-2"
          aria-selected={activeTab === 2}
          className="aria-selected:text-black-600"
          onClick={() => setActiveTab(2)}
        >
          내 댓글({commentsCount ?? 0})
        </button>
      </div>
      <div>
        <div
          id="tabpanel-1"
          role="tabpanel"
          className={`${activeTab !== 1 ? 'hidden' : ''}`}
        >
          <EpigramsContainer type="my" setCount={setEpigramsCount} />
        </div>
        <div
          id="tabpanel-2"
          role="tabpanel"
          className={`${activeTab !== 2 ? 'hidden' : ''}`}
        >
          <CommentsContainer type="my" setCount={setCommentsCount} />
        </div>
      </div>
    </div>
  );
}

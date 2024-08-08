'use client';

import React from 'react';

interface EpigramTag {
  name: string;
}

interface TextCardProps {
  content: string;
  author: string;
  tags: EpigramTag[];
  id: number;
}

export default function TextCard({ content, author, tags, id }: TextCardProps) {
  return (
    <div>
      <div
        key={id}
        className="note rounded-[16px] border border-line-100 p-[22px]"
      >
        <p className="iropke-xs mb-2 sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl">
          {content}
        </p>
        <p className="iropke-xs text-right text-blue-400 sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl">
          - {author} -
        </p>
      </div>
      <div className="mt-2 overflow-hidden whitespace-nowrap text-right">
        <div className="flex justify-end">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="iropke-xs mr-2 text-blue-400 transition-all duration-300 sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

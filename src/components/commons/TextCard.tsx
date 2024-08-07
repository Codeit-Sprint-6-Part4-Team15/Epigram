"use client";

import { TextCardProps } from '@/src/types/epigrams';
import React from 'react';

export default function TextCard({ content, author, tags, id }: TextCardProps) {
  return (
    <>
      <div key={id} className="border border-line-100 rounded-[16px] p-[22px] note">
        <p className="iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl mb-2">{content}</p>
        <p className="text-right iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl text-blue-400">- {author} -</p>
      </div>
      <div className="mt-2 text-right overflow-hidden whitespace-nowrap">
        <div className="flex justify-end">
          {tags.map((tag, index) => (
            <span key={index} className="iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl text-blue-400 mr-2">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
"use client";

import React from 'react';

interface EpigramTag {
  name: string;
}

interface TextCardProps {
  content: string;
  author: string;
  tags: EpigramTag[];
}

export default function TextCard({ content, author, tags }: TextCardProps) {
    return (
    <>
        <div className="border border-line-100 rounded-[16px] p-[22px] note transition-all duration-300">
            <p className="iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl transition-all duration-300 mb-2">{content}</p>
            <p className="text-right iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl text-blue-400 transition-all duration-300">- {author} -</p>
        </div>
            <div className="mt-2 text-right overflow-hidden whitespace-nowrap">
                <div className="flex justify-end">
                    {tags.map((tag, index) => (
                     <span key={index} className="iropke-xs sm:iropke-md md:iropke-lg lg:iropke-xl xl:iropke-2xl 2xl:iropke-2xl text-blue-400 mr-2 transition-all duration-300">
                     #{tag.name}
                </span>
            ))}
            </div>
        </div>
    </>
  );
}

import React from 'react';
import { MarkdownText, SimpleAppBar } from '../../../components';
import terms from './terms.md';
import { isMobile } from 'react-device-detect';

export default function index() {
  return (
    <div>
      {isMobile && <SimpleAppBar />}
      <MarkdownText text={terms} title={'Terms of Service'} />
    </div>
  );
}

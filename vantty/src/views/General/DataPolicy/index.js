import React from 'react';
import { MarkdownText, SimpleAppBar } from '../../../components';
import policy from './policy.md';
import { isMobile } from 'react-device-detect';

export default function index() {
  return (
    <div>
      {isMobile && <SimpleAppBar />}
      <MarkdownText text={policy} title={'Data Policy'} />
    </div>
  );
}

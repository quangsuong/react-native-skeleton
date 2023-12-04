// CachedSVGUri.js
import { IconSvgLocal } from '@components/icon-vec-local';
import React, { Component } from 'react';
import { SvgFromXml } from 'react-native-svg';
import SVGCacheService from './SVGCacheService';

export async function fetchCached(uri: string) {
  const cached = await SVGCacheService.getSvg(uri);
  if (cached) {
    return cached;
  } else {
    const response = await fetch(uri);
    const svg = await response.text();
    SVGCacheService.setSvg(uri, svg);
    return svg;
  }
}

interface Props {
  uri: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default class CachedSvgUri extends Component<Props> {
  state = { xml: null };
  componentDidMount() {
    this.fetch(this.props.uri);
  }
  componentDidUpdate(prevProps) {
    const { uri } = this.props;
    if (uri !== prevProps.uri) {
      this.fetch(uri);
    }
  }
  async fetch(uri: string) {
    try {
      this.setState({ xml: uri ? await fetchCached(uri) : null });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const {
      props,
      state: { xml },
    } = this;
    return props.uri ? (
      <SvgFromXml xml={xml} override={props} />
    ) : (
      <IconSvgLocal name="IC_BANK" color={props?.color ?? '#1B1D29'} />
    );
  }
}

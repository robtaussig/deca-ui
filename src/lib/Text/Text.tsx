import { CSS } from '@lib/Theme';
import { UnionToIntersection, ThemeKey } from '@lib/Utils';
import React, { useRef, useImperativeHandle, useMemo } from 'react';

import StyledText from './Text.styles';

type TextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLElement;

/**
 * The Text component is the used to render text and paragraphs within an interface
 */
interface Props {
  /**
   * Changes which tag component outputs.
   */
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'blockquote'
    | 'b'
    | 'small'
    | 'del'
    | 'i'
    | 'em';
  /**
   * Override default CSS style.
   */
  css?: CSS;
  /**
   * The content of the component.
   */
  children?: React.ReactNode | undefined;
  /**
   * Font weight of the text.
   */
  weight?: ThemeKey<'fontWeights'>;
  /**
   * Custom size for the text.
   */
  size?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'blockquote'
    | 'b'
    | 'small'
    | 'del'
    | 'i'
    | 'em'
    | string;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TextProps = Props & NativeAttrs;

const Text = React.forwardRef(
  (
    { as = 'p', css, children, weight, size, ...textProps }: TextProps,
    ref: React.Ref<TextElement | null>
  ) => {
    const textRef = useRef<UnionToIntersection<TextElement>>(null);

    useImperativeHandle(ref, () => textRef.current);

    const preClass = 'decaText';

    const getCss = useMemo(() => {
      if (size && size.charAt(0) === '$') {
        const lineHeightMapper = {
          $h1: '$6',
          $h2: '$5',
          $h3: '$4',
          $h4: '$3',
          $h5: '$2',
          $h6: '$2',
          $bodyLg: '$1',
          $body: '$1',
          $caption: '$1',
          $footnote: '$0',
        };

        return {
          fontSize: size,
          lineHeight: lineHeightMapper[size as keyof typeof lineHeightMapper],
          ...css,
        };
      }

      if (size) {
        return {
          fontSize: size,
          lineHeight: 'normal',
          ...css,
        };
      }

      return css;
    }, [css, size]);

    return (
      <StyledText
        as={as}
        css={getCss}
        className={`${preClass}-root`}
        ref={textRef}
        weight={weight}
        {...textProps}
      >
        {children}
      </StyledText>
    );
  }
);

export default Text;

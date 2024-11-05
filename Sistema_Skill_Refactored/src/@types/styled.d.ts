import 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import type { CSSProp } from 'styled-components';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType { }
}

declare module 'react' {
    interface DOMAttributes<T> {
        css?: CSSProp;
    }
}
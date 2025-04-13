import 'styled-components';
import { CustomTheme } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
} 
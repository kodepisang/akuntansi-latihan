// styles/theme.ts
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            paddingStart: 5,
            textAlign: 'left',
            border: '1px solid #c0c0c0',
            padding: '8px',
            // '&:first-child': {
            //   borderTopLeftRadius: '10px', 
            // },
            // '&:not(:first-child)': {
            //   borderRight: '1px solid #e6e6e6', 
            // },
            // '&:last-child': {
            //   borderTopRightRadius: '10px', 
            //   // borderRight: 'none', 
            // },
          },
          td: {
            paddingStart: 5,
            textAlign: 'left',
            padding: '8px',
            border: '1px solid #c0c0c0', 
            // '&:first-child': {
            //   borderLeft: '1px solid #e6e6e6', 
            //   borderRight: '1px solid #e6e6e6', 
            // },
            // '&:not(:first-child)': {
            //   borderRight: '1px solid #e6e6e6', 
            // },
            
          },
          // tr: {
          //   ':nth-child(even)': {
          //     backgroundColor: 'gray.200',
          //   },
          // },
        }
      }
    },
  }
});
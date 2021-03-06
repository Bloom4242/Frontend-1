import * as React from 'react';
import {IconType} from 'react-icons';
import 'focus-visible/dist/focus-visible';
import {Spinner, Box, Heading, HStack} from '@chakra-ui/react';

interface StatsProps {
  name: string;
  value: number | string;
  icon: IconType;
}

const StatsBox: React.FC<StatsProps> = (props) => {
  return (
    <>
      <Box
        __css={{cursor: 'default'}}
        transition="1s"
        _hover={{
          transform: 'translateY(-4px)',
          transition: '.5s',
          bg: '#4C566A',
        }}
        bg={'#3B4252'}
        width={['350px', '230px', '350px', '350px']}
        px="20px"
        py="30px"
        shadow="md"
        rounded="6px"
      >
        <HStack>
          <props.icon size="23px" />
          <Heading size="md" fontWeight="medium" color={'#E5E9F0'}>
            {props.name}
          </Heading>
        </HStack>
        {props.value === undefined ? (
          <Spinner h="20px" w="20px" mt="3" />
        ) : (
          <Heading as="h4" size="sm" mt="2" fontWeight="medium">
            {props.value}
          </Heading>
        )}
      </Box>
    </>
  );
};

export default StatsBox;

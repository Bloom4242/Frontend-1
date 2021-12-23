import API from '../api';
import * as React from 'react';
import {useRouter} from 'next/router';
import Footer from '../components/footer';
import 'focus-visible/dist/focus-visible';
import {GiPartyHat} from 'react-icons/gi';
import {MdMoneyOff} from 'react-icons/md';
import StatsBox from '../components/stats';
import {SiSpeedtest} from 'react-icons/si';
import {SiMaildotru} from 'react-icons/si';
import {useUser} from '../components/user';
import {BiUserCircle} from 'react-icons/bi';
import FeatureBox from '../components/feature';
import styles from '../styles/index.module.css';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {RiFingerprint2Line} from 'react-icons/ri';
import {FaUserAltSlash, FaUserAlt, FaLock, FaLockOpen} from 'react-icons/fa';
import {
  MdSettingsInputComposite,
  MdOutlineSlowMotionVideo,
  MdSystemUpdateAlt,
} from 'react-icons/md';
import {
  BsFillArrowDownCircleFill,
  BsImages,
  BsHeadset,
  BsGithub,
} from 'react-icons/bs';
import {
  Text,
  Link,
  Flex,
  Modal,
  Input,
  Stack,
  Center,
  Button,
  Heading,
  Divider,
  useToast,
  ModalBody,
  InputGroup,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

export default function Homepage() {
  const {
    isOpen: registerOpened,
    onClose: registerClose,
    onOpen: registerOpen,
  } = useDisclosure();
  const {
    isOpen: loginOpened,
    onClose: loginClose,
    onOpen: loginOpen,
  } = useDisclosure();
  const [loginInfo, setLoginInfo] = React.useState({
    username: '',
    password: '',
  });
  const [registerInfo, setRegisterInfo] = React.useState({
    username: '',
    password: '',
    email: '',
    inviteCode: '',
  });
  const toast = useToast();
  const router = useRouter();
  const {setUser} = useUser();
  const captchaRef = React.useRef(null);
  const RegPassword = () => setShow(!show);
  const [stats, setStats] = React.useState(undefined);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    API.getStats()
        .then((stats) => {
          Object.keys(stats).forEach((key) => {
            if (stats[key] === null) {
              stats[key] = '0';
            }
          });
          setStats(stats);
        })
        .catch(() => {
          setStats(null);
        });
  }, []);

  const handleRegisterChange = (e) => {
    switch (e.target.placeholder) {
      case 'Username':
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          username: e.target.value,
        }));
        break;
      case 'Password':
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          password: e.target.value,
        }));
        break;
      case 'Email-Address':
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          email: e.target.value,
        }));
        break;
      case 'Invite-Code':
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          inviteCode: e.target.value,
        }));
        break;
      default:
        return;
    }
  };
  const handleLoginChange = (e) => {
    switch (e.target.placeholder) {
      case 'Username/Email':
        setLoginInfo((prevInfo) => ({
          ...prevInfo,
          username: e.target.value,
        }));
        break;
      case 'Password':
        setLoginInfo((prevInfo) => ({
          ...prevInfo,
          password: e.target.value,
        }));
        break;
      default:
        return;
    }
  };
  function registerClick() {
    API.validateRegisterParams(
        registerInfo.username,
        registerInfo.email,
        registerInfo.password,
        registerInfo.inviteCode,
    )
        .then(() => {
          captchaRef.current.execute();
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return toast({
              title: 'Whoops! You have encountered an error!',
              description:
              'The API is unfortunately down please check back later.',
              status: 'error',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
              variant: 'left-accent',
            });
          }

          return toast({
            title: 'Whoops! You have encountered an error!',
            description: err.data.message,
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
            variant: 'left-accent',
          });
        });
  }
  function registerSubmit(key: string) {
    API.register(
        registerInfo.username,
        registerInfo.email,
        registerInfo.password,
        registerInfo.inviteCode,
        key,
    )
        .then((data) => {
          setRegisterInfo({
            username: '',
            password: '',
            email: '',
            inviteCode: '',
          });

          toast({
            title: 'Success!',
            description: data.message,
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
            variant: 'left-accent',
          });
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return toast({
              title: 'Whoops! You have encountered an error!',
              description:
              'The API is unfortunately down please check back later.',
              status: 'error',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
              variant: 'left-accent',
            });
          }

          return toast({
            title: 'Whoops! You have encountered an error!',
            description: err.data.message,
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
            variant: 'left-accent',
          });
        });
  }
  function loginSubmit() {
    API.login(loginInfo.username, loginInfo.password)
        .then((data) => {
          setLoginInfo({
            username: '',
            password: '',
          });

          setUser(data.user);

          toast({
            title: 'Success!',
            description: data.message,
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
            variant: 'left-accent',
          });

          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return toast({
              title: 'Whoops! You have encountered an error!',
              description:
              'The API is unfortunately down please check back later.',
              status: 'error',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
              variant: 'left-accent',
            });
          }

          console.log(err);

          return toast({
            title: 'Whoops! You have encountered an error!',
            description:
            err.data === 'Unauthorized' ?
              'Invalid Credentials' :
              err.data.message,
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
            variant: 'left-accent',
          });
        });
  }

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#434C5E"
          fillOpacity="1"
          d="M0,288L80,288C160,288,320,288,480,250.7C640,213,800,139,960,122.7C1120,107,1280,149,1360,170.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    <Flex color='black'>
      </Flex>
      <Flex
        mt={['100px', '100px', '28px', '-80px', '-100px', '-160px']}
        mb="100px"
        alignItems="center"
        justifyContent="center"
      >
        <Flex direction="column" width={['360px', '400px', 'auto', 'auto']}>
          <Center>
            <Flex>
              <Heading
                className={styles.nord}
                fontSize={['50px', '60px', '50px', '50px']}
                alignContent="center"
              >
                Kythi.
              </Heading>
            </Flex>
          </Center>
          <Center>
            <Text
              color="gray.400"
              fontSize={['18px', '18px', '18px', '18px']}
              mb={2}
              alignContent="center"
            >
              {'Personalized digital services for you.'}
            </Text>
          </Center>
          <Divider mb={4} />
          <Stack justify="true" direction={['column', 'row']} spacing={2}>
            <Button
              w="100%"
              h="33px"
              onClick={loginOpen}
              colorScheme="blue"
              variant="outline"
            >
              Login
            </Button>
            <Button
              w="100%"
              h="33px"
              onClick={registerOpen}
              colorScheme="blue"
              variant="outline"
            >
              Register
            </Button>
          </Stack>
          <Modal isCentered isOpen={registerOpened} onClose={registerClose}>
            <ModalOverlay />
            <ModalContent
              bg="#2E3440"
              width={['350px', '350px', '450px', '500px']}
            >
              <ModalHeader> {'Register'} </ModalHeader>
              <Center>
                <Divider borderColor="#81A1C1" w="90%" mb={3} />
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup>
                  <InputLeftElement mt="-4px" size="sm">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    mb={3}
                    onChange={handleRegisterChange}
                    value={registerInfo.username}
                    placeholder="Username"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <RiFingerprint2Line size="20" />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    type={show ? 'text' : 'password'}
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.password}
                    placeholder="Password"
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      ml="5"
                      variant="ghost"
                      h="1.5rem"
                      mb="2"
                      __css={{}}
                      _hover={{color: '#D8DEE9'}}
                      size="sm"
                      onClick={RegPassword}
                    >
                      {show ? <FaLockOpen /> : <FaLock />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="9px" size="sm">
                    <SiMaildotru size="18" />
                  </InputLeftElement>
                  <Input
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    isRequired
                    focusBorderColor="blue.300"
                    size="sm"
                    mt={3}
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.email}
                    placeholder="Email-Address"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="8px" size="sm">
                    <GiPartyHat size="20" />
                  </InputLeftElement>
                  <Input
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    isRequired
                    focusBorderColor="blue.300"
                    size="sm"
                    mt={3}
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.inviteCode}
                    placeholder="Invite-Code"
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  height="33px"
                  width="100%"
                  colorScheme="blue"
                  variant="outline"
                  onClick={registerClick}
                >
                  Register
                </Button>
              </ModalFooter>
              <Center>
                <HCaptcha
                  size="invisible"
                  sitekey="c0103fd5-be5e-4d12-9fef-8fe706061b6b"
                  ref={captchaRef}
                  onVerify={registerSubmit}
                />
              </Center>
            </ModalContent>
          </Modal>

          <Modal isCentered isOpen={loginOpened} onClose={loginClose}>
            <ModalOverlay />
            <ModalContent
              boxShadow="0px"
              width={['350px', '350px', 'auto', '500px']}
              bg="#2E3440"
            >
              <ModalHeader>
                <Text fontWeight={650}>{'Login to start.'} </Text>
              </ModalHeader>
              <Center>
                <Divider borderColor="#81A1C1" w="90%" mb={3} />
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    mb={3}
                    onChange={handleLoginChange}
                    value={loginInfo.username}
                    placeholder="Username/Email"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <RiFingerprint2Line size="20" />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: '1px',
                      borderColor: '#81A1C1',
                      transition: '.5s',
                      bg: '#3B4252',
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    type={show ? 'text' : 'password'}
                    onChange={handleLoginChange}
                    value={loginInfo.password}
                    placeholder="Password"
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Stack align="center" direction="column">
                  <Link
                    href="/reset-password"
                    color="gray.400"
                    cursor="default"
                    mt="-15px"
                    _hover={{color: 'gray.300'}}
                  >
                    Forgotten your password?
                  </Link>
                  <Button
                    colorScheme="blue"
                    width={['300px', '300px', '400px', '400px']}
                    h="35px"
                    rounded="5px"
                    variant="outline"
                    onClick={loginSubmit}
                  >
                    Login
                  </Button>
                  <Button
                    width={['300px', '300px', '400px', '400px']}
                    h="35px"
                    bg="#5865F2"
                    rounded="5px"
                    _hover={{bg: '#7289da'}}
                    __css={{transition: '.4s'}}
                    onClick={function() {
                      location.href = `https://api.kythi.com/discord/login`;
                    }}
                  >
                    Login via Discord
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Text
          fontSize={['37px', '43px', '60px', '50px']}
          mb={3}
          color={'#d8dee9'}
          alignContent="center"
        >
          {'Statistics'}
        </Text>
      </Flex>
      <Flex mb="15px" alignItems="center" justifyContent="center">
        <Stack direction={['column', 'row']}>
          <StatsBox
            name={'Total Uploads'}
            value={stats?.fileCount}
            icon={BsImages}
          />
          <StatsBox
            name={'Total Users'}
            value={stats?.userCount}
            icon={BiUserCircle}
          />
        </Stack>
      </Flex>
      <Flex mb="150px" alignItems="center" justifyContent="center">
        <Stack direction={['column', 'row']}>
          <StatsBox
            name={'Banned Users'}
            value={stats?.bannedCount}
            icon={FaUserAltSlash}
          />
          <StatsBox
            name={'Total Domains'}
            value={stats?.domainCount}
            icon={MdSettingsInputComposite}
          />
        </Stack>
      </Flex>
      <Center mt="-100px">
        <BsFillArrowDownCircleFill
          className={styles.arrow}
          cursor="pointer"
          onClick={() => {
            location.href = '/#About';
          }}
          size="30px"
        />
      </Center>
      <Flex mt="150px" className={styles.center}>
        <Text
          id="About"
          fontSize={['37px', '43px', '60px', '60px']}
          mb={3}
          color="#d8dee9"
          alignContent="center"
        >
          {'Features'}
        </Text>
      </Flex>
      <Center mb="20px">
        <Stack
          spacing={['4', '4', '4', '2', '2']}
          direction={['column', 'column', 'column', 'row', 'row']}
        >
          <FeatureBox
            name={'Personalization'}
            value={[
              'We allow you to customise your Files, Discord embeds, your Kythi profile and more so get started!',
            ]}
            icon={MdSystemUpdateAlt}
          />
          <FeatureBox
            name={'Fast Uploads'}
            value={[
              'When making our host, we strived to make it as user-accessible as possible along with making it a great experience to use! That is why we focused on optimising the upload speed first.',
            ]}
            icon={SiSpeedtest}
          />
          <FeatureBox
            name={'Various File Types'}
            value={[
              'Kythi supports many File Types, for example we allow .mp4, .mp3, .png, .jpg and more!',
            ]}
            icon={MdOutlineSlowMotionVideo}
          />
        </Stack>
      </Center>
      <Center mb="50px">
        <Stack
          spacing={['4', '4', '4', '2', '2']}
          direction={['column', 'column', 'column', 'row', 'row']}
        >
          <FeatureBox
            name={'24/7 Support'}
            value={[
              'Kythi provides fast support with simple answers, with a wide range of staff that are always happy to help.',
            ]}
            icon={BsHeadset}
          />
          <FeatureBox
            name={'100% free'}
            value={[
              'Devs at kythi looked at what they could do to make your experience immersive, and thats why we are glad to announce that we are 100% free to use, and we will never charge you for anything.',
            ]}
            icon={MdMoneyOff}
          />
          <FeatureBox
            name="Open Source"
            icon={BsGithub}
            value={[
              'The source of Kythi is on our ',
              <span className={styles.nordblue}><Link href="https://github.com/kythix">Github!</Link></span>,
              ' this is free to use for everyone, and we will always be open to any suggestions you have',
            ]}
          />
        </Stack>
      </Center>
      <Footer />
    </>
  );
}

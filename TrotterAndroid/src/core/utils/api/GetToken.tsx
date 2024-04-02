import AsyncStorage from "@react-native-async-storage/async-storage";

type GetTokenProps = {
  setIsLoading: (bool: boolean) => void;
  setToken: (token: string) => void;
}

const GetToken = async ({setIsLoading, setToken}: GetTokenProps) => {
  setIsLoading(true);
  try {
    const retrieveToken = await AsyncStorage.getItem('token');
    setToken(retrieveToken as string);
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
  setIsLoading(false)
}

export default GetToken;
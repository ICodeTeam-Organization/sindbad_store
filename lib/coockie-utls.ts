 
import Cookies from 'js-cookie';



export  function getCookie(name: string):string | undefined {
  if (typeof window === 'undefined') { 
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { cookies } =  require('next/headers');
      return cookies().get(name)?.value;
    } catch (error) {
      console.error('Error accessing server cookies:', error);
      return undefined;
    }
  } else {
    // Client-side
    return Cookies.get(name);
  }
}

export  function getClientCookie(name: string):string {
    const cookie = Cookies.get(name) 
    return cookie ?? "1";
}